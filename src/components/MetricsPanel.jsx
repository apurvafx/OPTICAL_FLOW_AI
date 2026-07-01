import React from 'react';

export default function MetricsPanel({ metrics }) {
  const ssimVal = metrics.ssim || 0.9690;
  const fsimVal = metrics.fsim || 0.9642;
  const psnrVal = metrics.psnr || "36.43 dB";
  const mseVal = metrics.mse || 9.4605;

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* SSIM CARD */}
      <div className="bg-white border border-slate-200 rounded p-4 flex flex-col justify-between relative overflow-hidden">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SSIM</span>
        <div className="flex flex-col items-center justify-center my-3 relative">
          <div className="w-20 h-20 rounded-full border-4 border-slate-100 flex items-center justify-center relative">
            {/* Dark slate progress spinner */}
            <div className="absolute inset-0 rounded-full border-4 border-t-slate-800 border-r-slate-800 border-b-slate-200/20 border-l-slate-200/20 animate-spin-slow"></div>
            <span className="text-sm font-bold text-slate-800 font-mono">{ssimVal}</span>
          </div>
        </div>
        <span className="text-[9px] text-slate-450 text-center font-mono uppercase">Structural Index</span>
      </div>

      {/* FSIM CARD */}
      <div className="bg-white border border-slate-200 rounded p-4 flex flex-col justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">FSIM_SCORE</span>
        <div className="my-4">
          <div className="text-2xl font-bold font-mono text-slate-800">{fsimVal}</div>
          <span className="text-[9px] text-slate-500 font-mono mt-1 block">+0.0021 vs prev</span>
        </div>
        <span className="text-[9px] text-slate-450 font-mono uppercase">Feature Magnitude</span>
      </div>

      {/* PSNR CARD */}
      <div className="bg-white border border-slate-200 rounded p-4 flex flex-col justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PSNR_RATIO</span>
        <div className="my-4">
          <div className="text-xl font-bold font-mono text-slate-800 flex items-baseline gap-1">
            {psnrVal}
          </div>
          <span className="text-[9px] text-slate-450 font-mono mt-1 block">Target: &gt;35dB</span>
        </div>
        <span className="text-[9px] text-slate-450 font-mono uppercase">Signal Noise</span>
      </div>

      {/* MSE CARD */}
      <div className="bg-white border border-slate-200 rounded p-4 flex flex-col justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">MSE_ERROR</span>
        <div className="my-4">
          <div className="text-2xl font-bold font-mono text-slate-800">{mseVal}</div>
          <span className="text-[9px] text-slate-500 font-mono mt-1 block">-1.4% Improve</span>
        </div>
        <span className="text-[9px] text-slate-450 font-mono uppercase">Pixel Dev</span>
      </div>
    </div>
  );
}