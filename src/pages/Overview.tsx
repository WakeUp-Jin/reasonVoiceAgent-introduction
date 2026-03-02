import { OverviewHeader, HeroSection, FeatureShowcase } from '@/src/components/overview';

function Overview() {
  return (
    <div className="min-h-screen bg-white">
      <OverviewHeader />
      <HeroSection />
      <FeatureShowcase />

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black sm:h-8 sm:w-8">
                <span className="text-xs font-bold text-white sm:text-sm">A</span>
              </div>
              <span className="text-base font-semibold text-black sm:text-lg">Reason VoiceAgent</span>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="#" className="text-sm text-neutral-500 transition-colors hover:text-black">
                隐私政策
              </a>
              <a href="#" className="text-sm text-neutral-500 transition-colors hover:text-black">
                服务条款
              </a>
              <a href="#" className="text-sm text-neutral-500 transition-colors hover:text-black">
                联系我们
              </a>
            </nav>

            {/* Copyright */}
            <p className="text-xs text-neutral-400 sm:text-sm">
              © 2025 Reason VoiceAgent. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Overview;
