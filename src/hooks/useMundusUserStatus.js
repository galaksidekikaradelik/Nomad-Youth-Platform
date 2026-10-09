
import { useEffect, useRef, useState } from 'react'

import { mundusService } from '../services/mundusService'

export function useMundusUserStatus(id, user) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  const busyRef = useRef(false)

  useEffect(() => {
    let active = true

    setLiked(false)
    setSaved(false)
    setLoading(Boolean(id && user))

    if (!id || !user) {
      return () => {
        active = false
      }
    }

    async function loadStatus() {
      try {
        const { data } =
          await mundusService.getUserStatus(id)

        if (!active) return

        setLiked(Boolean(data?.favorite))
        setSaved(Boolean(data?.saved))
      } catch (error) {
        if (active) {
          console.error(
            'Mundus user status failed:',
            error
          )
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    loadStatus()

    return () => {
      active = false
    }
  }, [id, user?.id])

  async function runAction(action, update) {
    if (
      !id ||
      !user ||
      loading ||
      busyRef.current
    ) {
      return
    }

    busyRef.current = true
    setActionLoading(true)

    try {
      await action()
      update()
    } catch (error) {
      console.error(
        'Mundus user action failed:',
        error
      )
    } finally {
      busyRef.current = false
      setActionLoading(false)
    }
  }

  function toggleLike() {
    return runAction(
      () =>
        liked
          ? mundusService.removeFavorite(id)
          : mundusService.addFavorite(id),
      () => setLiked(prev => !prev)
    )
  }

  function toggleSave() {
    return runAction(
      () =>
        saved
          ? mundusService.removeSave(id)
          : mundusService.addSave(id),
      () => setSaved(prev => !prev)
    )
  }

  return {
    liked,
    saved,
    loading,
    actionLoading,
    toggleLike,
    toggleSave,
  }
}
