import React from 'react';
import {
  Sparkles,
  X,
  ChevronRight,
  ChevronDown,
  Star,
  MapPin,
  CalendarClock,
  Filter,
  CheckCircle2,
  Send,
  Maximize2,
  Clock,
  Navigation,
  Scissors,
  Scale,
  Briefcase,
  GraduationCap,
  Heart,
  ExternalLink,
} from 'lucide-react';
import { WhatsAppIcon, InstagramIcon, CalendarIcon } from '../icons/BrandIcons';
import { SimulatorImage } from '../SimulatorImage';
import { INITIAL_DATA } from '../../constants/initialData';
import { getSafeContrastText, getLuminance, formatWhatsAppPhone } from '../../utils/formatters';
import { resolveCreatorFooterInfo } from '../../utils/exportEngine';

export interface BookingFormState {
  name: string;
  service: string;
  date: string;
  time: string;
}

export interface SimulatorChassisProps {
  data: typeof INITIAL_DATA;
  theme: any;
  selectedThemeCategory: string;
  isSimulatorLoading: boolean;
  currentFilter: string;
  photoOrientations?: Record<string, { orientation: 'portrait' | 'landscape' | 'square'; ratio: number }>;
  bookingModalOpen: boolean;
  setBookingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  quizModalOpen: boolean;
  setQuizModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  quizStep: number;
  setQuizStep: React.Dispatch<React.SetStateAction<number>>;
  quizAnswers: Record<string, string>;
  handleQuizAnswer: (questionId: string, answer: string) => void;
  buildWhatsAppLink: () => string;
  buildQuizWhatsAppLink: () => string;
  recordWhatsappClick: () => void;
  beforeAfterSlider: number;
  setBeforeAfterSlider: React.Dispatch<React.SetStateAction<number>>;
  activeFaqId: string | null;
  setActiveFaqId: React.Dispatch<React.SetStateAction<string | null>>;
  bookingForm: BookingFormState;
  setBookingForm: React.Dispatch<React.SetStateAction<BookingFormState>>;
  setLightboxIndex: (index: number) => void;
}

