#!/bin/bash

echo "🔄 Откат файлов с расхождениями к версии main..."
echo "=========================================================="

# Список всех файлов с расхождениями
files_to_revert=(
    "src/i18n/de/story/depression/control.json"
    "src/i18n/de/story/depression/disability.json"
    "src/i18n/de/story/depression/disease.json"
    "src/i18n/de/story/depression/duty.json"
    "src/i18n/de/story/depression/guilt.json"
    "src/i18n/de/story/depression/incrimination.json"
    "src/i18n/de/story/depression/mistake.json"
    "src/i18n/de/story/depression/perfectionism.json"
    "src/i18n/de/story/depression/plan.json"
    "src/i18n/de/story/depression/read.json"
    "src/i18n/de/story/depression/real.json"
    "src/i18n/de/story/depression/rebuff.json"
    "src/i18n/de/story/depression/self_help.json"
    "src/i18n/de/story/depression/trap.json"
    "src/i18n/de/story/depression/unemployment.json"
    "src/i18n/de/story/depression/vitamins.json"
    "src/i18n/de/story/distortions/achievements_exercise.json"
    "src/i18n/de/story/distortions/autonomy.json"
    "src/i18n/de/story/distortions/autonomy_exercise.json"
    "src/i18n/de/story/distortions/love.json"
    "src/i18n/de/story/distortions/love_exercise.json"
    "src/i18n/de/story/distortions/omnipotence.json"
    "src/i18n/de/story/distortions/owed.json"
    "src/i18n/de/story/distortions/owed_exercise.json"
    "src/i18n/de/story/distortions/perfectionism.json"
    "src/i18n/de/story/distortions/perfectionism_exercise.json"
    "src/i18n/de/story/distortions/way.json"
    "src/i18n/de/story/diary.json"
    "src/i18n/de/story/history.json"
    "src/i18n/de/story/positive.json"
    "src/i18n/de/story/start.json"
    "src/i18n/de/story/suicide.json"
    "src/i18n/de/story/three_options.json"
    "src/i18n/de/story/triangle.json"
    "src/i18n/de/story/useful.json"
)

success_count=0
failure_count=0

for file in "${files_to_revert[@]}"; do
    echo "Откатываем файл: $file"

    if git checkout main -- "$file" 2>/dev/null; then
        echo "  ✅ Файл успешно откачен"
        ((success_count++))
    else
        echo "  ❌ Ошибка при откате файла"
        ((failure_count++))
    fi
    echo ""
done

echo "=========================================================="
echo "📊 Статистика отката:"
echo "  ✅ Успешно откачено файлов: $success_count"
echo "  ❌ Ошибок при откате: $failure_count"
echo "  📁 Всего файлов: ${#files_to_revert[@]}"
echo ""

if [ $failure_count -eq 0 ]; then
    echo "🎉 Все файлы успешно откачены к версии main!"
else
    echo "⚠️  Возникли ошибки при откате некоторых файлов"
fi

echo ""
echo "Проверяем результат отката..."
./compare_structure_de.sh | grep -c "🔸.*DE имеет.*RU имеет" | xargs -I {} echo "Осталось файлов с различиями: {}"