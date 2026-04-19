import { useLayoutEffect, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Initializes smooth scrolling (Lenis) and syncs it with GSAP.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])
}

/**
 * Custom hook for managing standardized GSAP animations in a luxury editorial context.
 */
export function useEditorialAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      // Text reveal - triggered entrance so copy settles in and doesn't keep drifting with scroll.
      gsap.utils.toArray<HTMLElement>('.reveal-text').forEach((el, index) => {
        const direction = index % 2 === 0 ? -1 : 1
        gsap.fromTo(el,
          {
            x: 48 * direction,
            opacity: 0,
            filter: 'blur(10px)',
          },
          {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
      })

      // Image reveal - masked open entrance without linking the playhead to scroll.
      gsap.utils.toArray<HTMLElement>('.reveal-image-container').forEach((container) => {
        const img = container.querySelector('img')
        gsap.set(container, {
          clipPath: 'inset(14% 8% 14% 8% round 1.5rem)',
        })

        gsap.to(container, {
          clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 84%',
            toggleActions: 'play reverse play reverse',
          },
        })

        if (!img) return

        gsap.fromTo(img,
          {
            scale: 1.18,
            rotate: -1.5,
          },
          {
            scale: 1,
            rotate: 0,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 86%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
      })

      // Image travel - very light background drift instead of strong scroll-coupled movement.
      gsap.utils.toArray<HTMLElement>('.parallax-image').forEach((el) => {
        gsap.to(el, {
          yPercent: 6,
          xPercent: 1.5,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.35,
          },
        })
      })

      // Staggered collage - play once as a section entrance instead of scrubbing with scroll.
      gsap.utils.toArray<HTMLElement>('.stagger-item').forEach((container) => {
        const items = container.querySelectorAll('.item')
        gsap.fromTo(items, {
          xPercent: -10,
          opacity: 0,
        }, {
          xPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.18,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 78%',
            toggleActions: 'play reverse play reverse',
          },
        })
      })
    }, containerRef.current)

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  return { containerRef }
}

/**
 * Hook for 'Stacked Card' swapping logic.
 * Creates a physical depth swap where images rotate priority during scroll.
 */
export function useCardSwapping() {
  const containerRef = useRef<HTMLDivElement>(null)
  const img1Ref = useRef<HTMLDivElement>(null)
  const img2Ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!containerRef.current || !img1Ref.current || !img2Ref.current) return
    const container = containerRef.current
    let handlePointerMove: ((event: PointerEvent) => void) | undefined
    let resetCards: (() => void) | undefined
    let pressIn: (() => void) | undefined
    let pressOut: (() => void) | undefined

    const ctx = gsap.context(() => {
      const imageOne = img1Ref.current?.querySelector('img')
      const imageTwo = img2Ref.current?.querySelector('img')
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 40%',
          end: 'bottom 40%',
          scrub: 1,
        },
      })

      // Image 1 (Initial Top) -> Moves back and fades
      tl.to(img1Ref.current, {
        scale: 0.85,
        opacity: 0.4,
        xPercent: -10,
        rotate: -2,
        duration: 1,
      }, 0)

      // Image 2 (Initial Bottom) -> Moves to front and scales up
      tl.to(img2Ref.current, {
        scale: 1.1,
        opacity: 1,
        xPercent: 10,
        yPercent: -20,
        rotate: 1,
        zIndex: 50,
        duration: 1,
      }, 0)

      if (prefersReducedMotion()) return

      const moveCardOneX = gsap.quickTo(img1Ref.current, 'x', { duration: 0.45, ease: 'power3.out' })
      const moveCardOneY = gsap.quickTo(img1Ref.current, 'y', { duration: 0.45, ease: 'power3.out' })
      const moveCardTwoX = gsap.quickTo(img2Ref.current, 'x', { duration: 0.45, ease: 'power3.out' })
      const moveCardTwoY = gsap.quickTo(img2Ref.current, 'y', { duration: 0.45, ease: 'power3.out' })
      const moveImageOneX = imageOne ? gsap.quickTo(imageOne, 'xPercent', { duration: 0.5, ease: 'power3.out' }) : null
      const moveImageOneY = imageOne ? gsap.quickTo(imageOne, 'yPercent', { duration: 0.5, ease: 'power3.out' }) : null
      const moveImageTwoX = imageTwo ? gsap.quickTo(imageTwo, 'xPercent', { duration: 0.5, ease: 'power3.out' }) : null
      const moveImageTwoY = imageTwo ? gsap.quickTo(imageTwo, 'yPercent', { duration: 0.5, ease: 'power3.out' }) : null

      handlePointerMove = (event: PointerEvent) => {
        if (!containerRef.current) return

        const bounds = containerRef.current.getBoundingClientRect()
        const x = (event.clientX - bounds.left) / bounds.width - 0.5
        const y = (event.clientY - bounds.top) / bounds.height - 0.5

        moveCardOneX(x * 14)
        moveCardOneY(y * 10)
        moveCardTwoX(x * -18)
        moveCardTwoY(y * -12)
        moveImageOneX?.(x * -6)
        moveImageOneY?.(y * -6)
        moveImageTwoX?.(x * 8)
        moveImageTwoY?.(y * 8)
      }

      resetCards = () => {
        moveCardOneX(0)
        moveCardOneY(0)
        moveCardTwoX(0)
        moveCardTwoY(0)
        moveImageOneX?.(0)
        moveImageOneY?.(0)
        moveImageTwoX?.(0)
        moveImageTwoY?.(0)
      }

      pressIn = () => {
        gsap.to([img1Ref.current, img2Ref.current], {
          scale: index => (index === 0 ? 1.015 : 0.965),
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      pressOut = () => {
        gsap.to([img1Ref.current, img2Ref.current], {
          clearProps: 'scale',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      container.addEventListener('pointermove', handlePointerMove)
      container.addEventListener('pointerleave', resetCards)
      container.addEventListener('pointerdown', pressIn)
      container.addEventListener('pointerup', pressOut)
      container.addEventListener('pointercancel', pressOut)
    })

    return () => {
      if (handlePointerMove) container.removeEventListener('pointermove', handlePointerMove)
      if (resetCards) container.removeEventListener('pointerleave', resetCards)
      if (pressIn) container.removeEventListener('pointerdown', pressIn)
      if (pressOut) {
        container.removeEventListener('pointerup', pressOut)
        container.removeEventListener('pointercancel', pressOut)
      }
      ctx.revert()
    }
  }, [])

  return { containerRef, img1Ref, img2Ref }
}

/**
 * Hook for Header scroll state using ScrollTrigger for high performance.
 */
export function useHeaderScroll(onToggle: (scrolled: boolean) => void) {
  useLayoutEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 'top -50',
      onUpdate: (self) => {
        if (self.direction > 0) {
          onToggle(true)
        } else if (self.scroll() < 50) {
          onToggle(false)
        }
      }
    })

    return () => trigger.kill()
  }, [onToggle])
}

