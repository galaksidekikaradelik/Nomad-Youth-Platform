import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { STATUS_CONFIG } from '../utils/applicationStatus'
import { useApplicationStatus } from '../hooks/useApplicationStatus'


export default function StatusSelector({ opportunity, t }) {
  const { user } = useAuth()
  const { statusMap, setStatus: setStatusRemote } = useApplicationStatus()
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  if (!user) return null
  if (!opportunity.id) return null 

  const status = statusMap[opportunity.id] || null

  function selectStatus(newStatus) {
    setStatusRemote(opportunity.id, newStatus)
    setOpen(false)
  }

  const config = status ? STATUS_CONFIG[status] : null

  return (
    <div
      className="opportunity-card__status-selector"
      ref={wrapperRef}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className={`opportunity-card__status-badge${config ? ` opportunity-card__status-badge--${config.modifier}` : ' opportunity-card__status-badge--empty'}`}
        onClick={() => setOpen(o => !o)}
      >
        <span className="opportunity-card__status-dot" />
        {config ? t(config.labelKey) : (t('status_select') || 'Status yoxdur')}
      </button>

      {open && (
        <div className="opportunity-card__status-dropdown">
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
            <button
              key={key}
              type="button"
              className={`opportunity-card__status-option opportunity-card__status-option--${cfg.modifier}`}
              onClick={() => selectStatus(key)}
            >
              <span className="opportunity-card__status-dot" />
              {t(cfg.labelKey)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}