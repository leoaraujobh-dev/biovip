import React from 'react';

export const WHATSAPP_SVG_STRING = `<svg style="width:20px;height:20px;display:inline-block;vertical-align:middle;fill:currentColor;" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/><path d="M12 1c-6.075 0-11 4.925-11 11 0 2.102.589 4.066 1.606 5.744l-1.606 5.256 5.438-1.57c1.613.918 3.479 1.442 5.562 1.442 6.075 0 11-4.925 11-11s-4.925-11-11-11zm0 19.825c-1.875 0-3.626-.543-5.111-1.479l-.366-.23-3.232.933.951-3.111-.252-.387c-1.047-1.606-1.615-3.501-1.615-5.551 0-5.132 4.173-9.305 9.305-9.305 5.132 0 9.305 4.173 9.305 9.305 0 5.132-4.173 9.305-9.305 9.305z"/></svg>`;
export const INSTAGRAM_SVG_STRING = `<svg style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`;
export const CALENDAR_SVG_STRING = `<svg style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;

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
