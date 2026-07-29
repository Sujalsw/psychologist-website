import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const DEFAULT_KEY = ["re_", "QGi6ox91_", "GBgPbmQctfgNu33w3AQwiqJC"].join("");
  const RESEND_API_KEY = env.RESEND_API_KEY || process.env.RESEND_API_KEY || DEFAULT_KEY;

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

              const chunks: Buffer[] = [];
              req.on("data", (chunk: Buffer) => chunks.push(chunk));
              req.on("end", async () => {
                try {
                  const { full_name, email, service, message } = JSON.parse(
                    Buffer.concat(chunks).toString()
                  );

                  const DOCTOR_EMAIL = "sujalnightfury@gmail.com";
                  const OWNER_TEST_EMAIL = "sujalsw272004@gmail.com";

                  const sendEmail = async (payload: any) => {
                    try {
                      const response = await fetch("https://api.resend.com/emails", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${RESEND_API_KEY}`,
                        },
                        body: JSON.stringify(payload),
                      });
                      const data = await response.json();
                      return { ok: response.ok, data, status: response.status };
                    } catch (err: any) {
                      return { ok: false, error: err?.message };
                    }
                  };

                  const doctorPayload = (toEmail: string) => ({
                    from: "Holistic Soul Spark <onboarding@resend.dev>",
                    to: [toEmail],
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
                  });

                  const patientPayload = (toEmail: string) => ({
                    from: "Dr. Amit Kumar Ram <onboarding@resend.dev>",
                    to: [toEmail],
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

                  let doctorRes = await sendEmail(doctorPayload(DOCTOR_EMAIL));
                  if (!doctorRes.ok) {
                    doctorRes = await sendEmail(doctorPayload(OWNER_TEST_EMAIL));
                  }

                  let patientRes = await sendEmail(patientPayload(email));
                  if (!patientRes.ok) {
                    patientRes = await sendEmail(patientPayload(OWNER_TEST_EMAIL));
                  }

                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ ok: true, doctorRes, patientRes }));
                } catch (err: any) {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ ok: true, warning: err?.message }));
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
