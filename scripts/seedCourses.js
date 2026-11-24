/**
 * Idempotent Seed Script for SpenFel Digital Skills Lab
 * Seeds 7 categories and 17 professional courses into Firebase Cloud Firestore.
 * 
 * Usage:
 *   node scripts/seedCourses.js [admin-email] [admin-password]
 *   npm run seed:courses
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { courseCategories, defaultCourses } from '../src/data/coursesData.js';

// Resolve project root and load .env.local if present
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env.local');

const envConfig = {};
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf-8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const value = trimmed.slice(idx + 1).trim();
        envConfig[key] = value;
      }
    }
  });
}

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || envConfig.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || envConfig.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || envConfig.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || envConfig.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || envConfig.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID || envConfig.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Firebase credentials not found in environment or .env.local');
  process.exit(1);
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Check for admin credentials from arguments or environment
const adminEmail = process.argv[2] || process.env.ADMIN_EMAIL || envConfig.ADMIN_EMAIL;
const adminPassword = process.argv[3] || process.env.ADMIN_PASSWORD || envConfig.ADMIN_PASSWORD;

async function seedCatalogue() {
  console.log('🚀 Starting SpenFel Digital Skills Lab Database Seed...');
  console.log(`📌 Project ID: ${firebaseConfig.projectId}`);
  console.log(`📂 Categories to verify: ${courseCategories.length}`);
  console.log(`📚 Courses to verify: ${defaultCourses.length}`);

  if (adminEmail && adminPassword) {
    try {
      console.log(`🔐 Authenticating as administrator (${adminEmail})...`);
      await signInWithEmailAndPassword(auth, adminEmail.trim(), adminPassword);
      console.log('✅ Admin authentication successful.');
    } catch (authErr) {
      console.warn(`⚠️ Admin authentication failed: ${authErr.message}`);
      console.log('Attempting unauthenticated/anonymous write...');
    }
  } else {
    console.log('ℹ️ No admin credentials supplied. Tip: Pass credentials to authenticate:');
    console.log('   node scripts/seedCourses.js <admin-email> <admin-password>');
    console.log('   Or use the Admin Desk at /admin/courses -> "Import 17 built-in courses"');
  }

  console.log('----------------------------------------------------');

  let categoriesCreated = 0;
  let categoriesExisting = 0;

  // 1. Seed Categories idempotently
  try {
    for (const category of courseCategories) {
      const catRef = doc(db, 'courseCategories', category.id);
      const catSnap = await getDoc(catRef);

      if (!catSnap.exists()) {
        await setDoc(catRef, {
          ...category,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        categoriesCreated++;
        console.log(`  ➕ Created category: [${category.id}] ${category.name}`);
      } else {
        categoriesExisting++;
        console.log(`  ✓ Category already exists: [${category.id}] (preserved)`);
      }
    }
  } catch (catErr) {
    if (catErr.code === 'permission-denied') {
      console.error('❌ Permission denied by Firestore Rules.');
      console.error('   Please provide admin credentials: node scripts/seedCourses.js <email> <password>');
      console.error('   Or sign in to https://spenfel-digital-systems.vercel.app/admin/courses and click "Import 17 built-in courses".');
      process.exit(0); // Exit safely without crashing build pipelines
    } else {
      throw catErr;
    }
  }

  console.log('----------------------------------------------------');
  let coursesCreated = 0;
  let coursesExisting = 0;

  // 2. Seed Courses idempotently
  for (const course of defaultCourses) {
    const courseRef = doc(db, 'courses', course.slug);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      await setDoc(courseRef, {
        ...course,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      coursesCreated++;
      console.log(`  ➕ Created course: [${course.slug}] ${course.title}`);
    } else {
      coursesExisting++;
      console.log(`  ✓ Course already exists: [${course.slug}] (preserved)`);
    }
  }

  console.log('----------------------------------------------------');
  console.log('🎉 Seeding Summary:');
  console.log(`   Categories: ${categoriesCreated} created, ${categoriesExisting} preserved (Total: ${courseCategories.length})`);
  console.log(`   Courses:    ${coursesCreated} created, ${coursesExisting} preserved (Total: ${defaultCourses.length})`);
  console.log('✅ Idempotent seed complete. Zero data loss.');
}

seedCatalogue().catch((error) => {
  console.error('❌ Seeding error:', error);
  process.exit(1);
});
