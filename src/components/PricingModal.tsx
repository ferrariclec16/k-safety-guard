'use client';

import React from 'react';
import { X, Check, ShieldCheck, Zap } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block mb-1">
              중대재해처벌법 형사처벌 리스크 제로 플랜
            </span>
            <h3 className="text-xl font-bold">50인 미만 중소기업 맞춤 구독 요금제</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50">
          {/* Basic Plan */}
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">스탠다드 공장/현장</h4>
                  <p className="text-xs text-slate-500 mt-0.5">상시근로자 10~29인 사업장</p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-700">
                  기본형
                </span>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-extrabold text-slate-900">₩149,000</span>
                <span className="text-xs text-slate-500 ml-1">/ 월 (부가세 별도)</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>KRAS 3단계 정기·수시 위험성평가 무제한</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>일일 작업 전 TBM 일지 & 모바일 전자서명</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>고용노동부 불시감독 대비 제출용 A4 보고서 출력</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>3년간 클라우드 법정 의무 보존</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => alert('14일 무료 체험이 활성화되었습니다. 즉시 위험성평가를 시작할 수 있습니다.')}
              className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-100 transition"
            >
              14일 무료 체험 시작
            </button>
          </div>

          {/* Pro / Labor Attorney Guaranteed Plan */}
          <div className="p-6 bg-slate-900 rounded-xl border-2 border-rose-500 shadow-md flex flex-col justify-between text-white relative">
            <div className="absolute -top-3 right-4 bg-rose-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
              대표이사 안심 보증
            </div>

            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-white text-base">컴플라이언스 안심형</h4>
                  <p className="text-xs text-slate-400 mt-0.5">상시근로자 30~49인 / 고위험 제조·건설</p>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-extrabold text-white">₩290,000</span>
                <span className="text-xs text-slate-400 ml-1">/ 월 (부가세 별도)</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="font-medium text-white">스탠다드 전 기능 포함</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>산재전문 공인노무사 / 안전지도사 분기별 1회 감수</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>노동부 감독관 불시 방문 시 전담 소명 지원</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>하도급 협력사 안전보건 적격성 심사 패키지 제공</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => alert('공인노무사 감수 플랜 상담이 접수되었습니다. 24시간 내 배정 안내를 드립니다.')}
              className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 text-white shadow transition"
            >
              대표이사 안심 플랜 도입하기
            </button>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="p-4 bg-slate-100 text-slate-600 text-xs text-center border-t border-slate-200">
          안전관리자 선임 인건비(연 6,000만 원) 대비 95% 비용 절감 · 전담 안전담당자 지정 불필요
        </div>
      </div>
    </div>
  );
}
