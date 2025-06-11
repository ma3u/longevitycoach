# Longevity Coach Frontend

This is the frontend for the Longevity Coach application, built with Next.js and Tailwind CSS. The application is designed to be deployed as a static site on GitHub Pages.

## Features

- Responsive design that works on all devices
- Static site generation for fast loading and SEO benefits
- Contact form with client-side validation
- Modern UI with Tailwind CSS
- GitHub Pages deployment ready

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Git

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/longevitycoach.git
   cd longevitycoach/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

To build the static site:

```bash
npm run build
npm run export
```

This will create an `out` directory with the static files that can be served by any static web server.

## Deployment to GitHub Pages

1. Ensure your repository is set up with GitHub Pages to serve from the `gh-pages` branch
2. Push your changes to the `main` branch
3. The GitHub Actions workflow will automatically build and deploy the site

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Project Structure

```
frontend/
├── .github/workflows/    # GitHub Actions workflows
├── public/               # Static files
├── src/
│   ├── app/             # App router pages and layouts
│   ├── components/       # Reusable components
│   ├── styles/           # Global styles
│   └── types/            # TypeScript type definitions
├── .eslintrc.json        # ESLint configuration
├── .gitignore           # Git ignore file
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies and scripts
├── postcss.config.js    # PostCSS configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application
- `npm run export` - Export the static site to the `out` directory
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# Base URL for API requests (if needed)
NEXT_PUBLIC_API_URL=https://api.example.com

# GitHub Pages repository name (if deploying to a project site)
NEXT_PUBLIC_BASE_PATH=/repository-name
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
