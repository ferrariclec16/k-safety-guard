export type IndustrySector = 'MANUFACTURING' | 'CONSTRUCTION' | 'LOGISTICS' | 'AUTO_REPAIR';

export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface HazardItem {
  id: string;
  processName: string; // 공정/작업명 (예: 지게차 원자재 하역, 프레스 금형 교체작업)
  hazardType: '추락' | '끼임' | '감전' | '충돌' | '화재/폭발' | '근골격계/질식';
  hazardDescription: string; // 위험요인 상세 (예: 포크를 높이 든 채 급회전 시 전도 및 보행자 충돌 위험)
  currentRiskLevel: RiskLevel; // 개선 전 위험도
  legalBasis: string; // 관련 법적 근거 (예: 산업안전보건기준에 관한 규칙 제179조)
  reductionMeasures: {
    engineering: string; // 공학적 대책 (예: 지게차 후방감지센서 및 안전벨트 인터록 설치)
    administrative: string; // 관리적 대책 (예: 작업지휘자 지정 및 보행자 전용통로 구획)
    ppe: string; // 보호구 대책 (예: 안전모, 안전화, 야광조끼 착용 의무화)
  };
  afterRiskLevel: RiskLevel; // 개선 후 잔여 위험도
  actionOwner: string; // 조치 담당자
  completionDate: string; // 조치 예정일
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface TbmMeeting {
  id: string;
  date: string;
  workplaceId: string;
  jobName: string;
  leaderName: string;
  attendees: {
    name: string;
    role: string;
    signatureRecorded: boolean;
    signedAt: string;
  }[];
  keyHazardPoints: string[];
  safetySlogan: string;
  weatherNotice: string;
  protectiveEquipmentChecked: boolean;
}

export interface ComplianceAuditItem {
  id: string;
  category: string;
  legalArticle: string;
  requirement: string;
  currentStatus: 'COMPLIANT' | 'WARNING' | 'VIOLATION';
  recommendation: string;
  moelFineRisk: string; // 과태료/형사처벌 리스크 설명
}

export interface WorkplaceProfile {
  id: string;
  companyName: string;
  ceoName: string;
  businessNumber: string;
  sector: IndustrySector;
  employeeCount: number;
  location: string;
  safetyRiskIndex: number; // 0~100 (높을수록 중대재해 발생 및 CEO 처벌 위험 높음)
  lastAssessmentDate: string;
  openViolationsCount: number;
  hazards: HazardItem[];
  tbmMeetings: TbmMeeting[];
  complianceItems: ComplianceAuditItem[];
}
