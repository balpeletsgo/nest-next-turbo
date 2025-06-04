## NestJS and Next.js Monorepo Starter

NestJs and Next.js Turborepo starter

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `backend`: a [NestJS](https://nestjs.com/) app
- `frontend`: a [Next.js](https://nextjs.org/) app

Each app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 18 or higher, as specified in your `package.json`)
- [pnpm](https://pnpm.io/) (version 9.0.0 or higher, as specified in your `package.json`)

## Installations

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd nest-next-turbo
    ```
2.  Install dependencies using pnpm:
    ```bash
    pnpm install
    ```

## Usage

### Development

To start the development servers for both the `backend` (NestJS) and `frontend` (Next.js) apps simultaneously, run the following command from the root of the monorepo:

```bash
pnpm dev
```

This will use Turborepo to run the `dev` script defined in the `package.json` of each app.

### Building for Production

To build all apps for production, run:

```bash
pnpm build
```

This command will create optimized builds for both the `backend` and `frontend` apps in their respective `dist` and `.next` (or `out`) directories.

### Linting and Formatting

To lint your code across all packages:

```bash
pnpm lint
```

To format your code using Prettier:

```bash
pnpm format
```

To check TypeScript types across all packages:

```bash
pnpm check-types
```
