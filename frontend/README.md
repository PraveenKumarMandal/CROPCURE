# CropCure Frontend

A React TypeScript frontend for the CropCure potato leaf disease detection application, built for the Smart India Hackathon (SIH) problem statement.

## Features

- 🌱 **AI-Powered Disease Detection**: Upload potato leaf images for instant disease classification
- 📱 **Mobile-First Design**: Fully responsive interface optimized for mobile devices
- 🎨 **Farmer-Friendly UI**: Clean, intuitive design with agricultural theme
- ⚡ **Real-time Analysis**: Get instant results with confidence scores
- 🤖 **AI Solutions**: Receive expert treatment recommendations
- 📸 **Camera Integration**: Capture images directly or upload from gallery

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **API Integration**: Fetch API with TypeScript interfaces

## Pages

1. **Home**: Hero section with call-to-action and feature highlights
2. **Classification**: Image upload and disease analysis interface
3. **About**: Mission statement and SIH problem statement details
4. **Contact**: Feedback form for farmers and users

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd cropcure-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   copy .env.example .env
   ```

4. Update the API URL in `.env` if needed:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. Start the development server:
   ```bash
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API Integration

The frontend expects the following backend endpoints:

- `POST /api/classify` - Image classification
- `POST /api/solution` - AI-generated solutions
- `POST /api/contact` - Contact form submission

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation component
│   ├── Footer.tsx      # Footer component
│   ├── UploadForm.tsx  # Image upload form
│   └── ResultCard.tsx  # Disease result display
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Classification.tsx # Disease detection page
│   ├── About.tsx       # About page
│   └── Contact.tsx     # Contact page
├── services/           # API services
│   └── api.ts          # API integration functions
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared types
└── assets/             # Static assets
```

## Design System

### Colors
- **Farm Green**: #2d5016 (Primary)
- **Leaf Green**: #4a7c59 (Secondary)
- **Earth Brown**: #8b4513 (Accent)
- **Sage Green**: #9caf88 (Background)
- **Wheat Gold**: #f4a460 (CTA buttons)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## Features in Detail

### Image Upload
- Drag and drop functionality
- Camera integration for mobile devices
- File validation and preview
- Support for common image formats

### Disease Classification
- Real-time analysis with loading states
- Confidence score visualization
- Disease-specific color coding
- AI-generated treatment recommendations

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly interface elements
- Optimized for various screen sizes

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App

### Code Style

- TypeScript for type safety
- Functional components with hooks
- Tailwind CSS for styling
- ESLint for code quality

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting service

3. Update API URLs for production environment

## Contributing

This project was developed for the Smart India Hackathon. For contributions or questions, please contact the development team.

## License

This project is part of the Smart India Hackathon 2024 solution.
