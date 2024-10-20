# Calendar

## Description

A calendar application.

This is a modern calendar application built using **Vue.js** with **TypeScript** and **TailwindCSS**. The project is
bundled using **Vite** for fast development and optimized builds. The application allows users to view and navigate
through different months and years with a clean, responsive interface.

## Features

- Display a calendar grid for different months and years.
- Navigate through months and years using header controls.
- Modular design with reusable Vue components.
- State management using Pinia.
- Responsive design powered by TailwindCSS.

## Installation

1. Install dependencies:
    ```bash
    npm install
    ```

## Usage

### Development

To run the development server, execute:

```bash
npm run dev
```

This will start the Vite server and the app will be accessible at `http://localhost:3000`.

### Building for Production

To build the app for production:

```bash
npm run build
```

The production-ready files will be generated in the `dist/` directory.
If needed to build into other Dir, for example, `public`, add changes to `vite.config.ts`:

```text
build: {
    outDir: 'public',
        assetsDir:'assets',
},
publicDir: '../public',
```

## Customization

You can customize the app's styling by editing the TailwindCSS configuration located in `tailwind.config.js`. Additional
components or calendar views can be created by extending the existing ones inside the `components/` directory.
