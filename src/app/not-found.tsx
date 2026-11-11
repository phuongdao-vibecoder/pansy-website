import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="container-site flex min-h-dvh flex-col items-center justify-center gap-6 text-center">
      <p className="font-display text-display text-brand">404</p>
      <h1 className="text-h4 font-extrabold">Không tìm thấy trang</h1>
      <Button href="/" variant="green">
        Về trang chủ
      </Button>
    </main>
  );
}
