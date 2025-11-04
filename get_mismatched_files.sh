#!/bin/bash

echo "📋 Полный список файлов с различиями в размерах массивов:"
echo "=========================================================="
echo ""

find src/i18n/de -name "*.json" -type f | while read de_file; do
    ru_file=$(echo "$de_file" | sed 's|src/i18n/de/|src/i18n/ru/|')

    if [ ! -f "$ru_file" ]; then
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
    ' "$de_file" 2>/dev/null | sort)

    mismatched_arrays=0
    echo "$screen_arrays" | while read array_path; do
        if [ -n "$array_path" ]; then
            de_size=$(jq -r ".$array_path | length // \"missing\"" "$de_file" 2>/dev/null)
            ru_size=$(jq -r ".$array_path | length // \"missing\"" "$ru_file" 2>/dev/null)

            if [ "$de_size" != "$ru_size" ]; then
                echo "$de_file: $array_path (DE: $de_size, RU: $ru_size)"
            fi
        fi
    done
done | sort