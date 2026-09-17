# Зеркало на GitHub

Source of truth — Forgejo (`origin`, `https://gx10-…:3011/coolswood/astro-content.git`).
GitHub (`https://github.com/coolswood/astro-content`) — **push-mirror**, только чтение.

## Как работает

- Зеркало настроено **на стороне Forgejo** (Repo Settings → Mirror): любое обновление
  ветки в Forgejo автоматически уезжает на GitHub (`sync_on_commit`), плюс догон
  по расписанию раз в 8 ч. Пушить в GitHub руками не нужно.
- Зеркалятся все ветки и теги. Удалённые в Forgejo ветки на GitHub не удаляются
  (prune выключен).
- Аутентификация — токен `gh` (аккаунт `coolswood`, scope `repo`) в настройках
  зеркала Forgejo. Если токен отзовут/перевыпустят (`gh auth login`), обновить
  пароль зеркала: Forgejo → Settings → Mirror → редактировать.

## Разовый ручной догон (если что-то разошлось)

```bash
git fetch origin --prune
git push github $(git for-each-ref --format='%(refname:short)' refs/remotes/origin \
  | grep -v '/HEAD$' | sed -E 's|^origin/(.+)|origin/\1:refs/heads/\1|')
```
