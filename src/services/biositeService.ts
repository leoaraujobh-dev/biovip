import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { healMojibake } from '@/utils/textSanitizer'

export interface BioSiteRecord {
  slug: string
  name: string
  role?: string
  category?: string
  registration_code?: string
  monogram?: string
  photo?: string
  palette_id?: string
  typography_id?: string
  button_style?: string
  button_animation?: string
  whatsapp?: string
  buttons?: any[]
  announcement?: any
  urgency?: any
  services_catalog?: any
  location_info?: any
  qualifier_quiz?: any
  metrics_list?: any[]
  how_it_works_steps?: any[]
  testimonials_list?: any[]
  about_me_section?: any
  faq_list?: any[]
  gallery_photos_list?: string[]
  pixels?: any
  subpages?: any[]
  updated_at?: string
}

export interface LeadSubmission {
  id?: string
  slug: string
  client_name?: string
  whatsapp?: string
  action_type: 'whatsapp_click' | 'quiz_completed' | 'catalog_inquiry' | 'contact'
  details?: Record<string, any>
  created_at?: string
}

/**
 * Busca os dados de um Bio Site.
 * 1º Tenta buscar no Supabase (se configurado).
 * 2º Atualiza e sincroniza com o localStorage.
 * 3º Fallback para o localStorage local se offline.
 */
export async function getBioSite(slug: string): Promise<any | null> {
  // 1. Tentar carregar do Supabase se estiver configurado
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('biosites')
        .select('*')
        .eq('slug', slug)
        .single()

      if (!error && data) {
        const galleryConfig = data.pixels?.galleryConfig || (data as any).gallery_config || null
        const galleryPhotosList = data.pixels?.galleryPhotosList || (data as any).gallery_photos_list || galleryConfig?.photos || []
        const customPalette = data.pixels?.customPalette || null

        // Converte os nomes de colunas do banco (snake_case) para o formato do app (camelCase)
        const formatted = {
          slug: data.slug,
          name: data.name,
          role: data.role,
          category: data.category,
          registrationCode: data.registration_code,
          monogram: data.monogram,
          photo: data.photo,
          paletteId: data.palette_id,
          customPalette: customPalette,
          typographyId: data.typography_id,
          buttonStyle: data.button_style,
          buttonAnimation: data.button_animation,
          whatsapp: data.whatsapp,
          buttons: data.buttons || [],
          announcement: data.announcement,
          urgency: data.urgency,
          servicesCatalog: data.services_catalog,
          locationInfo: data.location_info,
          qualifierQuiz: data.qualifier_quiz,
          metricsList: data.metrics_list || [],
          howItWorksSteps: data.how_it_works_steps || [],
          testimonialsList: data.testimonials_list || [],
          aboutMeSection: data.about_me_section,
          faqList: data.faq_list || [],
          galleryConfig: galleryConfig,
          galleryPhotosList: galleryPhotosList,
          pixels: data.pixels,
          subpages: data.subpages || [],
          updatedAt: data.updated_at
        }

        const healedFormatted = healMojibake(formatted)

        // Cache local no navegador
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem('biovip_site_' + slug, JSON.stringify(healedFormatted))
          } catch (e) {}
        }

        return healedFormatted
      }
    } catch (err) {
      console.warn('Erro ao consultar Supabase, utilizando fallback local:', err)
    }
  }

  // 2. Fallback: Ler do localStorage
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('biovip_site_' + slug) || (slug === 'minha-marca' ? localStorage.getItem('biovip_user_site') : null)
      if (saved) {
        const parsed = JSON.parse(saved)
        const healed = healMojibake(parsed)
        try {
          localStorage.setItem('biovip_site_' + slug, JSON.stringify(healed))
        } catch {}
        return healed
      }
    } catch (e) {}
  }

  return null
}

/**
 * Salva alterações de um Bio Site.
 * Salva no localStorage (resposta instantânea) e faz upsert no Supabase se configurado.
 */
