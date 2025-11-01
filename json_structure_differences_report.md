# Отчет о несоответствиях структуры JSON файлов

## Итоги
- **Всего файлов проверено**: 133
- **Файлов с ошибками**: 49
- **Файлов без изменений в структуре**: 84

## Основные типы проблем:

### 1. Изменение количества элементов в массивах

Самая частая проблема - изменение количества элементов в массивах. Это критично, так как нарушает ожидаемую структуру данных.

#### Примеры файлов с проблемами:

**src/i18n/ru/activities/lsafnanS3sf.json**
- Старое: `description: ARRAY_LENGTH_10`, `task: ARRAY_LENGTH_7`
- Новое: `description: ARRAY_LENGTH_8`, `task: ARRAY_LENGTH_6`

**src/i18n/ru/story/depression/control.json**
- Старое: `content: ARRAY_LENGTH_4`
- Новое: `content: ARRAY_LENGTH_5`

**src/i18n/ru/story/depression/death.json**
- Старое: `content: ARRAY_LENGTH_7`
- Новое: `content: ARRAY_LENGTH_6`

**src/i18n/ru/story/depression/disability.json**
- Старое: `content: ARRAY_LENGTH_4`
- Новое: `content: ARRAY_LENGTH_5`

**src/i18n/ru/story/depression/distortions.json**
- Старое: `content: ARRAY_LENGTH_6`
- Новое: `content: ARRAY_LENGTH_5`

**src/i18n/ru/story/depression/duty.json**
- Старое: `content: ARRAY_LENGTH_6`
- Новое: `content: ARRAY_LENGTH_5`

**src/i18n/ru/story/depression/guilt.json**
- Старое: `content: ARRAY_LENGTH_8`
- Новое: `content: ARRAY_LENGTH_9`

**src/i18n/ru/story/depression/incrimination.json**
- Старое: `content: ARRAY_LENGTH_5`
- Новое: `content: ARRAY_LENGTH_4`

**src/i18n/ru/story/depression/label.json**
- Старое: `content: ARRAY_LENGTH_4`
- Новое: `content: ARRAY_LENGTH_5`

**src/i18n/ru/story/depression/lawyer.json**
- Старое: `content: ARRAY_LENGTH_5`
- Новое: `content: ARRAY_LENGTH_4`

**src/i18n/ru/story/depression/lazy.json**
- Старое: `content: ARRAY_LENGTH_7`
- Новое: `content: ARRAY_LENGTH_6`

**src/i18n/ru/story/depression/mirror.json**
- Старое: `content: ARRAY_LENGTH_5`
- Новое: `content: ARRAY_LENGTH_4`

**src/i18n/ru/story/depression/mistake.json**
- Старое: `content: ARRAY_LENGTH_6`
- Новое: `content: ARRAY_LENGTH_5`

**src/i18n/ru/story/depression/nonDepression.json**
- Старое: `content: ARRAY_LENGTH_3`
- Новое: `content: ARRAY_LENGTH_4`

**src/i18n/ru/story/depression/perfectionism.json**
- Старое: `content: ARRAY_LENGTH_8`
- Новое: `content: ARRAY_LENGTH_7`

**src/i18n/ru/story/depression/plan.json**
- Старое: `content: ARRAY_LENGTH_6`
- Новое: `content: ARRAY_LENGTH_5`

**src/i18n/ru/story/depression/read.json**
- Старое: `content: ARRAY_LENGTH_3`
- Новое: `content: ARRAY_LENGTH_4`

**src/i18n/ru/story/depression/real.json**
- Старое: `content: ARRAY_LENGTH_6`
- Новое: `content: ARRAY_LENGTH_5`

**src/i18n/ru/story/depression/rebuff.json**
- Старое: `content: ARRAY_LENGTH_6`
- Новое: `content: ARRAY_LENGTH_5`

**src/i18n/ru/story/depression/self_help.json**
- Старое: `content: ARRAY_LENGTH_7`
- Новое: `content: ARRAY_LENGTH_6`

**src/i18n/ru/story/depression/trap.json**
- Старое: `content: ARRAY_LENGTH_6`
- Новое: `content: ARRAY_LENGTH_5`

**src/i18n/ru/story/depression/unemployment.json**
- Старое: `content: ARRAY_LENGTH_7`
- Новое: `content: ARRAY_LENGTH_6`

**src/i18n/ru/story/depression/vitamins.json**
- Старое: `content: ARRAY_LENGTH_4`
- Новое: `content: ARRAY_LENGTH_5`

### 2. Добавление новых полей

**src/i18n/ru/story/depression_story.json**
- Добавлено новое поле в структуре

**src/i18n/ru/texts/diary/stepper.json**
- Старая структура: 6 полей
- Новая структура: 7 полей (добавлено поле "comparison")

### 3. Изменение структуры тестов

Множество файлов в директории `src/i18n/ru/tests/` имеют изменения в количестве вопросов или вариантов ответов.

## Рекомендации

1. **Восстановить оригинальную структуру массивов** - критически важно для корректной работы приложения
2. **Сохранить добавленные поля**, если они необходимы для функциональности
3. **Проверить логику тестов** - изменение количества вопросов может повлиять на результаты
4. **Протестировать приложение** после исправления структур

## Приоритет исправления

1. **Высокий приоритет**: Файлы с изменением количества элементов в массивах (особенно story/depression/)
2. **Средний приоритет**: Файлы тестов с измененным количеством вопросов
3. **Низкий приоритет**: Добавление новых полей (если это запланированное изменение)