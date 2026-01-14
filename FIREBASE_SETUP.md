# Firebase Setup Instructions

## Step 1: Install Firebase SDK

\`\`\`bash
pnpm add firebase
\`\`\`

## Step 2: Create `.env.local` in the root directory

\`\`\`bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here

# Gemini AI API
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

## Step 3: Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Go to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key** (keep this secret!)
5. For client credentials, go to **Project Settings** → **General**
6. Copy the configuration object and fill in `.env.local`

## Step 4: Enable Firebase Storage

1. In Firebase Console, go to **Storage**
2. Click **Create bucket**
3. Choose region and accept default security rules (update later for production)
4. Copy the bucket name and add to `.env.local` as `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`

## Step 5: Update `lib/firebase.ts`

The file is already created with the following features:
- Firebase initialization with environment variables
- `uploadToStorage()` - Upload files/images
- `getFromStorage()` - Download files
- `listStorageFiles()` - List files in a directory
- `fileToBase64()` - Convert image to base64 for API calls
- `getStorageUrl()` - Get public URL of stored files

## Step 6: Test Firebase Connection

Try uploading a product image:

\`\`\`typescript
import { uploadToStorage } from '@/lib/firebase'

// In your component or server action
const file = new File(['test'], 'test.txt')
const url = await uploadToStorage('test/test.txt', file)
console.log('Uploaded to:', url)
\`\`\`

---

**Next Steps:**
- Step 2: Create Gemini API integration for skin analysis
- Step 3: Create Gemini API integration for chatbot
- Step 4: Update components to use real APIs
