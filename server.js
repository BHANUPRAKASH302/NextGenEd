const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to your preferred email service
  auth: {
    user: process.env.EMAIL_USER || 'bhanuprakashchagantipati@gmail.com', // Replace with your email
    pass: process.env.EMAIL_PASS || 'cjvw jwis oyeb vjwy' // Replace with your app password
  }
});

// Email template function
function createEmailTemplate(userName, userMessage) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; text-align: center;">NextGenEd - Professor Response</h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="font-size: 16px; color: #333;">
          Hi <strong>${userName}</strong>, your message to our professor is:
        </p>
        
        <div style="background-color: white; padding: 15px; border-left: 4px solid #007bff; margin: 15px 0;">
          <p style="font-style: italic; color: #555;">"${userMessage}"</p>
        </div>
        
        <p style="font-size: 16px; color: #333;">
          Our professor will get in touch with you during the sessions of:
        </p>
        
        <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p style="margin: 5px 0; font-weight: bold;">10:00AM -- 11:00AM</p>
          <p style="margin: 5px 0; font-weight: bold;">11:00AM -- 12:00PM</p>
          <p style="margin: 5px 0; font-weight: bold;">12:00PM -- 1:00PM</p>
        </div>
        
        <p style="font-size: 16px; color: #333;">
          Thank you for visiting and using our website. For any advanced information, please contact the below number:
        </p>
        
        <div style="text-align: center; margin: 20px 0;">
          <a href="tel:8309649014" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            📞 83096-49014
          </a>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 14px;">
          Best regards,<br>
          NextGenEd Team
        </p>
      </div>
    </div>
  `;
}

// Contact form endpoint
app.post('/send', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: `NextGenEd - Response to your query: ${subject}`,
      html: createEmailTemplate(name, message)
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(`Email sent successfully to ${email}`);
    
    res.json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
