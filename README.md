# Social Support Application - Frontend

A modern, accessible, and bilingual (English/Arabic) web application for citizens to apply for government financial assistance with AI-powered writing assistance.

## 🚀 Features

- **Multi-step Form Wizard**: 3-step application process with progress tracking
- **AI Writing Assistant**: OpenAI GPT-3.5 integration to help users write detailed descriptions
- **Bilingual Support**: Full English and Arabic support with RTL layout
- **Form Validation**: Comprehensive client-side validation with user-friendly error messages
- **Auto-save Progress**: Automatic localStorage saving - never lose your progress
- **Responsive Design**: Mobile-first design that works on all devices
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Mock Mode**: Works without API key for testing and demonstration

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API Key (optional - app works with mock responses)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/social-support-app.git
cd social-support-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 🔑 Setting Up OpenAI API Key

### Method 1: In-App Setup (Recommended)

1. Run the application
2. Scroll to the bottom of the form
3. Click "Setup OpenAI API Key"
4. Enter your API key (starts with `sk-`)
5. Click "Save API Key"

Your API key is stored locally in your browser and never shared.

### Method 2: Get an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)
6. Use Method 1 above to add it to the app

### Mock Mode

The app works **without an API key** using realistic mock responses. Perfect for:

- Testing the application
- Demonstrations
- Development

## 📱 How to Use the Application

### Step 1: Personal Information

Fill in your basic details:

- Full Name, National ID, Date of Birth
- Gender, Address, City, State, Country
- Phone Number, Email

### Step 2: Family & Financial Information

Provide household details:

- Marital Status
- Number of Dependents
- Employment Status
- Monthly Income
- Housing Status

### Step 3: Situation Descriptions

Write detailed descriptions with AI assistance:

1. **Current Financial Situation** - Describe your financial challenges
2. **Employment Circumstances** - Explain your work situation
3. **Reason for Applying** - State why you need assistance

**Using AI Assistance:**

- Click "Help Me Write" button
- Review the AI-generated suggestion
- Edit the text if needed
- Click "Accept" to use it or "Discard" to cancel

### Submit

Review all information and click "Submit Application" to receive your reference ID.

## 🌍 Language Support

Click the language toggle button (🌐) in the top-right to switch between:

- English (EN)
- Arabic (AR) with RTL layout

## 💾 Auto-Save Feature

Your progress is automatically saved to your browser's local storage:

- Data persists across browser sessions
- Resume from where you left off
- Cleared only after successful submission

## 🏗️ Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool (faster than CRA)
- **Tailwind CSS v4** - Modern utility-first CSS
- **Lucide React** - Beautiful icons
- **OpenAI GPT-3.5 Turbo** - AI text generation
- **React Context API** - State management
- **localStorage** - Progress persistence

## 📦 Build for Production

```bash
# Create optimized production build
npm run build

# Preview the production build
npm run preview
```

## 🔧 Troubleshooting

### API Key Not Working

- Ensure key starts with `sk-`
- Check OpenAI account has credits
- Verify API key permissions

### Form Not Saving

- Check browser localStorage is enabled
- Clear cache and reload
- Try different browser

### Language Not Switching

- Refresh the page
- Clear browser cache

## 📄 Project Structure

```
src/
├── App.jsx          # Main application component
├── main.jsx         # React entry point
└── index.css        # Global styles and Tailwind imports
```

## 🚀 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

1. Build: `npm run build`
2. Upload `dist` folder to Netlify

## 📝 License

This project is created as a case study for frontend development assessment.

## 👤 Author

Aamir Muhammad Amin
aamir1401a@gmail.com
