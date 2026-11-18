# SpenFel Digital Systems Website

A modern premium glassmorphic corporate website for SpenFel Digital Systems, a Malawi-based technology startup.

## Features

- **Glassmorphism UI**: Frosted glass cards with soft transparency and blurred backgrounds
- **Animated Background**: Particle network effects and gradient animations
- **Smooth Animations**: Scroll reveal animations, hover effects, and parallax
- **Responsive Design**: Mobile-first approach with full device compatibility
- **Premium Aesthetic**: Clean corporate design with neon glow effects

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful icon library

## Color Palette

- Primary Navy Blue: `#0A1F44`
- Accent Green: `#16A34A`
- White: `#FFFFFF`
- Light Frost Glass: `rgba(255,255,255,0.12)`
- Border Glass: `rgba(255,255,255,0.18)`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deploy to Vercel

**Production site**: https://spenfel-digital-systems.vercel.app

Import this repository in Vercel and use the following project settings:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

The `vercel.json` rewrite supports direct visits and refreshes on client-side routes such as `/portfolio/blog`. Configure the Firebase environment variables below in Vercel to enable admin, newsletter storage, managed content, and analytics.

## Firebase admin and managed content

The private `/admin` workspace uses Firebase Authentication and Cloud Firestore. Firebase web configuration is read only from these Vite environment variables:

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

Set them in a local `.env.local` file and in the deployment platform's environment settings. Do not commit credentials or service-account keys. Without these settings, the public site uses its built-in projects and services, newsletter and contact message submissions report that saving is unavailable, training announcements cannot be loaded, and analytics are not recorded.

To enable the admin:

1. Create a Firebase project and register a Web app. Copy its public web-app settings into the variables above. Create a Cloud Firestore database for the project.
2. In Firebase Console → Authentication → Sign-in method, enable **Email/Password**. Create each administrator account from the console; the site does not offer public account creation.
3. In Firestore, create an `admins/{AUTH_UID}` document for each approved user. Use the UID shown on that user's Firebase Authentication page and set:

   ```json
   { "active": true, "role": "admin" }
   ```

   The signed-in user can read only their own grant document. Admin privilege is checked in both the app and Firestore rules.
4. Publish the repository's `firestore.rules` in Firebase Console → Firestore Database → Rules (or deploy it with an already-installed Firebase CLI).

Training cover uploads also use Firebase Storage. Create or enable the project's Storage bucket, set `VITE_FIREBASE_STORAGE_BUCKET` to its bucket name in `.env.local` and in the deployment platform's environment settings, and publish the repository's `storage.rules` in Firebase Console → Storage → Rules. The rule grants public reads only under `training-program-images/` and limits uploads to JPEG, PNG, or WebP images no larger than 5 MB from active Firestore administrators. `firebase.json` includes the rules file for use with an already-installed Firebase CLI; rules are not published automatically by the app.

Public visitors may create only schema-validated newsletter subscription, contact message, training enquiry/enrollment request, and anonymous page-view documents; they cannot read those collections. Only active administrators may read subscriptions, contact messages, and analytics. Contact submissions appear in the read-only **Messages** section of `/admin`. Public projects and services are readable, but writes require an active administrator. If the managed `projects` or `services` collection has no documents, the public page clearly notes that it is showing built-in content. Importing the defaults is an explicit, one-time action in the corresponding admin screen; it does not silently replace records. If a configured public collection cannot be read, the site shows its fallback content with a visible diagnostic rather than treating the error as an empty collection.

The public `/training` page displays only published announcements as image-led cards, with an accessible details dialog and enquiry/enrollment actions. In `/admin` → **Training**, administrators can create, edit, publish, and unpublish programmes, and preview or replace cover images; saving edits without selecting an image keeps the existing one. Each published programme accepts enquiries and enrollment requests; enrolling submits a request and does not confirm a place. In **Training requests**, administrators can mark enquiries as new/contacted/closed and enrollment requests as pending/approved/waitlisted/declined, and save private follow-up notes. Applicant details, statuses, and notes are readable only by administrators.

Overview metrics count client-recorded public page views and distinct random browser IDs within the selected date range. They are anonymous estimates, not complete server-side traffic analytics. Ad blockers, offline visits, or storage restrictions may prevent events from being recorded.

## Project Structure

```
mw265-website/
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── WhyChooseUs.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Navigation.jsx
│   │   ├── Logo.jsx
│   │   └── ParticleBackground.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Sections

1. **Hero**: Large animated hero with gradient background and floating device mockups
2. **About**: Glass card with company description and service categories
3. **Services**: 7 service cards with hover animations (Mobile App, Website, Graphic Design, 3D Design, IoT, Computer Repair, Digital Skills Lab)
4. **Why Choose Us**: 5 feature cards highlighting key advantages
5. **Portfolio**: Project showcase with category labels
6. **Contact**: Glass contact panel with phone, WhatsApp, email, and location
7. **Footer**: Dark glass footer with logo and social links

## Contact Information

- **Phone**: +265 997 473 256
- **WhatsApp**: +265 889 887 486
- **Email**: support@spenfel.com
- **Location**: Lilongwe, Malawi

## License

© 2024 MW265 Technologies. All rights reserved.
