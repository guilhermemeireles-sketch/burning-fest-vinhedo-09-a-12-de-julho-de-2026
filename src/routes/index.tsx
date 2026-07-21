import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Flame,
  TrendingUp,
  Receipt,
  Ticket,
  Target,
  Clock,
  Beer,
  Trophy,
  Megaphone,
  MapPin,
  Sparkles,
  Users,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";
import heroImg from "@/assets/burning-hero.jpg";

export const Route = createFileRoute("/")({
  component: Report,
});

const dailyData = [
  { day: "Qui 09/07", revenue: 121366.39, tx: 2949 },
  { day: "Sex 10/07", revenue: 70627.44, tx: 1697 },
  { day: "Sáb 11/07", revenue: 207402.69, tx: 4860 },
  { day: "Dom 12/07", revenue: 113127.95, tx: 2722 },
];

const hourlyData = [
  { h: "11h", qui: 15, sex: 10, sab: 18, dom: 22 },
  { h: "12h", qui: 55, sex: 40, sab: 60, dom: 70 },
  { h: "13h", qui: 78, sex: 62, sab: 82, dom: 88 },
  { h: "14h", qui: 62, sex: 50, sab: 68, dom: 70 },
  { h: "15h", qui: 30, sex: 22, sab: 35, dom: 38 },
  { h: "16h", qui: 22, sex: 18, sab: 28, dom: 30 },
  { h: "17h", qui: 28, sex: 24, sab: 36, dom: 40 },
  { h: "18h", qui: 55, sex: 58, sab: 70, dom: 60 },
  { h: "19h", qui: 72, sex: 82, sab: 92, dom: 55 },
  { h: "20h", qui: 68, sex: 90, sab: 98, dom: 40 },
  { h: "21h", qui: 50, sex: 88, sab: 95, dom: 25 },
  { h: "22h", qui: 30, sex: 72, sab: 80, dom: 15 },
];

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });

const sections = [
  { id: "capa", label: "Capa" },
  { id: "resultado", label: "Resultado" },
  { id: "diario", label: "Por Dia" },
  { id: "horario", label: "Horário" },
  { id: "gamificacao", label: "Gamificação" },
  { id: "produtos", label: "Produtos" },
  { id: "divulgacao", label: "Divulgação" },
  { id: "extras", label: "Extras" },
  { id: "criativos", label: "Criativos" },
];

function SectionNav() {
  const [active, setActive] = useState("capa");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <nav className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="group flex items-center gap-3"
          aria-label={s.label}
        >
          <span className="translate-x-2 text-[11px] uppercase tracking-widest text-muted-foreground opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
            {s.label}
          </span>
          <span
            className={`h-2 w-2 rounded-full transition-all ${
              active === s.id ? "scale-150 bg-primary shadow-red-glow" : "bg-muted-foreground/40"
            }`}
          />
        </a>
      ))}
    </nav>
  );
}

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className="font-display text-sm uppercase tracking-[0.3em] text-primary">
        {n}
      </span>
      <span className="h-px flex-1 bg-primary/30" />
      <h2 className="font-display text-2xl uppercase tracking-wider text-foreground sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function KPI({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition hover:border-primary/60">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
      <Icon className="mb-4 h-6 w-6 text-primary" />
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-3xl text-foreground sm:text-4xl">{value}</div>
      {sub && <div className="mt-2 text-sm text-muted-foreground">{sub}</div>}
    </div>
  );
}

