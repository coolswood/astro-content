#!/usr/bin/env python3
"""
Скрипт для объединения JSON файлов в один общий файл.
Позволяет объединять файлы по заданным группам для всех языков проекта.

Пример использования:
python merge_files.py --category depression --files control death diagnostic --output control_death_diagnostic
python merge_files.py --category distortions --files achievements approval autonomy --output achievements_approval_autonomy
"""

import json
import os
import argparse
from pathlib import Path
from typing import List, Dict, Any

def get_available_languages(base_path: str) -> List[str]:
    """Получить список доступных языков в проекте"""
    languages = []
    base_dir = Path(base_path)

    for item in base_dir.iterdir():
        if item.is_dir() and len(item.name) == 2:  # языковые коды обычно 2 символа
            languages.append(item.name)
        elif item.name in ['pt_br']:  # особые случаи
            languages.append(item.name)

    return sorted(languages)

def load_json_file(file_path: str) -> Dict[str, Any]:
    """Загрузить JSON файл"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Файл не найден: {file_path}")
        return {}
    except json.JSONDecodeError as e:
        print(f"Ошибка JSON в файле {file_path}: {e}")
        return {}

def merge_files_for_language(
    base_path: str,
    language: str,
    category: str,
    file_names: List[str]
) -> Dict[str, Any]:
    """Объединить файлы для конкретного языка"""
    merged_content = {}

    for file_name in file_names:
        file_path = os.path.join(base_path, language, 'story', category, f"{file_name}.json")

        if os.path.exists(file_path):
            content = load_json_file(file_path)
            if content:
                merged_content[file_name] = content
                print(f"✅ {language}/{category}/{file_name}.json - добавлен")
            else:
                print(f"❌ {language}/{category}/{file_name}.json - ошибка загрузки")
        else:
            print(f"⚠️  {language}/{category}/{file_name}.json - файл отсутствует")

    return merged_content

def save_merged_file(
    output_path: str,
    merged_content: Dict[str, Any],
    pretty: bool = True
) -> bool:
    """Сохранить объединенный файл"""
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            if pretty:
                json.dump(merged_content, f, ensure_ascii=False, indent=2)
            else:
                json.dump(merged_content, f, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"Ошибка сохранения файла {output_path}: {e}")
        return False

def validate_files_exist(
    base_path: str,
    languages: List[str],
    category: str,
    file_names: List[str]
) -> None:
    """Проверить наличие файлов и показать статистику"""
    print("\n📊 Проверка наличия файлов:")
    print("-" * 50)

    total_files = 0
    existing_files = 0

    for language in languages:
        language_files = 0
        language_existing = 0

        for file_name in file_names:
            file_path = os.path.join(base_path, language, 'story', category, f"{file_name}.json")
            language_files += 1
            total_files += 1

            if os.path.exists(file_path):
                language_existing += 1
                existing_files += 1

        if language_existing == language_files:
            status = "✅"
        elif language_existing > 0:
            status = f"⚠️  ({language_existing}/{language_files})"
        else:
            status = "❌"

        print(f"{status} {language}: {language_existing}/{language_files} файлов")

    print(f"\nИтого: {existing_files}/{total_files} файлов найдено")

def main():
    parser = argparse.ArgumentParser(
        description="Объединить JSON файлы по заданным группам",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Примеры использования:
  # Объединить файлы депрессии для всех языков
  python merge_files.py --category depression --files control death diagnostic --output control_death_diagnostic

  # Объединить файлы искажений для всех языков
  python merge_files.py --category distortions --files achievements approval autonomy --output achievements_approval_autonomy

  # Объединить только для конкретных языков
  python merge_files.py --category depression --files control death diagnostic --output control_death_diagnostic --languages ru en de
        """
    )

    parser.add_argument(
        '--category',
        required=True,
        help='Категория файлов (например: depression, distortions)'
    )

    parser.add_argument(
        '--files',
        nargs='+',
        required=True,
        help='Список имен файлов для объединения (без расширения .json)'
    )

    parser.add_argument(
        '--output',
        required=True,
        help='Имя выходного файла (без расширения .json)'
    )

    parser.add_argument(
        '--languages',
        nargs='+',
        help='Список языков для обработки (по умолчанию: все доступные языки)'
    )

    parser.add_argument(
        '--base-path',
        default='src/i18n',
        help='Базовый путь к директории с языками (по умолчанию: src/i18n)'
    )

    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Только проверить наличие файлов, не создавать объединенные файлы'
    )

    parser.add_argument(
        '--compact',
        action='store_true',
        help='Создавать компактный JSON без форматирования'
    )

    args = parser.parse_args()

    # Проверка базового пути
    if not os.path.exists(args.base_path):
        print(f"❌ Базовый путь не существует: {args.base_path}")
        return 1

    # Получение списка языков
    if args.languages:
        languages = args.languages
    else:
        languages = get_available_languages(args.base_path)

    print(f"🌍 Языки для обработки: {', '.join(languages)}")
    print(f"📁 Категория: {args.category}")
    print(f"📄 Файлы для объединения: {', '.join(args.files)}")
    print(f"💾 Выходной файл: {args.output}.json")

    # Проверка наличия файлов
    validate_files_exist(args.base_path, languages, args.category, args.files)

    if args.dry_run:
        print("\n🔍 Режим проверки - файлы не созданы")
        return 0

    print(f"\n🚀 Начинаем объединение файлов...")

    success_count = 0
    total_count = len(languages)

    for language in languages:
        print(f"\n📝 Обработка языка: {language}")

        # Объединение файлов для языка
        merged_content = merge_files_for_language(
            args.base_path, language, args.category, args.files
        )

        if not merged_content:
            print(f"❌ {language}: нет файлов для объединения")
            continue

        # Создание выходного пути
        output_dir = os.path.join(args.base_path, language, 'story', args.category)
        os.makedirs(output_dir, exist_ok=True)
        output_path = os.path.join(output_dir, f"{args.output}.json")

        # Сохранение файла
        if save_merged_file(output_path, merged_content, not args.compact):
            file_size = os.path.getsize(output_path)
            print(f"✅ {language}: создан {args.output}.json ({file_size} байт)")
            success_count += 1
        else:
            print(f"❌ {language}: ошибка сохранения файла")

    print(f"\n🎉 Готово! Успешно создано: {success_count}/{total_count} файлов")

    return 0

if __name__ == '__main__':
    exit(main())