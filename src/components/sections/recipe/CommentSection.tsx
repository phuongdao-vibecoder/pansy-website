"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { blockNativeSubmit } from "@/lib/blockNativeSubmit";
import type { RecipeDetail } from "@/content/menu";

/**
 * "Bình luận (n)" + "Phản hồi của bạn" (Figma Frame 6360 406:38541).
 * Comment card: #FEFDE9 (yellow-200), 1 px #DFD420 at 40 %, r16. Inputs: white pills.
 * No backend: a sent comment is added to the list on this page only and is lost on reload.
 */
export function CommentSection({ initial }: { initial: RecipeDetail["comments"] }) {
  const [comments, setComments] = useState(initial);
  const [error, setError] = useState(false);
  const id = useId();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const text = String(data.get("comment") ?? "").trim();
    if (!name || !text) {
      setError(true);
      return;
    }
    setError(false);
    setComments((c) => [...c, { name, text }]);
    form.reset();
  }

  return (
    <div className="flex flex-col gap-16">
      <section aria-labelledby={`${id}-title`} className="flex flex-col gap-6">
        <h2 id={`${id}-title`} className="text-body-lg/[27.3px] font-extrabold md:text-h4">
          Bình luận ({comments.length})
        </h2>
        <ul className="flex flex-col gap-4" aria-live="polite">
          {comments.map((c, i) => (
            <li key={i} className="flex flex-col gap-4 rounded-sm border border-yellow-600/40 bg-yellow-200 px-4 py-5">
              <p className="text-body font-bold">{c.name}</p>
              <p className="text-body">{c.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby={`${id}-form`} className="flex flex-col gap-6">
        <h2 id={`${id}-form`} className="text-body-lg/[27.3px] font-extrabold md:text-h5">
          Phản hồi của bạn
        </h2>
        <form action={blockNativeSubmit} onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <label className="sr-only" htmlFor={`${id}-name`}>
              Tên của bạn
            </label>
            <input
              id={`${id}-name`}
              name="name"
              required
              autoComplete="name"
              placeholder="Tên của bạn"
              aria-invalid={error || undefined}
              className="h-[54px] rounded-full bg-white px-5 text-body placeholder:text-ink outline-none focus-visible:ring-3 focus-visible:ring-green-400"
            />
            <label className="sr-only" htmlFor={`${id}-comment`}>
              Bình luận của bạn
            </label>
            <textarea
              id={`${id}-comment`}
              name="comment"
              required
              rows={3}
              placeholder="Bình luận của bạn"
              aria-invalid={error || undefined}
              className="min-h-[115px] rounded-md bg-white px-5 py-4 text-body placeholder:text-ink outline-none focus-visible:ring-3 focus-visible:ring-green-400"
            />
            {error && (
              <p role="alert" className="text-subtitle text-sunyellow-500">
                Vui lòng nhập tên và bình luận.
              </p>
            )}
          </div>
          <Button type="submit" variant="green" size="md" className="self-center">
            Bình luận ngay
          </Button>
        </form>
      </section>
    </div>
  );
}
