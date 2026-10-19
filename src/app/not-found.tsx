import Link from "next/link";
import { ArrowIcon, Brand } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="page-container flex min-h-svh flex-col items-start justify-center gap-8 py-20">
      <Brand />
      <h1 className="max-w-3xl text-5xl leading-tight tracking-tight md:text-7xl">
        Здесь пока нет дома
      </h1>
      <p className="max-w-xl text-base">
        Эта страница не найдена. Вернитесь на главную, чтобы познакомиться с нашими кварталами.
      </p>
      <Link href="/" className="button button-accent">
        На главную <ArrowIcon />
      </Link>
    </main>
  );
}
