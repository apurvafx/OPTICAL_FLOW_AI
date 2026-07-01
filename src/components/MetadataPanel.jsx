import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function MetadataPanel() {
  return (
    <div className="bg-white border border-slate-200 rounded p-5">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
        <AlertCircle className="w-4 h-4 text-slate-500" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">METADATA / CONFIG</span>
      </div>

      <div className="space-y-4 text-[10px] font-mono">
        <div className="flex justify-between border-b border-slate-50 pb-2">
          <span className="text-slate-450 uppercase">PROJECTION</span>
          <span className="text-slate-800">GEOSTATIONARY</span>
        </div>
        <div className="flex justify-between border-b border-slate-50 pb-2">
          <span className="text-slate-450 uppercase">BOUNDS</span>
          <span className="text-slate-800">10.3UM CLEAN IR</span>
        </div>
        <div className="flex justify-between border-b border-slate-50 pb-2">
          <span className="text-slate-450 uppercase">SENSOR</span>
          <span className="text-slate-800">GOES-19 ABI</span>
        </div>
        <div className="flex justify-between border-b border-slate-50 pb-2">
          <span className="text-slate-450 uppercase">FORMAT</span>
          <span className="text-slate-800">NETCDF-4</span>
        </div>
        <div className="flex justify-between pb-2">
          <span className="text-slate-450 uppercase">INTERP_KERNEL</span>
          <span className="text-slate-800">FOURIER-FLOW V2</span>
        </div>

        {/* Warning Indicator Card */}
        <div className="bg-amber-50/40 border border-amber-200 rounded p-3 mt-4 flex items-start gap-2.5">
          <span className="relative flex h-2 w-2 mt-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-450 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <div className="flex-1 text-[9px] leading-relaxed text-slate-500 font-mono">
            <strong className="text-amber-600">WARNING:</strong> Node 4 experiencing high thermal flux. Load balancing activated across secondary interpolation clusters.
          </div>
        </div>
      </div>
    </div>
  );
}