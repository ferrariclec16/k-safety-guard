import { WorkplaceProfile } from './types';

export const INITIAL_WORKPLACES: WorkplaceProfile[] = [
  {
    id: 'WP-MFG-01',
    companyName: '(주)삼우정밀기계',
    ceoName: '박준형',
    businessNumber: '128-86-49201',
    sector: 'MANUFACTURING',
    employeeCount: 28,
    location: '경기도 화성시 양감면 초록로 142',
    safetyRiskIndex: 78,
    lastAssessmentDate: '2026-09-24',
    openViolationsCount: 3,
    hazards: [
      {
        id: 'HAZ-001',
        processName: '150톤 기계식 프레스 금형 교체 및 타발 공정',
        hazardType: '끼임',
        hazardDescription: '프레스 금형 세팅 시 양손조작식 방호장치 해제 상태에서 풋스위치 오조작에 의한 신체 일부 협착 위험',
        currentRiskLevel: 'HIGH',
        legalBasis: '산업안전보건기준에 관한 규칙 제88조(기계식 프레스 등의 방호장치)',
        reductionMeasures: {
          engineering: '광전자식 방호장치(센서) 신규 증설 및 풋스위치 안전덮개 볼트 고정',
          administrative: '금형 교체 전원차단(LOTO) 작업 표준서 부착 및 2인 1조 작업 원칙',
          ppe: '방진장갑, 보안경, 안전화 상시 착용 의무화'
        },
        afterRiskLevel: 'LOW',
        actionOwner: '김태호 공장장',
        completionDate: '2026-10-05',
        status: 'IN_PROGRESS'
      },
      {
        id: 'HAZ-002',
        processName: '원자재 적재장 3톤 디젤 지게차 상하차 운반',
        hazardType: '충돌',
        hazardDescription: '팔레트 적재물 과다 거치로 전방 시야 미확보 상태 주행 중 코너 보행 작업자와 충돌',
        currentRiskLevel: 'HIGH',
        legalBasis: '산업안전보건기준에 관한 규칙 제179조(전조등 및 후미등의 설치)',
        reductionMeasures: {
          engineering: '지게차 후방 AI 인체감지 카메라 및 블루스팟 경고빔 설치',
          administrative: '보행자 전용 통로 노란색 실선 구획 및 지게차 최고속도(10km/h) 제한선 표기',
          ppe: '고휘도 안전조끼(반사조끼), 안전모 착용'
        },
        afterRiskLevel: 'LOW',
        actionOwner: '이종원 반장',
        completionDate: '2026-10-02',
        status: 'COMPLETED'
      },
      {
        id: 'HAZ-003',
        processName: '정밀 선반 부품 절삭유 세척 작업',
        hazardType: '화재/폭발',
        hazardDescription: '인화성 세척제(TC 대체제) 증기 체류 구역 인근에서 그라인더 불티 비산으로 인한 폭발 화재',
        currentRiskLevel: 'MEDIUM',
        legalBasis: '산업안전보건기준에 관한 규칙 제232조(폭발 또는 화재의 예방)',
        reductionMeasures: {
          engineering: '세척 작업대 국소배기장치 풍속 보강 및 방폭형 환풍팬 교체',
          administrative: '세척 구역 반경 10m 이내 화기 사용 절대 금지 표지 부착',
          ppe: '유기화합물용 방독마스크, 내화학 안전장갑 착용'
        },
        afterRiskLevel: 'LOW',
        actionOwner: '박준형 대표',
        completionDate: '2026-10-10',
        status: 'PENDING'
      }
    ],
    tbmMeetings: [
      {
        id: 'TBM-20260929-01',
        date: '2026-09-29 08:10',
        workplaceId: 'WP-MFG-01',
        jobName: '오전 주간 1라인 금형 세팅 및 프레스 연속 가공',
        leaderName: '김태호 공장장',
        attendees: [
          { name: '김태호', role: '작업지휘자', signatureRecorded: true, signedAt: '08:12' },
          { name: '최진우', role: '프레스 오퍼레이터', signatureRecorded: true, signedAt: '08:13' },
          { name: '팜반민', role: '원자재 공급', signatureRecorded: true, signedAt: '08:14' },
          { name: '이현수', role: '검사반원', signatureRecorded: true, signedAt: '08:15' }
        ],
        keyHazardPoints: [
          '프레스 방호장치(광전자식 센서) 정상 점등 여부 육안 확인 전 작업 착수 절대 금지',
          '지게차 통로 보행 시 반드시 스마트폰 사용 금지 및 좌우 확인 후 횡단'
        ],
        safetySlogan: '손 끼임 제로! 안전장치 점검이 내 손가락을 지킨다!',
        weatherNotice: '환절기 기온 저하로 인한 관절 경직 유의 (작업 전 5분 스트레칭 완료)',
        protectiveEquipmentChecked: true
      }
    ],
    complianceItems: [
      {
        id: 'COMP-01',
        category: '안전보건 관리체계',
        legalArticle: '중대재해처벌법 시행령 제4조 제1호',
        requirement: '사업장 안전보건 경영방침 및 목표 수립·게시',
        currentStatus: 'COMPLIANT',
        recommendation: '정문 로비 및 공장 게시판에 2026년도 무재해 목표 공표 완료됨.',
        moelFineRisk: '미수립 시 시정명령 및 1차 과태료 500만 원'
      },
      {
        id: 'COMP-02',
        category: '위험성평가',
        legalArticle: '산업안전보건법 제36조 & 중처법 제4조 제3호',
        requirement: '연 1회 정기 위험성평가 및 수시평가 실시 (근로자 참여 필수)',
        currentStatus: 'WARNING',
        recommendation: '지난 정기평가 이후 신규 도입된 150톤 프레스 설비에 대한 수시평가 서류 미작성 상태.',
        moelFineRisk: '미실시 또는 허위 작성 시 사고 발생 시 대표이사 형사 기소(징역 1년 이상)'
      },
      {
        id: 'COMP-03',
        category: 'TBM 안전점검',
        legalArticle: '고용노동부 중대재해 감축 로드맵 의무 이행사항',
        requirement: '작업 전 10분 안전점검회의(TBM) 일지 작성 및 참석자 서명 관리',
        currentStatus: 'COMPLIANT',
        recommendation: '모바일 디지털 서명으로 매일 보관 중이며 3년간 의무 보존 요건 충족.',
        moelFineRisk: '감독관 불시 점검 시 TBM 증빙 부재 시 실질적 안전체계 결여로 시정명령'
      },
      {
        id: 'COMP-04',
        category: '안전보건 예산',
        legalArticle: '중대재해처벌법 시행령 제4조 제4호',
        requirement: '안전보건 예산 별도 편성 및 보호구·방호장치 실질 집행 내역 증빙',
        currentStatus: 'VIOLATION',
        recommendation: '일반 소모품비와 방호장치 구매비가 합산 회계처리되어 있어 별도 전표 분리 필요.',
        moelFineRisk: '예산 미편성 및 미집행 판정 시 대표이사 직접 과실 입증 사유로 작용'
      }
    ]
  },
  {
    id: 'WP-CONST-02',
    companyName: '(주)한강건설중기',
    ceoName: '윤도현',
    businessNumber: '214-81-77390',
    sector: 'CONSTRUCTION',
    employeeCount: 42,
    location: '인천광역시 서구 청라동 근린생활시설 신축현장',
    safetyRiskIndex: 85,
    lastAssessmentDate: '2026-09-27',
    openViolationsCount: 4,
    hazards: [
      {
        id: 'HAZ-101',
        processName: '지상 3층 외부 시스템비계 해체 및 자재 인양',
        hazardType: '추락',
        hazardDescription: '외부 안전난간 미설치 구간에서 안전대 미체결 상태로 비계 파이프 볼트 해체 중 실족 추락(높이 9.8m)',
        currentRiskLevel: 'HIGH',
        legalBasis: '산업안전보건기준에 관한 규칙 제42조(추락의 방지)',
        reductionMeasures: {
          engineering: '수직 안전대 걸이용 와이어 로프 전 구간 신규 포설 및 안전난간대 선행 해체 금지',
          administrative: '추락위험구역 하부 접근통제선(폴리스라인) 설치 및 신호수 1명 상주',
          ppe: '안전그네형 안전대(2구형 죔줄), 안전모 턱끈 결속 철저'
        },
        afterRiskLevel: 'LOW',
        actionOwner: '장진우 현장소장',
        completionDate: '2026-09-30',
        status: 'IN_PROGRESS'
      }
    ],
    tbmMeetings: [
      {
        id: 'TBM-20260929-02',
        date: '2026-09-29 07:00',
        workplaceId: 'WP-CONST-02',
        jobName: '외부 시스템비계 해체 및 이동식 크레인 양중',
        leaderName: '장진우 소장',
        attendees: [
          { name: '장진우', role: '총괄안전책임자', signatureRecorded: true, signedAt: '07:02' },
          { name: '강철민', role: '비계공 팀장', signatureRecorded: true, signedAt: '07:03' },
          { name: '오세훈', role: '신호수', signatureRecorded: true, signedAt: '07:04' }
        ],
        keyHazardPoints: [
          '비계 해체 시 안전대 걸이구 와이어 체결 전 절대 발판 외측 이동 금지',
          '크레인 붐 선회 반경 내 전 인원 출입 절대 통제'
        ],
        safetySlogan: '안전대 체결은 생명줄이다! 단 1초도 방심하지 말자!',
        weatherNotice: '풍속 8.5m/s (강풍 주의: 크레인 양중 작업 전 풍속 재측정 필수)',
        protectiveEquipmentChecked: true
      }
    ],
    complianceItems: [
      {
        id: 'COMP-11',
        category: '안전보건 관리체계',
        legalArticle: '중대재해처벌법 시행령 제4조 제1호',
        requirement: '수급인(하도급) 안전보건 역량 평가 및 관리비 적정 지급',
        currentStatus: 'COMPLIANT',
        recommendation: '협력업체 3개사 대상 위험성평가 적격성 심사표 완료.',
        moelFineRisk: '미평가 시 원청 책임 부과'
      }
    ]
  },
  {
    id: 'WP-LOG-03',
    companyName: '(주)로지스넥스트 물류센터',
    ceoName: '정우진',
    businessNumber: '119-87-00921',
    sector: 'LOGISTICS',
    employeeCount: 35,
    location: '경기도 이천시 마장면 덕평로 552',
    safetyRiskIndex: 62,
    lastAssessmentDate: '2026-09-28',
    openViolationsCount: 1,
    hazards: [
      {
        id: 'HAZ-201',
        processName: '메자닌 2층 롤테이너 이송 및 화물용 리프트 상하강',
        hazardType: '끼임',
        hazardDescription: '화물용 리프트 문이 닫히는 과정에서 롤테이너 발바퀴 끼임 수동 조작 중 신체 협착 위험',
        currentRiskLevel: 'MEDIUM',
        legalBasis: '산업안전보건기준에 관한 규칙 제87조(원동기·회전축 등의 위험 방지)',
        reductionMeasures: {
          engineering: '리프트 출입문 인터록 센서 감도 상향 조정 및 이상 시 자동 멈춤 장치 설치',
          administrative: '리프트 문 수동 강제 조작 금지 및 이상 시 비상정지버튼 누름 훈련',
          ppe: '안전화, 작업용 장갑'
        },
        afterRiskLevel: 'LOW',
        actionOwner: '송민호 센터장',
        completionDate: '2026-10-04',
        status: 'PENDING'
      }
    ],
    tbmMeetings: [],
    complianceItems: []
  }
];
