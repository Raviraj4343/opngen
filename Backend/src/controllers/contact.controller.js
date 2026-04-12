import { CONTACT_DETAILS, HTTP_STATUS } from '../constant.js';
import { sendInquiryEmail } from '../service/mailer.service.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getContactMeta = asyncHandler(async (_req, res) => {
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      {
        contact: CONTACT_DETAILS,
      },
      'Contact details fetched successfully',
    ),
  );
});

export const submitInquiry = asyncHandler(async (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name?.trim() || !phone?.trim() || !email?.trim() || !message?.trim()) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Please fill in name, phone, email, and message');
  }

  await sendInquiryEmail({
    name,
    phone,
    email,
    message,
  });

  return res.status(HTTP_STATUS.CREATED).json(
    new ApiResponse(
      HTTP_STATUS.CREATED,
      {
        submitted: true,
        contact: CONTACT_DETAILS,
      },
      'Message sent successfully. OpenGen will reach out soon.',
    ),
  );
});
