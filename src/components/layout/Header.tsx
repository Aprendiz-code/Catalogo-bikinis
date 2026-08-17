import Link from "next/link";

export function BrandLogo({
  name,
  href = "/",
}: {
  name: string;
  href?: string;
}) {
  return (
    <Link href={href} className="font-display text-base sm:text-lg md:text-xl uppercase tracking-[0.2em] sm:tracking-[0.22em] text-brand-ink truncate">
      {name}
    </Link>
  );
}

export function Header({
  brandName,
  right,
}: {
  brandName: string;
  right?: React.ReactNode;
}) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 sm:gap-4 px-2 sm:px-4 md:px-6 py-3 sm:py-5">
      <BrandLogo name={brandName} />
      <nav className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.16em]">
        {right}
      </nav>
    </header>
  );
}
