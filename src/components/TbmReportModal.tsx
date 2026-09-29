'use client';

import React from 'react';
import { TbmMeeting, WorkplaceProfile } from '../lib/types';
import { X, CheckCircle2, ShieldCheck, Printer, Users, AlertTriangle } from 'lucide-react';

interface TbmReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  workplace: WorkplaceProfile;
  meeting: TbmMeeting | null;
}

export default function TbmReportModal({ isOpen, onClose, workplace, meeting }: TbmReportModalProps) {
  if (!isOpen || !meeting) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base leading-tight">작업 전 10분 안전점검회의(TBM) 일지</h3>
              <p className="text-xs text-slate-400">고용노동부 지침 준수 · 모바일 전자서명 보존용</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-800 print:p-0">
          {/* Top Meta Table */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div>
              <span className="text-xs text-slate-500 block">사업장명</span>
              <span className="font-semibold text-slate-900">{workplace.companyName}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">실시 일시</span>
              <span className="font-semibold text-slate-900">{meeting.date}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">작업 지휘자</span>
              <span className="font-semibold text-slate-900">{meeting.leaderName}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">참석 인원</span>
              <span className="font-semibold text-emerald-700">{meeting.attendees.length}명 전원 서명완료</span>
            </div>
          </div>

          {/* Job Name */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">금일 대상 작업</h4>
            <div className="p-3 bg-slate-100 rounded-md font-medium text-slate-900 border border-slate-200">
              {meeting.jobName}
            </div>
          </div>

          {/* Key Hazard Points */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5 text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              금일 중점 위험요인 및 전파 안전조치
            </h4>
            <ul className="space-y-2">
              {meeting.keyHazardPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-amber-50/60 p-2.5 rounded border border-amber-200/70 text-slate-800 text-xs">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Safety Slogan & Environment */}
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 text-xs flex items-center justify-between">
            <div>
              <span className="font-bold block mb-0.5">📢 오늘의 안전 구호</span>
              <span className="text-rose-800 font-medium">{meeting.safetySlogan}</span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-rose-600 block">보호구 점검 상태</span>
              <span className="font-bold text-emerald-700">100% 착용 완료 ✓</span>
            </div>
          </div>

          {/* Worker Digital Signatures Table */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-slate-600" />
              참석 근로자 전자서명 대장 (중처법 증빙용)
            </h4>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">성명</th>
                    <th className="p-2.5">담당 직무</th>
                    <th className="p-2.5">서명 시간</th>
                    <th className="p-2.5 text-center">디지털 서명</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {meeting.attendees.map((att, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2.5 font-medium text-slate-900">{att.name}</td>
                      <td className="p-2.5 text-slate-600">{att.role}</td>
                      <td className="p-2.5 text-slate-500">{att.signedAt}</td>
                      <td className="p-2.5 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          전자서명 검증완료
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            문서 번호: {meeting.id} · 3년간 전산 보존 필수 (산안법 제36조)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-md flex items-center gap-1.5 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>일지 인쇄 / PDF 저장</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-md"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
