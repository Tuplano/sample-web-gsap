import { type ReactNode } from 'react'

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
      <section className="editorial-container bg-background py-48 text-center">
        <div className="page-wrap flex flex-col items-center reveal-text">
          {label && <span className="editorial-label">{label}</span>}
          <div className="max-w-3xl">
            {typeof description === 'string' ? (
              <p className="editorial-copy text-2xl leading-relaxed">{description}</p>
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
    <section className="editorial-container relative bg-background py-24 sm:py-32">
      <div className="page-wrap">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.5fr]">
          
          {/* Content Container - Sticky for scroll stability */}
          <div className={`lg:sticky lg:top-36 flex flex-col gap-12 ${!isLeft ? 'lg:order-last' : ''}`}>
            <div>
              {label && <span className="editorial-label reveal-text">{label}</span>}
              <div className="reveal-text">
                <h2 className="editorial-title font-serif italic text-foreground mt-4">{title}</h2>
                <div className="editorial-copy mt-8 text-foreground/80 leading-relaxed max-w-sm">
                  {description}
                </div>
              </div>
            </div>

            {/* Editorial Metadata Tier - Fills negative space */}
            {metadata && (
              <div className="reveal-text border-t border-foreground/10 pt-8 flex flex-col gap-4">
                <div className="flex justify-between items-baseline gap-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40">Coordinates</span>
                  <span className="text-[11px] font-serif italic text-foreground/60">{metadata.coordinates}</span>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40">Location</span>
                  <span className="text-[11px] font-sans font-medium text-foreground/60 tracking-wider uppercase">{metadata.location}</span>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40">Category</span>
                  <span className="text-[11px] font-sans text-primary font-bold tracking-widest uppercase">{metadata.category}</span>
                </div>
              </div>
            )}
          </div>

          {/* Immersive Image Frame */}
          <div className={`reveal-image-container relative aspect-[4/5] overflow-hidden ${!isLeft ? 'lg:order-first' : ''}`}>
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
