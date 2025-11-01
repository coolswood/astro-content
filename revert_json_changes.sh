#!/bin/bash

# Скрипт для отмены изменений в файлах с несоответствиями структуры JSON

echo "=== Отмена изменений в файлах с проблемной структурой ==="
echo ""

# Список файлов с несоответствиями (из анализа)
files=(
    "src/i18n/ru/activities/lsafnanS3sf.json"
    "src/i18n/ru/story/depression/control.json"
    "src/i18n/ru/story/depression/death.json"
    "src/i18n/ru/story/depression/disability.json"
    "src/i18n/ru/story/depression/distortions.json"
    "src/i18n/ru/story/depression/duty.json"
    "src/i18n/ru/story/depression/guilt.json"
    "src/i18n/ru/story/depression/incrimination.json"
    "src/i18n/ru/story/depression/label.json"
    "src/i18n/ru/story/depression/lawyer.json"
    "src/i18n/ru/story/depression/lazy.json"
    "src/i18n/ru/story/depression/mirror.json"
    "src/i18n/ru/story/depression/mistake.json"
    "src/i18n/ru/story/depression/nonDepression.json"
    "src/i18n/ru/story/depression/perfectionism.json"
    "src/i18n/ru/story/depression/plan.json"
    "src/i18n/ru/story/depression/read.json"
    "src/i18n/ru/story/depression/real.json"
    "src/i18n/ru/story/depression/rebuff.json"
    "src/i18n/ru/story/depression/self_help.json"
    "src/i18n/ru/story/depression/trap.json"
    "src/i18n/ru/story/depression/unemployment.json"
    "src/i18n/ru/story/depression/vitamins.json"
    "src/i18n/ru/story/automatic.json"
    "src/i18n/ru/story/coping.json"
    "src/i18n/ru/story/depths.json"
    "src/i18n/ru/story/diary.json"
    "src/i18n/ru/story/distortions/achievements.json"
    "src/i18n/ru/story/distortions/achievements_exercise.json"
    "src/i18n/ru/story/distortions/approval.json"
    "src/i18n/ru/story/distortions/autonomy.json"
    "src/i18n/ru/story/distortions/autonomy_exercise.json"
    "src/i18n/ru/story/distortions/key.json"
    "src/i18n/ru/story/distortions/love.json"
    "src/i18n/ru/story/distortions/love_exercise.json"
    "src/i18n/ru/story/distortions/omnipotence.json"
    "src/i18n/ru/story/distortions/omnipotence_exercise.json"
    "src/i18n/ru/story/distortions/owed.json"
    "src/i18n/ru/story/distortions/owed_exercise.json"
    "src/i18n/ru/story/distortions/perfectionism.json"
    "src/i18n/ru/story/distortions/perfectionism_exercise.json"
    "src/i18n/ru/story/distortions/way.json"
    "src/i18n/ru/story/history.json"
    "src/i18n/ru/story/intermediate.json"
    "src/i18n/ru/story/positive.json"
    "src/i18n/ru/story/proof.json"
    "src/i18n/ru/story/start.json"
    "src/i18n/ru/story/suicide.json"
    "src/i18n/ru/story/three_options.json"
    "src/i18n/ru/story/triangle.json"
    "src/i18n/ru/story/useful.json"
    "src/i18n/ru/story/depression_story.json"
    "src/i18n/ru/tests/acceptance.json"
    "src/i18n/ru/tests/anxiety.json"
    "src/i18n/ru/tests/bdi.json"
    "src/i18n/ru/tests/bipolar.json"
    "src/i18n/ru/tests/burnout.json"
    "src/i18n/ru/tests/eat.json"
    "src/i18n/ru/tests/hopeless.json"
    "src/i18n/ru/tests/impostor.json"
    "src/i18n/ru/tests/irritation.json"
    "src/i18n/ru/tests/okr.json"
    "src/i18n/ru/tests/sdvg.json"
    "src/i18n/ru/tests/sociophobia.json"
    "src/i18n/ru/texts/diary/stepper.json"
)

total_files=${#files[@]}
reverted_files=0
failed_files=0

echo "Всего файлов для отмены изменений: $total_files"
echo ""

for file in "${files[@]}"; do
    echo "Отмена изменений в файле: $file"

    # Проверяем, существует ли файл
    if [ ! -f "$file" ]; then
        echo "  ❌ Файл не существует: $file"
        failed_files=$((failed_files + 1))
        continue
    fi

    # Отменяем изменения с помощью git checkout
    if git checkout HEAD -- "$file" 2>/dev/null; then
        echo "  ✅ Изменения отменены"
        reverted_files=$((reverted_files + 1))
    else
        echo "  ❌ Не удалось отменить изменения"
        failed_files=$((failed_files + 1))
    fi
    echo ""
done

echo "=== Итоги ==="
echo "Всего файлов обработано: $total_files"
echo "Успешно отменено изменений: $reverted_files"
echo "Не удалось отменить изменения: $failed_files"

if [ $failed_files -eq 0 ]; then
    echo "✅ Все изменения успешно отменены"
else
    echo "❌ Не удалось отменить изменения в $failed_files файлах"
    exit 1
fi