import { NextResponse } from "next/server";
import { siteData } from "../../lib/siteData";

type FeedbackPayload = {
  name?: unknown;
  rating?: unknown;
  comment?: unknown;
  contact?: unknown;
};

const brevoEndpoint = "https://api.brevo.com/v3/smtp/email";

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

export async function POST(request: Request) {
  let payload: FeedbackPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const name = getString(payload.name, 140);
  const comment = getString(payload.comment, 2000);
  const contact = getString(payload.contact, 160);
  const ratingNum = Number(payload.rating);

  if (!name || !comment || isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return NextResponse.json(
      { message: "Name, comments, and a valid star rating (1-5) are required." },
      { status: 400 },
    );
  }

  const googleSheetUrl = process.env.GOOGLE_SHEET_API_URL;
  let loggedInSheet = false;

  // 1. Attempt to log the feedback in Google Sheets
  if (
    googleSheetUrl &&
    googleSheetUrl.trim() !== "" &&
    !googleSheetUrl.includes("YOUR_DEPLOYMENT_ID") &&
    googleSheetUrl.startsWith("http")
  ) {
    try {
      const sheetResponse = await fetch(googleSheetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          rating: ratingNum,
          comment,
        }),
      });

      if (sheetResponse.ok) {
        const sheetData = await sheetResponse.json();
        if (sheetData && sheetData.status === "success") {
          loggedInSheet = true;
        } else {
          console.error("Google Sheets App Script error response:", sheetData);
        }
      } else {
        console.error("Google Sheets request failed with status:", sheetResponse.status);
      }
    } catch (sheetError) {
      console.error("Error connecting to Google Sheets API:", sheetError);
    }
  } else {
    console.warn("GOOGLE_SHEET_API_URL is not configured. Skipping sheet logging.");
  }

  // 2. Send email notification to admin via Brevo
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || siteData.email;
  const senderName = process.env.BREVO_SENDER_NAME || `${siteData.companyName} Website`;
  const recipientEmail = process.env.CONTACT_TO_EMAIL || siteData.email;

  if (!apiKey) {
    // If mail is not configured but sheet logging succeeded, we can still report success.
    // Otherwise return error.
    if (loggedInSheet) {
      return NextResponse.json({ message: "Feedback submitted successfully (Saved to Sheets)." });
    }
    return NextResponse.json(
      { message: "Feedback service configuration is incomplete. Please contact us directly." },
      { status: 500 },
    );
  }

  const starsHtml = "★".repeat(ratingNum) + "☆".repeat(5 - ratingNum);
  const subject = `New website feedback from ${name} (${ratingNum}/5 Stars)`;
  
  const htmlContent = `
    <div style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
        <div style="background:linear-gradient(135deg, #f59e0b, #d97706);color:#ffffff;padding:22px 26px;">
          <h1 style="margin:0;font-size:22px;line-height:1.3;">New Customer Feedback</h1>
          <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">${siteData.companyName} website review form</p>
        </div>
        <div style="padding:26px;border-bottom:1px solid #e5e7eb;">
          <div style="font-size:24px;color:#f59e0b;font-weight:bold;margin-bottom:16px;">
            ${starsHtml} <span style="color:#0f172a;font-size:18px;font-weight:normal;margin-left:8px;">(${ratingNum} out of 5 stars)</span>
          </div>
          <p style="font-size:16px;line-height:1.6;color:#334155;font-style:italic;margin:0;padding-left:14px;border-left:4px solid #f59e0b;">
            "${escapeHtml(comment)}"
          </p>
        </div>
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:14px 26px;border-bottom:1px solid #e5e7eb;color:#64748b;font-weight:600;width:150px;">Customer Name</td>
            <td style="padding:14px 26px;border-bottom:1px solid #e5e7eb;color:#0f172a;font-weight:bold;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding:14px 26px;border-bottom:1px solid #e5e7eb;color:#64748b;font-weight:600;">Contact Details</td>
            <td style="padding:14px 26px;border-bottom:1px solid #e5e7eb;color:#0f172a;">${escapeHtml(contact) || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding:14px 26px;border-bottom:1px solid #e5e7eb;color:#64748b;font-weight:600;">Google Sheets Log</td>
            <td style="padding:14px 26px;border-bottom:1px solid #e5e7eb;color:${loggedInSheet ? '#16a34a' : '#dc2626'};font-weight:bold;">
              ${loggedInSheet ? 'Logged Successfully' : 'Not Logged (Check environment variable)'}
            </td>
          </tr>
        </table>
        <div style="padding:22px 26px;background:#f8fafc;color:#64748b;font-size:13px;line-height:1.5;">
          <strong>Next Step</strong>: To display this review on your website, open your Google Sheet <strong>"Nagpur Cranes Feedback"</strong> and change the "Approved" column value for this row to <strong>Y</strong>.
        </div>
      </div>
    </div>
  `;

  const textContent = [
    "New Website Feedback",
    `Name: ${name}`,
    `Rating: ${ratingNum}/5 Stars`,
    `Comment: ${comment}`,
    `Contact Details: ${contact || "Not provided"}`,
    `Google Sheets Log: ${loggedInSheet ? 'Yes' : 'No'}`,
  ].join("\n");

  const brevoPayload = {
    sender: {
      name: senderName,
      email: senderEmail,
    },
    to: [{ email: recipientEmail }],
    subject,
    htmlContent,
    textContent,
  };

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
      console.error("Brevo feedback notification email failed with status:", response.status);
      // If logging to sheet succeeded, we still tell the user it went through.
      if (loggedInSheet) {
        return NextResponse.json({ message: "Feedback submitted successfully (Saved to Sheets)." });
      }
      return NextResponse.json(
        { message: "Failed to send feedback email. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: "Feedback submitted successfully." });
  } catch (error) {
    console.error("Feedback email send failed:", error);
    if (loggedInSheet) {
      return NextResponse.json({ message: "Feedback submitted successfully (Saved to Sheets)." });
    }
    return NextResponse.json(
      { message: "Failed to send feedback email. Please try again later." },
      { status: 502 },
    );
  }
}
