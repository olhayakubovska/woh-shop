# WOH Shop

Тестове завдання

## Стек

| Технологія | Версія | Призначення |
|---|---|---|
| Next.js | 16 | App Router, SSR, routing |
| TypeScript | 5 | Статична типізація |
| Redux Toolkit + RTK Query | 2 | Глобальний стейт, запити до API, кешування |
| Tailwind CSS | 4 | Стилізація |
| FSD | — | Архітектурна методологія |

## Функціонал

- Каталог товарів із завантаженням через API
- Фільтрація: категорія, розмір, колір, матеріал, висота каблука, ціна (множинний вибір)
- Сортування
- Пагінація + кнопка «Показати ще»
- Фільтри та пагінація зберігаються в URL
- Loading / Empty / Error стани
- Адаптивна верстка: mobile / tablet / desktop

## Запуск

**1. Встановити залежності**

```bash
npm install
```

**2. Створити `.env.local` у корені проєкту**

```env
NEXT_PUBLIC_API_URL=http://test-woh.keykey.com.ua/v1
```

**3. Запустити dev-сервер**

```bash
npm run dev
```

Відкрити [http://localhost:3000](http://localhost:3000) — автоматично перенаправляє на `/catalog`.

**Інші команди**

```bash
npm run build   # production build
npm run start   # запуск production build
npm run lint    # перевірка ESLint
```

## Архітектура (FSD)

Проєкт побудовано за методологією [Feature-Sliced Design](https://feature-sliced.design/).

```
src/
├── app/                        # ініціалізація: layout, store, providers, routing
├── views/                      # сторінки 
│   └── catalog/                # сторінка каталогу — композиція widgets
├── widgets/
│   ├── header/                 # шапка з лічильником обраного
│   ├── footer/                 # підвал
│   ├── product-catalog/        # каталог: сітка, фільтри, сортування, пагінація
│   └── recommended-products/   # блок рекомендованих товарів
├── features/
│   ├── product-filters/        # фільтри, URL-стейт, useCatalogFilters, хлібні крихти
│   ├── product-sort/           # сортування (dropdown / mobile sheet)
│   └── pagination/             # Load More + пагінація
├── entities/
│   └── product/
│       ├── api/                # RTK Query API, типи домену (CatalogCard, SortOption…)
│       ├── config/             # опції фільтрів (категорії, кольори, розміри, матеріали)
│       └── ui/                 # ProductCard, ProductCardSkeleton, SliderProductCard
└── shared/
    ├── ui/                     # generic UI-компоненти: Button, Checkbox, Chip, RangeSlider…
    └── lib/                    # generic утиліти: cn, formatPrice, useSkeletonCount
```


