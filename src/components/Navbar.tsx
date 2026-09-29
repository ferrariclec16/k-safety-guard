'use client';

import React from 'react';
import { ShieldAlert, Award, FileSpreadsheet, Building2, CreditCard } from 'lucide-react';

interface NavbarProps {
  onOpenPricing: () => void;
  onOpenReport: () => void;
}

export default function Navbar({ onOpenPricing, onOpenReport }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-900/40">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight">K-SafetyGuard AI</span>
              <span className="text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full">
                중대재해처벌법 50인 미만 전면대응
              </span>
            </div>
            <p className="text-xs text-slate-400">
              고용노동부 KRAS 표준 3단계 위험성평가 & 모바일 TBM 자동화 SaaS
            </p>
          </div>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenReport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>노동부 제출용 보고서</span>
          </button>

          <button
            onClick={onOpenPricing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-md shadow transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            <span>기업 요금제</span>
          </button>
        </div>
      </div>
    </header>
  );
}
