import React from 'react';
import { ArrowRight, Route, CheckCircle2, Database, TrendingUp, ClipboardList, PenTool } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';
import Bi from './Bi';

export default function CareerJourney() {
  const { language, t: fullT } = useLanguage();
  const isVi = language === 'vi';
  const t = fullT?.journey;

  const icons = [Database, TrendingUp, ClipboardList, PenTool];
  const viItems = translations.vi.journey.items;
  const enItems = translations.en.journey.items;
  const milestones = viItems.map((vi, i) => {
    const en = enItems[i];
    return {
      Icon: icons[i],
      year: <Bi vi={vi.yearBadge} en={en.yearBadge} />,
      stage: <Bi vi={vi.stage} en={en.stage} />,
      company: vi.company.replace(' Corporation',''),
      role: <Bi vi={vi.role} en={en.role} />,
      period: <Bi vi={vi.period} en={en.period} />,
      description: <Bi vi={vi.description} en={en.description} />,
      isCurrent: vi.isCurrent,
    };
  });

  return (
    <section id="journey" className="py-16 sm:py-20 md:py-24 lg:py-24 relative bg-white border-b border-[#D9E2EC]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        {/* Header: Title + Subtitle + Action Button */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end pb-8 sm:pb-12 border-b border-[#D9E2EC]/80">
          <div className="lg:col-span-8 space-y-3 sm:space-y-4 text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full typo-eyebrow bg-[#FFF2E6] text-[#FF7A00] border border-[#FFD4B2]">
              <Route className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
              <span><Bi vi="HÀNH TRÌNH NGHỀ NGHIỆP" en="CAREER PROGRESSION" /></span>
            </span>

            <h2 className="typo-h2 text-[#102A43]">
              <Bi vi="Từ nền tảng vững chắc đến" en="From Strong Foundation to" />{' '}
              <span className="text-[#FF7A00] block">
                <Bi vi="những sản phẩm có giá trị" en="High-Value Products" />
              </span>
            </h2>

            <p className="typo-lead text-[#627D98] max-w-[62ch]">
              <Bi vi="Hành trình của tôi là quá trình liên tục học hỏi, trải nghiệm và tạo ra những sản phẩm tốt hơn, đóng góp vào sự phát triển của đội ngũ và doanh nghiệp." en="My journey is a continuous evolution from data and business logic into intuitive user experiences that empower teams and users." />
            </p>
          </div>

          <div className="lg:col-span-4 text-left lg:text-right">
            <a
              href="/cv/Nguyen_Xuan_Hau_CV_UIUX_Designer.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-[#0E2A47] typo-button border-2 border-[#0E2A47] hover:border-[#163E63] shadow-xs transition-all duration-200 cursor-pointer"
            >
              <span><Bi vi="Xem full CV" en="View Full CV" /></span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </a>
          </div>
        </div>

        {/* Career cards */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-left">
          {milestones.map((m, idx) => {
            const Icon = m.Icon;
            return (
              <div
                key={idx}
                className={`group p-5 sm:p-6 rounded-3xl flex flex-col transition-all duration-300 ${
                  m.isCurrent
                    ? 'bg-gradient-to-b from-[#FFFDF9] to-white border-2 border-[#FF7A00] shadow-lg shadow-orange-500/10'
                    : 'bg-white border border-[#D9E2EC] hover:border-[#0E2A47]/40 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${m.isCurrent ? 'bg-[#FF7A00] text-white border-[#FF7A00]' : 'bg-[#FFF2E6] text-[#FF7A00] border-[#FFD4B2]'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`tabular-nums text-[13px] font-bold px-3 py-1 rounded-full whitespace-nowrap ${m.isCurrent ? 'bg-[#FF7A00] text-white' : 'bg-slate-100 text-[#486581]'}`}>
                    {m.year}
                  </span>
                </div>

                <div className="mt-5 typo-eyebrow !text-[12px] !tracking-[0.06em] text-[#FF7A00] min-h-[36px]">{m.stage}</div>
                <h3 className="text-[22px] leading-[30px] font-bold text-[#102A43] mt-1">{m.company}</h3>
                <p className="text-[16px] leading-[24px] font-semibold text-[#0E2A47] mt-1 min-h-[48px]">{m.role}</p>
                <p className="typo-caption text-[#829AB1] mt-1 tabular-nums">{m.period}</p>
                <p className="typo-small text-[#627D98] mt-3">{m.description}</p>

                {m.isCurrent && (
                  <div className="mt-auto pt-4">
                    <div className="pt-3 border-t border-[#FFD4B2]/70 flex items-center gap-2 text-[14px] font-bold text-[#FF7A00]">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>{t?.currentRoleTag ? <Bi vi={translations.vi.journey.currentRoleTag} en={translations.en.journey.currentRoleTag} /> : null}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
