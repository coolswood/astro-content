#!/bin/bash

echo "🔍 Сравнение структуры JSON файлов с веткой main..."

# Получаем список JSON файлов в ru директории
find src/i18n/ru -name "*.json" -type f | while read file; do
    echo "Проверяем файл: $file"

    # Получаем структуру из текущей ветки
    current_structure=$(git show trans:"$file" 2>/dev/null | jq -r 'path(..) as $p | $p | join(".")' 2>/dev/null || echo "ERROR")

    # Получаем структуру из main ветки
    main_structure=$(git show main:"$file" 2>/dev/null | jq -r 'path(..) as $p | $p | join(".")' 2>/dev/null || echo "ERROR")

    if [ "$current_structure" = "ERROR" ] || [ "$main_structure" = "ERROR" ]; then
        echo "❌ Ошибка при чтении файла $file"
        continue
    fi

    # Сравниваем структуры
    if [ "$current_structure" != "$main_structure" ]; then
        echo "❌ Найдено несоответствие в структуре файла: $file"
        echo "Откатываем файл до версии из main..."
        git checkout main -- "$file"
        echo "✅ Файл $file откачен до версии main"
    else
        echo "✅ Структура файла $file совпадает"
    fi

    echo "---"
done

echo "🎯 Проверка завершена!"