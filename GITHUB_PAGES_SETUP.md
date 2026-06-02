# GitHub Pages - Инструкция по созданию сайта

## Содержание

1. [GitHub Pages — обзор](#github-pages--обзор)
2. [Git — что это и нужен ли он](#git--что-это-и-нужен-ли-он)
3. [Решение проблем с Git](#решение-проблем-с-git)
4. [GitHub Pages за 10 минут — без Git](#github-pages-за-10-минут--без-git)
5. [GitHub Pages через Git — полная инструкция](#github-pages-через-git--полная-инструкция)

---

## GitHub Pages — обзор

GitHub Pages — это бесплатный хостинг от GitHub. Ты загружаешь код в репозиторий, и GitHub автоматически собирает и опубликует сайт.

**Сайт будет доступен по адресу:**
```
https://ТВОЙ_НИК.github.io/date-invite/
```
(замени `ТВОЙ_НИК` на свой ник)

---

## Git — что это и нужен ли он

Git — это программа для отправки кода на GitHub. Тебе не обязательно её использовать — можно загружать файлы просто перетаскиванием в браузер. Но если ты планируешь часто обновлять сайт, Git будет удобней.

### Установка Git (на Windows)

1. Открой браузер и перейди по ссылке:
   ```
   https://git-scm.com/download/win
   ```
2. Сайт автоматически определит версию и предложит скачать установщик
3. Запусти скачанный `.exe` файл — пойдёт мастер установки
4. На каждом шаге жми **Next** (всё оставляй по умолчанию)
5. На последнем шаге жми **Install**
6. Подожди, пока завершится установка, жми **Finish**

### Проверка

Способ 1: нажми `Win + R`, введи `cmd` и жми Enter

Способ 2: открой меню Пуск → напиши `cmd` → открой “Командная строка”

В открывшемся окне введи:
```bash
git --version
```

Если вернило версию (например, `git version 2.45.0`), Git установлен.

Если ошибка «git не является внутренней или внешней командой» — перезагрузи компьютер.

---

## Решение проблем с Git

Если ты получил ошибку:
```
error: src refspec main does not match any
error: failed to push some refs to 'https://github.com/aerade/date-invite.git'
```

Это означает, что коммит не был создан. Исправление:

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

Если ошибка повторяется, проверь статус:
```bash
git status
```

Если нет файлов для коммита, перейди в папку с проектом (где лежат файлы кода) и снова:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ТВОЙ_НИК/date-invite.git
git push -u origin main
```

---

## GitHub Pages за 10 минут — без Git

Этот способ не требует установки Git и любых программ. Достаточно браузера.

### Шаг 1: Скачай код из Replit

На компьютере открой папку, где лежат файлы проекта (например, `C:\Users\aerade\Downloads\date-invite`).

Важно: сайт уже настроен для GitHub Pages! Все конфигурации есть.

### Шаг 2: Создай репозиторий на GitHub

1. Зайди на [github.com](https://github.com) → нажми верхний правый плюс (“+”) → **New repository**
2. **Repository name**: `date-invite`
3. **Public** — обязательно!
4. Не делай галочку “Add a README file”
5. Нажми **Create repository**

### Шаг 3: Загрузи код через браузер

1. В своём новом репозитории на GitHub нажми кнопку добавления файла (вверху вместо иконки добавления будет кнопка обзора кода)
2. Выбери **Upload files**
3. Вернись в папку с кодом на компьютере
4. Выдели все файлы (можешь нажать `Ctrl+A` в окне папки)
5. Перетащи выделенные файлы в браузер на окно загрузки в GitHub
6. Напиши сообщение к коммиту: “Initial commit”
7. Нажми **Commit changes**

### Шаг 4: Включи GitHub Pages

1. В репозитории на GitHub нажми **Settings**
2. Слева в меню нажми **Pages**
3. В разделе “Build and deployment”:
   - **Source**: выбери **GitHub Actions**
   - Нажми **Save**

### Шаг 5: Запусти сборку

1. В верхнем меню нажми **Actions**
2. В списке воркфлов нажми на “Deploy to GitHub Pages”
3. Нажми сверху справа кнопку **Run workflow** → **Run workflow**
4. Сборка запустится (обычно 1-2 минуты)
5. Жди зелёной галочки “✓” вдобавок от названия воркфлоу

### Шаг 6: Получи ссылку

Перейди во вкладку **Settings** → **Pages**.

Сайт будет доступен по адресу:
```
https://ТВОЙ_НИК.github.io/date-invite/
```
(замени `ТВОЙ_НИК` на свой ник)

---

## GitHub Pages через Git — полная инструкция

Этот способ быстрее, но требует установки Git.

### Шаг 1: Скачай код

На компьютере открой папку, где лежат файлы проекта.

### Шаг 2: Создай репозиторий

Сделай то же, что в простом способе (Steps 2-5 в разделе без Git).

### Шаг 3: Загрузи код через командную строку

Открой папку с кодом в терминале (CMD, PowerShell или Terminal).

Для Windows — нажми правой кнопкой по папке → “Открыть в терминале”.

Введи эти команды (по одной за раз, жми Enter после каждой):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ТВОЙ_НИК/date-invite.git
git push -u origin main
```

GitHub попросит логин и пароль — введи их.

### Шаг 4: Включи GitHub Pages

Сделай то же, что в простом способе: Settings → Pages → Source: GitHub Actions.

### Шаг 5: Запусти сборку

Сделай то же: Actions → “Deploy to GitHub Pages” → Run workflow.

### Шаг 6: Получи ссылку

Сайт будет доступен по адресу:
```
https://ТВОЙ_НИК.github.io/date-invite/
```

---

## Обновление файлов (если уже есть репозиторий)

Если ты уже загрузил код на GitHub, но обновил файлы на компьютере, используй:

```bash
cd C:\Users\aerade\Downloads\date-invite
git add .
git commit -m "Fix package.json for npm"
git push origin main
```

Если репозиторий есть, но не подключен:

```bash
cd C:\Users\aerade\Downloads\date-invite
git remote add origin https://github.com/aerade/date-invite.git
git branch -M main
git push -u origin main
```

Если нет репозитория (загружал через браузер):

```bash
cd C:\Users\aerade\Downloads\date-invite
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/aerade/date-invite.git
git push -u origin main
```

После пуша запусти workflow: Actions → “Deploy to GitHub Pages” → Run workflow.

---

## Что есть в проекте

Все настройки уже готовы:

- `vite.config.ts` — автоматически использует `/date-invite/` как базовый путь на GitHub Pages
- `package.json` — есть команда `build:gh-pages`
- `.github/workflows/deploy.yml` — автоматический деплой при каждом пуше
- `.nojekyll` — отключает обработку Jekyll

Все, что нужно — это перейти по инструкции выше.
