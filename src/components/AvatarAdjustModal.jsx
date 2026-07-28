import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../hooks/useLanguage'

const VIEWPORT_SIZE = 240   // ekranda göstərilən dairənin ölçüsü (px)
const OUTPUT_SIZE = 400     // yadda saxlanılan şəklin son ölçüsü (px, kvadrat)

/**
 * AvatarAdjustModal
 * Seçilmiş şəkli dairəvi bir "viewport" daxilində göstərir, istifadəçi
 * şəkli yalnız şaquli (yuxarı/aşağı) sürüşdürə bilir ki, üz/əsas hissə
 * kadrın ortasında qalsın. "Yadda saxla" seçiləndə cari mövqeyə uyğun
 * kvadrat bir şəkil canvas üzərində çəkilib File kimi qaytarılır.
 *
 * Props:
 * - open: boolean
 * - file: seçilmiş orijinal şəkil (File)
 * - onCancel: () => void
 * - onConfirm: (adjustedFile: File) => void
 */
export default function AvatarAdjustModal({ open, file, onCancel, onConfirm }) {
  const { t } = useLanguage()
  const [imgEl, setImgEl] = useState(null)
  const [scale, setScale] = useState(1)      // "cover" üçün baza miqyas
  const [offsetY, setOffsetY] = useState(0)  // mərkəzdən şaquli sürüşmə (px, viewport miqyasında)
  const [maxOffset, setMaxOffset] = useState(0)
  const [saving, setSaving] = useState(false)
  const dragState = useRef(null)

  const objectUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file])

  useEffect(() => {
    if (!objectUrl) return
    const img = new Image()
    img.onload = () => {
      const baseScale = Math.max(VIEWPORT_SIZE / img.naturalWidth, VIEWPORT_SIZE / img.naturalHeight)
      const displayedHeight = img.naturalHeight * baseScale
      const overflow = Math.max(0, (displayedHeight - VIEWPORT_SIZE) / 2)
      setImgEl(img)
      setScale(baseScale)
      setMaxOffset(overflow)
      setOffsetY(0)
    }
    img.src = objectUrl
    return () => URL.revokeObjectURL(objectUrl)
  }, [objectUrl])

  if (!open || !file) return null

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
  }

  function handlePointerDown(e) {
    dragState.current = { startY: e.clientY, startOffset: offsetY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e) {
    if (!dragState.current) return
    const delta = e.clientY - dragState.current.startY
    setOffsetY(clamp(dragState.current.startOffset + delta, -maxOffset, maxOffset))
  }

  function handlePointerUp() {
    dragState.current = null
  }

  function handleSave() {
    if (!imgEl) return
    setSaving(true)

    const canvas = document.createElement('canvas')
    canvas.width = OUTPUT_SIZE
    canvas.height = OUTPUT_SIZE
    const ctx = canvas.getContext('2d')

    const outputScale = OUTPUT_SIZE / VIEWPORT_SIZE
    const drawnWidth = imgEl.naturalWidth * scale * outputScale
    const drawnHeight = imgEl.naturalHeight * scale * outputScale
    const x = (OUTPUT_SIZE - drawnWidth) / 2
    const y = (OUTPUT_SIZE - drawnHeight) / 2 + offsetY * outputScale

    // Dairəvi maska ilə kəsib kvadrat (şəffaf kənarlı) PNG kimi çəkirik.
    ctx.save()
    ctx.beginPath()
    ctx.arc(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(imgEl, x, y, drawnWidth, drawnHeight)
    ctx.restore()

    canvas.toBlob((blob) => {
      setSaving(false)
      if (!blob) return
      const adjustedFile = new File([blob], file.name.replace(/\.[^.]+$/, '') + '.png', { type: 'image/png' })
      onConfirm(adjustedFile)
    }, 'image/png')
  }

  return createPortal(
    <div className="avatar-adjust-modal__overlay" onClick={onCancel} role="presentation">
      <div
        className="avatar-adjust-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="avatar-adjust-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="avatar-adjust-title" className="avatar-adjust-modal__title">
          {t('avatar_adjust_title') || 'Şəkli düzəliş edin'}
        </h2>
        <p className="avatar-adjust-modal__hint">
          {t('avatar_adjust_hint') || 'Düzgün mövqe üçün şəkli yuxarı/aşağı sürüşdürün'}
        </p>

        <div
          className="avatar-adjust-modal__viewport"
          style={{ width: VIEWPORT_SIZE, height: VIEWPORT_SIZE }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {imgEl && (
            <img
              src={objectUrl}
              alt=""
              draggable={false}
              className="avatar-adjust-modal__image"
              style={{
                width: imgEl.naturalWidth * scale,
                height: imgEl.naturalHeight * scale,
                transform: `translate(-50%, calc(-50% + ${offsetY}px))`,
              }}
            />
          )}
          <div className="avatar-adjust-modal__ring" />
        </div>

        <div className="avatar-adjust-modal__actions">
          <button type="button" className="avatar-adjust-modal__btn avatar-adjust-modal__btn--cancel" onClick={onCancel} disabled={saving}>
            {t('apply_confirm_cancel') || 'Ləğv et'}
          </button>
          <button type="button" className="avatar-adjust-modal__btn avatar-adjust-modal__btn--save" onClick={handleSave} disabled={!imgEl || saving}>
            {saving ? (t('avatar_adjust_saving') || 'Yaddaşa verilir...') : (t('settings_save_btn') || 'Yadda saxla')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}