const { Resend } = require("resend");
const env = require("../config/env");

if (!env.resendApiKey) {
  console.warn(
    "RESEND_API_KEY is not configured. Email sending will be disabled.",
  );
}

const resend = env.resendApiKey ? new Resend(env.resendApiKey) : null;

const getFromEmail = () => {
  return env.resendFromEmail || "LookAtLocal <onboarding@resend.dev>";
};

const sendEmail = async ({ to, subject, text, html }) => {
  if (!resend) {
    console.warn("Resend email service is not configured. Email not sent.");
    return null;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: getFromEmail(),
      to: [to],
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Resend email error:", error);
      throw new Error(error.message || "Failed to send email");
    }

    console.log("Email sent successfully:", data?.id);

    return data;
  } catch (error) {
    console.error("Failed to send email:", error.message);
    throw error;
  }
};

const sendPasswordResetEmail = async ({ email, fullName, resetToken }) => {
  const resetUrl =
    `${env.clientUrl}/reset-password` +
    `?token=${encodeURIComponent(resetToken)}`;

  const text =
    `Hi ${fullName},\n\n` +
    `You requested a password reset for your LookAtLocal account.\n\n` +
    `Reset your password here:\n${resetUrl}\n\n` +
    `This link expires in ${env.passwordResetExpiresMinutes} minutes.\n\n` +
    `If you didn't request this, you can safely ignore this email.\n\n` +
    `LookAtLocal - Your Local Community Platform`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
      <h2 style="color: #1a1a1a; margin-bottom: 20px;">
        Reset Your Password
      </h2>

      <p style="color: #333; font-size: 16px; line-height: 1.6;">
        Hi ${fullName},
      </p>

      <p style="color: #333; font-size: 16px; line-height: 1.6;">
        You requested a password reset for your LookAtLocal account.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a
          href="${resetUrl}"
          style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;"
        >
          Reset Password
        </a>
      </div>

      <p style="color: #666; font-size: 14px; line-height: 1.6;">
        This link expires in ${env.passwordResetExpiresMinutes} minutes.
      </p>

      <p style="color: #666; font-size: 14px; line-height: 1.6;">
        If you didn't request this, you can safely ignore this email.
      </p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

      <p style="color: #888; font-size: 12px; text-align: center;">
        LookAtLocal - Your Local Community Platform
      </p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Reset your LookAtLocal password",
    text,
    html,
  });
};

const sendEmailVerificationEmail = async ({
  email,
  fullName,
  verificationToken,
}) => {
  const verificationUrl =
    `${env.clientUrl}/verify-email` +
    `?token=${encodeURIComponent(verificationToken)}`;

  const text =
    `Hi ${fullName},\n\n` +
    `Welcome to LookAtLocal!\n\n` +
    `Please verify your email address by clicking the link below:\n` +
    `${verificationUrl}\n\n` +
    `This link expires in ${env.emailVerificationExpiresMinutes} minutes.\n\n` +
    `If you didn't create a LookAtLocal account, you can safely ignore this email.\n\n` +
    `LookAtLocal - Your Local Community Platform`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
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
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Verify your LookAtLocal email address",
    text,
    html,
  });
};

module.exports = {
  sendPasswordResetEmail,
  sendEmailVerificationEmail,
};
