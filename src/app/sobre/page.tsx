import Link from "next/link";
import { InkShell } from "@/components/InkShell";
import { aboutHighlights, processSteps, studioInfo } from "@/data/siteContent";

export default function SobrePage() {
  const whatsappLink = `https://wa.me/${studioInfo.whatsappNumber}?text=${encodeURIComponent(
    studioInfo.whatsappMessage
  )}`;

  return (
    <InkShell>
      <section
        data-ink-reveal
        className="tattoo-scroll-warp grid gap-10 overflow-hidden rounded-[36px] border border-emerald-900/25 bg-[#07110e]/80 p-8 backdrop-blur-sm md:grid-cols-[1.15fr_0.85fr] md:p-12"
      >
        <div className="flex flex-col gap-6">
          <span className="ink-glitch text-xs uppercase tracking-[0.35em] text-emerald-400" data-glitch="Sobre o estúdio">
            Sobre o estúdio
          </span>
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Construímos tatuagens com método, sensibilidade e respeito à sua pele.
          </h1>
          <p className="text-sm leading-6 text-zinc-400 md:text-base">
            A Frank Tattoo surgiu da vontade de criar tatuagens que atravessam o tempo. Nossa equipe é formada por artistas
            autorais que pesquisam referências, estudam anatomia e aplicam técnicas de biossegurança rigorosas. Cada projeto
            é acompanhado com consultoria estética, mockups digitais e um pós-sessão cuidadosamente guiado.
          </p>
          <p className="text-sm leading-6 text-zinc-400 md:text-base">
            O estúdio em Pinheiros oferece sala privativa, climatização, playlist curada e registros fotográficos do processo.
            Queremos que você se sinta seguro, acolhido e empolgado com o resultado — do primeiro encontro à cicatrização.
          </p>
        </div>
        <div className="grid gap-4">
          {aboutHighlights.map((item) => (
            <div key={item.title} className="tattoo-perspective">
              <article className="tattoo-card-3d relative flex h-full flex-col gap-3 overflow-hidden rounded-3xl border border-emerald-900/30 bg-[#091612]/80 p-6">
                <span className="tattoo-grid" aria-hidden="true" />
                <span className="tattoo-ink-sheen" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-6 text-zinc-300">{item.description}</p>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section
        data-ink-reveal
        className="tattoo-scroll-warp flex flex-col gap-8 rounded-[32px] border border-emerald-900/20 bg-[#071510]/85 p-8 backdrop-blur-sm md:p-12"
      >
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.35em] text-emerald-400">Processo</span>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Como guiamos cada projeto</h2>
          <p className="max-w-3xl text-sm leading-6 text-zinc-400 md:text-base">
            Tudo começa com um briefing detalhado. A partir dele, criamos referências visuais, exploramos a anatomia da área
            escolhida e montamos mockups para alinhar expectativa e execução. Transparência e cuidado em cada etapa garantem
            uma experiência sem surpresas e resultado consistente.
          </p>
        </div>
        <div className="mt-2 grid gap-6 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <div key={step.title} className="tattoo-perspective">
              <article className="tattoo-card-3d relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-emerald-900/30 bg-[#0c1b15]/80 p-6">
                <span className="tattoo-grid" aria-hidden="true" />
                <span className="tattoo-ink-sheen" aria-hidden="true" />
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/10 font-mono text-sm font-semibold text-emerald-300">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="text-sm leading-6 text-zinc-300">{step.description}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
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
            <h2 className="ink-glitch text-3xl font-semibold text-white md:text-4xl" data-glitch="Vamos criar algo juntos?">
              Vamos criar algo juntos?
            </h2>
            <p className="text-lg leading-relaxed text-zinc-100">
              Marque um encontro criativo com a equipe Frank Tattoo para construir o projeto que você imaginou — ou aquele que
              ainda está tomando forma.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center gap-3 rounded-full bg-emerald-500 px-10 py-4 text-base font-semibold uppercase tracking-[0.2em] text-black shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar conversa
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-emerald-900/40 px-10 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300 transition hover:border-emerald-400 hover:text-emerald-200"
                href="/contato"
              >
                Ver canais de contato
              </Link>
            </div>
          </div>
        </div>
      </section>
    </InkShell>
  );
}
