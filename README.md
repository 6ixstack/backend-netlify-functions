# 6ixStack Contact Form Backend

[![Netlify Status](https://api.netlify.com/api/v1/badges/903247fa-05d1-4feb-9614-45126341e140/deploy-status)](https://app.netlify.com/projects/6ixstackbackend/deploys)

A serverless backend service built with Netlify Functions to handle contact form submissions for the 6ixStack website. This service processes form data, sends emails via Nodemailer, and includes CORS protection for secure cross-origin requests.

## Features

- 📧 **Email Processing**: Automated email delivery using Nodemailer with Hotmail/Outlook
- 🔒 **CORS Protection**: Configurable allowed origins for security
- 🚀 **Serverless**: Deployed as Netlify Functions for scalability
- 📝 **Rich Email Templates**: HTML-formatted emails with structured contact information
- 🛡️ **Error Handling**: Comprehensive error handling and logging

## Project Structure

```
backend-netlify-functions/
├── netlify.toml              # Netlify configuration
├── package.json              # Project dependencies and scripts
└── netlify/
    └── functions/
        └── contact.js        # Main contact form handler
```

## Setup

### Prerequisites

- Node.js (v14 or higher)
- Netlify CLI
- A Hotmail/Outlook email account for sending emails

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend-netlify-functions
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in your Netlify dashboard or `.env` file:
   ```
   EMAIL_USER=your-email@hotmail.com
   EMAIL_PASS=your-app-password
   ```

### Local Development

Start the development server:
```bash
npm run dev
```

The function will be available at `http://localhost:8888/.netlify/functions/contact`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `EMAIL_USER` | Your Hotmail/Outlook email address | Yes |
| `EMAIL_PASS` | Your email app password (not regular password) | Yes |

## API Endpoint

### POST `/.netlify/functions/contact`

Processes contact form submissions and sends emails.

#### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "phone": "+1234567890",
  "message": "I'm interested in your services...",
  "service": "Web Development",
  "timeline": "1-3 months",
  "budget": "$5000-$10000",
  "source": "Google Search"
}
```

#### Response

**Success (200)**
```json
{
  "success": true
}
```

**Error (500)**
```json
{
  "success": false,
  "error": "Error message"
}
```

## CORS Configuration

The service is configured to accept requests from:
- `https://6ixstack.com`
- `https://6ixstack.netlify.app`
- `http://localhost` (for development)
- `http://localhost:3000`
- `http://127.0.0.1`
- `http://127.0.0.1:3000`

## Email Template

The service sends structured HTML emails containing:
- Service type and project details
- Timeline and budget information
- Contact information
- Message content
- Source of inquiry

Emails are sent to the configured email address with a CC to `mohaimenhasan@gmail.com`.

## Deployment

### Manual Deployment

Deploy to production:
```bash
npm run deploy
```

### Automatic Deployment

Connect your repository to Netlify for automatic deployments on every push to the main branch.

## Security Notes

1. **App Passwords**: Use app-specific passwords for email authentication, not your regular email password
2. **Environment Variables**: Never commit sensitive credentials to version control
3. **CORS**: Only add trusted domains to the `allowedOrigins` array
4. **Rate Limiting**: Consider implementing rate limiting for production use

## Troubleshooting

### Common Issues

1. **Email not sending**: 
   - Verify your email credentials
   - Ensure you're using an app password, not your regular password
   - Check that 2FA is enabled on your email account

2. **CORS errors**:
   - Verify the requesting domain is in the `allowedOrigins` array
   - Check that the request includes proper headers

3. **Function not found**:
   - Ensure the function is deployed correctly
   - Check the Netlify Functions dashboard for deployment status

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run dev`
5. Submit a pull request

## License

This project is private and proprietary to 6ixStack.

## Support

For support or questions, contact the development team at mohaimenhasan@gmail.com.
