import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import {
  Sparkles,
  Smartphone,
  Copy,
  Download,
  Calendar,
  MessageCircle,
  Instagram,
  MapPin,
  Heart,
  TrendingUp,
  HelpCircle,
  Palette,
  Layers,
  User,
  Star,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Maximize2,
  ArrowLeft,
  ArrowRight,
  Grid,
  Plus,
  Trash2,
  Image as ImageIcon,
  SlidersHorizontal,
  BellRing,
  Code,
  Tag,
  Send,
  X,
  Target,
  Upload,
  Briefcase,
  GraduationCap,
  Scale,
  ListOrdered,
  Users,
  Navigation,
  Filter,
  CheckCircle2,
  Search,
  Scissors,
  Globe,
  ShieldCheck,
  AlertCircle,
  CalendarClock,
  Power,
  Edit3,
  Save,
  ExternalLink,
  Lock,
  RefreshCw,
  CreditCard,
  Server,
  Eye,
  DollarSign,
  AlertTriangle,
  FileText,
  Printer,
  QrCode,
  Folder,
  FolderArchive
} from 'lucide-react';

const WHATSAPP_SVG_STRING = `<svg style="width:20px;height:20px;display:inline-block;vertical-align:middle;fill:currentColor;" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/><path d="M12 1c-6.075 0-11 4.925-11 11 0 2.102.589 4.066 1.606 5.744l-1.606 5.256 5.438-1.57c1.613.918 3.479 1.442 5.562 1.442 6.075 0 11-4.925 11-11s-4.925-11-11-11zm0 19.825c-1.875 0-3.626-.543-5.111-1.479l-.366-.23-3.232.933.951-3.111-.252-.387c-1.047-1.606-1.615-3.501-1.615-5.551 0-5.132 4.173-9.305 9.305-9.305 5.132 0 9.305 4.173 9.305 9.305 0 5.132-4.173 9.305-9.305 9.305z"/></svg>`;
const INSTAGRAM_SVG_STRING = `<svg style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`;
const CALENDAR_SVG_STRING = `<svg style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;

export function WhatsAppIcon({ className = "w-5 h-5", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={`inline-block shrink-0 ${className}`} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 1c-6.075 0-11 4.925-11 11 0 2.102.589 4.066 1.606 5.744l-1.606 5.256 5.438-1.57c1.613.918 3.479 1.442 5.562 1.442 6.075 0 11-4.925 11-11s-4.925-11-11-11zm0 19.825c-1.875 0-3.626-.543-5.111-1.479l-.366-.23-3.232.933.951-3.111-.252-.387c-1.047-1.606-1.615-3.501-1.615-5.551 0-5.132 4.173-9.305 9.305-9.305 5.132 0 9.305 4.173 9.305 9.305 0 5.132-4.173 9.305-9.305 9.305z"/>
    </svg>
  );
}

export function InstagramIcon({ className = "w-5 h-5", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={`inline-block shrink-0 ${className}`} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export function CalendarIcon({ className = "w-5 h-5", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={`inline-block shrink-0 ${className}`} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

// --- THEME PRESETS AMPLIADOS COM OS NOVOS MODELOS ---
const THEMES: Record<string, {
  id: string;
  name: string;
  badge: string;
  category: string;
  keywords?: string;
  bg: string;
  textMain: string;
  textMuted: string;
  accent: string;
  cardBg: string;
  cardText: string;
  cardSubtext: string;
  cardBorder: string;
  socialBg: string;
  socialBorder: string;
  socialText: string;
  fontHeadline: string;
  fontScript: string;
  iconBg: string;
  iconColor: string;
  pillShadow: string;
  glowColor: string;
}> = {
  darkGold: {
    id: 'darkGold',
    name: 'Dark Luxury Gold',
    badge: 'Larissa Almeida (Beauty)',
    category: 'Beleza & Unhas',
    bg: '#0c0b0b',
    textMain: '#ffffff',
    textMuted: '#c5b49f',
    accent: '#d4af37',
    cardBg: 'linear-gradient(145deg, #f5ede4 0%, #dfd3c3 100%)',
    cardText: '#2a241e',
    cardSubtext: '#6d6154',
    cardBorder: 'rgba(212, 175, 55, 0.35)',
    socialBg: 'rgba(255, 255, 255, 0.08)',
    socialBorder: 'rgba(212, 175, 55, 0.4)',
    socialText: '#e8d8be',
    fontHeadline: 'Playfair Display',
    fontScript: 'Italianno',
    iconBg: '#eddcca',
    iconColor: '#7a5a2e',
    pillShadow: '0 8px 24px -4px rgba(0,0,0,0.5)',
    glowColor: 'rgba(212, 175, 55, 0.22)',
  },
  navyLaw: {
    id: 'navyLaw',
    name: 'Navy Royal & Gold',
    badge: 'Dra. Marina (Advocacia & Executivo)',
    category: 'Jurídico & Executivo',
    bg: '#0f172a',
    textMain: '#f8fafc',
    textMuted: '#94a3b8',
    accent: '#e2b857',
    cardBg: '#ffffff',
    cardText: '#0f172a',
    cardSubtext: '#64748b',
    cardBorder: 'rgba(226, 184, 87, 0.4)',
    socialBg: 'rgba(226, 184, 87, 0.12)',
    socialBorder: 'rgba(226, 184, 87, 0.35)',
    socialText: '#f1d58a',
    fontHeadline: 'Cinzel',
    fontScript: 'Italianno',
    iconBg: '#0f172a',
    iconColor: '#e2b857',
    pillShadow: '0 8px 24px -4px rgba(0,0,0,0.4)',
    glowColor: 'rgba(226, 184, 87, 0.2)',
  },
  warmMentorship: {
    id: 'warmMentorship',
    name: 'Warm Bronze Mentoria',
    badge: 'Mariana Carvalho (Mentora & Cursos)',
    category: 'Mentoria & Cursos',
    bg: '#1c1613',
    textMain: '#faf6f0',
    textMuted: '#bda89b',
    accent: '#d99f69',
    cardBg: 'linear-gradient(135deg, #f7efe6 0%, #e8d7c3 100%)',
    cardText: '#261b14',
    cardSubtext: '#705747',
    cardBorder: 'rgba(217, 159, 105, 0.35)',
    socialBg: 'rgba(217, 159, 105, 0.14)',
    socialBorder: 'rgba(217, 159, 105, 0.35)',
    socialText: '#e8bb92',
    fontHeadline: 'Playfair Display',
    fontScript: 'Italianno',
    iconBg: '#ead7c2',
    iconColor: '#8a522a',
    pillShadow: '0 10px 24px -6px rgba(0,0,0,0.45)',
    glowColor: 'rgba(217, 159, 105, 0.25)',
  },
  rubyImperial: {
    id: 'rubyImperial',
    name: 'Ruby Imperial',
    badge: 'Janne Campelo (Sobrancelhas & Poder)',
    category: 'Beleza & Alta Conversão',
    bg: '#0a0304',
    textMain: '#ffffff',
    textMuted: '#fca5a5',
    accent: '#e11d48',
    cardBg: 'linear-gradient(135deg, #881337 0%, #4c0519 100%)',
    cardText: '#ffffff',
    cardSubtext: '#fecdd3',
    cardBorder: 'rgba(225, 29, 72, 0.5)',
    socialBg: 'rgba(225, 29, 72, 0.15)',
    socialBorder: 'rgba(225, 29, 72, 0.45)',
    socialText: '#fda4af',
    fontHeadline: 'Playfair Display',
    fontScript: 'Italianno',
    iconBg: '#be123c',
    iconColor: '#ffffff',
    pillShadow: '0 8px 24px -4px rgba(190, 18, 60, 0.35)',
    glowColor: 'rgba(225, 29, 72, 0.25)',
  },
  terracottaWarm: {
    id: 'terracottaWarm',
    name: 'Terracotta & Linho',
    badge: 'Martina Bianchi (Psicologia & Saúde)',
    category: 'Saúde & Psicologia',
    bg: '#fcfaf6',
    textMain: '#291d17',
    textMuted: '#78645a',
    accent: '#a0583b',
    cardBg: '#8c4528',
    cardText: '#ffffff',
    cardSubtext: '#f2ded7',
    cardBorder: 'rgba(140, 69, 40, 0.3)',
    socialBg: 'rgba(140, 69, 40, 0.1)',
    socialBorder: 'rgba(140, 69, 40, 0.3)',
    socialText: '#8c4528',
    fontHeadline: 'Cormorant Garamond',
    fontScript: 'Italianno',
    iconBg: '#f2ded7',
    iconColor: '#8c4528',
    pillShadow: '0 8px 20px -3px rgba(140, 69, 40, 0.2)',
    glowColor: 'rgba(160, 88, 59, 0.2)',
  },
  pinkGlam: {
    id: 'pinkGlam',
    name: 'Pink Glam Acetinado',
    badge: 'Hellen Marques (Moda & Lash)',
    category: 'Moda & Juventude',
    bg: '#fdf2f4',
    textMain: '#3f111d',
    textMuted: '#8b4b5a',
    accent: '#e11d74',
    cardBg: '#ffffff',
    cardText: '#4c1d29',
    cardSubtext: '#834b58',
    cardBorder: 'rgba(225, 29, 116, 0.25)',
    socialBg: 'rgba(225, 29, 116, 0.1)',
    socialBorder: 'rgba(225, 29, 116, 0.3)',
    socialText: '#be185d',
    fontHeadline: 'Playfair Display',
    fontScript: 'Italianno',
    iconBg: '#fce7ee',
    iconColor: '#be185d',
    pillShadow: '0 8px 20px -3px rgba(225, 29, 116, 0.15)',
    glowColor: 'rgba(225, 29, 116, 0.2)',
  },
  champagneNude: {
    id: 'champagneNude',
    name: 'Champagne Minimal Nude',
    badge: 'Fernanda Marcolin (Clean)',
    category: 'Consultoria & Estética',
    bg: '#f7f4ed',
    textMain: '#24211e',
    textMuted: '#797268',
    accent: '#a8947a',
    cardBg: 'linear-gradient(145deg, #ffffff 0%, #f1ebe0 100%)',
    cardText: '#26221c',
    cardSubtext: '#766c5f',
    cardBorder: 'rgba(168, 148, 122, 0.3)',
    socialBg: 'rgba(168, 148, 122, 0.1)',
    socialBorder: 'rgba(168, 148, 122, 0.35)',
    socialText: '#4e4337',
    fontHeadline: 'Cormorant Garamond',
    fontScript: 'Italianno',
    iconBg: '#e6decb',
    iconColor: '#534739',
    pillShadow: '0 8px 24px -4px rgba(120, 105, 85, 0.14)',
    glowColor: 'rgba(168, 148, 122, 0.22)',
  },
  barberVintage: {
    id: 'barberVintage',
    name: 'Vintage Barber Club',
    badge: 'Couro, Carvão & Whiskey Gold',
    category: 'Barbearia & Grooming',
    keywords: 'barbearia barbeiro corte degradê barba masculino navalha vintage club whiskey couro',
    bg: '#12100e',
    textMain: '#f5efe6',
    textMuted: '#a89984',
    accent: '#d97706',
    cardBg: 'linear-gradient(145deg, #211c18 0%, #161310 100%)',
    cardText: '#f5efe6',
    cardSubtext: '#b8a996',
    cardBorder: 'rgba(217, 119, 6, 0.4)',
    socialBg: 'rgba(217, 119, 6, 0.12)',
    socialBorder: 'rgba(217, 119, 6, 0.35)',
    socialText: '#fbbf24',
    fontHeadline: 'Cinzel',
    fontScript: 'Italianno',
    iconBg: '#2c2219',
    iconColor: '#f59e0b',
    pillShadow: '0 10px 28px -5px rgba(0, 0, 0, 0.65)',
    glowColor: 'rgba(217, 119, 6, 0.26)',
  },
  barberRoyal: {
    id: 'barberRoyal',
    name: "Gentlemen's Royal Barber",
    badge: 'Azul Naval, Bronze & Marfim',
    category: 'Barbearia & Grooming',
    keywords: 'barbearia barbeiro gentleman royal barba cabelo masculino clássico bronze azul',
    bg: '#0b111e',
    textMain: '#f8fafc',
    textMuted: '#94a3b8',
    accent: '#c88a4b',
    cardBg: 'linear-gradient(145deg, #f8f5f0 0%, #e9e1d4 100%)',
    cardText: '#141821',
    cardSubtext: '#525866',
    cardBorder: 'rgba(200, 138, 75, 0.45)',
    socialBg: 'rgba(200, 138, 75, 0.14)',
    socialBorder: 'rgba(200, 138, 75, 0.38)',
    socialText: '#e2b079',
    fontHeadline: 'Playfair Display',
    fontScript: 'Italianno',
    iconBg: '#162035',
    iconColor: '#c88a4b',
    pillShadow: '0 10px 26px -4px rgba(0, 0, 0, 0.5)',
    glowColor: 'rgba(200, 138, 75, 0.28)',
  },
  barberUrban: {
    id: 'barberUrban',
    name: 'Urban Fade & Beard Studio',
    badge: 'Black Matte & Âmbar Neon',
    category: 'Barbearia & Grooming',
    keywords: 'barbearia barbeiro fade degradê moderno urbano black dark studio masculino corte',
    bg: '#09090b',
    textMain: '#fafafa',
    textMuted: '#a1a1aa',
    accent: '#f59e0b',
    cardBg: 'linear-gradient(145deg, #18181b 0%, #101013 100%)',
    cardText: '#fafafa',
    cardSubtext: '#a1a1aa',
    cardBorder: 'rgba(245, 158, 11, 0.35)',
    socialBg: 'rgba(245, 158, 11, 0.1)',
    socialBorder: 'rgba(245, 158, 11, 0.3)',
    socialText: '#fbbf24',
    fontHeadline: 'Montserrat',
    fontScript: 'Italianno',
    iconBg: '#27272a',
    iconColor: '#fbbf24',
    pillShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.7)',
    glowColor: 'rgba(245, 158, 11, 0.25)',
  },
  barberEmerald: {
    id: 'barberEmerald',
    name: 'Emerald & Gold Barber',
    badge: 'Verde Esmeralda Deep & Ouro',
    category: 'Barbearia & Grooming',
    keywords: 'barbearia barbeiro esmeralda verde ouro luxo grooming masculino navalha',
    bg: '#0a1410',
    textMain: '#f3f7f4',
    textMuted: '#94a89d',
    accent: '#eab308',
    cardBg: 'linear-gradient(145deg, #13241c 0%, #0c1712 100%)',
    cardText: '#f3f7f4',
    cardSubtext: '#a8bcaf',
    cardBorder: 'rgba(234, 179, 8, 0.4)',
    socialBg: 'rgba(234, 179, 8, 0.12)',
    socialBorder: 'rgba(234, 179, 8, 0.35)',
    socialText: '#fde047',
    fontHeadline: 'Cinzel',
    fontScript: 'Italianno',
    iconBg: '#1b3328',
    iconColor: '#eab308',
    pillShadow: '0 10px 28px -5px rgba(0, 0, 0, 0.65)',
    glowColor: 'rgba(234, 179, 8, 0.25)',
  },
  roseGoldQuartz: {
    id: 'roseGoldQuartz',
    name: 'Rose Gold & Quartzo',
    badge: 'Nude Rosé, Quartzo & Ouro Rosa',
    category: 'Beleza & Unhas',
    keywords: 'unhas beleza rosé rosa quartzo ouro rosa nude clean nail designer',
    bg: '#fdf8f9',
    textMain: '#3b1d28',
    textMuted: '#8c5d6e',
    accent: '#e11d74',
    cardBg: '#ffffff',
    cardText: '#3b1d28',
    cardSubtext: '#754b5a',
    cardBorder: 'rgba(225, 29, 116, 0.3)',
    socialBg: 'rgba(225, 29, 116, 0.1)',
    socialBorder: 'rgba(225, 29, 116, 0.3)',
    socialText: '#be185d',
    fontHeadline: 'Playfair Display',
    fontScript: 'Italianno',
    iconBg: '#fce7ee',
    iconColor: '#be185d',
    pillShadow: '0 8px 24px -4px rgba(225, 29, 116, 0.15)',
    glowColor: 'rgba(225, 29, 116, 0.2)',
  },
  emeraldNails: {
    id: 'emeraldNails',
    name: 'Esmeralda & Ouro Imperial',
    badge: 'Verde Nobre & Dourado Mármore',
    category: 'Beleza & Unhas',
    keywords: 'unhas beleza esmeralda verde ouro dark luxo lash nail',
    bg: '#080c0a',
    textMain: '#f2f7f4',
    textMuted: '#94a89e',
    accent: '#10b981',
    cardBg: 'linear-gradient(145deg, #0f1f18 0%, #09120e 100%)',
    cardText: '#f2f7f4',
    cardSubtext: '#a8bcaf',
    cardBorder: 'rgba(16, 185, 129, 0.38)',
    socialBg: 'rgba(16, 185, 129, 0.12)',
    socialBorder: 'rgba(16, 185, 129, 0.35)',
    socialText: '#34d399',
    fontHeadline: 'Playfair Display',
    fontScript: 'Italianno',
    iconBg: '#152b22',
    iconColor: '#34d399',
    pillShadow: '0 10px 28px -5px rgba(0, 0, 0, 0.65)',
    glowColor: 'rgba(16, 185, 129, 0.25)',
  },
  orchidGlow: {
    id: 'orchidGlow',
    name: 'Orquídea Neon & Matte',
    badge: 'Magenta Vibrante & Black Matte',
    category: 'Beleza & Alta Conversão',
    keywords: 'beleza lash sobrancelhas orquídea magenta neon dark lash alta conversão',
    bg: '#0d070e',
    textMain: '#faf5fb',
    textMuted: '#c084fc',
    accent: '#d946ef',
    cardBg: 'linear-gradient(145deg, #240f28 0%, #120714 100%)',
    cardText: '#faf5fb',
    cardSubtext: '#d8b4fe',
    cardBorder: 'rgba(217, 70, 239, 0.4)',
    socialBg: 'rgba(217, 70, 239, 0.15)',
    socialBorder: 'rgba(217, 70, 239, 0.4)',
    socialText: '#e879f9',
    fontHeadline: 'Playfair Display',
    fontScript: 'Italianno',
    iconBg: '#3b1640',
    iconColor: '#e879f9',
    pillShadow: '0 10px 28px -5px rgba(0, 0, 0, 0.65)',
    glowColor: 'rgba(217, 70, 239, 0.28)',
  },
  pearlChampagne: {
    id: 'pearlChampagne',
    name: 'Pérola, Champanhe & Ouro',
    badge: 'Champanhe Iluminado & Nude Luxo',
    category: 'Beleza & Alta Conversão',
    keywords: 'pérola champanhe ouro beleza lash sobrancelhas nude clean',
    bg: '#fbf8f3',
    textMain: '#2b241e',
    textMuted: '#7d6f63',
    accent: '#c8963e',
    cardBg: 'linear-gradient(145deg, #ffffff 0%, #f4ede2 100%)',
    cardText: '#2b241e',
    cardSubtext: '#75685d',
    cardBorder: 'rgba(200, 150, 62, 0.35)',
    socialBg: 'rgba(200, 150, 62, 0.12)',
    socialBorder: 'rgba(200, 150, 62, 0.35)',
    socialText: '#a37528',
    fontHeadline: 'Playfair Display',
    fontScript: 'Italianno',
    iconBg: '#ede3d5',
    iconColor: '#a37528',
    pillShadow: '0 8px 24px -4px rgba(120, 105, 85, 0.15)',
    glowColor: 'rgba(200, 150, 62, 0.22)',
  },
  bordeauxExecutive: {
    id: 'bordeauxExecutive',
    name: 'Vinho Bordô & Ouro Velho',
    badge: 'Bordô Nobre, Titânio & Âmbar',
    category: 'Jurídico & Executivo',
    keywords: 'jurídico advocacia bordô vinho ouro executivo direito nobre',
    bg: '#170a0e',
    textMain: '#fcf7f8',
    textMuted: '#c99ca8',
    accent: '#f59e0b',
    cardBg: 'linear-gradient(145deg, #29121a 0%, #17090e 100%)',
    cardText: '#fcf7f8',
    cardSubtext: '#d4b2bd',
    cardBorder: 'rgba(245, 158, 11, 0.4)',
    socialBg: 'rgba(245, 158, 11, 0.12)',
    socialBorder: 'rgba(245, 158, 11, 0.35)',
    socialText: '#fbbf24',
    fontHeadline: 'Cinzel',
    fontScript: 'Italianno',
    iconBg: '#3a1a25',
    iconColor: '#fbbf24',
    pillShadow: '0 10px 28px -5px rgba(0, 0, 0, 0.65)',
    glowColor: 'rgba(245, 158, 11, 0.25)',
  },
  charcoalLaw: {
    id: 'charcoalLaw',
    name: 'Graphite & Titanium Law',
    badge: 'Grafite Minimalista & Prata',
    category: 'Jurídico & Executivo',
    keywords: 'jurídico advocacia grafite cinza titanium prata executivo minimalista',
    bg: '#111827',
    textMain: '#f9fafb',
    textMuted: '#9ca3af',
    accent: '#38bdf8',
    cardBg: 'linear-gradient(145deg, #1f2937 0%, #111827 100%)',
    cardText: '#f9fafb',
    cardSubtext: '#9ca3af',
    cardBorder: 'rgba(56, 189, 248, 0.35)',
    socialBg: 'rgba(56, 189, 248, 0.12)',
    socialBorder: 'rgba(56, 189, 248, 0.35)',
    socialText: '#38bdf8',
    fontHeadline: 'Cinzel',
    fontScript: 'Italianno',
    iconBg: '#1f2937',
    iconColor: '#38bdf8',
    pillShadow: '0 10px 28px -5px rgba(0, 0, 0, 0.55)',
    glowColor: 'rgba(56, 189, 248, 0.25)',
  },
  electricCyanMentorship: {
    id: 'electricCyanMentorship',
    name: 'Cyber Cyan High-Ticket',
    badge: 'Azul Elétrico & Titânio Tech',
    category: 'Mentoria & Cursos',
    keywords: 'mentoria cursos cyan azul elétrico tech digital high-ticket autoridade',
    bg: '#030712',
    textMain: '#f9fafb',
    textMuted: '#94a3b8',
    accent: '#06b6d4',
    cardBg: 'linear-gradient(145deg, #0f172a 0%, #030712 100%)',
    cardText: '#f9fafb',
    cardSubtext: '#94a3b8',
    cardBorder: 'rgba(6, 182, 212, 0.4)',
    socialBg: 'rgba(6, 182, 212, 0.12)',
    socialBorder: 'rgba(6, 182, 212, 0.38)',
    socialText: '#22d3ee',
    fontHeadline: 'Montserrat',
    fontScript: 'Italianno',
    iconBg: '#0e7490',
    iconColor: '#ffffff',
    pillShadow: '0 10px 28px -5px rgba(0, 0, 0, 0.7)',
    glowColor: 'rgba(6, 182, 212, 0.28)',
  },
  terracottaMentor: {
    id: 'terracottaMentor',
    name: 'Terracota Warm & Linho',
    badge: 'Terracota Queimado & Dourado Warm',
    category: 'Mentoria & Cursos',
    keywords: 'mentoria cursos terracota bronze quente terra linho autoridade',
    bg: '#18110e',
    textMain: '#faf5f0',
    textMuted: '#c2a899',
    accent: '#f97316',
    cardBg: 'linear-gradient(145deg, #281c17 0%, #160f0c 100%)',
    cardText: '#faf5f0',
    cardSubtext: '#cca895',
    cardBorder: 'rgba(249, 115, 22, 0.4)',
    socialBg: 'rgba(249, 115, 22, 0.12)',
    socialBorder: 'rgba(249, 115, 22, 0.35)',
    socialText: '#fb923c',
    fontHeadline: 'Playfair Display',
    fontScript: 'Italianno',
    iconBg: '#3d251a',
    iconColor: '#fb923c',
    pillShadow: '0 10px 28px -5px rgba(0, 0, 0, 0.65)',
    glowColor: 'rgba(249, 115, 22, 0.26)',
  },
  sageMind: {
    id: 'sageMind',
    name: 'Sálvia & Eucalipto Calmo',
    badge: 'Verde Sálvia & Mármore Clean',
    category: 'Saúde & Psicologia',
    keywords: 'psicologia saúde sálvia verde calmo terapia acolhimento clean',
    bg: '#f4f8f5',
    textMain: '#1c2d24',
    textMuted: '#587364',
    accent: '#15803d',
    cardBg: '#ffffff',
    cardText: '#1c2d24',
    cardSubtext: '#516c5d',
    cardBorder: 'rgba(21, 128, 61, 0.25)',
    socialBg: 'rgba(21, 128, 61, 0.08)',
    socialBorder: 'rgba(21, 128, 61, 0.25)',
    socialText: '#15803d',
    fontHeadline: 'Cormorant Garamond',
    fontScript: 'Italianno',
    iconBg: '#e2f0e7',
    iconColor: '#15803d',
    pillShadow: '0 8px 20px -3px rgba(21, 128, 61, 0.12)',
    glowColor: 'rgba(21, 128, 61, 0.18)',
  },
  lavenderCalm: {
    id: 'lavenderCalm',
    name: 'Lavanda Suave & Acolhimento',
    badge: 'Lavanda Acolhedora & Nude',
    category: 'Saúde & Psicologia',
    keywords: 'psicologia saúde lavanda roxo suave terapia acolhimento clean',
    bg: '#f8f6fc',
    textMain: '#271e38',
    textMuted: '#6d5a8c',
    accent: '#8b5cf6',
    cardBg: '#ffffff',
    cardText: '#271e38',
    cardSubtext: '#685587',
    cardBorder: 'rgba(139, 92, 246, 0.25)',
    socialBg: 'rgba(139, 92, 246, 0.08)',
    socialBorder: 'rgba(139, 92, 246, 0.25)',
    socialText: '#7c3aed',
    fontHeadline: 'Plus Jakarta Sans',
    fontScript: 'Italianno',
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
    pillShadow: '0 8px 20px -3px rgba(139, 92, 246, 0.12)',
    glowColor: 'rgba(139, 92, 246, 0.18)',
  },
  blackContrastFashion: {
    id: 'blackContrastFashion',
    name: 'Black Contrast & Silver',
    badge: 'Preto Absoluto, Branco & Prata',
    category: 'Moda & Juventude',
    keywords: 'moda boutique preto black prata streetwear contraste estilo',
    bg: '#000000',
    textMain: '#ffffff',
    textMuted: '#a1a1aa',
    accent: '#facc15',
    cardBg: 'linear-gradient(145deg, #18181b 0%, #09090b 100%)',
    cardText: '#ffffff',
    cardSubtext: '#a1a1aa',
    cardBorder: 'rgba(250, 204, 21, 0.4)',
    socialBg: 'rgba(255, 255, 255, 0.1)',
    socialBorder: 'rgba(250, 204, 21, 0.35)',
    socialText: '#facc15',
    fontHeadline: 'Montserrat',
    fontScript: 'Italianno',
    iconBg: '#27272a',
    iconColor: '#facc15',
    pillShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.8)',
    glowColor: 'rgba(250, 204, 21, 0.25)',
  },
  sunsetPeach: {
    id: 'sunsetPeach',
    name: 'Pêssego Dourado & Coral',
    badge: 'Pêssego Warm & Dourado Solar',
    category: 'Moda & Juventude',
    keywords: 'moda pêssego coral dourado boutique primavera verão estilo',
    bg: '#fdf6f2',
    textMain: '#3d1a10',
    textMuted: '#8f5240',
    accent: '#f97316',
    cardBg: '#ffffff',
    cardText: '#3d1a10',
    cardSubtext: '#824939',
    cardBorder: 'rgba(249, 115, 22, 0.28)',
    socialBg: 'rgba(249, 115, 22, 0.08)',
    socialBorder: 'rgba(249, 115, 22, 0.28)',
    socialText: '#ea580c',
    fontHeadline: 'Playfair Display',
    fontScript: 'Italianno',
    iconBg: '#ffedd5',
    iconColor: '#ea580c',
    pillShadow: '0 8px 20px -3px rgba(249, 115, 22, 0.15)',
    glowColor: 'rgba(249, 115, 22, 0.2)',
  },
  carraraGold: {
    id: 'carraraGold',
    name: 'Carrara & Ouro Rosa',
    badge: 'Mármore Carrara & Dourado Rose',
    category: 'Consultoria & Estética',
    keywords: 'estética clínica mármore carrara ouro rosa harmonização boutique clean',
    bg: '#faf9f6',
    textMain: '#211f1c',
    textMuted: '#70685e',
    accent: '#d97706',
    cardBg: '#ffffff',
    cardText: '#211f1c',
    cardSubtext: '#696157',
    cardBorder: 'rgba(217, 119, 6, 0.3)',
    socialBg: 'rgba(217, 119, 6, 0.08)',
    socialBorder: 'rgba(217, 119, 6, 0.3)',
    socialText: '#b45309',
    fontHeadline: 'Cormorant Garamond',
    fontScript: 'Italianno',
    iconBg: '#fef3c7',
    iconColor: '#b45309',
    pillShadow: '0 8px 20px -3px rgba(217, 119, 6, 0.12)',
    glowColor: 'rgba(217, 119, 6, 0.18)',
  },
  bronzeGlowEstetica: {
    id: 'bronzeGlowEstetica',
    name: 'Bronze Acetinado & Cobre',
    badge: 'Bronze Iluminado & Cobre Nobre',
    category: 'Consultoria & Estética',
    keywords: 'estética bronze cobre dark clínica harmonização glow luxo',
    bg: '#171310',
    textMain: '#f7f2eb',
    textMuted: '#ad9c8c',
    accent: '#eab308',
    cardBg: 'linear-gradient(145deg, #261f1a 0%, #171310 100%)',
    cardText: '#f7f2eb',
    cardSubtext: '#bfae9e',
    cardBorder: 'rgba(234, 179, 8, 0.38)',
    socialBg: 'rgba(234, 179, 8, 0.12)',
    socialBorder: 'rgba(234, 179, 8, 0.35)',
    socialText: '#fde047',
    fontHeadline: 'Playfair Display',
    fontScript: 'Italianno',
    iconBg: '#33271f',
    iconColor: '#fde047',
    pillShadow: '0 10px 28px -5px rgba(0, 0, 0, 0.65)',
    glowColor: 'rgba(234, 179, 8, 0.25)',
  }
};

const PHOTO_FILTERS = [
  { id: 'none', name: 'Natural', css: 'none' },
  { id: 'noir', name: 'Noir P&B Suave', css: 'grayscale(100%) contrast(108%) brightness(96%)' },
  { id: 'warm', name: 'Warm Glow', css: 'sepia(25%) saturate(120%) brightness(102%)' },
  { id: 'editorial', name: 'Editorial Séphia', css: 'sepia(50%) contrast(105%) brightness(95%)' },
  { id: 'muted', name: 'Clean Muted', css: 'contrast(92%) saturate(85%) brightness(104%)' }
];

const FONT_OPTIONS = [
  { id: 'Playfair Display', label: 'Playfair Display (Clássica e Imponente)' },
  { id: 'Cormorant Garamond', label: 'Cormorant Garamond (Editorial de Moda)' },
  { id: 'Cinzel', label: 'Cinzel (Elegância Romana e Jurídico)' },
  { id: 'Montserrat', label: 'Montserrat (Moderna e Minimalista)' },
  { id: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans (Geométrica e Limpa)' }
];

// Initial State Configuration Ampliado
const INITIAL_DATA = {
  theme: 'navyLaw',
  customColors: {
    enabled: false,
    bg: '#0f172a',
    textMain: '#ffffff',
    textMuted: '#94a3b8',
    accent: '#e2b857',
    cardBg: '#ffffff',
    cardText: '#0f172a',
    cardBorder: '#e2b857',
    socialBg: '#1e293b',
    glowColor: '#e2b857'
  },
  styling: {
    fontFamily: 'Cinzel',
    borderRadius: 20,
    glassmorphism: true,
    metallicBorders: true,
    spotlightGlow: true,
    photoHeight: 390,
    photoScale: 100,
    photoPosY: 25,
    vignetteIntensity: 85,
    photoFilter: 'none',
    wrapperAlignment: 'flex-start',
  },
  announcement: {
    enabled: true,
    badge: 'CONSULTORIA VIP',
    text: 'Agenda de consultorias e atendimentos aberta.',
    link: '#agendar'
  },
  profile: {
    name: 'DRA. MARINA ALMEIDA',
    title: 'ADVOCACIA ESTRATÉGICA',
    tagline: 'Defesa de direitos com atendimento personalizado e humanizado.',
    cursivePhrase: 'Compromisso, ética e segurança para você.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    aboutPhotoUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=600',
    whatsapp: '5511999999999',
    instagram: 'dramarinaalmeida',
    location: 'Av. Paulista, 1200 - Bela Vista, São Paulo - SP',
    mapsUrl: 'https://maps.google.com'
  },
  metrics: {
    enabled: true,
    stat1Value: '+500',
    stat1Label: 'CLIENTES',
    stat2Value: '8 anos',
    stat2Label: 'DE EXPERIÊNCIA',
    stat3Value: '95%',
    stat3Label: 'DE SATISFAÇÃO'
  },
  actionCards: [
    {
      id: 'cta-1',
      title: 'MENTORIA & CONSULTORIA VIP',
      subtitle: 'Atendimento presencial ou online com acompanhamento estratégico.',
      icon: 'Calendar',
      linkType: 'booking',
      url: '#booking',
      whatsappMessage: 'Olá! Gostaria de agendar uma consulta.',
      openInNewTab: true,
      animation: 'pulse-glow',
      variant: 'default',
      badgeText: 'AGENDA ABERTA',
      customBg: '#e2b857',
      customText: '#0f172a',
      bgImage: '',
      imagePosition: 'right',
      cardImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      imageFitStyle: 'popout',
      imageSize: 96,
      ctaActionText: 'AGENDAR AGORA'
    },
    {
      id: 'cta-2',
      title: 'GUIA ESTRATÉGICO & PLANEJAMENTO',
      subtitle: 'Soluções completas e materiais exclusivos passo a passo.',
      icon: 'Scale',
      linkType: 'catalogo',
      url: '#catalogo',
      whatsappMessage: 'Olá! Gostaria de informações sobre o Guia Estratégico.',
      openInNewTab: false,
      animation: 'none',
      variant: 'default',
      badgeText: '',
      customBg: '#ffffff',
      customText: '#0f172a',
      bgImage: '',
      imagePosition: 'left',
      cardImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400',
      imageFitStyle: 'framed',
      imageSize: 84,
      ctaActionText: 'BAIXE AGORA'
    },
    {
      id: 'cta-3',
      title: 'DIREITO PREVIDENCIÁRIO',
      subtitle: 'Aposentadorias, benefícios e planejamento previdenciário.',
      icon: 'Briefcase',
      linkType: 'custom',
      url: 'https://',
      whatsappMessage: 'Olá! Gostaria de informações sobre Direito Previdenciário.',
      openInNewTab: true,
      animation: 'none',
      variant: 'default',
      badgeText: '',
      customBg: '#ffffff',
      customText: '#0f172a',
      bgImage: '',
      imagePosition: 'none',
      cardImage: '',
      imageFitStyle: 'framed',
      imageSize: 84,
      ctaActionText: ''
    },
    {
      id: 'cta-4',
      title: 'FALE COMIGO NO WHATSAPP',
      subtitle: 'Tire dúvidas e receba atendimento personalizado.',
      icon: 'MessageCircle',
      linkType: 'whatsapp',
      url: 'https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20atendimento.',
      whatsappMessage: 'Olá! Vi seu link na bio e gostaria de atendimento personalizado.',
      openInNewTab: true,
      animation: 'shimmer',
      variant: 'default',
      badgeText: 'ONLINE',
      customBg: '#25D366',
      customText: '#000000',
      bgImage: '',
      imagePosition: 'none',
      cardImage: '',
      imageFitStyle: 'framed',
      imageSize: 84,
      ctaActionText: 'CLIQUE AQUI'
    }
  ],
  processSteps: {
    enabled: true,
    headline: 'Como funciona o processo?',
    subtitle: 'Simples, seguro e totalmente transparente em 3 etapas',
    steps: [
      {
        id: 'step-1',
        number: '01',
        title: 'Primeiro Contato & Triagem',
        description: 'Você relata sua necessidade pelo WhatsApp ou formulário e alinhamos a prioridade.'
      },
      {
        id: 'step-2',
        number: '02',
        title: 'Consulta Estratégica',
        description: 'Análise aprofundada da sua situação com plano de ação sob medida.'
      },
      {
        id: 'step-3',
        number: '03',
        title: 'Execução & Acompanhamento',
        description: 'Defesa contínua e comunicação clara em todas as etapas.'
      }
    ]
  },
  studentGrid: {
    enabled: true,
    headline: 'Galeria de Fotos & Resultados',
    subtitle: 'Transformações reais geradas pelo método e registros de alto padrão',
    badge: 'PORTFÓLIO REAL',
    layout: 'grid3' as 'grid3' | 'grid2' | 'mosaic' | 'carousel',
    aspectRatio: 'square' as 'square' | 'portrait' | 'landscape',
    enableLightbox: true,
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
    ]
  },
  locationCard: {
    enabled: true,
    headline: 'Nossa Localização',
    address: 'Av. Paulista, 1200 - Bela Vista, São Paulo - SP',
    buttonLabel: 'Abrir no Google Maps',
    mapsUrl: 'https://maps.google.com'
  },
  services: {
    enabled: true,
    headline: 'Como posso te ajudar',
    subtitle: 'Procedimentos, consultorias e soluções sob medida para o seu objetivo',
    badge: 'CATÁLOGO VIP',
    layout: 'list' as 'list' | 'featured' | 'grid2',
    items: [
      {
        id: 'srv-1',
        name: 'Consultoria Estratégica Individual',
        description: 'Análise completa do seu cenário com orientações práticas imediatas.',
        price: 'R$ 350',
        oldPrice: 'R$ 490',
        duration: '1h30',
        badge: 'MAIS PROCURADO',
        ctaLabel: 'Reservar',
        actionType: 'booking',
        customUrl: '',
        featured: true,
        imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=300'
      },
      {
        id: 'srv-2',
        name: 'Planejamento e Parecer Técnico',
        description: 'Documento fundamentado com plano de ação preventivo ou contencioso.',
        price: 'R$ 780',
        oldPrice: '',
        duration: '3 dias',
        badge: 'EXCLUSIVO',
        ctaLabel: 'Reservar',
        actionType: 'booking',
        customUrl: '',
        featured: false,
        imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=300'
      }
    ] as Array<{
      id: string;
      name: string;
      description: string;
      price: string;
      duration: string;
      imageUrl: string;
      oldPrice?: string;
      badge?: string;
      ctaLabel?: string;
      actionType?: 'booking' | 'whatsapp' | 'link';
      customUrl?: string;
      featured?: boolean;
    }>
  },
  beforeAfter: {
    enabled: false,
    headline: 'Transformação Real',
    subtitle: 'Arraste para comparar o antes e o depois',
    beforeUrl: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=500',
    afterUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500',
  },
  testimonials: {
    enabled: true,
    headline: 'Depoimentos de Clientes',
    items: [
      {
        id: 't-1',
        clientName: 'Dra. Vanessa Mendes',
        city: 'São Paulo - SP',
        text: 'A segurança técnica e clareza da Marina me deram tranquilidade no momento mais decisivo.',
        rating: 5
      },
      {
        id: 't-2',
        clientName: 'Renato Silveira',
        city: 'Campinas - SP',
        text: 'Atendimento impecável, ágil e extremamente humanizado. Recomendo de olhos fechados!',
        rating: 5
      }
    ]
  },
  qualifierFunnel: {
    enabled: true,
    animation: 'shimmer',
    triggerButtonLabel: 'AVALIAÇÃO DE CASO / TRIAGEM VIP',
    triggerButtonSubtitle: 'Descubra a melhor solução para você em 3 perguntas rápidas.',
    headline: 'Triagem Estratégica & Agendamento',
    subtitle: 'Responda para receber um atendimento sob medida e prioritário.',
    questions: [
      {
        id: 'q1',
        title: 'Qual é o seu objetivo principal hoje?',
        options: [
          'Agendar Consulta / Atendimento Individual',
          'Consultoria Estratégica ou Parecer',
          'Mentoria ou Cursos Profissionais',
          'Outra dúvida específica'
        ]
      },
      {
        id: 'q2',
        title: 'Você já realizou este tipo de procedimento ou consultoria antes?',
        options: [
          'Sim, busco um atendimento de padrão superior',
          'Não, é a minha primeira experiência',
          'Ainda estou em fase de pesquisa e planejamento'
        ]
      },
      {
        id: 'q3',
        title: 'Qual é a sua urgência e melhor turno para retorno?',
        options: [
          'Urgente (esta semana) - Período da Manhã',
          'Urgente (esta semana) - Período da Tarde',
          'Próximas semanas com flexibilidade'
        ]
      }
    ]
  },
  aboutMe: {
    enabled: true,
    headline: 'Sobre mim',
    paragraph: 'Com mais de 8 anos de atuação, acredito que a prestação de serviços deve unir excelência técnica e acolhimento humano. Cada pessoa traz uma história única que merece atenção dedicada e soluções assertivas.',
    closingPhrase: 'Sua segurança jurídica, meu compromisso.',
  },
  faq: {
    enabled: true,
    headline: 'Dúvidas Frequentes',
    items: [
      {
        id: 'faq-1',
        question: 'Como funciona a primeira consulta?',
        answer: 'Realizamos um atendimento inicial para entender seu caso a fundo e traçar a melhor estratégia.'
      },
      {
        id: 'faq-2',
        question: 'O atendimento pode ser 100% online?',
        answer: 'Sim, atendemos clientes do Brasil e do exterior por videoconferência com total sigilo e comodidade.'
      },
      {
        id: 'faq-3',
        question: 'Quais áreas você atende?',
        answer: 'Atuação especializada em consultoria jurídica, contratos, planejamento familiar e previdenciário.'
      }
    ]
  },
  conversion: {
    metaPixelId: '',
    googleAnalyticsId: '',
    defaultWhatsappMsg: 'Olá Dra. {nome}, vi sua página e gostaria de informações sobre {servico} para a data de {data}.',
  },
  seo: {
    metaTitle: 'DRA. MARINA ALMEIDA — Advocacia Estratégica & Consultoria VIP',
    metaDescription: 'Atendimento jurídico humanizado e focado em resultados. Agende sua consultoria presencial ou online.',
    ogImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    keywords: 'advogada, consultoria, direito, atendimento vip, advocacia'
  },
  highConversion: {
    enabled: true, // Master Toggle for Option 2 (Can be deactivated!)
    socialProof: {
      enabled: true,
      notifications: [
        { id: 'sp-1', clientName: 'Juliana M.', action: 'agendou Atendimento VIP', timeAgo: 'há 4 min' },
        { id: 'sp-2', clientName: 'Roberto S.', action: 'solicitou orçamento no WhatsApp', timeAgo: 'há 12 min' },
        { id: 'sp-3', clientName: 'Camila K.', action: 'garantiu uma vaga da semana', timeAgo: 'há 28 min' }
      ]
    },
    urgencyTimer: {
      enabled: true,
      headline: '🔥 CONDIÇÃO ESPECIAL DE HOJE',
      subheadline: 'Garanta sua vaga com atendimento prioritário antes que expire:',
      minutes: 14,
      seconds: 52
    },
    embeddedBooking: {
      enabled: false,
      title: '📅 Agendamento Direto na Agenda',
      type: 'cal',
      iframeUrl: 'https://cal.com/demo'
    }
  },
  saasSettings: {
    pixKey: 'contato@luxebio.com.br',
    pixName: 'LuxeBio Studio SaaS',
    pixCity: 'São Paulo - SP',
    autoReminderMsg: 'Olá {cliente}! Lembrete da mensalidade do seu microsite no valor de R$ {valor}. Vencimento: {vencimento}.\n\n🔑 Chave PIX: {pix}\nFavorecido: {nome_pix}'
  }
};

// Safe copy fallback for iframes with blocked Clipboard API permissions
const safeCopyText = async (text: string) => {
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback
    }
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};

// Saved Microsite SaaS Data Structure
export interface SavedMicrosite {
  id: string;
  clientName: string;
  clientPhone?: string;
  clientEmail?: string;
  nicheCategory: string;
  createdAt: string;
  dueDate: string; // YYYY-MM-DD
  monthlyFee: number;
  status: 'active' | 'overdue' | 'disabled';
  updatesThisMonth: number;
  lastUpdated: string;
  domainType: 'subdomain' | 'custom';
  subdomain: string;
  customDomain: string;
  dnsConfigured: boolean;
  sslActive: boolean;
  whatsappClicks?: number;
  pageViews?: number;
  trafficSources?: {
    instagram: number;
    tiktok: number;
    googleMaps: number;
    paidAds: number;
    direct: number;
  };
  data: typeof INITIAL_DATA;
}

const INITIAL_SAVED_SITES: SavedMicrosite[] = [
  {
    id: 'site-1',
    clientName: 'Don Corleone Barber Club',
    clientPhone: '5511988887777',
    clientEmail: 'contato@doncorleone.com.br',
    nicheCategory: 'Barbearia & Grooming',
    createdAt: '2026-09-15',
    dueDate: '2026-11-15',
    monthlyFee: 149.90,
    status: 'active',
    updatesThisMonth: 2,
    lastUpdated: '2026-10-21',
    domainType: 'custom',
    subdomain: 'doncorleone',
    customDomain: 'www.doncorleonebarber.com.br',
    dnsConfigured: true,
    sslActive: true,
    whatsappClicks: 52,
    pageViews: 240,
    trafficSources: { instagram: 110, tiktok: 45, googleMaps: 60, paidAds: 15, direct: 10 },
    data: {
      ...INITIAL_DATA,
      theme: 'barberVintage',
      profile: {
        ...INITIAL_DATA.profile,
        name: 'DON CORLEONE BARBER',
        title: 'BARBEARIA CLÁSSICA & VISAGISMO MASCULINO',
        tagline: 'Cerveja artesanal gelada, toalha quente e precisão na navalha.',
      }
    }
  },
  {
    id: 'site-2',
    clientName: 'Dra. Marina Almeida Advocacia',
    clientPhone: '5511999999999',
    clientEmail: 'marina@almeidaadv.com.br',
    nicheCategory: 'Jurídico & Executivo',
    createdAt: '2026-08-10',
    dueDate: '2026-10-20',
    monthlyFee: 199.90,
    status: 'overdue',
    updatesThisMonth: 4,
    lastUpdated: '2026-10-18',
    domainType: 'custom',
    subdomain: 'dramarina',
    customDomain: 'www.dramarinaalmeida.com.br',
    dnsConfigured: true,
    sslActive: true,
    whatsappClicks: 68,
    pageViews: 380,
    trafficSources: { instagram: 190, tiktok: 30, googleMaps: 90, paidAds: 50, direct: 20 },
    data: INITIAL_DATA,
  },
  {
    id: 'site-3',
    clientName: 'Larissa Almeida Nail Designer',
    clientPhone: '5511977776666',
    clientEmail: 'larissa.nails@gmail.com',
    nicheCategory: 'Beleza & Unhas',
    createdAt: '2026-07-01',
    dueDate: '2026-10-10',
    monthlyFee: 129.90,
    status: 'disabled',
    updatesThisMonth: 0,
    lastUpdated: '2026-09-28',
    domainType: 'subdomain',
    subdomain: 'larissanails',
    customDomain: '',
    dnsConfigured: true,
    sslActive: true,
    whatsappClicks: 18,
    pageViews: 190,
    trafficSources: { instagram: 120, tiktok: 40, googleMaps: 15, paidAds: 0, direct: 15 },
    data: {
      ...INITIAL_DATA,
      theme: 'darkGold',
      profile: {
        ...INITIAL_DATA.profile,
        name: 'LARISSA ALMEIDA NAILS',
        title: 'NAIL DESIGNER & ALONGAMENTO DE LUXO',
      }
    }
  }
];

function SimulatorImage({
  src,
  alt,
  className = '',
  style,
  skeletonClassName = '',
  accentColor = '#d4af37',
  referrerPolicy,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  skeletonClassName?: string;
  accentColor?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setLoaded(false);
    setErrored(false);
    const imgEl = imgRef.current;
    if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
      const timer = setTimeout(() => setLoaded(true), 120);
      return () => clearTimeout(timer);
    }
  }, [src]);

  return (
    <>
      {!loaded && !errored && (
        <div
          className={`absolute inset-0 z-10 skeleton-shimmer flex items-center justify-center transition-opacity duration-300 ${skeletonClassName}`}
          style={
            {
              backgroundColor: 'rgba(24, 24, 27, 0.85)',
              '--skel-shimmer': `${accentColor}30`,
            } as React.CSSProperties
          }
        >
          <div
            className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center animate-pulse"
            style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
          >
            <Sparkles className="w-3 h-3 opacity-70" />
          </div>
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        referrerPolicy={referrerPolicy}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setErrored(true);
          setLoaded(true);
        }}
        className={`${className} transition-opacity duration-500 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={style}
      />
    </>
  );
}

export default function App() {
  const [data, setData] = useState(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState('styling');
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedThemeCategory, setSelectedThemeCategory] = useState('Todos');
  const [themeSearchQuery, setThemeSearchQuery] = useState('');
  const [isSimulatorLoading, setIsSimulatorLoading] = useState(false);
  const simulatorTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerSimulatorSkeleton = (durationMs = 380) => {
    if (simulatorTimerRef.current) {
      clearTimeout(simulatorTimerRef.current);
    }
    setIsSimulatorLoading(true);
    simulatorTimerRef.current = setTimeout(() => {
      setIsSimulatorLoading(false);
    }, durationMs);
  };

  // Saved Microsites Management State
  const [savedSites, setSavedSites] = useState<SavedMicrosite[]>(() => {
    try {
      const raw = localStorage.getItem('luxebio_saved_sites_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_SAVED_SITES;
  });

  const [editingSiteId, setEditingSiteId] = useState<string | null>(null);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [selectedPublishSiteId, setSelectedPublishSiteId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [dashboardSearch, setDashboardSearch] = useState('');
  const [dashboardStatusFilter, setDashboardStatusFilter] = useState('all');
  const [dnsTesting, setDnsTesting] = useState(false);
  const [pdfReportModalOpen, setPdfReportModalOpen] = useState(false);
  const [copiedPdfSummary, setCopiedPdfSummary] = useState(false);
  const [singlePdfSiteId, setSinglePdfSiteId] = useState<string | null>(null);
  const [copiedSinglePdfSummary, setCopiedSinglePdfSummary] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  // Keyboard navigation for photo gallery lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft' && (data.studentGrid?.photos?.length || 0) > 0) {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + data.studentGrid.photos.length) % data.studentGrid.photos.length : null
        );
      }
      if (e.key === 'ArrowRight' && (data.studentGrid?.photos?.length || 0) > 0) {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % data.studentGrid.photos.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, data.studentGrid?.photos]);

  // PIX & Billing Modal State
  const [pixModalOpen, setPixModalOpen] = useState(false);
  const [pixModalSite, setPixModalSite] = useState<SavedMicrosite | null>(null);

  // AI Copywriting Optimizer State
  const [aiCopyModalOpen, setAiCopyModalOpen] = useState(false);
  const [aiCopyTarget, setAiCopyTarget] = useState<{ fieldLabel: string; currentVal: string; applyFn: (text: string) => void } | null>(null);
  const [aiCopyLoading, setAiCopyLoading] = useState(false);
  const [aiCopyOptions, setAiCopyOptions] = useState<Array<{ type: string; text: string }>>([]);

  const openCopyOptimizer = (fieldLabel: string, currentVal: string, applyFn: (text: string) => void) => {
    setAiCopyTarget({ fieldLabel, currentVal, applyFn });
    setAiCopyOptions([]);
    setAiCopyModalOpen(true);
    handleOptimizeCopyText(fieldLabel, currentVal);
  };

  const handleOptimizeCopyText = async (fieldLabel: string, currentVal: string) => {
    setAiCopyLoading(true);
    try {
      const res = await fetch('/api/optimize-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalText: currentVal,
          fieldType: fieldLabel,
          niche: THEMES[data.theme]?.category || 'Geral',
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Erro ao otimizar copy');
      setAiCopyOptions(json.variations || []);
    } catch (err: any) {
      showToast(`❌ ${err.message || 'Erro ao conectar com a IA de Copywriting.'}`);
    } finally {
      setAiCopyLoading(false);
    }
  };

  const sendWhatsappBillingReminder = (site: SavedMicrosite) => {
    const pixKey = data.saasSettings?.pixKey || 'contato@luxebio.com.br';
    const pixName = data.saasSettings?.pixName || 'LuxeBio Studio SaaS';
    const feeFormatted = site.monthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    let msg = `👋 Olá *${site.clientName}*!\n\n`;
    msg += `Lembrete da mensalidade da sua página de alta conversão (*${site.customDomain || site.subdomain + '.luxebio.site'}*).\n\n`;
    msg += `💰 *Valor:* R$ ${feeFormatted}\n`;
    msg += `📅 *Vencimento:* ${site.dueDate}\n\n`;
    msg += `🔑 *Chave PIX:* ${pixKey}\n`;
    msg += `👤 *Favorecido:* ${pixName}\n\n`;
    msg += `Após realizar a transferência, por favor envie o comprovante por aqui para baixa automática. Qualquer dúvida estou à disposição! 🚀`;

    const phone = (site.clientPhone || '').replace(/\D/g, '');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    showToast(`📲 Lembrete de cobrança formatado enviado no WhatsApp de ${site.clientName}!`);
  };

  // AI Generator Modal State
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiStepIndex, setAiStepIndex] = useState(0);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiForm, setAiForm] = useState({
    instagram: '',
    googleMaps: '',
    businessName: '',
    businessNiche: '',
    additionalInfo: '',
  });

  const buildClientSmartMicrosite = () => {
    const cleanInsta = (aiForm.instagram || '').replace('@', '').trim() || 'studiovip';
    const rawName =
      (aiForm.businessName || '').trim() ||
      cleanInsta.replace(/[._-]+/g, ' ').toUpperCase() ||
      'STUDIO VIP';
    const nameUpper = rawName.toUpperCase();
    const nicheRaw = `${aiForm.businessNiche || ''} ${aiForm.additionalInfo || ''} ${rawName}`.toLowerCase();
    const mapsUrl = (aiForm.googleMaps || '').trim() || 'https://maps.google.com';

    const isBeautyLashNail = /c[ií]lio|lash|unha|nail|manicure|fibra|gel|sobrancelha|beleza|studio|est[eé]tica|make|maquiagem|sal[aã]o|cabelo|hair/.test(nicheRaw);
    const isBarber = /barbearia|barber|barba|fade|degrad[eê]|corte masculino|grooming/.test(nicheRaw);
    const isLaw = /advogad|advocacia|jur[ií]dic|direito|oab|escrit[oó]rio|lei/.test(nicheRaw);
    const isHealth = /psic[oó]log|terapia|sa[uú]de|m[eé]dic|odonto|dentista|nutri|fisio|cl[ií]nica/.test(nicheRaw);
    const isMentor = /mentor|curso|treinamento|consultoria|infoproduto|palestrante|coach/.test(nicheRaw);
    const isFashion = /moda|loja|boutique|roupa|look|acess[oó]rio|joia|semijoia/.test(nicheRaw);

    if (isBeautyLashNail) {
      const hasLash = /c[ií]lio|lash/.test(nicheRaw);
      const hasNail = /unha|nail|fibra|gel|manicure/.test(nicheRaw);
      const specialtyTitle =
        hasLash && hasNail
          ? 'EXTENSÃO DE CÍLIOS & NAIL DESIGNER DE ALTO PADRÃO'
          : hasLash
          ? 'ESPECIALISTA EM EXTENSÃO DE CÍLIOS & LASH DESIGN'
          : hasNail
          ? 'NAIL DESIGNER & ALONGAMENTO DE LUXO'
          : (aiForm.businessNiche || 'BELEZA, ESTÉTICA & AUTOESTIMA').toUpperCase();

      return {
        theme: 'roseGoldQuartz',
        styling: {
          ...INITIAL_DATA.styling,
          fontFamily: 'Playfair Display',
          photoPosY: 22,
        },
        announcement: {
          enabled: true,
          badge: 'AGENDA VIP ABERTA',
          text: 'Últimos horários da semana disponíveis. Garanta seu atendimento!',
          link: '#booking',
        },
        profile: {
          ...INITIAL_DATA.profile,
          name: nameUpper,
          title: specialtyTitle,
          tagline:
            aiForm.additionalInfo?.trim() ||
            'Realçando sua beleza natural com técnicas exclusivas, durabilidade impecável e atendimento personalizado.',
          cursivePhrase: 'Sua autoestima e olhar radiante em cada detalhe.',
          avatarUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
          aboutPhotoUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
          instagram: cleanInsta,
          location: 'Espaço Exclusivo & Climatizado · Atendimento com Hora Marcada',
          mapsUrl,
        },
        metrics: {
          enabled: true,
          stat1Value: '+1.200',
          stat1Label: 'CLIENTES ATENDIDAS',
          stat2Value: '100%',
          stat2Label: 'BIOSSEGURANÇA',
          stat3Value: '4.9★',
          stat3Label: 'AVALIAÇÃO VIP',
        },
        actionCards: [
          {
            id: 'cta-1',
            title: 'AGENDAR MEU HORÁRIO NO WHATSAPP',
            subtitle: 'Garanta seu procedimento com atendimento personalizado e exclusivo.',
            icon: 'Calendar',
            linkType: 'booking',
            url: '#booking',
            whatsappMessage: `Olá! Vim pelo microsite do ${rawName} e gostaria de agendar um horário.`,
            openInNewTab: true,
            animation: 'pulse-glow',
            variant: 'accent',
            badgeText: 'MAIS PROCURADO',
            customBg: '#e11d74',
            customText: '#ffffff',
            bgImage: '',
            imagePosition: 'right',
            cardImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400',
            imageFitStyle: 'popout',
            imageSize: 92,
            ctaActionText: 'RESERVAR HORÁRIO',
          },
          {
            id: 'cta-2',
            title: 'CATÁLOGO DE PROCEDIMENTOS & VALORES',
            subtitle: 'Confira nossas técnicas exclusivas, pacotes e detalhes.',
            icon: 'Sparkles',
            linkType: 'catalogo',
            url: '#catalogo',
            whatsappMessage: `Olá! Gostaria de consultar a tabela de procedimentos do ${rawName}.`,
            openInNewTab: false,
            animation: 'shimmer',
            variant: 'default',
            badgeText: 'TABELA VIP',
            customBg: '#ffffff',
            customText: '#3b1d28',
            bgImage: '',
            imagePosition: 'left',
            cardImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400',
            imageFitStyle: 'framed',
            imageSize: 84,
            ctaActionText: 'VER PROCEDIMENTOS',
          },
          {
            id: 'cta-3',
            title: 'COMO CHEGAR AO STUDIO (LOCALIZAÇÃO)',
            subtitle: 'Clique para abrir a rota direta no Google Maps.',
            icon: 'MapPin',
            linkType: 'custom',
            url: mapsUrl,
            whatsappMessage: 'Olá! Gostaria de confirmar a localização do Studio.',
            openInNewTab: true,
            animation: 'none',
            variant: 'default',
            badgeText: 'MAPS',
            customBg: '#ffffff',
            customText: '#3b1d28',
            bgImage: '',
            imagePosition: 'none',
            cardImage: '',
            imageFitStyle: 'framed',
            imageSize: 84,
            ctaActionText: 'ABRIR ROTA',
          },
        ],
        studentGrid: {
          ...INITIAL_DATA.studentGrid,
          enabled: true,
          headline: 'Portfólio & Transformações Reais',
          subtitle: 'Confira resultados impecáveis de nossas clientes no studio',
          photos: [
            'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
          ],
        },
        locationCard: {
          enabled: true,
          headline: `Localização — ${rawName}`,
          address: 'Clique para abrir a rota no Google Maps e vir até o nosso espaço',
          buttonLabel: 'Abrir no Google Maps',
          mapsUrl,
        },
        services: {
          ...INITIAL_DATA.services,
          enabled: true,
          headline: 'Menu de Procedimentos Exclusivos',
          subtitle: 'Materiais hipoalergênicos de primeira linha com retenção e acabamento de luxo',
          items: [
            {
              id: 'srv-1',
              name: 'Extensão de Cílios (Volume Brasileiro / Fox Eyes / Fio a Fio)',
              description: 'Mapeamento personalizado para destacar seu olhar com leveza, conforto e alta retenção.',
              price: 'R$ 180',
              oldPrice: 'R$ 220',
              duration: '1h45',
              badge: 'MAIS PEDIDO',
              ctaLabel: 'Agendar',
              actionType: 'booking' as const,
              featured: true,
              imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300',
            },
            {
              id: 'srv-2',
              name: 'Alongamento em Fibra de Vidro / Banho de Gel Slim',
              description: 'Unhas resistentes, curvatura natural impecável e acabamento espelhado de longa duração.',
              price: 'R$ 190',
              oldPrice: 'R$ 230',
              duration: '2h00',
              badge: 'NAIL LUXURY',
              ctaLabel: 'Agendar',
              actionType: 'booking' as const,
              featured: true,
              imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=300',
            },
            {
              id: 'srv-3',
              name: 'Combo VIP: Extensão de Cílios + Nail Design Completo',
              description: 'Transformação completa em uma sessão especial com condição exclusiva.',
              price: 'R$ 330',
              oldPrice: 'R$ 410',
              duration: '3h15',
              badge: 'COMBO ESPECIAL',
              ctaLabel: 'Reservar Combo',
              actionType: 'booking' as const,
              featured: false,
              imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=300',
            },
          ],
        },
        aboutMe: {
          enabled: true,
          headline: `Sobre ${rawName}`,
          paragraph: `Referência em ${aiForm.businessNiche || 'Extensão de Cílios e Nail Design'}, nosso studio nasceu com a missão de entregar um atendimento acolhedor, técnico e altamente personalizado. Utilizamos apenas materiais de excelência para garantir saúde, durabilidade e um acabamento sofisticado que valoriza sua beleza única.`,
          closingPhrase: 'Beleza, autocuidado e excelência em cada atendimento.',
        },
      };
    }

    const fallbackCat = isBarber
      ? 'Barbearia & Grooming'
      : isLaw
      ? 'Jurídico & Executivo'
      : isHealth
      ? 'Saúde & Psicologia'
      : isMentor
      ? 'Mentoria & Cursos'
      : isFashion
      ? 'Moda & Juventude'
      : 'Consultoria & Estética';
    const kit = NICHE_KITS[fallbackCat] || NICHE_KITS['Beleza & Unhas'];

    return {
      theme: kit.defaultTheme,
      announcement: {
        enabled: true,
        badge: kit.announcement.badge,
        text: kit.announcement.text,
        link: '#booking',
      },
      profile: {
        ...INITIAL_DATA.profile,
        ...kit.profile,
        name: nameUpper,
        title: (aiForm.businessNiche || kit.profile.title).toUpperCase(),
        tagline: aiForm.additionalInfo?.trim() || kit.profile.tagline,
        instagram: cleanInsta,
        mapsUrl,
      },
      metrics: {
        enabled: true,
        ...kit.metrics,
      },
      actionCards: kit.actionCards,
      locationCard: {
        enabled: true,
        headline: `Localização — ${rawName}`,
        address: kit.profile.location,
        buttonLabel: 'Abrir no Google Maps',
        mapsUrl,
      },
      services: {
        ...INITIAL_DATA.services,
        enabled: true,
        headline: kit.services.headline,
        items: kit.services.items.map((it) => ({
          ...it,
          ctaLabel: 'Reservar',
          actionType: 'booking' as const,
          featured: true,
        })),
      },
    };
  };

  const applyGeneratedMicrositeData = (generated: any, extractedMeta?: any) => {
    const safeTheme = generated?.theme && THEMES[generated.theme] ? generated.theme : 'roseGoldQuartz';
    const targetThemeObj = THEMES[safeTheme] || THEMES.roseGoldQuartz;

    const normalizedCards =
      Array.isArray(generated?.actionCards) && generated.actionCards.length > 0
        ? generated.actionCards.map((c: any, idx: number) => ({
            id: c.id || `cta-${idx + 1}`,
            title: c.title || 'ATENDIMENTO VIP',
            subtitle: c.subtitle || 'Clique para saber mais informações.',
            icon: c.icon || 'Calendar',
            linkType: c.linkType || 'booking',
            url: c.url || '#booking',
            whatsappMessage: c.whatsappMessage || 'Olá! Gostaria de agendar um horário.',
            openInNewTab: c.openInNewTab ?? true,
            animation: c.animation || (idx === 0 ? 'pulse-glow' : 'none'),
            variant: c.variant || (idx === 0 ? 'accent' : 'default'),
            badgeText: c.badgeText || '',
            customBg: c.customBg || '#ffffff',
            customText: c.customText || '#0f172a',
            bgImage: c.bgImage || '',
            imagePosition: c.imagePosition || 'none',
            cardImage: c.cardImage || '',
            imageFitStyle: c.imageFitStyle || 'framed',
            imageSize: c.imageSize || 88,
            ctaActionText: c.ctaActionText || 'SAIBA MAIS',
          }))
        : INITIAL_DATA.actionCards;

    const normalizedServices =
      Array.isArray(generated?.services?.items) && generated.services.items.length > 0
        ? generated.services.items.map((srv: any, idx: number) => ({
            id: srv.id || `srv-${idx + 1}`,
            name: srv.name || 'Atendimento Exclusivo',
            description: srv.description || 'Atendimento personalizado com foco no melhor resultado.',
            price: srv.price || 'Sob Consulta',
            oldPrice: srv.oldPrice || '',
            duration: srv.duration || '1h00',
            badge: srv.badge || (idx === 0 ? 'DESTAQUE' : ''),
            ctaLabel: srv.ctaLabel || 'Agendar',
            actionType: (srv.actionType as 'booking' | 'whatsapp' | 'link') || 'booking',
            customUrl: srv.customUrl || '',
            featured: srv.featured ?? idx === 0,
            imageUrl:
              srv.imageUrl ||
              'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300',
          }))
        : INITIAL_DATA.services.items;

    const cleanInsta = (aiForm.instagram || '')
      .replace(/^https?:\/\/(www\.)?instagram\.com\//i, '')
      .split('/')[0]
      .split('?')[0]
      .replace('@', '')
      .trim();
    const cleanMaps = (aiForm.googleMaps || '').trim();

    setData((prev) => ({
      ...INITIAL_DATA,
      theme: safeTheme,
      customColors: { ...INITIAL_DATA.customColors, enabled: false },
      styling: {
        ...INITIAL_DATA.styling,
        fontFamily: targetThemeObj.fontHeadline,
        ...(generated?.styling || {}),
      },
      announcement: {
        ...INITIAL_DATA.announcement,
        ...(generated?.announcement || {}),
      },
      profile: {
        ...INITIAL_DATA.profile,
        ...(generated?.profile || {}),
        name:
          generated?.profile?.name ||
          (aiForm.businessName ? aiForm.businessName.toUpperCase() : prev.profile.name),
        instagram: generated?.profile?.instagram || cleanInsta || prev.profile.instagram,
        mapsUrl: generated?.profile?.mapsUrl || cleanMaps || prev.profile.mapsUrl,
      },
      metrics: {
        ...INITIAL_DATA.metrics,
        ...(generated?.metrics || {}),
      },
      actionCards: normalizedCards,
      processSteps: {
        ...INITIAL_DATA.processSteps,
        ...(generated?.processSteps || {}),
        steps:
          Array.isArray(generated?.processSteps?.steps) && generated.processSteps.steps.length > 0
            ? generated.processSteps.steps
            : INITIAL_DATA.processSteps.steps,
      },
      studentGrid: {
        ...INITIAL_DATA.studentGrid,
        ...(generated?.studentGrid || {}),
        photos:
          Array.isArray(generated?.studentGrid?.photos) && generated.studentGrid.photos.length > 0
            ? generated.studentGrid.photos
            : INITIAL_DATA.studentGrid.photos,
      },
      locationCard: {
        ...INITIAL_DATA.locationCard,
        ...(generated?.locationCard || {}),
        mapsUrl: generated?.locationCard?.mapsUrl || cleanMaps || INITIAL_DATA.locationCard.mapsUrl,
      },
      services: {
        ...INITIAL_DATA.services,
        ...(generated?.services || {}),
        items: normalizedServices,
      },
      testimonials: {
        ...INITIAL_DATA.testimonials,
        ...(generated?.testimonials || {}),
        items:
          Array.isArray(generated?.testimonials?.items) && generated.testimonials.items.length > 0
            ? generated.testimonials.items
            : INITIAL_DATA.testimonials.items,
      },
      qualifierFunnel: {
        ...INITIAL_DATA.qualifierFunnel,
        ...(generated?.qualifierFunnel || {}),
        questions:
          Array.isArray(generated?.qualifierFunnel?.questions) &&
          generated.qualifierFunnel.questions.length > 0
            ? generated.qualifierFunnel.questions
            : INITIAL_DATA.qualifierFunnel.questions,
      },
      aboutMe: {
        ...INITIAL_DATA.aboutMe,
        ...(generated?.aboutMe || {}),
      },
      faq: {
        ...INITIAL_DATA.faq,
        ...(generated?.faq || {}),
        items:
          Array.isArray(generated?.faq?.items) && generated.faq.items.length > 0
            ? generated.faq.items
            : INITIAL_DATA.faq.items,
      },
      conversion: {
        ...INITIAL_DATA.conversion,
        ...(generated?.conversion || {}),
      },
      seo: {
        ...INITIAL_DATA.seo,
        metaTitle: `${
          generated?.profile?.name || aiForm.businessName || INITIAL_DATA.profile.name
        } — ${generated?.profile?.title || aiForm.businessNiche || INITIAL_DATA.profile.title}`,
        metaDescription:
          generated?.profile?.tagline || aiForm.additionalInfo || INITIAL_DATA.profile.tagline,
        ogImageUrl: generated?.profile?.avatarUrl || INITIAL_DATA.profile.avatarUrl,
      },
    }));

    setEditingSiteId(null);
    setAiModalOpen(false);
    setActiveTab('styling');
    triggerSimulatorSkeleton(480);

    const totalRealPhotos =
      (extractedMeta?.instagramPhotosCount || 0) + (extractedMeta?.mapsPhotosCount || 0);
    const sourcesFound: string[] = [];
    if (extractedMeta?.instagramFound) sourcesFound.push('Instagram');
    if (extractedMeta?.mapsFound) sourcesFound.push('Google Meu Negócio');

    if (sourcesFound.length > 0) {
      showToast(
        `✨ Microsite criado com dados reais do ${sourcesFound.join(' + ')}${
          totalRealPhotos > 0 ? ` (${totalRealPhotos} foto(s) importada(s))` : ''
        }!`
      );
    } else {
      showToast('✨ Microsite gerado com IA com sucesso! Confira no simulador.');
    }
  };

  const handleAiGenerateMicrosite = async () => {
    setAiError(null);
    if (
      !aiForm.instagram.trim() &&
      !aiForm.googleMaps.trim() &&
      !aiForm.businessName.trim() &&
      !aiForm.businessNiche.trim() &&
      !aiForm.additionalInfo.trim()
    ) {
      const msg =
        'Informe ao menos o Instagram, o Link do Google Meu Negócio, o Nome do Negócio ou o Nicho para gerar o microsite.';
      setAiError(msg);
      showToast(`⚠️ ${msg}`);
      return;
    }

    setAiGenerating(true);
    setAiStepIndex(0);
    const stepTimer1 = setTimeout(() => setAiStepIndex(1), 2200);
    const stepTimer2 = setTimeout(() => setAiStepIndex(2), 4800);

    try {
      const res = await fetch('/api/generate-microsite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aiForm),
      });

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const json = await res.json();
        if (res.ok && json?.success && json?.data) {
          applyGeneratedMicrositeData(json.data, json.extractedMeta);
          return;
        }
      }

      // Caso o servidor retorne erro temporário ou rota estática, aciona o motor inteligente local
      await new Promise((r) => setTimeout(r, 900));
      const fallbackGenerated = buildClientSmartMicrosite();
      applyGeneratedMicrositeData(fallbackGenerated);
    } catch (err: any) {
      console.warn('Fallback local ativado na geração do microsite:', err);
      await new Promise((r) => setTimeout(r, 900));
      const fallbackGenerated = buildClientSmartMicrosite();
      applyGeneratedMicrositeData(fallbackGenerated);
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setAiGenerating(false);
    }
  };

  const [saveForm, setSaveForm] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    monthlyFee: '149,90',
    subdomain: '',
    customDomain: '',
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3800);
  };

  const generatePdfReportHtml = () => {
    const todayStr = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
    const totalSites = savedSites.length;
    const activeSites = savedSites.filter(s => s.status === 'active').length;
    const overdueSites = savedSites.filter(s => s.status === 'overdue').length;
    const totalMrr = savedSites.reduce((acc, s) => acc + (s.status !== 'disabled' ? s.monthlyFee : 0), 0);
    const totalClicks = savedSites.reduce((acc, s) => acc + (s.whatsappClicks || 0), 0);
    const totalViews = savedSites.reduce((acc, s) => acc + (s.pageViews || 100), 0);
    const avgConversion = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0.0';
    const totalUpdates = savedSites.reduce((acc, s) => acc + s.updatesThisMonth, 0);

    const rowsHtml = savedSites.map(s => {
      const clicks = s.whatsappClicks || 0;
      const views = s.pageViews || 100;
      const rate = ((clicks / views) * 100).toFixed(1);
      const domain = s.customDomain || `${s.subdomain}.luxebio.site`;
      const statusLabel = s.status === 'disabled' ? 'Desativado' : s.status === 'overdue' ? 'Vencido' : 'Em Dia';
      const statusColor = s.status === 'disabled' ? '#dc2626' : s.status === 'overdue' ? '#d97706' : '#16a34a';

      return `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; font-weight: bold; color: #111827;">
            ${s.clientName}
            <div style="font-size: 11px; color: #6b7280; font-weight: normal;">${s.nicheCategory}</div>
          </td>
          <td style="padding: 12px; font-family: monospace; font-size: 12px; color: #374151;">
            https://${domain}
          </td>
          <td style="padding: 12px; text-align: center;">
            <span style="display: inline-block; padding: 4px 8px; border-radius: 9999px; font-size: 11px; font-weight: bold; color: ${statusColor}; background-color: ${statusColor}15; border: 1px solid ${statusColor}40;">
              ${statusLabel}
            </span>
          </td>
          <td style="padding: 12px; text-align: center; font-size: 12px; color: #374151;">${s.dueDate}</td>
          <td style="padding: 12px; text-align: center; font-size: 12px; color: #111827; font-weight: bold;">
            ${clicks} <span style="font-weight: normal; color: #6b7280;">/ ${views}</span>
          </td>
          <td style="padding: 12px; text-align: center; font-size: 13px; font-weight: bold; color: #059669;">
            ${rate}%
          </td>
          <td style="padding: 12px; text-align: center; font-size: 12px; color: #374151;">${s.updatesThisMonth}</td>
          <td style="padding: 12px; text-align: right; font-size: 13px; font-weight: bold; color: #111827;">
            R$ ${s.monthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </td>
        </tr>
      `;
    }).join('');

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatorio Executivo - LuxeBio Studio Pro</title>
  <style>
    @media print {
      body { background: #fff !important; color: #000 !important; padding: 0 !important; }
      .no-print { display: none !important; }
      .container { border: none !important; box-shadow: none !important; padding: 0 !important; max-width: 100% !important; }
      @page { margin: 1.5cm; size: A4 portrait; }
    }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
    .container { max-width: 900px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 24px; }
    .title-group h1 { font-size: 20px; margin: 0; color: #0f172a; font-weight: 800; letter-spacing: -0.5px; }
    .title-group p { font-size: 12px; color: #64748b; margin: 4px 0 0 0; }
    .badge-saas { background: #fef3c7; color: #92400e; border: 1px solid #fde68a; font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; }
    .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 28px; }
    .metric-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; text-align: center; }
    .metric-card .label { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; }
    .metric-card .val { font-size: 20px; font-weight: 900; color: #0f172a; margin-top: 4px; }
    .metric-card .sub { font-size: 10px; color: #94a3b8; margin-top: 2px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
    th { background: #0f172a; color: #ffffff; text-align: left; padding: 10px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
    th:first-child { border-top-left-radius: 8px; }
    th:last-child { border-top-right-radius: 8px; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; display: flex; justify-content: space-between; font-size: 11px; color: #64748b; }
    .btn-print { background: #d97706; color: #ffffff; border: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-size: 12px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="no-print" style="max-width: 900px; margin: 0 auto 16px auto; display: flex; justify-content: flex-end;">
    <button onclick="window.print()" class="btn-print">🖨️ Imprimir ou Salvar em PDF</button>
  </div>
  <div class="container">
    <div class="header">
      <div class="title-group">
        <h1>LUXEBIO STUDIO PRO — RELATÓRIO EXECUTIVO DE PERFORMANCE</h1>
        <p>Relatório Consolidado de Status Financeiro & Conversão de Clientes · Emitido em: ${todayStr}</p>
      </div>
      <span class="badge-saas">SaaS Executive Report</span>
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="label">Total Microsites</div>
        <div class="val">${totalSites}</div>
        <div class="sub">${activeSites} Ativos · ${overdueSites} Vencidos</div>
      </div>
      <div class="metric-card">
        <div class="label">Faturamento MRR</div>
        <div class="val" style="color: #059669;">R$ ${totalMrr.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
        <div class="sub">Receita Recorrente Mensal</div>
      </div>
      <div class="metric-card">
        <div class="label">Taxa Média Conversão</div>
        <div class="val" style="color: #2563eb;">${avgConversion}%</div>
        <div class="sub">${totalClicks} cliques em ${totalViews} views</div>
      </div>
      <div class="metric-card">
        <div class="label">Edições no Mês</div>
        <div class="val">${totalUpdates}</div>
        <div class="sub">Atualizações de conteúdo</div>
      </div>
    </div>

    <h3 style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
      Detalhamento por Cliente & Microsite
    </h3>

    <table>
      <thead>
        <tr>
          <th>Cliente / Empresa</th>
          <th>Domínio Ativo</th>
          <th style="text-align: center;">Status</th>
          <th style="text-align: center;">Vencimento</th>
          <th style="text-align: center;">Cliques WA / Views</th>
          <th style="text-align: center;">Conversão</th>
          <th style="text-align: center;">Edições</th>
          <th style="text-align: right;">Valor Mensal</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>

    <div class="footer">
      <div>LuxeBio Studio SaaS Engine — Plataforma de Gestão de Microsites & Landing Pages</div>
      <div>Documento Executivo de Relatório Mensal</div>
    </div>
  </div>
</body>
</html>`;
  };

  const copyWhatsappExecutiveSummary = async () => {
    const todayStr = new Date().toLocaleDateString('pt-BR');
    const totalMrr = savedSites.reduce((acc, s) => acc + (s.status !== 'disabled' ? s.monthlyFee : 0), 0);
    const totalClicks = savedSites.reduce((acc, s) => acc + (s.whatsappClicks || 0), 0);
    const totalViews = savedSites.reduce((acc, s) => acc + (s.pageViews || 100), 0);
    const avgConversion = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0.0';

    let msg = `📊 *RESUMO EXECUTIVO DE PERFORMANCE & STATUS FINANCEIRO*\n`;
    msg += `📅 *Data de Emissão:* ${todayStr}\n\n`;
    msg += `💼 *MÉTRICAS GERAIS SAAS:*\n`;
    msg += `• Total de Microsites: ${savedSites.length}\n`;
    msg += `• Faturamento MRR: R$ ${totalMrr.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
    msg += `• Taxa Média de Conversão WA: ${avgConversion}%\n\n`;
    msg += `📋 *STATUS INDIVIDUAL DOS CLIENTES:*\n`;

    savedSites.forEach((s, idx) => {
      const clicks = s.whatsappClicks || 0;
      const views = s.pageViews || 100;
      const rate = ((clicks / views) * 100).toFixed(1);
      const statusIcon = s.status === 'disabled' ? '🛑' : s.status === 'overdue' ? '🟡' : '🟢';
      const statusText = s.status === 'disabled' ? 'Desativado' : s.status === 'overdue' ? 'Vencido' : 'Em dia';
      msg += `\n${idx + 1}. *${s.clientName}* (${s.nicheCategory})\n`;
      msg += `   ${statusIcon} Status: ${statusText} (Venc: ${s.dueDate})\n`;
      msg += `   📈 Conversão WA: *${rate}%* (${clicks} cliques / ${views} views)\n`;
      msg += `   💰 Mensalidade: R$ ${s.monthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
    });

    msg += `\nGerado por *LuxeBio Studio Pro* 🚀`;

    const success = await safeCopyText(msg);
    if (success) {
      setCopiedPdfSummary(true);
      setTimeout(() => setCopiedPdfSummary(false), 2500);
      showToast('📋 Resumo Executivo formatado copiado! Pronto para colar no WhatsApp.');
    }
  };

  const printPdfReport = () => {
    const htmlCode = generatePdfReportHtml();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlCode);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        try { printWindow.print(); } catch {}
      }, 500);
    } else {
      showToast('⚠️ Permitir pop-ups no seu navegador para abrir a janela de impressão do PDF.');
    }
  };

  const downloadPdfReportHtml = () => {
    const htmlCode = generatePdfReportHtml();
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const dateSlug = new Date().toISOString().split('T')[0];
    link.download = `relatorio-executivo-luxebio-${dateSlug}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('📄 Relatório Executivo HTML baixado com sucesso!');
  };

  const generateSinglePdfReportHtml = (site: SavedMicrosite) => {
    const todayStr = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
    const clicks = site.whatsappClicks || 0;
    const views = site.pageViews || 100;
    const rate = ((clicks / views) * 100).toFixed(1);
    const domain = site.customDomain || `${site.subdomain}.luxebio.site`;
    const statusLabel = site.status === 'disabled' ? 'Desativado' : site.status === 'overdue' ? 'Vencido' : 'Em Dia';
    const statusColor = site.status === 'disabled' ? '#dc2626' : site.status === 'overdue' ? '#d97706' : '#16a34a';

    const activeModules = [];
    if (site.data?.qualifierFunnel?.enabled) activeModules.push('Funil Anti-Curiosos (Quiz VIP)');
    if (site.data?.announcement?.enabled) activeModules.push('Barra de Aviso / Escassez');
    if (site.data?.metrics?.enabled) activeModules.push('Métricas de Autoridade');
    if (site.data?.processSteps?.enabled) activeModules.push('Etapas do Processo');
    if (site.data?.studentGrid?.enabled) activeModules.push('Grid de Resultados / Fotos');
    if (site.data?.services?.enabled) activeModules.push(`Catálogo de Serviços (${site.data.services.items?.length || 0} itens)`);
    if (site.data?.faq?.enabled) activeModules.push('Dúvidas Frequentes (FAQ)');
    if (site.data?.locationCard?.enabled) activeModules.push('Card de Localização (Google Maps)');
    if (site.data?.conversion?.metaPixelId) activeModules.push('Meta Pixel Tráfego Pago');

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatorio Individual - ${site.clientName}</title>
  <style>
    @media print {
      body { background: #fff !important; color: #000 !important; padding: 0 !important; }
      .no-print { display: none !important; }
      .container { border: none !important; box-shadow: none !important; padding: 0 !important; max-width: 100% !important; }
      @page { margin: 1.5cm; size: A4 portrait; }
    }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
    .container { max-width: 850px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 36px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 24px; }
    .title-group h1 { font-size: 22px; margin: 0; color: #0f172a; font-weight: 800; letter-spacing: -0.5px; }
    .title-group h2 { font-size: 15px; color: #d97706; margin: 6px 0 0 0; font-weight: 700; }
    .title-group p { font-size: 12px; color: #64748b; margin: 4px 0 0 0; }
    .badge-status { display: inline-block; padding: 6px 14px; border-radius: 9999px; font-size: 11px; font-weight: 800; text-transform: uppercase; color: ${statusColor}; background: ${statusColor}15; border: 1px solid ${statusColor}40; }
    .metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 28px; }
    .metric-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; text-align: center; }
    .metric-card .label { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; }
    .metric-card .val { font-size: 22px; font-weight: 900; color: #0f172a; margin-top: 4px; }
    .metric-card .sub { font-size: 11px; color: #64748b; margin-top: 2px; }
    .section-title { font-size: 13px; font-weight: 800; color: #0f172a; margin: 24px 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px; border-left: 3px solid #d97706; padding-left: 8px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; }
    .info-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; }
    .info-table td.label { font-weight: bold; color: #475569; width: 35%; background: #fafafa; }
    .info-table td.val { color: #0f172a; font-weight: 600; }
    .modules-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    .module-pill { background: #f1f5f9; color: #334155; font-size: 11px; font-weight: 600; padding: 6px 12px; border-radius: 8px; border: 1px solid #e2e8f0; }
    .footer { margin-top: 36px; padding-top: 18px; border-top: 1px solid #e5e7eb; display: flex; justify-content: space-between; font-size: 11px; color: #64748b; }
    .btn-print { background: #d97706; color: #ffffff; border: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-size: 12px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="no-print" style="max-width: 850px; margin: 0 auto 16px auto; display: flex; justify-content: flex-end;">
    <button onclick="window.print()" class="btn-print">🖨️ Imprimir ou Salvar em PDF</button>
  </div>
  <div class="container">
    <div class="header">
      <div class="title-group">
        <h1>LUXEBIO STUDIO PRO</h1>
        <h2>RELATÓRIO DE PERFORMANCE & COBRANÇA</h2>
        <p>Cliente: <strong>${site.clientName}</strong> · Emitido em: ${todayStr}</p>
      </div>
      <span class="badge-status">${statusLabel}</span>
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="label">Taxa Conversão WA</div>
        <div class="val" style="color: #059669;">${rate}%</div>
        <div class="sub">${clicks} cliques em ${views} acessos</div>
      </div>
      <div class="metric-card">
        <div class="label">Mensalidade Ativa</div>
        <div class="val" style="color: #d97706;">R$ ${site.monthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
        <div class="sub">Vencimento: ${site.dueDate}</div>
      </div>
      <div class="metric-card">
        <div class="label">Edições no Mês</div>
        <div class="val" style="color: #2563eb;">${site.updatesThisMonth}</div>
        <div class="sub">Última ed.: ${site.lastUpdated}</div>
      </div>
    </div>

    <div class="section-title">Informações Gerais do Microsite</div>
    <table class="info-table">
      <tr>
        <td class="label">Cliente / Razão Social</td>
        <td class="val">${site.clientName}</td>
      </tr>
      <tr>
        <td class="label">Nicho de Atuação</td>
        <td class="val">${site.nicheCategory}</td>
      </tr>
      <tr>
        <td class="label">Link Público / Domínio</td>
        <td class="val" style="font-family: monospace; color: #d97706;">https://${domain}</td>
      </tr>
      <tr>
        <td class="label">Contato / WhatsApp</td>
        <td class="val">${site.clientPhone || 'Não informado'}</td>
      </tr>
      <tr>
        <td class="label">E-mail Cadastrado</td>
        <td class="val">${site.clientEmail || 'Não informado'}</td>
      </tr>
      <tr>
        <td class="label">Status do Domínio / SSL</td>
        <td class="val">SSL Ativo (HTTPS) · DNS Verificado 🟢</td>
      </tr>
    </table>

    <div class="section-title">Módulos & Recursos Ativos no Microsite</div>
    <div class="modules-list">
      ${activeModules.length > 0 ? activeModules.map(m => `<span class="module-pill">✓ ${m}</span>`).join('') : '<span class="module-pill">Microsite básico sem módulos extras</span>'}
    </div>

    <div class="section-title">Orientações & Próximos Passos</div>
    <p style="font-size: 12px; color: #475569; line-height: 1.6; margin: 0;">
      • Este microsite está otimizado para alta conversão em dispositivos móveis (Instagram e tráfego pago).<br/>
      • Mantenha o link oficial na biografia do seu Instagram para maximizar a conversão de novos clientes.<br/>
      • Para alterações de agenda, fotos ou serviços, entre em contato com o suporte técnico.
    </p>

    <div class="footer">
      <div>LuxeBio Studio SaaS Engine — Relatório Individual do Cliente</div>
      <div>Página 1 de 1</div>
    </div>
  </div>
</body>
</html>`;
  };

  const copySingleWhatsappSummary = async (site: SavedMicrosite) => {
    const todayStr = new Date().toLocaleDateString('pt-BR');
    const clicks = site.whatsappClicks || 0;
    const views = site.pageViews || 100;
    const rate = ((clicks / views) * 100).toFixed(1);
    const domain = site.customDomain || `${site.subdomain}.luxebio.site`;
    const statusText = site.status === 'disabled' ? 'Desativado' : site.status === 'overdue' ? 'Vencido' : 'Em Dia';
    const statusIcon = site.status === 'disabled' ? '🛑' : site.status === 'overdue' ? '🟡' : '🟢';

    let msg = `📊 *RELATÓRIO INDIVIDUAL DE PERFORMANCE*\n`;
    msg += `👤 Cliente: *${site.clientName}*\n`;
    msg += `🏷️ Nicho: ${site.nicheCategory}\n`;
    msg += `📅 Data de Emissão: ${todayStr}\n\n`;
    msg += `🌐 *Link Público:* https://${domain}\n`;
    msg += `${statusIcon} *Status Financeiro:* ${statusText} (Venc: ${site.dueDate})\n`;
    msg += `💰 *Mensalidade:* R$ ${site.monthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n\n`;
    msg += `📈 *MÉTRICAS DE DESEMPENHO:*\n`;
    msg += `• Taxa de Conversão WhatsApp: *${rate}%*\n`;
    msg += `• Cliques no WhatsApp: ${clicks}\n`;
    msg += `• Visualizações do Site: ${views}\n`;
    msg += `• Atualizações Solicitadas no Mês: ${site.updatesThisMonth}\n\n`;
    msg += `Agradecemos a parceria! Dúvidas ou solicitações, estamos à disposição. 🚀`;

    const success = await safeCopyText(msg);
    if (success) {
      setCopiedSinglePdfSummary(true);
      setTimeout(() => setCopiedSinglePdfSummary(false), 2500);
      showToast(`📋 Relatório individual de "${site.clientName}" copiado para WhatsApp!`);
    }
  };

  const printSinglePdfReport = (site: SavedMicrosite) => {
    const htmlCode = generateSinglePdfReportHtml(site);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlCode);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        try { printWindow.print(); } catch {}
      }, 500);
    } else {
      showToast('⚠️ Permitir pop-ups no seu navegador para abrir a janela de impressão do PDF.');
    }
  };

  const downloadSinglePdfReportHtml = (site: SavedMicrosite) => {
    const htmlCode = generateSinglePdfReportHtml(site);
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const clientSlug = site.clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    link.download = `relatorio-individual-${clientSlug}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`📄 Relatório individual HTML de "${site.clientName}" baixado com sucesso!`);
  };

  const recordWhatsappClick = (targetSiteId?: string) => {
    const targetId = targetSiteId || editingSiteId || savedSites[0]?.id;
    if (!targetId) return;

    setSavedSites(prev => {
      const updated = prev.map(s => {
        if (s.id === targetId) {
          const clicks = (s.whatsappClicks || 0) + 1;
          const views = Math.max((s.pageViews || 120), clicks + 5);
          return {
            ...s,
            whatsappClicks: clicks,
            pageViews: views,
          };
        }
        return s;
      });
      try {
        localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast('📈 Clique em WhatsApp registrado! Taxa de conversão atualizada no Painel.');
  };

  const currentEditingSite = savedSites.find(s => s.id === editingSiteId);

  // Save current microsite
  const handleSaveMicrosite = (asNew = false) => {
    const clientName = saveForm.clientName.trim() || data.profile.name || 'Novo Cliente';
    const slug = (saveForm.subdomain.trim() || clientName).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'microsite';
    const feeNum = parseFloat(saveForm.monthlyFee.replace('R$', '').replace('.', '').replace(',', '.')) || 149.90;
    const todayStr = new Date().toISOString().split('T')[0];

    if (editingSiteId && !asNew) {
      let isDataModified = false;
      const updated = savedSites.map(s => {
        if (s.id !== editingSiteId) return s;

        const dataChanged = JSON.stringify(s.data) !== JSON.stringify(data) ||
          s.clientName !== clientName ||
          s.clientPhone !== (saveForm.clientPhone || s.clientPhone) ||
          s.clientEmail !== (saveForm.clientEmail || s.clientEmail) ||
          s.monthlyFee !== feeNum ||
          s.subdomain !== slug ||
          s.customDomain !== saveForm.customDomain.trim();

        isDataModified = dataChanged;
        const newUpdates = dataChanged ? s.updatesThisMonth + 1 : s.updatesThisMonth;

        return {
          ...s,
          clientName,
          clientPhone: saveForm.clientPhone || s.clientPhone,
          clientEmail: saveForm.clientEmail || s.clientEmail,
          monthlyFee: feeNum,
          subdomain: slug,
          customDomain: saveForm.customDomain.trim(),
          nicheCategory: THEMES[data.theme]?.category || s.nicheCategory,
          updatesThisMonth: newUpdates,
          lastUpdated: dataChanged ? todayStr : s.lastUpdated,
          data: JSON.parse(JSON.stringify(data)),
        };
      });
      setSavedSites(updated);
      try { localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(updated)); } catch {}
      if (isDataModified) {
        showToast(`✅ Alterações do microsite "${clientName}" salvas com sucesso! (+1 edição contabilizada)`);
      } else {
        showToast(`ℹ️ Nenhuma alteração detectada em "${clientName}". Salvo sem alterar o contador de edições.`);
      }
    } else {
      const newId = 'site-' + Date.now();
      const nextMonth = new Date();
      nextMonth.setDate(nextMonth.getDate() + 30);
      const dueDateStr = nextMonth.toISOString().split('T')[0];

      const newSite: SavedMicrosite = {
        id: newId,
        clientName,
        clientPhone: saveForm.clientPhone || data.profile.whatsapp,
        clientEmail: saveForm.clientEmail,
        nicheCategory: THEMES[data.theme]?.category || 'Geral',
        createdAt: todayStr,
        dueDate: dueDateStr,
        monthlyFee: feeNum,
        status: 'active',
        updatesThisMonth: 1,
        lastUpdated: todayStr,
        domainType: saveForm.customDomain.trim() ? 'custom' : 'subdomain',
        subdomain: slug,
        customDomain: saveForm.customDomain.trim(),
        dnsConfigured: true,
        sslActive: true,
        whatsappClicks: 0,
        pageViews: 100,
        data: JSON.parse(JSON.stringify(data)),
      };

      const newList = [newSite, ...savedSites];
      setSavedSites(newList);
      setEditingSiteId(newId);
      try { localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(newList)); } catch {}
      showToast(`🎉 Microsite "${clientName}" criado e salvo no seu Painel de Gestão! Vencimento: ${dueDateStr}`);
    }
    setSaveModalOpen(false);
  };

  const openSaveDialog = () => {
    const currentSite = savedSites.find(s => s.id === editingSiteId);
    setSaveForm({
      clientName: currentSite ? currentSite.clientName : data.profile.name,
      clientPhone: currentSite ? (currentSite.clientPhone || '') : data.profile.whatsapp,
      clientEmail: currentSite ? (currentSite.clientEmail || '') : '',
      monthlyFee: currentSite ? currentSite.monthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '149,90',
      subdomain: currentSite ? currentSite.subdomain : data.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      customDomain: currentSite ? currentSite.customDomain : '',
    });
    setSaveModalOpen(true);
  };

  const loadSiteForEditing = (site: SavedMicrosite) => {
    triggerSimulatorSkeleton(420);
    setData(JSON.parse(JSON.stringify(site.data)));
    setEditingSiteId(site.id);
    setActiveTab('styling');
    showToast(`✏️ Microsite "${site.clientName}" carregado no estúdio de edição!`);
  };

  const startNewDraftMicrosite = () => {
    triggerSimulatorSkeleton(420);
    setEditingSiteId(null);
    setData(INITIAL_DATA);
    showToast('✨ Modo Rascunho ativado. Nenhuma alteração afetará clientes existentes.');
  };

  const toggleSiteActiveStatus = (siteId: string) => {
    const updated = savedSites.map(s => {
      if (s.id !== siteId) return s;
      const newStatus: SavedMicrosite['status'] = s.status === 'disabled' ? 'active' : 'disabled';
      return { ...s, status: newStatus };
    });
    setSavedSites(updated);
    try { localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(updated)); } catch {}
    const target = updated.find(s => s.id === siteId);
    if (target?.status === 'disabled') {
      showToast(`🛑 Microsite "${target.clientName}" foi DESATIVADO por atraso de pagamento!`);
    } else if (target) {
      showToast(`🟢 Microsite "${target.clientName}" foi REATIVADO com sucesso!`);
    }
  };

  const extendDueDate = (siteId: string) => {
    const updated = savedSites.map(s => {
      if (s.id !== siteId) return s;
      const currentDue = new Date(s.dueDate > new Date().toISOString().split('T')[0] ? s.dueDate : new Date());
      currentDue.setDate(currentDue.getDate() + 30);
      const newDueDateStr = currentDue.toISOString().split('T')[0];
      return { ...s, dueDate: newDueDateStr, status: 'active' as const };
    });
    setSavedSites(updated);
    try { localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(updated)); } catch {}
    const target = updated.find(s => s.id === siteId);
    showToast(`💳 Pagamento de "${target?.clientName}" confirmado! Vencimento estendido para ${target?.dueDate}.`);
  };

  const deleteSavedSite = (siteId: string) => {
    const target = savedSites.find(s => s.id === siteId);
    if (!confirm(`Tem certeza que deseja excluir o microsite de "${target?.clientName}"?`)) return;
    const filtered = savedSites.filter(s => s.id !== siteId);
    setSavedSites(filtered);
    if (editingSiteId === siteId) setEditingSiteId(null);
    try { localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(filtered)); } catch {}
    showToast(`🗑️ Microsite removido do Painel.`);
  };
  
  // Interactive Mobile Preview Controls
  const [beforeAfterSlider, setBeforeAfterSlider] = useState(50);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [bookingForm, setBookingForm] = useState({
    name: '',
    service: data.services.items[0]?.name || 'Consulta',
    date: '2026-10-25',
    time: '14:00'
  });

  const baseTheme = THEMES[data.theme] || THEMES.navyLaw;
  const theme = data.customColors.enabled
    ? {
        ...baseTheme,
        id: 'custom',
        name: 'Paleta Personalizada',
        bg: data.customColors.bg,
        textMain: data.customColors.textMain,
        textMuted: data.customColors.textMuted,
        accent: data.customColors.accent,
        cardBg: data.customColors.cardBg,
        cardText: data.customColors.cardText,
        cardSubtext: data.customColors.cardText + '99',
        cardBorder: data.customColors.cardBorder,
        socialBg: data.customColors.socialBg,
        socialBorder: data.customColors.accent + '66',
        socialText: data.customColors.accent,
        iconBg: data.customColors.accent + '26',
        iconColor: data.customColors.accent,
        pillShadow: '0 8px 24px -4px rgba(0,0,0,0.4)',
        glowColor: data.customColors.glowColor + '38',
      }
    : baseTheme;

  const currentFilter = PHOTO_FILTERS.find(f => f.id === data.styling.photoFilter)?.css || 'none';

  // Helper for reading uploaded file to Base64 (with automatic resize/compression for smooth preview & localStorage persistence)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawResult = event.target?.result;
      if (typeof rawResult === 'string') {
        const img = new window.Image();
        img.onload = () => {
          try {
            const maxDim = 1200;
            let { width, height } = img;
            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const compressed = canvas.toDataURL('image/jpeg', 0.88);
              callback(compressed);
              showToast('📸 Imagem carregada e aplicada no preview com sucesso!');
              return;
            }
          } catch {
            // Fallback to raw base64 if canvas fails
          }
          callback(rawResult);
          showToast('📸 Imagem carregada e aplicada no preview com sucesso!');
        };
        img.onerror = () => {
          callback(rawResult);
          showToast('📸 Imagem carregada no preview!');
        };
        img.src = rawResult;
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Format dynamic WhatsApp URL
  const buildWhatsAppLink = (customService: string | null = null) => {
    const srv = customService || bookingForm.service;
    const msg = data.conversion.defaultWhatsappMsg
      .replace('{nome}', data.profile.name)
      .replace('{servico}', srv)
      .replace('{data}', bookingForm.date ? `${bookingForm.date} às ${bookingForm.time}` : 'esta semana');
    
    return `https://wa.me/${data.profile.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
  };

  // Updaters
  const updateStyle = (key: string, val: unknown) => setData(p => ({ ...p, styling: { ...p.styling, [key]: val } }));
  const updateProfile = (key: string, val: unknown) => setData(p => ({ ...p, profile: { ...p.profile, [key]: val } }));
  const updateCustomColor = (key: string, val: unknown) => {
    if (key === 'enabled') triggerSimulatorSkeleton(340);
    setData(p => ({ ...p, customColors: { ...p.customColors, [key]: val } }));
  };
  const updateMetrics = (key: string, val: unknown) => setData(p => ({ ...p, metrics: { ...p.metrics, [key]: val } }));
  const updateAnnounce = (key: string, val: unknown) => setData(p => ({ ...p, announcement: { ...p.announcement, [key]: val } }));
  const updateConversion = (key: string, val: unknown) => setData(p => ({ ...p, conversion: { ...p.conversion, [key]: val } }));
  const updateProcess = (key: string, val: unknown) => setData(p => ({ ...p, processSteps: { ...p.processSteps, [key]: val } }));
  const updateStudentGrid = (key: string, val: unknown) => setData(p => ({ ...p, studentGrid: { ...p.studentGrid, [key]: val } }));
  const addGalleryPhoto = (url: string) => {
    if (!url.trim()) return;
    setData(p => ({
      ...p,
      studentGrid: {
        ...p.studentGrid,
        photos: [...(p.studentGrid.photos || []), url.trim()]
      }
    }));
    setNewGalleryUrl('');
    showToast('📸 Nova foto adicionada à galeria!');
  };
  const removeGalleryPhoto = (index: number) => {
    setData(p => ({
      ...p,
      studentGrid: {
        ...p.studentGrid,
        photos: p.studentGrid.photos.filter((_, idx) => idx !== index)
      }
    }));
    showToast('🗑️ Foto removida da galeria.');
  };
  const moveGalleryPhoto = (from: number, to: number) => {
    setData(p => {
      const photos = [...(p.studentGrid.photos || [])];
      if (to < 0 || to >= photos.length) return p;
      const [removed] = photos.splice(from, 1);
      photos.splice(to, 0, removed);
      return {
        ...p,
        studentGrid: { ...p.studentGrid, photos }
      };
    });
  };
  const loadGalleryPreset = (presetKey: 'beauty' | 'barber' | 'health' | 'exec') => {
    const presets: Record<string, string[]> = {
      beauty: [
        'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
      ],
      barber: [
        'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1517832606589-715753d4f323?auto=format&fit=crop&q=80&w=600',
      ],
      health: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
      ],
      exec: [
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600',
      ],
    };
    if (presets[presetKey]) {
      triggerSimulatorSkeleton(340);
      updateStudentGrid('photos', presets[presetKey]);
      showToast(`📸 Galeria preenchida com fotos de exemplo!`);
    }
  };
  const updateLocationCard = (key: string, val: unknown) => setData(p => ({ ...p, locationCard: { ...p.locationCard, [key]: val } }));
  const updateQualifier = (key: string, val: unknown) => setData(p => ({ ...p, qualifierFunnel: { ...p.qualifierFunnel, [key]: val } }));
  const updateBeforeAfter = (key: string, val: unknown) => setData(p => ({ ...p, beforeAfter: { ...p.beforeAfter, [key]: val } }));
  const updateAboutMe = (key: string, val: unknown) => setData(p => ({ ...p, aboutMe: { ...p.aboutMe, [key]: val } }));
  const updateFaq = (key: string, val: unknown) => setData(p => ({ ...p, faq: { ...p.faq, [key]: val } }));

  // Quiz helper to compose final WhatsApp link
  const buildQuizWhatsAppLink = () => {
    let summary = `Olá ${data.profile.name}! Preenchi o formulário de triagem exclusiva na sua página:\n\n`;
    data.qualifierFunnel.questions.forEach((q, idx) => {
      const ans = quizAnswers[q.id] || 'Não respondido';
      summary += `*${idx + 1}. ${q.title}*\n👉 ${ans}\n\n`;
    });
    summary += 'Gostaria de verificar os próximos horários disponíveis com prioridade!';
    return `https://wa.me/${data.profile.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(summary)}`;
  };

  // Services Helpers
  const updateServicesConfig = (key: string, val: unknown) =>
    setData(p => ({ ...p, services: { ...p.services, [key]: val } }));

  const addService = () => {
    const newService = {
      id: 'srv-' + Date.now(),
      name: 'Novo Procedimento / Consultoria',
      description: 'Descrição elegante do que o serviço ou curso entrega para o cliente.',
      price: 'R$ 290',
      oldPrice: '',
      duration: '1h00',
      badge: 'NOVO',
      ctaLabel: 'Reservar',
      actionType: 'booking' as const,
      customUrl: '',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=300'
    };
    setData(p => ({ ...p, services: { ...p.services, enabled: true, items: [...p.services.items, newService] } }));
    showToast('✨ Novo item adicionado ao catálogo!');
  };

  const duplicateService = (id: string) => {
    setData(p => {
      const idx = p.services.items.findIndex(s => s.id === id);
      if (idx === -1) return p;
      const target = p.services.items[idx];
      const clone = {
        ...target,
        id: 'srv-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        name: `${target.name} (Cópia)`,
      };
      const items = [...p.services.items];
      items.splice(idx + 1, 0, clone);
      return { ...p, services: { ...p.services, items } };
    });
    showToast('📋 Item duplicado no catálogo!');
  };

  const moveService = (from: number, to: number) => {
    setData(p => {
      const items = [...(p.services.items || [])];
      if (to < 0 || to >= items.length) return p;
      const [removed] = items.splice(from, 1);
      items.splice(to, 0, removed);
      return { ...p, services: { ...p.services, items } };
    });
  };

  const removeService = (id: string) => {
    setData(p => ({
      ...p,
      services: { ...p.services, items: p.services.items.filter(s => s.id !== id) }
    }));
    showToast('🗑️ Item removido do catálogo.');
  };

  const updateService = (id: string, field: string, val: unknown) => {
    setData(p => ({
      ...p,
      services: {
        ...p.services,
        items: p.services.items.map(s => s.id === id ? { ...s, [field]: val } : s)
      }
    }));
  };

  const loadServicesPreset = (presetKey: 'law' | 'beauty' | 'barber' | 'mentorship' | 'health') => {
    const presets: Record<string, { headline: string; subtitle: string; badge: string; items: typeof INITIAL_DATA.services.items }> = {
      law: {
        headline: 'Consultorias & Pareceres Jurídicos',
        subtitle: 'Atendimento estratégico presencial ou por videoconferência com sigilo absoluto',
        badge: 'HONORÁRIOS & SERVIÇOS',
        items: [
          {
            id: 'srv-law-1',
            name: 'Consultoria Estratégica Individual',
            description: 'Análise completa do seu caso com diagnóstico jurídico e plano de ação imediato.',
            price: 'R$ 450',
            oldPrice: 'R$ 600',
            duration: '1h30',
            badge: 'MAIS PROCURADO',
            ctaLabel: 'Agendar',
            actionType: 'booking',
            featured: true,
            imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=400',
          },
          {
            id: 'srv-law-2',
            name: 'Elaboração de Contrato & Blindagem',
            description: 'Redação ou revisão técnica de contratos empresariais, patrimoniais ou imobiliários.',
            price: 'R$ 980',
            oldPrice: '',
            duration: '5 dias úteis',
            badge: 'BLINDAGEM',
            ctaLabel: 'Solicitar',
            actionType: 'whatsapp',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=400',
          },
          {
            id: 'srv-law-3',
            name: 'Planejamento Previdenciário Completo',
            description: 'Cálculo detalhado de tempo de contribuição e projeção do melhor benefício.',
            price: 'R$ 790',
            oldPrice: '',
            duration: 'Entrega PDF',
            badge: 'ESPECIALIDADE',
            ctaLabel: 'Reservar',
            actionType: 'booking',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
          },
        ],
      },
      beauty: {
        headline: 'Menu de Procedimentos & Beleza',
        subtitle: 'Protocolos exclusivos com produtos importados e durabilidade superior',
        badge: 'TABELA VIP',
        items: [
          {
            id: 'srv-bty-1',
            name: 'Alongamento em Fibra de Vidro Slim',
            description: 'Curvatura natural europeia, acabamento ultrafino e resistência de até 35 dias.',
            price: 'R$ 240',
            oldPrice: 'R$ 290',
            duration: '2h00',
            badge: 'CARRO-CHEFE',
            ctaLabel: 'Agendar',
            actionType: 'booking',
            featured: true,
            imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400',
          },
          {
            id: 'srv-bty-2',
            name: 'Nanoblading Realista Fio a Fio',
            description: 'Design de sobrancelhas com visagismo facial e pigmentos hipoalergênicos.',
            price: 'R$ 490',
            oldPrice: 'R$ 580',
            duration: '1h45',
            badge: 'NATURALIDADE',
            ctaLabel: 'Reservar',
            actionType: 'booking',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400',
          },
          {
            id: 'srv-bty-3',
            name: 'Curso VIP Presencial / Mentoria Pro',
            description: 'Domine a técnica do zero ao avançado com certificado internacional e apostila.',
            price: 'R$ 1.290',
            oldPrice: 'R$ 1.590',
            duration: '2 Dias Intensivos',
            badge: 'VAGAS LIMITADAS',
            ctaLabel: 'Quero Ser Aluna',
            actionType: 'whatsapp',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=400',
          },
        ],
      },
      barber: {
        headline: 'Menu de Cortes, Barba & Combos',
        subtitle: 'Toalha quente, visagismo masculino e bebida cortesia em todos os horários',
        badge: 'GROOMING CLUB',
        items: [
          {
            id: 'srv-brb-1',
            name: 'Combo Gentleman (Corte + Barboterapia)',
            description: 'Corte navalhado ou tesoura + barba com vapor de ozônio, toalha quente e massagem.',
            price: 'R$ 110',
            oldPrice: 'R$ 135',
            duration: '1h15',
            badge: 'MAIS PEDIDO',
            ctaLabel: 'Reservar',
            actionType: 'booking',
            featured: true,
            imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=400',
          },
          {
            id: 'srv-brb-2',
            name: 'Corte Degradê / Fade de Precisão',
            description: 'Acabamento impecável na navalha, lavagem revigorante e finalização com pomada matte.',
            price: 'R$ 70',
            oldPrice: '',
            duration: '45 min',
            badge: 'CLÁSSICO',
            ctaLabel: 'Agendar',
            actionType: 'booking',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=400',
          },
          {
            id: 'srv-brb-3',
            name: 'Assinatura Mensal VIP (Corte Ilimitado)',
            description: 'Cabelo sempre alinhado o mês inteiro com prioridade na agenda e descontos.',
            price: 'R$ 149/mês',
            oldPrice: 'R$ 220',
            duration: 'Plano Mensal',
            badge: 'CLUBE VIP',
            ctaLabel: 'Assinar Clube',
            actionType: 'whatsapp',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=400',
          },
        ],
      },
      mentorship: {
        headline: 'Programas de Mentoria, Cursos & Infoprodutos',
        subtitle: 'Acelere seus resultados com acompanhamento estratégico e método validado',
        badge: 'EDUCAÇÃO & ESCALA',
        items: [
          {
            id: 'srv-mnt-1',
            name: 'Mentoria Individual High-Ticket',
            description: 'Acompanhamento próximo por 90 dias com plano de posicionamento e escala comercial.',
            price: 'R$ 2.997',
            oldPrice: 'R$ 4.500',
            duration: '6 Encontros 1:1',
            badge: 'APLICAÇÃO VIP',
            ctaLabel: 'Aplicar Agora',
            actionType: 'whatsapp',
            featured: true,
            imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=400',
          },
          {
            id: 'srv-mnt-2',
            name: 'Formação Completa Online + Templates',
            description: 'Mais de 40 aulas práticas passo a passo, scripts de vendas e comunidade exclusiva.',
            price: 'R$ 497',
            oldPrice: 'R$ 997',
            duration: 'Acesso 1 Ano',
            badge: 'ACESSO IMEDIATO',
            ctaLabel: 'Garantir Vaga',
            actionType: 'booking',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400',
          },
        ],
      },
      health: {
        headline: 'Consultas, Protocolos & Avaliações',
        subtitle: 'Cuidado integrativo e humanizado focado na sua saúde, longevidade e bem-estar',
        badge: 'ATENDIMENTO CLÍNICO',
        items: [
          {
            id: 'srv-hlt-1',
            name: 'Consulta Inicial + Bioimpedância / Avaliação',
            description: 'Anamnese completa, exames laboratoriais e plano personalizado para a sua rotina.',
            price: 'R$ 420',
            oldPrice: 'R$ 520',
            duration: '1h20',
            badge: 'COMPLETA',
            ctaLabel: 'Agendar Consulta',
            actionType: 'booking',
            featured: true,
            imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400',
          },
          {
            id: 'srv-hlt-2',
            name: 'Programa de Acompanhamento Trimestral',
            description: '3 consultas com suporte direto via WhatsApp e ajustes constantes de protocolo.',
            price: 'R$ 990',
            oldPrice: 'R$ 1.260',
            duration: '90 Dias',
            badge: 'MAIS RESULTADO',
            ctaLabel: 'Reservar',
            actionType: 'booking',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=400',
          },
        ],
      },
    };
    const preset = presets[presetKey];
    if (preset) {
      triggerSimulatorSkeleton(340);
      setData(p => ({
        ...p,
        services: {
          ...p.services,
          enabled: true,
          headline: preset.headline,
          subtitle: preset.subtitle,
          badge: preset.badge,
          items: preset.items,
        },
      }));
      showToast('🏷️ Catálogo preenchido com o kit selecionado!');
    }
  };

  // Testimonials Helpers
  const addTestimonial = () => {
    const newT = {
      id: 't-' + Date.now(),
      clientName: 'Nome do Cliente',
      city: 'Cidade - UF',
      text: 'Experiência excepcional! Atendimento impecável e resultados transformadores.',
      rating: 5
    };
    setData(p => ({ ...p, testimonials: { ...p.testimonials, items: [...p.testimonials.items, newT] } }));
  };

  const removeTestimonial = (id: string) => {
    setData(p => ({
      ...p,
      testimonials: { ...p.testimonials, items: p.testimonials.items.filter(t => t.id !== id) }
    }));
  };

  const updateTestimonial = (id: string, field: string, val: string | number) => {
    setData(p => ({
      ...p,
      testimonials: {
        ...p.testimonials,
        items: p.testimonials.items.map(t => t.id === id ? { ...t, [field]: val } : t)
      }
    }));
  };

  // Switch Theme Preset
  const applyThemePreset = (themeKey: string) => {
    const thm = THEMES[themeKey];
    if (!thm) return;
    triggerSimulatorSkeleton(380);
    setData(p => ({
      ...p,
      theme: themeKey,
      customColors: { ...p.customColors, enabled: false },
      styling: {
        ...p.styling,
        fontFamily: thm.fontHeadline,
      }
    }));
  };

  // Complete 1-Click Kits for ALL Niches
  const NICHE_KITS: Record<string, {
    category: string;
    shortLabel: string;
    kitTitle: string;
    kitDescription: string;
    defaultTheme: string;
    announcement: { badge: string; text: string };
    profile: {
      name: string;
      title: string;
      tagline: string;
      cursivePhrase: string;
      location: string;
      avatarUrl: string;
      aboutPhotoUrl: string;
    };
    metrics: {
      stat1Value: string;
      stat1Label: string;
      stat2Value: string;
      stat2Label: string;
      stat3Value: string;
      stat3Label: string;
    };
    actionCards: typeof INITIAL_DATA.actionCards;
    services: {
      headline: string;
      items: typeof INITIAL_DATA.services.items;
    };
  }> = {
    'Barbearia & Grooming': {
      category: 'Barbearia & Grooming',
      shortLabel: 'Barbearia',
      kitTitle: 'Kit Completo: Barbearia & Grooming Masculino',
      kitDescription: 'Aplica tema de barbearia, agendamento sem fila, clube de assinatura VIP e tabela de cortes/barboterapia.',
      defaultTheme: 'barberVintage',
      announcement: {
        badge: 'HORÁRIOS DISPONÍVEIS HOJE',
        text: 'Agende seu corte ou barboterapia em 30 segundos sem fila de espera.',
      },
      profile: {
        name: 'DON CORLEONE BARBER',
        title: 'BARBEARIA CLÁSSICA & VISAGISMO MASCULINO',
        tagline: 'Cerveja artesanal gelada, toalha quente e precisão na navalha. O ponto de encontro do homem de respeito.',
        cursivePhrase: 'Tradição, excelência e estilo em cada detalhe.',
        location: 'Av. Paulista, 1450 · Estacionamento VIP no Local',
        avatarUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=900',
        aboutPhotoUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600',
      },
      metrics: {
        stat1Value: '+8.500',
        stat1Label: 'CORTES & BARBAS',
        stat2Value: '4.9 ★',
        stat2Label: 'AVALIAÇÃO GOOGLE',
        stat3Value: '10 Anos',
        stat3Label: 'TRADIÇÃO & ESTILO',
      },
      actionCards: [
        {
          id: 'barber-cta-1',
          title: 'AGENDAR MEU HORÁRIO AGORA',
          subtitle: 'Escolha seu barbeiro, serviço e horário em 30 segundos.',
          icon: 'Scissors',
          linkType: 'booking',
          url: '#booking',
          whatsappMessage: 'Olá! Gostaria de agendar um horário na barbearia.',
          openInNewTab: true,
          animation: 'pulse-glow',
          variant: 'accent',
          badgeText: 'SEM FILA',
          customBg: '#d97706',
          customText: '#000000',
          bgImage: '',
          imagePosition: 'right',
          cardImage: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=400',
          imageFitStyle: 'popout',
          imageSize: 92,
          ctaActionText: 'RESERVAR HORÁRIO',
        },
        {
          id: 'barber-cta-2',
          title: 'CLUBE DE ASSINATURA VIP',
          subtitle: 'Corte e barba ilimitados o mês inteiro a partir de R$ 149,90.',
          icon: 'Star',
          linkType: 'whatsapp',
          url: '',
          whatsappMessage: 'Olá! Quero conhecer os planos do Clube de Assinatura VIP da Barbearia.',
          openInNewTab: true,
          animation: 'shimmer',
          variant: 'default',
          badgeText: 'MAIS ASSINADO',
          customBg: '#211c18',
          customText: '#f5efe6',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'CONHECER PLANOS',
        },
        {
          id: 'barber-cta-3',
          title: 'MENU DE CORTES, BARBA & COMBOS',
          subtitle: 'Confira todos os serviços, pigmentação e selagem masculina.',
          icon: 'Scissors',
          linkType: 'catalogo',
          url: '#catalogo',
          whatsappMessage: '',
          openInNewTab: false,
          animation: 'none',
          variant: 'default',
          badgeText: '',
          customBg: '#211c18',
          customText: '#f5efe6',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: '',
        },
      ],
      services: {
        headline: 'Menu de Serviços & Grooming',
        items: [
          {
            id: 'srv-b1',
            name: 'Combo Gentleman (Corte + Barboterapia)',
            description: 'Toalha quente, massagem facial com ozônio e bebida cortesia.',
            price: 'R$ 110',
            duration: '1h15',
            imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-b2',
            name: 'Corte Degradê / Fade Navalhado',
            description: 'Acabamento de alta precisão, lavagem especial e pomada matte.',
            price: 'R$ 70',
            duration: '45min',
            imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-b3',
            name: 'Barboterapia Real com Óleos Essenciais',
            description: 'Alinhamento geométrico, esfoliação e hidratação profunda.',
            price: 'R$ 60',
            duration: '40min',
            imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=300',
          },
        ],
      },
    },

    'Beleza & Unhas': {
      category: 'Beleza & Unhas',
      shortLabel: 'Beleza & Unhas',
      kitTitle: 'Kit Completo: Nail Designer & Alongamento de Luxo',
      kitDescription: 'Aplica tema Dark Gold, botões para agendamento de unhas/fibra de vidro, catálogo e curso VIP.',
      defaultTheme: 'darkGold',
      announcement: {
        badge: 'AGENDA DA SEMANA ABERTA',
        text: 'Últimos horários disponíveis para Alongamento & Manutenção VIP.',
      },
      profile: {
        name: 'LARISSA ALMEIDA',
        title: 'NAIL DESIGNER & ALONGAMENTO DE LUXO',
        tagline: 'Especialista em Fibra de Vidro Slim, Gel Moldado e Naturalidade Europeia com durabilidade impecável.',
        cursivePhrase: 'Elegância e sofisticação na ponta dos seus dedos.',
        location: 'Studio Privé · Jardins, São Paulo - SP',
        avatarUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=900',
        aboutPhotoUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
      },
      metrics: {
        stat1Value: '+3.200',
        stat1Label: 'ATENDIMENTOS',
        stat2Value: '35 Dias',
        stat2Label: 'DURABILIDADE',
        stat3Value: '100%',
        stat3Label: 'BIOSSEGURANÇA',
      },
      actionCards: [
        {
          id: 'nails-cta-1',
          title: 'AGENDAR MEU HORÁRIO NO STUDIO',
          subtitle: 'Alongamento em Fibra, Banho de Gel e Esmaltação Premium.',
          icon: 'Calendar',
          linkType: 'booking',
          url: '#booking',
          whatsappMessage: 'Olá Larissa! Gostaria de agendar um horário para fazer as unhas.',
          openInNewTab: true,
          animation: 'pulse-glow',
          variant: 'accent',
          badgeText: 'VAGAS LIMITADAS',
          customBg: '#d4af37',
          customText: '#000000',
          bgImage: '',
          imagePosition: 'right',
          cardImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400',
          imageFitStyle: 'popout',
          imageSize: 92,
          ctaActionText: 'GARANTIR HORÁRIO',
        },
        {
          id: 'nails-cta-2',
          title: 'CURSO VIP DE FIBRA DE VIDRO',
          subtitle: 'Do zero à naturalidade europeia com certificado internacional.',
          icon: 'GraduationCap',
          linkType: 'whatsapp',
          url: '',
          whatsappMessage: 'Olá! Quero receber todas as informações sobre o Curso VIP de Nail Designer.',
          openInNewTab: true,
          animation: 'shimmer',
          variant: 'default',
          badgeText: 'INSCRIÇÕES ABERTAS',
          customBg: '#f5ede4',
          customText: '#2a241e',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'QUERO SER ALUNA',
        },
        {
          id: 'nails-cta-3',
          title: 'TABELA DE PROCEDIMENTOS & VALORES',
          subtitle: 'Consulte as opções de aplicação, blindagem e manutenção.',
          icon: 'Sparkles',
          linkType: 'catalogo',
          url: '#catalogo',
          whatsappMessage: '',
          openInNewTab: false,
          animation: 'none',
          variant: 'default',
          badgeText: '',
          customBg: '#f5ede4',
          customText: '#2a241e',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: '',
        },
      ],
      services: {
        headline: 'Menu de Alongamentos & Nail Care',
        items: [
          {
            id: 'srv-n1',
            name: 'Alongamento em Fibra de Vidro Slim',
            description: 'Curvatura natural, resistência extrema e acabamento ultrafino.',
            price: 'R$ 240',
            duration: '2h00',
            imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-n2',
            name: 'Banho de Gel & Blindagem Diamante',
            description: 'Proteção estrutural para o crescimento saudável das unhas naturais.',
            price: 'R$ 160',
            duration: '1h30',
            imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-n3',
            name: 'Manutenção + Cutilagem Russa & Gel',
            description: 'Nivelamento perfeito do crescimento com esmaltação em gel de alto brilho.',
            price: 'R$ 150',
            duration: '1h30',
            imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=300',
          },
        ],
      },
    },

    'Beleza & Alta Conversão': {
      category: 'Beleza & Alta Conversão',
      shortLabel: 'Sobrancelhas & Lash',
      kitTitle: 'Kit Completo: Sobrancelhas, Cílios & Beleza Poderosa',
      kitDescription: 'Aplica tema Ruby Imperial, funil de agendamento de Nanoblading/Lash e vitrine de procedimentos.',
      defaultTheme: 'rubyImperial',
      announcement: {
        badge: 'STUDIO DE OLHARES',
        text: 'Atendimento exclusivo com visagismo facial personalizado.',
      },
      profile: {
        name: 'JANNE CAMPELO',
        title: 'ESPECIALISTA EM SOBRANCELHAS & LASH DESIGN',
        tagline: 'Realçando a força do seu olhar com Nanoblading Realista, Brow Lamination e Extensão de Cílios de alta retenção.',
        cursivePhrase: 'Seu olhar transmite o seu verdadeiro poder.',
        location: 'Edifício Prime Beauty · Sala 804',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=900',
        aboutPhotoUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
      },
      metrics: {
        stat1Value: '+4.500',
        stat1Label: 'OLHARES REALÇADOS',
        stat2Value: '98%',
        stat2Label: 'FIDELIDADE',
        stat3Value: '7 Anos',
        stat3Label: 'EXPERIÊNCIA',
      },
      actionCards: [
        {
          id: 'lash-cta-1',
          title: 'AGENDAR DESIGN, LASH OU NANOBLADING',
          subtitle: 'Avaliação de visagismo inclusa em todos os procedimentos.',
          icon: 'Sparkles',
          linkType: 'booking',
          url: '#booking',
          whatsappMessage: 'Olá Janne! Quero agendar um procedimento para realçar meu olhar.',
          openInNewTab: true,
          animation: 'pulse-glow',
          variant: 'accent',
          badgeText: 'AGENDA VIP',
          customBg: '#e11d48',
          customText: '#ffffff',
          bgImage: '',
          imagePosition: 'right',
          cardImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
          imageFitStyle: 'popout',
          imageSize: 92,
          ctaActionText: 'AGENDAR AGORA',
        },
        {
          id: 'lash-cta-2',
          title: 'CATÁLOGO DE PROCEDIMENTOS DO OLHAR',
          subtitle: 'Conheça nossas técnicas de Fio a Fio, Brow Lamination e Fox Eyes.',
          icon: 'Heart',
          linkType: 'catalogo',
          url: '#catalogo',
          whatsappMessage: '',
          openInNewTab: false,
          animation: 'none',
          variant: 'default',
          badgeText: '',
          customBg: '#881337',
          customText: '#ffffff',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: '',
        },
        {
          id: 'lash-cta-3',
          title: 'FALAR COM A RECEPÇÃO NO WHATSAPP',
          subtitle: 'Tire dúvidas sobre cicatrização, durabilidade e valores.',
          icon: 'MessageCircle',
          linkType: 'whatsapp',
          url: '',
          whatsappMessage: 'Olá! Gostaria de tirar uma dúvida sobre os procedimentos.',
          openInNewTab: true,
          animation: 'shimmer',
          variant: 'default',
          badgeText: 'ONLINE',
          customBg: '#881337',
          customText: '#ffffff',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'CHAMAR NO WHATSAPP',
        },
      ],
      services: {
        headline: 'Protocolos Exclusivos para o Olhar',
        items: [
          {
            id: 'srv-l1',
            name: 'Nanoblading Fio a Fio Hiper-Realista',
            description: 'Preenchimento artístico que imita o caimento natural dos fios.',
            price: 'R$ 690',
            duration: '2h00',
            imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-l2',
            name: 'Extensão de Cílios Volume Fox Eyes / Brasileiro',
            description: 'Efeito delineado marcante com leveza e retenção de até 35 dias.',
            price: 'R$ 230',
            duration: '1h45',
            imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-l3',
            name: 'Brow Lamination + Design com Tintura',
            description: 'Alinhamento e nutrição dos fios para sobrancelhas encorpadas e modernas.',
            price: 'R$ 180',
            duration: '1h00',
            imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=300',
          },
        ],
      },
    },

    'Jurídico & Executivo': {
      category: 'Jurídico & Executivo',
      shortLabel: 'Jurídico',
      kitTitle: 'Kit Completo: Advocacia Estratégica & Consultoria Executiva',
      kitDescription: 'Aplica tema Navy Royal & Gold, agendamento de consulta jurídica, pareceres e áreas de atuação.',
      defaultTheme: 'navyLaw',
      announcement: {
        badge: 'CONSULTORIA JURÍDICA VIP',
        text: 'Atendimento presencial e digital com sigilo absoluto em todo o Brasil.',
      },
      profile: {
        name: 'DRA. MARINA ALMEIDA',
        title: 'ADVOCACIA ESTRATÉGICA & PATRIMONIAL',
        tagline: 'Defesa técnica de excelência em Direito Empresarial, Família, Sucessões e Planejamento Previdenciário.',
        cursivePhrase: 'Compromisso, ética e segurança jurídica para você.',
        location: 'Av. Paulista, 1200 - Bela Vista, São Paulo - SP',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=900',
        aboutPhotoUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=600',
      },
      metrics: {
        stat1Value: '+650',
        stat1Label: 'CASOS & PARECERES',
        stat2Value: '12 Anos',
        stat2Label: 'DE EXPERIÊNCIA',
        stat3Value: '100%',
        stat3Label: 'SIGILO & RIGOR',
      },
      actionCards: [
        {
          id: 'law-cta-1',
          title: 'AGENDAR CONSULTA JURÍDICA VIP',
          subtitle: 'Atendimento presencial ou por videoconferência com análise prévia.',
          icon: 'Scale',
          linkType: 'booking',
          url: '#booking',
          whatsappMessage: 'Olá Dra. Marina! Gostaria de agendar uma consulta jurídica.',
          openInNewTab: true,
          animation: 'pulse-glow',
          variant: 'accent',
          badgeText: 'AGENDA ABERTA',
          customBg: '#e2b857',
          customText: '#0f172a',
          bgImage: '',
          imagePosition: 'right',
          cardImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
          imageFitStyle: 'popout',
          imageSize: 92,
          ctaActionText: 'SOLICITAR HORÁRIO',
        },
        {
          id: 'law-cta-2',
          title: 'GUIA ESTRATÉGICO & PLANEJAMENTO',
          subtitle: 'Materiais exclusivos sobre blindagem patrimonial e previdência.',
          icon: 'Briefcase',
          linkType: 'catalogo',
          url: '#catalogo',
          whatsappMessage: '',
          openInNewTab: false,
          animation: 'none',
          variant: 'default',
          badgeText: '',
          customBg: '#ffffff',
          customText: '#0f172a',
          bgImage: '',
          imagePosition: 'left',
          cardImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=400',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'CONSULTAR ÁREAS',
        },
        {
          id: 'law-cta-3',
          title: 'FALAR COM O ESCRITÓRIO NO WHATSAPP',
          subtitle: 'Envie sua demanda para triagem rápida com nossa equipe jurídica.',
          icon: 'MessageCircle',
          linkType: 'whatsapp',
          url: '',
          whatsappMessage: 'Olá! Gostaria de atendimento jurídico personalizado.',
          openInNewTab: true,
          animation: 'shimmer',
          variant: 'default',
          badgeText: 'PLANTÃO',
          customBg: '#ffffff',
          customText: '#0f172a',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'INICIAR ATENDIMENTO',
        },
      ],
      services: {
        headline: 'Áreas de Atuação & Consultoria',
        items: [
          {
            id: 'srv-j1',
            name: 'Consultoria Jurídica Estratégica Individual',
            description: 'Diagnóstico completo do caso com plano de ação preventivo ou contencioso.',
            price: 'R$ 450',
            duration: '1h30',
            imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-j2',
            name: 'Planejamento Patrimonial & Sucessório',
            description: 'Estruturação de Holding Familiar, testamentos e proteção de ativos.',
            price: 'Sob Consulta',
            duration: 'Personalizado',
            imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-j3',
            name: 'Planejamento Previdenciário Completo',
            description: 'Cálculo e projeção do melhor benefício de aposentadoria com parecer técnico.',
            price: 'R$ 890',
            duration: '5 dias',
            imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=300',
          },
        ],
      },
    },

    'Mentoria & Cursos': {
      category: 'Mentoria & Cursos',
      shortLabel: 'Mentoria & Cursos',
      kitTitle: 'Kit Completo: Mentoria High-Ticket & Infoprodutos',
      kitDescription: 'Aplica tema Warm Bronze, aplicação para mentoria, botão de e-book com imagem lateral e cursos.',
      defaultTheme: 'warmMentorship',
      announcement: {
        badge: 'APLICAÇÕES ABERTAS',
        text: 'Nova turma da Mentoria Executiva High-Ticket — Vagas limitadas.',
      },
      profile: {
        name: 'MARIANA CARVALHO',
        title: 'MENTORA DE NEGÓCIOS & POSICIONAMENTO',
        tagline: 'Ajudo especialistas e empresárias a multiplicarem seu faturamento com posicionamento de alto valor no digital.',
        cursivePhrase: 'Posicionamento de elite atrai clientes de elite.',
        location: 'Atendimento Global Online & Imersões em São Paulo',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=900',
        aboutPhotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      },
      metrics: {
        stat1Value: '+1.800',
        stat1Label: 'ALUNAS FORMADAS',
        stat2Value: 'R$ 15M+',
        stat2Label: 'GERADOS NO MÉTODO',
        stat3Value: '4.9 ★',
        stat3Label: 'SATISFAÇÃO',
      },
      actionCards: [
        {
          id: 'ment-cta-1',
          title: 'APLICAR PARA A MENTORIA HIGH-TICKET',
          subtitle: 'Acompanhamento individual e em grupo para escalar seu negócio.',
          icon: 'GraduationCap',
          linkType: 'quiz',
          url: '#quiz',
          whatsappMessage: 'Olá Mariana! Quero aplicar para uma vaga na Mentoria High-Ticket.',
          openInNewTab: true,
          animation: 'pulse-glow',
          variant: 'accent',
          badgeText: 'VAGAS LIMITADAS',
          customBg: '#d99f69',
          customText: '#261b14',
          bgImage: '',
          imagePosition: 'right',
          cardImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
          imageFitStyle: 'popout',
          imageSize: 92,
          ctaActionText: 'FAZER APLICAÇÃO',
        },
        {
          id: 'ment-cta-2',
          title: 'E-BOOK: O CÓDIGO DA AUTORIDADE',
          subtitle: 'O passo a passo para transformar seguidores em clientes de alto ticket.',
          icon: 'Sparkles',
          linkType: 'catalogo',
          url: '#catalogo',
          whatsappMessage: '',
          openInNewTab: false,
          animation: 'shimmer',
          variant: 'default',
          badgeText: 'BEST-SELLER',
          customBg: '#f7efe6',
          customText: '#261b14',
          bgImage: '',
          imagePosition: 'left',
          cardImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'BAIXE AGORA',
        },
        {
          id: 'ment-cta-3',
          title: 'CONTRATAR PALESTRAS & TREINAMENTOS',
          subtitle: 'Fale diretamente com minha assessoria executiva pelo WhatsApp.',
          icon: 'Briefcase',
          linkType: 'whatsapp',
          url: '',
          whatsappMessage: 'Olá! Gostaria de consultar agenda de palestras e mentorias da Mariana.',
          openInNewTab: true,
          animation: 'none',
          variant: 'default',
          badgeText: '',
          customBg: '#f7efe6',
          customText: '#261b14',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: '',
        },
      ],
      services: {
        headline: 'Programas de Mentoria & Formações',
        items: [
          {
            id: 'srv-m1',
            name: 'Mentoria Individual VIP (90 Dias)',
            description: 'Reestruturação completa de oferta, funil de vendas e posicionamento premium.',
            price: 'R$ 5.000',
            duration: '3 Meses',
            imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-m2',
            name: 'Curso Posicionamento Magnético 2.0',
            description: '+60 aulas práticas com scripts de vendas, narrativa de stories e estética.',
            price: 'R$ 997',
            duration: 'Acesso 1 Ano',
            imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-m3',
            name: 'Consultoria Express de Diagnóstico (2h)',
            description: 'Encontro intensivo individual com entrega de plano de ação imediato.',
            price: 'R$ 890',
            duration: '2h00',
            imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=300',
          },
        ],
      },
    },

    'Saúde & Psicologia': {
      category: 'Saúde & Psicologia',
      shortLabel: 'Saúde & Psicologia',
      kitTitle: 'Kit Completo: Psicologia Clínica, Terapia & Saúde',
      kitDescription: 'Aplica tema Terracotta & Linho, agendamento de primeira sessão, acolhimento e modalidades.',
      defaultTheme: 'terracottaWarm',
      announcement: {
        badge: 'ACOLHIMENTO ONLINE & PRESENCIAL',
        text: 'Atendimento psicológico humanizado para adultos no Brasil e exterior.',
      },
      profile: {
        name: 'PSI. MARTINA BIANCHI',
        title: 'PSICÓLOGA CLÍNICA · CRP 06/12345',
        tagline: 'Psicoterapia individual focada em ansiedade, autoestima, esgotamento profissional e relacionamentos saudáveis.',
        cursivePhrase: 'Cuidar da sua saúde emocional é um ato de coragem.',
        location: 'Consultório em Pinheiros - SP & Atendimento Online Global',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=900',
        aboutPhotoUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600',
      },
      metrics: {
        stat1Value: '+2.400',
        stat1Label: 'SESSÕES REALIZADAS',
        stat2Value: '9 Anos',
        stat2Label: 'PRÁTICA CLÍNICA',
        stat3Value: '100%',
        stat3Label: 'SIGILO & ÉTICA',
      },
      actionCards: [
        {
          id: 'psi-cta-1',
          title: 'AGENDAR PRIMEIRA SESSÃO',
          subtitle: 'Consulte a disponibilidade de horários para terapia online ou presencial.',
          icon: 'Calendar',
          linkType: 'booking',
          url: '#booking',
          whatsappMessage: 'Olá Martina! Gostaria de verificar horários disponíveis para iniciar a psicoterapia.',
          openInNewTab: true,
          animation: 'pulse-glow',
          variant: 'accent',
          badgeText: 'AGENDA ABERTA',
          customBg: '#a0583b',
          customText: '#ffffff',
          bgImage: '',
          imagePosition: 'right',
          cardImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
          imageFitStyle: 'popout',
          imageSize: 92,
          ctaActionText: 'VER HORÁRIOS',
        },
        {
          id: 'psi-cta-2',
          title: 'COMO FUNCIONA A PSICOTERAPIA',
          subtitle: 'Entenda a abordagem clínica, frequência das sessões e recibos para reembolso.',
          icon: 'Heart',
          linkType: 'catalogo',
          url: '#catalogo',
          whatsappMessage: '',
          openInNewTab: false,
          animation: 'none',
          variant: 'default',
          badgeText: '',
          customBg: '#8c4528',
          customText: '#ffffff',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: '',
        },
        {
          id: 'psi-cta-3',
          title: 'TIRAR DÚVIDAS PELO WHATSAPP',
          subtitle: 'Converse diretamente comigo para alinhar sua necessidade inicial.',
          icon: 'MessageCircle',
          linkType: 'whatsapp',
          url: '',
          whatsappMessage: 'Olá Martina! Vi seu link na bio e gostaria de tirar uma dúvida sobre as sessões.',
          openInNewTab: true,
          animation: 'none',
          variant: 'default',
          badgeText: 'ACOLHIMENTO',
          customBg: '#8c4528',
          customText: '#ffffff',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'ENVIAR MENSAGEM',
        },
      ],
      services: {
        headline: 'Modalidades de Atendimento Clínico',
        items: [
          {
            id: 'srv-p1',
            name: 'Psicoterapia Individual Online ou Presencial',
            description: 'Sessões semanais com escuta qualificada e espaço seguro de acolhimento.',
            price: 'R$ 250',
            duration: '50min',
            imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-p2',
            name: 'Processo de Autoconhecimento & Transição de Carreira',
            description: 'Acompanhamento focado em tomada de decisões, burnout e metas de vida.',
            price: 'R$ 280',
            duration: '50min',
            imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-p3',
            name: 'Palestras & Rodas de Conversa em Saúde Mental',
            description: 'Encontros para empresas e equipes sobre prevenção de ansiedade e equilíbrio.',
            price: 'Sob Consulta',
            duration: '1h30',
            imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=300',
          },
        ],
      },
    },

    'Moda & Juventude': {
      category: 'Moda & Juventude',
      shortLabel: 'Moda & Loja',
      kitTitle: 'Kit Completo: Moda Feminina, Boutique & Consultoria de Estilo',
      kitDescription: 'Aplica tema Pink Glam Acetinado, catálogo de coleção nova, provador VIP e atendimento com consultora.',
      defaultTheme: 'pinkGlam',
      announcement: {
        badge: 'NOVA COLEÇÃO DISPONÍVEL',
        text: 'Envio expresso para todo o Brasil e motoboy no mesmo dia em SP.',
      },
      profile: {
        name: 'HELLEN MARQUES',
        title: 'MODA FEMININA, BOUTIQUE & PERSONAL STYLING',
        tagline: 'Peças selecionadas de alfaiataria moderna e looks versáteis para mulheres que amam se vestir com poder.',
        cursivePhrase: 'Vista-se da sua melhor versão todos os dias.',
        location: 'Showroom Moema - SP · Enviamos para todo o Brasil',
        avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=900',
        aboutPhotoUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600',
      },
      metrics: {
        stat1Value: '+12 mil',
        stat1Label: 'CLIENTES NO BRASIL',
        stat2Value: '24h',
        stat2Label: 'ENVIO EXPRESSO',
        stat3Value: '5.0 ★',
        stat3Label: 'AVALIAÇÃO VIP',
      },
      actionCards: [
        {
          id: 'mod-cta-1',
          title: 'VER LANÇAMENTOS & NOVA COLEÇÃO',
          subtitle: 'Confira os looks disponíveis a pronta-entrega com numeração completa.',
          icon: 'Sparkles',
          linkType: 'catalogo',
          url: '#catalogo',
          whatsappMessage: '',
          openInNewTab: false,
          animation: 'pulse-glow',
          variant: 'accent',
          badgeText: 'COLEÇÃO NOVA',
          customBg: '#e11d74',
          customText: '#ffffff',
          bgImage: '',
          imagePosition: 'right',
          cardImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400',
          imageFitStyle: 'popout',
          imageSize: 92,
          ctaActionText: 'VER CATÁLOGO',
        },
        {
          id: 'mod-cta-2',
          title: 'COMPRAR COM CONSULTORA NO WHATSAPP',
          subtitle: 'Atendimento personalizado com vídeos reais das peças e medidas.',
          icon: 'MessageCircle',
          linkType: 'whatsapp',
          url: '',
          whatsappMessage: 'Olá! Quero atendimento personalizado para ver os lançamentos da loja.',
          openInNewTab: true,
          animation: 'shimmer',
          variant: 'default',
          badgeText: 'PROVADOR VIP',
          customBg: '#ffffff',
          customText: '#4c1d29',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'CHAMAR CONSULTORA',
        },
        {
          id: 'mod-cta-3',
          title: 'AGENDAR MALINHA DELIVERY / SHOWROOM',
          subtitle: 'Receba nossa curadoria de looks na sua casa sem compromisso.',
          icon: 'Calendar',
          linkType: 'booking',
          url: '#booking',
          whatsappMessage: 'Olá! Quero solicitar a Malinha Delivery / Visita ao Showroom.',
          openInNewTab: true,
          animation: 'none',
          variant: 'default',
          badgeText: '',
          customBg: '#ffffff',
          customText: '#4c1d29',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: '',
        },
      ],
      services: {
        headline: 'Destaques da Nova Coleção & Serviços',
        items: [
          {
            id: 'srv-f1',
            name: 'Conjunto Alfaiataria Milanese Premium',
            description: 'Blazer estruturado com corte italiano + calça pantalona de caimento impecável.',
            price: 'R$ 489',
            duration: 'P, M e G',
            imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-f2',
            name: 'Vestido Midi Satin Glam',
            description: 'Tecido acetinado de toque macio, ideal para eventos, jantares e celebrações.',
            price: 'R$ 359',
            duration: 'Pronta-Entrega',
            imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-f3',
            name: 'Consultoria de Imagem & Coloração Pessoal',
            description: 'Descubra sua cartela de cores e monte um guarda-roupa inteligente.',
            price: 'R$ 590',
            duration: '2h30',
            imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=300',
          },
        ],
      },
    },

    'Consultoria & Estética': {
      category: 'Consultoria & Estética',
      shortLabel: 'Estética & Clínica',
      kitTitle: 'Kit Completo: Estética Avançada, Harmonização & Dermatologia',
      kitDescription: 'Aplica tema Champagne Minimal Nude, avaliação facial 3D, protocolos de colágeno e concierge VIP.',
      defaultTheme: 'champagneNude',
      announcement: {
        badge: 'CLÍNICA BOUTIQUE',
        text: 'Agende sua Consulta de Avaliação Facial & Corporal Personalizada.',
      },
      profile: {
        name: 'DRA. FERNANDA MARCOLIN',
        title: 'HARMONIZAÇÃO FACIAL & ESTÉTICA AVANÇADA',
        tagline: 'Protocolos médicos e estéticos de Bioestimuladores, Toxina Botulínica e Rejuvenescimento com foco na naturalidade.',
        cursivePhrase: 'Realçando sua beleza única com ciência, arte e sutileza.',
        location: 'Clínica Concept · Itaim Bibi, São Paulo - SP',
        avatarUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=900',
        aboutPhotoUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600',
      },
      metrics: {
        stat1Value: '+3.800',
        stat1Label: 'PROCEDIMENTOS',
        stat2Value: '11 Anos',
        stat2Label: 'EXPERIÊNCIA CLÍNICA',
        stat3Value: '99.4%',
        stat3Label: 'NATURALIDADE',
      },
      actionCards: [
        {
          id: 'est-cta-1',
          title: 'AGENDAR AVALIAÇÃO FACIAL PERSONALIZADA',
          subtitle: 'Planejamento individualizado de rejuvenescimento e gerenciamento da pele.',
          icon: 'Calendar',
          linkType: 'booking',
          url: '#booking',
          whatsappMessage: 'Olá! Gostaria de agendar uma Consulta de Avaliação com a Dra. Fernanda.',
          openInNewTab: true,
          animation: 'pulse-glow',
          variant: 'accent',
          badgeText: 'AGENDA ABERTA',
          customBg: '#a8947a',
          customText: '#ffffff',
          bgImage: '',
          imagePosition: 'right',
          cardImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
          imageFitStyle: 'popout',
          imageSize: 92,
          ctaActionText: 'AGENDAR CONSULTA',
        },
        {
          id: 'est-cta-2',
          title: 'PROTOCOLOS FACIAIS & BIOESTIMULADORES',
          subtitle: 'Conheça nossos tratamentos de colágeno, lábios, botox e tecnologias.',
          icon: 'Sparkles',
          linkType: 'catalogo',
          url: '#catalogo',
          whatsappMessage: '',
          openInNewTab: false,
          animation: 'none',
          variant: 'default',
          badgeText: '',
          customBg: '#ffffff',
          customText: '#26221c',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: '',
        },
        {
          id: 'est-cta-3',
          title: 'FALAR COM A CONCIERGE DA CLÍNICA',
          subtitle: 'Atendimento exclusivo via WhatsApp para dúvidas e pré-agendamento.',
          icon: 'MessageCircle',
          linkType: 'whatsapp',
          url: '',
          whatsappMessage: 'Olá! Gostaria de falar com a Concierge da Clínica sobre os procedimentos.',
          openInNewTab: true,
          animation: 'shimmer',
          variant: 'default',
          badgeText: 'CONCIERGE VIP',
          customBg: '#ffffff',
          customText: '#26221c',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'ATENDIMENTO VIP',
        },
      ],
      services: {
        headline: 'Protocolos de Estética & Rejuvenescimento',
        items: [
          {
            id: 'srv-e1',
            name: 'Protocolo Colágeno Gold (Bioestimulador + Tecnologias)',
            description: 'Estímulo profundo de firmeza, efeito lifting natural e melhora da textura da pele.',
            price: 'Sob Avaliação',
            duration: '1h00',
            imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-e2',
            name: 'Toxina Botulínica Preventiva & Full Face',
            description: 'Suavização elegante de linhas de expressão preservando a naturalidade do rosto.',
            price: 'R$ 1.290',
            duration: '45min',
            imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-e3',
            name: 'Escultura & Hidratação Labial com Ácido Hialurônico',
            description: 'Definição de contorno, volume sutil e revitalização profunda dos lábios.',
            price: 'R$ 1.450',
            duration: '50min',
            imageUrl: 'https://images.unsplash.com/photo-1512290900672-1f04d6c01f0f?auto=format&fit=crop&q=80&w=300',
          },
        ],
      },
    },
  };

  // Apply any niche's Complete Kit in 1 click
  const applyNicheKit = (categoryKey: string) => {
    const kit = NICHE_KITS[categoryKey];
    if (!kit) return;
    triggerSimulatorSkeleton(420);
    const currentThemeObj = THEMES[data.theme];
    const targetThemeId =
      currentThemeObj && currentThemeObj.category === categoryKey
        ? data.theme
        : kit.defaultTheme;
    const targetThemeObj = THEMES[targetThemeId] || THEMES[kit.defaultTheme];

    setData(p => ({
      ...p,
      theme: targetThemeId,
      customColors: { ...p.customColors, enabled: false },
      styling: {
        ...p.styling,
        fontFamily: targetThemeObj.fontHeadline,
      },
      announcement: {
        ...p.announcement,
        enabled: true,
        badge: kit.announcement.badge,
        text: kit.announcement.text,
      },
      profile: {
        ...p.profile,
        name: kit.profile.name,
        title: kit.profile.title,
        tagline: kit.profile.tagline,
        cursivePhrase: kit.profile.cursivePhrase,
        location: kit.profile.location,
        avatarUrl: kit.profile.avatarUrl,
        aboutPhotoUrl: kit.profile.aboutPhotoUrl,
      },
      metrics: {
        ...p.metrics,
        enabled: true,
        stat1Value: kit.metrics.stat1Value,
        stat1Label: kit.metrics.stat1Label,
        stat2Value: kit.metrics.stat2Value,
        stat2Label: kit.metrics.stat2Label,
        stat3Value: kit.metrics.stat3Value,
        stat3Label: kit.metrics.stat3Label,
      },
      actionCards: kit.actionCards,
      services: {
        ...p.services,
        enabled: true,
        headline: kit.services.headline,
        items: kit.services.items,
      },
    }));
  };

  // Categories list
  const themeCategories = [
    'Todos',
    'Barbearia & Grooming',
    'Beleza & Unhas',
    'Beleza & Alta Conversão',
    'Jurídico & Executivo',
    'Mentoria & Cursos',
    'Saúde & Psicologia',
    'Moda & Juventude',
    'Consultoria & Estética',
  ];

  const normalizedQuery = themeSearchQuery.trim().toLowerCase();
  const filteredThemes = Object.values(THEMES).filter((t) => {
    const matchesCategory = selectedThemeCategory === 'Todos' || t.category === selectedThemeCategory;
    if (!normalizedQuery) return matchesCategory;
    const searchableText = `${t.name} ${t.badge} ${t.category} ${t.keywords || ''} ${t.id}`.toLowerCase();
    return matchesCategory && searchableText.includes(normalizedQuery);
  });

  // Full HTML / CSS standalone generator (accepts optional targetData)
  const generateExportCode = (targetData?: typeof INITIAL_DATA) => {
    const siteData: typeof INITIAL_DATA = targetData || data;
    const baseThemeObj = THEMES[siteData.theme] || THEMES.navyLaw;
    const siteTheme = siteData.customColors?.enabled
      ? {
          ...baseThemeObj,
          id: 'custom',
          name: 'Paleta Personalizada',
          bg: siteData.customColors.bg,
          textMain: siteData.customColors.textMain,
          textMuted: siteData.customColors.textMuted,
          accent: siteData.customColors.accent,
          cardBg: siteData.customColors.cardBg,
          cardText: siteData.customColors.cardText,
          cardSubtext: siteData.customColors.cardText + '99',
          cardBorder: siteData.customColors.cardBorder,
          socialBg: siteData.customColors.socialBg,
          socialBorder: siteData.customColors.accent + '66',
          socialText: siteData.customColors.accent,
          iconBg: siteData.customColors.accent + '26',
          iconColor: siteData.customColors.accent,
          pillShadow: '0 8px 24px -4px rgba(0,0,0,0.4)',
          glowColor: siteData.customColors.glowColor + '38',
        }
      : baseThemeObj;

    const filterCss = PHOTO_FILTERS.find(f => f.id === siteData.styling.photoFilter)?.css || 'none';

    return ((data: typeof INITIAL_DATA, theme: typeof siteTheme) => {
      return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${siteData.seo?.metaTitle || `${siteData.profile.name} - ${siteData.profile.title}`}</title>
  <meta name="description" content="${siteData.seo?.metaDescription || siteData.profile.tagline || ''}">
  <meta name="keywords" content="${siteData.seo?.keywords || ''}">
  <!-- OpenGraph Meta Tags para Card do WhatsApp & Redes Sociais -->
  <meta property="og:title" content="${siteData.seo?.metaTitle || siteData.profile.name}">
  <meta property="og:description" content="${siteData.seo?.metaDescription || siteData.profile.tagline}">
  <meta property="og:image" content="${siteData.seo?.ogImageUrl || siteData.profile.avatarUrl}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  ${siteData.conversion?.metaPixelId ? `
  <!-- Meta Pixel Code -->
  <script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${siteData.conversion.metaPixelId}');
  fbq('track', 'PageView');
  </script>
  ` : ''}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Italianno&family=Montserrat:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background-color: ${theme.bg};
      color: ${theme.textMain};
      font-family: '${data.styling.fontFamily}', serif, sans-serif;
      display: flex;
      justify-content: center;
      padding: 0 0 40px;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      max-width: 440px;
      margin: 0 auto;
      position: relative;
      padding: 0 16px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      justify-content: ${data.styling.wrapperAlignment || 'flex-start'};
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 35px -5px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08);
    }
    @media (max-width: 400px) {
      .wrapper {
        padding-left: 12px;
        padding-right: 12px;
      }
    }
    @media (max-width: 340px) {
      .wrapper {
        padding-left: 8px;
        padding-right: 8px;
      }
    }
    ${data.styling.spotlightGlow ? `
    .spotlight {
      position: absolute;
      top: -80px;
      left: 50%;
      transform: translateX(-50%);
      width: 380px;
      height: 380px;
      border-radius: 50%;
      background: radial-gradient(circle, ${theme.glowColor} 0%, rgba(0,0,0,0) 70%);
      pointer-events: none;
      z-index: 1;
    }` : ''}
    .announcement {
      background: ${theme.accent};
      color: #000;
      font-size: 11px;
      font-weight: 700;
      text-align: center;
      padding: 8px 12px;
      border-radius: 0 0 14px 14px;
      margin: 0 -16px 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      text-decoration: none;
    }
    .hero {
      position: relative;
      border-radius: ${data.styling.borderRadius + 8}px;
      overflow: hidden;
      height: ${data.styling.photoHeight || 380}px;
      min-height: ${data.styling.photoHeight || 380}px;
      flex-shrink: 0;
      background: #000;
      margin-bottom: 20px;
      z-index: 2;
    }
    .hero-img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      transform: scale(${(data.styling.photoScale || 100) / 100});
      object-position: center ${data.styling.photoPosY ?? 20}%;
      filter: ${currentFilter};
    }
    .hero-fade {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.3) 40%, ${theme.bg} ${data.styling.vignetteIntensity}%);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 24px 20px;
    }
    .name {
      font-family: '${data.styling.fontFamily}', serif;
      font-size: 26px;
      letter-spacing: 1.5px;
      margin-top: 4px;
      text-transform: uppercase;
    }
    .badge-sub {
      font-size: 10px;
      letter-spacing: 2.5px;
      color: ${theme.accent};
      font-weight: 700;
      text-transform: uppercase;
    }
    .tagline {
      font-size: 12.5px;
      color: ${theme.textMuted};
      margin-top: 6px;
      line-height: 1.4;
    }
    .social-bar {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin: 16px 0;
      z-index: 2;
      position: relative;
    }
    .social-btn {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      background: ${theme.socialBg};
      border: 1px solid ${theme.socialBorder};
      color: ${theme.socialText};
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      font-size: 11px;
      font-weight: 700;
    }
    .cursive-banner {
      font-family: '${theme.fontScript}', cursive, serif;
      font-size: 26px;
      color: ${theme.textMuted};
      text-align: center;
      margin: 12px 0 20px;
    }
    .cta-card {
      background: ${theme.cardBg};
      color: ${theme.cardText};
      border: 1px solid ${data.styling.metallicBorders ? theme.cardBorder : 'transparent'};
      border-radius: ${data.styling.borderRadius}px;
      padding: 16px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-decoration: none;
      margin-bottom: 12px;
      box-shadow: ${theme.pillShadow};
      position: relative;
      overflow: hidden;
      transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.32s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform;
    }
    .cta-card:hover {
      animation-play-state: paused;
      transform: scale(1.03) translateY(-2px);
    }
    .cta-card:active {
      transform: scale(0.985);
    }
    .cta-badge {
      position: absolute;
      top: 6px;
      right: 12px;
      font-size: 8px;
      font-weight: 800;
      letter-spacing: 1px;
      padding: 2px 6px;
      border-radius: 999px;
      background: ${theme.accent};
      color: #000;
      text-transform: uppercase;
    }
    @keyframes ctaPulseGlow {
      0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 ${theme.glowColor}, ${theme.pillShadow}; }
      50% { transform: scale(1.02); box-shadow: 0 0 22px 4px ${theme.glowColor}, ${theme.pillShadow}; }
    }
    @keyframes ctaFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-4px); }
    }
    @keyframes ctaShake {
      0%, 82%, 100% { transform: translateX(0) rotate(0deg); }
      85% { transform: translateX(-3px) rotate(-0.8deg); }
      88% { transform: translateX(3px) rotate(0.8deg); }
      91% { transform: translateX(-3px) rotate(-0.5deg); }
      94% { transform: translateX(2px) rotate(0.5deg); }
    }
    @keyframes ctaShimmerSweep {
      0% { transform: translateX(-120%) skewX(-20deg); }
      45%, 100% { transform: translateX(220%) skewX(-20deg); }
    }
    .anim-pulse-glow { animation: ctaPulseGlow 2.4s infinite ease-in-out; }
    .anim-float { animation: ctaFloat 2.8s infinite ease-in-out; }
    .anim-shake { animation: ctaShake 3.5s infinite ease-in-out; }
    .anim-shimmer::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 45%;
      height: 100%;
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.38) 50%, rgba(255,255,255,0) 100%);
      animation: ctaShimmerSweep 3s infinite ease-in-out;
      pointer-events: none;
    }
    .cta-left { display: flex; align-items: center; gap: 14px; }
    .cta-icon {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: ${theme.iconBg};
      color: ${theme.iconColor};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: bold;
    }
    .cta-title { font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
    .cta-sub { font-size: 11px; color: ${theme.cardSubtext}; margin-top: 3px; }
    .metrics-bar {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      border: 1px solid ${theme.socialBorder};
      background: ${theme.socialBg};
      border-radius: ${data.styling.borderRadius}px;
      padding: 14px 8px;
      text-align: center;
      margin: 20px 0;
    }
    .metric-val {
      font-size: 18px;
      font-weight: 700;
      color: ${theme.accent};
      font-family: '${data.styling.fontFamily}', serif;
    }
    .metric-lbl {
      font-size: 8.5px;
      color: ${theme.textMuted};
      letter-spacing: 1px;
      margin-top: 2px;
    }
    .process-card {
      border: 1px solid ${theme.socialBorder};
      background: ${theme.socialBg};
      border-radius: ${data.styling.borderRadius}px;
      padding: 14px 16px;
      margin-bottom: 10px;
      display: flex;
      gap: 14px;
      align-items: flex-start;
    }
    .process-num {
      font-size: 26px;
      font-weight: bold;
      color: ${theme.accent};
      font-family: '${data.styling.fontFamily}', serif;
      line-height: 1;
    }
    .gallery-container {
      margin: 24px 0;
    }
    .gallery-badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 9999px;
      font-size: 8.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 6px;
      background: ${theme.accent}20;
      color: ${theme.accent};
      border: 1px solid ${theme.accent}40;
    }
    .gallery-title {
      font-size: 14px;
      text-transform: uppercase;
      color: ${theme.accent};
      margin-bottom: 3px;
      font-family: '${data.styling.fontFamily}', serif;
      letter-spacing: 1px;
    }
    .gallery-sub {
      font-size: 11px;
      color: ${theme.textMuted};
      margin-bottom: 12px;
      line-height: 1.4;
    }
    .gallery-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .gallery-grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .gallery-mosaic {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .gallery-mosaic-hero {
      grid-column: span 2;
      grid-row: span 2;
    }
    .gallery-carousel {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding-bottom: 8px;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .gallery-carousel::-webkit-scrollbar { display: none; }
    .gallery-carousel .gallery-item {
      flex-shrink: 0;
      scroll-snap-align: center;
      width: 160px;
    }
    .gallery-item {
      position: relative;
      border-radius: ${data.styling.borderRadius > 16 ? 16 : data.styling.borderRadius}px;
      overflow: hidden;
      border: 1px solid ${theme.socialBorder};
      cursor: pointer;
      background: #000;
      box-shadow: 0 4px 14px rgba(0,0,0,0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .gallery-item:hover {
      transform: scale(1.025);
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
    }
    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }
    .gallery-item:hover img {
      transform: scale(1.08);
    }
    .gallery-aspect-square { aspect-ratio: 1 / 1; }
    .gallery-aspect-portrait { aspect-ratio: 4 / 5; }
    .gallery-aspect-landscape { aspect-ratio: 4 / 3; }
    .services-container { margin: 24px 0; }
    .services-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .service-card {
      position: relative;
      border-radius: ${Math.round(data.styling.borderRadius / 1.3)}px;
      border: 1px solid ${theme.socialBorder};
      background: ${data.styling.glassmorphism ? 'rgba(255,255,255,0.03)' : theme.socialBg};
      overflow: hidden;
      transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.32s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform;
    }
    .service-card:hover { transform: scale(1.03) translateY(-2px); box-shadow: 0 12px 28px rgba(0,0,0,0.35); }
    .service-card:active { transform: scale(0.985); }
    .service-card.featured { border: 1.5px solid ${theme.accent}; box-shadow: 0 6px 20px ${theme.glowColor}; }
    .service-badge {
      display: inline-block;
      padding: 2px 7px;
      border-radius: 999px;
      font-size: 8px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      background: ${theme.accent};
      color: #000;
    }
    .service-cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 6px 12px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 800;
      text-decoration: none;
      background: ${theme.accent};
      color: #000;
      transition: transform 0.2s ease;
    }
    .service-cta:hover { transform: scale(1.05); }
    .footer {
      text-align: center;
      padding-top: 24px;
      font-size: 11px;
      color: ${theme.textMuted};
      opacity: 0.8;
    }
    .whatsapp-float {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 52px;
      height: 52px;
      background-color: #25d366;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 24px rgba(37, 211, 102, 0.45);
      z-index: 9999;
      transition: transform 0.3s ease;
      text-decoration: none;
    }
    .whatsapp-float:hover {
      transform: scale(1.1);
    }
  </style>
</head>
<body>
  <div class="wrapper">
    ${data.styling.spotlightGlow ? '<div class="spotlight"></div>' : ''}
    
    ${data.announcement.enabled ? `
    <a href="${data.announcement.link}" class="announcement">
      <span>● ${data.announcement.badge}:</span> ${data.announcement.text}
    </a>` : ''}

    <div class="hero">
      <img src="${data.profile.avatarUrl}" alt="${data.profile.name}" class="hero-img" />
      <div class="hero-fade">
        <span class="badge-sub">${data.profile.title}</span>
        <h1 class="name">${data.profile.name}</h1>
        <p class="tagline">${data.profile.tagline}</p>
      </div>
    </div>

    <div class="social-bar">
      ${data.profile.whatsapp ? `<a href="https://wa.me/${data.profile.whatsapp.replace(/\D/g, '')}" class="social-btn" target="_blank" rel="noopener noreferrer" title="WhatsApp">${WHATSAPP_SVG_STRING}</a>` : ''}
      ${data.profile.instagram ? `<a href="https://instagram.com/${data.profile.instagram}" class="social-btn" target="_blank" rel="noopener noreferrer" title="Instagram">${INSTAGRAM_SVG_STRING}</a>` : ''}
      <a href="#booking" class="social-btn" title="Agenda">${CALENDAR_SVG_STRING}</a>
    </div>

    ${data.profile.cursivePhrase ? `<div class="cursive-banner">${data.profile.cursivePhrase}</div>` : ''}

    <div class="actions">
      ${data.actionCards.map(c => {
        const animClass = c.animation && c.animation !== 'none' ? `anim-${c.animation}` : '';
        const href = c.linkType === 'whatsapp'
          ? `https://wa.me/${data.profile.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(c.whatsappMessage || 'Olá!')}`
          : (c.url || '#');
        const targetAttr = c.openInNewTab && !href.startsWith('#') ? 'target="_blank" rel="noopener noreferrer"' : '';
        let inlineStyle = '';
        if (c.variant === 'accent') {
          inlineStyle = `background: ${theme.accent}; color: #000000; border-color: ${theme.accent};`;
        } else if (c.variant === 'outline') {
          inlineStyle = `background: rgba(255,255,255,0.04); color: ${theme.textMain}; border: 1.5px solid ${theme.accent};`;
        } else if (c.variant === 'custom') {
          inlineStyle = `background: ${c.customBg || theme.cardBg}; color: ${c.customText || theme.cardText};`;
        }
        if (c.bgImage) {
          inlineStyle += `background-image: linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 100%), url('${c.bgImage}'); background-size: cover; background-position: center; color: #ffffff;`;
        }
        const hasSideImg = c.imagePosition && c.imagePosition !== 'none' && c.cardImage;
        const isImgLeft = c.imagePosition === 'left';
        const imgSize = c.imageSize || 88;
        const iconHtml = c.icon === 'MessageCircle' || c.linkType === 'whatsapp'
          ? WHATSAPP_SVG_STRING
          : c.icon === 'Instagram'
          ? INSTAGRAM_SVG_STRING
          : c.icon === 'Calendar'
          ? CALENDAR_SVG_STRING
          : c.icon === 'Scissors'
          ? `<svg style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.47" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`
          : c.icon === 'Scale'
          ? `<svg style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/></svg>`
          : c.icon === 'Briefcase'
          ? `<svg style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
          : c.icon === 'GraduationCap'
          ? `<svg style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`
          : c.icon === 'Sparkles'
          ? `<svg style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`
          : c.icon === 'Heart'
          ? `<svg style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`
          : CALENDAR_SVG_STRING;

        if (hasSideImg) {
          return `
      <a href="${href}" ${targetAttr} class="cta-card ${animClass}" style="${inlineStyle} ${c.imageFitStyle === 'popout' ? 'overflow: visible; margin-top: 18px;' : ''} flex-direction: ${isImgLeft ? 'row-reverse' : 'row'};" onclick="if(window.fbq) fbq('track', 'Lead');">
        ${c.badgeText ? `<span class="cta-badge">${c.badgeText}</span>` : ''}
        <div style="flex: 1; text-align: ${isImgLeft ? 'right' : 'left'}; padding-${isImgLeft ? 'left' : 'right'}: 12px;">
          <div class="cta-title" style="font-size: 13.5px;">${c.title}</div>
          <div class="cta-sub" style="margin-top: 4px; ${c.bgImage || c.variant === 'accent' || c.variant === 'custom' ? 'color: currentColor; opacity: 0.85;' : ''}">${c.subtitle}</div>
          ${c.ctaActionText ? `<div style="display: inline-flex; align-items: center; gap: 5px; margin-top: 8px; padding: 4px 10px; border-radius: 6px; background: rgba(0,0,0,0.82); color: #fff; font-size: 9.5px; font-weight: 800; letter-spacing: 1px; text-decoration: underline;">${c.ctaActionText} 👆</div>` : ''}
        </div>
        <img src="${c.cardImage}" alt="${c.title}" style="width: ${imgSize}px; height: ${c.imageFitStyle === 'popout' ? imgSize + 18 : imgSize}px; object-fit: cover; border-radius: ${c.imageFitStyle === 'circle' ? '999px' : c.imageFitStyle === 'popout' ? '14px 14px 10px 10px' : '12px'}; ${c.imageFitStyle === 'popout' ? 'margin-top: -26px;' : ''} flex-shrink: 0; box-shadow: 0 8px 20px rgba(0,0,0,0.35);" />
      </a>`;
        }
        return `
      <a href="${href}" ${targetAttr} class="cta-card ${animClass}" style="${inlineStyle}" onclick="if(window.fbq) fbq('track', 'Lead');">
        ${c.badgeText ? `<span class="cta-badge">${c.badgeText}</span>` : ''}
        <div class="cta-left">
          <div class="cta-icon">${iconHtml}</div>
          <div>
            <div class="cta-title">${c.title}</div>
            <div class="cta-sub" style="${c.variant === 'accent' || c.variant === 'custom' ? 'opacity: 0.82; color: currentColor;' : ''}">${c.subtitle}</div>
            ${c.ctaActionText ? `<div style="display: inline-flex; align-items: center; gap: 5px; margin-top: 6px; padding: 3px 8px; border-radius: 5px; background: rgba(0,0,0,0.8); color: #fff; font-size: 9px; font-weight: 800; text-decoration: underline;">${c.ctaActionText} 👆</div>` : ''}
          </div>
        </div>
        <div style="color: currentColor; opacity: 0.7; font-size: 16px;">›</div>
      </a>`;
      }).join('')}
    </div>

    ${data.metrics.enabled ? `
    <div class="metrics-bar">
      <div>
        <div class="metric-val">${data.metrics.stat1Value}</div>
        <div class="metric-lbl">${data.metrics.stat1Label}</div>
      </div>
      <div>
        <div class="metric-val">${data.metrics.stat2Value}</div>
        <div class="metric-lbl">${data.metrics.stat2Label}</div>
      </div>
      <div>
        <div class="metric-val">${data.metrics.stat3Value}</div>
        <div class="metric-lbl">${data.metrics.stat3Label}</div>
      </div>
    </div>` : ''}

    ${data.processSteps.enabled ? `
    <div style="margin: 24px 0;">
      <h3 style="font-size: 14px; text-transform: uppercase; color: ${theme.accent}; margin-bottom: 12px;">
        ${data.processSteps.headline}
      </h3>
      ${data.processSteps.steps.map(st => `
      <div class="process-card">
        <div class="process-num">${st.number}</div>
        <div>
          <div style="font-size: 12px; font-weight: bold;">${st.title}</div>
          <div style="font-size: 11px; color: ${theme.textMuted}; margin-top: 3px;">${st.description}</div>
        </div>
      </div>`).join('')}
    </div>` : ''}

    ${data.studentGrid?.enabled && data.studentGrid.photos?.length > 0 ? `
    <div class="gallery-container" id="galeria">
      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:10px;">
        <div>
          ${data.studentGrid.badge ? `<span class="gallery-badge">${data.studentGrid.badge}</span>` : ''}
          <h3 class="gallery-title">${data.studentGrid.headline}</h3>
          ${data.studentGrid.subtitle ? `<p class="gallery-sub">${data.studentGrid.subtitle}</p>` : ''}
        </div>
        <span style="font-size:9px; color:${theme.textMuted}; font-family:monospace; background:rgba(255,255,255,0.06); padding:2px 8px; border-radius:6px; border:1px solid ${theme.socialBorder};">
          ${data.studentGrid.photos.length} fotos
        </span>
      </div>

      <div class="${
        data.studentGrid.layout === 'grid2' ? 'gallery-grid-2' :
        data.studentGrid.layout === 'mosaic' ? 'gallery-mosaic' :
        data.studentGrid.layout === 'carousel' ? 'gallery-carousel' : 'gallery-grid-3'
      }">
        ${data.studentGrid.photos.map((p, idx) => {
          const isHero = data.studentGrid.layout === 'mosaic' && idx === 0;
          const aspectClass = isHero ? 'gallery-aspect-square gallery-mosaic-hero' :
            data.studentGrid.aspectRatio === 'portrait' ? 'gallery-aspect-portrait' :
            data.studentGrid.aspectRatio === 'landscape' ? 'gallery-aspect-landscape' : 'gallery-aspect-square';
          return `
          <div class="gallery-item ${aspectClass}" onclick="openGalleryLightbox(${idx})">
            <img src="${p}" alt="Foto ${idx + 1}" loading="lazy" />
          </div>`;
        }).join('')}
      </div>
    </div>` : ''}

    ${data.locationCard.enabled ? `
    <div class="cta-card" style="margin-top: 16px;">
      <div class="cta-left">
        <div class="cta-icon">📍</div>
        <div>
          <div class="cta-title">${data.locationCard.headline}</div>
          <div class="cta-sub">${data.locationCard.address}</div>
        </div>
      </div>
      <a href="${data.locationCard.mapsUrl}" target="_blank" style="font-size: 10px; font-weight: bold; color: ${theme.accent}; text-decoration: underline;">Mapa</a>
    </div>` : ''}

    ${data.services?.enabled && data.services.items?.length > 0 ? `
    <div class="services-container" id="catalogo">
      <div style="margin-bottom: 12px;">
        ${data.services.badge ? `<span class="gallery-badge">${data.services.badge}</span>` : ''}
        <h3 class="gallery-title">${data.services.headline}</h3>
        ${data.services.subtitle ? `<p class="gallery-sub">${data.services.subtitle}</p>` : ''}
      </div>
      <div class="${data.services.layout === 'grid2' ? 'services-grid-2' : ''}" style="${data.services.layout !== 'grid2' ? 'display:flex; flex-direction:column; gap:10px;' : ''}">
        ${data.services.items.map(srv => {
          const waMsg = encodeURIComponent(`Olá ${data.profile.name}! Tenho interesse em "${srv.name}" (${srv.price}). Gostaria de verificar a disponibilidade!`);
          const srvHref = srv.actionType === 'link' && srv.customUrl
            ? srv.customUrl
            : `https://wa.me/${data.profile.whatsapp.replace(/\D/g, '')}?text=${waMsg}`;
          const btnText = srv.ctaLabel || 'Reservar';

          if (data.services.layout === 'featured') {
            return `
            <div class="service-card ${srv.featured ? 'featured' : ''}">
              <div style="position:relative; height:145px; width:100%; overflow:hidden; background:#000;">
                <img src="${srv.imageUrl}" alt="${srv.name}" style="width:100%; height:100%; object-fit:cover; display:block;" loading="lazy" />
                ${srv.badge ? `<span class="service-badge" style="position:absolute; top:10px; left:10px;">${srv.badge}</span>` : ''}
                ${srv.duration ? `<span style="position:absolute; bottom:8px; right:8px; background:rgba(0,0,0,0.75); color:#fff; font-size:9px; font-weight:700; padding:3px 8px; border-radius:999px;">⏱ ${srv.duration}</span>` : ''}
              </div>
              <div style="padding:12px 14px;">
                <div style="font-size:13px; font-weight:700; color:${theme.textMain};">${srv.name}</div>
                <div style="font-size:11px; color:${theme.textMuted}; margin-top:4px; line-height:1.4;">${srv.description}</div>
                <div style="display:flex; align-items:center; justify-content:space-between; margin-top:12px; padding-top:10px; border-top:1px solid ${theme.socialBorder};">
                  <div>
                    ${srv.oldPrice ? `<span style="font-size:10px; text-decoration:line-through; color:${theme.textMuted}; opacity:0.7; display:block;">${srv.oldPrice}</span>` : ''}
                    <span style="font-size:14px; font-weight:800; color:${theme.accent};">${srv.price}</span>
                  </div>
                  <a href="${srvHref}" target="_blank" rel="noopener noreferrer" class="service-cta" onclick="if(window.fbq) fbq('track', 'Lead');">${btnText} ›</a>
                </div>
              </div>
            </div>`;
          }

          if (data.services.layout === 'grid2') {
            return `
            <div class="service-card ${srv.featured ? 'featured' : ''}" style="display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <div style="position:relative; aspect-ratio:4/3; width:100%; overflow:hidden; background:#000;">
                  <img src="${srv.imageUrl}" alt="${srv.name}" style="width:100%; height:100%; object-fit:cover; display:block;" loading="lazy" />
                  ${srv.badge ? `<span class="service-badge" style="position:absolute; top:6px; left:6px; font-size:7px;">${srv.badge}</span>` : ''}
                </div>
                <div style="padding:10px;">
                  <div style="font-size:11.5px; font-weight:700; line-height:1.25;">${srv.name}</div>
                  ${srv.duration ? `<div style="font-size:9px; color:${theme.textMuted}; margin-top:3px;">⏱ ${srv.duration}</div>` : ''}
                  <div style="font-size:10px; color:${theme.textMuted}; margin-top:4px; line-height:1.35;">${srv.description}</div>
                </div>
              </div>
              <div style="padding:0 10px 10px 10px;">
                <div style="margin-bottom:6px;">
                  ${srv.oldPrice ? `<span style="font-size:9px; text-decoration:line-through; color:${theme.textMuted}; margin-right:4px;">${srv.oldPrice}</span>` : ''}
                  <span style="font-size:12.5px; font-weight:800; color:${theme.accent};">${srv.price}</span>
                </div>
                <a href="${srvHref}" target="_blank" rel="noopener noreferrer" class="service-cta" style="width:100%;" onclick="if(window.fbq) fbq('track', 'Lead');">${btnText}</a>
              </div>
            </div>`;
          }

          return `
          <div class="service-card ${srv.featured ? 'featured' : ''}" style="padding:12px; display:flex; gap:12px; align-items:center;">
            <div style="position:relative; width:68px; height:68px; border-radius:12px; overflow:hidden; flex-shrink:0; background:#000;">
              <img src="${srv.imageUrl}" alt="${srv.name}" style="width:100%; height:100%; object-fit:cover; display:block;" loading="lazy" />
            </div>
            <div style="flex:1; min-width:0;">
              <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                ${srv.badge ? `<span class="service-badge">${srv.badge}</span>` : ''}
                ${srv.duration ? `<span style="font-size:9px; color:${theme.textMuted};">⏱ ${srv.duration}</span>` : ''}
              </div>
              <div style="font-size:12.5px; font-weight:700; margin-top:2px;">${srv.name}</div>
              <div style="font-size:10.5px; color:${theme.textMuted}; margin-top:2px; line-height:1.35;">${srv.description}</div>
              <div style="display:flex; align-items:center; justify-content:space-between; margin-top:8px;">
                <div>
                  ${srv.oldPrice ? `<span style="font-size:9.5px; text-decoration:line-through; color:${theme.textMuted}; margin-right:5px;">${srv.oldPrice}</span>` : ''}
                  <span style="font-size:13px; font-weight:800; color:${theme.accent};">${srv.price}</span>
                </div>
                <a href="${srvHref}" target="_blank" rel="noopener noreferrer" class="service-cta" onclick="if(window.fbq) fbq('track', 'Lead');">${btnText}</a>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>` : ''}

    <div class="footer">
      © ${new Date().getFullYear()} ${data.profile.name}. Todos os direitos reservados.
    </div>
  </div>

  ${data.profile.whatsapp ? `
  <a href="https://wa.me/${data.profile.whatsapp.replace(/\D/g, '')}" class="whatsapp-float" target="_blank" rel="noopener noreferrer" title="Falar no WhatsApp" onclick="if(window.fbq) fbq('track', 'Lead');">
    <svg style="width:28px;height:28px;display:inline-block;vertical-align:middle;fill:#ffffff;" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/><path d="M12 1c-6.075 0-11 4.925-11 11 0 2.102.589 4.066 1.606 5.744l-1.606 5.256 5.438-1.57c1.613.918 3.479 1.442 5.562 1.442 6.075 0 11-4.925 11-11s-4.925-11-11-11zm0 19.825c-1.875 0-3.626-.543-5.111-1.479l-.366-.23-3.232.933.951-3.111-.252-.387c-1.047-1.606-1.615-3.501-1.615-5.551 0-5.132 4.173-9.305 9.305-9.305 5.132 0 9.305 4.173 9.305 9.305 0 5.132-4.173 9.305-9.305 9.305z"/></svg>
  </a>` : ''}

  <!-- Modal Lightbox da Galeria de Fotos -->
  <div id="gallery-lightbox-modal" style="display:none; position:fixed; inset:0; z-index:99999; background:rgba(0,0,0,0.92); backdrop-filter:blur(8px); align-items:center; justify-content:center; flex-direction:column; padding:16px;" onclick="closeGalleryLightbox()">
    <div style="position:absolute; top:20px; right:20px; display:flex; gap:12px; align-items:center; z-index:10;" onclick="event.stopPropagation()">
      <span id="lb-counter" style="color:#fff; font-size:12px; font-weight:700; background:rgba(255,255,255,0.15); padding:4px 10px; border-radius:999px;">1 / 1</span>
      <button onclick="closeGalleryLightbox()" style="background:rgba(255,255,255,0.2); color:#fff; border:none; width:36px; height:36px; border-radius:50%; font-size:18px; cursor:pointer; display:flex; align-items:center; justify-content:center;">✕</button>
    </div>
    <div style="position:relative; max-width:92vw; max-height:82vh; display:flex; align-items:center; justify-content:center;" onclick="event.stopPropagation()">
      <button onclick="navGalleryLightbox(-1)" style="position:absolute; left:-20px; top:50%; transform:translateY(-50%); background:rgba(0,0,0,0.65); color:#fff; border:1px solid rgba(255,255,255,0.2); width:40px; height:40px; border-radius:50%; font-size:22px; cursor:pointer; z-index:5;">‹</button>
      <img id="lb-img" src="" style="max-width:90vw; max-height:80vh; object-fit:contain; border-radius:14px; box-shadow:0 20px 50px rgba(0,0,0,0.8); border:1px solid rgba(255,255,255,0.15);" />
      <button onclick="navGalleryLightbox(1)" style="position:absolute; right:-20px; top:50%; transform:translateY(-50%); background:rgba(0,0,0,0.65); color:#fff; border:1px solid rgba(255,255,255,0.2); width:40px; height:40px; border-radius:50%; font-size:22px; cursor:pointer; z-index:5;">›</button>
    </div>
  </div>
  <script>
    var galleryPhotos = ${JSON.stringify(data.studentGrid?.photos || [])};
    var curLbIndex = 0;
    function openGalleryLightbox(idx) {
      curLbIndex = idx;
      var modal = document.getElementById('gallery-lightbox-modal');
      var img = document.getElementById('lb-img');
      var counter = document.getElementById('lb-counter');
      if (!modal || !img) return;
      img.src = galleryPhotos[curLbIndex];
      if (counter) counter.innerText = (curLbIndex + 1) + ' / ' + galleryPhotos.length;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
    function closeGalleryLightbox() {
      var modal = document.getElementById('gallery-lightbox-modal');
      if (modal) modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    function navGalleryLightbox(delta) {
      if (!galleryPhotos || !galleryPhotos.length) return;
      curLbIndex = (curLbIndex + delta + galleryPhotos.length) % galleryPhotos.length;
      var img = document.getElementById('lb-img');
      var counter = document.getElementById('lb-counter');
      if (img) img.src = galleryPhotos[curLbIndex];
      if (counter) counter.innerText = (curLbIndex + 1) + ' / ' + galleryPhotos.length;
    }
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeGalleryLightbox();
      if (e.key === 'ArrowLeft') navGalleryLightbox(-1);
      if (e.key === 'ArrowRight') navGalleryLightbox(1);
    });
  </script>
</body>
</html>`;
    })(siteData, siteTheme);
  };

  const copyExportCode = async () => {
    const code = generateExportCode();
    const success = await safeCopyText(code);
    if (success) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const downloadHtmlFile = () => {
    const code = generateExportCode();
    const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const slug = data.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'luxebio-page';
    link.download = `${slug}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const openLivePreviewTab = () => {
    const code = generateExportCode();
    const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    showToast('👁️ Resultado do microsite aberto em tela cheia numa nova aba!');
  };

  // ==============================================================
  // GERADORES DE HOSPEDAGEM EM PASTAS INDEPENDENTES
  // Cada microsite reside em sua própria pasta isolada com arquivos e imagens
  // ==============================================================
  const generateManifestJson = (siteData: typeof INITIAL_DATA, slug: string) => {
    return JSON.stringify(
      {
        name: siteData.profile.name,
        short_name: siteData.profile.name.slice(0, 12),
        description: siteData.profile.tagline || `${siteData.profile.name} - ${siteData.profile.title}`,
        start_url: `./index.html`,
        display: 'standalone',
        background_color: siteData.customColors?.enabled
          ? siteData.customColors.bg
          : THEMES[siteData.theme]?.bg || '#0a0a0f',
        theme_color: siteData.customColors?.enabled
          ? siteData.customColors.accent
          : THEMES[siteData.theme]?.accent || '#d4af37',
        icons: [
          {
            src: siteData.profile.avatarUrl,
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: siteData.profile.avatarUrl,
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      null,
      2
    );
  };

  const generateRobotsTxt = (slug: string) => {
    return `# Robots.txt para microsite independente: ${slug}
User-agent: *
Allow: /

# Sitemap independente da pasta
# Sitemap: https://seusite.com.br/${slug}/sitemap.xml
`;
  };

  const generateHtaccess = (slug: string) => {
    return `# ==============================================================
# Configuração de Hospedagem Independente - Apache / cPanel
# Pasta do Microsite: /${slug}/
# ==============================================================

Options -Indexes
DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /${slug}/
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ index.html [L]
</IfModule>

# Compressão Gzip para Carregamento Rápido no Mobile
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>

# Cache de Assets e Imagens
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 1 hour"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
`;
  };

  const generateNginxConf = (slug: string) => {
    return `# ==============================================================
# Configuração Nginx para pasta independente: /${slug}/
# ==============================================================

location /${slug}/ {
    alias /var/www/html/${slug}/;
    index index.html;
    try_files $uri $uri/ /${slug}/index.html;

    # Cache de imagens e fontes estáticas
    location ~* \\.(jpg|jpeg|png|gif|ico|svg|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
`;
  };

  const generateVercelJson = (_slug: string) => {
    return JSON.stringify(
      {
        $schema: 'https://openapi.vercel.sh/vercel.json',
        framework: null,
        buildCommand: '',
        outputDirectory: '.',
        rewrites: [
          {
            source: '/(.*)',
            destination: '/index.html',
          },
        ],
      },
      null,
      2
    );
  };

  const generateReadmeHosting = (slug: string, clientName: string) => {
    return `===================================================================
PACOTE DE HOSPEDAGEM EM PASTA INDEPENDENTE - LUXEBIO STUDIO
Cliente: ${clientName}
Diretório Dedicado: /${slug}/ (e também disponível na raiz /)
Data de Geração: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}
===================================================================

ESTRUTURA DESTE PACOTE (COMPATÍVEL COM VERCEL E CPANEL):
-------------------------------------------------------------------
├── index.html            <- Página principal na raiz (evita erro 404 na Vercel/Netlify)
├── vercel.json           <- Configuração pronta para deploy imediato na Vercel
├── manifest.json         <- Manifesto PWA para salvar como app no smartphone
├── robots.txt            <- Indexação SEO para Google e buscadores
├── .htaccess             <- Regras de reescrita e cache para Apache / cPanel
├── nginx.conf            <- Bloco de configuração para servidores Nginx
├── README-HOSPEDAGEM.txt <- Este manual de deploy
├── assets/
│   └── site-info.json    <- Metadados estruturados do cliente e do plano
└── ${slug}/              <- Cópia em subpasta independente para hospedagem multi-pastas
    └── index.html

COMO HOSPEDAR NO SEU SERVIDOR:
-------------------------------------------------------------------
OPÇÃO 1: Vercel / Netlify / GitHub Pages (Deploy Direto Sem Erro 404)
- Extraia o ZIP e suba os arquivos da raiz (onde está o index.html e vercel.json) para o seu repositório ou painel da Vercel.
- O index.html na raiz garante que o domínio principal abra imediatamente sem erro 404 NOT_FOUND.

OPÇÃO 2: cPanel / Hostinger / Locaweb / HostGator (Em Pasta Independente)
1. Acesse o Gerenciador de Arquivos do cPanel do seu domínio principal.
2. Abra a pasta 'public_html'.
3. Envie a subpasta '${slug}' para 'public_html/${slug}/index.html'.
4. O microsite estará acessível na URL: https://seusite.com.br/${slug}/

OPÇÃO 3: Subdomínio Dedicado (ex: ${slug}.seusite.com.br)
1. Crie o subdomínio apontando a pasta raiz para os arquivos extraídos.
2. Os arquivos já carregarão automaticamente!
`;
  };

  const generateSiteInfoJson = (
    siteData: typeof INITIAL_DATA,
    slug: string,
    clientName: string,
    extra?: { monthlyFee?: number; status?: string }
  ) => {
    return JSON.stringify(
      {
        clientName: clientName || siteData.profile.name,
        slug: slug,
        title: siteData.profile.title,
        tagline: siteData.profile.tagline,
        theme: siteData.theme,
        fontFamily: siteData.styling.fontFamily,
        whatsapp: siteData.profile.whatsapp,
        instagram: siteData.profile.instagram,
        generatedAt: new Date().toISOString(),
        hostingPath: `/public_html/${slug}/`,
        monthlyFee: extra?.monthlyFee || 149.9,
        status: extra?.status || 'active',
      },
      null,
      2
    );
  };

  // Download do ZIP de uma pasta independente individual
  const downloadMicrositeDirectoryZip = async (
    target?: SavedMicrosite | typeof INITIAL_DATA,
    customSlug?: string
  ) => {
    try {
      showToast('⏳ Empacotando pasta independente do microsite...');
      const zip = new JSZip();

      let siteData: typeof INITIAL_DATA;
      let clientName: string;
      let slug: string;
      let extraMeta: { monthlyFee?: number; status?: string } = {};

      if (target && 'subdomain' in target) {
        siteData = target.data;
        clientName = target.clientName;
        slug = target.subdomain || customSlug || target.clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        extraMeta = { monthlyFee: target.monthlyFee, status: target.status };
      } else if (target) {
        siteData = target;
        clientName = target.profile.name;
        slug =
          customSlug ||
          target.profile.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') ||
          'microsite';
      } else {
        siteData = data;
        clientName = currentEditingSite ? currentEditingSite.clientName : data.profile.name;
        slug =
          currentEditingSite?.subdomain ||
          data.profile.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') ||
          'microsite';
      }

      const htmlContent = generateExportCode(siteData);
      const vercelJsonContent = generateVercelJson(slug);
      const manifestContent = generateManifestJson(siteData, slug);
      const robotsContent = generateRobotsTxt(slug);
      const htaccessContent = generateHtaccess(slug);
      const nginxContent = generateNginxConf(slug);
      const readmeContent = generateReadmeHosting(slug, clientName);
      const siteInfoContent = generateSiteInfoJson(siteData, slug, clientName, extraMeta);

      // 1. Arquivos na RAIZ do ZIP (Garante que deploy direto na Vercel / GitHub abra na raiz / sem 404 NOT_FOUND)
      zip.file('index.html', htmlContent);
      zip.file('vercel.json', vercelJsonContent);
      zip.file('manifest.json', manifestContent);
      zip.file('robots.txt', robotsContent);
      zip.file('.htaccess', htaccessContent);
      zip.file('nginx.conf', nginxContent);
      zip.file('README-HOSPEDAGEM.txt', readmeContent);

      const rootAssets = zip.folder('assets');
      if (rootAssets) {
        rootAssets.file('site-info.json', siteInfoContent);
      }

      // 2. Cópia também na subpasta independente /slug/ (para uso em cPanel public_html/slug/ ou subdiretórios)
      const folder = zip.folder(slug);
      if (folder) {
        folder.file('index.html', htmlContent);
        folder.file('manifest.json', manifestContent);
        folder.file('.htaccess', htaccessContent);
        const subAssets = folder.folder('assets');
        if (subAssets) {
          subAssets.file('site-info.json', siteInfoContent);
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pasta-hospedagem-${slug}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast(`✅ Pacote ZIP da pasta '/${slug}/' baixado com sucesso!`);
    } catch (err) {
      console.error('Erro ao gerar ZIP do microsite:', err);
      showToast('❌ Erro ao empacotar arquivos do microsite.');
    }
  };

  // Download do ZIP multi-pastas contendo todos os clientes cadastrados em pastas isoladas
  const downloadAllSitesDirectoryZip = async () => {
    if (savedSites.length === 0) {
      showToast('⚠️ Nenhum microsite salvo no Painel para exportação multi-pastas.');
      return;
    }
    try {
      showToast(`⏳ Gerando servidor multi-pastas para ${savedSites.length} clientes...`);
      const zip = new JSZip();
      const serverRoot = zip.folder('servidor-hospedagem-microsites') || zip;

      // Manual geral do servidor
      serverRoot.file(
        'README-ESTRUTURA-SERVIDOR.txt',
        `===================================================================
PACOTE DE HOSPEDAGEM MULTI-CLIENTES - LUXEBIO STUDIO
Total de Microsites: ${savedSites.length}
Data de Exportação: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}
===================================================================

ESTRUTURA DAS PASTAS INDEPENDENTES NESTE PACOTE:
${savedSites.map(s => `├── /${s.subdomain}/ (Cliente: ${s.clientName} | Mensalidade: R$ ${s.monthlyFee.toFixed(2)})`).join('\n')}

COMO PUBLICAR NO SERVIDOR:
1. Extraia o conteúdo desta pasta diretamente no diretório 'public_html' do seu servidor.
2. Cada cliente fica estritamente isolado em sua própria pasta independente.
3. Não há risco de conflito de arquivos entre os clientes.
4. Cada cliente acessa sua URL direta: https://seusite.com.br/[pasta-do-cliente]/
`
      );

      // Portal mestre para listar todas as pastas de clientes
      const masterPortalHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Servidor de Hospedagem - Pastas Independentes de Clientes</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0a0a0f; color: #f5f5f5; padding: 40px 20px; max-width: 860px; margin: 0 auto; }
    h1 { color: #f59e0b; font-size: 24px; border-bottom: 1px solid #262626; padding-bottom: 16px; display: flex; align-items: center; gap: 10px; }
    p { color: #a3a3a3; font-size: 14px; line-height: 1.5; }
    .grid { display: grid; gap: 14px; margin-top: 24px; }
    .card { background: #171717; border: 1px solid #262626; border-radius: 12px; padding: 18px; text-decoration: none; color: inherit; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s; }
    .card:hover { border-color: #f59e0b; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .title { font-weight: bold; font-size: 16px; color: #fff; }
    .path { font-family: monospace; color: #f59e0b; font-size: 12px; margin-top: 5px; }
    .badge { background: #10b981; color: #022c22; font-size: 11px; padding: 5px 12px; border-radius: 999px; font-weight: 800; }
  </style>
</head>
<body>
  <h1>📁 Servidor de Hospedagem - Diretório Raiz</h1>
  <p>Todos os microsites de clientes abaixo estão hospedados em suas respectivas <strong>pastas independentes</strong> com arquivos isolados:</p>
  <div class="grid">
    ${savedSites
      .map(
        s => `
    <a href="./${s.subdomain}/" class="card">
      <div>
        <div class="title">${s.clientName}</div>
        <div class="path">/${s.subdomain}/index.html</div>
      </div>
      <span class="badge">Acessar Pasta ›</span>
    </a>`
      )
      .join('')}
  </div>
</body>
</html>`;
      serverRoot.file('index.html', masterPortalHtml);

      // Adiciona cada cliente em sua pasta independente
      for (const site of savedSites) {
        const slug = site.subdomain || site.clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const siteFolder = serverRoot.folder(slug);
        if (siteFolder) {
          siteFolder.file('index.html', generateExportCode(site.data));
          siteFolder.file('vercel.json', generateVercelJson(slug));
          siteFolder.file('manifest.json', generateManifestJson(site.data, slug));
          siteFolder.file('robots.txt', generateRobotsTxt(slug));
          siteFolder.file('.htaccess', generateHtaccess(slug));
          siteFolder.file('nginx.conf', generateNginxConf(slug));
          siteFolder.file('README-HOSPEDAGEM.txt', generateReadmeHosting(slug, site.clientName));
          const assetsFolder = siteFolder.folder('assets');
          if (assetsFolder) {
            assetsFolder.file(
              'site-info.json',
              generateSiteInfoJson(site.data, slug, site.clientName, {
                monthlyFee: site.monthlyFee,
                status: site.status,
              })
            );
          }
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `servidor-hospedagem-todos-os-microsites-${savedSites.length}-clientes.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast(`✅ Pacote com ${savedSites.length} pastas independentes baixado com sucesso!`);
    } catch (err) {
      console.error('Erro ao gerar ZIP multi-pastas:', err);
      showToast('❌ Erro ao exportar servidor multi-pastas.');
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-neutral-950 text-neutral-100 font-sans">
      {/* ============================================================== */}
      {/* LEFT COLUMN: BUILDER SAAS PRO CONTROLS                         */}
      {/* ============================================================== */}
      <aside className="w-full lg:w-[620px] xl:w-[680px] h-full flex flex-col border-r border-neutral-800 bg-neutral-900/95 backdrop-blur z-20">
        {/* Header */}
        <header className="px-5 py-3.5 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 bg-neutral-950/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 flex items-center justify-center text-neutral-950 font-serif font-black text-lg shadow-lg shadow-amber-500/20">
              L
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-neutral-100 text-sm tracking-wider">
                  LUXEBIO STUDIO <span className="text-amber-400 font-bold">SAAS ENGINE</span>
                </h1>
                {currentEditingSite ? (() => {
                  const hasUnsavedChanges = JSON.stringify(currentEditingSite.data) !== JSON.stringify(data);
                  return (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 border ${
                        hasUnsavedChanges
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                          : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      }`}>
                        <Edit3 className="w-2.5 h-2.5" />
                        Editando: {currentEditingSite.clientName}
                        {hasUnsavedChanges ? ' (Alterações Pendentes)' : ' (Salvo)'}
                      </span>
                      <button
                        type="button"
                        onClick={startNewDraftMicrosite}
                        className="text-[9px] font-semibold text-neutral-400 hover:text-amber-300 underline cursor-pointer"
                        title="Sair da edição e voltar ao Modo Rascunho Livre"
                      >
                        (Desvincular)
                      </button>
                    </div>
                  );
                })() : (
                  <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    MODO RASCUNHO (Nenhum Cliente Vinculado)
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-400">Gerador de Microsites & Painel de Gestão para Clientes</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setAiModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:brightness-110 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition cursor-pointer"
              title="Gerar Microsite automaticamente usando IA a partir do Instagram e Google Meu Negócio"
            >
              <Sparkles className="w-3.5 h-3.5 text-neutral-950 fill-neutral-950" />
              <span>Criar com IA</span>
            </button>

            <button
              type="button"
              onClick={openLivePreviewTab}
              className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-amber-500/30 transition cursor-pointer shadow"
              title="Ver resultado do microsite em tela cheia numa nova aba"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Resultado</span>
            </button>

            <button
              type="button"
              onClick={() => setQrModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-bold text-xs flex items-center gap-1.5 border border-emerald-500/30 transition cursor-pointer shadow"
              title="Gerar QR Code para testar no celular"
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>📱 QR Code Celular</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow transition cursor-pointer border ${
                activeTab === 'dashboard'
                  ? 'bg-amber-400 text-neutral-950 border-amber-300 ring-2 ring-amber-400/30'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-amber-300 border-amber-500/40 hover:border-amber-400'
              }`}
              title="Abrir Painel de Gestão dos Microsites e Mensalidades dos Clientes"
            >
              <Server className="w-3.5 h-3.5 text-amber-400" />
              <span>Painel & Clientes</span>
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {savedSites.length}
              </span>
            </button>

            <button
              type="button"
              onClick={openSaveDialog}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow transition cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar Microsite</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedPublishSiteId(editingSiteId || savedSites[0]?.id || null);
                setPublishModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-semibold text-xs flex items-center gap-1.5 border border-neutral-700 transition cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Publicar & Domínio</span>
            </button>

            <button
              type="button"
              onClick={copyExportCode}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow transition cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copiado!' : 'Exportar HTML'}</span>
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div
          onWheel={(e) => {
            if (e.deltaY !== 0) {
              e.currentTarget.scrollLeft += e.deltaY;
            }
          }}
          className="px-4 py-2.5 border-b border-neutral-800 bg-neutral-900 flex items-center gap-1.5 overflow-x-auto text-xs tab-scrollbar shrink-0 scroll-smooth"
        >
          {[
            { id: 'styling', label: 'Estilo & Nichos', icon: SlidersHorizontal },
            { id: 'identity', label: 'Identidade & Perfil', icon: User },
            { id: 'qualifier', label: 'Funil Anti-Curiosos', icon: Filter },
            { id: 'highConversion', label: 'Alta Conversão [ON/OFF]', icon: Sparkles },
            { id: 'modules', label: 'Módulos & Prova', icon: Layers },
            { id: 'services', label: 'Serviços & Cursos', icon: Tag },
            { id: 'buttons', label: 'Botões & CTAs', icon: Briefcase },
            { id: 'seo', label: 'SEO & Card WhatsApp', icon: Globe },
            { id: 'tracking', label: 'Pixels & Origem de Tráfego', icon: Target },
            { id: 'dashboard', label: `Painel & Clientes (${savedSites.length})`, icon: Server, isHighlight: true },
            { id: 'export', label: 'Exportar & Código', icon: Code },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={(e) => {
                  setActiveTab(tab.id);
                  e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : tab.isHighlight
                    ? 'bg-amber-400/10 text-amber-200 border border-amber-500/20 hover:bg-amber-400/20'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : tab.isHighlight ? 'text-amber-400' : 'text-neutral-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Panels */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: ESTILO, MODELOS & TEMAS */}
          {activeTab === 'styling' && (
            <div className="space-y-6">
              {/* Filtro por Nicho e Barra de Pesquisa */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">
                    1. Selecione o Nicho ou Modelo Inspirado
                  </label>
                  <span className="text-[10px] font-medium text-neutral-400">
                    {filteredThemes.length} {filteredThemes.length === 1 ? 'modelo encontrado' : 'modelos encontrados'}
                  </span>
                </div>

                {/* Barra de Pesquisa de Temas e Nichos */}
                <div className="relative mb-3">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={themeSearchQuery}
                    onChange={(e) => {
                      setThemeSearchQuery(e.target.value);
                      if (e.target.value.trim() !== '' && selectedThemeCategory !== 'Todos') {
                        setSelectedThemeCategory('Todos');
                      }
                    }}
                    placeholder="Pesquisar nicho, tema ou cor (ex: barbearia, jurídico, estética, dark, gold)..."
                    className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition"
                  />
                  {themeSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setThemeSearchQuery('')}
                      title="Limpar pesquisa"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-200 p-0.5 rounded-md cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex gap-1.5 overflow-x-auto pb-2 tab-scrollbar">
                  {themeCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedThemeCategory(cat)}
                      className={`px-2.5 py-1 text-[11px] rounded-lg transition whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                        selectedThemeCategory === cat
                          ? 'bg-amber-400 text-black font-bold'
                          : 'bg-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {cat === 'Barbearia & Grooming' && <Scissors className="w-3 h-3" />}
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Complete Kits Banner & Selector for ALL Niches */}
                {(() => {
                  const activeNicheKey =
                    selectedThemeCategory !== 'Todos' && NICHE_KITS[selectedThemeCategory]
                      ? selectedThemeCategory
                      : THEMES[data.theme]?.category && NICHE_KITS[THEMES[data.theme].category]
                      ? THEMES[data.theme].category
                      : 'Barbearia & Grooming';
                  const currentKit = NICHE_KITS[activeNicheKey];

                  return (
                    <div className="mt-2.5 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-amber-600/10 to-neutral-900 border border-amber-500/30 space-y-3">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                            {activeNicheKey === 'Barbearia & Grooming' && <Scissors className="w-4 h-4" />}
                            {activeNicheKey === 'Jurídico & Executivo' && <Scale className="w-4 h-4" />}
                            {activeNicheKey === 'Mentoria & Cursos' && <GraduationCap className="w-4 h-4" />}
                            {activeNicheKey === 'Saúde & Psicologia' && <Heart className="w-4 h-4" />}
                            {activeNicheKey !== 'Barbearia & Grooming' &&
                              activeNicheKey !== 'Jurídico & Executivo' &&
                              activeNicheKey !== 'Mentoria & Cursos' &&
                              activeNicheKey !== 'Saúde & Psicologia' && <Sparkles className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-amber-300">{currentKit.kitTitle}</div>
                            <div className="text-[10px] text-neutral-300 leading-relaxed">
                              {currentKit.kitDescription}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => applyNicheKit(activeNicheKey)}
                          className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-[11px] whitespace-nowrap transition shadow cursor-pointer shrink-0"
                        >
                          Preencher {currentKit.shortLabel}
                        </button>
                      </div>

                      {/* Quick 1-Click Kit Buttons for ALL 8 Niches */}
                      <div className="pt-2.5 border-t border-amber-500/20">
                        <div className="text-[9.5px] font-semibold uppercase tracking-wider text-amber-200/80 mb-1.5">
                          Ou clique para carregar o Kit Completo de qualquer nicho (Foto + Textos + Botões + Serviços):
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                          {Object.values(NICHE_KITS).map((kit) => {
                            const isSelectedKit = kit.category === activeNicheKey;
                            return (
                              <button
                                key={kit.category}
                                type="button"
                                onClick={() => {
                                  setSelectedThemeCategory(kit.category);
                                  applyNicheKit(kit.category);
                                }}
                                className={`px-2 py-1.5 rounded-lg text-[10px] font-semibold transition flex items-center justify-center gap-1 cursor-pointer border ${
                                  isSelectedKit
                                    ? 'bg-amber-400/20 border-amber-400 text-amber-200'
                                    : 'bg-neutral-950/80 border-neutral-800 text-neutral-300 hover:border-amber-500/40 hover:text-white'
                                }`}
                              >
                                <CheckCircle2 className={`w-3 h-3 shrink-0 ${isSelectedKit ? 'text-amber-400' : 'text-neutral-500'}`} />
                                <span className="truncate">{kit.shortLabel}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {filteredThemes.length === 0 ? (
                  <div className="mt-3 p-6 rounded-xl border border-neutral-800 bg-neutral-950/60 text-center space-y-2">
                    <div className="text-xs font-semibold text-neutral-300">
                      Nenhum tema encontrado para "{themeSearchQuery}"
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      Tente buscar por termos como "barbearia", "advogada", "estética", "unhas", "mentoria" ou "dark".
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setThemeSearchQuery('');
                        setSelectedThemeCategory('Todos');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-[11px] font-semibold transition cursor-pointer"
                    >
                      Mostrar Todos os Temas
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-2.5">
                    {filteredThemes.map((thm) => (
                      <button
                        key={thm.id}
                        onClick={() => applyThemePreset(thm.id)}
                        className={`p-3 rounded-xl border text-left transition flex flex-col justify-between h-24 cursor-pointer ${
                          !data.customColors.enabled && data.theme === thm.id
                            ? 'border-amber-400 bg-amber-500/10 ring-1 ring-amber-400/30'
                            : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                        }`}
                      >
                        <div>
                          <div className="text-[11px] font-bold text-neutral-100 line-clamp-1">{thm.name}</div>
                          <div className="text-[9px] text-amber-400/90 line-clamp-1 mt-0.5">{thm.badge}</div>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-1.5">
                            <span className="w-3.5 h-3.5 rounded-full border border-neutral-700" style={{ background: thm.bg }} />
                            <span className="w-3.5 h-3.5 rounded-full border border-neutral-700" style={{ background: thm.accent }} />
                            <span className="w-3.5 h-3.5 rounded-full border border-neutral-700" style={{ background: thm.cardBg }} />
                          </div>
                          <span className="text-[8px] text-neutral-500 truncate max-w-[75px]">{thm.category.split(' ')[0]}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Cores Personalizadas */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-neutral-200">Paleta Personalizada com Color Pickers</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.customColors.enabled}
                      onChange={(e) => updateCustomColor('enabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                {data.customColors.enabled && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-400 block">Fundo da Página</span>
                      <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-lg border border-neutral-800">
                        <input
                          type="color"
                          value={data.customColors.bg}
                          onChange={(e) => updateCustomColor('bg', e.target.value)}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                        />
                        <span className="text-[10px] font-mono text-neutral-300">{data.customColors.bg}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-400 block">Cor de Destaque</span>
                      <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-lg border border-neutral-800">
                        <input
                          type="color"
                          value={data.customColors.accent}
                          onChange={(e) => updateCustomColor('accent', e.target.value)}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                        />
                        <span className="text-[10px] font-mono text-neutral-300">{data.customColors.accent}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-400 block">Texto Principal</span>
                      <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-lg border border-neutral-800">
                        <input
                          type="color"
                          value={data.customColors.textMain}
                          onChange={(e) => updateCustomColor('textMain', e.target.value)}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                        />
                        <span className="text-[10px] font-mono text-neutral-300">{data.customColors.textMain}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-400 block">Fundo dos Botões</span>
                      <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-lg border border-neutral-800">
                        <input
                          type="color"
                          value={data.customColors.cardBg}
                          onChange={(e) => updateCustomColor('cardBg', e.target.value)}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                        />
                        <span className="text-[10px] font-mono text-neutral-300">{data.customColors.cardBg}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-400 block">Texto dos Botões</span>
                      <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-lg border border-neutral-800">
                        <input
                          type="color"
                          value={data.customColors.cardText}
                          onChange={(e) => updateCustomColor('cardText', e.target.value)}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                        />
                        <span className="text-[10px] font-mono text-neutral-300">{data.customColors.cardText}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-400 block">Borda / Brilho</span>
                      <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-lg border border-neutral-800">
                        <input
                          type="color"
                          value={data.customColors.cardBorder}
                          onChange={(e) => updateCustomColor('cardBorder', e.target.value)}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                        />
                        <span className="text-[10px] font-mono text-neutral-300">{data.customColors.cardBorder}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Tipografia */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">
                  2. Tipografia Editorial
                </label>
                <select
                  value={data.styling.fontFamily}
                  onChange={(e) => updateStyle('fontFamily', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 focus:border-amber-500 text-neutral-200"
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f.id} value={f.id}>{f.label}</option>
                  ))}
                </select>
              </div>

              {/* Tratamento da Foto de Capa */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" /> 3. Foto de Capa (Cabeçalho) & Filtros de Estúdio
                  </span>
                  <label className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-[11px] font-semibold cursor-pointer flex items-center gap-1.5 transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Carregar Foto do Cabeçalho</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (base64) => updateProfile('avatarUrl', base64))}
                    />
                  </label>
                </div>

                {/* Mini Preview + URL Input da Foto de Capa */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-black border border-neutral-700 shrink-0">
                    {data.profile.avatarUrl ? (
                      <img
                        src={data.profile.avatarUrl}
                        alt="Preview Cabeçalho"
                        className="w-full h-full object-cover block"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-600 text-[9px]">
                        Sem foto
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="text-[10px] text-neutral-400 flex items-center justify-between">
                      <span>Imagem Atual do Cabeçalho:</span>
                      {data.profile.avatarUrl?.startsWith('data:') && (
                        <span className="text-emerald-400 font-semibold">✓ Upload Local Ativo</span>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Cole a URL da imagem ou use o botão Carregar..."
                      value={data.profile.avatarUrl?.startsWith('data:') ? '' : data.profile.avatarUrl}
                      onChange={(e) => updateProfile('avatarUrl', e.target.value)}
                      className="w-full px-2.5 py-1 text-[11px] rounded bg-neutral-950 border border-neutral-800 text-neutral-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {PHOTO_FILTERS.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => updateStyle('photoFilter', filter.id)}
                      className={`px-2 py-1 text-[11px] rounded-lg border text-center transition cursor-pointer ${
                        data.styling.photoFilter === filter.id
                          ? 'border-amber-400 bg-amber-500/20 text-amber-300 font-bold'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-300">Altura da Capa</span>
                      <span className="text-amber-400 font-mono">{data.styling.photoHeight}px</span>
                    </div>
                    <input
                      type="range"
                      min="280"
                      max="480"
                      value={data.styling.photoHeight}
                      onChange={(e) => updateStyle('photoHeight', Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-300">Zoom / Escala</span>
                      <span className="text-amber-400 font-mono">{data.styling.photoScale}%</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="150"
                      value={data.styling.photoScale}
                      onChange={(e) => updateStyle('photoScale', Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-300">Enquadramento Vertical</span>
                      <span className="text-amber-400 font-mono">{data.styling.photoPosY}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={data.styling.photoPosY}
                      onChange={(e) => updateStyle('photoPosY', Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-300">Arredondamento Cards</span>
                      <span className="text-amber-400 font-mono">{data.styling.borderRadius}px</span>
                    </div>
                    <input
                      type="range"
                      min="8"
                      max="32"
                      value={data.styling.borderRadius}
                      onChange={(e) => updateStyle('borderRadius', Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-300">Intensidade da Vinheta / Fade de Fusão</span>
                    <span className="text-amber-400 font-mono">{data.styling.vignetteIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={data.styling.vignetteIntensity}
                    onChange={(e) => updateStyle('vignetteIntensity', Number(e.target.value))}
                    className="w-full accent-amber-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800/80">
                  <label className="flex items-center gap-2 text-[11px] text-neutral-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.styling.spotlightGlow}
                      onChange={(e) => updateStyle('spotlightGlow', e.target.checked)}
                      className="accent-amber-500"
                    />
                    <span>Spotlight Glow</span>
                  </label>
                  <label className="flex items-center gap-2 text-[11px] text-neutral-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.styling.metallicBorders}
                      onChange={(e) => updateStyle('metallicBorders', e.target.checked)}
                      className="accent-amber-500"
                    />
                    <span>Bordas Metálicas</span>
                  </label>
                  <label className="flex items-center gap-2 text-[11px] text-neutral-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.styling.glassmorphism}
                      onChange={(e) => updateStyle('glassmorphism', e.target.checked)}
                      className="accent-amber-500"
                    />
                    <span>Glassmorphism</span>
                  </label>
                </div>

                {/* Vertical Alignment Options for .wrapper */}
                <div className="pt-3 border-t border-neutral-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                      <SlidersHorizontal className="w-4 h-4" /> Alinhamento Vertical do Conteúdo (.wrapper)
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {data.styling.wrapperAlignment || 'flex-start'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'flex-start', label: 'Topo (flex-start)', desc: 'Alinhado ao topo' },
                      { id: 'center', label: 'Centralizado (center)', desc: 'Centralizado verticalmente' },
                      { id: 'flex-end', label: 'Rodapé (flex-end)', desc: 'Alinhado ao rodapé' },
                    ].map((align) => (
                      <button
                        key={align.id}
                        type="button"
                        onClick={() => updateStyle('wrapperAlignment', align.id)}
                        className={`p-2 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                          (data.styling.wrapperAlignment || 'flex-start') === align.id
                            ? 'border-amber-400 bg-amber-500/20 text-amber-300 font-bold shadow'
                            : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        <span className="text-[11px]">{align.label}</span>
                        <span className="text-[9px] font-normal opacity-70">{align.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IDENTIDADE, PERFIL & AVISOS */}
          {activeTab === 'identity' && (
            <div className="space-y-5">
              {/* Barra de Aviso */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BellRing className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-neutral-200">Barra de Alerta / Escassez (Topo)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={data.announcement.enabled}
                    onChange={(e) => updateAnnounce('enabled', e.target.checked)}
                    className="accent-amber-500"
                  />
                </div>

                {data.announcement.enabled && (
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div>
                      <label className="text-[10px] text-neutral-400">Badge</label>
                      <input
                        type="text"
                        value={data.announcement.badge}
                        onChange={(e) => updateAnnounce('badge', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] text-neutral-400">Mensagem</label>
                      <input
                        type="text"
                        value={data.announcement.text}
                        onChange={(e) => updateAnnounce('text', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Foto Principal */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-amber-400" /> Foto Principal do Cabeçalho (Upload Direto ou URL)
                  </label>
                  <label className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-medium cursor-pointer flex items-center gap-1.5 transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Carregar Arquivo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (base64) => updateProfile('avatarUrl', base64))}
                    />
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-black border border-neutral-800 shrink-0">
                    {data.profile.avatarUrl && (
                      <img
                        src={data.profile.avatarUrl}
                        alt="Miniatura do Cabeçalho"
                        className="w-full h-full object-cover block"
                      />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      placeholder="Ou cole aqui a URL direta da foto (https://...)"
                      value={data.profile.avatarUrl?.startsWith('data:') ? '' : data.profile.avatarUrl}
                      onChange={(e) => updateProfile('avatarUrl', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                    />
                    {data.profile.avatarUrl?.startsWith('data:') && (
                      <p className="text-[10px] text-emerald-400 font-medium">
                        ✓ Imagem carregada do seu dispositivo e exibida no cabeçalho do simulador.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Nome & Título */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">Nome do Profissional</label>
                  <input
                    type="text"
                    value={data.profile.name}
                    onChange={(e) => updateProfile('name', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 uppercase tracking-wider"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">Cargo / Especialidade</label>
                  <input
                    type="text"
                    value={data.profile.title}
                    onChange={(e) => updateProfile('title', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-amber-400 uppercase tracking-widest"
                  />
                </div>
              </div>

              {/* Slogan */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-neutral-300">Slogan de Posicionamento</label>
                  <button
                    type="button"
                    onClick={() => openCopyOptimizer('Slogan de Posicionamento', data.profile.tagline, (newText) => updateProfile('tagline', newText))}
                    className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 fill-amber-400" />
                    <span>Otimizar Copy com IA</span>
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={data.profile.tagline}
                  onChange={(e) => updateProfile('tagline', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 resize-none"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-neutral-300">Frase em Caligrafia / Cursiva</label>
                  <button
                    type="button"
                    onClick={() => openCopyOptimizer('Frase Cursiva', data.profile.cursivePhrase, (newText) => updateProfile('cursivePhrase', newText))}
                    className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 fill-amber-400" />
                    <span>Otimizar com IA</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={data.profile.cursivePhrase}
                  onChange={(e) => updateProfile('cursivePhrase', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 italic"
                />
              </div>

              {/* Contatos */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-neutral-400">WhatsApp</label>
                  <input
                    type="text"
                    value={data.profile.whatsapp}
                    onChange={(e) => updateProfile('whatsapp', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-neutral-400">Instagram (@)</label>
                  <input
                    type="text"
                    value={data.profile.instagram}
                    onChange={(e) => updateProfile('instagram', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: FUNIL QUALIFICADOR ANTI-CURIOSOS */}
          {activeTab === 'qualifier' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Filtro de Qualificação de Clientes (Anti-Curiosos)
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.qualifierFunnel.enabled}
                      onChange={(e) => updateQualifier('enabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>
                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  Elimina curiosos que perguntam apenas "qual o preço?" e somem. O cliente responde a 3 perguntas estratégicas e o WhatsApp já abre com o relatório completo da necessidade dele formatado!
                </p>
              </div>

              {data.qualifierFunnel.enabled && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                    <span className="text-xs font-semibold text-neutral-200 block">Texto do Botão de Abertura</span>
                    <div>
                      <label className="text-[10px] text-neutral-400">Título do Botão</label>
                      <input
                        type="text"
                        value={data.qualifierFunnel.triggerButtonLabel}
                        onChange={(e) => updateQualifier('triggerButtonLabel', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-400">Subtítulo Explicativo</label>
                      <input
                        type="text"
                        value={data.qualifierFunnel.triggerButtonSubtitle}
                        onChange={(e) => updateQualifier('triggerButtonSubtitle', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-neutral-200">Perguntas do Questionário</span>
                      <button
                        onClick={() => {
                          const newQ = {
                            id: 'q-' + Date.now(),
                            title: 'Nova Pergunta de Triagem',
                            options: ['Opção A', 'Opção B', 'Opção C']
                          };
                          updateQualifier('questions', [...data.qualifierFunnel.questions, newQ]);
                        }}
                        className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-xs font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Adicionar Pergunta
                      </button>
                    </div>

                    {data.qualifierFunnel.questions.map((q, qIndex) => (
                      <div key={q.id} className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                            Etapa 0{qIndex + 1}
                          </span>
                          {data.qualifierFunnel.questions.length > 1 && (
                            <button
                              onClick={() => {
                                const filtered = data.qualifierFunnel.questions.filter(item => item.id !== q.id);
                                updateQualifier('questions', filtered);
                              }}
                              className="text-neutral-500 hover:text-red-400 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <div>
                          <label className="text-[10px] text-neutral-400">Enunciado da Pergunta</label>
                          <input
                            type="text"
                            value={q.title}
                            onChange={(e) => {
                              const updated = data.qualifierFunnel.questions.map((item, idx) =>
                                idx === qIndex ? { ...item, title: e.target.value } : item
                              );
                              updateQualifier('questions', updated);
                            }}
                            className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] text-neutral-400">Opções de Resposta</label>
                          {q.options.map((opt, optIndex) => (
                            <div key={optIndex} className="flex gap-1.5">
                              <input
                                type="text"
                                value={opt}
                                onChange={(e) => {
                                  const updated = data.qualifierFunnel.questions.map((item, idx) => {
                                    if (idx !== qIndex) return item;
                                    const newOpts = [...item.options];
                                    newOpts[optIndex] = e.target.value;
                                    return { ...item, options: newOpts };
                                  });
                                  updateQualifier('questions', updated);
                                }}
                                className="flex-1 px-2 py-1 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                              />
                              {q.options.length > 2 && (
                                <button
                                  onClick={() => {
                                    const updated = data.qualifierFunnel.questions.map((item, idx) => {
                                      if (idx !== qIndex) return item;
                                      return { ...item, options: item.options.filter((_, i) => i !== optIndex) };
                                    });
                                    updateQualifier('questions', updated);
                                  }}
                                  className="text-neutral-500 hover:text-red-400 px-1 cursor-pointer"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              const updated = data.qualifierFunnel.questions.map((item, idx) =>
                                idx === qIndex ? { ...item, options: [...item.options, 'Nova opção de escolha'] } : item
                              );
                              updateQualifier('questions', updated);
                            }}
                            className="text-[10px] text-amber-400 hover:underline pt-1 flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Adicionar opção nesta pergunta
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MÓDULOS ESPECIAIS & PROVA SOCIAL */}
          {activeTab === 'modules' && (
            <div className="space-y-6">
              {/* Módulo: Métricas de Autoridade */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-neutral-200">Métricas de Autoridade (+500 Clientes, 8 Anos...)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={data.metrics.enabled}
                    onChange={(e) => updateMetrics('enabled', e.target.checked)}
                    className="accent-amber-500"
                  />
                </div>

                {data.metrics.enabled && (
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={data.metrics.stat1Value}
                        onChange={(e) => updateMetrics('stat1Value', e.target.value)}
                        className="w-full px-2 py-1 text-xs rounded bg-neutral-900 border border-neutral-800 text-amber-400 font-bold"
                      />
                      <input
                        type="text"
                        value={data.metrics.stat1Label}
                        onChange={(e) => updateMetrics('stat1Label', e.target.value)}
                        className="w-full px-2 py-1 text-[10px] rounded bg-neutral-900 border border-neutral-800 text-neutral-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={data.metrics.stat2Value}
                        onChange={(e) => updateMetrics('stat2Value', e.target.value)}
                        className="w-full px-2 py-1 text-xs rounded bg-neutral-900 border border-neutral-800 text-amber-400 font-bold"
                      />
                      <input
                        type="text"
                        value={data.metrics.stat2Label}
                        onChange={(e) => updateMetrics('stat2Label', e.target.value)}
                        className="w-full px-2 py-1 text-[10px] rounded bg-neutral-900 border border-neutral-800 text-neutral-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={data.metrics.stat3Value}
                        onChange={(e) => updateMetrics('stat3Value', e.target.value)}
                        className="w-full px-2 py-1 text-xs rounded bg-neutral-900 border border-neutral-800 text-amber-400 font-bold"
                      />
                      <input
                        type="text"
                        value={data.metrics.stat3Label}
                        onChange={(e) => updateMetrics('stat3Label', e.target.value)}
                        className="w-full px-2 py-1 text-[10px] rounded bg-neutral-900 border border-neutral-800 text-neutral-400"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Módulo: Como Funciona o Processo (Estilo Martina Bianchi / Psicologia) */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-neutral-200">Etapas / "Como funciona o processo (01, 02, 03)"</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={data.processSteps.enabled}
                    onChange={(e) => updateProcess('enabled', e.target.checked)}
                    className="accent-amber-500"
                  />
                </div>

                {data.processSteps.enabled && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-[10px] text-neutral-400">Título da Seção</label>
                      <input
                        type="text"
                        value={data.processSteps.headline}
                        onChange={(e) => updateProcess('headline', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
                      />
                    </div>
                    {data.processSteps.steps.map((st, i) => (
                      <div key={st.id} className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1.5">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={st.number}
                            onChange={(e) => {
                              const newS = data.processSteps.steps.map((item, idx) =>
                                idx === i ? { ...item, number: e.target.value } : item
                              );
                              updateProcess('steps', newS);
                            }}
                            className="w-12 px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-amber-400 font-bold"
                          />
                          <input
                            type="text"
                            value={st.title}
                            onChange={(e) => {
                              const newS = data.processSteps.steps.map((item, idx) =>
                                idx === i ? { ...item, title: e.target.value } : item
                              );
                              updateProcess('steps', newS);
                            }}
                            placeholder="Título do passo"
                            className="flex-1 px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-200"
                          />
                        </div>
                        <input
                          type="text"
                          value={st.description}
                          onChange={(e) => {
                            const newS = data.processSteps.steps.map((item, idx) =>
                              idx === i ? { ...item, description: e.target.value } : item
                            );
                            updateProcess('steps', newS);
                          }}
                          placeholder="Descrição rápida da etapa"
                          className="w-full px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-400"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Módulo: Galeria de Fotos & Portfólio de Resultados */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Grid className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-neutral-200">Galeria de Fotos & Portfólio</span>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {data.studentGrid.photos?.length || 0} FOTOS
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-400">Layouts responsivos, carrossel touch, mosaico e zoom lightbox</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={data.studentGrid.enabled}
                    onChange={(e) => updateStudentGrid('enabled', e.target.checked)}
                    className="accent-amber-500 w-4 h-4 cursor-pointer"
                  />
                </div>

                {data.studentGrid.enabled && (
                  <div className="space-y-4 pt-2 border-t border-neutral-800/80">
                    {/* Linha 1: Título, Badge e Subtítulo */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">Badge Superior</label>
                        <input
                          type="text"
                          placeholder="Ex: PORTFÓLIO REAL"
                          value={data.studentGrid.badge || ''}
                          onChange={(e) => updateStudentGrid('badge', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-amber-300 font-bold uppercase"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-neutral-400 block mb-1">Título da Galeria</label>
                        <input
                          type="text"
                          value={data.studentGrid.headline}
                          onChange={(e) => updateStudentGrid('headline', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-neutral-400 block mb-1">Subtítulo Explicativo</label>
                      <input
                        type="text"
                        placeholder="Ex: Transformações reais geradas pelo método e registros de alto padrão"
                        value={data.studentGrid.subtitle || ''}
                        onChange={(e) => updateStudentGrid('subtitle', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
                      />
                    </div>

                    {/* Linha 2: Seletor de Layouts Visuais */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-neutral-300 block">
                        Modelo de Exibição / Layout
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'grid3', label: 'Grid 3 Col.', desc: '3 por linha (Compacto)' },
                          { id: 'grid2', label: 'Grid 2 Col.', desc: '2 por linha (Destaque)' },
                          { id: 'mosaic', label: 'Mosaico Hero', desc: '1ª foto grande 2x2' },
                          { id: 'carousel', label: 'Carrossel Touch', desc: 'Deslize com Snap' },
                        ].map((lt) => (
                          <button
                            key={lt.id}
                            type="button"
                            onClick={() => updateStudentGrid('layout', lt.id)}
                            className={`p-2 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                              (data.studentGrid.layout || 'grid3') === lt.id
                                ? 'border-amber-400 bg-amber-500/20 text-amber-300 font-bold shadow'
                                : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                            }`}
                          >
                            <span className="text-[11px]">{lt.label}</span>
                            <span className="text-[8.5px] font-normal opacity-70">{lt.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Linha 3: Proporção das Imagens (Aspect Ratio) & Lightbox Toggle */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-neutral-300 block">
                          Formato das Imagens (Proporção)
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {[
                            { id: 'square', label: '1:1 Quadrado' },
                            { id: 'portrait', label: '4:5 Feed' },
                            { id: 'landscape', label: '4:3 Retangular' },
                          ].map((ar) => (
                            <button
                              key={ar.id}
                              type="button"
                              onClick={() => updateStudentGrid('aspectRatio', ar.id)}
                              className={`py-1.5 px-2 rounded-lg border text-center text-[10px] font-medium transition cursor-pointer ${
                                (data.studentGrid.aspectRatio || 'square') === ar.id
                                  ? 'border-amber-400 bg-amber-500/20 text-amber-300 font-bold'
                                  : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                              }`}
                            >
                              {ar.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold text-neutral-200 block">Zoom Lightbox</span>
                          <span className="text-[9.5px] text-neutral-400 block">Toque na foto para ampliar em tela cheia</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={data.studentGrid.enableLightbox !== false}
                          onChange={(e) => updateStudentGrid('enableLightbox', e.target.checked)}
                          className="accent-amber-500 w-4 h-4 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Presets Rápidos por Nicho */}
                    <div className="space-y-1.5 pt-1">
                      <label className="text-[10px] font-semibold text-amber-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" /> Preencher Fotos com Exemplos de Alto Padrão por Nicho:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <button
                          type="button"
                          onClick={() => loadGalleryPreset('beauty')}
                          className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-[10.5px] text-neutral-300 font-medium transition cursor-pointer text-center"
                        >
                          💅 Beleza & Lash
                        </button>
                        <button
                          type="button"
                          onClick={() => loadGalleryPreset('barber')}
                          className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-[10.5px] text-neutral-300 font-medium transition cursor-pointer text-center"
                        >
                          ✂️ Barbearia
                        </button>
                        <button
                          type="button"
                          onClick={() => loadGalleryPreset('health')}
                          className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-[10.5px] text-neutral-300 font-medium transition cursor-pointer text-center"
                        >
                          🩺 Saúde & Clínica
                        </button>
                        <button
                          type="button"
                          onClick={() => loadGalleryPreset('exec')}
                          className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-[10.5px] text-neutral-300 font-medium transition cursor-pointer text-center"
                        >
                          💼 Executivo & Cursos
                        </button>
                      </div>
                    </div>

                    {/* Gerenciador de Fotos Atuais */}
                    <div className="space-y-2 pt-2 border-t border-neutral-800/80">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-neutral-200">
                          Fotos na Galeria ({data.studentGrid.photos?.length || 0})
                        </label>
                        <label className="text-[10px] text-amber-400 hover:underline cursor-pointer flex items-center gap-1 font-semibold">
                          <Upload className="w-3 h-3" /> + Upload Direto do Computador
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => {
                              const files = e.target.files;
                              if (!files || files.length === 0) return;
                              Array.from(files).forEach((file) => {
                                const reader = new FileReader();
                                reader.onload = () => {
                                  if (typeof reader.result === 'string') {
                                    addGalleryPhoto(reader.result);
                                  }
                                };
                                reader.readAsDataURL(file);
                              });
                            }}
                          />
                        </label>
                      </div>

                      {/* Lista de Fotos */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[360px] overflow-y-auto tab-scrollbar p-1">
                        {data.studentGrid.photos?.map((photo, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2 relative group"
                          >
                            <div className="relative aspect-square rounded-lg overflow-hidden border border-neutral-800 bg-black">
                              <img
                                src={photo}
                                alt={`Foto ${idx + 1}`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[8px] font-mono font-bold text-white">
                                #{idx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => setLightboxIndex(idx)}
                                className="absolute bottom-1 right-1 p-1 rounded bg-black/60 text-white hover:bg-black/90 cursor-pointer"
                                title="Visualizar zoom"
                              >
                                <Maximize2 className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between gap-1 pt-0.5">
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => moveGalleryPhoto(idx, idx - 1)}
                                  className={`p-1 rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition ${
                                    idx === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                                  }`}
                                  title="Mover para a esquerda"
                                >
                                  <ArrowLeft className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === (data.studentGrid.photos?.length || 0) - 1}
                                  onClick={() => moveGalleryPhoto(idx, idx + 1)}
                                  className={`p-1 rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition ${
                                    idx === (data.studentGrid.photos?.length || 0) - 1
                                      ? 'opacity-30 cursor-not-allowed'
                                      : 'cursor-pointer'
                                  }`}
                                  title="Mover para a direita"
                                >
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>

                              <div className="flex items-center gap-1">
                                <label
                                  className="p-1 rounded bg-neutral-800 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-400 transition cursor-pointer"
                                  title="Substituir foto por arquivo local"
                                >
                                  <Upload className="w-3 h-3" />
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleFileUpload(e, (base64) => {
                                        const newP = [...data.studentGrid.photos];
                                        newP[idx] = base64;
                                        updateStudentGrid('photos', newP);
                                        showToast(`📸 Foto #${idx + 1} substituída!`);
                                      })
                                    }
                                  />
                                </label>
                                <button
                                  type="button"
                                  onClick={() => removeGalleryPhoto(idx)}
                                  className="p-1 rounded bg-neutral-800 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition cursor-pointer"
                                  title="Excluir foto"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Input para adicionar nova foto por URL ou botão de adição rápida */}
                      <div className="pt-2 flex gap-2">
                        <input
                          type="text"
                          placeholder="Cole a URL da imagem aqui para adicionar..."
                          value={newGalleryUrl}
                          onChange={(e) => setNewGalleryUrl(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addGalleryPhoto(newGalleryUrl);
                            }
                          }}
                          className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                        />
                        <button
                          type="button"
                          onClick={() => addGalleryPhoto(newGalleryUrl)}
                          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1 cursor-pointer transition shadow"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Adicionar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Módulo: Antes e Depois Interativo */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-neutral-200">Comparador Antes & Depois Interativo</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={data.beforeAfter.enabled}
                    onChange={(e) => updateBeforeAfter('enabled', e.target.checked)}
                    className="accent-amber-500"
                  />
                </div>

                {data.beforeAfter.enabled && (
                  <div className="space-y-2.5 pt-1">
                    <div>
                      <label className="text-[10px] text-neutral-400">Título da Seção</label>
                      <input
                        type="text"
                        value={data.beforeAfter.headline}
                        onChange={(e) => updateBeforeAfter('headline', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] text-neutral-400">Foto Antes</label>
                          <label className="text-[10px] text-amber-400 cursor-pointer hover:underline">
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (b64) => updateBeforeAfter('beforeUrl', b64))}
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          value={data.beforeAfter.beforeUrl.startsWith('data:') ? 'Upload local' : data.beforeAfter.beforeUrl}
                          onChange={(e) => updateBeforeAfter('beforeUrl', e.target.value)}
                          className="w-full px-2 py-1 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] text-neutral-400">Foto Depois</label>
                          <label className="text-[10px] text-amber-400 cursor-pointer hover:underline">
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (b64) => updateBeforeAfter('afterUrl', b64))}
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          value={data.beforeAfter.afterUrl.startsWith('data:') ? 'Upload local' : data.beforeAfter.afterUrl}
                          onChange={(e) => updateBeforeAfter('afterUrl', e.target.value)}
                          className="w-full px-2 py-1 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Módulo: Depoimentos de Clientes */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-neutral-200">Carrossel de Depoimentos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {data.testimonials.enabled && (
                      <button
                        onClick={addTestimonial}
                        className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Novo
                      </button>
                    )}
                    <input
                      type="checkbox"
                      checked={data.testimonials.enabled}
                      onChange={(e) => setData(p => ({ ...p, testimonials: { ...p.testimonials, enabled: e.target.checked } }))}
                      className="accent-amber-500"
                    />
                  </div>
                </div>

                {data.testimonials.enabled && (
                  <div className="space-y-2.5 pt-1">
                    {data.testimonials.items.map((t) => (
                      <div key={t.id} className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1.5">
                        <div className="flex justify-between gap-2">
                          <input
                            type="text"
                            value={t.clientName}
                            onChange={(e) => updateTestimonial(t.id, 'clientName', e.target.value)}
                            placeholder="Cliente"
                            className="flex-1 px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-200"
                          />
                          <input
                            type="text"
                            value={t.city}
                            onChange={(e) => updateTestimonial(t.id, 'city', e.target.value)}
                            placeholder="Cidade"
                            className="w-28 px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-400"
                          />
                          <button
                            onClick={() => removeTestimonial(t.id)}
                            className="text-neutral-500 hover:text-red-400 px-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={t.text}
                          onChange={(e) => updateTestimonial(t.id, 'text', e.target.value)}
                          className="w-full px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-300 resize-none"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Módulo: Card de Localização / Google Maps (Estilo Janne & Hellen) */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-neutral-200">Card de Localização & Endereço</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={data.locationCard.enabled}
                    onChange={(e) => updateLocationCard('enabled', e.target.checked)}
                    className="accent-amber-500"
                  />
                </div>

                {data.locationCard.enabled && (
                  <div className="space-y-2 pt-1">
                    <div>
                      <label className="text-[10px] text-neutral-400">Endereço Exibido</label>
                      <input
                        type="text"
                        value={data.locationCard.address}
                        onChange={(e) => updateLocationCard('address', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-400">Link do Google Maps</label>
                      <input
                        type="text"
                        value={data.locationCard.mapsUrl}
                        onChange={(e) => updateLocationCard('mapsUrl', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Módulo: Sobre Mim & FAQ */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-neutral-200">Seção "Sobre Mim" & Biografia</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={data.aboutMe.enabled}
                    onChange={(e) => updateAboutMe('enabled', e.target.checked)}
                    className="accent-amber-500"
                  />
                </div>

                {data.aboutMe.enabled && (
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] text-neutral-400">Foto Secundária (Sobre Mim)</label>
                      <label className="text-[10px] text-amber-400 cursor-pointer hover:underline flex items-center gap-1">
                        <Upload className="w-3 h-3" /> Upload Foto
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (b64) => updateProfile('aboutPhotoUrl', b64))}
                        />
                      </label>
                    </div>
                    <textarea
                      rows={3}
                      value={data.aboutMe.paragraph}
                      onChange={(e) => updateAboutMe('paragraph', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200 resize-none"
                    />
                    <input
                      type="text"
                      value={data.aboutMe.closingPhrase}
                      onChange={(e) => updateAboutMe('closingPhrase', e.target.value)}
                      placeholder="Assinatura cursiva de fechamento"
                      className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-300 italic"
                    />
                  </div>
                )}
              </div>

              {/* Módulo: Dúvidas Frequentes (FAQ) */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-neutral-200">Dúvidas Frequentes (FAQ)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={data.faq.enabled}
                    onChange={(e) => updateFaq('enabled', e.target.checked)}
                    className="accent-amber-500"
                  />
                </div>

                {data.faq.enabled && (
                  <div className="space-y-2 pt-1">
                    {data.faq.items.map((item, idx) => (
                      <div key={item.id} className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1.5">
                        <input
                          type="text"
                          value={item.question}
                          onChange={(e) => {
                            const updated = data.faq.items.map((q, i) =>
                              i === idx ? { ...q, question: e.target.value } : q
                            );
                            updateFaq('items', updated);
                          }}
                          className="w-full px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-200 font-semibold"
                        />
                        <input
                          type="text"
                          value={item.answer}
                          onChange={(e) => {
                            const updated = data.faq.items.map((q, i) =>
                              i === idx ? { ...q, answer: e.target.value } : q
                            );
                            updateFaq('items', updated);
                          }}
                          className="w-full px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-400"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CATÁLOGO DE SERVIÇOS & CURSOS */}
          {activeTab === 'services' && (
            <div className="space-y-5">
              {/* Header & Master Switch */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold text-neutral-100 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-amber-400" />
                      <span>Procedimentos, Consultorias ou Cursos</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {data.services.items.length} {data.services.items.length === 1 ? 'item' : 'itens'}
                      </span>
                    </h2>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Cards de alta conversão com foto, ancoragem de preço, duração, selo de destaque e ação customizável.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <label className="flex items-center gap-1.5 text-xs text-neutral-300 cursor-pointer bg-neutral-900 px-2.5 py-1.5 rounded-lg border border-neutral-800">
                      <input
                        type="checkbox"
                        checked={data.services.enabled}
                        onChange={(e) => updateServicesConfig('enabled', e.target.checked)}
                        className="accent-amber-500"
                      />
                      <span>Exibir no Site</span>
                    </label>
                    <button
                      type="button"
                      onClick={addService}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-1 shadow transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Adicionar Item
                    </button>
                  </div>
                </div>

                {/* Presets Rápidos por Nicho */}
                <div className="pt-3 border-t border-neutral-800/80 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Preencher Catálogo com Modelo Pronto (1-Clique):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'law', label: '⚖️ Jurídico & Consultoria' },
                      { id: 'beauty', label: '💅 Estética & Beleza' },
                      { id: 'barber', label: '💈 Barbearia & Combos' },
                      { id: 'mentorship', label: '🎓 Mentoria & Cursos' },
                      { id: 'health', label: '🩺 Saúde & Clínica' },
                    ].map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => loadServicesPreset(preset.id as 'law' | 'beauty' | 'barber' | 'mentorship' | 'health')}
                        className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-amber-500/15 text-neutral-300 hover:text-amber-300 border border-neutral-800 hover:border-amber-500/40 text-[10px] font-semibold transition cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Título, Subtítulo, Selo e Layout do Catálogo */}
                <div className="pt-3 border-t border-neutral-800/80 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="text-[10px] text-neutral-400 block mb-1">Selo Superior (Badge)</label>
                      <input
                        type="text"
                        placeholder="Ex: CATÁLOGO VIP"
                        value={data.services.badge || ''}
                        onChange={(e) => updateServicesConfig('badge', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 font-bold uppercase"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[10px] text-neutral-400 block mb-1">Título da Seção no Microsite</label>
                      <input
                        type="text"
                        placeholder="Ex: Como posso te ajudar"
                        value={data.services.headline}
                        onChange={(e) => updateServicesConfig('headline', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">Subtítulo Explicativo da Seção (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ex: Escolha o atendimento ideal e reserve seu horário pelo WhatsApp"
                      value={data.services.subtitle || ''}
                      onChange={(e) => updateServicesConfig('subtitle', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
                    />
                  </div>

                  {/* Seletor de Estilo de Exibição */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                      Formato de Exibição no Celular:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'list', title: 'Lista Compacta', desc: 'Foto lateral + reserva rápida' },
                        { id: 'featured', title: 'Vitrine Expandida', desc: 'Foto grande 16:9 em destaque' },
                        { id: 'grid2', title: 'Grade 2 Colunas', desc: 'Cards lado a lado estilo loja' },
                      ].map((lyt) => {
                        const isSelected = (data.services.layout || 'list') === lyt.id;
                        return (
                          <button
                            key={lyt.id}
                            type="button"
                            onClick={() => updateServicesConfig('layout', lyt.id)}
                            className={`p-2 rounded-xl border text-left transition cursor-pointer ${
                              isSelected
                                ? 'border-amber-400 bg-amber-500/15 text-amber-200 shadow'
                                : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                            }`}
                          >
                            <div className="text-[11px] font-bold">{lyt.title}</div>
                            <div className="text-[9px] opacity-75 mt-0.5">{lyt.desc}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lista de Cards de Procedimentos / Consultorias / Cursos */}
              <div className="space-y-3.5">
                {data.services.items.map((srv, idx) => (
                  <div
                    key={srv.id}
                    className={`p-4 rounded-xl bg-neutral-950 border transition space-y-3 ${
                      srv.featured
                        ? 'border-amber-500/60 ring-1 ring-amber-500/20'
                        : 'border-neutral-800'
                    }`}
                  >
                    {/* Barra de Topo do Item */}
                    <div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-neutral-800/80">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono font-bold text-amber-400">
                          Item #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateService(srv.id, 'featured', !srv.featured)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition cursor-pointer border ${
                            srv.featured
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-neutral-200'
                          }`}
                          title="Destacar este card com borda luminosa no catálogo"
                        >
                          <Star className={`w-3 h-3 ${srv.featured ? 'fill-amber-400 text-amber-400' : ''}`} />
                          <span>{srv.featured ? 'Card Destacado' : 'Destacar Card'}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveService(idx, idx - 1)}
                          className={`p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 transition ${
                            idx === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                          }`}
                          title="Mover para cima"
                        >
                          <ArrowLeft className="w-3.5 h-3.5 rotate-90" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === data.services.items.length - 1}
                          onClick={() => moveService(idx, idx + 1)}
                          className={`p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 transition ${
                            idx === data.services.items.length - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                          }`}
                          title="Mover para baixo"
                        >
                          <ArrowRight className="w-3.5 h-3.5 rotate-90" />
                        </button>
                        <button
                          type="button"
                          onClick={() => duplicateService(srv.id)}
                          className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-amber-300 hover:bg-neutral-800 transition cursor-pointer"
                          title="Duplicar este item"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeService(srv.id)}
                          className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                          title="Excluir este item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Linha 1: Nome & Selo (Badge) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-neutral-400 block mb-1">Nome do Procedimento / Consultoria / Curso</label>
                        <input
                          type="text"
                          value={srv.name}
                          onChange={(e) => updateService(srv.id, 'name', e.target.value)}
                          placeholder="Ex: Consultoria Estratégica Individual"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">Selo / Etiqueta (Opcional)</label>
                        <input
                          type="text"
                          value={srv.badge || ''}
                          onChange={(e) => updateService(srv.id, 'badge', e.target.value)}
                          placeholder="Ex: MAIS PROCURADO"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-amber-300 font-bold uppercase"
                        />
                      </div>
                    </div>

                    {/* Linha 2: Preço De (Ancoragem), Valor Atual e Duração/Formato */}
                    <div className="grid grid-cols-3 gap-2.5">
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">Preço Antigo (Riscado)</label>
                        <input
                          type="text"
                          value={srv.oldPrice || ''}
                          onChange={(e) => updateService(srv.id, 'oldPrice', e.target.value)}
                          placeholder="Ex: R$ 490"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 line-through"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">Valor / Honorários</label>
                        <input
                          type="text"
                          value={srv.price}
                          onChange={(e) => updateService(srv.id, 'price', e.target.value)}
                          placeholder="Ex: R$ 350 ou Sob Consulta"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">Duração / Entrega</label>
                        <input
                          type="text"
                          value={srv.duration || ''}
                          onChange={(e) => updateService(srv.id, 'duration', e.target.value)}
                          placeholder="Ex: 1h30, 45min, Online"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                        />
                      </div>
                    </div>

                    {/* Linha 3: Descrição Breve + Otimizador de Copy IA */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] text-neutral-400">Descrição Breve & Benefícios</label>
                        <button
                          type="button"
                          onClick={() =>
                            openCopyOptimizer(
                              `Descrição do Serviço: ${srv.name}`,
                              srv.description,
                              (newText) => updateService(srv.id, 'description', newText)
                            )
                          }
                          className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3 fill-amber-400" />
                          <span>Otimizar Copy com IA</span>
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={srv.description}
                        onChange={(e) => updateService(srv.id, 'description', e.target.value)}
                        placeholder="Descreva os principais benefícios e entregáveis deste procedimento ou consultoria..."
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 resize-none"
                      />
                    </div>

                    {/* Linha 4: Ação do Botão & Texto do CTA */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">Texto do Botão</label>
                        <input
                          type="text"
                          value={srv.ctaLabel || 'Reservar'}
                          onChange={(e) => updateService(srv.id, 'ctaLabel', e.target.value)}
                          placeholder="Ex: Reservar, Agendar, Comprar"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 font-semibold"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-neutral-400 block mb-1">Ação ao Clicar no Botão</label>
                        <select
                          value={srv.actionType || 'booking'}
                          onChange={(e) => updateService(srv.id, 'actionType', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                        >
                          <option value="booking">📅 Abrir Modal de Pré-Agendamento VIP</option>
                          <option value="whatsapp">💬 WhatsApp Direto (Com Nome & Valor do Item)</option>
                          <option value="link">🔗 Abrir Link Externo / Checkout (Hotmart, Kiwify, etc.)</option>
                        </select>
                      </div>
                    </div>

                    {srv.actionType === 'link' && (
                      <div>
                        <label className="text-[10px] text-amber-300 block mb-1">URL do Checkout / Página de Vendas Externa</label>
                        <input
                          type="text"
                          value={srv.customUrl || ''}
                          onChange={(e) => updateService(srv.id, 'customUrl', e.target.value)}
                          placeholder="https://pay.kiwify.com.br/... ou https://..."
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-amber-500/40 text-amber-200 font-mono"
                        />
                      </div>
                    )}

                    {/* Linha 5: Foto com Preview em Miniatura & Upload */}
                    <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-black border border-neutral-700 shrink-0">
                        {srv.imageUrl ? (
                          <img
                            src={srv.imageUrl}
                            alt={srv.name}
                            referrerPolicy={srv.imageUrl.startsWith('http') ? 'no-referrer' : undefined}
                            className="w-full h-full object-cover block"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[9px] text-neutral-600">
                            Sem foto
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] text-neutral-400 font-medium flex items-center gap-1.5">
                            <span>Foto do Card</span>
                            {srv.imageUrl?.startsWith('data:') && (
                              <span className="text-emerald-400 font-semibold">✓ Upload Local Ativo</span>
                            )}
                          </label>
                          <label className="px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[10px] font-semibold cursor-pointer flex items-center gap-1 transition">
                            <Upload className="w-3 h-3" /> Upload Foto
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (base64) => updateService(srv.id, 'imageUrl', base64))}
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          placeholder="Ou cole aqui a URL da imagem (https://...)"
                          value={srv.imageUrl?.startsWith('data:') ? '' : srv.imageUrl}
                          onChange={(e) => updateService(srv.id, 'imageUrl', e.target.value)}
                          className="w-full px-2.5 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BOTÕES & CTAS */}
          {activeTab === 'buttons' && (
            <div className="space-y-5">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <div>
                  <span className="text-xs font-semibold text-neutral-100 block">Personalização de Botões & Banners</span>
                  <span className="text-[11px] text-neutral-400">Adicione botões com imagem à esquerda/direita, recorte 3D, links e animações</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newBanner = {
                        id: 'cta-' + Date.now(),
                        title: 'E-BOOK GRATUITO: CONTEÚDO INFINITO',
                        subtitle: 'Estruture seu perfil e atraia clientes qualificados todos os dias.',
                        icon: 'Sparkles',
                        linkType: 'custom',
                        url: 'https://',
                        whatsappMessage: 'Olá! Quero saber mais sobre a Mentoria.',
                        openInNewTab: true,
                        animation: 'shimmer',
                        variant: 'default',
                        badgeText: 'DESTAQUE',
                        customBg: '#e2b857',
                        customText: '#0f172a',
                        bgImage: '',
                        imagePosition: 'right',
                        cardImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
                        imageFitStyle: 'popout',
                        imageSize: 96,
                        ctaActionText: 'BAIXE AGORA'
                      };
                      setData(p => ({ ...p, actionCards: [newBanner, ...p.actionCards] }));
                    }}
                    className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer transition"
                  >
                    <ImageIcon className="w-3.5 h-3.5" /> + Banner com Imagem
                  </button>
                  <button
                    onClick={() => {
                      const newCard = {
                        id: 'cta-' + Date.now(),
                        title: 'NOVO BOTÃO DE AÇÃO',
                        subtitle: 'Clique para acessar o link exclusivo.',
                        icon: 'Sparkles',
                        linkType: 'custom',
                        url: 'https://',
                        whatsappMessage: 'Olá! Gostaria de mais informações.',
                        openInNewTab: true,
                        animation: 'none',
                        variant: 'default',
                        badgeText: '',
                        customBg: '#e2b857',
                        customText: '#0f172a',
                        bgImage: '',
                        imagePosition: 'none',
                        cardImage: '',
                        imageFitStyle: 'framed',
                        imageSize: 88,
                        ctaActionText: ''
                      };
                      setData(p => ({ ...p, actionCards: [...p.actionCards, newCard] }));
                    }}
                    className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1 border border-neutral-700 cursor-pointer transition"
                  >
                    <Plus className="w-3.5 h-3.5" /> + Botão Clássico
                  </button>
                </div>
              </div>

              {/* Destaque Rápido do Botão de Triagem VIP */}
              {data.qualifierFunnel.enabled && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                      Animação do Botão de Triagem VIP (Topo)
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      Escolha o efeito de movimento do botão dourado do Funil Anti-Curiosos
                    </span>
                  </div>
                  <select
                    value={data.qualifierFunnel.animation || 'none'}
                    onChange={(e) => updateQualifier('animation', e.target.value)}
                    className="px-2.5 py-1.5 text-xs rounded-lg bg-neutral-950 border border-amber-500/40 text-amber-300 font-semibold"
                  >
                    <option value="none">Sem Animação</option>
                    <option value="shimmer">Brilho Deslizante (Shimmer)</option>
                    <option value="pulse-glow">Pulso Luminoso VIP</option>
                    <option value="float">Flutuação Suave</option>
                    <option value="shake">Chamada de Atenção (Shake)</option>
                  </select>
                </div>
              )}

              <div className="space-y-4">
                {data.actionCards.map((card, idx) => {
                  const updateThisCard = (field: string, value: unknown) => {
                    setData(p => ({
                      ...p,
                      actionCards: p.actionCards.map(c => c.id === card.id ? { ...c, [field]: value } : c)
                    }));
                  };

                  const moveCard = (direction: -1 | 1) => {
                    const targetIdx = idx + direction;
                    if (targetIdx < 0 || targetIdx >= data.actionCards.length) return;
                    setData(p => {
                      const list = [...p.actionCards];
                      const temp = list[idx];
                      list[idx] = list[targetIdx];
                      list[targetIdx] = temp;
                      return { ...p, actionCards: list };
                    });
                  };

                  const duplicateCard = () => {
                    const clone = {
                      ...card,
                      id: 'cta-' + Date.now(),
                      title: card.title + ' (CÓPIA)'
                    };
                    setData(p => {
                      const list = [...p.actionCards];
                      list.splice(idx + 1, 0, clone);
                      return { ...p, actionCards: list };
                    });
                  };

                  return (
                    <div key={card.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3.5 hover:border-neutral-700 transition">
                      {/* Top Header of Card Editor */}
                      <div className="flex justify-between items-center border-b border-neutral-900 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-amber-400 font-bold">
                            Botão #{idx + 1}
                          </span>
                          {card.animation && card.animation !== 'none' && (
                            <span className="text-[10px] text-amber-300/90 font-medium">
                              · Animação Ativa
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveCard(-1)}
                            title="Mover para cima"
                            className="px-2 py-1 text-[10px] rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 disabled:opacity-30 cursor-pointer"
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            disabled={idx === data.actionCards.length - 1}
                            onClick={() => moveCard(1)}
                            title="Mover para baixo"
                            className="px-2 py-1 text-[10px] rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 disabled:opacity-30 cursor-pointer"
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            onClick={duplicateCard}
                            title="Duplicar botão"
                            className="px-2 py-1 text-[10px] rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 flex items-center gap-1 cursor-pointer"
                          >
                            <Copy className="w-3 h-3" /> Duplicar
                          </button>
                          {data.actionCards.length > 1 && (
                            <button
                              type="button"
                              onClick={() => setData(p => ({ ...p, actionCards: p.actionCards.filter(c => c.id !== card.id) }))}
                              title="Excluir botão"
                              className="p-1.5 rounded bg-neutral-900 hover:bg-red-500/20 text-neutral-500 hover:text-red-400 cursor-pointer ml-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Row 1: Title & Icon */}
                      <div className="grid grid-cols-3 gap-2.5">
                        <div className="col-span-2">
                          <label className="text-[10px] text-neutral-400 block mb-1">Título do Botão</label>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => updateThisCard('title', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400 block mb-1">Ícone</label>
                          <select
                            value={card.icon}
                            onChange={(e) => updateThisCard('icon', e.target.value)}
                            className="w-full px-2 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                          >
                            <option value="Calendar">Calendário / Agenda</option>
                            <option value="Scissors">Tesoura (Barbearia)</option>
                            <option value="Scale">Balança (Jurídico)</option>
                            <option value="Briefcase">Pasta Executiva</option>
                            <option value="GraduationCap">Mentoria / Cursos</option>
                            <option value="Sparkles">Brilho (Destaque)</option>
                            <option value="Heart">Coração / Saúde</option>
                            <option value="MessageCircle">WhatsApp / Chat</option>
                            <option value="Star">Estrela VIP</option>
                            <option value="MapPin">Localização / Mapa</option>
                            <option value="Instagram">Instagram</option>
                          </select>
                        </div>
                      </div>

                      {/* Row 2: Subtitle & Optional Internal CTA Action Text */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <div className="sm:col-span-2">
                          <label className="text-[10px] text-neutral-400 block mb-1">Subtítulo Explicativo</label>
                          <input
                            type="text"
                            value={card.subtitle}
                            onChange={(e) => updateThisCard('subtitle', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-amber-400 font-semibold block mb-1">
                            Sub-botão (Ex: BAIXE AGORA)
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: CLIQUE AQUI"
                            value={card.ctaActionText || ''}
                            onChange={(e) => updateThisCard('ctaActionText', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-amber-300 font-bold uppercase"
                          />
                        </div>
                      </div>

                      {/* Row 2.5: IMAGEM LATERAL (ESQUERDA / DIREITA) & BANNER */}
                      <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-amber-500/25 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                            Imagem Lateral do Botão (Posicionar à Esquerda ou Direita)
                          </span>

                          {/* Segmented selector for None / Left / Right */}
                          <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
                            {[
                              { id: 'none', label: 'Apenas Ícone' },
                              { id: 'left', label: '⬅️ Imagem à Esquerda' },
                              { id: 'right', label: 'Imagem à Direita ➡️' },
                            ].map((pos) => (
                              <button
                                key={pos.id}
                                type="button"
                                onClick={() => {
                                  updateThisCard('imagePosition', pos.id);
                                  if (pos.id !== 'none' && !card.cardImage) {
                                    updateThisCard(
                                      'cardImage',
                                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
                                    );
                                  }
                                }}
                                className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition cursor-pointer ${
                                  (card.imagePosition || 'none') === pos.id
                                    ? 'bg-amber-400 text-neutral-950 shadow'
                                    : 'text-neutral-400 hover:text-neutral-200'
                                }`}
                              >
                                {pos.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {card.imagePosition && card.imagePosition !== 'none' && (
                          <div className="space-y-3 pt-1 border-t border-neutral-800/80">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-end">
                              <div className="sm:col-span-2">
                                <div className="flex justify-between items-center mb-1">
                                  <label className="text-[10px] text-neutral-300 font-medium">
                                    Foto / PNG Recortado / Mockup do Produto
                                  </label>
                                  <label className="text-[10px] text-amber-400 hover:underline cursor-pointer flex items-center gap-1 font-semibold">
                                    <Upload className="w-3 h-3" /> Enviar Imagem do Computador
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) =>
                                        handleFileUpload(e, (base64) => updateThisCard('cardImage', base64))
                                      }
                                    />
                                  </label>
                                </div>
                                <input
                                  type="text"
                                  placeholder="Cole a URL da imagem ou faça upload acima..."
                                  value={
                                    card.cardImage?.startsWith('data:')
                                      ? 'Imagem carregada via upload local'
                                      : card.cardImage || ''
                                  }
                                  onChange={(e) => updateThisCard('cardImage', e.target.value)}
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200"
                                />
                              </div>

                              <div>
                                <label className="text-[10px] text-neutral-400 block mb-1">Estilo de Encaixe</label>
                                <select
                                  value={card.imageFitStyle || 'popout'}
                                  onChange={(e) => updateThisCard('imageFitStyle', e.target.value)}
                                  className="w-full px-2 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-amber-300 font-semibold"
                                >
                                  <option value="popout">Recorte 3D Sobreposto (Borda)</option>
                                  <option value="framed">Capa / Card Enquadrado (E-book)</option>
                                  <option value="circle">Redondo / Medalhão</option>
                                </select>
                              </div>
                            </div>

                            {/* Size slider + Quick presets + Optional background image */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                              <div className="space-y-1">
                                <div className="flex justify-between text-[10px]">
                                  <span className="text-neutral-400">Tamanho da Imagem no Botão</span>
                                  <span className="text-amber-400 font-mono font-bold">{card.imageSize || 92}px</span>
                                </div>
                                <input
                                  type="range"
                                  min="68"
                                  max="130"
                                  value={card.imageSize || 92}
                                  onChange={(e) => updateThisCard('imageSize', Number(e.target.value))}
                                  className="w-full accent-amber-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                                />
                              </div>

                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-[10px] text-neutral-400">Fundo Texturizado do Card (Opcional)</span>
                                  <div className="flex items-center gap-2">
                                    <label className="text-[10px] text-amber-400 hover:underline cursor-pointer flex items-center gap-1">
                                      <Upload className="w-3 h-3" /> Upload
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) =>
                                          handleFileUpload(e, (base64) => updateThisCard('bgImage', base64))
                                        }
                                      />
                                    </label>
                                    {card.bgImage && (
                                      <button
                                        type="button"
                                        onClick={() => updateThisCard('bgImage', '')}
                                        className="text-[10px] text-red-400 hover:underline cursor-pointer"
                                      >
                                        Limpar
                                      </button>
                                    )}
                                  </div>
                                </div>
                                <input
                                  type="text"
                                  placeholder="URL de imagem de fundo (opcional)"
                                  value={
                                    card.bgImage?.startsWith('data:')
                                      ? 'Fundo personalizado carregado'
                                      : card.bgImage || ''
                                  }
                                  onChange={(e) => updateThisCard('bgImage', e.target.value)}
                                  className="w-full px-2.5 py-1 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Row 3: Link Type & Custom URL / Action */}
                      <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/90 space-y-2.5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="text-[10px] font-semibold text-amber-400 block mb-1">
                              Ação ao Clicar / Tipo de Destino
                            </label>
                            <select
                              value={card.linkType || 'custom'}
                              onChange={(e) => {
                                const newType = e.target.value;
                                let nextUrl = card.url;
                                if (newType === 'booking') nextUrl = '#booking';
                                else if (newType === 'catalogo') nextUrl = '#catalogo';
                                else if (newType === 'quiz') nextUrl = '#quiz';
                                else if (newType === 'custom' && nextUrl.startsWith('#')) nextUrl = 'https://';
                                setData(p => ({
                                  ...p,
                                  actionCards: p.actionCards.map(c =>
                                    c.id === card.id ? { ...c, linkType: newType, url: nextUrl } : c
                                  )
                                }));
                              }}
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-700 text-neutral-100"
                            >
                              <option value="custom">🔗 Link Personalizado (Site, Checkout, etc.)</option>
                              <option value="whatsapp">💬 Mensagem Direta no WhatsApp</option>
                              <option value="booking">📅 Abrir Modal de Pré-Agendamento</option>
                              <option value="quiz">⚡ Abrir Funil Qualificador (Quiz VIP)</option>
                              <option value="catalogo">🛍️ Rolar até Catálogo de Serviços</option>
                            </select>
                          </div>

                          {/* Selo / Tag de Destaque */}
                          <div>
                            <label className="text-[10px] text-neutral-400 block mb-1">
                              Selo / Etiqueta no Topo do Botão (Opcional)
                            </label>
                            <div className="flex gap-1.5">
                              <input
                                type="text"
                                placeholder="Ex: MAIS PROCURADO, VIP..."
                                value={card.badgeText || ''}
                                onChange={(e) => updateThisCard('badgeText', e.target.value)}
                                className="flex-1 px-2.5 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-amber-300 font-semibold"
                              />
                              {card.badgeText && (
                                <button
                                  type="button"
                                  onClick={() => updateThisCard('badgeText', '')}
                                  className="px-2 text-xs rounded-lg bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                                  title="Remover selo"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Conditional Link Input based on linkType */}
                        {(!card.linkType || card.linkType === 'custom') && (
                          <div className="space-y-1.5 pt-1">
                            <div className="flex items-center justify-between">
                              <label className="text-[10px] text-neutral-300 font-medium">
                                Insira seu Link Personalizado (URL Completa)
                              </label>
                              <label className="flex items-center gap-1.5 text-[10px] text-neutral-400 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={card.openInNewTab !== false}
                                  onChange={(e) => updateThisCard('openInNewTab', e.target.checked)}
                                  className="accent-amber-500"
                                />
                                <span>Abrir em nova guia</span>
                              </label>
                            </div>
                            <input
                              type="url"
                              placeholder="https://seu-link-aqui.com.br"
                              value={card.url}
                              onChange={(e) => updateThisCard('url', e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-amber-500/40 focus:border-amber-400 text-amber-200 font-mono"
                            />
                          </div>
                        )}

                        {card.linkType === 'whatsapp' && (
                          <div className="space-y-1 pt-1">
                            <label className="text-[10px] text-emerald-400 font-medium block">
                              Mensagem Personalizada que o Cliente Enviará no WhatsApp ({data.profile.whatsapp})
                            </label>
                            <input
                              type="text"
                              placeholder="Olá! Gostaria de agendar um atendimento..."
                              value={card.whatsappMessage || ''}
                              onChange={(e) => updateThisCard('whatsappMessage', e.target.value)}
                              className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-emerald-500/30 text-neutral-200"
                            />
                          </div>
                        )}
                      </div>

                      {/* Row 4: Animation & Visual Style */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        <div>
                          <label className="text-[10px] font-semibold text-amber-400 block mb-1">
                            ✨ Animação para Destacar o Botão
                          </label>
                          <select
                            value={card.animation || 'none'}
                            onChange={(e) => updateThisCard('animation', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100"
                          >
                            <option value="none">Nenhuma (Apenas Zoom ao Passar Mouse)</option>
                            <option value="pulse-glow">🔥 Pulso Luminoso VIP (Glow Pulsante)</option>
                            <option value="shimmer">✨ Brilho Deslizante (Efeito Shimmer)</option>
                            <option value="float">🎈 Flutuação Suave Contínua (Float)</option>
                            <option value="shake">🔔 Chamada de Atenção (Shake Sutil)</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-neutral-300 block mb-1">
                            🎨 Estilo de Cores do Botão
                          </label>
                          <select
                            value={card.variant || 'default'}
                            onChange={(e) => updateThisCard('variant', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100"
                          >
                            <option value="default">Padrão da Paleta do Tema</option>
                            <option value="accent">Destaque Dourado / Cor de Acento</option>
                            <option value="outline">Glass Transparente com Borda Fina</option>
                            <option value="custom">Cores Exclusivas Personalizadas</option>
                          </select>
                        </div>
                      </div>

                      {/* Custom Colors Picker if variant === 'custom' */}
                      {card.variant === 'custom' && (
                        <div className="grid grid-cols-2 gap-3 p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] text-neutral-300">Cor de Fundo:</span>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="color"
                                value={card.customBg || '#e2b857'}
                                onChange={(e) => updateThisCard('customBg', e.target.value)}
                                className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                              />
                              <span className="text-[10px] font-mono text-neutral-400">{card.customBg || '#e2b857'}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] text-neutral-300">Cor do Texto:</span>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="color"
                                value={card.customText || '#0f172a'}
                                onChange={(e) => updateThisCard('customText', e.target.value)}
                                className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                              />
                              <span className="text-[10px] font-mono text-neutral-400">{card.customText || '#0f172a'}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: ALTA CONVERSÃO & ESCASSEZ (OPÇÃO 2 - PASSÍVEL DE DESATIVAR) */}
          {activeTab === 'highConversion' && (
            <div className="space-y-6">
              {/* MASTER TOGGLE FOR OPTION 2 */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-amber-600/10 to-neutral-950 border border-amber-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-amber-300">
                        Módulo de Recursos de Alta Conversão (Opção 2)
                      </h3>
                      <p className="text-[10px] text-neutral-300">
                        Ative ou desative todos os recursos de Prova Social, Timer Regressivo e Embed neste microsite.
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.highConversion?.enabled ?? true}
                      onChange={(e) =>
                        setData(p => ({
                          ...p,
                          highConversion: { ...p.highConversion, enabled: e.target.checked }
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-10 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
                  </label>
                </div>

                {!data.highConversion?.enabled && (
                  <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Recursos de Alta Conversão estão DESATIVADOS para este microsite. Nenhuma notificação de prova social ou timer aparecerá.</span>
                  </div>
                )}
              </div>

              {data.highConversion?.enabled && (
                <div className="space-y-5">
                  {/* RECURSO 1: TIMER REGRESSIVO DE ESCASSEZ */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CalendarClock className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-semibold text-neutral-200">1. Timer Regressivo de Urgência & Escassez</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={data.highConversion?.urgencyTimer?.enabled ?? true}
                        onChange={(e) =>
                          setData(p => ({
                            ...p,
                            highConversion: {
                              ...p.highConversion,
                              urgencyTimer: { ...p.highConversion.urgencyTimer, enabled: e.target.checked }
                            }
                          }))
                        }
                        className="accent-amber-500 cursor-pointer"
                      />
                    </div>

                    {data.highConversion?.urgencyTimer?.enabled && (
                      <div className="space-y-2.5 pt-1">
                        <div>
                          <label className="text-[10px] text-neutral-400 block mb-1">Título do Banner de Urgência</label>
                          <input
                            type="text"
                            value={data.highConversion?.urgencyTimer?.headline || '🔥 CONDIÇÃO ESPECIAL DE HOJE'}
                            onChange={(e) =>
                              setData(p => ({
                                ...p,
                                highConversion: {
                                  ...p.highConversion,
                                  urgencyTimer: { ...p.highConversion.urgencyTimer, headline: e.target.value }
                                }
                              }))
                            }
                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-amber-300 font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-neutral-400 block mb-1">Subtítulo Explicativo</label>
                          <input
                            type="text"
                            value={data.highConversion?.urgencyTimer?.subheadline || 'Garanta sua vaga com atendimento prioritário antes que expire:'}
                            onChange={(e) =>
                              setData(p => ({
                                ...p,
                                highConversion: {
                                  ...p.highConversion,
                                  urgencyTimer: { ...p.highConversion.urgencyTimer, subheadline: e.target.value }
                                }
                              }))
                            }
                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                          />
                        </div>

                        <div className="w-1/2">
                          <label className="text-[10px] text-neutral-400 block mb-1">Minutos de Contagem</label>
                          <input
                            type="number"
                            min="1"
                            max="120"
                            value={data.highConversion?.urgencyTimer?.minutes || 15}
                            onChange={(e) =>
                              setData(p => ({
                                ...p,
                                highConversion: {
                                  ...p.highConversion,
                                  urgencyTimer: { ...p.highConversion.urgencyTimer, minutes: Number(e.target.value) }
                                }
                              }))
                            }
                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-amber-300 font-bold font-mono"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* RECURSO 2: NOTIFICAÇÃO FLUTUANTE DE PROVA SOCIAL */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-semibold text-neutral-200">2. Notificações Flutuantes de Prova Social</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={data.highConversion?.socialProof?.enabled ?? true}
                        onChange={(e) =>
                          setData(p => ({
                            ...p,
                            highConversion: {
                              ...p.highConversion,
                              socialProof: { ...p.highConversion.socialProof, enabled: e.target.checked }
                            }
                          }))
                        }
                        className="accent-amber-500 cursor-pointer"
                      />
                    </div>

                    {data.highConversion?.socialProof?.enabled && (
                      <div className="space-y-2 pt-1">
                        <span className="text-[10px] text-neutral-400 block">
                          Agendamentos e contatos fictícios para gerar prova social em tempo real:
                        </span>
                        {data.highConversion?.socialProof?.notifications.map((notif, idx) => (
                          <div key={notif.id} className="flex items-center gap-2 bg-neutral-900 p-2 rounded-lg border border-neutral-800">
                            <span className="text-amber-400 text-xs">●</span>
                            <input
                              type="text"
                              value={notif.clientName}
                              onChange={(e) => {
                                const newNotifs = [...data.highConversion.socialProof.notifications];
                                newNotifs[idx].clientName = e.target.value;
                                setData(p => ({ ...p, highConversion: { ...p.highConversion, socialProof: { ...p.highConversion.socialProof, notifications: newNotifs } } }));
                              }}
                              placeholder="Nome"
                              className="w-24 px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-white font-bold"
                            />
                            <input
                              type="text"
                              value={notif.action}
                              onChange={(e) => {
                                const newNotifs = [...data.highConversion.socialProof.notifications];
                                newNotifs[idx].action = e.target.value;
                                setData(p => ({ ...p, highConversion: { ...p.highConversion, socialProof: { ...p.highConversion.socialProof, notifications: newNotifs } } }));
                              }}
                              placeholder="Ação"
                              className="flex-1 px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-300"
                            />
                            <input
                              type="text"
                              value={notif.timeAgo}
                              onChange={(e) => {
                                const newNotifs = [...data.highConversion.socialProof.notifications];
                                newNotifs[idx].timeAgo = e.target.value;
                                setData(p => ({ ...p, highConversion: { ...p.highConversion, socialProof: { ...p.highConversion.socialProof, notifications: newNotifs } } }));
                              }}
                              placeholder="Tempo"
                              className="w-20 px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-400 text-center"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* RECURSO 3: EMBED DE AGENDAMENTO INCORPORADO */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-semibold text-neutral-200">3. Iframe de Agendamento Incorporado (Cal.com / Typebot)</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={data.highConversion?.embeddedBooking?.enabled ?? false}
                        onChange={(e) =>
                          setData(p => ({
                            ...p,
                            highConversion: {
                              ...p.highConversion,
                              embeddedBooking: { ...p.highConversion.embeddedBooking, enabled: e.target.checked }
                            }
                          }))
                        }
                        className="accent-amber-500 cursor-pointer"
                      />
                    </div>

                    {data.highConversion?.embeddedBooking?.enabled && (
                      <div className="space-y-2 pt-1">
                        <div>
                          <label className="text-[10px] text-neutral-400 block mb-1">Título da Seção de Agendamento</label>
                          <input
                            type="text"
                            value={data.highConversion?.embeddedBooking?.title || '📅 Agendamento Direto na Agenda'}
                            onChange={(e) =>
                              setData(p => ({
                                ...p,
                                highConversion: {
                                  ...p.highConversion,
                                  embeddedBooking: { ...p.highConversion.embeddedBooking, title: e.target.value }
                                }
                              }))
                            }
                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400 block mb-1">URL do Iframe (Cal.com / Typebot / Google Forms)</label>
                          <input
                            type="text"
                            placeholder="https://cal.com/seu-usuario"
                            value={data.highConversion?.embeddedBooking?.iframeUrl || ''}
                            onChange={(e) =>
                              setData(p => ({
                                ...p,
                                highConversion: {
                                  ...p.highConversion,
                                  embeddedBooking: { ...p.highConversion.embeddedBooking, iframeUrl: e.target.value }
                                }
                              }))
                            }
                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-amber-300 font-mono"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: SEO & CARD DO WHATSAPP (OPÇÃO 4) */}
          {activeTab === 'seo' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                  <Globe className="w-4 h-4" /> Configuração do Card de Compartilhamento no WhatsApp & Redes
                </span>

                <div className="space-y-2.5 pt-1">
                  <div>
                    <label className="text-[11px] text-neutral-300 block mb-1">Título de Pré-Visualização (Meta Title)</label>
                    <input
                      type="text"
                      value={data.seo?.metaTitle || ''}
                      onChange={(e) => setData(p => ({ ...p, seo: { ...p.seo, metaTitle: e.target.value } }))}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-300 block mb-1">Descrição Curta do Link (Meta Description)</label>
                    <textarea
                      rows={2}
                      value={data.seo?.metaDescription || ''}
                      onChange={(e) => setData(p => ({ ...p, seo: { ...p.seo, metaDescription: e.target.value } }))}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 resize-none"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[11px] text-neutral-300">Foto do Card Social (OpenGraph Image)</label>
                      <label className="text-[10px] text-amber-400 hover:underline cursor-pointer flex items-center gap-1">
                        <Upload className="w-3 h-3" /> Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (base64) => setData(p => ({ ...p, seo: { ...p.seo, ogImageUrl: base64 } })))}
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={data.seo?.ogImageUrl || ''}
                      onChange={(e) => setData(p => ({ ...p, seo: { ...p.seo, ogImageUrl: e.target.value } }))}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                    />
                  </div>
                </div>
              </div>

              {/* SIMULADOR REALISTA DO CARD DO WHATSAPP */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4" /> Pré-Visualização Real de como o Link aparece no WhatsApp
                </span>
                <div className="p-3 bg-[#0b141a] rounded-2xl border border-emerald-950 max-w-sm space-y-2 shadow-xl">
                  <div className="rounded-xl overflow-hidden bg-[#1f2c34] border border-[#2a3942]">
                    <img
                      src={data.seo?.ogImageUrl || data.profile.avatarUrl}
                      alt="OpenGraph Preview"
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-2.5 space-y-1">
                      <div className="text-xs font-bold text-[#e9edef] line-clamp-1">
                        {data.seo?.metaTitle || data.profile.name}
                      </div>
                      <div className="text-[11px] text-[#8696a0] line-clamp-2">
                        {data.seo?.metaDescription || data.profile.tagline}
                      </div>
                      <div className="text-[9.5px] text-[#8696a0] font-mono uppercase tracking-wider">
                        {data.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '')}.luxebio.site
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-[#8696a0] text-right font-mono">14:30 ✓✓</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: TRACKING, PIXELS & ORIGEM DE TRÁFEGO */}
          {activeTab === 'tracking' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                  <Target className="w-4 h-4" /> Tráfego Pago & Metas de Conversão
                </span>
                <div className="space-y-2 pt-1">
                  <div>
                    <label className="text-[11px] text-neutral-300">Meta Pixel ID (Facebook / Instagram)</label>
                    <input
                      type="text"
                      placeholder="Ex: 987654321098765"
                      value={data.conversion.metaPixelId}
                      onChange={(e) => updateConversion('metaPixelId', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <span className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-emerald-400" /> Mensagem Inteligente do WhatsApp
                </span>
                <textarea
                  rows={3}
                  value={data.conversion.defaultWhatsappMsg}
                  onChange={(e) => updateConversion('defaultWhatsappMsg', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200 resize-none font-mono"
                />
                <p className="text-[10px] text-neutral-500">
                  Variáveis dinâmicas disponíveis: <code className="text-amber-400">{'{nome}'}</code>, <code className="text-amber-400">{'{servico}'}</code>, <code className="text-amber-400">{'{data}'}</code>
                </p>
              </div>

              {/* RASTREAMENTO DE ORIGEM DE TRÁFEGO (UTMs) */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" /> Origem dos Acessos & Rastreamento por UTMs
                </span>
                <p className="text-[11px] text-neutral-400">
                  Adicione <code className="text-amber-300">?utm_source=instagram</code> ou <code className="text-amber-300">?utm_source=google</code> nos seus links para rastrear exatamente de onde vêm seus clientes no Painel.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center text-xs">
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 block font-bold">📸 Instagram</span>
                    <span className="text-sm font-black text-amber-400">45%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 block font-bold">📍 Google Maps</span>
                    <span className="text-sm font-black text-emerald-400">30%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 block font-bold">🎯 Tráfego Pago</span>
                    <span className="text-sm font-black text-sky-400">20%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 block font-bold">🎵 TikTok / Outros</span>
                    <span className="text-sm font-black text-purple-400">5%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: EXPORTAÇÃO & ESTRUTURA DE HOSPEDAGEM EM PASTAS INDEPENDENTES */}
          {activeTab === 'export' && (
            <div className="space-y-5">
              {/* Card Destaque: Estrutura de Hospedagem em Pasta Independente */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-amber-500/30 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-900 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                      <FolderArchive className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-1.5">
                        Estrutura de Hospedagem em Pastas Independentes
                      </h3>
                      <p className="text-[11px] text-neutral-400">
                        Cada cliente tem sua pasta isolada no servidor com arquivos, PWA, SEO e regras de servidor.
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                    Pastas Isoladas
                  </span>
                </div>

                {/* Diagrama Visual da Árvore de Pastas */}
                <div className="p-3.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Folder className="w-3.5 h-3.5 text-amber-400" />
                      Estrutura no Servidor de Hospedagem:
                    </span>
                    <span className="font-mono text-emerald-400 text-[10px]">
                      /public_html/{currentEditingSite?.subdomain || data.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'microsite'}/
                    </span>
                  </div>

                  <pre className="p-3 rounded bg-neutral-950 border border-neutral-850 font-mono text-[10.5px] text-neutral-300 leading-relaxed overflow-x-auto">
{`public_html/
└── ${currentEditingSite?.subdomain || data.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'microsite'}/             <-- Pasta 100% independente do cliente
    ├── index.html                 <-- Microsite completo (HTML5 + CSS3 + Meta Tags + Scripts)
    ├── manifest.json              <-- PWA Manifest (Instalável no celular como aplicativo)
    ├── robots.txt                 <-- Indexação SEO para Google e buscadores
    ├── .htaccess                  <-- Regras Apache / cPanel (Rewrite URL + Gzip + Cache)
    ├── nginx.conf                 <-- Bloco de configuração para servidores Nginx
    ├── README-HOSPEDAGEM.txt      <-- Instruções passo a passo de publicação
    └── assets/
        └── site-info.json         <-- Metadados estruturados (Cliente, Contatos, Mensalidade)`}
                  </pre>
                </div>

                {/* Botões de Download do Pacote ZIP */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => downloadMicrositeDirectoryZip()}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer transition"
                    title="Baixar pacote ZIP pronto para extrair na public_html do seu servidor"
                  >
                    <FolderArchive className="w-4 h-4 text-neutral-950" />
                    <span>Baixar Pasta Deste Microsite (ZIP)</span>
                  </button>

                  <button
                    type="button"
                    onClick={downloadAllSitesDirectoryZip}
                    className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 border border-amber-500/30 hover:border-amber-400 cursor-pointer transition shadow"
                    title="Baixar todas as pastas dos clientes salvos organizadas em um único ZIP"
                  >
                    <Server className="w-4 h-4 text-amber-400" />
                    <span>Baixar Todas as Pastas ({savedSites.length} Clientes)</span>
                  </button>
                </div>

                {/* Guias Rápidos de Publicação */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1">
                    <span className="font-bold text-amber-400 block">cPanel / Hostinger</span>
                    <p className="text-[10px] text-neutral-400 leading-normal">
                      Abra o Gerenciador de Arquivos em <code className="text-neutral-300">public_html</code> e envie o ZIP. Extraia lá dentro para criar a pasta independente.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1">
                    <span className="font-bold text-emerald-400 block">Subdomínio Próprio</span>
                    <p className="text-[10px] text-neutral-400 leading-normal">
                      Crie o subdomínio apontando a raiz para <code className="text-neutral-300">public_html/{currentEditingSite?.subdomain || 'cliente'}</code>.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1">
                    <span className="font-bold text-sky-400 block">Vercel / Netlify</span>
                    <p className="text-[10px] text-neutral-400 leading-normal">
                      Arraste a pasta descompactada para o painel de deploy estático. Funciona sem backend.
                    </p>
                  </div>
                </div>
              </div>

              {/* Opções de Exportação de Código Avulso */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-amber-400" /> Código HTML Standalone (Arquivo Único)
                  </h4>
                  <span className="text-[10px] text-neutral-500">Auto-suficiente</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={copyExportCode}
                    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow cursor-pointer transition"
                  >
                    {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedCode ? 'Código Copiado!' : 'Copiar Código HTML'}</span>
                  </button>
                  <button
                    onClick={downloadHtmlFile}
                    className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-bold text-xs flex items-center justify-center gap-2 border border-neutral-700 cursor-pointer transition"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Baixar Apenas index.html</span>
                  </button>
                </div>

                <pre className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-400 max-h-[260px] overflow-auto select-all">
                  {generateExportCode()}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 8: PAINEL DE GESTÃO SAAS DOS MICROSITES */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* SaaS Metrics Summary Header */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Total Microsites</div>
                  <div className="text-xl font-black text-amber-400 tabular-nums">{savedSites.length}</div>
                  <div className="text-[9px] text-neutral-500">Páginas gerenciadas</div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Ativos x Suspensos</div>
                  <div className="text-xl font-black text-emerald-400 tabular-nums">
                    {savedSites.filter(s => s.status === 'active').length} <span className="text-xs text-neutral-500 font-normal">/ {savedSites.filter(s => s.status === 'disabled').length} desativados</span>
                  </div>
                  <div className="text-[9px] text-neutral-500">Status em tempo real</div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Taxa Média Conversão</div>
                  <div className="text-xl font-black text-emerald-300 tabular-nums flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    {(() => {
                      const totalClicks = savedSites.reduce((acc, s) => acc + (s.whatsappClicks || 0), 0);
                      const totalViews = savedSites.reduce((acc, s) => acc + (s.pageViews || 100), 0);
                      return totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0.0';
                    })()}%
                  </div>
                  <div className="text-[9px] text-neutral-500">Cliques WA / Acessos totais</div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">MRR Recorrente</div>
                  <div className="text-xl font-black text-emerald-300 tabular-nums">
                    R$ {savedSites.reduce((acc, s) => acc + (s.status !== 'disabled' ? s.monthlyFee : 0), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[9px] text-neutral-500">Faturamento mensal em dia</div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Edições Este Mês</div>
                  <div className="text-xl font-black text-amber-300 tabular-nums">
                    {savedSites.reduce((acc, s) => acc + s.updatesThisMonth, 0)} <span className="text-xs text-neutral-500 font-normal">alterações</span>
                  </div>
                  <div className="text-[9px] text-neutral-500">Histórico de edições</div>
                </div>
              </div>

              {/* SaaS Manager PIX Settings Card */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      Configuração da Chave PIX do Gestor SaaS (Recebimento de Mensalidades)
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400">PIX Ativo para Cobrança Automática</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">Chave PIX (E-mail, CPF ou CNPJ)</label>
                    <input
                      type="text"
                      value={data.saasSettings?.pixKey || ''}
                      onChange={(e) => setData(p => ({ ...p, saasSettings: { ...p.saasSettings, pixKey: e.target.value } }))}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-amber-300 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">Nome do Favorecido / Razão Social</label>
                    <input
                      type="text"
                      value={data.saasSettings?.pixName || ''}
                      onChange={(e) => setData(p => ({ ...p, saasSettings: { ...p.saasSettings, pixName: e.target.value } }))}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">Cidade do Banco</label>
                    <input
                      type="text"
                      value={data.saasSettings?.pixCity || ''}
                      onChange={(e) => setData(p => ({ ...p, saasSettings: { ...p.saasSettings, pixCity: e.target.value } }))}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                    />
                  </div>
                </div>
              </div>

              {/* Main Table Controls & Add New Button */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-900">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
                      <Server className="w-4 h-4 text-amber-400" /> Painel de Gestão dos Microsites Criados
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Controle de mensalidades, taxas de conversão de WhatsApp, vencimentos e desativação instantânea.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={downloadAllSitesDirectoryZip}
                      className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-emerald-300 font-bold text-xs flex items-center gap-1.5 border border-emerald-500/30 hover:border-emerald-400 transition cursor-pointer shadow"
                      title="Baixar pacote completo com todas as pastas independentes dos clientes organizadas para o servidor"
                    >
                      <FolderArchive className="w-3.5 h-3.5 text-emerald-400" /> ZIP Servidor Multi-Pastas
                    </button>

                    <button
                      type="button"
                      onClick={() => setPdfReportModalOpen(true)}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow transition cursor-pointer"
                      title="Gerar e exportar relatório mensal de faturamento e performance em PDF"
                    >
                      <FileText className="w-3.5 h-3.5" /> Relatório PDF Executivo
                    </button>

                    <button
                      type="button"
                      onClick={openSaveDialog}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Salvar Novo Microsite
                    </button>
                  </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <div className="relative flex-1 w-full">
                    <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Buscar por cliente, domínio ou nicho..."
                      value={dashboardSearch}
                      onChange={(e) => setDashboardSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 placeholder-neutral-500"
                    />
                  </div>

                  <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800 shrink-0 overflow-x-auto max-w-full">
                    {[
                      { id: 'all', label: 'Todos' },
                      { id: 'active', label: '🟢 Em dia' },
                      { id: 'overdue', label: '🟡 Vencidos' },
                      { id: 'disabled', label: '🛑 Desativados' },
                    ].map(f => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setDashboardStatusFilter(f.id)}
                        className={`px-2.5 py-1 rounded text-[10px] font-semibold transition cursor-pointer ${
                          dashboardStatusFilter === f.id
                            ? 'bg-amber-400 text-neutral-950 shadow'
                            : 'text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Microsites List */}
                <div className="space-y-3">
                  {savedSites
                    .filter(site => {
                      const matchesSearch =
                        !dashboardSearch ||
                        site.clientName.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
                        site.subdomain.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
                        site.customDomain.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
                        site.nicheCategory.toLowerCase().includes(dashboardSearch.toLowerCase());
                      const matchesStatus =
                        dashboardStatusFilter === 'all' ||
                        (dashboardStatusFilter === 'active' && site.status === 'active') ||
                        (dashboardStatusFilter === 'overdue' && site.status === 'overdue') ||
                        (dashboardStatusFilter === 'disabled' && site.status === 'disabled');
                      return matchesSearch && matchesStatus;
                    })
                    .map(site => {
                      const todayStr = new Date().toISOString().split('T')[0];
                      const isOverdue = site.dueDate < todayStr && site.status !== 'disabled';
                      const currentFullDomain = site.customDomain || `${site.subdomain}.luxebio.site`;
                      const clicks = site.whatsappClicks || 0;
                      const views = site.pageViews || 100;
                      const rate = Number(((clicks / views) * 100).toFixed(1));
                      const isHighRate = rate >= 15;
                      const isMedRate = rate >= 8;

                      return (
                        <div
                          key={site.id}
                          className={`p-4 rounded-xl border transition space-y-3 ${
                            site.status === 'disabled'
                              ? 'bg-neutral-950/40 border-red-900/40 opacity-75'
                              : isOverdue || site.status === 'overdue'
                              ? 'bg-amber-500/5 border-amber-500/30'
                              : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-neutral-900">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-xs text-neutral-100">{site.clientName}</span>
                                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-neutral-900 text-neutral-400 border border-neutral-800">
                                  {site.nicheCategory}
                                </span>
                                {editingSiteId === site.id && (
                                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                    Em Edição
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-[11px] text-neutral-400 flex-wrap">
                                <span className="flex items-center gap-1 text-amber-400/90 font-mono">
                                  <Globe className="w-3 h-3" />
                                  https://{currentFullDomain}
                                </span>
                                <span className="flex items-center gap-1 text-emerald-400 font-mono text-[10px] bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800" title="Diretório independente exclusivo deste microsite no servidor de hospedagem">
                                  <Folder className="w-3 h-3 text-amber-400" />
                                  /public_html/{site.subdomain}/
                                </span>
                                {site.clientPhone && (
                                  <span>· WA: {site.clientPhone}</span>
                                )}
                              </div>
                            </div>

                            {/* Status & Conversion Rate Badges */}
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border ${
                                  isHighRate
                                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                    : isMedRate
                                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                    : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                                }`}
                                title={`${clicks} cliques de WhatsApp em ${views} visualizações de página`}
                              >
                                <TrendingUp className="w-3 h-3 text-emerald-400" />
                                <span>{rate}% Conversão</span>
                              </span>

                              {site.status === 'disabled' ? (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/30 flex items-center gap-1">
                                  <Power className="w-3 h-3" /> Desativado (Atraso)
                                </span>
                              ) : isOverdue || site.status === 'overdue' ? (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3 text-amber-400" /> Mensalidade Vencida
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Em Dia & Ativo
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Data Row: Vencimento + Taxa de Conversão + Atualizações + Valor */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/80">
                            <div>
                              <span className="text-[10px] text-neutral-400 block font-medium">Vencimento Mensalidade</span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <CalendarClock className="w-3.5 h-3.5 text-amber-400" />
                                <span className={`font-mono font-bold ${isOverdue ? 'text-red-400' : 'text-neutral-200'}`}>
                                  {site.dueDate}
                                </span>
                              </div>
                            </div>

                            <div>
                              <span className="text-[10px] text-neutral-400 block font-medium">Taxa de Conversão WA</span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="font-bold text-emerald-300 font-mono">
                                  {rate}%
                                </span>
                                <span className="text-[9.5px] text-neutral-400">
                                  ({clicks} WA / {views} views)
                                </span>
                              </div>
                            </div>

                            <div>
                              <span className="text-[10px] text-neutral-400 block font-medium">Edições Este Mês</span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                                <span className="font-bold text-neutral-200">
                                  {site.updatesThisMonth} <span className="text-[10px] font-normal text-neutral-400">alterações</span>
                                </span>
                              </div>
                            </div>

                            <div>
                              <span className="text-[10px] text-neutral-400 block font-medium">Valor Mensal</span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="font-bold text-emerald-300">
                                  R$ {site.monthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} /mês
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons Row */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <button
                                type="button"
                                onClick={() => loadSiteForEditing(site)}
                                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-semibold text-[11px] flex items-center gap-1.5 cursor-pointer border border-neutral-700"
                              >
                                <Edit3 className="w-3 h-3" />
                                Editar Microsite
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedPublishSiteId(site.id);
                                  setPublishModalOpen(true);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-[11px] flex items-center gap-1.5 cursor-pointer border border-neutral-700"
                              >
                                <Globe className="w-3 h-3 text-amber-400" />
                                Domínio & DNS
                              </button>

                              <button
                                type="button"
                                onClick={() => sendWhatsappBillingReminder(site)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-semibold text-[11px] flex items-center gap-1.5 cursor-pointer border border-emerald-500/30 transition"
                                title="Enviar mensagem de cobrança formatada via WhatsApp com Chave PIX"
                              >
                                <MessageCircle className="w-3 h-3 text-emerald-400" />
                                <span>💬 Cobrança WhatsApp</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setPixModalSite(site);
                                  setPixModalOpen(true);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-semibold text-[11px] flex items-center gap-1.5 cursor-pointer border border-amber-500/30 transition"
                                title="Gerar QR Code PIX e confirmar baixa automática do pagamento"
                              >
                                <DollarSign className="w-3 h-3 text-amber-400" />
                                <span>⚡ Baixa PIX</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setSinglePdfSiteId(site.id)}
                                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-[11px] flex items-center gap-1.5 cursor-pointer border border-neutral-700 transition"
                                title="Gerar e visualizar relatório em PDF individual para este cliente"
                              >
                                <FileText className="w-3 h-3 text-amber-400" />
                                <span>Relatório PDF</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => downloadMicrositeDirectoryZip(site)}
                                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-emerald-300 font-medium text-[11px] flex items-center gap-1.5 cursor-pointer border border-emerald-500/30 hover:border-emerald-400 transition"
                                title={`Baixar pacote ZIP da pasta independente (/public_html/${site.subdomain}/) pronta para o servidor`}
                              >
                                <FolderArchive className="w-3 h-3 text-emerald-400" />
                                <span>Baixar Pasta (ZIP)</span>
                              </button>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {/* Botão de Desativação por Atraso de Pagamento */}
                              <button
                                type="button"
                                onClick={() => toggleSiteActiveStatus(site.id)}
                                title={site.status === 'disabled' ? 'Reativar microsite' : 'Desativar microsite por atraso de pagamento'}
                                className={`px-3 py-1.5 rounded-lg font-bold text-[11px] flex items-center gap-1.5 cursor-pointer transition ${
                                  site.status === 'disabled'
                                    ? 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950'
                                    : 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40'
                                }`}
                              >
                                <Power className="w-3 h-3" />
                                <span>{site.status === 'disabled' ? 'Reativar Site' : 'Desativar por Atraso'}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => deleteSavedSite(site.id)}
                                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-red-500/20 text-neutral-500 hover:text-red-400 cursor-pointer"
                                title="Excluir microsite"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ============================================================== */}
      {/* RIGHT COLUMN: SIMULADOR IPHONE MULTI-NICHO                    */}
      {/* ============================================================== */}
      <main className="flex-1 h-full bg-neutral-950 flex flex-col items-center justify-center p-4 lg:p-6 overflow-y-auto relative">
        <div
          className="absolute w-[440px] h-[440px] rounded-full blur-[140px] opacity-25 pointer-events-none transition-colors duration-700"
          style={{ background: theme.accent }}
        />

        <div className="mb-3 flex items-center justify-between w-full max-w-[385px] text-xs text-neutral-400 z-10 px-1">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-neutral-200">Simulador iPhone Pro</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={openLivePreviewTab}
              className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-300 font-bold text-[11px] flex items-center gap-1 border border-amber-500/30 hover:border-amber-400 transition cursor-pointer shadow-sm"
              title="Abrir o resultado do microsite em tela cheia numa nova aba"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Resultado</span>
            </button>

            <button
              type="button"
              onClick={() => setQrModalOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-emerald-300 font-bold text-[11px] flex items-center gap-1 border border-emerald-500/30 hover:border-emerald-400 transition cursor-pointer shadow-sm"
              title="Gerar QR Code para visualizar e testar o microsite no smartphone"
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>QR Code</span>
            </button>
          </div>
        </div>

        {/* iPhone Chassis */}
        <div className="relative w-[385px] h-[795px] max-h-[92vh] bg-black rounded-[52px] p-3 shadow-2xl shadow-black border-4 border-neutral-800 flex flex-col z-10">
          {/* Dynamic Island */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-neutral-950 rounded-full z-40 flex items-center justify-end px-3">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800 inline-block" />
          </div>

          {/* Screen Content Viewport (.wrapper alignment) */}
          <div
            key={`${data.theme}-${selectedThemeCategory}`}
            className="wrapper w-full h-full rounded-[42px] overflow-y-auto overflow-x-hidden relative transition-colors duration-500 no-scrollbar select-none anim-theme-fade flex flex-col"
            style={{
              backgroundColor: theme.bg,
              color: theme.textMain,
              fontFamily: `'${data.styling.fontFamily}', sans-serif`,
              justifyContent: data.styling.wrapperAlignment || 'flex-start',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
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
                className="relative z-20 py-2 px-3 text-center text-[10px] font-bold tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shrink-0"
                style={{ backgroundColor: theme.accent, color: '#000' }}
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
                  style={{ color: theme.accent }}
                >
                  {data.profile.title}
                </span>
                <h2
                  className="text-2xl font-bold tracking-wide leading-tight mt-1"
                  style={{ fontFamily: `'${data.styling.fontFamily}', serif` }}
                >
                  {data.profile.name}
                </h2>
                <p className="text-xs mt-1.5 line-clamp-2 leading-relaxed" style={{ color: theme.textMuted }}>
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
              <div className="mx-5 my-2 p-3 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-center space-y-1 relative z-10 shadow-lg">
                <div className="text-[10px] font-black tracking-wider text-amber-300 uppercase flex items-center justify-center gap-1">
                  <CalendarClock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>{data.highConversion.urgencyTimer.headline}</span>
                </div>
                <p className="text-[9.5px] opacity-80" style={{ color: theme.textMuted }}>
                  {data.highConversion.urgencyTimer.subheadline}
                </p>
                <div className="text-sm font-black font-mono text-amber-300 pt-0.5 tracking-widest">
                  14:52 <span className="text-[9px] font-sans text-neutral-400 font-normal">(Restante)</span>
                </div>
              </div>
            )}

            {/* CURSIVE BANNER */}
            {data.profile.cursivePhrase && (
              <div
                className="text-center px-4 py-2 text-2xl italic tracking-wide"
                style={{
                  fontFamily: `'${theme.fontScript}', cursive, serif`,
                  color: theme.textMuted,
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
                    background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}dd 100%)`,
                    color: '#000',
                    boxShadow: '0 10px 25px -4px rgba(0,0,0,0.5)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black/15 text-black flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Filter className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-black tracking-[1.5px] uppercase">
                        {data.qualifierFunnel.triggerButtonLabel}
                      </div>
                      <div className="text-[9.5px] opacity-80 line-clamp-1 mt-0.5">
                        {data.qualifierFunnel.triggerButtonSubtitle}
                      </div>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                    <ChevronRight className="w-4 h-4 text-black" />
                  </div>
                </button>
              )}

              {data.actionCards.map((card) => {
                const isBooking = card.linkType === 'booking' || card.url === '#booking';
                const isQuiz = card.linkType === 'quiz' || card.url === '#quiz';
                const isCatalogo = card.linkType === 'catalogo' || card.url === '#catalogo';
                const resolvedHref =
                  card.linkType === 'whatsapp'
                    ? `https://wa.me/${data.profile.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(card.whatsappMessage || 'Olá!')}`
                    : isCatalogo
                    ? '#catalogo'
                    : card.url;

                const animClass =
                  card.animation && card.animation !== 'none' ? `anim-${card.animation}` : '';

                let cardBgStyle = theme.cardBg;
                let cardTextStyle = theme.cardText;
                let cardSubtextStyle = theme.cardSubtext;
                let cardBorderStyle = data.styling.metallicBorders ? `1px solid ${theme.cardBorder}` : 'none';
                let iconBgStyle = theme.iconBg;
                let iconColorStyle = theme.iconColor;

                if (card.variant === 'accent') {
                  cardBgStyle = `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}dd 100%)`;
                  cardTextStyle = '#000000';
                  cardSubtextStyle = 'rgba(0,0,0,0.75)';
                  cardBorderStyle = `1px solid ${theme.accent}`;
                  iconBgStyle = 'rgba(0,0,0,0.14)';
                  iconColorStyle = '#000000';
                } else if (card.variant === 'outline') {
                  cardBgStyle = 'rgba(255,255,255,0.04)';
                  cardTextStyle = theme.textMain;
                  cardSubtextStyle = theme.textMuted;
                  cardBorderStyle = `1.5px solid ${theme.accent}`;
                  iconBgStyle = theme.socialBg;
                  iconColorStyle = theme.accent;
                } else if (card.variant === 'custom') {
                  cardBgStyle = card.customBg || theme.cardBg;
                  cardTextStyle = card.customText || theme.cardText;
                  cardSubtextStyle = (card.customText || theme.cardText) + 'cc';
                  iconBgStyle = 'rgba(0,0,0,0.15)';
                  iconColorStyle = card.customText || theme.cardText;
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
                      } px-4 py-3.5 transition-all duration-300 ease-out transform hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.985] cursor-pointer group relative ${
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
                        border: cardBorderStyle,
                        boxShadow: theme.pillShadow,
                        minHeight: `${Math.max(88, imgSize - 4)}px`,
                      }}
                    >
                      {card.badgeText && (
                        <span
                          className={`absolute -top-2.5 ${
                            isImageLeft ? 'right-3' : 'left-3'
                          } px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider shadow-md z-20`}
                          style={{
                            backgroundColor: card.variant === 'accent' ? '#000' : theme.accent,
                            color: card.variant === 'accent' ? theme.accent : '#000',
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
                              backgroundColor: 'rgba(10, 10, 10, 0.85)',
                              color: '#ffffff',
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
                    className={`cta-card w-full flex items-center justify-between p-3.5 transition-all duration-300 ease-out transform hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.985] cursor-pointer group relative overflow-hidden ${animClass}`}
                    style={{
                      borderRadius: `${data.styling.borderRadius}px`,
                      backgroundImage: cardBackgroundImage,
                      backgroundColor: cardBackgroundColor,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      color: card.bgImage ? '#ffffff' : cardTextStyle,
                      border: cardBorderStyle,
                      boxShadow: theme.pillShadow,
                    }}
                  >
                    {card.badgeText && (
                      <span
                        className="absolute top-1.5 right-3 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider shadow-sm"
                        style={{
                          backgroundColor: card.variant === 'accent' ? '#000' : theme.accent,
                          color: card.variant === 'accent' ? theme.accent : '#000',
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
                            style={{ backgroundColor: 'rgba(10,10,10,0.82)', color: '#fff' }}
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
                    background: theme.socialBg,
                    border: `1px solid ${theme.socialBorder}`,
                  }}
                >
                  <div>
                    <div className="text-sm font-bold tabular-nums" style={{ color: theme.accent }}>
                      {data.metrics.stat1Value}
                    </div>
                    <div className="text-[8px] uppercase tracking-wider mt-0.5" style={{ color: theme.textMuted }}>
                      {data.metrics.stat1Label}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold tabular-nums" style={{ color: theme.accent }}>
                      {data.metrics.stat2Value}
                    </div>
                    <div className="text-[8px] uppercase tracking-wider mt-0.5" style={{ color: theme.textMuted }}>
                      {data.metrics.stat2Label}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold tabular-nums" style={{ color: theme.accent }}>
                      {data.metrics.stat3Value}
                    </div>
                    <div className="text-[8px] uppercase tracking-wider mt-0.5" style={{ color: theme.textMuted }}>
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
                    style={{ color: theme.accent, fontFamily: `'${data.styling.fontFamily}', serif` }}
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
                        background: theme.socialBg,
                        border: `1px solid ${theme.socialBorder}`
                      }}
                    >
                      <div
                        className="text-2xl font-bold leading-none tabular-nums"
                        style={{ color: theme.accent, fontFamily: `'${data.styling.fontFamily}', serif` }}
                      >
                        {st.number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold">{st.title}</div>
                        <div className="text-[10px] mt-0.5" style={{ color: theme.textMuted }}>{st.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MÓDULO: GALERIA DE FOTOS & PORTFÓLIO DE RESULTADOS */}
            {data.studentGrid?.enabled && data.studentGrid.photos?.length > 0 && (() => {
              const photos = data.studentGrid.photos;
              const layout = data.studentGrid.layout || 'grid3';
              const aspect = data.studentGrid.aspectRatio || 'square';
              const aspectClass =
                aspect === 'portrait'
                  ? 'aspect-[4/5]'
                  : aspect === 'landscape'
                  ? 'aspect-[4/3]'
                  : 'aspect-square';

              return (
                <div className="px-5 py-4 space-y-2.5 relative z-10" id="galeria">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      {data.studentGrid.badge && (
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider mb-1"
                          style={{
                            background: `${theme.accent}18`,
                            color: theme.accent,
                            border: `1px solid ${theme.accent}40`,
                          }}
                        >
                          {data.studentGrid.badge}
                        </span>
                      )}
                      <div className="flex items-center gap-2">
                        <h3
                          className="text-sm font-semibold tracking-wider uppercase"
                          style={{ color: theme.accent, fontFamily: `'${data.styling.fontFamily}', serif` }}
                        >
                          {data.studentGrid.headline}
                        </h3>
                        <div className="flex-1 h-px bg-neutral-800/30" />
                      </div>
                      {data.studentGrid.subtitle && (
                        <p className="text-[10px] mt-0.5" style={{ color: theme.textMuted }}>
                          {data.studentGrid.subtitle}
                        </p>
                      )}
                    </div>
                    <span className="text-[8.5px] font-mono px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 shrink-0 mt-0.5">
                      {photos.length} fotos
                    </span>
                  </div>

                  {/* Layout: Grid 2 Colunas */}
                  {layout === 'grid2' && (
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      {photos.map((p, idx) => (
                        <div
                          key={idx}
                          onClick={() => data.studentGrid.enableLightbox !== false && setLightboxIndex(idx)}
                          className={`relative group overflow-hidden rounded-2xl cursor-pointer ${aspectClass} border transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm`}
                          style={{ borderColor: theme.socialBorder, backgroundColor: '#000' }}
                        >
                          <SimulatorImage
                            src={p}
                            alt={`Foto ${idx + 1}`}
                            referrerPolicy="no-referrer"
                            accentColor={theme.accent}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                            <Maximize2 className="w-5 h-5 text-white drop-shadow" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Layout: Grid 3 Colunas (Clássico) */}
                  {layout === 'grid3' && (
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {photos.map((p, idx) => (
                        <div
                          key={idx}
                          onClick={() => data.studentGrid.enableLightbox !== false && setLightboxIndex(idx)}
                          className={`relative group overflow-hidden rounded-xl cursor-pointer ${aspectClass} border transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-sm`}
                          style={{ borderColor: theme.socialBorder, backgroundColor: '#000' }}
                        >
                          <SimulatorImage
                            src={p}
                            alt={`Foto ${idx + 1}`}
                            referrerPolicy="no-referrer"
                            accentColor={theme.accent}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                            <Maximize2 className="w-4 h-4 text-white drop-shadow" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Layout: Mosaico Editorial */}
                  {layout === 'mosaic' && (
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {photos.map((p, idx) => {
                        const isHero = idx === 0;
                        return (
                          <div
                            key={idx}
                            onClick={() => data.studentGrid.enableLightbox !== false && setLightboxIndex(idx)}
                            className={`relative group overflow-hidden rounded-2xl cursor-pointer border transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm ${
                              isHero ? 'col-span-2 row-span-2 aspect-square' : aspectClass
                            }`}
                            style={{ borderColor: theme.socialBorder, backgroundColor: '#000' }}
                          >
                            <SimulatorImage
                              src={p}
                              alt={`Foto ${idx + 1}`}
                              referrerPolicy="no-referrer"
                              accentColor={theme.accent}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {isHero && (
                              <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-black/75 text-amber-300 border border-amber-500/30 backdrop-blur shadow z-20">
                                Destaque
                              </span>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                              <Maximize2 className="w-5 h-5 text-white drop-shadow" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Layout: Carrossel Horizontal com Snap */}
                  {layout === 'carousel' && (
                    <div className="relative pt-1">
                      <div className="flex gap-2.5 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar -mx-5 px-5 scroll-smooth">
                        {photos.map((p, idx) => (
                          <div
                            key={idx}
                            onClick={() => data.studentGrid.enableLightbox !== false && setLightboxIndex(idx)}
                            className={`relative group flex-shrink-0 snap-center overflow-hidden rounded-2xl cursor-pointer border transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm ${
                              aspect === 'portrait'
                                ? 'w-[155px] aspect-[4/5]'
                                : aspect === 'landscape'
                                ? 'w-[190px] aspect-[4/3]'
                                : 'w-[155px] aspect-square'
                            }`}
                            style={{ borderColor: theme.socialBorder, backgroundColor: '#000' }}
                          >
                            <SimulatorImage
                              src={p}
                              alt={`Foto ${idx + 1}`}
                              referrerPolicy="no-referrer"
                              accentColor={theme.accent}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                              <Maximize2 className="w-5 h-5 text-white drop-shadow" />
                            </div>
                          </div>
                        ))}
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
                    style={{ color: theme.accent, fontFamily: `'${data.styling.fontFamily}', serif` }}
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

            {/* CARD DE LOCALIZAÇÃO (MAPS) */}
            {data.locationCard.enabled && (
              <div className="px-5 py-2 relative z-10">
                <a
                  href={data.locationCard.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 flex items-center justify-between rounded-2xl group transition"
                  style={{
                    background: theme.socialBg,
                    border: `1px solid ${theme.socialBorder}`
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: theme.iconBg, color: theme.iconColor }}
                    >
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase">{data.locationCard.headline}</div>
                      <div className="text-[10px] mt-0.5 line-clamp-1" style={{ color: theme.textMuted }}>
                        {data.locationCard.address}
                      </div>
                    </div>
                  </div>
                  <Navigation className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition" />
                </a>
              </div>
            )}

            {/* CATALOG OF SERVICES */}
            {data.services.enabled && data.services.items.length > 0 && (() => {
              const srvLayout = data.services.layout || 'list';
              const handleServiceAction = (srv: (typeof data.services.items)[0]) => {
                recordWhatsappClick();
                if (srv.actionType === 'whatsapp') {
                  const msg = `Olá ${data.profile.name}! Tenho interesse em "${srv.name}" (${srv.price}). Gostaria de verificar a disponibilidade!`;
                  const url = `https://wa.me/${data.profile.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
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
                          backgroundColor: `${theme.accent}18`,
                          color: theme.accent,
                          border: `1px solid ${theme.accent}40`,
                        }}
                      >
                        {data.services.badge}
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      <h3
                        className="text-sm font-semibold tracking-wider uppercase"
                        style={{ color: theme.accent, fontFamily: `'${data.styling.fontFamily}', serif` }}
                      >
                        {data.services.headline}
                      </h3>
                      <div className="flex-1 h-px bg-neutral-800/30" />
                    </div>
                    {data.services.subtitle && (
                      <p className="text-[10px] leading-relaxed" style={{ color: theme.textMuted }}>
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
                            backgroundColor: data.styling.glassmorphism ? 'rgba(255,255,255,0.04)' : theme.socialBg,
                            border: srv.featured ? `1.5px solid ${theme.accent}` : `1px solid ${theme.socialBorder}`,
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
                                style={{ backgroundColor: theme.accent, color: '#000' }}
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
                            <div className="text-xs font-bold leading-snug">{srv.name}</div>
                            <div className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>
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
                                    style={{ color: theme.textMuted }}
                                  >
                                    {srv.oldPrice}
                                  </span>
                                )}
                                <span className="text-sm font-extrabold tabular-nums" style={{ color: theme.accent }}>
                                  {srv.price}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleServiceAction(srv)}
                                className="px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full transition hover:scale-105 cursor-pointer shadow"
                                style={{ backgroundColor: theme.accent, color: '#000' }}
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
                            backgroundColor: data.styling.glassmorphism ? 'rgba(255,255,255,0.04)' : theme.socialBg,
                            border: srv.featured ? `1.5px solid ${theme.accent}` : `1px solid ${theme.socialBorder}`,
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
                                  style={{ backgroundColor: theme.accent, color: '#000' }}
                                >
                                  {srv.badge}
                                </span>
                              )}
                            </div>
                            <div className="p-2.5 space-y-1">
                              <div className="text-[11px] font-bold leading-tight line-clamp-2">{srv.name}</div>
                              {srv.duration && (
                                <div className="text-[8.5px] font-medium" style={{ color: theme.textMuted }}>
                                  ⏱ {srv.duration}
                                </div>
                              )}
                              <div className="text-[9.5px] leading-snug line-clamp-2" style={{ color: theme.textMuted }}>
                                {srv.description}
                              </div>
                            </div>
                          </div>
                          <div className="px-2.5 pb-2.5 pt-1 space-y-1.5">
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                              {srv.oldPrice && (
                                <span className="text-[8.5px] line-through opacity-70" style={{ color: theme.textMuted }}>
                                  {srv.oldPrice}
                                </span>
                              )}
                              <span className="text-xs font-extrabold tabular-nums" style={{ color: theme.accent }}>
                                {srv.price}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleServiceAction(srv)}
                              className="w-full py-1.5 text-[9.5px] font-extrabold uppercase tracking-wider rounded-lg transition hover:scale-[1.02] cursor-pointer"
                              style={{ backgroundColor: theme.accent, color: '#000' }}
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
                            backgroundColor: data.styling.glassmorphism ? 'rgba(255,255,255,0.03)' : 'transparent',
                            border: srv.featured ? `1.5px solid ${theme.accent}` : `1px solid ${theme.socialBorder}`,
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
                                  style={{ backgroundColor: theme.accent, color: '#000' }}
                                >
                                  {srv.badge}
                                </span>
                              )}
                              {srv.duration && (
                                <span className="text-[9px] font-medium" style={{ color: theme.textMuted }}>
                                  ⏱ {srv.duration}
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-bold truncate">{srv.name}</div>
                            <div className="text-[10px] leading-tight line-clamp-2 mt-0.5" style={{ color: theme.textMuted }}>
                              {srv.description}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-baseline gap-1.5">
                                {srv.oldPrice && (
                                  <span className="text-[9px] line-through opacity-70" style={{ color: theme.textMuted }}>
                                    {srv.oldPrice}
                                  </span>
                                )}
                                <span className="text-xs font-extrabold tabular-nums" style={{ color: theme.accent }}>
                                  {srv.price}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleServiceAction(srv)}
                                className="px-2.5 py-1 text-[10px] font-bold rounded-full transition hover:scale-105 cursor-pointer"
                                style={{ backgroundColor: theme.accent, color: '#000' }}
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
                    style={{ color: theme.accent, fontFamily: `'${data.styling.fontFamily}', serif` }}
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
                        background: theme.socialBg,
                        border: `1px solid ${theme.socialBorder}`,
                      }}
                    >
                      <div className="flex text-amber-400">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-[11px] leading-relaxed italic" style={{ color: theme.textMuted }}>
                        "{t.text}"
                      </p>
                      <div className="text-[10px] font-bold">
                        {t.clientName} <span className="opacity-60 font-normal">· {t.city}</span>
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
                    style={{ color: theme.accent, fontFamily: `'${data.styling.fontFamily}', serif` }}
                  >
                    {data.aboutMe.headline}
                  </h3>
                  <div className="flex-1 h-px bg-neutral-800/30" />
                </div>

                {data.profile.aboutPhotoUrl && (
                  <div className="relative w-full h-40 rounded-2xl overflow-hidden shadow bg-black">
                    <SimulatorImage
                      src={data.profile.aboutPhotoUrl}
                      alt="Sobre"
                      referrerPolicy="no-referrer"
                      accentColor={theme.accent}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <p className="text-xs leading-relaxed text-justify" style={{ color: theme.textMuted }}>
                  {data.aboutMe.paragraph}
                </p>

                {data.aboutMe.closingPhrase && (
                  <div
                    className="text-center text-xl italic pt-1"
                    style={{ fontFamily: `'${theme.fontScript}', cursive, serif`, color: theme.accent }}
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
                    style={{ color: theme.accent, fontFamily: `'${data.styling.fontFamily}', serif` }}
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
                          background: theme.socialBg,
                          border: `1px solid ${theme.socialBorder}`,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setActiveFaqId(isOpen ? null : item.id)}
                          className="w-full p-3 text-left flex items-center justify-between gap-2 text-xs font-semibold cursor-pointer"
                        >
                          <span>{item.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            style={{ color: theme.accent }}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-3 pb-3 text-[11px] leading-relaxed" style={{ color: theme.textMuted }}>
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
            <div className="py-6 px-4 text-center relative z-10">
              <p className="text-[10px] tracking-wider opacity-70" style={{ color: theme.textMuted }}>
                © {new Date().getFullYear()} {data.profile.name}. Todos os direitos reservados.
              </p>
              <p className="text-[9px] mt-1 text-amber-400 font-mono">
                Criado com LuxeBio Studio Pro
              </p>
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
                                setQuizAnswers(prev => ({ ...prev, [currentQId]: option }));
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
      </main>

      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-[100] px-4 py-3 rounded-xl bg-neutral-900 border border-amber-500/40 text-neutral-100 font-semibold text-xs shadow-2xl flex items-center gap-2.5 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Save Microsite Modal */}
      {saveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4 text-neutral-100 shadow-2xl">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <h3 className="font-bold text-sm text-neutral-100 flex items-center gap-2">
                <Save className="w-4 h-4 text-emerald-400" />
                {editingSiteId ? 'Salvar Microsite no Painel' : 'Registrar Novo Microsite'}
              </h3>
              <button
                type="button"
                onClick={() => setSaveModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-neutral-400 block mb-1">Nome do Cliente / Empresa</label>
                <input
                  type="text"
                  placeholder="Ex: Don Corleone Barber Club"
                  value={saveForm.clientName}
                  onChange={(e) => setSaveForm(f => ({ ...f, clientName: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">WhatsApp do Cliente</label>
                  <input
                    type="text"
                    placeholder="5511999999999"
                    value={saveForm.clientPhone}
                    onChange={(e) => setSaveForm(f => ({ ...f, clientPhone: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">Mensalidade (R$)</label>
                  <input
                    type="text"
                    placeholder="149,90"
                    value={saveForm.monthlyFee}
                    onChange={(e) => setSaveForm(f => ({ ...f, monthlyFee: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-emerald-300 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-neutral-400 block mb-1">Subdomínio Grátis (.luxebio.site)</label>
                <div className="flex items-center rounded-xl bg-neutral-950 border border-neutral-800 overflow-hidden">
                  <input
                    type="text"
                    placeholder="meucliente"
                    value={saveForm.subdomain}
                    onChange={(e) => setSaveForm(f => ({ ...f, subdomain: e.target.value }))}
                    className="flex-1 px-3 py-2 bg-transparent text-amber-300 font-mono text-xs focus:outline-none"
                  />
                  <span className="px-2.5 text-[10px] text-neutral-500 font-mono">.luxebio.site</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-neutral-400 block mb-1">Domínio Próprio (Opcional)</label>
                <input
                  type="text"
                  placeholder="www.meucliente.com.br"
                  value={saveForm.customDomain}
                  onChange={(e) => setSaveForm(f => ({ ...f, customDomain: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 font-mono"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => handleSaveMicrosite(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs shadow cursor-pointer transition flex items-center justify-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>{editingSiteId ? 'Salvar Alterações no Microsite Atual' : 'Salvar Microsite no Painel'}</span>
              </button>

              {editingSiteId && (
                <button
                  type="button"
                  onClick={() => handleSaveMicrosite(true)}
                  className="w-full py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs cursor-pointer transition border border-neutral-700"
                >
                  Salvar como NOVO Microsite Independente
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Publish & Domain Settings Modal */}
      {publishModalOpen && (() => {
        const targetSite = savedSites.find(s => s.id === selectedPublishSiteId) || savedSites[0] || {
          id: 'temp',
          subdomain: data.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          customDomain: '',
          clientName: data.profile.name
        };

        return (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5 text-neutral-100 shadow-2xl">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                <div>
                  <h3 className="font-bold text-sm text-neutral-100 flex items-center gap-2">
                    <Globe className="w-4.5 h-4.5 text-amber-400" />
                    Publicar com Subdomínio ou Domínio Próprio
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Configuração DNS e SSL automático para {targetSite.clientName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPublishModalOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Subdomain Option */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Opção 1: Subdomínio Grátis LuxeBio (SSL Ativo)
                </span>
                <div className="flex items-center rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden">
                  <input
                    type="text"
                    value={targetSite.subdomain || 'meusite'}
                    onChange={(e) => {
                      const updated = savedSites.map(s => s.id === targetSite.id ? { ...s, subdomain: e.target.value } : s);
                      setSavedSites(updated);
                    }}
                    className="flex-1 px-3 py-2 bg-transparent text-amber-300 font-mono text-xs focus:outline-none"
                  />
                  <span className="px-3 text-xs text-neutral-400 font-mono border-l border-neutral-800">
                    .luxebio.site
                  </span>
                </div>
                <p className="text-[10px] text-neutral-500">
                  Link público instantâneo: <code className="text-amber-400">https://{targetSite.subdomain || 'meusite'}.luxebio.site</code>
                </p>
              </div>

              {/* Custom Domain Option */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <span className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                  <Server className="w-4 h-4 text-amber-400" />
                  Opção 2: Domínio Próprio Customizado (.com.br / .com)
                </span>
                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">Insira seu Domínio Registrado</label>
                  <input
                    type="text"
                    placeholder="Ex: www.doncorleonebarber.com.br"
                    value={targetSite.customDomain || ''}
                    onChange={(e) => {
                      const updated = savedSites.map(s => s.id === targetSite.id ? { ...s, customDomain: e.target.value } : s);
                      setSavedSites(updated);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-100 font-mono"
                  />
                </div>

                {/* DNS Instructions */}
                <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800/80 text-[10px] space-y-1.5">
                  <span className="font-bold text-amber-400 block">Apontamentos DNS no seu Registro.br / GoDaddy:</span>
                  <div className="grid grid-cols-3 gap-1 font-mono text-[9.5px] text-neutral-300 bg-neutral-950 p-2 rounded">
                    <div>Tipo: <span className="text-amber-300">A</span></div>
                    <div>Nome: <span className="text-amber-300">@</span></div>
                    <div>Valor: <span className="text-emerald-400">76.76.21.21</span></div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 font-mono text-[9.5px] text-neutral-300 bg-neutral-950 p-2 rounded">
                    <div>Tipo: <span className="text-amber-300">CNAME</span></div>
                    <div>Nome: <span className="text-amber-300">www</span></div>
                    <div>Valor: <span className="text-emerald-400">cname.luxebio.site</span></div>
                  </div>
                </div>
              </div>

              {/* Independent Folder & Vercel Hosting Option */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-emerald-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <FolderArchive className="w-4 h-4 text-emerald-400" />
                    Opção 3: Deploy na Vercel ou Hospedagem em Pasta Independente
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                    VERCEL READY
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-normal">
                  O sistema já conta com <code className="text-amber-300">vercel.json</code> e rotas Serverless (<code className="text-amber-300">/api/*</code>) na raiz para deploy do construtor SaaS na Vercel, além de exportar cada microsite com <code className="text-emerald-300">vercel.json</code>, <code className="text-emerald-300">index.html</code>, <code className="text-emerald-300">manifest.json</code>, <code className="text-emerald-300">.htaccess</code> e <code className="text-emerald-300">nginx.conf</code>.
                </p>
                <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 space-y-1 font-mono">
                  <div className="text-amber-400 font-sans font-bold">Checklist de Deploy na Vercel:</div>
                  <div>1. Build Command: <span className="text-emerald-400">npm run build</span> | Output: <span className="text-emerald-400">dist</span></div>
                  <div>2. Environment Variable: <span className="text-amber-300">GEMINI_API_KEY</span> (para IA geradora)</div>
                </div>
                <button
                  type="button"
                  onClick={() => downloadMicrositeDirectoryZip(targetSite)}
                  className="w-full py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 border border-emerald-500/40 hover:border-emerald-400 transition cursor-pointer"
                >
                  <FolderArchive className="w-4 h-4 text-emerald-400" />
                  <span>Baixar Pacote ZIP (Vercel / cPanel) '/{targetSite.subdomain || 'meusite'}/'</span>
                </button>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setDnsTesting(true);
                    setTimeout(() => {
                      setDnsTesting(false);
                      showToast(`🟢 Apontamento DNS e SSL verificados para ${targetSite.customDomain || targetSite.subdomain + '.luxebio.site'}!`);
                    }, 1200);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs flex items-center gap-1.5 cursor-pointer border border-neutral-700"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${dnsTesting ? 'animate-spin text-amber-400' : ''}`} />
                  <span>{dnsTesting ? 'Testando Conexão...' : 'Testar Conexão DNS'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    try { localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(savedSites)); } catch {}
                    showToast(`🚀 Microsite publicado com sucesso!`);
                    setPublishModalOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer transition"
                >
                  <Check className="w-4 h-4" />
                  <span>Salvar & Publicar</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Executive PDF Performance & Financial Summary Modal */}
      {pdfReportModalOpen && (() => {
        const todayStr = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
        const totalMrr = savedSites.reduce((acc, s) => acc + (s.status !== 'disabled' ? s.monthlyFee : 0), 0);
        const totalClicks = savedSites.reduce((acc, s) => acc + (s.whatsappClicks || 0), 0);
        const totalViews = savedSites.reduce((acc, s) => acc + (s.pageViews || 100), 0);
        const avgConversion = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0.0';
        const totalUpdates = savedSites.reduce((acc, s) => acc + s.updatesThisMonth, 0);

        return (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5 text-neutral-100 shadow-2xl my-8 max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-neutral-800 pb-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-neutral-100">
                        Relatório Executivo Mensal — Performance & Financeiro
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                        PDF READY
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Resumo consolidado para prestação de contas mensal e envio aos clientes · Emitido em {todayStr}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPdfReportModalOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Printable Document Preview Container */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {/* Summary Metrics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Microsites</span>
                    <div className="text-lg font-black text-amber-400">{savedSites.length} páginas</div>
                    <span className="text-[9px] text-neutral-500">{savedSites.filter(s => s.status === 'active').length} ativas</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Receita MRR</span>
                    <div className="text-lg font-black text-emerald-400">
                      R$ {totalMrr.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <span className="text-[9px] text-neutral-500">Recorrente mensal</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Conversão Média</span>
                    <div className="text-lg font-black text-emerald-300 font-mono">{avgConversion}%</div>
                    <span className="text-[9px] text-neutral-500">{totalClicks} cliques / {totalViews} views</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Edições Este Mês</span>
                    <div className="text-lg font-black text-amber-300">{totalUpdates} edições</div>
                    <span className="text-[9px] text-neutral-500">Alterações no período</span>
                  </div>
                </div>

                {/* Table Preview */}
                <div className="rounded-xl border border-neutral-800 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-950 text-neutral-400 uppercase text-[10px] border-b border-neutral-800">
                      <tr>
                        <th className="p-3">Cliente / Empresa</th>
                        <th className="p-3">Domínio Ativo</th>
                        <th className="p-3 text-center">Status</th>
                        <th className="p-3 text-center">Vencimento</th>
                        <th className="p-3 text-center">Conversão WA</th>
                        <th className="p-3 text-right">Mensalidade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/80 bg-neutral-900/50">
                      {savedSites.map(s => {
                        const clicks = s.whatsappClicks || 0;
                        const views = s.pageViews || 100;
                        const rate = ((clicks / views) * 100).toFixed(1);
                        const domain = s.customDomain || `${s.subdomain}.luxebio.site`;

                        return (
                          <tr key={s.id} className="hover:bg-neutral-800/50 transition">
                            <td className="p-3">
                              <div className="font-bold text-neutral-100">{s.clientName}</div>
                              <div className="text-[10px] text-neutral-400">{s.nicheCategory}</div>
                            </td>
                            <td className="p-3 font-mono text-[11px] text-amber-400/90">
                              https://{domain}
                            </td>
                            <td className="p-3 text-center">
                              {s.status === 'disabled' ? (
                                <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-red-500/15 text-red-400 border border-red-500/30">
                                  Desativado
                                </span>
                              ) : s.status === 'overdue' ? (
                                <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                  Vencido
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                  Em Dia
                                </span>
                              )}
                            </td>
                            <td className="p-3 text-center font-mono text-neutral-300">{s.dueDate}</td>
                            <td className="p-3 text-center font-mono font-bold text-emerald-300">
                              {rate}% <span className="text-[10px] font-normal text-neutral-400">({clicks}/{views})</span>
                            </td>
                            <td className="p-3 text-right font-bold text-emerald-300">
                              R$ {s.monthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={copyWhatsappExecutiveSummary}
                  className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-semibold text-xs flex items-center gap-1.5 cursor-pointer border border-neutral-700 transition"
                >
                  {copiedPdfSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
                  <span>{copiedPdfSummary ? 'Resumo Copiado!' : 'Copiar Resumo para WhatsApp'}</span>
                </button>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={downloadPdfReportHtml}
                    className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-neutral-700 transition"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Baixar Relatório HTML</span>
                  </button>

                  <button
                    type="button"
                    onClick={printPdfReport}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer transition"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimir / Salvar em PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Individual Client Executive PDF Performance & Financial Modal */}
      {singlePdfSiteId && (() => {
        const site = savedSites.find(s => s.id === singlePdfSiteId);
        if (!site) return null;

        const todayStr = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
        const clicks = site.whatsappClicks || 0;
        const views = site.pageViews || 100;
        const rate = Number(((clicks / views) * 100).toFixed(1));
        const domain = site.customDomain || `${site.subdomain}.luxebio.site`;

        return (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5 text-neutral-100 shadow-2xl my-8 max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-neutral-800 pb-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-neutral-100">
                        Relatório Individual — {site.clientName}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                        PDF CLIENTE
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Resumo individual de performance e cobrança mensal · Emitido em {todayStr}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSinglePdfSiteId(null)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Printable Document Preview Container */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {/* Summary Metrics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Conversão WA</span>
                    <div className="text-lg font-black text-emerald-400 font-mono">{rate}%</div>
                    <span className="text-[9px] text-neutral-500">{clicks} cliques / {views} views</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Mensalidade</span>
                    <div className="text-lg font-black text-amber-300">
                      R$ {site.monthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <span className="text-[9px] text-neutral-500">Recorrente mensal</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Vencimento</span>
                    <div className="text-base font-black text-neutral-200 font-mono">{site.dueDate}</div>
                    <span className="text-[9px] text-neutral-500">
                      {site.status === 'disabled' ? 'Desativado' : site.status === 'overdue' ? 'Vencido' : 'Em Dia'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Edições no Mês</span>
                    <div className="text-lg font-black text-amber-400">{site.updatesThisMonth} edições</div>
                    <span className="text-[9px] text-neutral-500">Última: {site.lastUpdated}</span>
                  </div>
                </div>

                {/* Details Card */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
                  <span className="font-bold text-amber-400 uppercase text-[11px] block border-b border-neutral-800 pb-2">
                    Ficha Técnica do Cliente & Microsite
                  </span>
                  <div className="grid grid-cols-2 gap-3 text-neutral-300">
                    <div>
                      <span className="text-[10px] text-neutral-500 block">Razão Social / Cliente:</span>
                      <span className="font-bold text-neutral-100">{site.clientName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 block">Nicho de Mercado:</span>
                      <span className="text-neutral-200">{site.nicheCategory}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[10px] text-neutral-500 block">Endereço do Site (URL):</span>
                      <span className="font-mono text-amber-400">https://{domain}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 block">WhatsApp de Contato:</span>
                      <span>{site.clientPhone || 'Não informado'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 block">E-mail Cadastrado:</span>
                      <span>{site.clientEmail || 'Não informado'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => copySingleWhatsappSummary(site)}
                  className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-semibold text-xs flex items-center gap-1.5 cursor-pointer border border-neutral-700 transition"
                >
                  {copiedSinglePdfSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
                  <span>{copiedSinglePdfSummary ? 'Resumo Copiado!' : 'Copiar Resumo para WhatsApp'}</span>
                </button>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => downloadSinglePdfReportHtml(site)}
                    className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-neutral-700 transition"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Baixar HTML Individual</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => printSinglePdfReport(site)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer transition"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimir / Salvar em PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* AI Microsite Generator Modal (Instagram & Google Meu Negócio) */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-neutral-900 border border-amber-500/40 rounded-2xl p-6 space-y-5 text-neutral-100 shadow-2xl relative">
            <div className="flex justify-between items-start border-b border-neutral-800 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 flex items-center justify-center text-neutral-950 font-bold shrink-0 shadow-lg shadow-amber-500/20">
                  <Sparkles className="w-5 h-5 fill-neutral-950" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-neutral-100 flex items-center gap-2">
                    Gerador de Microsite com IA
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Criação automática usando Instagram e Google Meu Negócio
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={aiGenerating}
                onClick={() => setAiModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer disabled:opacity-40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {aiGenerating ? (
              <div className="py-8 text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin" />
                  <Sparkles className="w-7 h-7 text-amber-400 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-neutral-100 animate-pulse">
                    {aiStepIndex === 0
                      ? '1/3 · Buscando foto de perfil, bio e posts no Instagram...'
                      : aiStepIndex === 1
                      ? '2/3 · Extraindo endereço, avaliações e fotos do Google Meu Negócio...'
                      : '3/3 · Criando microsite personalizado com IA e aplicando imagens...'}
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                    A IA está coletando os dados reais e as imagens públicas do perfil informado para montar o cabeçalho, portfólio, localização e catálogo.
                  </p>
                  <div className="max-w-xs mx-auto pt-2 space-y-1.5 text-left">
                    <div className={`flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-lg border ${aiStepIndex >= 0 ? 'bg-pink-500/10 border-pink-500/30 text-pink-300' : 'bg-neutral-900 border-neutral-800 text-neutral-500'}`}>
                      <Instagram className="w-3.5 h-3.5 shrink-0" />
                      <span>Extração do Instagram (@{(aiForm.instagram || 'perfil').replace('@', '')})</span>
                    </div>
                    <div className={`flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-lg border ${aiStepIndex >= 1 ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-neutral-900 border-neutral-800 text-neutral-500'}`}>
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>Extração do Google Meu Negócio / Maps</span>
                    </div>
                    <div className={`flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-lg border ${aiStepIndex >= 2 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-neutral-900 border-neutral-800 text-neutral-500'}`}>
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>Geração de Copy, Paleta VIP e Galeria de Fotos</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3.5 text-xs">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200/90 text-[11px] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    A IA busca automaticamente a <strong>foto de perfil, fotos de posts, bio, endereço e nota</strong> do Instagram e do Google Meu Negócio informados.
                  </span>
                </div>

                {aiError && (
                  <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{aiError}</span>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-semibold text-neutral-300 block mb-1 flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                    Instagram do Cliente (@usuario)
                  </label>
                  <div className="flex items-center rounded-xl bg-neutral-950 border border-neutral-800 overflow-hidden focus-within:border-amber-500">
                    <span className="px-3 text-neutral-500 font-mono text-xs">@</span>
                    <input
                      type="text"
                      placeholder="ex: lorrayne_ramos ou barbeariadoncorleone"
                      value={aiForm.instagram}
                      onChange={(e) => {
                        setAiError(null);
                        setAiForm(f => ({ ...f, instagram: e.target.value }));
                      }}
                      className="flex-1 py-2 pr-3 bg-transparent text-neutral-100 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-neutral-300 block mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Link do Google Meu Negócio / Maps (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="https://maps.app.goo.gl/... ou endereço do negócio"
                    value={aiForm.googleMaps}
                    onChange={(e) => setAiForm(f => ({ ...f, googleMaps: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">Nome do Negócio / Profissional</label>
                    <input
                      type="text"
                      placeholder="Ex: Studio Lorrayne Ramos"
                      value={aiForm.businessName}
                      onChange={(e) => {
                        setAiError(null);
                        setAiForm(f => ({ ...f, businessName: e.target.value }));
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">Nicho / Especialidade</label>
                    <input
                      type="text"
                      placeholder="Ex: Extensão de cílios e nail designer"
                      value={aiForm.businessNiche}
                      onChange={(e) => {
                        setAiError(null);
                        setAiForm(f => ({ ...f, businessNiche: e.target.value }));
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">
                    Informações Adicionais / Serviços Principais / Diferenciais (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ex: Especialista em volume brasileiro, fox eyes e alongamento em fibra de vidro. Atendimento com hora marcada..."
                    value={aiForm.additionalInfo}
                    onChange={(e) => setAiForm(f => ({ ...f, additionalInfo: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAiGenerateMicrosite}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:brightness-110 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 cursor-pointer transition mt-2"
                >
                  <Sparkles className="w-4 h-4 fill-neutral-950" />
                  <span>Gerar Microsite Completo com IA</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL DE BAIXA PIX / LIQUIDAÇÃO DE MENSALIDADE */}
      {pixModalOpen && pixModalSite && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-900 border border-emerald-500/40 rounded-2xl p-6 space-y-4 text-neutral-100 shadow-2xl">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-neutral-100">
                    Liquidação PIX — {pixModalSite.clientName}
                  </h3>
                  <p className="text-[10px] text-neutral-400">Mensalidade: R$ {pixModalSite.monthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPixModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs bg-neutral-950 p-4 rounded-xl border border-neutral-800">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-neutral-400">Chave PIX do Gestor:</span>
                <span className="font-mono font-bold text-amber-300">{data.saasSettings?.pixKey || 'contato@luxebio.com.br'}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-neutral-400">Favorecido:</span>
                <span className="font-semibold text-neutral-200">{data.saasSettings?.pixName || 'LuxeBio Studio SaaS'}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-neutral-400">Valor a Receber:</span>
                <span className="font-bold text-emerald-400 text-sm">R$ {pixModalSite.monthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>

              {/* QR CODE SIMULATION */}
              <div className="pt-2 flex flex-col items-center justify-center space-y-2">
                <div className="p-3 bg-white rounded-xl shadow-lg">
                  <div className="w-32 h-32 bg-neutral-950 flex items-center justify-center text-white text-[10px] font-mono text-center p-2 rounded">
                    [QR CODE PIX R$ {pixModalSite.monthlyFee}]
                  </div>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    await safeCopyText(data.saasSettings?.pixKey || 'contato@luxebio.com.br');
                    showToast('🔑 Chave PIX copiada para a área de transferência!');
                  }}
                  className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-amber-300 rounded text-[10px] font-bold cursor-pointer border border-neutral-700"
                >
                  Copiar Chave PIX
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                extendDueDate(pixModalSite.id);
                setPixModalOpen(false);
                showToast(`✅ Baixa efetuada! Vencimento de "${pixModalSite.clientName}" estendido em +30 dias.`);
              }}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Confirmar Pagamento PIX (+30 dias & Reativar)</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL DE OTIMIZAÇÃO DE COPYWRITING COM IA GEMINI */}
      {aiCopyModalOpen && aiCopyTarget && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-neutral-900 border border-amber-500/40 rounded-2xl p-6 space-y-4 text-neutral-100 shadow-2xl">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                  <Sparkles className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-neutral-100">
                    Otimizador de Copywriting com IA
                  </h3>
                  <p className="text-[10px] text-neutral-400">
                    Campo: <strong className="text-amber-300">{aiCopyTarget.fieldLabel}</strong>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAiCopyModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Texto Atual:</span>
              <p className="text-xs text-neutral-300 italic">"{aiCopyTarget.currentVal || 'Não preenchido'}"</p>
            </div>

            {aiCopyLoading ? (
              <div className="py-8 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
                <p className="text-xs text-amber-300 font-bold">Gerando 3 opções persuasivas com IA Gemini...</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  Escolha uma das variações de alta conversão:
                </span>
                {aiCopyOptions.map((opt, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-amber-500/50 transition space-y-2 group"
                  >
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {opt.type}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          aiCopyTarget.applyFn(opt.text);
                          setAiCopyModalOpen(false);
                          showToast(`✨ Texto do campo "${aiCopyTarget.fieldLabel}" atualizado pela IA!`);
                        }}
                        className="px-3 py-1 rounded bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-[10px] transition cursor-pointer"
                      >
                        Usar Esta Variação
                      </button>
                    </div>
                    <p className="text-xs text-neutral-100 font-medium leading-relaxed">
                      {opt.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* QR CODE MOBILE PREVIEW MODAL */}
      {qrModalOpen && (() => {
        const targetSite = currentEditingSite || {
          subdomain: data.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'meusite',
          customDomain: '',
          clientName: data.profile.name || 'Rascunho'
        };
        const liveUrl = targetSite.customDomain 
          ? `https://${targetSite.customDomain}` 
          : `https://${targetSite.subdomain || 'meusite'}.luxebio.site`;
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(liveUrl)}`;

        return (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-neutral-900 border border-emerald-500/40 rounded-2xl p-6 space-y-5 text-neutral-100 shadow-2xl relative">
              <div className="flex justify-between items-start border-b border-neutral-800 pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold shrink-0 shadow-lg shadow-emerald-500/10">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-neutral-100 flex items-center gap-2">
                      Visualizar no Celular
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Aponte a câmera do seu smartphone para testar o microsite
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setQrModalOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4 py-1">
                {/* QR Code Frame */}
                <div className="p-4 bg-white rounded-2xl shadow-2xl border-4 border-amber-400 flex flex-col items-center">
                  <img
                    src={qrApiUrl}
                    alt="QR Code do Microsite"
                    className="w-52 h-52 object-contain rounded-lg"
                  />
                  <div className="mt-2 text-center text-[10px] text-neutral-900 font-extrabold tracking-wider uppercase">
                    {targetSite.clientName}
                  </div>
                </div>

                <div className="w-full bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 space-y-2 text-center">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">
                    Link Direto do Microsite:
                  </span>
                  <div className="font-mono text-xs text-amber-300 font-bold break-all px-2.5 py-1.5 bg-neutral-900 rounded-lg border border-neutral-800 select-all">
                    {liveUrl}
                  </div>
                  <div className="flex items-center justify-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={async () => {
                        await safeCopyText(liveUrl);
                        showToast('📋 Link do microsite copiado para a área de transferência!');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-semibold text-xs flex items-center gap-1.5 cursor-pointer border border-neutral-700 transition"
                    >
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Copiar Link</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        openLivePreviewTab();
                      }}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow transition cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Abrir em Nova Aba</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] text-emerald-200 text-center leading-relaxed">
                  💡 <strong>Dica de Vendas:</strong> Apresente o QR Code na tela para o seu cliente final escaneá-lo na hora do fechamento da reunião de vendas!
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Lightbox Modal in React Simulator */}
      {lightboxIndex !== null && data.studentGrid.photos && data.studentGrid.photos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 select-none"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 border border-white/20">
                  Foto {lightboxIndex + 1} de {data.studentGrid.photos.length}
                </span>
                {data.studentGrid.badge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {data.studentGrid.badge}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                title="Fechar (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image with Navigation Buttons */}
            <div className="relative w-full flex items-center justify-center">
              {data.studentGrid.photos.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex - 1 + data.studentGrid.photos.length) % data.studentGrid.photos.length)
                  }
                  className="absolute left-2 sm:-left-12 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition cursor-pointer shadow-2xl hover:scale-105"
                  title="Foto anterior (Seta esquerda)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              <img
                src={data.studentGrid.photos[lightboxIndex]}
                alt={`Foto ampliada ${lightboxIndex + 1}`}
                referrerPolicy="no-referrer"
                className="max-w-[85vw] max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/15"
              />

              {data.studentGrid.photos.length > 1 && (
                <button
                  type="button"
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % data.studentGrid.photos.length)}
                  className="absolute right-2 sm:-right-12 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition cursor-pointer shadow-2xl hover:scale-105"
                  title="Próxima foto (Seta direita)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Caption & Navigation Hint */}
            <div className="pt-3.5 text-center space-y-1">
              <p className="text-xs text-neutral-300 font-medium">
                {data.studentGrid.headline}
              </p>
              <p className="text-[11px] text-neutral-500">
                Pressione as setas do teclado (← / →) para navegar ou Esc para fechar
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