/**
 * Hook for the Hero "Premiere" entrance animation.
 */
export function useHeroPremiere() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!heroRef.current) return
    const hero = heroRef.current
    let handlePointerMove: ((event: PointerEvent) => void) | undefined
    let resetHero: (() => void) | undefined

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Image scale down entrance
      tl.fromTo(imageRef.current, 
        { scale: 1.25, filter: 'brightness(0)' },
        { scale: 1, filter: 'brightness(0.85)', duration: 3 }
      )

      // Text stagger entry
      tl.from(titleRef.current, 
        { y: 50, opacity: 0, duration: 2 },
        '-=2'
      )

      tl.from('.hero-subtext', 
        { y: 30, opacity: 0, duration: 1.5, stagger: 0.2 },
        '-=1.5'
      )

      if (prefersReducedMotion()) return

      const moveImageX = gsap.quickTo(imageRef.current, 'xPercent', { duration: 0.8, ease: 'power3.out' })
      const moveImageY = gsap.quickTo(imageRef.current, 'yPercent', { duration: 0.8, ease: 'power3.out' })
      const moveContentX = gsap.quickTo(contentRef.current, 'x', { duration: 0.6, ease: 'power3.out' })
      const moveContentY = gsap.quickTo(contentRef.current, 'y', { duration: 0.6, ease: 'power3.out' })
      const moveOverlayX = gsap.quickTo(overlayRef.current, 'xPercent', { duration: 0.9, ease: 'power3.out' })
      const moveOverlayOpacity = gsap.quickTo(overlayRef.current, 'opacity', { duration: 0.5, ease: 'power2.out' })

      handlePointerMove = (event: PointerEvent) => {
        if (!heroRef.current) return

        const bounds = heroRef.current.getBoundingClientRect()
        const x = (event.clientX - bounds.left) / bounds.width - 0.5
        const y = (event.clientY - bounds.top) / bounds.height - 0.5

        moveImageX(x * 3.5)
        moveImageY(y * 3.5)
        moveContentX(x * 18)
        moveContentY(y * 14)
        moveOverlayX(x * -2)
        moveOverlayOpacity(0.3)
      }

      resetHero = () => {
        moveImageX(0)
        moveImageY(0)
        moveContentX(0)
        moveContentY(0)
        moveOverlayX(0)
        moveOverlayOpacity(0.2)
      }

      hero.addEventListener('pointermove', handlePointerMove)
      hero.addEventListener('pointerleave', resetHero)
    }, heroRef.current)

    return () => {
      if (handlePointerMove) hero.removeEventListener('pointermove', handlePointerMove)
      if (resetHero) hero.removeEventListener('pointerleave', resetHero)
      ctx.revert()
    }
  }, [])

  return { heroRef, titleRef, imageRef, contentRef, overlayRef }
}

export function useInteractiveShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return
    const section = sectionRef.current
    let handlePointerMove: ((event: PointerEvent) => void) | undefined
    let resetSection: (() => void) | undefined

    const ctx = gsap.context(() => {
      const moveImageX = gsap.quickTo(imageRef.current, 'xPercent', { duration: 0.8, ease: 'power3.out' })
      const moveImageY = gsap.quickTo(imageRef.current, 'yPercent', { duration: 0.8, ease: 'power3.out' })
      const moveContentX = gsap.quickTo(contentRef.current, 'x', { duration: 0.6, ease: 'power3.out' })
      const moveContentY = gsap.quickTo(contentRef.current, 'y', { duration: 0.6, ease: 'power3.out' })

      handlePointerMove = (event: PointerEvent) => {
        if (!sectionRef.current) return

        const bounds = sectionRef.current.getBoundingClientRect()
        const x = (event.clientX - bounds.left) / bounds.width - 0.5
        const y = (event.clientY - bounds.top) / bounds.height - 0.5

        moveImageX(x * 2.5)
        moveImageY(y * 2.5)
        moveContentX(x * 12)
        moveContentY(y * 12)
      }

      resetSection = () => {
        moveImageX(0)
        moveImageY(0)
        moveContentX(0)
        moveContentY(0)
      }

      section.addEventListener('pointermove', handlePointerMove)
      section.addEventListener('pointerleave', resetSection)
    }, sectionRef.current)

    return () => {
      if (handlePointerMove) section.removeEventListener('pointermove', handlePointerMove)
      if (resetSection) section.removeEventListener('pointerleave', resetSection)
      ctx.revert()
    }
  }, [])

  return { sectionRef, imageRef, contentRef }
}
