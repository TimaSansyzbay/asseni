# Asseni - Строительная компания

Современный многостраничный веб-сайт для строительной компании Asseni, разработанный с использованием React, TypeScript, Vite, и shadcn/ui.

## 🚀 Технологический стек

- **React 19** - UI библиотека
- **TypeScript** - Типизация
- **Vite** - Сборщик и dev-сервер
- **React Router** - Маршрутизация
- **Tailwind CSS** - Стилизация
- **shadcn/ui** - UI компоненты
- **Lucide React** - Иконки

## 📁 Структура проекта

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Навигационная панель
│   │   ├── Footer.tsx      # Подвал сайта
│   │   └── Layout.tsx      # Основной layout
│   └── ui/                 # shadcn/ui компоненты
├── pages/
│   ├── Landing.tsx         # Главная страница
│   ├── OurWorks.tsx        # Страница "Наши работы"
│   └── Contact.tsx         # Страница "Контакты"
├── App.tsx                 # Основной компонент с роутингом
└── main.tsx               # Точка входа
```

## 🎨 Страницы

### 1. Главная страница (Landing)
- Hero секция с призывом к действию
- Блок "Почему выбирают нас" (4 преимущества)
- Секция услуг (6 основных услуг)
- Статистика компании
- Контактная форма

### 2. Наши работы (Our Works)
- Список выполненных проектов
- Фильтрация по году и статусу
- Поиск по заказчику и видам работ
- Статистика проектов
- Информация о каждом проекте:
  - Наименование заказчика
  - Виды работ
  - Год выполнения
  - Статус (Завершен/В процессе/Запланирован)

### 3. Контакты (Contact)
- Контактная информация (телефон, email, адрес, режим работы)
- Расширенная форма обратной связи
- Дополнительная информация о преимуществах
- Секция с картой

## 🛠️ Установка и запуск

### Установка зависимостей
```bash
npm install
```

### Запуск dev-сервера
```bash
npm run dev
```

### Сборка для production
```bash
npm run build
```

### Предпросмотр production сборки
```bash
npm run preview
```

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# asseni
