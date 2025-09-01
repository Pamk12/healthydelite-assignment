import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

/**
 * Send a plain-text email (used for OTPs)
 */
export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const mailOptions = {
      from: `"HD App" <${EMAIL_USER}>`, // Always include app name
      to,
      subject,
      text, // plain text only (no HTML → avoids Gmail "Promotions" tab)
    };

    await transporter.sendMail(mailOptions);
    console.log(`📩 OTP email sent to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
};
