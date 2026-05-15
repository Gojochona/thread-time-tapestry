## Goal

Move from route-coupled code to a feature-domain architecture. Routes become thin entries that import from `src/features/*`. Components, hooks, modals, and stage logic live next to the feature they serve.

## Target structure

```text
src/
├── components/
│   ├── ui/              # shadcn primitives (unchanged)
│   └── shared/          # cross-feature: Logo, Navbar, Footer, Blobs, MapView, Button, Input, PaymentIcons
├── features/
│   ├── home/            # landing page sections + hooks
│   ├── auth/            # login + signup forms, validation
│   ├── dashboard/
│   │   ├── layout/      # sidebar, collapsed state, tooltips
│   │   ├── overview/    # dashboard.index content
│   │   ├── create/      # create-order flow + modals (TailorSearch, TailorProfile, TailorBid, OrderSummary)
│   │   ├── orders/      # list, detail (chat), pay, fabric, acknowledge, rate + stage logic
│   │   ├── explore/
│   │   ├── tailors/
│   │   ├── wallet/
│   │   └── settings/
│   └── shared/          # cross-feature primitives (Modal shell, animations)
├── routes/
│   ├── __root.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── signup.tsx
│   └── _dashboard/
│       ├── _dashboard.tsx (layout)
│       ├── dashboard.index.tsx
│       ├── dashboard.create.tsx
│       ├── dashboard.explore.tsx
│       ├── dashboard.tailors.tsx
│       ├── dashboard.wallet.tsx
│       ├── dashboard.settings.tsx
│       ├── dashboard.orders.index.tsx
│       ├── dashboard.orders.$orderId.tsx
│       ├── dashboard.orders.$orderId.pay.tsx
│       ├── dashboard.orders.$orderId.fabric.tsx
│       ├── dashboard.orders.$orderId.acknowledge.tsx
│       └── dashboard.orders.$orderId.rate.tsx
├── lib/                 # framework-agnostic utils (utils.ts, error-capture, error-page)
├── hooks/               # cross-feature hooks (use-mobile)
├── types/               # shared TS types (Order, Tailor, OrderStage)
└── styles/              # styles.css moved here
```

Each route file shrinks to ~5 lines:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { OrdersListPage } from "@/features/dashboard/orders/OrdersListPage";

export const Route = createFileRoute("/_dashboard/dashboard/orders/")({
  component: OrdersListPage,
});
```

## Migration steps

1. **Create new directories** — `src/features/{home,auth,dashboard/{layout,overview,create,orders,explore,tailors,wallet,settings}}`, `src/components/shared/`, `src/types/`, `src/styles/`.
2. **Move shared components** — Logo, Navbar, Footer, Blobs, MapView, Button, Input, PaymentIcons → `src/components/shared/`. Modal shell → `src/features/shared/`.
3. **Extract page bodies** — for each route file, move the component (and its local helpers/sub-components) into a feature module:
   - `routes/index.tsx` → `features/home/HomePage.tsx`
   - `routes/login.tsx` → `features/auth/LoginPage.tsx`
   - `routes/signup.tsx` → `features/auth/SignupPage.tsx`
   - `routes/_dashboard.tsx` → keep route shell, move sidebar/topbar to `features/dashboard/layout/DashboardShell.tsx`
   - `dashboard.create.tsx` → `features/dashboard/create/CreateOrderPage.tsx`; the 4 modals move under `features/dashboard/create/modals/`
   - `dashboard.orders.*` → `features/dashboard/orders/{OrdersListPage,OrderDetailPage,PayPage,FabricPage,AcknowledgePage,RatePage}.tsx`
   - `lib/orderStage.ts` → `features/dashboard/orders/orderStage.ts`
4. **Co-locate types** — `Order`, `Tailor`, `Stage` types extracted into `features/dashboard/orders/types.ts` (or `src/types/` if cross-feature).
5. **Rewrite imports** — every moved file gets new `@/...` import paths. Route files import only their page component.
6. **Move styles** — `src/styles.css` → `src/styles/styles.css`. Update `src/routes/__root.tsx` import (`../styles/styles.css?url`).
7. **Code-split heavy pages** — convert the largest routes (create flow, order detail) to `.lazy.tsx` co-routes for better lazy boundaries. Critical route file holds only `createFileRoute`; lazy file holds the component via `createLazyFileRoute` + `getRouteApi`.
8. **Verify** — `routeTree.gen.ts` regenerates automatically; do not edit. Confirm preview boots, navigation works, modals open, order stages persist.

## What does NOT change

- Route URLs (no user-visible navigation changes).
- Route tree structure under `src/routes/` (still file-based, same paths).
- shadcn `components/ui/` location (matches `components.json` config).
- `routeTree.gen.ts` (auto-generated).
- Business logic (order stages, mocked data, animations) — moved verbatim, not rewritten.

## Risks & mitigations

- **Import churn** — large mechanical search-replace across ~20 files. Mitigate by moving one feature at a time and verifying preview between steps.
- **shadcn path** — `components.json` expects `@/components/ui`. Keep that exact path; only move non-ui components.
- **Lazy boundaries** — `.lazy.tsx` requires `getRouteApi` instead of `Route.useParams()`. I'll convert carefully and only for routes that benefit (create + order detail).
- **Scope** — this is a 30+ file refactor. I'll do it in one pass, then verify the build and a few key flows (home → login → dashboard → create → orders → order detail).

## Out of scope

- Adding new features or screens.
- Changing visual design or copy.
- Backend/auth wiring (no Lovable Cloud changes).
- Test infrastructure.

Approve and I'll execute the migration in the order above.