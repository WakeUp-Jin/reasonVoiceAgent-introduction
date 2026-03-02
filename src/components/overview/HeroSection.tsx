import { useState, useRef, useEffect, useCallback } from 'react';
import { Loader2, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Dialog, DialogContent, DialogTitle } from '@/src/components/ui/dialog';

const DEMO_VIDEO_URL = 'https://voice-agent.s3.bitiful.net/overview/fullDemo.mp4';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const seekTo = useCallback((clientX: number) => {
    const bar = progressRef.current;
    const video = videoRef.current;
    if (!bar || !video) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    video.currentTime = ratio * video.duration;
    setCurrentTime(video.currentTime);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => seekTo(e.clientX);
    const onUp = () => setIsDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isDragging, seekTo]);

  return (
    <>
      <section className="flex flex-col items-center justify-center bg-white px-4 py-16 text-center sm:px-6 md:py-24 lg:py-32">
        {/* Main Title */}
        <h1 className="animate-in fade-in slide-in-from-bottom-4 max-w-4xl text-3xl font-bold tracking-tight text-black duration-500 sm:text-4xl md:text-5xl lg:text-6xl">
          AI 驱动的音频创作新时代
        </h1>

        {/* Subtitle */}
        <p
          className="animate-in fade-in slide-in-from-bottom-4 mt-4 max-w-2xl text-base text-neutral-600 duration-500 sm:mt-6 sm:text-lg md:text-xl"
          style={{ animationDelay: '100ms' }}
        >
          让 AI 智能体帮你完成配音、音效、BGM 的智能匹配与生成。
          <br className="hidden sm:block" />
          一切自然流动，与你共同创作。
        </p>

        {/* Demo Video in Browser Frame */}
        <div
          className="animate-in fade-in slide-in-from-bottom-6 mt-12 w-full max-w-6xl duration-700 sm:mt-16"
          style={{ animationDelay: '250ms' }}
        >
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-2xl">
            {/* Browser Title Bar */}
            <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="mx-auto flex h-6 w-full max-w-xs items-center justify-center rounded-md bg-white px-3 text-xs text-neutral-400">
                voice-agent.app
              </div>
              <div className="w-[54px]" />
            </div>

            {/* Video Area */}
            <div className="relative bg-white">
              {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <Loader2 className="h-10 w-10 animate-spin text-neutral-500" />
                </div>
              )}

              {hasError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-neutral-500">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    />
                  </svg>
                  <span className="text-sm">视频加载失败</span>
                </div>
              )}

              {!hasError && (
                <video
                  ref={videoRef}
                  src={DEMO_VIDEO_URL}
                  className={cn(
                    'w-full transition-opacity duration-500',
                    isLoading ? 'opacity-0' : 'opacity-100'
                  )}
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                  onLoadedData={() => setIsLoading(false)}
                  onError={() => { setIsLoading(false); setHasError(true); }}
                  onTimeUpdate={(e) => {
                    if (!isDragging) setCurrentTime(e.currentTarget.currentTime);
                  }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )}
            </div>

            {/* Playback Controls */}
            {!hasError && !isLoading && (
              <div className="flex items-center gap-3 border-t border-neutral-200 bg-neutral-50 px-4 py-2.5">
                {/* Play / Pause */}
                <button
                  onClick={togglePlay}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-black"
                >
                  {isPlaying
                    ? <Pause className="h-4 w-4" />
                    : <Play className="h-4 w-4" />}
                </button>

                {/* Current Time */}
                <span className="w-10 shrink-0 text-xs tabular-nums text-neutral-500">
                  {formatTime(currentTime)}
                </span>

                {/* Progress Bar */}
                <div
                  ref={progressRef}
                  className="group relative flex h-7 flex-1 cursor-pointer items-center"
                  onMouseDown={(e) => { setIsDragging(true); seekTo(e.clientX); }}
                >
                  <div className="relative h-1 w-full rounded-full bg-neutral-200 transition-all group-hover:h-1.5">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-black transition-all"
                      style={{ width: `${progress}%` }}
                    />
                    <div
                      className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                      style={{ left: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Duration */}
                <span className="w-10 shrink-0 text-right text-xs tabular-nums text-neutral-500">
                  {formatTime(duration)}
                </span>

                {/* Mute / Unmute */}
                <button
                  onClick={toggleMute}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-black"
                >
                  {isMuted
                    ? <VolumeX className="h-4 w-4" />
                    : <Volume2 className="h-4 w-4" />}
                </button>

                {/* Fullscreen */}
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-black"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fullscreen Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-[90vw] p-0">
          <DialogTitle className="sr-only">演示视频</DialogTitle>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <video
              src={DEMO_VIDEO_URL}
              className="h-full w-full object-contain"
              controls
              autoPlay
              loop
              playsInline
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
