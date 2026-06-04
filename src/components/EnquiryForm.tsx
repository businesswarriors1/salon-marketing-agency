"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Send } from "lucide-react";
import { serviceList } from "@/lib/site";

type FormFields = {
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

const initialFields: FormFields = {
  name: "",
  email: "",
  phone: "",
  salonName: "",
  website: "",
  service: "Growth strategy",
  budget: "",
  message: "",
  company: ""
};

export function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const [fields, setFields] = useState<FormFields>(initialFields);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const serviceOptions = useMemo(
    () => ["Growth strategy", ...serviceList.map((service) => service.title)],
    []
  );

  const updateField = (name: keyof FormFields, value: string) => {
    setFields((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(fields)
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "Your enquiry could not be sent. Please try again.");
      }

      router.push("/thank-you");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Your enquiry could not be sent. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={compact ? "enquiry-form enquiry-form--compact" : "enquiry-form"} onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Name
          <input
            required
            autoComplete="name"
            value={fields.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Your name"
          />
        </label>
        <label>
          Email
          <input
            required
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@example.com"
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Phone
          <input
            required
            autoComplete="tel"
            value={fields.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="Best contact number"
          />
        </label>
        <label>
          Salon or clinic
          <input
            autoComplete="organization"
            value={fields.salonName}
            onChange={(event) => updateField("salonName", event.target.value)}
            placeholder="Business name"
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Website
          <input
            type="url"
            autoComplete="url"
            value={fields.website}
            onChange={(event) => updateField("website", event.target.value)}
            placeholder="https://"
          />
        </label>
        <label>
          Service interest
          <select value={fields.service} onChange={(event) => updateField("service", event.target.value)}>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Monthly marketing budget
        <select value={fields.budget} onChange={(event) => updateField("budget", event.target.value)}>
          <option value="">Select a range</option>
          <option value="Under $2,000">Under $2,000</option>
          <option value="$2,000 - $5,000">$2,000 - $5,000</option>
          <option value="$5,000 - $10,000">$5,000 - $10,000</option>
          <option value="$10,000+">$10,000+</option>
        </select>
      </label>
      <label>
        What would you like help with?
        <textarea
          required
          rows={compact ? 4 : 5}
          value={fields.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Tell us about your salon, your goals, and what is not working yet."
        />
      </label>
      <label className="form-honeypot" aria-hidden="true">
        Company
        <input
          tabIndex={-1}
          autoComplete="off"
          value={fields.company}
          onChange={(event) => updateField("company", event.target.value)}
        />
      </label>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <button className="button button--primary form-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <LoaderCircle aria-hidden="true" className="icon-spin" size={18} />
            Sending
          </>
        ) : (
          <>
            Send enquiry
            <Send aria-hidden="true" size={18} />
          </>
        )}
      </button>
    </form>
  );
}
