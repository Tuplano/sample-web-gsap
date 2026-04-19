import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  Earth,
  Leaf,
  Mountain,
  ShieldCheck,
  Waves,
} from 'lucide-react'

export const Route = createFileRoute('/story')({
  component: StoryPage,
})

function StoryPage() {
  return (
    <main className="bg-[var(--bg)] pb-28 pt-30">
      <section className="border-b border-[var(--line-strong)] bg-secondary/25 py-14">
        <div className="page-wrap grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 border border-[var(--line-strong)] bg-background/70 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
              <BookOpen size={14} />
              <span>Our Story</span>
            </div>
            <h1 className="text-5xl font-serif italic leading-tight text-[var(--text)] sm:text-6xl">
              The Story of Harborline
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              Harborline began as a single shoreline residence in 1994 and grew into a
              collection of sanctuaries shaped by place, climate, and local craft.
              Every destination is designed to feel rooted, never replicated.
            </p>
          </div>

          <div className="grid gap-4 border border-[var(--line-strong)] bg-background/70 p-6">
            <div className="flex items-start gap-3">
              <Earth size={16} className="mt-1 text-primary" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text)]">
                  Footprint
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                  Coastal, island, and highland sanctuaries across Asia-Pacific.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Leaf size={16} className="mt-1 text-primary" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text)]">
                  Design Ethos
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                  Quiet architecture, regional materials, and low-impact operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap py-16">
        <div className="grid gap-12 lg:grid-cols-[170px_1fr]">
          <div className="hidden border-r border-[var(--line-strong)] pr-8 lg:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
              Timeline
            </p>
          </div>
          <div className="grid gap-14">
            <article className="grid gap-4 border-b border-[var(--line-strong)] pb-8 md:grid-cols-[160px_1fr] md:gap-8">
              <div className="flex items-center gap-3 text-primary">
                <Compass size={16} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">1994</span>
              </div>
              <div>
                <h2 className="font-serif text-3xl italic text-[var(--text)]">First Sanctuary</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                  What started as one coastal retreat in Cebu was built around the idea
                  that luxury should be quiet: fewer rooms, slower rhythms, and architecture
                  that frames nature instead of competing with it.
                </p>
              </div>
            </article>

            <article className="grid gap-4 border-b border-[var(--line-strong)] pb-8 md:grid-cols-[160px_1fr] md:gap-8">
              <div className="flex items-center gap-3 text-primary">
                <Waves size={16} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">2008</span>
              </div>
              <div>
                <h2 className="font-serif text-3xl italic text-[var(--text)]">Island Chapter</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                  We expanded with properties along island coastlines, each shaped by local
                  materials and water-first planning. Guest spaces were opened to breeze,
                  daylight, and uninterrupted views of the horizon.
                </p>
              </div>
            </article>

            <article className="grid gap-4 md:grid-cols-[160px_1fr] md:gap-8">
              <div className="flex items-center gap-3 text-primary">
                <Mountain size={16} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">2019</span>
              </div>
              <div>
                <h2 className="font-serif text-3xl italic text-[var(--text)]">Highland Chapter</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                  Harborline moved inland to forests and mountain edges, introducing
                  low-impact hillside stays and trail-linked programs that support local
                  communities and preserve surrounding habitats.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="page-wrap grid gap-0 border-y border-[var(--line-strong)] md:grid-cols-2">
        <div className="h-[240px] overflow-hidden border-b border-[var(--line-strong)] md:h-[320px] md:border-b-0 md:border-r">
          <img
            src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1400&q=80"
            alt="Harborline coastal sanctuary"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="h-[240px] overflow-hidden md:h-[320px]">
          <img
            src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1400&q=80"
            alt="Harborline suite interior"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      <section className="page-wrap py-14">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex gap-3">
            <Leaf size={16} className="mt-1 text-primary" />
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--text)]">
                Materials and Craft
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                Timber, stone, and woven details are sourced regionally whenever possible
                to keep each site connected to its landscape and building traditions.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <ShieldCheck size={16} className="mt-1 text-primary" />
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--text)]">
                Stewardship and Continuity
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                Harborline invests in restoration, water systems, and long-term training
                for local teams so each destination can endure without losing character.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap pt-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
            The next chapter is written by those who stay with us.
          </p>
          <Link
            to="/"
            hash="booking"
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-[var(--line-strong)] px-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text)] transition-colors hover:bg-[var(--text)] hover:text-white"
          >
            Reserve a Sanctuary
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  )
}
