import { useState } from 'react';
import { Button } from '@/src/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navLinks = [
  { label: '概览', href: '#' },
  { label: '功能', href: '#features' },
  { label: '演示', href: '#demo' },
];

export function OverviewHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black sm:h-8 sm:w-8">
            <span className="text-xs font-bold text-white sm:text-sm">A</span>
          </div>
          <span className="text-base font-semibold text-black sm:text-lg">Reason VoiceAgent</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-neutral-600 transition-colors hover:text-black"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button className="bg-black text-sm text-white hover:bg-neutral-800">
            了解更多
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-neutral-100 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'overflow-hidden border-t border-neutral-200 bg-white transition-all duration-200 md:hidden',
          mobileMenuOpen ? 'max-h-80' : 'max-h-0 border-t-0'
        )}
      >
        <nav className="flex flex-col px-4 py-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2.5 text-sm text-neutral-600 transition-colors hover:text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-neutral-100 pt-3">
            <Button className="w-full bg-black text-sm text-white hover:bg-neutral-800">
              了解更多
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
