import Link from "next/link";
import { InkShell } from "@/components/InkShell";
import { portfolioEntries, studioInfo } from "@/data/siteContent";

export default function PortfolioPage() {
  const whatsappLink = `https://wa.me/${studioInfo.whatsappNumber}?text=${encodeURIComponent(
    studioInfo.whatsappMessage
  )}`;

  return (
    <InkShell>
      <section
        data-ink-reveal
        className="tattoo-scroll-warp flex flex-col gap-6 rounded-[32px] border border-emerald-900/20 bg-[#07110e]/80 p-8 backdrop-blur-sm md:p-12"
      >
        <span className="ink-glitch text-xs uppercase tracking-[0.35em] text-emerald-400" data-glitch="Portfólio">
          Portfólio
        </span>
        <h1 className="text-3xl font-semibold text-white md:text-4xl">Peças recentes favoritas da Frank Tattoo</h1>
        <p className="max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
          Selecionamos alguns projetos que representam a variedade de estilos que produzimos — do contraste pesado do
          blackwork ao delicado da linha fina e às texturas realistas.
        </p>
      </section>

      <section
        data-ink-reveal
        className="tattoo-scroll-warp grid gap-6 rounded-[32px] border border-emerald-900/20 bg-[#071510]/85 p-8 backdrop-blur-sm md:grid-cols-3 md:p-12"
      >
        {portfolioEntries.map((piece) => (
          <div key={piece.title} className="tattoo-perspective">
            <article className="tattoo-card-3d group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-emerald-900/30 bg-[#081914]/80 p-6 transition hover:border-emerald-400/50">
              <span className="tattoo-grid" aria-hidden="true" />
              <span className="tattoo-ink-sheen" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="relative flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.35em] text-emerald-400/90">{piece.category}</span>
                <h2 className="text-xl font-semibold text-white">{piece.title}</h2>
                <p className="text-sm leading-6 text-zinc-300">{piece.description}</p>
              </div>
              <p className="relative text-xs uppercase tracking-[0.25em] text-zinc-500">{piece.details}</p>
            </article>
          </div>
        ))}
      </section>

      <section
        data-ink-reveal
        className="tattoo-perspective tattoo-scroll-warp"
      >
        <div className="tattoo-card-3d relative overflow-hidden rounded-3xl border border-emerald-900/40 bg-[#0b2d22]/60 p-10 text-center md:p-16">
          <span className="tattoo-grid" aria-hidden="true" />
          <span className="tattoo-ink-sheen" aria-hidden="true" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 right-10 h-72 w-72 rounded-full bg-[#0f4131]/40 blur-3xl" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="ink-glitch text-3xl font-semibold text-white md:text-4xl" data-glitch="Curtiu o estilo?">
              Curtiu o estilo?
            </h2>
            <p className="text-lg leading-relaxed text-zinc-100">
              Envie referências ou descreva a ideia que quer tatuar. A equipe apresenta opções de composição, tamanhos e
              orçamento para você escolher com calma.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center gap-3 rounded-full bg-emerald-500 px-10 py-4 text-base font-semibold uppercase tracking-[0.2em] text-black shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enviar referência
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-emerald-900/40 px-10 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300 transition hover:border-emerald-400 hover:text-emerald-200"
                href="/contato"
              >
                Falar com o estúdio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </InkShell>
  );
}
