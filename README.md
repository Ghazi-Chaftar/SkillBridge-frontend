# SkillBridge - Mentorship Platform Frontend

<div align="center">
  <img src="public/images/skillbridge-logo.png" alt="SkillBridge Logo" width="200" height="200">
  
  **Bridge the gap to your success**
  
  A modern mentorship platform connecting students with expert mentors for personalized learning experiences.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38bdf8?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11.0+-ff69b4?style=flat-square&logo=framer)

</div>

### 🎨 User Experience

- **Modern Design**: Clean, responsive UI with smooth animations
- **Mobile-First**: Fully responsive design for all devices
- **Accessibility**: WCAG 2.1 compliant with screen reader support

### 🔐 Authentication & Security

- **Secure Authentication**: JWT-based authentication system
- **Role-based Access**: Separate interfaces for mentors and students
- **Social Login**: Google and Facebook OAuth integration
- **Password Security**: Bcrypt hashing with strong password policies

## 🚀 Tech Stack

### Frontend Framework

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 18](https://reactjs.org/)** - UI library with modern features

### Styling & Animation

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion
  library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Form Management & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with
  easy validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Internationalization

- **[next-intl](https://next-intl-docs.vercel.app/)** - Type-safe
  internationalization
- **Multiple Locales**: English (en) and French (fr) support

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks for quality control
- **[lint-staged](https://github.com/okonet/lint-staged)** - Pre-commit linting

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── (client)/
│   │   │   ├── client/
│   │   │   │   ├── home/          # Landing page
│   │   │   │   ├── about/         # About page
│   │   │   │   ├── contact/       # Contact page with form
│   │   │   │   └── login/         # Authentication pages
│   │   │   │       └── components/ # Auth components
│   │   │   └── layout.tsx         # Client layout
│   │   ├── globals.css           # Global styles
│   │   └── layout.tsx            # Root layout
│   ├── shared/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── navbars/         # Navigation components
│   │   │   ├── form/            # Form components
│   │   │   └── theme/           # Theme components
│   │   └── hooks/               # Custom React hooks
│   └── icons/                   # Custom icon components
├── entities/                    # Business entities and types
├── lib/                        # Utility libraries and stores
├── modules/                    # Feature-specific modules
│   ├── home/                   # Home page components
│   ├── contact/                # Contact functionality
│   └── login/                  # Authentication logic
├── types/                      # TypeScript type definitions
├── validations/                # Zod validation schemas
├── locales/                    # Translation files
│   ├── en/                     # English translations
│   └── fr/                     # French translations
└── middleware.ts               # Next.js middleware
```

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Git** for version control

### 1. Clone the Repository

```bash
git clone https://github.com/archimatchOrg/frontend.git
cd frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

````env
# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api



### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
````

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Type checking
npm run type-check   # Run TypeScript compiler check

# Formatting
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## 🌐 Internationalization

### Adding New Languages

1. Create new locale folder in `locales/`
2. Add translation files (home.json, auth.json, etc.)
3. Update `src/i18n.ts` configuration
4. Add locale to middleware

## 🔧 Configuration Files

- **`next.config.js`** - Next.js configuration
- **`tailwind.config.ts`** - Tailwind CSS configuration
- **`tsconfig.json`** - TypeScript configuration
- **`.eslintrc.json`** - ESLint rules
- **`commitlint.config.ts`** - Commit message linting

## 📈 Performance Optimization

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component with WebP support
- **Bundle Analysis**: Webpack Bundle Analyzer integration
- **Caching**: Strategic caching for static assets and API responses

### Code Standards

- Follow TypeScript strict mode
- Use conventional commit messages
- Follow Prettier formatting rules

<div align="center">
  <p>Built with ❤️ by the SkillBridge team</p>
  <p><strong>Empowering the next generation of learners</strong></p>
</div>
