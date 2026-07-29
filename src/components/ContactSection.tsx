import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

const enquirySchema = z.object({
  full_name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  service: z.string().trim().min(1, "Please select the assistance required").max(100),
  message: z.string().trim().max(1000).optional(),
});

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const parsed = enquirySchema.safeParse({
      full_name: data.get("full_name"),
      email: data.get("email"),
      service: data.get("service"),
      message: data.get("message") || undefined,
    });

    if (!parsed.success) {
      toast({
        title: "Required Fields Missing",
        description: parsed.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      let response: Response;
      try {
        response = await fetch("/.netlify/functions/send-enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        });
        if (!response.ok) throw new Error();
      } catch {
        response = await fetch("/api/send-enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        });
      }

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Failed to send email");
      }

      form.reset();
      setSubmitted(true);
      toast({
        title: "Enquiry sent ✓",
        description: "Thank you — we will get back to you shortly.",
      });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err: any) {
      toast({
        title: "Could not send your enquiry",
        description: err?.message || "Please try again, or email arnavprogammer@gmail.com directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Contact</p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Book Your Session
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Take the first step towards healing and transformation. All consultations are strictly confidential.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-secondary rounded-2xl p-8">
              <h3 className="font-serif text-xl font-semibold text-secondary-foreground mb-6">
                Get in Touch
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center flex-shrink-0">
                    <Mail className="text-secondary" size={18} />
                  </div>
                  <div>
                    <p className="text-secondary-foreground font-medium text-sm">Email</p>
                    <p className="text-secondary-foreground/70 text-sm">arnavprogammer@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center flex-shrink-0">
                    <Phone className="text-secondary" size={18} />
                  </div>
                  <div>
                    <p className="text-secondary-foreground font-medium text-sm">Phone</p>
                    <p className="text-secondary-foreground/70 text-sm">Available upon appointment</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-secondary" size={18} />
                  </div>
                  <div>
                    <p className="text-secondary-foreground font-medium text-sm">Location</p>
                    <p className="text-secondary-foreground/70 text-sm">India · Online Sessions Available</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Important:</strong> Medical treatments should not be discontinued
                without consulting a qualified medical doctor. Healing services are complementary and supportive in nature.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-8 border border-border shadow-elegant space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  maxLength={100}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  maxLength={255}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Assistance Required / Service <span className="text-destructive">*</span>
              </label>
              <select
                name="service"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Select assistance required</option>
                <option>Psychological Counselling</option>
                <option>Past Life Regression</option>
                <option>Reiki Healing</option>
                <option>Cancer Healing Program</option>
                <option>NLP Transformation</option>
                <option>Astrology Consultation</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Message <span className="text-muted-foreground font-normal">(Optional)</span>
              </label>
              <textarea
                rows={4}
                name="message"
                maxLength={1000}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                placeholder="Tell us about your needs..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-gold text-secondary py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-gold disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : submitted ? "Message Sent ✓" : (
                <>
                  <Send size={16} />
                  Send Enquiry
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
