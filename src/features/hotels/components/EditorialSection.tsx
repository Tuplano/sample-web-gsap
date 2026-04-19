import { type ReactNode } from 'react'
import { Compass, MapPinned, Trees } from 'lucide-react'

interface EditorialSectionProps {
  label?: string
  title?: string
  description: string | ReactNode
  imageSrc?: string
  layout?: 'split-left' | 'split-right' | 'centered' | 'collage'
  metadata?: {
    coordinates?: string
    location?: string
    category?: string
  }
}

/**
 * versatile building block for the luxury editorial layout.
 * Now features a robust 'sticky' layout and metadata tiers to enrich negative space.
 */
export function EditorialSection({
  label,
  title,
  description,
  imageSrc,
  layout = 'split-left',
  metadata,
}: EditorialSectionProps) {

  if (layout === 'centered') {
    return (
      <section className="editorial-container bg-background py-24 text-center sm:py-28">
        <div className="page-wrap flex flex-col items-center reveal-text">
          {label && <span className="editorial-label">{label}</span>}
          <div className="max-w-4xl">
            {typeof description === 'string' ? (
              <p className="editorial-copy text-xl leading-8 text-foreground/80 sm:text-2xl sm:leading-10">{description}</p>
            ) : (
              description
            )}
          </div>
        </div>
      </section>
    )
  }

  const isLeft = layout === 'split-left'

  return (
    <section className="editorial-container relative bg-background py-16 sm:py-24">
      <div className="page-wrap">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-16">
          
          {/* Content Container - Sticky for scroll stability */}
          <div className={`flex flex-col gap-8 ${!isLeft ? 'lg:order-last' : ''}`}>
            <div className="max-w-md">
              {label && <span className="editorial-label reveal-text">{label}</span>}
              <div className="reveal-text space-y-5">
                <h2 className="editorial-title mt-1 text-foreground">{title}</h2>
                <div className="editorial-copy max-w-md text-foreground/76">
                  {description}
                </div>
              </div>
            </div>

            {/* Editorial Metadata Tier - Fills negative space */}
            {metadata && (
              <div className="reveal-text grid gap-3 border-t border-foreground/10 pt-6">
                <div className="flex items-center justify-between gap-4 border-b border-foreground/8 pb-3">
                  <span className="flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-foreground/45">
                    <Compass className="size-3.5 text-primary/80" />
                    Coordinates
                  </span>
                  <span className="text-sm font-medium text-foreground/62">{metadata.coordinates}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-foreground/8 pb-3">
                  <span className="flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-foreground/45">
                    <MapPinned className="size-3.5 text-primary/80" />
                    Location
                  </span>
                  <span className="text-right text-sm font-medium text-foreground/62">{metadata.location}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-foreground/45">
                    <Trees className="size-3.5 text-primary/80" />
                    Category
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{metadata.category}</span>
                </div>
              </div>
            )}
          </div>

          {/* Immersive Image Frame */}
          <div className={`reveal-image-container relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary/35 ${!isLeft ? 'lg:order-first' : ''}`}>
            {imageSrc && (
              <img
                src={imageSrc}
                alt={title}
                className="parallax-image h-[120%] w-full absolute top-[-10%] left-0 object-cover"
              />
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
