#!/bin/bash

# Скрипт для сравнения структуры JSON файлов с предыдущей версией

echo "=== Сравнение структуры JSON файлов ==="
echo "Проверяем измененные файлы в ru директории..."
echo ""

# Получаем список измененных файлов
files=$(git diff --name-only HEAD | grep "src/i18n/ru/" | grep "\.json$")

total_files=0
errors=0

for file in $files; do
    if [ -f "$file" ]; then
        total_files=$((total_files + 1))
        echo "Проверка файла: $file"

        # Получаем старую версию файла из git
        old_content=$(git show HEAD:$file 2>/dev/null)
        old_result=$?

        # Если старой версии нет, пропускаем
        if [ $old_result -ne 0 ]; then
            echo "  ⚠️  Файл новый в коммите, нет предыдущей версии для сравнения"
            continue
        fi

        # Получаем новую версию
        new_content=$(cat "$file")

        # Проверяем валидность JSON
        if ! echo "$old_content" | python3 -c "import json, sys; json.load(sys.stdin)" 2>/dev/null; then
            echo "  ❌ Старая версия невалидный JSON"
            errors=$((errors + 1))
            continue
        fi

        if ! echo "$new_content" | python3 -c "import json, sys; json.load(sys.stdin)" 2>/dev/null; then
            echo "  ❌ Новая версия невалидный JSON"
            errors=$((errors + 1))
            continue
        fi

        # Сравниваем структуру JSON
        old_structure=$(echo "$old_content" | python3 -c "
import json, sys
data = json.load(sys.stdin)
def get_structure(obj):
    if isinstance(obj, dict):
        return {k: get_structure(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [f'ARRAY_LENGTH_{len(obj)}'] + ([get_structure(obj[0])] if obj else [])
    else:
        return type(obj).__name__
print(json.dumps(get_structure(data)))
")

        new_structure=$(echo "$new_content" | python3 -c "
import json, sys
data = json.load(sys.stdin)
def get_structure(obj):
    if isinstance(obj, dict):
        return {k: get_structure(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [f'ARRAY_LENGTH_{len(obj)}'] + ([get_structure(obj[0])] if obj else [])
    else:
        return type(obj).__name__
print(json.dumps(get_structure(data)))
")

        # Сравниваем структуры
        if [ "$old_structure" = "$new_structure" ]; then
            echo "  ✅ Структура совпадает"
        else
            echo "  ❌ Структура отличается!"
            echo "    Старая структура: $old_structure"
            echo "    Новая структура: $new_structure"
            errors=$((errors + 1))

            # Дополнительная проверка - сравниваем количество ключей в объектах
            old_keys=$(echo "$old_content" | python3 -c "
import json, sys
data = json.load(sys.stdin)
def count_keys(obj):
    if isinstance(obj, dict):
        return sum(count_keys(v) for v in obj.values()) + len(obj.keys())
    elif isinstance(obj, list):
        return sum(count_keys(item) for item in obj)
    else:
        return 0
print(count_keys(data))
")

            new_keys=$(echo "$new_content" | python3 -c "
import json, sys
data = json.load(sys.stdin)
def count_keys(obj):
    if isinstance(obj, dict):
        return sum(count_keys(v) for v in obj.values()) + len(obj.keys())
    elif isinstance(obj, list):
        return sum(count_keys(item) for item in obj)
    else:
        return 0
print(count_keys(data))
")

            echo "    Количество ключей: старое=$old_keys, новое=$new_keys"
        fi
        echo ""
    fi
done

echo "=== Итоги ==="
echo "Всего файлов проверено: $total_files"
echo "Файлов с ошибками: $errors"

if [ $errors -eq 0 ]; then
    echo "✅ Все файлы имеют корректную структуру"
else
    echo "❌ Найдены файлы с некорректной структурой"
    exit 1
fi