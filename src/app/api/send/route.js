import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;

  // Fallback if environment variables are missing
  if (!apiKey || !fromEmail) {
    return NextResponse.json({
      error: "Missing RESEND_API_KEY or FROM_EMAIL in environment variables.",
    });
  }

  const resend = new Resend(apiKey);
  const { email, subject, message } = await req.json();

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail, email],
      subject: subject,
      html: `
        <h1>${subject}</h1>
        <p>Thank you for contacting us!</p>
        <p>New message submitted:</p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

