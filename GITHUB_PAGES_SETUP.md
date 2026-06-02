# GitHub Pages - Инструкция по созданию сайта

## Шаг 1: Скачай код из Replit

1. На компьютере открой папку, где лежат файлы проекта
2. Скопируй все файлы в новую папку (например, `date-invite`)

Важно: сайт уже настроен для GitHub Pages! Все конфигурации есть.

## Шаг 2: Создай репозиторий на GitHub

1. Зайди на [github.com](https://github.com) → нажми верхний правый плюс (“+”) → **New repository**
2. Repository name: `date-invite`
3. Public — обязательно!
4. Не делай галочку “Add a README file”
5. Нажми **Create repository**

## Шаг 3: Загрузи код в GitHub

В терминале (CMD или Terminal) открой папку с кодом и введи:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ТВОЙ_НИК.github.io/date-invite.git
git push -u origin main
```

Замени `ТВОЙ_НИК` на свой ник на GitHub.

## Шаг 4: Включи GitHub Pages

1. В репозитории на GitHub нажми **Settings** (вкладка вверху)
2. Слева в меню нажми **Pages**
3. В разделе “Build and deployment”:
   - **Source**: выбери **GitHub Actions**
   - Сохрани настройки

## Шаг 5: Запусти сборку

1. В верхнем меню нажми **Actions**
2. В списке воркфлов нажми на “Deploy to GitHub Pages”
3. Нажми сверху справа кнопку **Run workflow** → **Run workflow**
4. Сборка запустится (обычно 1-2 минуты)
5. Жди зелёной галочки “✓” вдобавок от названия воркфлоу

## Шаг 6: Получи ссылку

Перейди во вкладку **Settings** → **Pages** ещё раз.

Сайт будет доступен по адресу:

```
https://ТВОЙ_НИК.github.io/date-invite/
```

Замени `ТВОЙ_НИК` на свой ник.

Или перейди во вкладку **Actions** и в последнем запуске нажми на надпись “deploy-pages” — там будет ссылка.

## Что есть в проекте

Все настройки уже готовы:

- `vite.config.ts` — автоматически использует `/date-invite/` как базовый путь на GitHub Pages
- `package.json` — есть команда `build:gh-pages`
- `.github/workflows/deploy.yml` — автоматический деплой при каждом пуше
- `.nojekyll` — отключает обработку Jekyll
- Все ассеты (картинки, видео, звуки) в `public/`

Все, что нужно — скачать код, прописать три команды в терминале, и сайт заработает.
