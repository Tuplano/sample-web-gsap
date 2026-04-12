import { useLayoutEffect, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

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
      // Reveal Reveal - Standard entrance for text blocks
      gsap.utils.toArray<HTMLElement>('.reveal-text').forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Image Reveal - Expanding into frame
      gsap.utils.toArray<HTMLElement>('.reveal-image-container').forEach((container) => {
        const img = container.querySelector('img')
        gsap.fromTo(img, 
          { scale: 1.4 },
          { 
            scale: 1, 
            duration: 2.5, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 95%',
            }
          }
        )
      })

      // Image Parallax - Elevated depth
      gsap.utils.toArray<HTMLElement>('.parallax-image').forEach((el) => {
        gsap.to(el, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      // Staggered Collage - Mosaic entry
      gsap.utils.toArray<HTMLElement>('.stagger-item').forEach((container) => {
        const items = container.querySelectorAll('.item')
        gsap.from(items, {
          y: 80,
          opacity: 0,
          duration: 1.5,
          stagger: 0.25,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
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
    const ctx = gsap.context(() => {
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
    })

    return () => ctx.revert()
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

  useLayoutEffect(() => {
    if (!heroRef.current) return
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
    }, heroRef.current)

    return () => ctx.revert()
  }, [])

  return { heroRef, titleRef, imageRef }
}
