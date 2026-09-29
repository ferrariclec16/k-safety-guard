import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "K-SafetyGuard AI | 50인 미만 중대재해처벌법 대응 위험성평가 SaaS",
  description: "고용노동부 KRAS 3단계 표준 위험성평가, TBM 전자일지 및 근로감독관 제출용 보고서 자동 생성 AI 솔루션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-100/70">{children}</body>
    </html>
  );
}
