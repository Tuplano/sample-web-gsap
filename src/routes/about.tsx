import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <main className="page-wrap about-page">
      <section className="panel">
        <h1 className="section-title">Template notes</h1>
        <ul>
          <li>All business logic is isolated in `src/features/hotels`.</li>
          <li>API and state layers are separate and fully typed.</li>
          <li>Swap `src/api/hotel.ts` mock logic with real endpoints when ready.</li>
          <li>
            Use `VITE_API_BASE_URL` to point this template to a production API.
          </li>
        </ul>
      </section>
    </main>
  )
}
