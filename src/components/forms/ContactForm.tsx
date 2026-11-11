"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { blockNativeSubmit } from "@/lib/blockNativeSubmit";
import { cn } from "@/lib/cn";

/**
 * "Liên hệ với Pansy" form (Figma "Contact Us" 2515:8462, specs DESIGN_SPEC.md §5.5).
 * Frontend demo: it validates in the browser and shows the designed success popup
 * (Figma 2899:37652). Nothing is sent anywhere (decision 2026-11-09).
 *
 * Validation rules are our own (the design has none): name and phone are required,
 * email is optional but must be valid if filled in.
 */

type Field = "name" | "phone" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

function validate(data: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = "Vui lòng nhập họ và tên.";
  const digits = data.phone.replace(/[\s.\-()]/g, "").replace(/^\+84/, "0");
  if (!digits) errors.phone = "Vui lòng nhập số điện thoại.";
  else if (!/^0\d{9,10}$/.test(digits)) errors.phone = "Số điện thoại chưa đúng định dạng.";
  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    errors.email = "Email chưa đúng định dạng.";
  return errors;
}

/**
 * variant "card": the footer contact card (orange mobile background, yellow desktop card).
 * variant "page": the Liên hệ page (yellow background on all sizes, taller message box,
 * Large button on desktop; Figma 406:17965 / 406:17834).
 */
export function ContactForm({ className, variant = "card" }: { className?: string; variant?: "card" | "page" }) {
  const [errors, setErrors] = useState<Errors>({});
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const found = validate(data);
    setErrors(found);
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    formRef.current?.reset();
    dialogRef.current?.showModal();
  }

  // White on the orange mobile background, dark green on the yellow desktop card.
  const errorColor = variant === "page" ? "text-ink" : "text-white lg:text-ink";

  return (
    <>
      <form ref={formRef} action={blockNativeSubmit} onSubmit={onSubmit} noValidate className={cn("flex flex-col gap-[25px]", className)}>
        <div className={cn("flex flex-col", variant === "page" ? "gap-[11px] lg:gap-4" : "gap-4")}>
          <TextField name="name" label="Họ và Tên" autoComplete="name" error={errors.name} errorColor={errorColor} />
          <TextField name="phone" label="Số điện thoại" type="tel" autoComplete="tel" inputMode="tel" error={errors.phone} errorColor={errorColor} />
          <TextField name="email" label="Email" type="email" autoComplete="email" error={errors.email} errorColor={errorColor} />
          <label className="block">
            <span className="sr-only">Để lại lời nhắn</span>
            <textarea
              name="message"
              rows={3}
              placeholder="Để lại lời nhắn"
              className={cn(fieldBase, "resize-y rounded-sm p-[13px]", variant === "page" ? "min-h-[116px] p-4 lg:min-h-[112px]" : "min-h-[89px]")}
            />
          </label>
        </div>
        <Button type="submit" variant="green" size="md" className={cn("w-full", variant === "page" && "lg:min-h-12 lg:px-6 lg:py-3 lg:text-body-lg")}>
          Gửi thông tin
        </Button>
      </form>

      <SuccessDialog ref={dialogRef} />
    </>
  );
}

const fieldBase =
  "w-full bg-sunorange-bg text-subtitle font-bold text-ink placeholder:text-eyebrow/80 outline-none " +
  "focus-visible:ring-3 focus-visible:ring-green-400 aria-invalid:ring-2 aria-invalid:ring-sunyellow-500";

function TextField({
  name,
  label,
  error,
  errorColor,
  ...inputProps
}: {
  name: Field;
  label: string;
  error?: string;
  errorColor: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const errorId = `${name}-error`;
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <input
        name={name}
        placeholder={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(fieldBase, "h-10 rounded-full px-[13px]")}
        {...inputProps}
      />
      {error && (
        <span id={errorId} className={cn("mt-1 block px-[13px] text-caption font-bold", errorColor)}>
          {error}
        </span>
      )}
    </label>
  );
}

/** Success popup (Figma "Pop up" 2899:37652): 343 wide, radius 16, cream, padding 24, gap 20. */
function SuccessDialog({ ref }: { ref: React.Ref<HTMLDialogElement> }) {
  return (
    <dialog
      ref={ref}
      aria-labelledby="contact-success-title"
      className="m-auto w-[calc(100%-32px)] max-w-[343px] rounded-sm bg-sunorange-bg p-6 text-ink backdrop:bg-grey-950/50"
    >
      <div className="flex flex-col items-start gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element -- Figma green badge with check */}
        <img loading="lazy" src="/svg/icons/check-tick.svg" alt="" width={25} height={25} className="box-content rounded-full bg-green-500 p-3" />
        <div className="flex flex-col gap-3">
          <h2 id="contact-success-title" className="text-body-lg font-bold">
            Gửi thông tin thành công!
          </h2>
          <p className="text-subtitle">
            Cảm ơn bạn đã quan tâm đến dưa lưới Pansy. Chúng tôi sẽ sớm liên hệ.
          </p>
        </div>
        <form method="dialog">
          <Button type="submit" variant="green" size="sm" autoFocus>
            Tiếp tục khám phá
          </Button>
        </form>
      </div>
    </dialog>
  );
}
