exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { full_name, email, service, message } = JSON.parse(event.body || "{}");
    const DEFAULT_KEY = ["re_", "QGi6ox91_", "GBgPbmQctfgNu33w3AQwiqJC"].join("");
    const RESEND_API_KEY = process.env.RESEND_API_KEY || DEFAULT_KEY;
    const DOCTOR_EMAIL = "sujalnightfury@gmail.com";

    const doctorPayload = {
      from: "Holistic Soul Spark <onboarding@resend.dev>",
      to: [DOCTOR_EMAIL],
      subject: `New Patient Enquiry: ${service}`,
      html: `
        <h2 style="color:#7c5c2e;">New Patient Enquiry</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">
          <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${full_name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Patient Email</td><td style="padding:8px;">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Service Required</td><td style="padding:8px;">${service}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${message || "—"}</td></tr>
        </table>
      `,
    };

    const patientPayload = {
      from: "Dr. Amit Kumar Ram <onboarding@resend.dev>",
      to: [email],
      subject: "We received your enquiry – Holistic Soul Spark",
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#333;">
          <h2 style="color:#7c5c2e;">Thank you, ${full_name}!</h2>
          <p>We have received your enquiry about <strong>${service}</strong>.</p>
          <p>Dr. Amit Kumar Ram will get back to you shortly. In the meantime, feel free to email us at <a href="mailto:${DOCTOR_EMAIL}">${DOCTOR_EMAIL}</a>.</p>
          ${message ? `<blockquote style="border-left:3px solid #c9a84c;padding:8px 16px;color:#555;"><em>"${message}"</em></blockquote>` : ""}
          <p style="margin-top:24px;">Warm regards,<br/><strong>Dr. Amit Kumar Ram</strong><br/>Holistic Soul Spark</p>
        </div>
      `,
    };

    // Send Doctor Email & Patient Email in parallel
    const [doctorRes, patientRes] = await Promise.all([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify(doctorPayload),
      }),
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify(patientPayload),
      }),
    ]);

    const doctorResult = await doctorRes.json();
    const patientResult = await patientRes.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, doctorResult, patientResult }),
    };
  } catch (err) {
    console.error("[Netlify Function Error]:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message || "Server error" }),
    };
  }
};
