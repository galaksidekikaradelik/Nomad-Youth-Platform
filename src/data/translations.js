
export const translations = {
  org_not_found: 'Təşkilat tapılmadı',
  back_to_opportunities: 'İmkanlara qayıt',
  org_active_opps_suffix: 'aktiv imkan',
  org_about_title: 'Haqqında',
  org_opportunities_tab: 'Aktiv imkanlar',
  org_past_tab: 'Keçmiş layihələr',
  org_contact_title: 'Əlaqə',
  org_no_active: 'Hazırda aktiv imkan yoxdur.',
  org_no_past: 'Hələ tamamlanmış layihə yoxdur.',
  org_event_photos: 'Tədbir şəkilləri',
  org_see_more: 'Ətraflı bax',
  org_apply: 'Müraciət et',
  org_deadline: 'Son tarix',
  org_active_line: 'aktiv imkan',
  org_completed_sub: 'tamamlanmış layihə',
  org_participants_sub: 'iştirakçı',
  org_active_projects: 'Aktiv layihələr',
  org_active_project: 'Aktiv layihə',
  org_project_date: 'Tarix',
  org_project_time: 'Saat',
  org_project_transport: 'Nəqliyyat və qidalanma',
}

export function t(key) {
  return translations[key] || key
}
