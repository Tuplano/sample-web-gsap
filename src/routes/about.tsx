import { createFileRoute } from '@tanstack/react-router'
import { BookOpen, Layers, Server, Zap } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <main className="page-wrap py-16">
      <section className="mx-auto max-w-3xl rounded-3xl border border-[var(--line-strong)] bg-white p-10 shadow-xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text)]">Template Architecture</h1>
            <p className="text-sm text-[var(--text-muted)]">A summary of the technical foundation of Harborline.</p>
          </div>
        </div>

        <div className="grid gap-8">
          {[
            {
              title: 'Feature-First Organization',
              desc: 'All business logic is isolated in `src/features/hotels` for maximum maintainability and clear domain boundaries.',
              icon: Layers,
            },
            {
              title: 'Typed Architecture',
              desc: 'API and state layers are strictly typed using TypeScript and Zod, ensuring runtime safety across the entire booking flow.',
              icon: Zap,
            },
            {
              title: 'Ready for Integration',
              desc: 'Seamlessly transition from mock data to real production endpoints by updating types and endpoints in `src/api/hotel.ts`.',
              icon: Server,
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--surface-alt)] text-[var(--accent)]">
                <item.icon size={14} />
              </div>
              <div>
                <h3 className="font-bold text-[var(--text)]">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-[var(--surface-alt)] p-6">
          <p className="text-xs font-medium leading-relaxed text-[var(--text-muted)]">
            <span className="font-bold text-[var(--text)]">Pro Tip:</span> Use the <code className="rounded bg-white px-1 py-0.5 font-mono text-[var(--accent)]">VITE_API_BASE_URL</code> environment variable to bridge this frontend directly to your backend services without modifying the core logic.
          </p>
        </div>
      </section>
    </main>
  )
}
