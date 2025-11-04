#!/bin/bash

echo "🔍 Проверка файла unemployment.json..."

de_file="src/i18n/de/story/depression/unemployment.json"
ru_file="src/i18n/ru/story/depression/unemployment.json"

echo "DE файл: $de_file"
echo "RU файл: $ru_file"

echo ""
echo "Проверяем конкретные массивы:"

# Проверяем конкретные массивы
arrays_to_check=(
    "screen_1.texts"
    "screen_1.quote"
    "screen_2.texts"
    "screen_3.texts"
    "screen_4.texts"
)

for array_path in "${arrays_to_check[@]}"; do
    echo "Проверяем массив: $array_path"

    de_size=$(jq -r ".$array_path | length // \"missing\"" "$de_file" 2>/dev/null)
    ru_size=$(jq -r ".$array_path | length // \"missing\"" "$ru_file" 2>/dev/null)

    echo "  DE размер: $de_size"
    echo "  RU размер: $ru_size"

    if [ "$de_size" != "$ru_size" ]; then
        echo "  🔸 РАЗЛИЧИЕ: DE имеет $de_size элементов, RU имеет $ru_size элементов"
    else
        echo "  ✅ Размеры совпадают"
    fi
    echo ""
done