import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const RESEND_API_KEY = env.RESEND_API_KEY || process.env.RESEND_API_KEY;

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      // ── Resend email API middleware ──────────────────────────────────────────
      {
        name: "resend-api",
        configureServer(server) {
          server.middlewares.use(
            "/api/send-enquiry",
            async (req: any, res: any) => {
              if (req.method !== "POST") {
                res.statusCode = 405;
                res.end("Method Not Allowed");
                return;
              }

              // Collect request body
              const chunks: Buffer[] = [];
              req.on("data", (chunk: Buffer) => chunks.push(chunk));
              req.on("end", async () => {
                try {
                  const { full_name, email, service, message } = JSON.parse(
                    Buffer.concat(chunks).toString()
                  );

                  const DOCTOR_EMAIL = "dramitkumarram@gmail.com";

                  // ── Email content for Doctor ───────────────────────────────
                  const doctorPayload = (recipient: string) => ({
                    from: "Holistic Soul Spark <onboarding@resend.dev>",
                    to: [recipient],
                    subject: `New Enquiry: ${service}`,
                    html: `
                      <h2 style="color:#7c5c2e;">New Patient Enquiry</h2>
                      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">
                        <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${full_name}</td></tr>
                        <tr><td style="padding:8px;font-weight:bold;">Patient Email</td><td style="padding:8px;">${email}</td></tr>
                        <tr><td style="padding:8px;font-weight:bold;">Service</td><td style="padding:8px;">${service}</td></tr>
                        <tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${message || "—"}</td></tr>
                      </table>
                    `,
                  });

                  // ── Email content for Patient ─────────────────────────────
                  const patientPayload = (recipient: string) => ({
                    from: "Dr. Amit Kumar Ram <onboarding@resend.dev>",
                    to: [recipient],
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
                  });

                  // Attempt sending to Doctor
                  let doctorRes = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${RESEND_API_KEY}`,
                    },
                    body: JSON.stringify(doctorPayload(DOCTOR_EMAIL)),
                  });

                  let doctorResult = await doctorRes.json();

                  // If testing domain limits sending to registered account email only (sujalsw272004@gmail.com)
                  if (!doctorRes.ok && doctorResult.message?.includes("testing emails")) {
                    console.log("[Resend Sandbox Mode Detected] Retrying email delivery to registered account email...");
                    doctorRes = await fetch("https://api.resend.com/emails", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${RESEND_API_KEY}`,
                      },
                      body: JSON.stringify(doctorPayload("sujalsw272004@gmail.com")),
                    });
                    doctorResult = await doctorRes.json();
                  }

                  // Attempt sending patient confirmation
                  let patientRes = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${RESEND_API_KEY}`,
                    },
                    body: JSON.stringify(patientPayload(email)),
                  });
                  let patientResult = await patientRes.json();

                  if (!patientRes.ok && patientResult.message?.includes("testing emails")) {
                    patientRes = await fetch("https://api.resend.com/emails", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${RESEND_API_KEY}`,
                      },
                      body: JSON.stringify(patientPayload("sujalsw272004@gmail.com")),
                    });
                    patientResult = await patientRes.json();
                  }

                  if (!doctorRes.ok && !patientRes.ok) {
                    res.statusCode = 500;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({ error: doctorResult.message || "Failed to send email", details: doctorResult }));
                    return;
                  }

                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ ok: true, doctorResult, patientResult }));
                } catch (err: any) {
                  console.error("[Resend middleware] Unexpected error:", err);
                  res.statusCode = 500;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ error: err?.message || "Server error" }));
                }
              });
            }
          );
        },
      },
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
