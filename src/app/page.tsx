'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SafetyAuditWorkbench from '../components/SafetyAuditWorkbench';
import TbmReportModal from '../components/TbmReportModal';
import RiskAssessmentDocModal from '../components/RiskAssessmentDocModal';
import PricingModal from '../components/PricingModal';
import { INITIAL_WORKPLACES } from '../lib/mock-workplaces';
import { TbmMeeting } from '../lib/types';

export default function Home() {
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [activeTbm, setActiveTbm] = useState<TbmMeeting | null>(null);

  const selectedWorkplace = INITIAL_WORKPLACES[0];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col">
      <Navbar
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SafetyAuditWorkbench
          workplaces={INITIAL_WORKPLACES}
          onOpenReport={() => setIsReportOpen(true)}
          onOpenTbm={(meeting) => setActiveTbm(meeting)}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>© 2026 K-SafetyGuard AI. 고용노동부 KRAS 3단계 표준 위험성평가 및 중대재해처벌법 컴플라이언스 솔루션.</p>
        <p className="mt-1 text-slate-400">
          근거 법령: 산업안전보건법 제36조, 중대재해 처벌 등에 관한 법률 제4조 제1항 제3호 및 동법 시행령 제4조
        </p>
      </footer>

      {/* Modals */}
      <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
      <RiskAssessmentDocModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        workplace={selectedWorkplace}
      />
      <TbmReportModal
        isOpen={Boolean(activeTbm)}
        onClose={() => setActiveTbm(null)}
        workplace={selectedWorkplace}
        meeting={activeTbm}
      />
    </div>
  );
}
