#!/bin/bash

echo "🔍 Сравнение структуры JSON файлов в папке de с веткой main..."

# Получаем список JSON файлов в de директории
find src/i18n/de -name "*.json" -type f | while read file; do
    echo "Проверяем файл: $file"

    # Получаем содержимое файлов из обеих веток
    current_content=$(git show trans:"$file" 2>/dev/null)
    main_content=$(git show main:"$file" 2>/dev/null)

    if [ $? -ne 0 ]; then
        echo "❌ Ошибка при чтении файла $file"
        continue
    fi

    # Создаем временные файлы для сравнения
    echo "$current_content" > /tmp/current.json
    echo "$main_content" > /tmp/main.json

    # Проверяем валидность JSON
    if ! jq empty /tmp/current.json 2>/dev/null || ! jq empty /tmp/main.json 2>/dev/null; then
        echo "❌ Невалидный JSON в файле $file"
        rm -f /tmp/current.json /tmp/main.json
        continue
    fi

    # Проверяем структуру независимо от порядка ключей:
    # 1. Типы данных (object/array/string/number/boolean)
    # 2. Размеры массивов
    # 3. Наборы ключей в объектах (без учета порядка)

    # Сравниваем типы верхнего уровня
    current_type=$(jq -r 'type' /tmp/current.json)
    main_type=$(jq -r 'type' /tmp/main.json)

    if [ "$current_type" != "$main_type" ]; then
        echo "❌ Несоответствие типа данных: $file ($current_type vs $main_type)"
        git checkout main -- "$file"
        echo "✅ Файл $file откачен до версии main"
        rm -f /tmp/current.json /tmp/main.json
        continue
    fi

    # Получаем структурную информацию, игнорируя порядок ключей и поле instagram
    current_structure=$(jq -r '
        def walk:
            if type == "object" then
                (. | keys | sort | map(select(. != "instagram"))) as $sorted_keys |
                reduce $sorted_keys[] as $key ({}; . + {($key): ($key | walk)})
            elif type == "array" then
                [.[] | walk]
            else
                type
            end;
        walk | path(..) | join(".")
    ' /tmp/current.json | sort)

    main_structure=$(jq -r '
        def walk:
            if type == "object" then
                (. | keys | sort | map(select(. != "instagram"))) as $sorted_keys |
                reduce $sorted_keys[] as $key ({}; . + {($key): ($key | walk)})
            elif type == "array" then
                [.[] | walk]
            else
                type
            end;
        walk | path(..) | join(".")
    ' /tmp/main.json | sort)

    # Сравниваем структуры
    if [ "$current_structure" != "$main_structure" ]; then
        echo "❌ Найдено несоответствие в структуре файла: $file"
        echo "Откатываем файл до версии из main..."
        git checkout main -- "$file"
        echo "✅ Файл $file откачен до версии main"
    else
        echo "✅ Структура файла $file совпадает"
    fi

    # Очищаем временные файлы
    rm -f /tmp/current.json /tmp/main.json
    echo "---"
done

echo "🎯 Проверка завершена!"