'use client';

import React, { useState } from 'react';
import { WorkplaceProfile, HazardItem, TbmMeeting } from '../lib/types';
import { generateKrasAssessment } from '../lib/kras-safety-engine';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Users,
  Building,
  PlusCircle,
  FileCheck,
  ChevronRight,
  ClipboardList,
  Sparkles,
  ArrowRight,
  FileText
} from 'lucide-react';

interface SafetyAuditWorkbenchProps {
  workplaces: WorkplaceProfile[];
  onOpenReport: () => void;
  onOpenTbm: (meeting: TbmMeeting) => void;
}

export default function SafetyAuditWorkbench({
  workplaces,
  onOpenReport,
  onOpenTbm
}: SafetyAuditWorkbenchProps) {
  const [selectedWpId, setSelectedWpId] = useState<string>(workplaces[0].id);
  const [workplaceList, setWorkplaceList] = useState<WorkplaceProfile[]>(workplaces);

  // Form states for adding new on-site assessment
  const [taskDescription, setTaskDescription] = useState('2공장 배관 연결용 아크 용접 및 그라인더 표면 사상 작업');
  const [selectedHazardType, setSelectedHazardType] = useState<'추락' | '끼임' | '감전' | '충돌' | '화재/폭발' | '근골격계/질식'>('화재/폭발');
  const [isGenerating, setIsGenerating] = useState(false);

  const currentWp = workplaceList.find(w => w.id === selectedWpId) || workplaceList[0];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const result = generateKrasAssessment(currentWp, taskDescription, selectedHazardType);

      setWorkplaceList(prev =>
        prev.map(w => {
          if (w.id === currentWp.id) {
            return {
              ...w,
              safetyRiskIndex: Math.max(25, w.safetyRiskIndex - 15),
              lastAssessmentDate: new Date().toISOString().split('T')[0],
              hazards: result.hazards,
              tbmMeetings: [result.tbmMeeting, ...w.tbmMeetings]
            };
          }
          return w;
        })
      );
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Workplace Switcher & Risk Stats Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block mb-1">
              사업장 실시간 위험성 모니터링
            </span>
            <div className="flex items-center gap-3">
              <Building className="w-6 h-6 text-slate-400" />
              <select
                value={selectedWpId}
                onChange={e => setSelectedWpId(e.target.value)}
                className="bg-slate-800 text-white font-bold text-lg rounded-lg px-3 py-1.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                {workplaceList.map(wp => (
                  <option key={wp.id} value={wp.id}>
                    {wp.companyName} ({wp.employeeCount}인 / {wp.sector})
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-slate-400 mt-1.5">
              대표이사: {currentWp.ceoName} · 사업자등록번호: {currentWp.businessNumber} · 소재지: {currentWp.location}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Risk Index Gauge */}
            <div className="bg-slate-800/80 border border-slate-700 px-4 py-2.5 rounded-xl text-center">
              <span className="text-[11px] text-slate-400 block font-medium">중대재해 CEO 처벌 리스크 지수</span>
              <div className="flex items-center justify-center gap-1.5 mt-0.5">
                <span className={`text-2xl font-black ${currentWp.safetyRiskIndex > 70 ? 'text-rose-400' : 'text-amber-400'}`}>
                  {currentWp.safetyRiskIndex}
                </span>
                <span className="text-xs text-slate-500 font-semibold">/ 100점</span>
              </div>
            </div>

            <button
              onClick={onOpenReport}
              className="px-4 py-3 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-rose-950 transition"
            >
              <FileCheck className="w-4 h-4" />
              <span>노동부 제출용 보고서 출력</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-5 text-xs">
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 block mb-0.5">등록된 유해·위험요인</span>
            <span className="text-base font-bold text-white">{currentWp.hazards.length}건</span>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 block mb-0.5">미개선 고위험 항목</span>
            <span className="text-base font-bold text-rose-400">
              {currentWp.hazards.filter(h => h.currentRiskLevel === 'HIGH' && h.status !== 'COMPLETED').length}건 주의
            </span>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 block mb-0.5">최근 위험성평가 일자</span>
            <span className="text-base font-bold text-emerald-400">{currentWp.lastAssessmentDate}</span>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 block mb-0.5">누적 TBM 전자서명 일지</span>
            <span className="text-base font-bold text-indigo-300">{currentWp.tbmMeetings.length}회 완료</span>
          </div>
        </div>
      </div>

      {/* AI Assessment Generator Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                현장 작업 기반 고용노동부 KRAS 3단계 위험성평가 & TBM 일지 즉시 생성
              </h3>
              <p className="text-xs text-slate-500">
                작업 공정과 위험 유형을 선택하면 산안법 표준 위험요인, 3대 감소대책(공학/관리/보호구), TBM 안전구호가 자동 산출됩니다.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              금일 현장 작업 내용 (또는 현장 사진 설명)
            </label>
            <input
              type="text"
              value={taskDescription}
              onChange={e => setTaskDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="예: 2공장 배관 연결용 아크 용접 및 그라인더 표면 사상 작업"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              중대재해 중점 유해·위험 유형 선택
            </label>
            <div className="flex flex-wrap gap-2">
              {(['추락', '끼임', '충돌', '감전', '화재/폭발', '근골격계/질식'] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedHazardType(type)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    selectedHazardType === type
                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow transition"
            >
              {isGenerating ? (
                <span>AI 위험성평가 및 TBM 전자문서 생성 중...</span>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4 text-rose-400" />
                  <span>KRAS 3단계 표준 위험성평가표 & 금일 TBM 일지 생성하기</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Table: KRAS 3-Stage Risk Assessment Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              사업장 유해·위험요인 파악 및 개선 대책 실행 현황 (KRAS 표준)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              산업안전보건법 제36조에 따른 상(高)·중(中)·하(低) 3단계 위험도 평가표
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            총 {currentWp.hazards.length}개 위험 공정 관리 중
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">공정 및 작업</th>
                <th className="p-3.5">위험 분류</th>
                <th className="p-3.5">위험요인 및 법적 근거</th>
                <th className="p-3.5 text-center">평가 전 위험도</th>
                <th className="p-3.5">3대 감소 대책 (공학/관리/보호구)</th>
                <th className="p-3.5 text-center">개선 후</th>
                <th className="p-3.5">담당자</th>
                <th className="p-3.5 text-center">진행 상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentWp.hazards.map((hazard) => (
                <tr key={hazard.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-semibold text-slate-900 max-w-[160px]">
                    {hazard.processName}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      {hazard.hazardType}
                    </span>
                  </td>
                  <td className="p-3.5 max-w-[240px]">
                    <div className="text-slate-800 leading-relaxed font-medium">{hazard.hazardDescription}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{hazard.legalBasis}</div>
                  </td>
                  <td className="p-3.5 text-center">
                    <span className={`px-2 py-1 rounded text-[11px] font-bold ${
                      hazard.currentRiskLevel === 'HIGH' ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {hazard.currentRiskLevel === 'HIGH' ? '상(高)' : '중(中)'}
                    </span>
                  </td>
                  <td className="p-3.5 max-w-[280px] space-y-1 text-slate-700">
                    <div>
                      <span className="font-bold text-slate-900">[공학] </span>
                      {hazard.reductionMeasures.engineering}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">[관리] </span>
                      {hazard.reductionMeasures.administrative}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">[보호구] </span>
                      {hazard.reductionMeasures.ppe}
                    </div>
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      하(低)
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600 font-medium">
                    {hazard.actionOwner}
                  </td>
                  <td className="p-3.5 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      hazard.status === 'COMPLETED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : hazard.status === 'IN_PROGRESS'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {hazard.status === 'COMPLETED' ? '조치완료' : hazard.status === 'IN_PROGRESS' ? '조치중' : '대기중'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TBM Meetings & Compliance Checklist Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TBM Meeting Logs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-indigo-600" />
              <h4 className="font-bold text-slate-900 text-sm">작업 전 10분 안전점검회의(TBM) 보존 일지</h4>
            </div>
            <span className="text-xs text-slate-500">{currentWp.tbmMeetings.length}건 보관 중</span>
          </div>

          {currentWp.tbmMeetings.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">
              아직 등록된 TBM 일지가 없습니다. 상단에서 작업을 생성해주세요.
            </p>
          ) : (
            <div className="space-y-3">
              {currentWp.tbmMeetings.map((tbm) => (
                <div
                  key={tbm.id}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{tbm.date}</span>
                      <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                        {tbm.attendees.length}명 서명완료
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1">{tbm.jobName}</p>
                    <p className="text-[11px] text-rose-600 font-medium">📢 {tbm.safetySlogan}</p>
                  </div>

                  <button
                    onClick={() => onOpenTbm(tbm)}
                    className="px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-md flex items-center gap-1 shrink-0 ml-2"
                  >
                    <span>일지 보기</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 16 Mandatory Compliance Items */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <h4 className="font-bold text-slate-900 text-sm">중대재해처벌법 16대 법적 의무 진단</h4>
            </div>
            <span className="text-xs font-semibold text-rose-600">불시감독 대비 체크리스트</span>
          </div>

          <div className="space-y-3">
            {currentWp.complianceItems.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{item.requirement}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.currentStatus === 'COMPLIANT'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.currentStatus === 'WARNING'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {item.currentStatus === 'COMPLIANT' ? '적합' : item.currentStatus === 'WARNING' ? '주의' : '위반/미비'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600">{item.recommendation}</div>
                <div className="text-[10px] text-rose-700 font-semibold">
                  ⚠️ 리스크: {item.moelFineRisk}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
