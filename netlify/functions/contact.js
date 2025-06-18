import nodemailer from "nodemailer";

const allowedOrigins = [
  "https://6ixstack.com",
  "https://www.6ixstack.com",
  "https://6ixstack.netlify.app",
  "https://www.6ixstack.netlify.app",
  "https://6ixstackbackend.netlify.app",
  "http://localhost",
  "http://localhost:3000",
  "http://127.0.0.1",
  "http://127.0.0.1:3000"
];

export async function handler(event) {
  const origin = event.headers.origin || "";

  const corsHeaders = {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  // Handle preflight CORS (OPTIONS)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "OK"
    };
  }

  // Block non-POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ message: "Method Not Allowed" })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const {
      name,
      email,
      company,
      phone,
      message,
      service,
      timeline,
      budget,
      source
    } = data;

    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"6ixStack Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      cc: "mohaimenhasan@gmail.com",
      subject: `📩 New Inquiry from ${name}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Heard From:</strong> ${source || "N/A"}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    console.error("Email error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
}
