'use client';

import React from 'react';
import { WorkplaceProfile } from '../lib/types';
import { X, Printer, ShieldAlert, CheckCircle, FileText } from 'lucide-react';

interface RiskAssessmentDocModalProps {
  isOpen: boolean;
  onClose: () => void;
  workplace: WorkplaceProfile;
}

export default function RiskAssessmentDocModal({ isOpen, onClose, workplace }: RiskAssessmentDocModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-rose-400" />
            <div>
              <h3 className="font-bold text-base">고용노동부 제출용 위험성평가 실시 결과 보고서</h3>
              <p className="text-xs text-slate-400">산업안전보건법 제36조 & 중대재해처벌법 시행령 제4조 제3호 표준 양식</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Document Body (Printable A4 format) */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-900 bg-white print:p-0">
          {/* Document Title Header */}
          <div className="text-center border-b-2 border-slate-900 pb-4">
            <span className="text-xs font-bold text-slate-500 tracking-widest block uppercase mb-1">
              MOEL Standard Compliance Document Form No. 2026-KRAS
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              사업장 위험성평가(KRAS 3단계) 실시 결과 보고서
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              (근거: 산업안전보건법 제36조 및 고용노동부 고시 제2023-19호)
            </p>
          </div>

          {/* Company Profile Table */}
          <div className="border border-slate-400 text-xs">
            <div className="grid grid-cols-4 bg-slate-100 border-b border-slate-300 font-semibold p-2 text-slate-800">
              <div>사업장명</div>
              <div className="font-normal text-slate-900">{workplace.companyName}</div>
              <div>대표이사(사업주)</div>
              <div className="font-normal text-slate-900">{workplace.ceoName} (인/서명)</div>
            </div>
            <div className="grid grid-cols-4 border-b border-slate-300 p-2 text-slate-800">
              <div className="font-semibold bg-slate-100 -m-2 mr-2 p-2">사업자등록번호</div>
              <div>{workplace.businessNumber}</div>
              <div className="font-semibold bg-slate-100 -m-2 mr-2 p-2">상시근로자수</div>
              <div>{workplace.employeeCount}명 (50인 미만 사업장)</div>
            </div>
            <div className="grid grid-cols-4 p-2 text-slate-800">
              <div className="font-semibold bg-slate-100 -m-2 mr-2 p-2">사업장 소재지</div>
              <div className="col-span-3">{workplace.location}</div>
            </div>
          </div>

          {/* Legal Certification Statement */}
          <div className="p-3.5 bg-slate-50 border-l-4 border-rose-600 rounded text-xs leading-relaxed text-slate-700">
            <span className="font-bold text-slate-900 block mb-1">■ 사업주 안전보건 확보 의무 이행 확인</span>
            본 사업장은 「중대재해 처벌 등에 관한 법률」 제4조 및 동법 시행령 제4조 제3호에 의거하여, 
            사업장 내 유해·위험요인을 확인·개선하기 위한 업무 절차를 마련하고, 현장 근로자의 직접 참여 하에 
            위험성평가를 성실히 실시하였음을 확인합니다.
          </div>

          {/* Hazards & Reduction Measures Table */}
          <div>
            <h3 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              유해·위험요인 파악 및 위험성 감소 대책 실행표
            </h3>
            <div className="border border-slate-300 rounded overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                  <tr>
                    <th className="p-2 border-r border-slate-300 w-12 text-center">No</th>
                    <th className="p-2 border-r border-slate-300 w-40">공정 및 작업내용</th>
                    <th className="p-2 border-r border-slate-300 w-24">위험형태</th>
                    <th className="p-2 border-r border-slate-300">위험요인 및 현장 상태</th>
                    <th className="p-2 border-r border-slate-300 w-16 text-center">평가 전</th>
                    <th className="p-2 border-r border-slate-300">감소 대책 (공학/관리/보호구)</th>
                    <th className="p-2 w-16 text-center">조치 후</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {workplace.hazards.map((h, i) => (
                    <tr key={h.id} className="align-top">
                      <td className="p-2 border-r border-slate-200 text-center font-semibold">{i + 1}</td>
                      <td className="p-2 border-r border-slate-200 font-medium text-slate-900">{h.processName}</td>
                      <td className="p-2 border-r border-slate-200">
                        <span className="font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                          {h.hazardType}
                        </span>
                      </td>
                      <td className="p-2 border-r border-slate-200 text-slate-700 text-[11px] leading-relaxed">
                        {h.hazardDescription}
                        <div className="text-[10px] text-slate-400 mt-1">{h.legalBasis}</div>
                      </td>
                      <td className="p-2 border-r border-slate-200 text-center">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          h.currentRiskLevel === 'HIGH' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {h.currentRiskLevel === 'HIGH' ? '상(高)' : '중(中)'}
                        </span>
                      </td>
                      <td className="p-2 border-r border-slate-200 text-[11px] space-y-1">
                        <div><strong className="text-slate-900">[공학]</strong> {h.reductionMeasures.engineering}</div>
                        <div><strong className="text-slate-900">[관리]</strong> {h.reductionMeasures.administrative}</div>
                        <div><strong className="text-slate-900">[보호구]</strong> {h.reductionMeasures.ppe}</div>
                      </td>
                      <td className="p-2 text-center">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          하(低)
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Verification Stamps */}
          <div className="pt-6 border-t border-slate-300 flex justify-between items-end text-xs text-slate-600">
            <div>
              <p>평가 실시일자: {workplace.lastAssessmentDate}</p>
              <p>평가 참여자: 대표이사 {workplace.ceoName}, 현장 관리감독자, 근로자 대표</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-900 text-sm">{workplace.companyName}</p>
              <p className="text-xs text-slate-500">안전보건관리총괄책임자 {workplace.ceoName} (직인생략)</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            고용노동부 불시 감독 시 현장 비치 및 3년 의무 보관 서류
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-md flex items-center gap-1.5 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>A4 보고서 즉시 인쇄 / PDF 저장</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-md"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
