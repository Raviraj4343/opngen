import { CONTACT_DETAILS, HTTP_STATUS } from '../constant.js';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

const getBrevoConfig = () => {
  if (!env.brevoApiKey) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Contact email service is not configured. Please set BREVO_API_KEY.',
    );
  }

  const senderEmail = env.contactFromEmail;

  if (!senderEmail) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Contact sender email is missing. Please set CONTACT_FROM_EMAIL.',
    );
  }

  return {
    apiKey: env.brevoApiKey,
    senderEmail,
    senderName: env.contactFromName || 'OpenGen Contact Form',
  };
};

const escapeHtml = (value = '') => {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
};

export const sendInquiryEmail = async ({ name, phone, email, message }) => {
  const brevoConfig = getBrevoConfig();

  const recipient = env.contactReceiverEmail || CONTACT_DETAILS.email;
  const trimmedName = name.trim();
  const trimmedPhone = phone.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  const safeName = escapeHtml(trimmedName);
  const safePhone = escapeHtml(trimmedPhone);
  const safeEmail = escapeHtml(trimmedEmail);
  const safeMessage = escapeHtml(trimmedMessage).replaceAll('\n', '<br/>');

  const ownerPayload = {
    sender: {
      name: brevoConfig.senderName,
      email: brevoConfig.senderEmail,
    },
    to: [
      {
        email: recipient,
      },
    ],
    replyTo: {
      email: trimmedEmail,
      name: trimmedName,
    },
    subject: `New inquiry from ${trimmedName}`,
    textContent: [
      'New inquiry received from OpenGen website:',
      `Name: ${trimmedName}`,
      `Phone: ${trimmedPhone}`,
      `Email: ${trimmedEmail}`,
      '',
      'Message:',
      trimmedMessage,
    ].join('\n'),
    htmlContent: `
      <h2>New inquiry received from OpenGen website</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Phone:</strong> ${safePhone}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Message:</strong><br/>${safeMessage}</p>
    `,
  };

  const userAcknowledgementPayload = {
    sender: {
      name: brevoConfig.senderName,
      email: brevoConfig.senderEmail,
    },
    to: [
      {
        email: trimmedEmail,
        name: trimmedName,
      },
    ],
    subject: 'We received your inquiry - OpenGen',
    textContent: [
      `Hi ${trimmedName},`,
      '',
      'Thank you for contacting OpenGen. We have received your inquiry and our team will review it shortly.',
      'You can expect a response with next steps, scope, and timeline soon.',
      '',
      'Your submitted details:',
      `Name: ${trimmedName}`,
      `Phone: ${trimmedPhone}`,
      `Email: ${trimmedEmail}`,
      `Message: ${trimmedMessage}`,
      '',
      `If you need immediate assistance, reach us at ${CONTACT_DETAILS.phone} or ${CONTACT_DETAILS.email}.`,
      '',
      `Regards,`,
      `${brevoConfig.senderName}`,
    ].join('\n'),
    htmlContent: `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #13223a; line-height: 1.6; max-width: 640px; margin: 0 auto;">
        <h2 style="margin-bottom: 8px;">Thanks for reaching out, ${safeName}</h2>
        <p style="margin-top: 0; color: #4a5a77;">We have received your inquiry at OpenGen.</p>
        <p>Our team will review your requirements and get back to you with clear next steps, scope, and expected timeline.</p>

        <div style="margin: 20px 0; padding: 16px; border: 1px solid #dce4f2; border-radius: 12px; background: #f8fbff;">
          <p style="margin: 0 0 8px;"><strong>Submitted Details</strong></p>
          <p style="margin: 4px 0;"><strong>Name:</strong> ${safeName}</p>
          <p style="margin: 4px 0;"><strong>Phone:</strong> ${safePhone}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> ${safeEmail}</p>
          <p style="margin: 8px 0 0;"><strong>Message:</strong><br/>${safeMessage}</p>
        </div>

        <p style="margin-bottom: 6px;">Need urgent help?</p>
        <p style="margin-top: 0; color: #4a5a77;">
          Email: ${escapeHtml(CONTACT_DETAILS.email)}<br/>
          Phone: ${escapeHtml(CONTACT_DETAILS.phone)}
        </p>

        <p style="margin-top: 24px;">Regards,<br/><strong>${escapeHtml(brevoConfig.senderName)}</strong></p>
      </div>
    `,
  };

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': brevoConfig.apiKey,
    },
    body: JSON.stringify(ownerPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      `Brevo email send failed: ${errorText || response.statusText}`,
    );
  }

  const userResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': brevoConfig.apiKey,
    },
    body: JSON.stringify(userAcknowledgementPayload),
  });

  if (!userResponse.ok) {
    const userErrorText = await userResponse.text();

    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      `Brevo user acknowledgement failed: ${userErrorText || userResponse.statusText}`,
    );
  }
};
