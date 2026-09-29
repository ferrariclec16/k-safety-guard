import { HazardItem, RiskLevel, TbmMeeting, WorkplaceProfile } from './types';

export interface GeneratedAssessmentResult {
  hazards: HazardItem[];
  tbmMeeting: TbmMeeting;
  overallRiskLevel: RiskLevel;
  safetySummary: string;
}

export function generateKrasAssessment(
  workplace: WorkplaceProfile,
  taskDescription: string,
  hazardType: '추락' | '끼임' | '감전' | '충돌' | '화재/폭발' | '근골격계/질식'
): GeneratedAssessmentResult {
  const newId = `HAZ-${Date.now().toString().slice(-4)}`;
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  let engineeringMeasure = '';
  let adminMeasure = '';
  let ppeMeasure = '';
  let legalArticle = '';
  let slogan = '';

  switch (hazardType) {
    case '추락':
      engineeringMeasure = '수직 이동형 안전대 부착설비(구명줄) 설치 및 단부 안전난간대(높이 90cm 이상) 설치';
      adminMeasure = '2인 1조 작업 지침 수립, 고소작업 전 관리감독자 입회 하에 작업 시작 전 안전점검 실시';
      ppeMeasure = '한국산업안전보건공단 인증 KCs 안전그네형 안전대, 안전모(턱끈 결속) 필수 착용';
      legalArticle = '산업안전보건기준에 관한 규칙 제42조(추락의 방지) 및 제44조(안전대의 부착설비 등)';
      slogan = '단 1초의 방심이 평생의 후회! 안전대 체결 없는 고소 작업은 즉각 중단한다!';
      break;

    case '끼임':
      engineeringMeasure = '구동부 연동형 인터록 방호덮개 설치 및 비상정지 스위치(풋스위치 포함) 추가 증설';
      adminMeasure = '점검 및 정비 시 전원 차단 후 LOTO(Lockout/Tagout) 안전잠금장치 및 표지판 부착 의무화';
      ppeMeasure = '회전체 접촉 우려 시 면장갑/코팅장갑 착용 절대 금지(가죽장갑 또는 맨손 작업 원칙)';
      legalArticle = '산업안전보건기준에 관한 규칙 제87조(원동기·회전축 등의 위험 방지) 및 제92조(정비 등의 작업 시의 운전정지)';
      slogan = '기계가 멈추기 전에 손을 넣지 마라! LOTO 전원 차단이 내 가족을 지킨다!';
      break;

    case '충돌':
      engineeringMeasure = '지게차/중장비 후방 감지 센서, 보행자 인지 AI 어라운드뷰 카메라 및 블루스팟 경고 조명';
      adminMeasure = '장비 운행 경로와 보행자 이동 통로의 물리적 분리(가드레일), 최고속도 10km/h 제한';
      ppeMeasure = '원거리 식별용 고휘도 반사 안전조끼, 안전모, 안전화 상시 착용';
      legalArticle = '산업안전보건기준에 관한 규칙 제172조(접촉의 방지) 및 제179조(전조등 및 후미등의 설치)';
      slogan = '보행자는 멈추고, 장비는 서행! 눈 맞춤 신호로 충돌 사고 제로!';
      break;

    case '감전':
      engineeringMeasure = '누전차단기(작동감도 30mA 이하, 0.03초 이내) 정상 작동 점검 및 접지선(제3종 접지) 연결 확인';
      adminMeasure = '임시 가설전선 피복 손상 점검 및 우천/다습 환경 노출 시 작업 즉각 중지';
      ppeMeasure = '절연장갑, 절연장화 등 전기용 개인보호구 착용 후 작업 투입';
      legalArticle = '산업안전보건기준에 관한 규칙 제302조(전기 기계·기구의 접지) 및 제304조(누전차단기의 설치)';
      slogan = '전기는 보이지 않는 흉기! 접지와 차단기 점검이 생명을 지킨다!';
      break;

    case '화재/폭발':
      engineeringMeasure = '인화성 증기 체류 방지용 방폭형 국소배기장치 가동 및 정전기 방지 본딩 접지 설비';
      adminMeasure = '화기 작업 구역 반경 11m 이내 가연물 제거, 화재감시자 1인 필수 배치 및 화기작업허가서 발행';
      ppeMeasure = '방폭 안전모, 내화 작업복, 유기화합물용 방독마스크 착용';
      legalArticle = '산업안전보건기준에 관한 규칙 제232조(폭발 또는 화재 등의 예방) 및 제241조의2(화재감시자)';
      slogan = '용접 불티 하나가 전소 참사 부른다! 불티 비산방지포와 소화기 배치는 필수!';
      break;

    case '근골격계/질식':
      engineeringMeasure = '밀폐공간 3대 가스(산소, 일산화탄소, 황화수소) 복합 가스측정기 비치 및 강제 환기팬 설치';
      adminMeasure = '작업 전, 작업 중 실시간 산소농도(18%~23.5%) 측정 및 출입 인원 명부 기록';
      ppeMeasure = '송기마스크 또는 공기호흡기 비치 및 3각대 안전그네 착용';
      legalArticle = '산업안전보건기준에 관한 규칙 제619조의2(산소 및 유해가스 농도의 측정)';
      slogan = '밀폐공간 들어가기 전 3대 원칙: 환기! 가스측정! 보호구 착용!';
      break;
  }

  const newHazard: HazardItem = {
    id: newId,
    processName: taskDescription || `${workplace.companyName} 현장 작업 공정`,
    hazardType,
    hazardDescription: `[작업 현장 AI 진단] ${taskDescription} 수행 중 작업자 부주의 또는 안전설비 미비로 인한 ${hazardType} 중대재해 발생 위험.`,
    currentRiskLevel: 'HIGH',
    legalBasis: legalArticle,
    reductionMeasures: {
      engineering: engineeringMeasure,
      administrative: adminMeasure,
      ppe: ppeMeasure
    },
    afterRiskLevel: 'LOW',
    actionOwner: `${workplace.ceoName} 대표 / 현장 관리감독자`,
    completionDate: dateStr,
    status: 'IN_PROGRESS'
  };

  const newTbm: TbmMeeting = {
    id: `TBM-${dateStr.replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
    date: `${dateStr} ${timeStr}`,
    workplaceId: workplace.id,
    jobName: `${taskDescription} 및 안전수칙 준수 작업`,
    leaderName: `${workplace.ceoName} 대표`,
    attendees: [
      { name: workplace.ceoName, role: '안전보건총괄책임자', signatureRecorded: true, signedAt: timeStr },
      { name: '작업조장', role: '현장관리감독자', signatureRecorded: true, signedAt: timeStr },
      { name: '작업원 A', role: '작업실무자', signatureRecorded: true, signedAt: timeStr },
      { name: '작업원 B', role: '작업실무자', signatureRecorded: true, signedAt: timeStr }
    ],
    keyHazardPoints: [
      `${hazardType} 사고 예방을 위한 핵심 방호 조치 실시간 점검`,
      engineeringMeasure,
      adminMeasure
    ],
    safetySlogan: slogan,
    weatherNotice: '작업 전 스트레칭 및 개인보호구 밀착 착용 상태 점검 완료',
    protectiveEquipmentChecked: true
  };

  return {
    hazards: [newHazard, ...workplace.hazards],
    tbmMeeting: newTbm,
    overallRiskLevel: 'HIGH',
    safetySummary: `고용노동부 고시 제2023-19호(사업장 위험성평가에 관한 지침)에 의거하여, ${hazardType} 위험요인을 추출하고 3단계 위험성 감소 대책을 수립하였습니다.`
  };
}
