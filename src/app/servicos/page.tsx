import Link from "next/link";
import { InkShell } from "@/components/InkShell";
import { processSteps, services, studioInfo } from "@/data/siteContent";

export default function ServicosPage() {
  const whatsappLink = `https://wa.me/${studioInfo.whatsappNumber}?text=${encodeURIComponent(
    studioInfo.whatsappMessage
  )}`;

  return (
    <InkShell>
      <section
        data-ink-reveal
        className="tattoo-scroll-warp flex flex-col gap-8 rounded-[32px] border border-emerald-900/20 bg-[#071510]/85 p-8 backdrop-blur-sm md:p-12"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.35em] text-emerald-400">Serviços</span>
            <h1 className="text-3xl font-semibold text-white md:text-4xl">
              Projetos autorais e técnicas para diferentes histórias.
            </h1>
          </div>
          <p className="max-w-lg text-sm leading-6 text-zinc-400 md:text-base">
            Desenvolvemos desenhos sob medida, coberturas planejadas e flashes exclusivos. O foco está em unir significado e
            execução precisa, respeitando a anatomia da área tatuada.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="tattoo-perspective">
              <article className="tattoo-card-3d group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-emerald-900/30 bg-[#0c1b15]/80 p-6 transition hover:border-emerald-400/50">
                <span className="tattoo-grid" aria-hidden="true" />
                <span className="tattoo-ink-sheen" aria-hidden="true" />
                <div className="relative flex flex-col gap-3">
                  <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="text-sm leading-6 text-zinc-300">{service.description}</p>
                </div>
                <div className="relative mt-auto flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-emerald-900/60 px-3 py-1 text-xs uppercase tracking-[0.25em] text-zinc-400 transition group-hover:border-emerald-400 group-hover:text-emerald-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section
        data-ink-reveal
        className="tattoo-scroll-warp flex flex-col gap-8 rounded-[32px] border border-emerald-900/20 bg-[#07110e]/80 p-8 backdrop-blur-sm md:p-12"
      >
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.35em] text-emerald-400">Do briefing à cicatrização</span>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Um fluxo pensado para você criar com tranquilidade
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-zinc-400 md:text-base">
            Cada etapa tem seu momento. Exploramos referências, criamos esboços digitais, alinhamos ajustes com você e
            registramos todos os cuidados para que a tatuagem cicatrize perfeita.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <div key={step.title} className="tattoo-perspective">
              <article className="tattoo-card-3d relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-emerald-900/30 bg-[#091612]/80 p-6">
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
            <h2 className="ink-glitch text-3xl font-semibold text-white md:text-4xl" data-glitch="Quer tirar sua ideia do papel?">
              Quer tirar sua ideia do papel?
            </h2>
            <p className="text-lg leading-relaxed text-zinc-100">
              Envie referências, conte a história da tatuagem e receba uma proposta personalizada com prazos, sessões e
              orçamento.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center gap-3 rounded-full bg-emerald-500 px-10 py-4 text-base font-semibold uppercase tracking-[0.2em] text-black shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar briefing
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-emerald-900/40 px-10 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300 transition hover:border-emerald-400 hover:text-emerald-200"
                href="/contato"
              >
                Outros canais
              </Link>
            </div>
          </div>
        </div>
      </section>
    </InkShell>
  );
}
