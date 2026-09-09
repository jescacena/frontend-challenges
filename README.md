This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run TypeScript files from `data`

This project uses Bun, so you can run `.ts` files directly from the terminal without adding `package.json` scripts.

Run a file directly:

```bash
bun run data/easy/detect-type/detect-type.vanila.ts
bun run data/easy/debounce/debounce.vanila.ts
bun run data/easy/throttle/throttle.vanila.ts
```

Some files in `data` are type-level challenges and are not meant to execute at runtime. Type-check them instead:

```bash
bunx tsc --noEmit -p tsconfig.data.json
```

Why use `-p tsconfig.data.json`:

- It loads project TypeScript path aliases like `@/*`.
- It checks only files under `data/**/*.ts` (plus shared `src/utilities/types.ts`).

If Bun is not installed yet:

```bash
curl -fsSL https://bun.sh/install | bash
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