export async function saveBioSite(slug: string, siteData: any): Promise<{ success: boolean; cloudSynced: boolean; error?: string }> {
  let cloudSynced = false
  const cleanSiteData = healMojibake(siteData)

  // 1. Persistência local imediata
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('biovip_site_' + slug, JSON.stringify(cleanSiteData))
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e)
    }
  }

  // 2. Sincronização com Supabase (se configurado)
  if (isSupabaseConfigured() && supabase) {
    try {
      const payload: BioSiteRecord = {
        slug: slug,
        name: cleanSiteData.name || cleanSiteData.businessTitle || cleanSiteData.brandName || '',
        role: cleanSiteData.role || cleanSiteData.niche || '',
        category: cleanSiteData.category || cleanSiteData.niche || '',
        registration_code: cleanSiteData.registrationCode || '',
        monogram: cleanSiteData.monogram || '',
        photo: cleanSiteData.photo || '',
        palette_id: cleanSiteData.paletteId || '',
        typography_id: cleanSiteData.typographyId || '',
        button_style: cleanSiteData.buttonStyle || '',
        button_animation: cleanSiteData.buttonAnimation || '',
        whatsapp: cleanSiteData.whatsapp || '',
        buttons: cleanSiteData.buttons || [],
        announcement: cleanSiteData.announcement || null,
        urgency: cleanSiteData.urgency || null,
        services_catalog: cleanSiteData.servicesCatalog || null,
        location_info: cleanSiteData.locationInfo || null,
        qualifier_quiz: cleanSiteData.qualifierQuiz || null,
        metrics_list: cleanSiteData.metricsList || [],
        how_it_works_steps: cleanSiteData.howItWorksSteps || [],
        testimonials_list: cleanSiteData.testimonialsList || [],
        about_me_section: cleanSiteData.aboutMeSection || null,
        faq_list: cleanSiteData.faqList || [],
        pixels: {
          ...(typeof cleanSiteData.pixels === 'object' && cleanSiteData.pixels !== null ? cleanSiteData.pixels : {}),
          galleryConfig: cleanSiteData.galleryConfig || null,
          galleryPhotosList: cleanSiteData.galleryPhotosList || cleanSiteData.galleryPhotos || cleanSiteData.galleryConfig?.photos || [],
          customPalette: cleanSiteData.customPalette || null
        },
        subpages: cleanSiteData.subpages || [],
        updated_at: new Date().toISOString()
      }

      const { error } = await supabase
        .from('biosites')
        .upsert(payload, { onConflict: 'slug' })

      if (error) {
        console.error('Erro ao sincronizar com Supabase:', error.message)
        return { success: true, cloudSynced: false, error: error.message }
      }

      cloudSynced = true
    } catch (err: any) {
      console.error('Falha na requisição ao Supabase:', err)
      return { success: true, cloudSynced: false, error: err?.message || 'Falha de rede' }
    }
  }

  return { success: true, cloudSynced }
}

/**
 * Registra um lead capturado no Bio Site (WhatsApp click, quiz, etc.).
 */
export async function trackLead(lead: LeadSubmission): Promise<void> {
  // Salva no localStorage para visualização local imediata
  if (typeof window !== 'undefined') {
    try {
      const key = 'biovip_leads_' + lead.slug
      const stored = localStorage.getItem(key)
      const list = stored ? JSON.parse(stored) : []
      list.unshift({ ...lead, id: `lead-${Date.now()}`, created_at: new Date().toISOString() })
      localStorage.setItem(key, JSON.stringify(list))
    } catch (e) {}
  }

  // Envia ao Supabase se configurado
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from('leads').insert({
        slug: lead.slug,
        client_name: lead.client_name || 'Visitante',
        whatsapp: lead.whatsapp || '',
        action_type: lead.action_type,
        details: lead.details || {}
      })
    } catch (e) {
      console.warn('Não foi possível enviar lead ao Supabase:', e)
    }
  }
}

/**
 * Busca leads capturados para um biosite (ou todos, se admin).
 * 1º Tenta buscar no Supabase se configurado.
 * 2º Fallback para o localStorage local.
 */
export async function getLeads(slug?: string): Promise<LeadSubmission[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      let query = supabase.from('leads').select('*').order('created_at', { ascending: false })
      if (slug) {
        query = query.eq('slug', slug)
      }
      const { data, error } = await query.limit(100)
      if (!error && data && data.length > 0) {
        return data.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          client_name: item.client_name,
          whatsapp: item.whatsapp,
          action_type: item.action_type,
          details: item.details,
          created_at: item.created_at
        }))
      }
    } catch (err) {
      console.warn('Erro ao consultar leads no Supabase, utilizando fallback local:', err)
    }
  }

  // Fallback: localStorage
  if (typeof window !== 'undefined') {
    try {
      if (slug) {
        const key = 'biovip_leads_' + slug
        const stored = localStorage.getItem(key)
        return stored ? JSON.parse(stored) : []
      } else {
        const allLeads: LeadSubmission[] = []
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i)
          if (k && k.startsWith('biovip_leads_')) {
            const val = localStorage.getItem(k)
            if (val) {
              const list = JSON.parse(val)
              allLeads.push(...list)
            }
          }
        }
        return allLeads.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''))
      }
    } catch (e) {
      console.error('Erro ao ler leads do localStorage:', e)
    }
  }

  return []
}