function Report() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SectionNav />

      {/* SECTION 1 — CAPA */}
      <section
        id="capa"
        className="relative flex min-h-screen items-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 py-24">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-primary">
            <Flame className="h-3.5 w-3.5" />
            Relatório de Performance
          </div>
          <h1 className="font-display text-6xl uppercase leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
            Burning <span className="text-gradient-red">Fest</span>
            <br />
            Vinhedo
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground sm:text-base">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Vinhedo / SP
            </span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
            <span>09 a 12 de julho de 2026</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
            <span>4 dias de evento</span>
          </div>

          <div className="mt-20 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
            <span>Role para navegar</span>
            <ArrowRight className="h-4 w-4 animate-pulse text-primary" />
          </div>
        </div>
      </section>

      {/* SECTION 2 — RESULTADO */}
      <section id="resultado" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel n="01" title="Resultado do evento" />
          <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
            Uma leitura direta dos números que definem a performance do festival — receita,
            volume e retorno sobre o investimento em divulgação.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <KPI
              icon={Receipt}
              label="Faturamento total"
              value="R$ 512.524"
              sub="R$ 512.524,47 acumulado nos 4 dias"
            />
            <KPI icon={Ticket} label="Transações" value="12.228" sub="Vendas realizadas no evento" />
            <KPI icon={TrendingUp} label="Ticket médio" value="R$ 41,90" sub="Média por transação" />
            <KPI
              icon={Target}
              label="ROAS da campanha"
              value="18,5×"
              sub="Cada R$ 1 investido gerou R$ 18,50 em receita"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3 — POR DIA */}
      <section id="diario" className="border-t border-border bg-card/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel n="02" title="Faturamento por dia" />
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-lg border border-border bg-card p-6">
              <ResponsiveContainer width="100%" height={360}>
                <BarChart data={dailyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="day"
                    stroke="var(--muted-foreground)"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    cursor={{ fill: "oklch(0.6 0.23 25 / 0.1)" }}
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      color: "var(--foreground)",
                    }}
                    formatter={(v: number) => [formatBRL(v), "Faturamento"]}
                  />
                  <Bar dataKey="revenue" fill="var(--primary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-3">
              {dailyData.map((d) => {
                const isSat = d.day.startsWith("Sáb");
                return (
                  <div
                    key={d.day}
                    className={`flex items-center justify-between rounded-lg border p-4 ${
                      isSat
                        ? "border-primary/60 bg-primary/10"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">
                        {d.day}
                      </div>
                      <div className="mt-1 font-display text-2xl text-foreground">
                        {formatBRL(d.revenue)}
                      </div>
                    </div>
                    <div className="shrink-0 text-right text-sm text-muted-foreground">
                      {d.tx.toLocaleString("pt-BR")}
                      <div className="text-[11px] uppercase tracking-widest">transações</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 flex items-start gap-4 rounded-lg border border-primary/40 bg-primary/5 p-6">
            <Flame className="mt-1 h-6 w-6 shrink-0 text-primary" />
            <p className="text-base text-foreground sm:text-lg">
              <span className="font-semibold text-primary">Sábado concentrou ~40%</span> de todo o
              faturamento do evento — o dia mais forte, com folga.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — HORÁRIO */}
      <section id="horario" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel n="03" title="Comportamento por horário" />
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Clock className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <div className="font-display text-xl uppercase text-foreground">
                    Vale das 15h às 17h
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    Em todos os 4 dias do evento, o horário de menor consumo se repetiu
                    consistentemente entre 15h e 17h, independente do dia da semana.
                  </p>
                </div>
              </div>
              <div className="space-y-3 border-l-2 border-primary/40 pl-5 text-sm text-muted-foreground">
                <p>
                  O movimento forte começa no horário de almoço (12h–13h) e retoma com força a
                  partir do fim de tarde.
                </p>
                <p>
                  <span className="text-foreground">Sexta e sábado</span> têm um segundo pico
                  noturno (a partir de ~19h) mais forte que o pico do almoço.
                </p>
                <p>
                  <span className="text-foreground">Quinta e domingo</span> concentram o movimento
                  mais cedo, com queda mais definitiva ao longo da noite.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <ResponsiveContainer width="100%" height={340}>
                <LineChart data={hourlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="h"
                    stroke="var(--muted-foreground)"
                    tick={{ fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      color: "var(--foreground)",
                    }}
                  />
                  <Line type="monotone" dataKey="qui" stroke="oklch(0.45 0.18 25)" strokeWidth={2} dot={false} name="Quinta" />
                  <Line type="monotone" dataKey="sex" stroke="oklch(0.6 0.23 25)" strokeWidth={2} dot={false} name="Sexta" />
                  <Line type="monotone" dataKey="sab" stroke="oklch(0.75 0.24 25)" strokeWidth={3} dot={false} name="Sábado" />
                  <Line type="monotone" dataKey="dom" stroke="oklch(0.55 0.16 25)" strokeWidth={2} dot={false} name="Domingo" strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <LegendDot color="oklch(0.45 0.18 25)" label="Quinta" />
                <LegendDot color="oklch(0.6 0.23 25)" label="Sexta" />
                <LegendDot color="oklch(0.75 0.24 25)" label="Sábado" />
                <LegendDot color="oklch(0.55 0.16 25)" label="Domingo" dashed />
              </div>
            </div>
          </div>

          {/* Happy Hour banner */}
          <div className="mt-12 overflow-hidden rounded-xl border border-primary/40 bg-gradient-red p-8 shadow-red-glow sm:p-12">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-background/20 px-3 py-1 text-xs uppercase tracking-widest text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" /> Ativação sugerida
            </div>
            <h3 className="font-display text-3xl uppercase leading-tight text-primary-foreground sm:text-5xl">
              O happy hour oficial do Burning Fest:
              <br />
              chopp com 50% OFF, das 15h às 17h.
            </h3>
            <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90">
              Chopp pela metade do preço. Isso mesmo que você leu.
            </p>

            <div className="mt-8 grid gap-6 rounded-lg bg-background/95 p-6 sm:p-8 lg:grid-cols-[1fr_auto]">
              <div className="space-y-4 text-foreground">
                <div className="font-display text-2xl uppercase tracking-wide">
                  🍺🔥 Happy Hour Burning Fest
                </div>
                <p className="text-muted-foreground">
                  Chopp gelado com <span className="font-semibold text-primary">50% de desconto</span>.
                  Todos os dias do evento, das 15h às 17h. É isso mesmo: enquanto a brasa esquenta
                  pro churrasco, seu chopp esfria o bolso pela metade do preço.
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✔</span> Válido todos os dias do festival
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✔</span> Das 15h às 17h
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✔</span> 50% OFF direto no chopp
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  Depois das 17h o preço volta ao normal — então chega cedo, garante o seu e
                  aproveita o resto da festa com o copo (e o bolso) cheios.
                </p>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  Confira a data do Burning Fest na sua cidade.
                </div>
              </div>
              <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">CTA</div>
                <p className="font-display text-xl uppercase leading-tight text-foreground">
                  Chama a galera
                  <br />e organiza a chegada
                  <br />
                  <span className="text-primary">pra aproveitar o desconto.</span>
                </p>
                <Beer className="h-10 w-10 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4A — GAMIFICAÇÃO */}
      <section id="gamificacao" className="border-t border-border bg-card/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel n="04" title="Gamificação do evento" />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-6 text-lg text-muted-foreground">
                Retomando o conceito já apresentado: um <span className="text-foreground">cartão
                de progressão por consumo</span> para engajar o participante durante toda a
                permanência no evento.
              </p>
              <ul className="space-y-4">
                {[
                  "Cada participante recebe, na chegada, um cartão de progressão.",
                  "A cada compra realizada dentro do evento, o participante acumula pontos no cartão.",
                  "O acúmulo gera engajamento contínuo — motivo a mais para continuar consumindo e circulando pelo espaço.",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-display text-sm text-primary">
                      {i + 1}
                    </span>
                    <span className="text-foreground">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="relative rotate-[-3deg] rounded-2xl border border-primary/40 bg-gradient-red p-8 shadow-red-glow">
                <div className="mb-6 flex items-center justify-between text-primary-foreground">
                  <div className="text-xs uppercase tracking-widest opacity-80">
                    Burning Fest · Cartão
                  </div>
                  <Trophy className="h-6 w-6" />
                </div>
                <div className="font-display text-4xl uppercase text-primary-foreground">
                  Cartão de
                  <br />Progressão
                </div>
                <div className="mt-8 flex gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <div
                      key={n}
                      className={`h-8 w-8 rounded-full border-2 border-primary-foreground/60 ${
                        n <= 5 ? "bg-background" : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-4 text-xs uppercase tracking-widest text-primary-foreground/80">
                  5 de 8 pontos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — PRODUTOS */}
      <section id="produtos" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel n="05" title="Produtos mais consumidos" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { rank: "01", name: "Chopp 500ml", tag: "Líder em todos os dias", icon: Beer, highlight: true },
              { rank: "02", name: "Chopp 400ml", tag: "Pódio de bebidas", icon: Beer },
              { rank: "03", name: "Chopp 300ml", tag: "Pódio de bebidas", icon: Beer },
              { rank: "04", name: "Espeto de Carne", tag: "Prato mais consistente", icon: Flame },
            ].map((p) => (
              <div
                key={p.rank}
                className={`relative overflow-hidden rounded-lg border p-6 ${
                  p.highlight ? "border-primary/60 bg-primary/10" : "border-border bg-card"
                }`}
              >
                <div className="font-display text-5xl text-primary/40">{p.rank}</div>
                <p.icon className="my-4 h-7 w-7 text-primary" />
                <div className="font-display text-xl uppercase text-foreground">{p.name}</div>
                <div className="mt-2 text-sm text-muted-foreground">{p.tag}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-lg border border-border bg-card p-6">
            <div className="text-xs uppercase tracking-widest text-primary">Leitura para o cliente</div>
            <p className="mt-3 text-lg text-foreground">
              O mix de consumo é estável ao longo do evento — não há necessidade de ajuste de
              cardápio por dia, mas há espaço para{" "}
              <span className="text-primary">reforçar estoque de Chopp 500ml</span> como prioridade
              logística nas próximas edições.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6 — DIVULGAÇÃO */}
      <section id="divulgacao" className="border-t border-border bg-card/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel n="06" title="Estratégia de divulgação" />
          <p className="mb-12 max-w-3xl text-lg text-muted-foreground">
            A divulgação cobriu múltiplas frentes: alcance e reconhecimento da marca, engajamento
            com o público local, geração de cadastros via sorteio e tráfego para o perfil oficial
            no Instagram.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-8">
              <Megaphone className="mb-4 h-7 w-7 text-primary" />
              <div className="font-display text-xl uppercase text-foreground">
                Públicos e formatos testados
              </div>
              <p className="mt-3 text-muted-foreground">
                Segmentações por interesse (fãs de rock, entusiastas de churrasco) e públicos
                abertos. Formatos diferentes de criativo: vídeo, imagem estática e carrossel.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-primary/40 bg-primary/10 p-6">
                <Users className="mb-3 h-6 w-6 text-primary" />
                <div className="font-display text-4xl text-foreground">212</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  Cadastros via sorteio
                </div>
              </div>
              <div className="rounded-lg border border-primary/40 bg-primary/10 p-6">
                <TrendingUp className="mb-3 h-6 w-6 text-primary" />
                <div className="font-display text-4xl text-foreground">9.291</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  Visitas ao perfil no Instagram
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — INVESTIMENTO EXTRA */}
      <section id="extras" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel n="07" title="Investimento extra" />
          <p className="mb-12 max-w-3xl text-lg text-muted-foreground">
            Três frentes complementares reforçaram a divulgação do evento, com resultados sólidos.
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                tag: "Alcance por proximidade",
                stat: "144 mil",
                statLabel: "pessoas alcançadas",
                copy: "Segmentação por condomínios da região, com custo eficiente por alcance.",
              },
              {
                tag: "Alcance por nicho",
                stat: "Melhor",
                statLabel: "custo por alcance",
                copy: "Público fã de K-pop teve o melhor custo por alcance entre as frentes de reconhecimento complementares, mesmo com público mais restrito.",
              },
              {
                tag: "Engajamento",
                stat: "Maior",
                statLabel: "volume entre extras",
                copy: "Campanha de engajamento complementar foi a de maior volume entre os investimentos extras, com custo por resultado consistente.",
              },
            ].map((c) => (
              <div
                key={c.tag}
                className="flex flex-col rounded-lg border border-border bg-card p-6"
              >
                <div className="text-xs uppercase tracking-widest text-primary">{c.tag}</div>
                <div className="mt-4 font-display text-5xl text-foreground">{c.stat}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {c.statLabel}
                </div>
                <div className="my-5 h-px bg-border" />
                <p className="text-sm text-muted-foreground">{c.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — CRIATIVOS */}
      <section id="criativos" className="border-t border-border bg-card/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel n="08" title="Criativos com melhor performance" />
          <p className="mb-12 max-w-3xl text-lg text-muted-foreground">
            Os anúncios com melhor retorno em cada frente da divulgação, com base em todo o
            histórico de veiculação do evento.
          </p>

          <div className="space-y-4">
            {[
              {
                frente: "Reconhecimento",
                nome: "Diferenciais",
                desc: 'Criativo estático teve o melhor custo por alcance entre todas as opções testadas, superando a versão em carrossel do mesmo tema.',
              },
              {
                frente: "Engajamento",
                nome: "Estamos Chegando",
                desc: "Mais eficiente da frente: maior volume de engajamento e menor custo entre todos os anúncios testados.",
              },
              {
                frente: "Tráfego",
                nome: "O Melhor Churrasco de Vinhedo",
                desc: "Gerou o maior volume de visitas ao perfil com o melhor custo-benefício entre os anúncios da frente.",
              },
            ].map((c) => (
              <div
                key={c.nome}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 rounded-lg border border-border bg-card p-6 transition hover:border-primary/60 sm:grid-cols-[140px_1fr_auto]"
              >
                <div className="col-span-2 order-2 text-xs uppercase tracking-widest text-primary sm:order-1 sm:col-span-1">
                  {c.frente}
                </div>
                <div className="order-1 min-w-0 sm:order-2">
                  <div className="font-display text-2xl uppercase text-foreground">
                    {c.nome}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                </div>
                <ImageIcon className="order-3 h-8 w-8 shrink-0 text-primary/60" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center">
          <Flame className="h-6 w-6 text-primary" />
          <div className="font-display text-lg uppercase tracking-widest text-foreground">
            Burning Fest Vinhedo
          </div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Relatório de Performance · 09 a 12 de julho de 2026
          </div>
        </div>
      </footer>
    </div>
  );
}

function LegendDot({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span
        className="inline-block h-[3px] w-6"
        style={{
          background: dashed
            ? `repeating-linear-gradient(90deg, ${color} 0 4px, transparent 4px 8px)`
            : color,
        }}
      />
      {label}
    </span>
  );
}
