
## Запуск проєкту

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

```
src/
├── app/                        # ініціалізація: layout, store, providers, routing
├── views/
│   └── catalog/                # сторінка каталогу (композиція widgets)
├── widgets/
│   ├── header/                 # шапка з лічильником обраного
│   ├── footer/                 # підвал
│   ├── product-catalog/        # каталог: сітка, фільтри, сортування, пагінація
│   └── recommended-products/   # блок рекомендованих товарів
├── features/
│   ├── product-filters/        # фільтри, URL-стейт (useCatalogFilters), хлібні крихти
│   ├── product-sort/           # сортування (desktop dropdown, mobile sheet)
│   └── pagination/             # Load More + пагінація
├── entities/
│   └── product/
│       ├── api/                # RTK Query API, типи домену
│       ├── config/             # опції фільтрів (категорії, кольори, розміри…)
│       └── ui/                 # ProductCard, ProductCardSkeleton, SliderProductCard
└── shared/
    ├── ui/                     # generic UI: Button, Checkbox, Chip, RangeSlider…
    └── lib/                    # generic утиліти: cn, formatPrice, useSkeletonCount
```

## API

Базовий URL: `http://test-woh.keykey.com.ua/v1`

Swagger: [http://test-woh.keykey.com.ua/v1/docs/](http://test-woh.keykey.com.ua/v1/docs/)