export function SimulatorChassis({
  data,
  theme,
  selectedThemeCategory,
  isSimulatorLoading,
  currentFilter,
  photoOrientations = {},
  bookingModalOpen,
  setBookingModalOpen,
  quizModalOpen,
  setQuizModalOpen,
  quizStep,
  setQuizStep,
  quizAnswers,
  handleQuizAnswer,
  buildWhatsAppLink,
  buildQuizWhatsAppLink,
  recordWhatsappClick,
  beforeAfterSlider,
  setBeforeAfterSlider,
  activeFaqId,
  setActiveFaqId,
  bookingForm,
  setBookingForm,
  setLightboxIndex,
}: SimulatorChassisProps) {
  return (
    <div className="relative w-full max-w-[385px] h-[780px] max-h-[85vh] sm:max-h-[90vh] bg-black rounded-[38px] sm:rounded-[52px] p-2 sm:p-3 shadow-2xl shadow-black border-4 border-neutral-800 flex flex-col z-10 shrink-0 mx-auto">
          {/* Dynamic Island */}
          <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-4 sm:h-5 bg-neutral-950 rounded-full z-40 flex items-center justify-end px-3 pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800 inline-block" />
          </div>

          {/* Screen Content Viewport (.wrapper alignment) */}
          <div
            key={`${data.theme}-${selectedThemeCategory}`}
            className="wrapper w-full max-w-full h-full rounded-[30px] sm:rounded-[42px] overflow-y-auto overflow-x-hidden relative transition-colors duration-500 no-scrollbar select-none anim-theme-fade flex flex-col"
            style={{
              backgroundColor: theme.bg,
              color: theme.textMain,
              fontFamily: `'${data.styling.fontFamily}', sans-serif`,
              justifyContent: data.styling.wrapperAlignment || 'flex-start',
              boxShadow:
                '0 32px 64px -12px rgba(0, 0, 0, 0.92), 0 18px 36px -6px rgba(0, 0, 0, 0.75), 0 0 40px -5px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.12), inset 0 2px 6px rgba(0, 0, 0, 0.65)',
            }}
          >
            {/* LUXURY SKELETON LOADING OVERLAY (Prevents flash of content on theme/kit transitions) */}
            <div
              aria-hidden={!isSimulatorLoading}
              className={`absolute inset-0 z-50 flex flex-col transition-all duration-300 ease-out ${
                isSimulatorLoading
                  ? 'opacity-100 pointer-events-auto backdrop-blur-md'
                  : 'opacity-0 pointer-events-none'
              }`}
              style={
                {
                  backgroundColor: theme.bg,
                  '--skel-shimmer': `${theme.accent}35`,
                } as React.CSSProperties
              }
            >
              {/* Skeleton Hero Header */}
              <div
                className="relative w-full skeleton-shimmer shrink-0 flex flex-col justify-end p-5 space-y-2.5"
                style={{
                  height: `${data.styling.photoHeight || 380}px`,
                  backgroundColor: 'rgba(128, 128, 128, 0.12)',
                  borderBottom: `1px solid ${theme.socialBorder}`,
                }}
              >
                <div
                  className="h-2.5 w-28 rounded-full skeleton-shimmer"
                  style={{ backgroundColor: `${theme.accent}40` }}
                />
                <div
                  className="h-6 w-52 rounded-lg skeleton-shimmer"
                  style={{ backgroundColor: 'rgba(128, 128, 128, 0.28)' }}
                />
                <div
                  className="h-3 w-64 rounded-md skeleton-shimmer"
                  style={{ backgroundColor: 'rgba(128, 128, 128, 0.18)' }}
                />
              </div>

              {/* Skeleton Social Icons Row */}
              <div className="flex items-center justify-center gap-3 px-5 py-3 shrink-0">
                <div className="w-10 h-10 rounded-2xl skeleton-shimmer" style={{ backgroundColor: theme.socialBg, border: `1px solid ${theme.socialBorder}` }} />
                <div className="w-10 h-10 rounded-2xl skeleton-shimmer" style={{ backgroundColor: theme.socialBg, border: `1px solid ${theme.socialBorder}` }} />
                <div className="w-10 h-10 rounded-2xl skeleton-shimmer" style={{ backgroundColor: theme.socialBg, border: `1px solid ${theme.socialBorder}` }} />
              </div>

              {/* Skeleton Action CTA Cards */}
              <div className="px-5 space-y-3 py-2 shrink-0">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="w-full h-20 p-3.5 flex items-center justify-between skeleton-shimmer"
                    style={{
                      borderRadius: `${data.styling.borderRadius}px`,
                      backgroundColor: 'rgba(128, 128, 128, 0.14)',
                      border: `1px solid ${theme.socialBorder}`,
                    }}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-10 h-10 rounded-full shrink-0"
                        style={{ backgroundColor: `${theme.accent}30` }}
                      />
                      <div className="space-y-2 flex-1 pr-4">
                        <div className="h-3 w-3/4 rounded" style={{ backgroundColor: 'rgba(128, 128, 128, 0.28)' }} />
                        <div className="h-2.5 w-1/2 rounded" style={{ backgroundColor: 'rgba(128, 128, 128, 0.18)' }} />
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full shrink-0" style={{ backgroundColor: 'rgba(128, 128, 128, 0.2)' }} />
                  </div>
                ))}
              </div>

              {/* Skeleton Gallery & Cards Preview */}
              <div className="px-5 py-3 space-y-2.5 shrink-0">
                <div className="h-3 w-36 rounded skeleton-shimmer" style={{ backgroundColor: `${theme.accent}35` }} />
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((g) => (
                    <div
                      key={g}
                      className="aspect-square rounded-xl skeleton-shimmer"
                      style={{
                        backgroundColor: 'rgba(128, 128, 128, 0.14)',
                        border: `1px solid ${theme.socialBorder}`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Spotlight Glow */}
            {data.styling.spotlightGlow && (
              <div
                className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none z-0"
                style={{
                  background: `radial-gradient(circle, ${theme.glowColor} 0%, rgba(0,0,0,0) 70%)`,
                }}
              />
            )}

            {/* Announcement Urgency Bar */}
            {data.announcement.enabled && (
              <div
                className="relative z-20 pt-7 pb-2 px-3 text-center text-[10px] font-bold tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shrink-0"
                style={{
                  backgroundColor: data.moduleColors?.announcement?.bgColor || theme.accent,
                  color:
                    data.moduleColors?.announcement?.titleColor ||
                    data.moduleColors?.announcement?.textColor ||
                    getSafeContrastText(data.moduleColors?.announcement?.bgColor || theme.accent, '#0a0a0c', '#ffffff'),
                }}
                onClick={() => setBookingModalOpen(true)}
              >
                <span>{data.announcement.badge}:</span>
                <span className="font-medium underline">{data.announcement.text}</span>
              </div>
            )}

            {/* HERO SECTION */}
            <div
              className="relative w-full overflow-hidden shrink-0 bg-neutral-950"
              style={{
                height: `${data.styling.photoHeight || 380}px`,
                minHeight: `${data.styling.photoHeight || 380}px`,
              }}
            >
              {data.profile.avatarUrl ? (
                <SimulatorImage
                  src={data.profile.avatarUrl}
                  alt={data.profile.name || 'Foto de Capa'}
                  referrerPolicy={data.profile.avatarUrl.startsWith('http') ? 'no-referrer' : undefined}
                  accentColor={theme.accent}
                  targetWidth={1080}
                  className="w-full h-full object-cover block transition-all duration-300"
                  style={{
                    transform: `scale(${(data.styling.photoScale || 100) / 100})`,
                    objectPosition: `center ${data.styling.photoPosY ?? 20}%`,
                    filter: currentFilter,
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">
                  Sem imagem de capa
                </div>
              )}

              <div
                className="absolute inset-0 flex flex-col justify-end p-5 z-10 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.25) 35%, ${theme.bg} ${data.styling.vignetteIntensity ?? 85}%)`,
                }}
              >
                <span
                  className="text-[10px] uppercase font-bold tracking-[2.5px]"
                  style={{ color: data.moduleColors?.hero?.headlineColor || theme.accent }}
                >
                  {data.profile.title}
                </span>
                <h2
                  className="text-2xl font-bold tracking-wide leading-tight mt-1"
                  style={{
                    fontFamily: `'${data.styling.fontFamily}', serif`,
                    color: data.moduleColors?.hero?.titleColor || theme.textMain,
                  }}
                >
                  {data.profile.name}
                </h2>
                <p
                  className="text-[11.5px] sm:text-xs mt-1.5 line-clamp-3 leading-snug"
                  style={{
                    color: data.moduleColors?.hero?.textColor || theme.textMuted,
                    textWrap: 'balance',
                  }}
                >
                  {data.profile.tagline}
                </p>
              </div>
            </div>

            {/* QUICK SOCIAL BAR */}
            <div className="flex items-center justify-center gap-3 px-5 py-2 relative z-10 shrink-0">
              <div className="flex-1 h-px bg-neutral-800/30" />
              <div className="flex gap-2">
                {data.profile.whatsapp && (
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-2xl flex items-center justify-center transition hover:scale-105 shadow"
                    style={{
                      background: theme.socialBg,
                      border: `1px solid ${theme.socialBorder}`,
                      color: theme.socialText,
                    }}
                    title="Falar no WhatsApp"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </a>
                )}
                {data.profile.instagram && (
                  <a
                    href={`https://instagram.com/${data.profile.instagram}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-2xl flex items-center justify-center transition hover:scale-105 shadow"
                    style={{
                      background: theme.socialBg,
                      border: `1px solid ${theme.socialBorder}`,
                      color: theme.socialText,
                    }}
                    title="Instagram"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="w-10 h-10 rounded-2xl flex items-center justify-center transition hover:scale-105 cursor-pointer shadow"
                  style={{
                    background: theme.socialBg,
                    border: `1px solid ${theme.socialBorder}`,
                    color: theme.socialText,
                  }}
                  title="Abrir Agenda de Atendimentos"
                >
                  <CalendarIcon className="w-5 h-5 text-current" />
                </button>
              </div>
              <div className="flex-1 h-px bg-neutral-800/30" />
            </div>

            {/* BANNER DE TIMER REGRESSIVO DE ESCASSEZ (SE HABILITADO NO MÓDULO DE ALTA CONVERSÃO) */}
            {data.highConversion?.enabled && data.highConversion?.urgencyTimer?.enabled && (
              <div
                className="mx-5 my-2 p-3 rounded-2xl border text-center space-y-1 relative z-10 shadow-lg"
                style={{
                  backgroundColor: data.moduleColors?.urgencyTimer?.bgColor || 'rgba(245, 158, 11, 0.15)',
                  borderColor: `${data.moduleColors?.urgencyTimer?.accentColor || theme.accent}66`,
                }}
              >
                <div
                  className="text-[10px] font-black tracking-wider uppercase flex items-center justify-center gap-1"
                  style={{
                    color:
                      data.moduleColors?.urgencyTimer?.headlineColor ||
                      data.moduleColors?.urgencyTimer?.titleColor ||
                      theme.accent,
                  }}
                >
                  <CalendarClock className="w-3.5 h-3.5 animate-pulse" />
                  <span>{data.highConversion.urgencyTimer.headline}</span>
                </div>
                <p
                  className="text-[9.5px]"
                  style={{ color: data.moduleColors?.urgencyTimer?.textColor || theme.textMuted }}
                >
                  {data.highConversion.urgencyTimer.subheadline}
                </p>
                <div
                  className="text-sm font-black font-mono pt-0.5 tracking-widest"
                  style={{
                    color:
                      data.moduleColors?.urgencyTimer?.accentColor ||
                      data.moduleColors?.urgencyTimer?.titleColor ||
                      theme.accent,
                  }}
                >
                  14:52{' '}
                  <span
                    className="text-[9px] font-sans font-normal opacity-80"
                    style={{ color: data.moduleColors?.urgencyTimer?.textColor || theme.textMuted }}
                  >
                    (Restante)
                  </span>
                </div>
              </div>
            )}

            {/* CURSIVE BANNER */}
            {data.profile.cursivePhrase && (
              <div
                className="text-center px-4 py-2 text-2xl italic tracking-wide"
                style={{
                  fontFamily: `'${theme.fontScript}', cursive, serif`,
                  color: data.moduleColors?.hero?.accentColor || data.moduleColors?.hero?.textColor || theme.textMuted,
                }}
              >
                {data.profile.cursivePhrase}
              </div>
            )}

            {/* ACTION PILL CARDS */}
            <div className="px-5 space-y-3 pb-3 relative z-10">
              {/* BOTÃO ESPECIAL DE TRIAGEM / QUALIFICADOR */}
              {data.qualifierFunnel.enabled && (
                <button
                  type="button"
                  onClick={() => {
                    setQuizStep(0);
                    setQuizModalOpen(true);
                  }}
                  className={`w-full flex items-center justify-between p-3.5 transition-all duration-300 ease-out transform hover:scale-105 active:scale-[0.98] cursor-pointer group text-left relative overflow-hidden ${
                    data.qualifierFunnel.animation && data.qualifierFunnel.animation !== 'none'
                      ? `anim-${data.qualifierFunnel.animation}`
                      : ''
                  }`}
                  style={{
                    borderRadius: `${data.styling.borderRadius}px`,
                    background:
                      data.moduleColors?.qualifierFunnel?.bgColor ||
                      `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}dd 100%)`,
                    color: data.moduleColors?.qualifierFunnel?.titleColor || getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff'),
                    boxShadow: '0 10px 25px -4px rgba(0,0,0,0.5)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full bg-black/15 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{ color: data.moduleColors?.qualifierFunnel?.titleColor || getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff') }}
                    >
                      <Filter className="w-5 h-5" />
                    </div>
                    <div>
                      <div
                        className="text-[11px] font-black tracking-[1.5px] uppercase"
                        style={{ color: data.moduleColors?.qualifierFunnel?.titleColor || getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff') }}
                      >
                        {data.qualifierFunnel.triggerButtonLabel}
                      </div>
                      <div
                        className="text-[9.5px] line-clamp-1 mt-0.5"
                        style={{ color: data.moduleColors?.qualifierFunnel?.textColor || (getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff') === '#ffffff' ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.8)') }}
                      >
                        {data.qualifierFunnel.triggerButtonSubtitle}
                      </div>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                    <ChevronRight
                      className="w-4 h-4"
                      style={{ color: data.moduleColors?.qualifierFunnel?.titleColor || getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff') }}
                    />
                  </div>
                </button>
              )}

              {data.actionCards.map((card) => {
                const isBooking = card.linkType === 'booking' || card.url === '#booking';
                const isQuiz = card.linkType === 'quiz' || card.url === '#quiz';
                const isCatalogo = card.linkType === 'catalogo' || card.url === '#catalogo';
                const resolvedHref =
                  card.linkType === 'whatsapp'
                    ? `https://wa.me/${formatWhatsAppPhone(data.profile.whatsapp)}?text=${encodeURIComponent(card.whatsappMessage || 'Olá!')}`
                    : isCatalogo
                    ? '#catalogo'
                    : card.url;

                const animClass =
                  card.animation && card.animation !== 'none' ? `anim-${card.animation}` : '';

                const modBtnColors = data.moduleColors?.actionCards || {};
                let cardBgStyle = modBtnColors.bgColor || theme.cardBg;
                let cardTextStyle = modBtnColors.titleColor || theme.cardText;
                let cardSubtextStyle = modBtnColors.textColor || theme.cardSubtext;
                let cardBorderStyle = data.styling.metallicBorders ? `1px solid ${theme.cardBorder}` : 'none';
                let iconBgStyle = theme.iconBg;
                let iconColorStyle = modBtnColors.accentColor || theme.iconColor;

                if (card.variant === 'accent') {
                  cardBgStyle = modBtnColors.bgColor || `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}dd 100%)`;
                  const safeAccentText = getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff');
                  cardTextStyle = modBtnColors.titleColor || safeAccentText;
                  cardSubtextStyle = modBtnColors.textColor || (safeAccentText === '#ffffff' ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)');
                  cardBorderStyle = `1px solid ${theme.accent}`;
                  iconBgStyle = safeAccentText === '#ffffff' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.14)';
                  iconColorStyle = modBtnColors.titleColor || safeAccentText;
                } else if (card.variant === 'outline') {
                  cardBgStyle = modBtnColors.bgColor || 'rgba(255,255,255,0.04)';
                  cardTextStyle = modBtnColors.titleColor || theme.textMain;
                  cardSubtextStyle = modBtnColors.textColor || theme.textMuted;
                  cardBorderStyle = `1.5px solid ${theme.accent}`;
                  iconBgStyle = theme.socialBg;
                  iconColorStyle = theme.accent;
                } else if (card.variant === 'custom') {
                  cardBgStyle = card.customBg || modBtnColors.bgColor || theme.cardBg;
                  cardTextStyle = card.customText || modBtnColors.titleColor || theme.cardText;
                  cardSubtextStyle = (card.customText || modBtnColors.textColor || theme.cardText) + 'cc';
                  iconBgStyle = 'rgba(0,0,0,0.15)';
                  iconColorStyle = card.customText || modBtnColors.titleColor || theme.cardText;
                }

                if (card.customTitleColor) {
                  cardTextStyle = card.customTitleColor;
                  iconColorStyle = card.customTitleColor;
                }
                if (card.customSubtitleColor) {
                  cardSubtextStyle = card.customSubtitleColor;
                }

                const hasSideImage =
                  card.imagePosition &&
                  card.imagePosition !== 'none' &&
                  Boolean(card.cardImage);
                const isImageLeft = card.imagePosition === 'left';
                const isPopout = (card.imageFitStyle || 'popout') === 'popout';
                const imgSize = card.imageSize || 92;

                const isGradientOrImage = (val?: string) =>
                  Boolean(val && (val.includes('gradient') || val.includes('url')));

                const cardBackgroundImage = card.bgImage
                  ? `linear-gradient(90deg, rgba(10,10,12,0.82) 0%, rgba(10,10,12,0.55) 100%), url(${card.bgImage})`
                  : isGradientOrImage(cardBgStyle)
                  ? cardBgStyle
                  : undefined;

                const cardBackgroundColor = !card.bgImage && !isGradientOrImage(cardBgStyle)
                  ? cardBgStyle
                  : undefined;

                if (hasSideImage) {
                  return (
                    <a
                      key={card.id}
                      href={isBooking || isQuiz ? undefined : resolvedHref}
                      target={
                        !isBooking && !isQuiz && !isCatalogo && card.openInNewTab !== false
                          ? '_blank'
                          : undefined
                      }
                      rel="noreferrer"
                      onClick={(e) => {
                        recordWhatsappClick();
                        if (isBooking) {
                          e.preventDefault();
                          setBookingModalOpen(true);
                        } else if (isQuiz) {
                          e.preventDefault();
                          setQuizStep(0);
                          setQuizModalOpen(true);
                        }
                      }}
                      className={`cta-card w-full flex items-center justify-between ${
                        isImageLeft ? 'flex-row-reverse' : 'flex-row'
                      } px-4 py-3.5 transition-all duration-300 ease-out transform hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer group relative ${
                        isPopout ? 'overflow-visible mt-4' : 'overflow-hidden'
                      } ${animClass}`}
                      style={{
                        borderRadius: `${data.styling.borderRadius}px`,
                        backgroundImage: cardBackgroundImage,
                        backgroundColor: cardBackgroundColor,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        color: card.bgImage ? '#ffffff' : cardTextStyle,
                        border: 'none',
                        boxShadow: `${theme.pillShadow}, 0 0 14px -3px color-mix(in srgb, ${theme.accent} 32%, transparent)`,
                        minHeight: `${Math.max(88, imgSize - 4)}px`,
                        ['--theme-accent' as string]: theme.accent,
                      }}
                    >
                      {card.badgeText && (
                        <span
                          className={`absolute -top-2.5 ${
                            isImageLeft ? 'right-3' : 'left-3'
                          } px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider shadow-md z-20`}
                          style={{
                            backgroundColor: card.variant === 'accent' ? (getLuminance(theme.accent) > 0.4 ? '#0a0a0c' : '#ffffff') : theme.accent,
                            color: card.variant === 'accent' ? (getLuminance(theme.accent) > 0.4 ? theme.accent : '#0a0a0c') : getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff'),
                          }}
                        >
                          {card.badgeText}
                        </span>
                      )}
                      {/* Text Column (automatically opposite to the image) */}
                      <div
                        className={`flex-1 min-w-0 z-10 ${
                          isImageLeft ? 'text-right pl-3' : 'text-left pr-3'
                        }`}
                      >
                        <div
                          className="text-[13px] font-bold tracking-[0.8px] leading-snug"
                          style={{ fontFamily: `'${data.styling.fontFamily}', serif` }}
                        >
                          {card.title}
                        </div>
                        {card.subtitle && (
                          <div
                            className="text-[10px] mt-1 line-clamp-2 leading-relaxed"
                            style={{ color: card.bgImage ? 'rgba(255,255,255,0.85)' : cardSubtextStyle }}
                          >
                            {card.subtitle}
                          </div>
                        )}
                        {card.ctaActionText && (
                          <div
                            className={`mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider shadow-sm transition-transform group-hover:scale-105`}
                            style={{
                              backgroundColor: getLuminance(cardTextStyle) > 0.4 ? 'rgba(255, 255, 255, 0.16)' : 'rgba(10, 10, 10, 0.85)',
                              color: '#ffffff',
                              border: getLuminance(cardTextStyle) > 0.4 ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
                            }}
                          >
                            <span className="underline">{card.ctaActionText}</span>
                            <span>👆</span>
                          </div>
                        )}
                      </div>

                      {/* Side Image (Left or Right) */}
                      <div
                        className={`relative flex-shrink-0 z-10 transition-transform duration-300 group-hover:scale-105 ${
                          isPopout ? '-my-3' : ''
                        }`}
                        style={{
                          width: `${imgSize}px`,
                          height: isPopout ? `${imgSize + 16}px` : `${imgSize}px`,
                        }}
                      >
                        <SimulatorImage
                          src={card.cardImage}
                          alt={card.title}
                          referrerPolicy="no-referrer"
                          accentColor={theme.accent}
                          skeletonClassName={
                            card.imageFitStyle === 'circle'
                              ? 'rounded-full'
                              : isPopout
                              ? 'rounded-2xl -translate-y-2'
                              : 'rounded-xl'
                          }
                          className={`w-full h-full object-cover ${
                            card.imageFitStyle === 'circle'
                              ? 'rounded-full border-2 shadow-lg'
                              : isPopout
                              ? 'rounded-2xl -translate-y-2 shadow-xl'
                              : 'rounded-xl shadow-md'
                          }`}
                          style={{
                            borderColor: theme.accent,
                          }}
                        />
                      </div>
                    </a>
                  );
                }

                return (
                  <a
                    key={card.id}
                    href={isBooking || isQuiz ? undefined : resolvedHref}
                    target={
                      !isBooking && !isQuiz && !isCatalogo && card.openInNewTab !== false
                        ? '_blank'
                        : undefined
                    }
                    rel="noreferrer"
                    onClick={(e) => {
                      recordWhatsappClick();
                      if (isBooking) {
                        e.preventDefault();
                        setBookingModalOpen(true);
                      } else if (isQuiz) {
                        e.preventDefault();
                        setQuizStep(0);
                        setQuizModalOpen(true);
                      }
                    }}
                    className={`cta-card w-full flex items-center justify-between p-3.5 transition-all duration-300 ease-out transform hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer group relative overflow-hidden ${animClass}`}
                    style={{
                      borderRadius: `${data.styling.borderRadius}px`,
                      backgroundImage: cardBackgroundImage,
                      backgroundColor: cardBackgroundColor,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      color: card.bgImage ? '#ffffff' : cardTextStyle,
                      border: 'none',
                      boxShadow: `${theme.pillShadow}, 0 0 14px -3px color-mix(in srgb, ${theme.accent} 32%, transparent)`,
                      ['--theme-accent' as string]: theme.accent,
                    }}
                  >
                    {card.badgeText && (
                      <span
                        className="absolute top-1.5 right-3 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider shadow-sm"
                        style={{
                          backgroundColor: card.variant === 'accent' ? (getLuminance(theme.accent) > 0.4 ? '#0a0a0c' : '#ffffff') : theme.accent,
                          color: card.variant === 'accent' ? (getLuminance(theme.accent) > 0.4 ? theme.accent : '#0a0a0c') : getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff'),
                        }}
                      >
                        {card.badgeText}
                      </span>
                    )}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: iconBgStyle,
                          color: iconColorStyle,
                        }}
                      >
                        {card.icon === 'Calendar' && <CalendarIcon className="w-5 h-5 text-current" />}
                        {card.icon === 'Scissors' && <Scissors className="w-5 h-5" />}
                        {card.icon === 'Scale' && <Scale className="w-5 h-5" />}
                        {card.icon === 'Briefcase' && <Briefcase className="w-5 h-5" />}
                        {card.icon === 'GraduationCap' && <GraduationCap className="w-5 h-5" />}
                        {card.icon === 'Heart' && <Heart className="w-5 h-5" />}
                        {card.icon === 'MessageCircle' && <WhatsAppIcon className="w-5 h-5" />}
                        {card.icon === 'Sparkles' && <Sparkles className="w-5 h-5" />}
                        {card.icon === 'Star' && <Star className="w-5 h-5" />}
                        {card.icon === 'MapPin' && <MapPin className="w-5 h-5" />}
                        {card.icon === 'Instagram' && <InstagramIcon className="w-5 h-5" />}
                      </div>
                      <div className="text-left pr-2">
                        <div className="text-[12px] font-bold tracking-[1.4px] uppercase">
                          {card.title}
                        </div>
                        <div
                          className="text-[10px] mt-0.5 line-clamp-1"
                          style={{ color: card.bgImage ? 'rgba(255,255,255,0.85)' : cardSubtextStyle }}
                        >
                          {card.subtitle}
                        </div>
                        {card.ctaActionText && (
                          <div
                            className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wider"
                            style={{
                              backgroundColor: getLuminance(cardTextStyle) > 0.4 ? 'rgba(255, 255, 255, 0.16)' : 'rgba(10, 10, 10, 0.82)',
                              color: '#fff',
                              border: getLuminance(cardTextStyle) > 0.4 ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
                            }}
                          >
                            <span className="underline">{card.ctaActionText}</span>
                            <span>👆</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 flex-shrink-0"
                      style={{ color: card.bgImage ? '#ffffff' : cardSubtextStyle }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* AUTHORITY METRICS */}
            {data.metrics.enabled && (
              <div className="px-5 py-2 relative z-10">
                <div
                  className="grid grid-cols-3 divide-x divide-neutral-800/20 py-3 text-center"
                  style={{
                    borderRadius: `${data.styling.borderRadius / 1.5}px`,
                    background: data.moduleColors?.metrics?.bgColor || theme.socialBg,
                    border: `1px solid ${theme.socialBorder}`,
                  }}
                >
                  <div>
                    <div
                      className="text-sm font-bold tabular-nums"
                      style={{ color: data.moduleColors?.metrics?.accentColor || data.moduleColors?.metrics?.titleColor || theme.accent }}
                    >
                      {data.metrics.stat1Value}
                    </div>
                    <div
                      className="text-[8px] uppercase tracking-wider mt-0.5"
                      style={{ color: data.moduleColors?.metrics?.textColor || theme.textMuted }}
                    >
                      {data.metrics.stat1Label}
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-sm font-bold tabular-nums"
                      style={{ color: data.moduleColors?.metrics?.accentColor || data.moduleColors?.metrics?.titleColor || theme.accent }}
                    >
                      {data.metrics.stat2Value}
                    </div>
                    <div
                      className="text-[8px] uppercase tracking-wider mt-0.5"
                      style={{ color: data.moduleColors?.metrics?.textColor || theme.textMuted }}
                    >
                      {data.metrics.stat2Label}
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-sm font-bold tabular-nums"
                      style={{ color: data.moduleColors?.metrics?.accentColor || data.moduleColors?.metrics?.titleColor || theme.accent }}
                    >
                      {data.metrics.stat3Value}
                    </div>
                    <div
                      className="text-[8px] uppercase tracking-wider mt-0.5"
                      style={{ color: data.moduleColors?.metrics?.textColor || theme.textMuted }}
                    >
                      {data.metrics.stat3Label}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MÓDULO: COMO FUNCIONA O PROCESSO (01, 02, 03) */}
            {data.processSteps.enabled && (
              <div className="px-5 py-4 space-y-2.5 relative z-10">
                <div className="flex items-center gap-2">
                  <h3
                    className="text-sm font-semibold tracking-wider uppercase"
                    style={{
                      color: data.moduleColors?.processSteps?.headlineColor || theme.accent,
                      fontFamily: `'${data.styling.fontFamily}', serif`,
                    }}
                  >
                    {data.processSteps.headline}
                  </h3>
                  <div className="flex-1 h-px bg-neutral-800/30" />
                </div>
                <div className="space-y-2">
                  {data.processSteps.steps.map((st) => (
                    <div
                      key={st.id}
                      className="p-3 flex items-start gap-3 rounded-2xl"
                      style={{
                        background: data.moduleColors?.processSteps?.bgColor || theme.socialBg,
                        border: `1px solid ${theme.socialBorder}`,
                      }}
                    >
                      <div
                        className="text-2xl font-bold leading-none tabular-nums"
                        style={{
                          color: data.moduleColors?.processSteps?.accentColor || theme.accent,
                          fontFamily: `'${data.styling.fontFamily}', serif`,
                        }}
                      >
                        {st.number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-xs font-bold"
                          style={{ color: data.moduleColors?.processSteps?.titleColor || theme.textMain }}
                        >
                          {st.title}
                        </div>
                        <div
                          className="text-[10px] mt-0.5"
                          style={{ color: data.moduleColors?.processSteps?.textColor || theme.textMuted }}
                        >
                          {st.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MÓDULO: GALERIA DE FOTOS & PORTFÓLIO DE RESULTADOS */}
            {data.studentGrid?.enabled && data.studentGrid.photos?.length > 0 && (() => {
              const photos = data.studentGrid.photos;
              const layout = data.studentGrid.layout || 'smart_masonry';
              const aspect = data.studentGrid.aspectRatio || 'auto';

              const getItemAspectClass = (url: string, isHero = false) => {
                if (isHero) return 'col-span-2 row-span-2 aspect-square';
                const info = photoOrientations[url];
                const orient = info?.orientation || 'square';

                if (aspect === 'auto') {
                  if (layout === 'smart_masonry' || layout === 'grid2') {
                    if (orient === 'landscape') return 'col-span-2 aspect-[16/10]';
                    if (orient === 'portrait') return 'col-span-1 aspect-[3/4]';
                    return 'col-span-1 aspect-square';
                  }
                  if (layout === 'grid3') {
                    if (orient === 'landscape') return 'aspect-[4/3]';
                    if (orient === 'portrait') return 'aspect-[3/4]';
                    return 'aspect-square';
                  }
                  if (layout === 'masonry') {
                    if (orient === 'landscape') return 'aspect-[4/3]';
                    if (orient === 'portrait') return 'aspect-[3/4]';
                    return 'aspect-square';
                  }
                  if (layout === 'carousel') {
                    if (orient === 'landscape') return 'w-[210px] aspect-[16/10]';
                    if (orient === 'portrait') return 'w-[145px] aspect-[3/4]';
                    return 'w-[155px] aspect-square';
                  }
                  return orient === 'landscape' ? 'aspect-[4/3]' : orient === 'portrait' ? 'aspect-[3/4]' : 'aspect-square';
                }

                if (aspect === 'portrait') return layout === 'carousel' ? 'w-[155px] aspect-[4/5]' : 'aspect-[4/5]';
                if (aspect === 'landscape') return layout === 'carousel' ? 'w-[190px] aspect-[4/3]' : 'aspect-[4/3]';
                return layout === 'carousel' ? 'w-[155px] aspect-square' : 'aspect-square';
              };

              return (
                <div className="px-5 py-4 space-y-2.5 relative z-10" id="galeria">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      {data.studentGrid.badge && (
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider mb-1"
                          style={{
                            background: `${data.moduleColors?.studentGrid?.accentColor || theme.accent}18`,
                            color: data.moduleColors?.studentGrid?.accentColor || theme.accent,
                            border: `1px solid ${data.moduleColors?.studentGrid?.accentColor || theme.accent}40`,
                          }}
                        >
                          {data.studentGrid.badge}
                        </span>
                      )}
                      <div className="flex items-center gap-2">
                        <h3
                          className="text-sm font-semibold tracking-wider uppercase"
                          style={{
                            color: data.moduleColors?.studentGrid?.headlineColor || theme.accent,
                            fontFamily: `'${data.styling.fontFamily}', serif`,
                          }}
                        >
                          {data.studentGrid.headline}
                        </h3>
                        <div className="flex-1 h-px bg-neutral-800/30" />
                      </div>
                      {data.studentGrid.subtitle && (
                        <p
                          className="text-[10px] mt-0.5"
                          style={{ color: data.moduleColors?.studentGrid?.textColor || theme.textMuted }}
                        >
                          {data.studentGrid.subtitle}
                        </p>
                      )}
                    </div>
                    <span className="text-[8.5px] font-mono px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 shrink-0 mt-0.5">
                      {photos.length} fotos
                    </span>
                  </div>

                  {/* Layout 1: Bento Inteligente Adaptativo (Detecção Auto Retrato/Paisagem) */}
                  {layout === 'smart_masonry' && (
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      {photos.map((p, idx) => {
                        const aspectCls = getItemAspectClass(p);
                        const info = photoOrientations[p];
                        const isLandscape = info?.orientation === 'landscape';
                        const caption = ((data.studentGrid as any).captions?.[idx] || '').trim();

                        return (
                          <div
                            key={idx}
                            onClick={() => data.studentGrid.enableLightbox !== false && setLightboxIndex(idx)}
                            className={`relative group overflow-hidden rounded-2xl cursor-pointer ${aspectCls} border transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm`}
                            style={{ borderColor: theme.socialBorder, backgroundColor: '#000' }}
                          >
                            <SimulatorImage
                              src={p}
                              alt={caption || `Foto ${idx + 1}`}
                              referrerPolicy="no-referrer"
                              accentColor={theme.accent}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {isLandscape && !caption && (
                              <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[7.5px] font-bold uppercase tracking-wider bg-black/60 text-amber-300 border border-amber-500/30 backdrop-blur z-20">
                                Panorâmica
                              </span>
                            )}
                            {caption && (
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-2.5 py-2 pt-5 z-20 pointer-events-none">
                                <p className="text-[10px] text-white font-medium leading-snug line-clamp-2 drop-shadow">
                                  {caption}
                                </p>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                              <Maximize2 className="w-5 h-5 text-white drop-shadow" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Layout 2: Masonry Fluído (Pinterest Style sem cortes) */}
                  {layout === 'masonry' && (
                    <div className="columns-2 gap-2.5 pt-1 [column-fill:balance]">
                      {photos.map((p, idx) => {
                        const aspectCls = getItemAspectClass(p);
                        const caption = ((data.studentGrid as any).captions?.[idx] || '').trim();
                        return (
                          <div
                            key={idx}
                            onClick={() => data.studentGrid.enableLightbox !== false && setLightboxIndex(idx)}
                            className={`relative group overflow-hidden rounded-2xl cursor-pointer ${aspectCls} mb-2.5 break-inside-avoid border transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm`}
                            style={{ borderColor: theme.socialBorder, backgroundColor: '#000' }}
                          >
                            <SimulatorImage
                              src={p}
                              alt={caption || `Foto ${idx + 1}`}
                              referrerPolicy="no-referrer"
                              accentColor={theme.accent}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {caption && (
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-2.5 py-2 pt-5 z-20 pointer-events-none">
                                <p className="text-[10px] text-white font-medium leading-snug line-clamp-2 drop-shadow">
                                  {caption}
                                </p>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                              <Maximize2 className="w-5 h-5 text-white drop-shadow" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Layout 3: Grid 2 Colunas */}
                  {layout === 'grid2' && (
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      {photos.map((p, idx) => {
                        const aspectCls = getItemAspectClass(p);
                        const caption = ((data.studentGrid as any).captions?.[idx] || '').trim();
                        return (
                          <div
                            key={idx}
                            onClick={() => data.studentGrid.enableLightbox !== false && setLightboxIndex(idx)}
                            className={`relative group overflow-hidden rounded-2xl cursor-pointer ${aspectCls} border transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm`}
                            style={{ borderColor: theme.socialBorder, backgroundColor: '#000' }}
                          >
                            <SimulatorImage
                              src={p}
                              alt={caption || `Foto ${idx + 1}`}
                              referrerPolicy="no-referrer"
                              accentColor={theme.accent}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {caption && (
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-2.5 py-2 pt-5 z-20 pointer-events-none">
                                <p className="text-[10px] text-white font-medium leading-snug line-clamp-2 drop-shadow">
                                  {caption}
                                </p>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                              <Maximize2 className="w-5 h-5 text-white drop-shadow" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Layout 4: Grid 3 Colunas (Clássico) */}
                  {layout === 'grid3' && (
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {photos.map((p, idx) => {
                        const aspectCls = getItemAspectClass(p);
                        const caption = ((data.studentGrid as any).captions?.[idx] || '').trim();
                        return (
                          <div
                            key={idx}
                            onClick={() => data.studentGrid.enableLightbox !== false && setLightboxIndex(idx)}
                            className={`relative group overflow-hidden rounded-xl cursor-pointer ${aspectCls} border transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-sm`}
                            style={{ borderColor: theme.socialBorder, backgroundColor: '#000' }}
                          >
                            <SimulatorImage
                              src={p}
                              alt={caption || `Foto ${idx + 1}`}
                              referrerPolicy="no-referrer"
                              accentColor={theme.accent}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {caption && (
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-2 py-1.5 pt-4 z-20 pointer-events-none">
                                <p className="text-[9px] text-white font-medium leading-tight line-clamp-2 drop-shadow">
                                  {caption}
                                </p>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                              <Maximize2 className="w-4 h-4 text-white drop-shadow" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Layout 5: Mosaico Editorial */}
                  {layout === 'mosaic' && (
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {photos.map((p, idx) => {
                        const isHero = idx === 0;
                        const aspectCls = getItemAspectClass(p, isHero);
                        const caption = ((data.studentGrid as any).captions?.[idx] || '').trim();
                        return (
                          <div
                            key={idx}
                            onClick={() => data.studentGrid.enableLightbox !== false && setLightboxIndex(idx)}
                            className={`relative group overflow-hidden rounded-2xl cursor-pointer border transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm ${aspectCls}`}
                            style={{ borderColor: theme.socialBorder, backgroundColor: '#000' }}
                          >
                            <SimulatorImage
                              src={p}
                              alt={caption || `Foto ${idx + 1}`}
                              referrerPolicy="no-referrer"
                              accentColor={theme.accent}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {isHero && (
                              <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-black/75 text-amber-300 border border-amber-500/30 backdrop-blur shadow z-20">
                                Destaque
                              </span>
                            )}
                            {caption && (
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-2.5 py-2 pt-5 z-20 pointer-events-none">
                                <p className="text-[10px] text-white font-medium leading-snug line-clamp-2 drop-shadow">
                                  {caption}
                                </p>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                              <Maximize2 className="w-5 h-5 text-white drop-shadow" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Layout 6: Carrossel Horizontal com Snap */}
                  {layout === 'carousel' && (
                    <div className="relative pt-1">
                      <div className="flex gap-2.5 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar -mx-5 px-5 scroll-smooth">
                        {photos.map((p, idx) => {
                          const aspectCls = getItemAspectClass(p);
                          const caption = ((data.studentGrid as any).captions?.[idx] || '').trim();
                          return (
                            <div
                              key={idx}
                              onClick={() => data.studentGrid.enableLightbox !== false && setLightboxIndex(idx)}
                              className={`relative group flex-shrink-0 snap-center overflow-hidden rounded-2xl cursor-pointer border transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm ${aspectCls}`}
                              style={{ borderColor: theme.socialBorder, backgroundColor: '#000' }}
                            >
                              <SimulatorImage
                                src={p}
                                alt={caption || `Foto ${idx + 1}`}
                                referrerPolicy="no-referrer"
                                accentColor={theme.accent}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              {caption && (
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-2.5 py-2 pt-5 z-20 pointer-events-none">
                                  <p className="text-[10px] text-white font-medium leading-snug line-clamp-2 drop-shadow">
                                    {caption}
                                  </p>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                                <Maximize2 className="w-5 h-5 text-white drop-shadow" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-between text-[9px] text-neutral-400 mt-1 px-1">
                        <span>👈 Deslize para navegar</span>
                        <span className="flex items-center gap-1 font-mono text-amber-400">
                          <Maximize2 className="w-3 h-3" /> Toque para ampliar
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* MÓDULO: ANTES & DEPOIS INTERATIVO */}
            {data.beforeAfter.enabled && (
              <div className="px-5 py-4 space-y-2.5 relative z-10">
                <div className="flex items-center gap-2">
                  <h3
                    className="text-sm font-semibold tracking-wider uppercase"
                    style={{
                      color: data.moduleColors?.beforeAfter?.headlineColor || theme.accent,
                      fontFamily: `'${data.styling.fontFamily}', serif`,
                    }}
                  >
                    {data.beforeAfter.headline}
                  </h3>
                  <div className="flex-1 h-px bg-neutral-800/30" />
                </div>
                <div
                  className="relative w-full h-48 rounded-2xl overflow-hidden select-none"
                  style={{ border: `1px solid ${theme.socialBorder}` }}
                >
                  <img
                    src={data.beforeAfter.afterUrl}
                    alt="Depois"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-y-0 left-0 overflow-hidden"
                    style={{ width: `${beforeAfterSlider}%` }}
                  >
                    <img
                      src={data.beforeAfter.beforeUrl}
                      alt="Antes"
                      referrerPolicy="no-referrer"
                      className="w-[335px] max-w-none h-full object-cover"
                    />
                  </div>
                  <div
                    className="absolute inset-y-0 w-0.5 bg-white shadow-lg pointer-events-none"
                    style={{ left: `${beforeAfterSlider}%` }}
                  />
                  <input
                    type="range"
                    min="5"
                    max="95"
                    value={beforeAfterSlider}
                    onChange={(e) => setBeforeAfterSlider(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  />
                  <span className="absolute bottom-2 left-2 text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-black/70 text-white">
                    Antes
                  </span>
                  <span className="absolute bottom-2 right-2 text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-black/70 text-white">
                    Depois
                  </span>
                </div>
              </div>
            )}

            {/* CARD DE LOCALIZAÇÃO (MAPS + HORÁRIO DE FUNCIONAMENTO) */}
            {data.locationCard.enabled && (
              <div className="px-5 py-2 relative z-10">
                <a
                  href={data.locationCard.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 flex items-center justify-between rounded-2xl group transition-all duration-300 ease-out hover:scale-[1.025] active:scale-[0.985]"
                  style={{
                    background: data.moduleColors?.locationCard?.bgColor || theme.socialBg,
                    border: `1px solid ${theme.socialBorder}`,
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: theme.iconBg,
                        color: data.moduleColors?.locationCard?.accentColor || theme.iconColor,
                      }}
                    >
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className="text-xs font-bold uppercase truncate"
                          style={{ color: data.moduleColors?.locationCard?.titleColor || theme.textMain }}
                        >
                          {data.locationCard.headline}
                        </span>
                        {data.locationCard.showHours !== false && data.locationCard.openStatus && (
                          <span
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-extrabold"
                            style={{
                              backgroundColor: getLuminance(theme.bg) > 0.6 ? 'rgba(5, 150, 105, 0.12)' : 'rgba(16, 185, 129, 0.2)',
                              color: getLuminance(theme.bg) > 0.6 ? '#047857' : '#34d399',
                              border: getLuminance(theme.bg) > 0.6 ? '1px solid rgba(5, 150, 105, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full animate-pulse"
                              style={{ backgroundColor: getLuminance(theme.bg) > 0.6 ? '#047857' : '#34d399' }}
                            />
                            {data.locationCard.openStatus}
                          </span>
                        )}
                      </div>
                      <div
                        className="text-[10px] mt-0.5 line-clamp-1"
                        style={{ color: data.moduleColors?.locationCard?.textColor || theme.textMuted }}
                      >
                        {data.locationCard.address}
                      </div>
                      {data.locationCard.showHours !== false && data.locationCard.hours && (
                        <div
                          className="text-[9px] mt-1 font-semibold flex items-center gap-1 opacity-90"
                          style={{
                            color:
                              data.moduleColors?.locationCard?.accentColor ||
                              data.moduleColors?.locationCard?.titleColor ||
                              theme.textMain,
                          }}
                        >
                          <Clock
                            className="w-2.5 h-2.5 shrink-0"
                            style={{ color: data.moduleColors?.locationCard?.accentColor || theme.accent }}
                          />
                          <span className="truncate">{data.locationCard.hours}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Navigation
                    className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition"
                    style={{ color: data.moduleColors?.locationCard?.accentColor || theme.accent }}
                  />
                </a>
              </div>
            )}

            {/* CATALOG OF SERVICES */}
            {data.services.enabled && data.services.items.length > 0 && (() => {
              const srvLayout = data.services.layout || 'list';
              const srvModColors = data.moduleColors?.services || {};
              const srvHeadlineColor = srvModColors.headlineColor || theme.accent;
              const srvTitleColor = srvModColors.titleColor || theme.textMain;
              const srvTextColor = srvModColors.textColor || theme.textMuted;
              const srvAccentColor = srvModColors.accentColor || theme.accent;
              const srvCardBg = srvModColors.bgColor;

              const handleServiceAction = (srv: (typeof data.services.items)[0]) => {
                recordWhatsappClick();
                if (srv.actionType === 'whatsapp') {
                  const msg = `Olá ${data.profile.name}! Tenho interesse em "${srv.name}" (${srv.price}). Gostaria de verificar a disponibilidade!`;
                  const url = `https://wa.me/${formatWhatsAppPhone(data.profile.whatsapp)}?text=${encodeURIComponent(msg)}`;
                  window.open(url, '_blank', 'noopener,noreferrer');
                } else if (srv.actionType === 'link' && srv.customUrl) {
                  window.open(srv.customUrl, '_blank', 'noopener,noreferrer');
                } else {
                  setBookingForm(b => ({ ...b, service: srv.name }));
                  setBookingModalOpen(true);
                }
              };

              return (
                <div className="px-5 py-4 space-y-3 relative z-10 shrink-0" id="catalogo">
                  <div className="space-y-1">
                    {data.services.badge && (
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider"
                        style={{
                          backgroundColor: `${srvAccentColor}18`,
                          color: srvAccentColor,
                          border: `1px solid ${srvAccentColor}40`,
                        }}
                      >
                        {data.services.badge}
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      <h3
                        className="text-sm font-semibold tracking-wider uppercase"
                        style={{ color: srvHeadlineColor, fontFamily: `'${data.styling.fontFamily}', serif` }}
                      >
                        {data.services.headline}
                      </h3>
                      <div className="flex-1 h-px bg-neutral-800/30" />
                    </div>
                    {data.services.subtitle && (
                      <p className="text-[10px] leading-relaxed" style={{ color: srvTextColor }}>
                        {data.services.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Layout 1: Vitrine Expandida (Featured Cards) */}
                  {srvLayout === 'featured' && (
                    <div className="space-y-3">
                      {data.services.items.map((srv) => (
                        <div
                          key={srv.id}
                          className="service-card overflow-hidden transition-all duration-300 ease-out transform hover:scale-[1.025] hover:-translate-y-0.5 active:scale-[0.985] hover:shadow-xl group"
                          style={{
                            borderRadius: `${Math.round(data.styling.borderRadius / 1.2)}px`,
                            backgroundColor:
                              srvCardBg || (getLuminance(theme.bg) > 0.6 ? '#ffffff' : (data.styling.glassmorphism ? 'rgba(255,255,255,0.04)' : theme.socialBg)),
                            border: srv.featured ? `1.5px solid ${srvAccentColor}` : `1px solid ${theme.socialBorder}`,
                            boxShadow: srv.featured ? `0 8px 24px -4px ${theme.glowColor}` : 'none',
                            backdropFilter: data.styling.glassmorphism ? 'blur(12px)' : 'none',
                          }}
                        >
                          <div className="relative w-full h-36 bg-black overflow-hidden">
                            <SimulatorImage
                              src={srv.imageUrl}
                              alt={srv.name}
                              referrerPolicy={srv.imageUrl.startsWith('http') ? 'no-referrer' : undefined}
                              accentColor={theme.accent}
                              className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                            />
                            {srv.badge && (
                              <span
                                className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider shadow z-20"
                                style={{ backgroundColor: srvAccentColor, color: getSafeContrastText(srvAccentColor, '#0a0a0c', '#ffffff') }}
                              >
                                {srv.badge}
                              </span>
                            )}
                            {srv.duration && (
                              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-[8.5px] font-bold bg-black/75 text-white backdrop-blur-sm z-20">
                                ⏱ {srv.duration}
                              </span>
                            )}
                          </div>
                          <div className="p-3.5 space-y-2">
                            <div className="text-xs font-bold leading-snug" style={{ color: srvTitleColor }}>
                              {srv.name}
                            </div>
                            <div className="text-[10.5px] leading-relaxed" style={{ color: srvTextColor }}>
                              {srv.description}
                            </div>
                            <div
                              className="flex items-center justify-between pt-2 border-t"
                              style={{ borderColor: theme.socialBorder }}
                            >
                              <div>
                                {srv.oldPrice && (
                                  <span
                                    className="text-[9.5px] line-through block opacity-70"
                                    style={{ color: srvTextColor }}
                                  >
                                    {srv.oldPrice}
                                  </span>
                                )}
                                <span className="text-sm font-extrabold tabular-nums" style={{ color: srvAccentColor }}>
                                  {srv.price}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleServiceAction(srv)}
                                className="px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full transition hover:scale-105 cursor-pointer shadow"
                                style={{ backgroundColor: srvAccentColor, color: getSafeContrastText(srvAccentColor, '#0a0a0c', '#ffffff') }}
                              >
                                {srv.ctaLabel || 'Reservar'} ›
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Layout 2: Grade 2 Colunas (Grid2) */}
                  {srvLayout === 'grid2' && (
                    <div className="grid grid-cols-2 gap-2.5">
                      {data.services.items.map((srv) => (
                        <div
                          key={srv.id}
                          className="service-card overflow-hidden flex flex-col justify-between transition-all duration-300 ease-out transform hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.985] hover:shadow-xl group"
                          style={{
                            borderRadius: `${Math.round(data.styling.borderRadius / 1.3)}px`,
                            backgroundColor:
                              srvCardBg || (getLuminance(theme.bg) > 0.6 ? '#ffffff' : (data.styling.glassmorphism ? 'rgba(255,255,255,0.04)' : theme.socialBg)),
                            border: srv.featured ? `1.5px solid ${srvAccentColor}` : `1px solid ${theme.socialBorder}`,
                            backdropFilter: data.styling.glassmorphism ? 'blur(12px)' : 'none',
                          }}
                        >
                          <div>
                            <div className="relative w-full aspect-[4/3] bg-black overflow-hidden">
                              <SimulatorImage
                                src={srv.imageUrl}
                                alt={srv.name}
                                referrerPolicy={srv.imageUrl.startsWith('http') ? 'no-referrer' : undefined}
                                accentColor={theme.accent}
                                className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                              />
                              {srv.badge && (
                                <span
                                  className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full text-[7px] font-black uppercase tracking-wider shadow z-20"
                                  style={{ backgroundColor: srvAccentColor, color: getSafeContrastText(srvAccentColor, '#0a0a0c', '#ffffff') }}
                                >
                                  {srv.badge}
                                </span>
                              )}
                            </div>
                            <div className="p-2.5 space-y-1">
                              <div className="text-[11px] font-bold leading-tight line-clamp-2" style={{ color: srvTitleColor }}>
                                {srv.name}
                              </div>
                              {srv.duration && (
                                <div className="text-[8.5px] font-medium" style={{ color: srvTextColor }}>
                                  ⏱ {srv.duration}
                                </div>
                              )}
                              <div className="text-[9.5px] leading-snug line-clamp-2" style={{ color: srvTextColor }}>
                                {srv.description}
                              </div>
                            </div>
                          </div>
                          <div className="px-2.5 pb-2.5 pt-1 space-y-1.5">
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                              {srv.oldPrice && (
                                <span className="text-[8.5px] line-through opacity-70" style={{ color: srvTextColor }}>
                                  {srv.oldPrice}
                                </span>
                              )}
                              <span className="text-xs font-extrabold tabular-nums" style={{ color: srvAccentColor }}>
                                {srv.price}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleServiceAction(srv)}
                              className="w-full py-1.5 text-[9.5px] font-extrabold uppercase tracking-wider rounded-lg transition hover:scale-[1.02] cursor-pointer"
                              style={{ backgroundColor: srvAccentColor, color: getSafeContrastText(srvAccentColor, '#0a0a0c', '#ffffff') }}
                            >
                              {srv.ctaLabel || 'Reservar'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Layout 3: Lista Compacta Clássica (List) */}
                  {srvLayout === 'list' && (
                    <div className="space-y-2.5">
                      {data.services.items.map((srv) => (
                        <div
                          key={srv.id}
                          className="service-card p-3 flex gap-3 items-center transition-all duration-300 ease-out transform hover:scale-[1.025] hover:-translate-y-0.5 active:scale-[0.985] hover:shadow-xl group"
                          style={{
                            borderRadius: `${Math.round(data.styling.borderRadius / 1.4)}px`,
                            backgroundColor:
                              srvCardBg || (getLuminance(theme.bg) > 0.6 ? '#ffffff' : (data.styling.glassmorphism ? 'rgba(255,255,255,0.03)' : 'transparent')),
                            border: srv.featured ? `1.5px solid ${srvAccentColor}` : `1px solid ${theme.socialBorder}`,
                            boxShadow: srv.featured ? `0 6px 18px -4px ${theme.glowColor}` : 'none',
                            backdropFilter: data.styling.glassmorphism ? 'blur(12px)' : 'none',
                          }}
                        >
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-black">
                            <SimulatorImage
                              src={srv.imageUrl}
                              alt={srv.name}
                              referrerPolicy={srv.imageUrl.startsWith('http') ? 'no-referrer' : undefined}
                              accentColor={theme.accent}
                              className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                              {srv.badge && (
                                <span
                                  className="px-1.5 py-0.2 rounded-full text-[7.5px] font-black uppercase tracking-wider"
                                  style={{ backgroundColor: srvAccentColor, color: getSafeContrastText(srvAccentColor, '#0a0a0c', '#ffffff') }}
                                >
                                  {srv.badge}
                                </span>
                              )}
                              {srv.duration && (
                                <span className="text-[9px] font-medium" style={{ color: srvTextColor }}>
                                  ⏱ {srv.duration}
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-bold truncate" style={{ color: srvTitleColor }}>
                              {srv.name}
                            </div>
                            <div className="text-[10px] leading-tight line-clamp-2 mt-0.5" style={{ color: srvTextColor }}>
                              {srv.description}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-baseline gap-1.5">
                                {srv.oldPrice && (
                                  <span className="text-[9px] line-through opacity-70" style={{ color: srvTextColor }}>
                                    {srv.oldPrice}
                                  </span>
                                )}
                                <span className="text-xs font-extrabold tabular-nums" style={{ color: srvAccentColor }}>
                                  {srv.price}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleServiceAction(srv)}
                                className="px-2.5 py-1 text-[10px] font-bold rounded-full transition hover:scale-105 cursor-pointer"
                                style={{ backgroundColor: srvAccentColor, color: getSafeContrastText(srvAccentColor, '#0a0a0c', '#ffffff') }}
                              >
                                {srv.ctaLabel || 'Reservar'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* TESTIMONIALS */}
            {data.testimonials.enabled && (
              <div className="px-5 py-4 space-y-2 relative z-10">
                <div className="flex items-center gap-2">
                  <h3
                    className="text-sm font-semibold tracking-wider uppercase"
                    style={{
                      color: data.moduleColors?.testimonials?.headlineColor || theme.accent,
                      fontFamily: `'${data.styling.fontFamily}', serif`,
                    }}
                  >
                    {data.testimonials.headline}
                  </h3>
                  <div className="flex-1 h-px bg-neutral-800/30" />
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                  {data.testimonials.items.map((t) => (
                    <div
                      key={t.id}
                      className="p-3.5 rounded-2xl flex-shrink-0 w-[240px] space-y-2"
                      style={{
                        background: data.moduleColors?.testimonials?.bgColor || theme.socialBg,
                        border: `1px solid ${theme.socialBorder}`,
                      }}
                    >
                      <div
                        className="flex"
                        style={{ color: data.moduleColors?.testimonials?.accentColor || '#fbbf24' }}
                      >
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p
                        className="text-[11px] leading-relaxed italic"
                        style={{ color: data.moduleColors?.testimonials?.textColor || theme.textMuted }}
                      >
                        "{t.text}"
                      </p>
                      <div
                        className="text-[10px] font-bold"
                        style={{ color: data.moduleColors?.testimonials?.titleColor || theme.textMain }}
                      >
                        {t.clientName} <span className="opacity-65 font-normal">· {t.city}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ABOUT ME SECTION */}
            {data.aboutMe.enabled && (
              <div className="px-5 py-4 space-y-3 relative z-10">
                <div className="flex items-center gap-2">
                  <h3
                    className="text-sm font-semibold tracking-wider uppercase"
                    style={{
                      color: data.moduleColors?.aboutMe?.headlineColor || theme.accent,
                      fontFamily: `'${data.styling.fontFamily}', serif`,
                    }}
                  >
                    {data.aboutMe.headline}
                  </h3>
                  <div className="flex-1 h-px bg-neutral-800/30" />
                </div>

                {((data.aboutMe as any)?.photoUrl || data.profile.aboutPhotoUrl) && (
                  <div className="relative w-full h-40 rounded-2xl overflow-hidden shadow bg-black">
                    <SimulatorImage
                      src={(data.aboutMe as any)?.photoUrl || data.profile.aboutPhotoUrl}
                      alt="Sobre"
                      referrerPolicy="no-referrer"
                      accentColor={theme.accent}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <p
                  className="text-xs leading-relaxed text-justify"
                  style={{ color: data.moduleColors?.aboutMe?.textColor || theme.textMuted }}
                >
                  {data.aboutMe.paragraph}
                </p>

                {data.aboutMe.closingPhrase && (
                  <div
                    className="text-center text-xl italic pt-1"
                    style={{
                      fontFamily: `'${theme.fontScript}', cursive, serif`,
                      color: data.moduleColors?.aboutMe?.accentColor || theme.accent,
                    }}
                  >
                    {data.aboutMe.closingPhrase}
                  </div>
                )}
              </div>
            )}

            {/* FAQ ACCORDION SECTION */}
            {data.faq.enabled && data.faq.items.length > 0 && (
              <div className="px-5 py-4 space-y-2.5 relative z-10">
                <div className="flex items-center gap-2">
                  <h3
                    className="text-sm font-semibold tracking-wider uppercase"
                    style={{
                      color: data.moduleColors?.faq?.headlineColor || theme.accent,
                      fontFamily: `'${data.styling.fontFamily}', serif`,
                    }}
                  >
                    {data.faq.headline}
                  </h3>
                  <div className="flex-1 h-px bg-neutral-800/30" />
                </div>

                <div className="space-y-2">
                  {data.faq.items.map((item) => {
                    const isOpen = activeFaqId === item.id;
                    return (
                      <div
                        key={item.id}
                        className="rounded-2xl overflow-hidden transition"
                        style={{
                          background: data.moduleColors?.faq?.bgColor || theme.socialBg,
                          border: `1px solid ${theme.socialBorder}`,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setActiveFaqId(isOpen ? null : item.id)}
                          className="w-full p-3 text-left flex items-center justify-between gap-2 text-xs font-semibold cursor-pointer"
                          style={{ color: data.moduleColors?.faq?.titleColor || theme.textMain }}
                        >
                          <span>{item.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            style={{ color: data.moduleColors?.faq?.accentColor || theme.accent }}
                          />
                        </button>
                        {isOpen && (
                          <div
                            className="px-3 pb-3 text-[11px] leading-relaxed"
                            style={{ color: data.moduleColors?.faq?.textColor || theme.textMuted }}
                          >
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* FOOTER */}
            <div className="pt-6 pb-8 px-4 text-center relative z-10 flex flex-col items-center gap-2.5">
              <p
                className="text-[10px] tracking-wider opacity-85"
                style={{ color: data.moduleColors?.footer?.textColor || theme.textMuted }}
              >
                © {new Date().getFullYear()} {data.profile.name}. Todos os direitos reservados.
              </p>
              {(() => {
                const creatorInfo = resolveCreatorFooterInfo(data);
                return (
                  <a
                    href={creatorInfo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wide transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 shadow-sm cursor-pointer"
                    style={{
                      color:
                        data.moduleColors?.footer?.accentColor ||
                        data.moduleColors?.footer?.titleColor ||
                        theme.accent,
                      background: data.moduleColors?.footer?.bgColor || 'rgba(0, 0, 0, 0.35)',
                      border: `1px solid ${theme.cardBorder}`,
                    }}
                    title={`Visitar página de ${creatorInfo.brandName}`}
                  >
                    <span>
                      ✨ Criado por <strong>{creatorInfo.brandName}</strong>
                      {creatorInfo.ctaLabel ? ` · ${creatorInfo.ctaLabel}` : ''}
                    </span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                );
              })()}
            </div>

            {/* MODAL DO FUNIL QUALIFICADOR / ANTI-CURIOSOS */}
            {quizModalOpen && (
              <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-end p-4 animate-in fade-in duration-200">
                <div
                  className="p-5 rounded-3xl space-y-4 shadow-2xl relative"
                  style={{ background: theme.bg, border: `1px solid ${theme.cardBorder}` }}
                >
                  {/* Cabeçalho do Quiz */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Passo {quizStep + 1} de {data.qualifierFunnel.questions.length}
                      </span>
                      <h4 className="text-sm font-bold uppercase tracking-wider mt-1.5" style={{ color: theme.accent }}>
                        {data.qualifierFunnel.headline}
                      </h4>
                    </div>
                    <button
                      onClick={() => setQuizModalOpen(false)}
                      className="p-1 rounded-full text-neutral-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Barra de Progresso */}
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${((quizStep + 1) / data.qualifierFunnel.questions.length) * 100}%`,
                        background: theme.accent
                      }}
                    />
                  </div>

                  {/* Pergunta Atual */}
                  {data.qualifierFunnel.questions[quizStep] && (
                    <div className="space-y-3 py-1">
                      <p className="text-xs font-semibold leading-relaxed" style={{ color: theme.textMain }}>
                        {data.qualifierFunnel.questions[quizStep].title}
                      </p>

                      <div className="space-y-2">
                        {data.qualifierFunnel.questions[quizStep].options.map((option, idx) => {
                          const currentQId = data.qualifierFunnel.questions[quizStep].id;
                          const isSelected = quizAnswers[currentQId] === option;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                handleQuizAnswer(currentQId, option);
                              }}
                              className="w-full text-left p-3 rounded-xl text-xs transition flex items-center justify-between cursor-pointer"
                              style={{
                                background: isSelected ? theme.accent : theme.socialBg,
                                color: isSelected ? '#000' : theme.textMain,
                                border: `1px solid ${isSelected ? theme.accent : theme.socialBorder}`,
                                fontWeight: isSelected ? '700' : '500'
                              }}
                            >
                              <span className="line-clamp-2">{option}</span>
                              {isSelected && <CheckCircle2 className="w-4 h-4 flex-shrink-0 ml-2" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Rodapé e Navegação */}
                  <div className="flex gap-2 pt-2">
                    {quizStep > 0 && (
                      <button
                        type="button"
                        onClick={() => setQuizStep(s => s - 1)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold bg-neutral-800 text-neutral-300 cursor-pointer"
                      >
                        Voltar
                      </button>
                    )}

                    {quizStep < data.qualifierFunnel.questions.length - 1 ? (
                      <button
                        type="button"
                        disabled={!quizAnswers[data.qualifierFunnel.questions[quizStep]?.id]}
                        onClick={() => setQuizStep(s => s + 1)}
                        className="flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition disabled:opacity-40 cursor-pointer"
                        style={{ background: theme.accent, color: '#000' }}
                      >
                        <span>Próxima</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <a
                        href={buildQuizWhatsAppLink()}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                          recordWhatsappClick();
                          setQuizModalOpen(false);
                        }}
                        className="flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition"
                        style={{ background: theme.accent, color: '#000' }}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Enviar Triagem pelo WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* MINI-MODAL DE PRÉ-AGENDAMENTO */}
            {bookingModalOpen && (
              <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end p-4 animate-in fade-in duration-200">
                <div
                  className="p-5 rounded-3xl space-y-4 shadow-2xl"
                  style={{ background: theme.bg, border: `1px solid ${theme.cardBorder}` }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: theme.accent }}>
                        Pré-Agendamento VIP
                      </h4>
                      <p className="text-[10px]" style={{ color: theme.textMuted }}>
                        Escolha seu procedimento e confirme pelo WhatsApp
                      </p>
                    </div>
                    <button
                      onClick={() => setBookingModalOpen(false)}
                      className="p-1 rounded-full text-neutral-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    <div>
                      <label className="text-[10px] block mb-1" style={{ color: theme.textMuted }}>Seu Nome</label>
                      <input
                        type="text"
                        placeholder="Como podemos te chamar?"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] block mb-1" style={{ color: theme.textMuted }}>Procedimento / Serviço</label>
                      <select
                        value={bookingForm.service}
                        onChange={(e) => setBookingForm(f => ({ ...f, service: e.target.value }))}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                      >
                        {data.services.items.map(s => (
                          <option key={s.id} value={s.name}>{s.name} ({s.price})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      recordWhatsappClick();
                      setBookingModalOpen(false);
                    }}
                    className="w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition hover:opacity-95"
                    style={{ background: theme.accent, color: '#000' }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirmar via WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            {/* FLOATING WHATSAPP BUTTON ON MOBILE VIEWPORT */}
            {data.profile.whatsapp && (
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                onClick={() => recordWhatsappClick()}
                className="absolute bottom-4 right-4 z-40 w-11 h-11 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer border-2 border-white/20 animate-bounce"
                title="Falar no WhatsApp"
              >
                <WhatsAppIcon className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
  );
}
