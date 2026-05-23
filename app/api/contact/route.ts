import { NextResponse } from "next/server";
import { siteData } from "../../lib/siteData";

type ContactPayload = {
  location?: unknown;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  siteDetails?: unknown;
};

const brevoEndpoint = "https://api.brevo.com/v3/smtp/email";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getString = (value: unknown, maxLength = 1000) => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const buildDetailRow = (label: string, value: string) => `
  <tr>
    <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#475569;font-weight:600;width:180px;">${label}</td>
    <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#0f172a;">${escapeHtml(value) || "Not provided"}</td>
  </tr>
`;

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const location = getString(payload.location, 180);
  const name = getString(payload.name, 140);
  const phone = getString(payload.phone, 60);
  const email = getString(payload.email, 160);
  const siteDetails = getString(payload.siteDetails, 2000);

  if (!location || !name || !phone) {
    return NextResponse.json(
      { message: "Name, phone number, and project location are required." },
      { status: 400 },
    );
  }

  if (email && !emailPattern.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || siteData.email;
  const senderName = process.env.BREVO_SENDER_NAME || `${siteData.companyName} Website`;
  const recipientEmail = process.env.CONTACT_TO_EMAIL || siteData.email;

  if (!apiKey) {
    return NextResponse.json(
      { message: "Mail service is not configured. Please contact NAGPUR CRANES by phone." },
      { status: 500 },
    );
  }

  const subject = `New website inquiry from ${name}`;
  const htmlContent = `
    <div style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
        <div style="background:#465fff;color:#ffffff;padding:22px 26px;">
          <h1 style="margin:0;font-size:22px;line-height:1.3;">New Rental Inquiry</h1>
          <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">${siteData.companyName} website contact form</p>
        </div>
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
          ${buildDetailRow("Name / Enterprise", name)}
          ${buildDetailRow("Phone Number", phone)}
          ${buildDetailRow("Email Address", email)}
          ${buildDetailRow("Project Location", location)}
          ${buildDetailRow("Site Details", siteDetails)}
        </table>
        <div style="padding:18px 26px;color:#64748b;font-size:13px;line-height:1.5;">
          This inquiry was submitted from the ${siteData.companyName} website.
        </div>
      </div>
    </div>
  `;

  const textContent = [
    "New Rental Inquiry",
    `Name / Enterprise: ${name}`,
    `Phone Number: ${phone}`,
    `Email Address: ${email || "Not provided"}`,
    `Project Location: ${location}`,
    `Site Details: ${siteDetails || "Not provided"}`,
  ].join("\n");

  const brevoPayload: Record<string, unknown> = {
    sender: {
      name: senderName,
      email: senderEmail,
    },
    to: [{ email: recipientEmail }],
    subject,
    htmlContent,
    textContent,
  };

  if (email) {
    brevoPayload.replyTo = { email, name };
  }

  try {
    const response = await fetch(brevoEndpoint, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(brevoPayload),
    });

    if (!response.ok) {
      let providerMessage = "Unknown email provider error";
      try {
        const providerError = await response.json();
        providerMessage = providerError?.message || providerError?.code || providerMessage;
      } catch {
        providerMessage = await response.text();
      }

      console.error("Brevo contact email failed:", response.status, providerMessage);

      if (response.status === 401 && providerMessage.toLowerCase().includes("unrecognised ip address")) {
        return NextResponse.json(
          { message: "Mail service IP is not authorised in Brevo. Please contact NAGPUR CRANES by phone." },
          { status: 503 },
        );
      }

      return NextResponse.json(
        { message: "Failed to send inquiry email. Please call NAGPUR CRANES directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: "Inquiry email sent successfully." });
  } catch (error) {
    console.error("Contact email send failed:", error);
    return NextResponse.json(
      { message: "Failed to send inquiry email. Please call NAGPUR CRANES directly." },
      { status: 502 },
    );
  }
}
