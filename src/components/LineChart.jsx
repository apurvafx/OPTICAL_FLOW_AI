import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { time: 'FRAME 01', ssim: 1.000 },
  { time: 'FRAME 06', ssim: 0.978 },
  { time: 'FRAME 12', ssim: 0.969 },
  { time: 'FRAME 18', ssim: 0.974 },
  { time: 'FRAME 24', ssim: 1.000 }
];

export default function LineChartComponent() {
  return (
    <div className="bg-white border border-slate-200 rounded p-5 relative">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SSIM_PERFORMANCE_24F</span>
        <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">LIVE_TELEMETRY</span>
      </div>
      
      <div className="h-40 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 5, left: -35, bottom: 0 }}>
            <defs>
              <linearGradient id="ssimGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#475569" stopOpacity={0.08}/>
                <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#cbd5e1" fontSize={9} tickLine={false} />
            <YAxis domain={[0.95, 1.0]} stroke="#cbd5e1" fontSize={9} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '4px' }}
              labelStyle={{ fontSize: '9px', color: '#64748b' }}
              itemStyle={{ fontSize: '9px', color: '#475569' }}
            />
            <Area 
              type="monotone" 
              dataKey="ssim" 
              stroke="#475569" 
              strokeWidth={1.5} 
              fillOpacity={1} 
              fill="url(#ssimGrad)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}