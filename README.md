# NextGenEd Contact Form Backend

This project includes a contact form that automatically sends emails to users with professor's response and available time slots.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Email Configuration
You need to configure your email settings in the `server.js` file or set environment variables:

**Option A: Direct Configuration (in server.js)**
```javascript
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-app-password'      // Replace with your app password
  }
});
```

**Option B: Environment Variables**
Create a `.env` file in the project root:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=5000
```

### 3. Gmail Setup (if using Gmail)
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in your configuration

### 4. Start the Server
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

### 5. Test the Contact Form
1. Open `index.html` in your browser
2. Fill out the contact form
3. Submit the form
4. Check the user's email for the automated response

## Email Template Features

The automated email includes:
- Personalized greeting with user's name
- User's original message
- Professor's available time slots:
  - 10:00AM -- 11:00AM
  - 11:00AM -- 12:00PM
  - 12:00PM -- 1:00PM
- Contact information (phone number)
- Professional styling

## API Endpoints

- `POST /send` - Submit contact form
- `GET /health` - Health check

## Troubleshooting

1. **Email not sending**: Check your email credentials and app password
2. **CORS errors**: Make sure the server is running on port 5000
3. **Form not submitting**: Check browser console for JavaScript errors
