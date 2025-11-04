#!/bin/bash

echo "🔍 Сравнение структуры JSON файлов в папке de с папкой ru..."

# Получаем список JSON файлов в de директории
find src/i18n/de -name "*.json" -type f | while read de_file; do
    echo "Проверяем файл: $de_file"

    # Создаем соответствующий путь для ru файла
    ru_file=$(echo "$de_file" | sed 's|src/i18n/de/|src/i18n/ru/|')

    # Проверяем существование ru файла
    if [ ! -f "$ru_file" ]; then
        echo "❌ Файл $ru_file не существует"
        continue
    fi

    # Получаем содержимое файлов
    de_content=$(cat "$de_file" 2>/dev/null)
    ru_content=$(cat "$ru_file" 2>/dev/null)

    if [ $? -ne 0 ]; then
        echo "❌ Ошибка при чтении файлов"
        continue
    fi

    # Создаем временные файлы для сравнения
    echo "$de_content" > /tmp/de.json
    echo "$ru_content" > /tmp/ru.json

    # Проверяем валидность JSON
    if ! jq empty /tmp/de.json 2>/dev/null || ! jq empty /tmp/ru.json 2>/dev/null; then
        echo "❌ Невалидный JSON в файлах"
        rm -f /tmp/de.json /tmp/ru.json
        continue
    fi

    # Проверяем структуру независимо от порядка ключей:
    # 1. Типы данных (object/array/string/number/boolean)
    # 2. Размеры массивов
    # 3. Наборы ключей в объектах (без учета порядка)

    # Сравниваем типы верхнего уровня
    de_type=$(jq -r 'type' /tmp/de.json)
    ru_type=$(jq -r 'type' /tmp/ru.json)

    if [ "$de_type" != "$ru_type" ]; then
        echo "❌ Несоответствие типа данных: $de_file ($de_type vs $ru_type)"
        rm -f /tmp/de.json /tmp/ru.json
        continue
    fi

    # Получаем структурную информацию с размерами массивов, игнорируя порядок ключей и поле instagram
    de_structure=$(jq -r '
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
    ' /tmp/de.json | sort)

    ru_structure=$(jq -r '
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
    ' /tmp/ru.json | sort)

    # Сравниваем структуры
    if [ "$de_structure" != "$ru_structure" ]; then
        echo "❌ Найдено несоответствие в структуре файла: $de_file"
        echo "Структура не совпадает с $ru_file"
    else
        echo "✅ Структура файла $de_file совпадает"
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
    ' /tmp/de.json 2>/dev/null | sort)

    array_mismatch=0
    echo "$screen_arrays" | while read array_path; do
        if [ -n "$array_path" ]; then
            # Получаем размеры массивов
            de_size=$(jq -r ".$array_path | length // \"missing\"" /tmp/de.json 2>/dev/null)
            ru_size=$(jq -r ".$array_path | length // \"missing\"" /tmp/ru.json 2>/dev/null)

            if [ "$de_size" != "$ru_size" ]; then
                echo "  🔸 Массив $array_path: DE имеет $de_size элементов, RU имеет $ru_size элементов"
                array_mismatch=1
            fi
        fi
    done

    # Очищаем временные файлы
    rm -f /tmp/de.json /tmp/ru.json
    echo "---"
done

echo "🎯 Проверка завершена!"