
import apiClient from './apiClient'

// apiClient baseURL: https://domain.com/api olduqda
// aşağıdakı BASE düzgündür.
// baseURL yalnız domain olduqda '/api/mundus-programs' yaz.
const BASE = '/mundus-programs'

export const mundusService = {
  getAll(params = {}) {
    return apiClient.get(BASE, { params })
  },

  getById(id) {
    return apiClient.get(`${BASE}/${id}`)
  },

  trackView(id) {
    return apiClient.post(`${BASE}/${id}/view`)
  },

  getUserStatus(id) {
    return apiClient.get(`${BASE}/${id}/user-status`)
  },

  addFavorite(id) {
    return apiClient.post(`${BASE}/${id}/favorite`)
  },

  removeFavorite(id) {
    return apiClient.delete(`${BASE}/${id}/favorite`)
  },

  addSave(id) {
    return apiClient.post(`${BASE}/${id}/save`)
  },

  removeSave(id) {
    return apiClient.delete(`${BASE}/${id}/save`)
  },

  trackApply(id) {
    return apiClient.post(`${BASE}/${id}/apply-click`)
  },
}
