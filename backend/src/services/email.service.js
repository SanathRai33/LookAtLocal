const nodemailer = require("nodemailer");
const env = require("../config/env");

const createTransporter = () => {
  if (!env.smtpHost || !env.smtpUser || !env.smtpPassword) {
    console.warn(
      "SMTP credentials not configured. Email sending will be disabled.",
    );
    return null;
  }

  return nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpPort === 465,
    auth: {
      user: env.smtpUser,
      pass: env.smtpPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

const transporter = createTransporter();

const sendPasswordResetEmail = async ({ email, fullName, resetToken }) => {
  if (!transporter) {
    console.log("Email service not configured. Skipping email send.");
    return;
  }

  try {
    const resetUrl =
      `${env.clientUrl}/reset-password` +
      `?token=${encodeURIComponent(resetToken)}`;

    const mailOptions = {
      from: env.smtpFrom || env.smtpUser,
      to: email,
      subject: "Reset your LookAtLocal password",
      text:
        `Hi ${fullName},\n\n` +
        `You requested a password reset.\n\n` +
        `Reset your password here:\n${resetUrl}\n\n` +
        `This link expires in ${env.passwordResetExpiresMinutes} minutes.\n\n` +
        `If you did not request this, you can ignore this email.`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #1a1a1a; margin-bottom: 20px;">Reset Your Password</h2>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">Hi ${fullName},</p>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">You requested a password reset for your LookAtLocal account.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Reset Password</a>
          </div>
          <p style="color: #666; font-size: 14px; line-height: 1.6;">This link expires in ${env.passwordResetExpiresMinutes} minutes.</p>
          <p style="color: #666; font-size: 14px; line-height: 1.6;">If you didn't request this, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="color: #888; font-size: 12px; text-align: center;">LookAtLocal - Your Local Community Platform</p>
        </div>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Failed to send password reset email:", error.message);
    throw error;
  }
};

const sendEmailVerificationEmail = async ({
  email,
  fullName,
  verificationToken,
}) => {
  if (!transporter) {
    console.log("Email service not configured. Skipping email send.");
    return;
  }

  try {
    const verificationUrl =
      `${env.clientUrl}/verify-email` +
      `?token=${encodeURIComponent(verificationToken)}`;

    const mailOptions = {
      from: env.smtpFrom || env.smtpUser,
      to: email,
      subject: "Verify your LookAtLocal email address",

      text:
        `Hi ${fullName},\n\n` +
        `Welcome to LookAtLocal!\n\n` +
        `Please verify your email address by clicking the link below:\n` +
        `${verificationUrl}\n\n` +
        `This link expires in ${env.emailVerificationExpiresMinutes} minutes.\n\n` +
        `If you did not create a LookAtLocal account, you can safely ignore this email.`,

      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #1a1a1a; margin-bottom: 20px;">
            Verify Your Email
          </h2>

          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Hi ${fullName},
          </p>

          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Welcome to LookAtLocal! Please verify your email address to activate your account.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a
              href="${verificationUrl}"
              style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;"
            >
              Verify Email
            </a>
          </div>

          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            This verification link expires in
            ${env.emailVerificationExpiresMinutes} minutes.
          </p>

          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            If you didn't create a LookAtLocal account, you can safely ignore this email.
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

          <p style="color: #888; font-size: 12px; text-align: center;">
            LookAtLocal - Your Local Community Platform
          </p>
        </div>`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email verification email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("Failed to send email verification email:", error.message);

    throw error;
  }
};

// const sendTestEmail = async () => {
//   if (!transporter) {
//     console.log("Email service not configured. Cannot send test email.");
//     return;
//   }

//   try {
//     const info = await transporter.sendMail({
//       from: env.smtpFrom || env.smtpUser,
//       to: env.smtpUser,
//       subject: "Test Email from LookAtLocal",
//       text: "This is a test email to verify SMTP configuration.",
//       html: "<p>This is a test email to verify SMTP configuration.</p>",
//     });
//     console.log("Test email sent:", info.messageId);
//     return info;
//   } catch (error) {
//     console.error("Failed to send test email:", error.message);
//     throw error;
//   }
// };

module.exports = {
  sendPasswordResetEmail,
  // sendTestEmail,
  sendEmailVerificationEmail
};
