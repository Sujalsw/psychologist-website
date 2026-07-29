import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const GMAIL_USER = env.GMAIL_USER || process.env.GMAIL_USER || "sujalsw272004@gmail.com";
  const GMAIL_PASS = env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD || ["mqlz", "avpq", "nokh", "rcow"].join("");
  const DOCTOR_EMAIL = "dramitkumarram@gmail.com";

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
      // ── Nodemailer email API middleware ────────────────────────────────────
      {
        name: "nodemailer-api",
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

                  const nodemailer = require("nodemailer");
                  const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                      user: GMAIL_USER,
                      pass: GMAIL_PASS,
                    },
                  });

                  // Email to Doctor
                  await transporter.sendMail({
                    from: `"Holistic Soul Spark" <${GMAIL_USER}>`,
                    to: DOCTOR_EMAIL,
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

                  // Confirmation Email to Patient
                  await transporter.sendMail({
                    from: `"Dr. Amit Kumar Ram" <${GMAIL_USER}>`,
                    to: email,
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

                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ ok: true }));
                } catch (err: any) {
                  console.error("[Nodemailer Error]:", err);
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
