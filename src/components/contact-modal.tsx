"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Mail, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { site } from "@/lib/site";
import { easeOutExpo } from "./motion";

type ContactContextValue = { open: () => void; close: () => void };

const ContactContext = createContext<ContactContextValue | null>(null);

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used inside <ContactProvider>");
  return ctx;
}

type Status = "idle" | "sending" | "sent" | "error";

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    lastTrigger.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    lastTrigger.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  return (
    <ContactContext.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>{isOpen && <ContactDialog onClose={close} />}</AnimatePresence>
    </ContactContext.Provider>
  );
}

function ContactDialog({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const firstField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    firstField.current?.focus();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Something went wrong. Please try again.");
      }

      setStatus("sent");
      form.reset();
    } catch (cause) {
      setStatus("error");
      setError(cause instanceof Error ? cause.message : "Something went wrong.");
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial="hidden"
      animate="show"
      exit="hidden"
      role="presentation"
    >
      <motion.div
        className="absolute inset-0 bg-maroon-deep/70 backdrop-blur-sm"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-lg overflow-hidden rounded-t-3xl border border-rose/15 bg-ink-soft shadow-2xl shadow-black/50 sm:rounded-3xl"
        variants={{
          hidden: { opacity: 0, y: 32, scale: 0.98 },
          show: { opacity: 1, y: 0, scale: 1 },
        }}
        transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
      >
        <div className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-card-red/30 blur-3xl" />

        <div className="relative p-7 sm:p-9">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact form"
            className="absolute top-5 right-5 rounded-full border border-rose/20 p-2 text-cream/70 transition hover:border-rose/50 hover:text-cream"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>

          <AnimatePresence mode="wait" initial={false}>
            {status === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: easeOutExpo }}
                className="py-6 text-center"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-tile text-maroon-deep">
                  <Check className="h-7 w-7" aria-hidden />
                </div>
                <h2 id={titleId} className="font-display text-3xl">
                  Message sent
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">
                  Thanks for reaching out. Your message is on its way to{" "}
                  {site.email} and you can expect a reply shortly.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-7 rounded-full bg-cream px-7 py-3 text-sm font-semibold text-maroon-deep transition hover:bg-tile"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-[0.7rem] tracking-[0.3em] text-tile/80 uppercase">
                  Get in touch
                </p>
                <h2 id={titleId} className="mt-3 font-display text-3xl sm:text-4xl">
                  Let&apos;s talk
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">
                  Tell me a little about what you need and I&apos;ll get back to you
                  by email.
                </p>

                <form onSubmit={onSubmit} className="mt-7 space-y-4" noValidate={false}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name">
                      <input
                        ref={firstField}
                        name="name"
                        required
                        maxLength={120}
                        autoComplete="name"
                        placeholder="Your name"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        name="email"
                        type="email"
                        required
                        maxLength={200}
                        autoComplete="email"
                        placeholder="you@company.com"
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <Field label="Subject" optional>
                    <input
                      name="subject"
                      maxLength={160}
                      placeholder="Mortgage admin support"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Message">
                    <textarea
                      name="message"
                      required
                      rows={4}
                      maxLength={4000}
                      placeholder="How can I help?"
                      className={`${inputClass} resize-none`}
                    />
                  </Field>

                  {/* Honeypot — hidden from people, tempting to bots. */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />

                  {status === "error" && error && (
                    <p
                      role="alert"
                      className="rounded-xl border border-tile/30 bg-card-red/25 px-4 py-3 text-sm text-cream"
                    >
                      {error}{" "}
                      <a
                        href={`mailto:${site.email}`}
                        className="underline underline-offset-4"
                      >
                        Email {site.email} directly
                      </a>
                      .
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                    whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-cream px-8 py-4 text-sm font-semibold text-maroon-deep transition hover:bg-tile disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4" aria-hidden />
                        Send message
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-xs text-cream/50">
                    Goes straight to {site.email}
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

const inputClass =
  "w-full rounded-xl border border-rose/20 bg-maroon-deep/40 px-4 py-3 text-sm text-cream placeholder:text-cream/35 transition focus:border-tile/60 focus:outline-none";

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs tracking-[0.15em] text-cream/60 uppercase">
        {label}
        {optional && <span className="ml-2 normal-case opacity-60">(optional)</span>}
      </span>
      {children}
    </label>
  );
}
