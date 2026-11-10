import { supabase, isSupabaseConfigured } from '@/lib/supabase'

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
          galleryPhotosList: data.gallery_photos_list || [],
          pixels: data.pixels,
          subpages: data.subpages || [],
          updatedAt: data.updated_at
        }

        // Cache local no navegador
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem('biovip_site_' + slug, JSON.stringify(formatted))
          } catch (e) {}
        }

        return formatted
      }
    } catch (err) {
      console.warn('Erro ao consultar Supabase, utilizando fallback local:', err)
    }
  }

  // 2. Fallback: Ler do localStorage
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('biovip_site_' + slug) || (slug === 'minha-marca' ? localStorage.getItem('biovip_user_site') : null)
      if (saved) return JSON.parse(saved)
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

  // 1. Persistência local imediata
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('biovip_site_' + slug, JSON.stringify(siteData))
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e)
    }
  }

  // 2. Sincronização com Supabase (se configurado)
  if (isSupabaseConfigured() && supabase) {
    try {
      const payload: BioSiteRecord = {
        slug: slug,
        name: siteData.name || siteData.businessTitle || siteData.brandName || '',
        role: siteData.role || siteData.niche || '',
        category: siteData.category || siteData.niche || '',
        registration_code: siteData.registrationCode || '',
        monogram: siteData.monogram || '',
        photo: siteData.photo || '',
        palette_id: siteData.paletteId || '',
        typography_id: siteData.typographyId || '',
        button_style: siteData.buttonStyle || '',
        button_animation: siteData.buttonAnimation || '',
        whatsapp: siteData.whatsapp || '',
        buttons: siteData.buttons || [],
        announcement: siteData.announcement || null,
        urgency: siteData.urgency || null,
        services_catalog: siteData.servicesCatalog || null,
        location_info: siteData.locationInfo || null,
        qualifier_quiz: siteData.qualifierQuiz || null,
        metrics_list: siteData.metricsList || [],
        how_it_works_steps: siteData.howItWorksSteps || [],
        testimonials_list: siteData.testimonialsList || [],
        about_me_section: siteData.aboutMeSection || null,
        faq_list: siteData.faqList || [],
        gallery_photos_list: siteData.galleryPhotosList || siteData.galleryPhotos || [],
        pixels: siteData.pixels || null,
        subpages: siteData.subpages || [],
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

