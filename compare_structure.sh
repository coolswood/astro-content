#!/bin/bash

# Проверяем наличие аргумента
if [ $# -eq 0 ]; then
    echo "❌ Ошибка: Укажите язык для сравнения"
    echo "Использование: $0 <lang>"
    echo "Пример: $0 de"
    echo "Пример: $0 uk"
    echo "Пример: $0 en"
    exit 1
fi

TARGET_LANG=$1
BASE_LANG="ru"

echo "🔍 Сравнение структуры JSON файлов в папке $TARGET_LANG с папкой $BASE_LANG..."

# Получаем список JSON файлов в целевой директории
find src/i18n/$TARGET_LANG -name "*.json" -type f | while read target_file; do
    echo "Проверяем файл: $target_file"

    # Создаем соответствующий путь для базового файла
    base_file=$(echo "$target_file" | sed "s|src/i18n/$TARGET_LANG/|src/i18n/$BASE_LANG/|")

    # Проверяем существование базового файла
    if [ ! -f "$base_file" ]; then
        echo "❌ Файл $base_file не существует"
        continue
    fi

    # Получаем содержимое файлов
    target_content=$(cat "$target_file" 2>/dev/null)
    base_content=$(cat "$base_file" 2>/dev/null)

    if [ $? -ne 0 ]; then
        echo "❌ Ошибка при чтении файлов"
        continue
    fi

    # Создаем временные файлы для сравнения
    echo "$target_content" > /tmp/target.json
    echo "$base_content" > /tmp/base.json

    # Проверяем валидность JSON
    if ! jq empty /tmp/target.json 2>/dev/null || ! jq empty /tmp/base.json 2>/dev/null; then
        echo "❌ Невалидный JSON в файлах"
        rm -f /tmp/target.json /tmp/base.json
        continue
    fi

    # Проверяем структуру независимо от порядка ключей:
    # 1. Типы данных (object/array/string/number/boolean)
    # 2. Размеры массивов
    # 3. Наборы ключей в объектах (без учета порядка)

    # Сравниваем типы верхнего уровня
    target_type=$(jq -r 'type' /tmp/target.json)
    base_type=$(jq -r 'type' /tmp/base.json)

    if [ "$target_type" != "$base_type" ]; then
        echo "❌ Несоответствие типа данных: $target_file ($target_type vs $base_type)"
        rm -f /tmp/target.json /tmp/base.json
        continue
    fi

    # Получаем структурную информацию с размерами массивов, игнорируя порядок ключей и поле instagram
    target_structure=$(jq -r '
        def walk:
            if type == "object" then
                (. | keys | sort | map(select(. != "instagram"))) as $sorted_keys |
                reduce $sorted_keys[] as $key ({}; . + {($key): ($key | walk)})
            elif type == "array" then
                (.[] | walk)
            else
                type
            end;
        walk | path(..) | join(".")
    ' /tmp/target.json | sort)

    base_structure=$(jq -r '
        def walk:
            if type == "object" then
                (. | keys | sort | map(select(. != "instagram"))) as $sorted_keys |
                reduce $sorted_keys[] as $key ({}; . + {($key): ($key | walk)})
            elif type == "array" then
                (.[] | walk)
            else
                type
            end;
        walk | path(..) | join(".")
    ' /tmp/base.json | sort)

    # Сравниваем структуры
    if [ "$target_structure" != "$base_structure" ]; then
        echo "❌ Найдено несоответствие в структуре файла: $target_file"
        echo "Структура не совпадает с $base_file"
    else
        echo "✅ Структура файла $target_file совпадает"
    fi

    # Дополнительная проверка размеров массивов
    echo "Проверка размеров массивов..."

    # Проверяем вложенные массивы в screen_*
    screen_arrays=$(jq -r '
        keys[] as $screen_key |
        if $screen_key | startswith("screen_") then
            .[$screen_key] |
            to_entries[] | select(.value | type == "array") |
            "\($screen_key).\(.key)"
        else
            empty
        end
    ' /tmp/target.json 2>/dev/null | sort)

    array_mismatch=0
    echo "$screen_arrays" | while read array_path; do
        if [ -n "$array_path" ]; then
            # Получаем размеры массивов
            target_size=$(jq -r ".$array_path | length // \"missing\"" /tmp/target.json 2>/dev/null)
            base_size=$(jq -r ".$array_path | length // \"missing\"" /tmp/base.json 2>/dev/null)

            if [ "$target_size" != "$base_size" ]; then
                echo "  🔸 Массив $array_path: $TARGET_LANG имеет $target_size элементов, $BASE_LANG имеет $base_size элементов"
                array_mismatch=1
            fi
        fi
    done

    # Очищаем временные файлы
    rm -f /tmp/target.json /tmp/base.json
    echo "---"
done

echo "🎯 Проверка завершена!"