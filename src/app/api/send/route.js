import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, subject, message } = await req.json();

  // Just log the data and return a dummy response
  console.log("Received:", email, subject, message);

  return NextResponse.json({
    message: "API route is working. Email sending is disabled for testing.",
  });
}

