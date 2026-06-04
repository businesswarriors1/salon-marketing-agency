import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type EnquiryPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  salonName?: unknown;
  website?: unknown;
  service?: unknown;
  budget?: unknown;
  message?: unknown;
  company?: unknown;
};

const maxLength = {
  name: 120,
  email: 160,
  phone: 80,
  salonName: 160,
  website: 220,
  service: 220,
  budget: 80,
  message: 2000,
  company: 160
};

function readString(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isLikelyEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: EnquiryPayload;

  try {
    payload = (await request.json()) as EnquiryPayload;
  } catch {
    return NextResponse.json({ error: "Invalid enquiry details." }, { status: 400 });
  }

  const fields = {
    name: readString(payload.name, maxLength.name),
    email: readString(payload.email, maxLength.email),
    phone: readString(payload.phone, maxLength.phone),
    salonName: readString(payload.salonName, maxLength.salonName),
    website: readString(payload.website, maxLength.website),
    service: readString(payload.service, maxLength.service),
    budget: readString(payload.budget, maxLength.budget),
    message: readString(payload.message, maxLength.message),
    company: readString(payload.company, maxLength.company)
  };

  if (fields.company) {
    return NextResponse.json({ ok: true });
  }

  if (!fields.name || !fields.email || !fields.phone || !fields.message) {
    return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
  }

  if (!isLikelyEmail(fields.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.ENQUIRY_TO_EMAIL;
  const fromEmail = process.env.ENQUIRY_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    if (process.env.NODE_ENV !== "production") {
      console.info("Enquiry form development mode: email send skipped because env vars are missing.");
      return NextResponse.json({ ok: true, mode: "development" });
    }

    return NextResponse.json(
      { error: "The enquiry form is not configured yet. Please try again soon." },
      { status: 500 }
    );
  }

  const subject = `New salon marketing enquiry from ${fields.name}`;
  const rows = [
    ["Name", fields.name],
    ["Email", fields.email],
    ["Phone", fields.phone],
    ["Salon or clinic", fields.salonName || "Not provided"],
    ["Website", fields.website || "Not provided"],
    ["Service interest", fields.service || "Not selected"],
    ["Monthly budget", fields.budget || "Not selected"],
    ["Message", fields.message]
  ];

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="padding: 10px 14px; background: #fff8fb; color: #4b164c; width: 190px;">${escapeHtml(label)}</th>
          <td style="padding: 10px 14px; color: #19141d;">${escapeHtml(value).replaceAll("\n", "<br />")}</td>
        </tr>`
    )
    .join("");

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: fields.email,
      subject,
      text,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #19141d; line-height: 1.5;">
          <h1 style="color: #4b164c; font-size: 24px;">New Salon Marketing Agency enquiry</h1>
          <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; border: 1px solid #eadfe6; width: 100%; max-width: 720px;">
            ${htmlRows}
          </table>
        </div>`
    })
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown Resend error");
    console.error("Resend enquiry send failed:", errorText);
    return NextResponse.json(
      { error: "Your enquiry could not be sent. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
