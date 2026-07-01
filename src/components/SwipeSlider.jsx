import React, { useState, useRef } from 'react';

export default function SwipeSlider({ leftImage, rightImage }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden cursor-ew-resize bg-slate-100"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      {/* Ground Truth Image */}
      <img 
        src={leftImage} 
        alt="Ground Truth" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90"
      />
      <div className="absolute top-4 left-4 z-10 bg-white/90 border border-slate-200 text-[9px] font-bold font-mono text-slate-800 px-2 py-1 rounded tracking-wider shadow-sm">
        REAL_GROUND_TRUTH
      </div>

      {/* AI Interpolated Image (Clip Path) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
      >
        <img 
          src={rightImage} 
          alt="AI Interpolated" 
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          style={{ width: containerRef.current?.offsetWidth || '100%' }}
        />
      </div>
      <div className="absolute top-4 right-4 z-10 bg-slate-900/90 border border-slate-850 text-[9px] font-bold font-mono text-white px-2 py-1 rounded tracking-wider shadow-sm">
        AI_INTERPOLATED_v4
      </div>

      {/* Swipe Handle */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-slate-400 cursor-ew-resize z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center shadow-md">
          <svg className="w-3 h-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-4 4 4 4m8 0l4-4-4-4" />
          </svg>
        </div>
      </div>
    </div>
  );
}