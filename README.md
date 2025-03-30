# Softuni Movies

A React-based Single Page Application for movie enthusiasts, providing comprehensive information about films, TV series, and celebrities. The platform features public catalog browsing and private user areas with personalized watchlists and reviews functionality.

## Live Preview

[![Live Demo](https://img.shields.io/badge/Live_Demo-Open-green?style=for-the-badge)](https://softuni-movies.web.app/)

**Important Note:**  
If you encounter any styling issues (CSS not loading properly) in the live preview, please clone and run the project locally

## Test User - email: hota@abv.bg password:123456

## Project Overview

This project was developed as part of the SoftUni React course, fulfilling all assignment requirements including:
- Public and private sections
- User authentication
- CRUD operations
- Client-side routing

## Technologies Used

- **Frontend:**
  - React (v19)
  - React Router (v7)
  - Tailwind CSS with DaisyUI
  - Firebase Authentication
  - React Toastify for notifications

### Backend Services (Firebase)
- **Firestore Database:** Stores all user-generated content:
  - Movie/TV show reviews
  - User watchlists
- **Firebase Authentication:** Handles user registration and login

### External Data APIs
- **TMDB API:** Provides all movie/TV show metadata including:
  - Title information
  - Cast/crew details
  - Images and videos
  - Trending/related content

[![React](https://img.shields.io/badge/React-✓-blue)]() [![React Router](https://img.shields.io/badge/React_Router-✓-brightgreen)]() [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-✓-important)]() [![Firebase](https://img.shields.io/badge/Firebase_Auth-✓-yellowgreen)]() [![TMDB](https://img.shields.io/badge/TMDB_API-✓-informational)]() [![Firestore](https://img.shields.io/badge/Firestore_DB-✓-orange)]()

## Project Structure

### Public Part (Unauthenticated Access)
- Homepage with trending content
- Movie/TV show catalog
- Detailed view for each title
- Celebrity information
- Login/Register pages

### Private Part (User Area)
- Personalized watchlist
- User reviews management
- Ability to create/edit/delete reviews

## Key Features

### Catalog Views
- **Movies Catalog:** Paginated list of all available movies
- **TV Shows Catalog:** Separate section for television series

### Detailed Views
- Comprehensive media information
- Cast/crew details
- Related/similar titles
- Trailer/other videos
- Latest review

### User Functionality
- **Watchlist Management:** Add/remove titles
- **Review System:** Create/edit/delete reviews
- **Personal Watchlist/Reviews:** Track and manage all media in watchlist/reviews

### Technical Implementation
- JWT authentication via Firebase
- Route guards for protected routes
- Form validation and error handling
- Semi-Responsive design with Tailwind CSS
- Component-based architecture

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/HoTa90/SoftUni-React-Movies-Project.git
   ```

2. Navigate to project directory:
   ```bash
   cd SoftUni-React-Movies-Project
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start development server:
    ```bash
    npm run dev
    ```

5. Access the application at:
   ```bash
   http://localhost:5173/
   ```
   