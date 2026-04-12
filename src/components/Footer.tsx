import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Social Tier - Warm Muted Stone */}
      <section className="bg-secondary py-16">
        <div className="page-wrap flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex gap-6">
            <Instagram size={20} className="text-primary hover:opacity-70 cursor-pointer transition-opacity" />
            <Facebook size={20} className="text-primary hover:opacity-70 cursor-pointer transition-opacity" />
            <Twitter size={20} className="text-primary hover:opacity-70 cursor-pointer transition-opacity" />
          </div>
          <div className="text-2xl font-serif italic text-primary tracking-[0.2em]">
            Harborline
          </div>
          <div className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            Explore the Sanctuary
          </div>
        </div>
      </section>

      {/* Navigation Tier - Deep Earthy Dark */}
      <section className="bg-foreground py-24 text-background/50">
        <div className="page-wrap grid grid-cols-2 gap-12 sm:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <h4 className="mb-6 font-serif text-lg italic text-background">Harborline</h4>
            <p className="max-w-[20ch] text-[11px] leading-relaxed">
              Curated experiences and bespoke retreats for the discerning explorer.
            </p>
          </div>
          
          <div>
            <h5 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-background">Destinations</h5>
            <ul className="grid gap-2 text-[11px]">
              <li><a href="#" className="hover:text-background transition-colors">Island Escapes</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Forest Retreats</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Urban Havens</a></li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-background">Company</h5>
            <ul className="grid gap-2 text-[11px]">
              <li><a href="#" className="hover:text-background transition-colors">About</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-background">Legal</h5>
            <ul className="grid gap-2 text-[11px]">
              <li><a href="#" className="hover:text-background transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Cookies</a></li>
            </ul>
          </div>

          <div className="col-span-2 flex items-center justify-end lg:col-span-1">
            <div className="h-16 w-16 opacity-10 filter grayscale invert brightness-200">
              <svg viewBox="0 0 100 100" className="fill-current">
                 <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" fill="none" />
                 <text x="50" y="55" fontSize="30" textAnchor="middle" fontFamily="serif" fontStyle="italic">HN</text>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="page-wrap mt-24 border-t border-background/5 pt-8 text-center text-[9px] uppercase tracking-[0.2em]">
          © 2026 Harborline Collective. All rights reserved.
        </div>
      </section>
    </footer>
  )
}
