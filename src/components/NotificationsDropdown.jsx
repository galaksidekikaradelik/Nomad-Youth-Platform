import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { opportunities } from '../data/opportunities'
import { syncNotifications, markAllAsRead } from '../utils/notifications'

function timeAgo(isoDate) {
  const diffMs = Date.now() - new Date(isoDate).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'indicə'
  if (mins < 60) return `${mins} dəq əvvəl`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} saat əvvəl`
  const days = Math.floor(hours / 24)
  return `${days} gün əvvəl`
}

export default function NotificationsDropdown() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  // Effect əvəzinə lazy init + render zamanı sinxronlaşdırma (OpportunityCard.jsx-dəki
  // StatusSelector ilə eyni pattern) — useEffect daxilində mount/user-dəyişmə zamanı
  // setState çağırışının yaratdığı "cascading render" xəbərdarlığını aradan qaldırır.
  const [trackedUser, setTrackedUser] = useState(user)
  const [notifications, setNotifications] = useState(() =>
    user ? syncNotifications(user, opportunities) : []
  )

  if (user !== trackedUser) {
    setTrackedUser(user)
    setNotifications(user ? syncNotifications(user, opportunities) : [])
  }

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

  const unreadCount = notifications.filter(n => !n.read).length

  const handleToggle = () => {
    const next = !open
    setOpen(next)
    if (next && unreadCount > 0) {
      const updated = markAllAsRead(user)
      setNotifications(updated)
    }
  }

  const handleNotificationClick = (n) => {
    setOpen(false)
    navigate(`/opportunities?show=${encodeURIComponent(n.oppKey)}`)
  }

  return (
    <div className="navbar__notif-wrap" ref={wrapperRef}>
      <button
        className="navbar__icon-btn navbar__notif-btn"
        aria-label="Bildirişlər"
        onClick={handleToggle}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="navbar__notif-badge">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="navbar__notif-dropdown">
          {notifications.length === 0 ? (
            <div className="navbar__notif-empty">Bildiriş yoxdur</div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                className="navbar__notif-item navbar__notif-item--clickable"
                onClick={() => handleNotificationClick(n)}
                role="button"
                tabIndex={0}
              >
                <div className="navbar__notif-item__type">
                  {n.type === 'similar_match' ? '💡 Bunu bəyənə bilərsiniz' : '🆕 Yeni elan'}
                </div>
                <div className="navbar__notif-item__title">{n.title}</div>
                <div className="navbar__notif-item__time">{timeAgo(n.createdAt)}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}