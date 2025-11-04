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

echo "📋 Полный список файлов с различиями в размерах массивов ($TARGET_LANG vs $BASE_LANG):"
echo "=========================================================================="
echo ""

find src/i18n/$TARGET_LANG -name "*.json" -type f | while read target_file; do
    base_file=$(echo "$target_file" | sed "s|src/i18n/$TARGET_LANG/|src/i18n/$BASE_LANG/|")

    if [ ! -f "$base_file" ]; then
        continue
    fi

    # Проверяем наличие массивов screen_*
    screen_arrays=$(jq -r '
        keys[] as $screen_key |
        if $screen_key | startswith("screen_") then
            .[$screen_key] |
            to_entries[] | select(.value | type == "array") |
            "\($screen_key).\(.key)"
        else
            empty
        end
    ' "$target_file" 2>/dev/null | sort)

    mismatched_arrays=0
    echo "$screen_arrays" | while read array_path; do
        if [ -n "$array_path" ]; then
            target_size=$(jq -r ".$array_path | length // \"missing\"" "$target_file" 2>/dev/null)
            base_size=$(jq -r ".$array_path | length // \"missing\"" "$base_file" 2>/dev/null)

            if [ "$target_size" != "$base_size" ]; then
                echo "$target_file: $array_path ($TARGET_LANG: $target_size, $BASE_LANG: $base_size)"
            fi
        fi
    done
done | sort