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

type Fields = {
  name: string;
  email: string;
  phone: string;
  salonName: string;
  website: string;
  service: string;
  budget: string;
  message: string;
  company: string;
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

type GhlResult = {
  ok: boolean;
  skipped?: boolean;
  status?: number;
  error?: string;
  contactId?: string;
  noteStatus?: number;
};

// GoHighLevel v2 API (LeadConnector). Uses a Private Integration token (pit-...).
const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

async function sendToGhl(fields: Fields): Promise<GhlResult> {
  const ghlApiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!ghlApiKey) return { ok: false, skipped: true, error: "GHL_API_KEY not set" };
  if (!locationId) return { ok: false, skipped: true, error: "GHL_LOCATION_ID not set" };

  const headers = {
    Authorization: `Bearer ${ghlApiKey}`,
    Version: GHL_API_VERSION,
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  try {
    const nameParts = fields.name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || undefined;

    const tags = ["salon-website-enquiry"];
    if (fields.service) tags.push(fields.service);

    const contactRes = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        locationId,
        firstName,
        lastName,
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        companyName: fields.salonName || undefined,
        website: fields.website || undefined,
        source: "Salon Marketing Agency Website",
        tags
      })
    });

    let contactId: string | undefined;

    if (contactRes.ok) {
      const data = (await contactRes.json()) as { contact?: { id?: string } };
      contactId = data.contact?.id;
    } else {
      // When duplicates are disallowed, v2 returns 400 with meta.contactId for the existing contact.
      const errBody = await contactRes.text().catch(() => "");
      let duplicateId: string | undefined;
      try {
        const parsed = JSON.parse(errBody) as { meta?: { contactId?: string } };
        duplicateId = parsed.meta?.contactId;
      } catch {
        // not JSON; fall through to error
      }

      if (!duplicateId) {
        console.error("GHL contact creation failed:", contactRes.status, errBody);
        return { ok: false, status: contactRes.status, error: errBody.slice(0, 300) };
      }
      contactId = duplicateId;
    }

    let noteStatus: number | undefined;
    if (contactId) {
      const noteBody = [
        `Service interest: ${fields.service || "Not selected"}`,
        `Monthly budget: ${fields.budget || "Not selected"}`,
        "",
        fields.message
      ].join("\n");

      const noteRes = await fetch(`${GHL_API_BASE}/contacts/${contactId}/notes`, {
        method: "POST",
        headers,
        body: JSON.stringify({ body: noteBody })
      });

      noteStatus = noteRes.status;
      if (!noteRes.ok) {
        console.error("GHL note creation failed:", noteRes.status);
      }
    }

    return { ok: true, status: contactRes.status, contactId, noteStatus };
  } catch (err) {
    console.error("GHL send error:", err);
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

export async function POST(request: Request) {
  let payload: EnquiryPayload;

  try {
    payload = (await request.json()) as EnquiryPayload;
  } catch {
    return NextResponse.json({ error: "Invalid enquiry details." }, { status: 400 });
  }

  const fields: Fields = {
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

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.ENQUIRY_TO_EMAIL;
  const fromEmail = process.env.ENQUIRY_FROM_EMAIL;

  if (!resendApiKey || !toEmail || !fromEmail) {
    if (process.env.NODE_ENV !== "production") {
      console.info("Enquiry form development mode: send skipped because env vars are missing.");
      return NextResponse.json({ ok: true, mode: "development" });
    }

    const missing = [
      !resendApiKey && "RESEND_API_KEY",
      !toEmail && "ENQUIRY_TO_EMAIL",
      !fromEmail && "ENQUIRY_FROM_EMAIL"
    ].filter(Boolean);
    console.error("Enquiry form not configured. Missing env vars:", missing.join(", "));

    return NextResponse.json(
      { error: "The enquiry form is not configured yet. Please try again soon.", missing },
      { status: 500 }
    );
  }

  const subject = `New salon marketing enquiry from ${fields.name}`;
  const rows: [string, string][] = [
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

  const [resendResponse, ghlResult] = await Promise.all([
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
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
    }),
    sendToGhl(fields)
  ]);

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text().catch(() => "Unknown Resend error");
    console.error("Resend enquiry send failed:", errorText);
    return NextResponse.json(
      { error: "Your enquiry could not be sent. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, ghl: ghlResult });
}
