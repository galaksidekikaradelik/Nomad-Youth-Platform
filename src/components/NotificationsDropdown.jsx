import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import * as notificationService from '../services/notificationService'

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

const UNREAD_POLL_INTERVAL_MS = 60000 // hər dəqiqə oxunmamış sayını yenilə

export default function NotificationsDropdown() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const refreshUnreadCount = useCallback(async () => {
    if (!user) return
    try {
      const count = await notificationService.fetchUnreadCount()
      setUnreadCount(count || 0)
    } catch (err) {
      console.error('Oxunmamış say yüklənmədi:', err)
    }
  }, [user])

  useEffect(() => {
    if (!user) {
      setNotifications([])
      setUnreadCount(0)
      return
    }

    refreshUnreadCount()
    const interval = setInterval(refreshUnreadCount, UNREAD_POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [user, refreshUnreadCount])

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

  const handleToggle = async () => {
    const next = !open
    setOpen(next)
    if (!next) return

    setLoading(true)
    try {
      const list = await notificationService.fetchMyNotifications()
      setNotifications(list || [])

      // Açılan kimi oxunmamışları backend-də "oxundu" et.
      // Backend-də bulk "mark-all-read" endpoint-i olmadığı üçün
      // hər bir oxunmamış bildiriş üçün ayrıca sorğu göndərilir.
      const unread = (list || []).filter((n) => !n.read)
      if (unread.length > 0) {
        await Promise.all(unread.map((n) => notificationService.markAsRead(n.id)))
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
        setUnreadCount(0)
      }
    } catch (err) {
      console.error('Bildirişlər yüklənmədi:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleNotificationClick = () => {
    setOpen(false)
    // Backend Notification entity-də opportunity id/key saxlanmır
    // (yalnız title/message), ona görə deep-link əvəzinə istifadəçini
    // Profile-dəki "Bildirişlər" görünüşünə yönləndiririk.
    navigate('/profile', { state: { view: 'notifications' } })
  }

  return (
    <div className="navbar__notif-wrap" ref={wrapperRef}>
      <button
        className="navbar__icon-btn navbar__notif-btn"
        aria-label="Bildirişlər"
        onClick={handleToggle}
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="navbar__notif-badge">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="navbar__notif-dropdown">
          {loading ? (
            <div className="navbar__notif-empty">Yüklənir...</div>
          ) : notifications.length === 0 ? (
            <div className="navbar__notif-empty">Bildiriş yoxdur</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className="navbar__notif-item navbar__notif-item--clickable"
                onClick={() => handleNotificationClick(n)}
                role="button"
                tabIndex={0}
              >
                <div className="navbar__notif-item__title">{n.title}</div>
                {n.message && (
                  <div className="navbar__notif-item__message">{n.message}</div>
                )}
                <div className="navbar__notif-item__time">{timeAgo(n.createdAt)}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}