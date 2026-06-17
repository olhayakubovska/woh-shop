## Запуск проєкту

**1. Встановити залежності**

```bash
npm install
```

**2. Створити файл `.env.local` в корені проєкту**

```env
NEXT_PUBLIC_API_URL=http://test-woh.keykey.com.ua/v1
```

**3. Запустити dev-сервер**

```bash
npm run dev
```

Відкрити [http://localhost:3000](http://localhost:3000) — головна сторінка
перенаправляє на `/catalog`.

**Інші команди:**

```bash
npm run build   # production build
npm run start   # запуск production build
npm run lint    # перевірка ESLint
```

## Архітектура (FSD)

```
src/
  app/          # Next.js App Router: layout, сторінки
  widgets/      # header, footer, product-catalog, recommended-products
  features/     # product-filters, product-sort, pagination
  entities/     # product (типи, картка, хук завантаження)
  shared/       # UI-примітиви, типи, конфіг, утиліти, API
```
