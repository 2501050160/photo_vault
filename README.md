
# PhotoVault Secure Access Portal

A premium, cinematic web interface designed for sharing high-resolution memories with specific groups. Built with React, Framer Motion, and Tailwind CSS.

## 🚀 Key Features
- **Cinematic Intro**: A custom-animated "Stickman Skating" intro page setting the "Hostel Room 404" vibe.
- **Dynamic Directory**: A full-width banner carousel that switches users every **2 seconds** with a unique "Stickman Pull & Collapse" name animation.
- **Secure Logins**: Individual login pages for Sravanth, Madhu, Aditya, Girish, Shanmuk, Soma, Vignesh, and Admin.
- **Google Drive Integration**: Each user receives a personalized dashboard with direct links to their specific photo folders (Trip pics, TTD, Caves, etc.).
- **Visual Excellence**: Deep slate-950 theme, glassmorphism, star-particle cursors, and fluid transitions.

## 📁 System Architecture
- `constants.ts`: The central registry. Edit usernames, passwords, drive links, and **taglines** here.
- `types.ts`: Interface definitions for Type-Safe development.
- `pages/HomePage.tsx`: The primary landing zone containing the hero, directory banner, and gallery grid.
- `pages/LoginPage.tsx`: Personalized auth screen for each user with ID-based validation.
- `pages/DashboardPage.tsx`: Post-login portal with Drive access.

## 🖼️ Visual Guide: Backgrounds & Names
### Header Section (HomePage)
- **Names**: The large white text in the center rotates through the `USERS_DATA` list automatically every 4 seconds.
- **Background Image**: Currently uses a high-contrast abstract wave image. You can change the URL in the `motion.img` tag within the Hero section of `HomePage.tsx`.

### Directory Banner
- **The Stickman**: A dedicated SVG component that "pulls" the user's name from the left.
- **Collapse Effect**: When a name changes, it squashes vertically and blurs out, simulating a physical collapse.

### User Portraits
- Portraits are sourced from `imageUrl` in `constants.ts`. High-contrast portraits or landscape shots work best here.

## 🛠️ Customization
To update a user's vault content description (e.g., "Recent Trip Pics"):
1. Open `constants.ts`.
2. Locate the user object.
3. Update the `tagline` property. This appears on both the Directory and the Gallery cards.

## 🔒 Security
- This portal uses **ID-based routing**. Accessing `/login/sravanth` only allows login for Sravanth.
- Sessions are stored in `localStorage` for convenience.
- Logic is frontend-driven for group/family use-cases.

---
*Created with focus on Aesthetics and User Experience.*
