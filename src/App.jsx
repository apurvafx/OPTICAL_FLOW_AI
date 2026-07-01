import React, { useState, useEffect } from 'react';
import SwipeSlider from './components/SwipeSlider';
import MetricsPanel from './components/MetricsPanel';
import LineChartComponent from './components/LineChart';
import MetadataPanel from './components/MetadataPanel';
import { Activity, Play, Pause } from 'lucide-react';

export default function App() {
  const [timelineVal, setTimelineVal] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [metrics, setMetrics] = useState({ ssim: 0.969, psnr: "36.43 dB", mse: 9.4605, fsim: 0.9642 });

  useEffect(() => {
    fetch('/metrics.json')
      .then(res => res.json())
      .then(data => setMetrics(data))
      .catch((err) => console.log("Using default fallback metrics:", err));
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimelineVal((prev) => (prev >= 20 ? 0 : prev + 10));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#4a5568] flex flex-col font-mono selection:bg-slate-200">
      
      {/* ============ ELEGANT, MINIMAL HEADER ============ */}
      <header className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-slate-900 flex items-center justify-center">
            <Activity className="text-white w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-bold text-slate-900 tracking-wider">
            OpticalFlow <span className="text-slate-400 font-normal">AI</span>
          </span>
        </div>
        <div className="text-[10px] text-slate-400 font-mono">
          upsampling cadence: 10 min ➔ 5 min
        </div>
      </header>

      {/* ============ MAIN LAYOUT (NO SIDEBAR) ============ */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Viewer & Performance Telemetry */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">LIVE FRAME COMPARISON</span>
              <span className="text-[10px] text-slate-450">COORDS: [21.034°N, 89.231°E]</span>
            </div>

            {/* Slider */}
            <div className="relative aspect-[16/10] bg-slate-50 rounded overflow-hidden border border-slate-200">
              <SwipeSlider 
                leftImage="/ground_truth/frame_10.png" 
                rightImage="/interpolated/frame_10_interpolated.png"
              />
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-all"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <span className="text-[11px] text-slate-500">Cadence: {timelineVal} min</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="20" 
                step="10" 
                value={timelineVal} 
                onChange={(e) => setTimelineVal(Number(e.target.value))}
                className="w-48 accent-slate-700 h-1 bg-slate-250 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Clean Performance Blocks (No Amber, Minimal Slate Theme) */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded p-4 flex flex-col justify-between">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">FRAME_LATENCY</span>
              <span className="text-lg font-bold text-slate-800 mt-2">12ms</span>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-slate-400 h-full w-[15%]"></div>
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded p-4 flex flex-col justify-between">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">STREAM_BITRATE</span>
              <span className="text-lg font-bold text-slate-800 mt-2">48 <span className="text-xs font-normal text-slate-400">Gbps</span></span>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-slate-400 h-full w-[45%]"></div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded p-4 flex flex-col justify-between">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">MODEL_CONFIDENCE</span>
              <span className="text-lg font-bold text-slate-800 mt-2">{(metrics.ssim * 100).toFixed(1)}%</span>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-slate-500 h-full w-[96.9%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Scientific Metrics Panels */}
        <div className="space-y-6">
          <MetricsPanel metrics={metrics} />
          <LineChartComponent />
          <MetadataPanel />
        </div>

      </main>
    </div>
  );
}
