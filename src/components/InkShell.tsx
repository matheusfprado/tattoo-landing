'use client';

import Link from "next/link";
import { useEffect } from "react";
import { flashDay, navLinks, socialLinks, studioInfo } from "@/data/siteContent";

type InkShellProps = {
  children: React.ReactNode;
};

export function InkShell({ children }: InkShellProps) {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const updateScrollProgress = () => {
      frame = 0;
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      const tilt = (progress - 0.5) * 8;
      const skew = (progress - 0.5) * 4.5;
      root.style.setProperty("--scroll-progress", progress.toString());
      root.style.setProperty("--scroll-tilt", `${tilt}deg`);
      root.style.setProperty("--scroll-skew", `${skew}deg`);
    };

    const handleScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateScrollProgress);
      }
    };

    updateScrollProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document
      .querySelectorAll<HTMLElement>("[data-ink-reveal]")
      .forEach((el) => observer.observe(el));

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        document.body.classList.add("is-idle");
        root.style.setProperty("--scroll-progress", "0");
        root.style.setProperty("--scroll-tilt", "0deg");
        root.style.setProperty("--scroll-skew", "0deg");
      } else {
        document.body.classList.remove("is-idle");
        updateScrollProgress();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) {
        cancelAnimationFrame(frame);
      }
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-[#05100d] to-[#0f1f1b] text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(22,101,75,0.25),_transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(16,50,40,0.25),_transparent_60%)]" />
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-12 md:px-12 lg:px-20">
        <header
          data-ink-reveal
          className="tattoo-scroll-warp flex flex-col gap-6 rounded-full border border-emerald-900/20 bg-black/30 px-6 py-5 backdrop-blur-sm md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-col">
            <span
              className="ink-glitch text-xs uppercase tracking-[0.4em] text-emerald-400"
              data-glitch={studioInfo.name}
            >
              {studioInfo.name}
            </span>
            <strong className="text-lg font-semibold text-white md:text-xl">
              Arte na pele com assinatura.
            </strong>
          </div>
          <nav
            aria-label="Navegação principal"
            className="flex flex-wrap justify-end gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400 md:text-[0.7rem]"
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-transparent px-3 py-2 transition hover:border-emerald-400 hover:text-emerald-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        {children}
      </main>

      <footer className="border-t border-emerald-900/25 bg-[#020807]/95">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between md:px-12 lg:px-20">
          <span>© {currentYear} {studioInfo.name}. Todos os direitos reservados.</span>
          <div className="flex flex-wrap items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                className="text-zinc-400 transition hover:text-emerald-300"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label}
              </Link>
            ))}
            <span className="text-zinc-600">{studioInfo.address}</span>
          </div>
        </div>
      </footer>

      <aside className="pointer-events-none fixed bottom-8 right-8 hidden w-64 rounded-3xl border border-emerald-900/20 bg-[#081914]/90 p-4 text-xs text-zinc-200 shadow-[0_30px_60px_rgba(7,31,24,0.55)] transition md:block">
        <p className="font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
          {flashDay.label}
        </p>
        <p className="mt-1 text-base font-semibold text-white">{flashDay.date}</p>
        <p className="mt-2 text-[0.75rem] leading-5 text-zinc-400">
          {flashDay.description}
        </p>
        <p className="mt-3 text-[0.7rem] uppercase tracking-[0.25em] text-emerald-300/80">
          {flashDay.slots}
        </p>
      </aside>
    </div>
  );
}
