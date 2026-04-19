import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Social Tier - Warm Muted Stone */}
      <section className="bg-secondary py-16">
        <div className="page-wrap relative flex flex-col items-center gap-8 md:flex-row md:gap-0">
          <div className="flex gap-6 md:flex-1 md:justify-start">
            <Instagram size={20} className="text-primary hover:opacity-70 cursor-pointer transition-opacity" />
            <Facebook size={20} className="text-primary hover:opacity-70 cursor-pointer transition-opacity" />
            <Twitter size={20} className="text-primary hover:opacity-70 cursor-pointer transition-opacity" />
          </div>
          <div className="text-2xl font-serif italic text-primary tracking-[0.14em] md:absolute md:left-1/2 md:-translate-x-1/2">
            Harborline
          </div>
          <div className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-primary md:flex-1 md:text-right">
            Explore the Sanctuary
          </div>
        </div>
      </section>

      {/* Navigation Tier - Deep Earthy Dark */}
      <section className="bg-foreground py-24 text-background/50">
        <div className="page-wrap grid grid-cols-2 gap-12 sm:grid-cols-4 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <h4 className="mb-6 font-serif text-lg italic text-background">Harborline</h4>
            <p className="max-w-[24ch] text-sm leading-6">
              Curated experiences and bespoke retreats for the discerning explorer.
            </p>
          </div>
          
          <div>
            <h5 className="mb-4 text-[11px] font-medium uppercase tracking-[0.16em] text-background">Destinations</h5>
            <ul className="grid gap-2.5 text-sm">
              <li><a href="#" className="hover:text-background transition-colors">Island Escapes</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Forest Retreats</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Urban Havens</a></li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 text-[11px] font-medium uppercase tracking-[0.16em] text-background">Company</h5>
            <ul className="grid gap-2.5 text-sm">
              <li><a href="#" className="hover:text-background transition-colors">About</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 text-[11px] font-medium uppercase tracking-[0.16em] text-background">Legal</h5>
            <ul className="grid gap-2.5 text-sm">
              <li><a href="#" className="hover:text-background transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="page-wrap mt-20 border-t border-background/5 pt-8 text-center text-[10px] uppercase tracking-[0.14em]">
          © 2026 Harborline Collective. All rights reserved.
        </div>
      </section>
    </footer>
  )
}
