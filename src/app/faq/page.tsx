import Link from "next/link";
import { InkShell } from "@/components/InkShell";
import { faqs, studioInfo } from "@/data/siteContent";

export default function FaqPage() {
  const whatsappLink = `https://wa.me/${studioInfo.whatsappNumber}?text=${encodeURIComponent(
    studioInfo.whatsappMessage
  )}`;

  return (
    <InkShell>
      <section
        data-ink-reveal
        className="tattoo-scroll-warp flex flex-col gap-6 rounded-[32px] border border-emerald-900/20 bg-[#07110e]/80 p-8 backdrop-blur-sm md:p-12"
      >
        <span className="ink-glitch text-xs uppercase tracking-[0.35em] text-emerald-400" data-glitch="FAQ">
          FAQ
        </span>
        <h1 className="text-3xl font-semibold text-white md:text-4xl">
          Dúvidas frequentes sobre agenda, processo e cuidados
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
          Reunimos respostas para as perguntas que mais chegam por WhatsApp e redes sociais. Se não encontrar o que precisa,
          fale com a gente — respondemos rápido!
        </p>
      </section>

      <section
        id="faq"
        data-ink-reveal
        className="tattoo-scroll-warp flex flex-col gap-5 rounded-[32px] border border-emerald-900/20 bg-[#071510]/85 p-8 backdrop-blur-sm md:p-12"
      >
        {faqs.map((faq) => (
          <div key={faq.question} className="tattoo-perspective">
            <article className="tattoo-card-3d relative rounded-3xl border border-emerald-900/40 bg-[#040c0a]/80 p-6">
              <span className="tattoo-grid" aria-hidden="true" />
              <span className="tattoo-ink-sheen" aria-hidden="true" />
              <h2 className="text-base font-semibold text-white md:text-lg">{faq.question}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-300">{faq.answer}</p>
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
            <h2 className="ink-glitch text-3xl font-semibold text-white md:text-4xl" data-glitch="Ainda tem dúvida?">
              Ainda tem dúvida?
            </h2>
            <p className="text-lg leading-relaxed text-zinc-100">
              Nossa equipe está disponível para orientar sobre ideias, posicionamento, orçamento e cuidados antes e depois da
              tatuagem.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center gap-3 rounded-full bg-emerald-500 px-10 py-4 text-base font-semibold uppercase tracking-[0.2em] text-black shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-emerald-900/40 px-10 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300 transition hover:border-emerald-400 hover:text-emerald-200"
                href="/contato"
              >
                Ver contatos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </InkShell>
  );
}
