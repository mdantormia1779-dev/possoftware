import { NextResponse } from "next/server";

const MAX_MESSAGE = 500;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const company = String(body.company ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (name.length < 2) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!subject) {
    return NextResponse.json({ error: "Subject is required." }, { status: 400 });
  }
  if (message.length < 10 || message.length > MAX_MESSAGE) {
    return NextResponse.json(
      { error: `Message must be 10-${MAX_MESSAGE} characters.` },
      { status: 400 },
    );
  }

  // TODO: ekhane apnar backend logic boshan. Jemon:
  //  1) Prisma diye DB te save:
  //     await prisma.contactMessage.create({ data: { name, email, phone, company, subject, message } });
  //  2) Email pathano (Resend / Nodemailer)
  console.log("New contact message:", { name, email, phone, company, subject, message });

  return NextResponse.json({ success: true });
}