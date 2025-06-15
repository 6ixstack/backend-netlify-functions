import nodemailer from "nodemailer";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

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
    source,
  } = data;

  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
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
      <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Heard From:</strong> ${source || "N/A"}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Error sending email:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
}
