import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

import { translateCategory } from "../data/categoryTranslation";
import { translateCountry } from "../data/locationTranslation";

import { useWishlist } from "../hooks/useWishlist";
import { useLike } from "../hooks/useLike";

import apiClient from "../api/apiClient";

import ApplyConfirmModal from "./ApplyConfirmModal";
import AuthPromptModal from "./AuthPromptModal";

import {
  Heart,
  Bookmark,
  MapPin,
  CalendarDays,
  ExternalLink,
} from "lucide-react";

export default function OpportunityCard({
  opportunity,
  autoOpenDetail = false,
}) {
  const navigate = useNavigate();

  const { lang, t } = useLanguage();
  const { user } = useAuth();

  const cardRef = useRef(null);

  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [showApplyConfirm, setShowApplyConfirm] = useState(false);

  const {
    liked,
    toggleLike,
  } = useLike(opportunity?.id);

  const {
    saved,
    toggleSave,
  } = useWishlist(opportunity?.id);

  if (!opportunity) {
    return null;
  }

  const {
    id,
    title,
    typeDetail,
    category,
    type,
    country: location,
    deadline,
    applyLink,
    eventDateRange,
    escOrSalto,
    volunteeringType,
  } = opportunity;

  /* =========================================================
     TRANSLATIONS
  ========================================================= */

  const translatedCategory =
    translateCategory(category, lang) || category;

  const translatedLocation =
    translateCountry(location, lang) || location;

  /* =========================================================
     AUTO OPEN
     
     Əgər köhnə sistemdən hansısa yerdə
     autoOpenDetail istifadə olunursa, artıq modal yox,
     detail page-ə redirect edirik.
  ========================================================= */

  useEffect(() => {
    if (!autoOpenDetail || !id) return;

    navigate(`/opportunities/${id}`, {
      replace: true,
    });
  }, [autoOpenDetail, id, navigate]);

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetail = (e) => {
    e?.stopPropagation();

    if (!id) return;

    navigate(`/opportunities/${id}`);
  };

  /* =========================================================
     LIKE
  ========================================================= */

  const handleLike = async (e) => {
    e.stopPropagation();

    if (!user) {
      setShowAuthPrompt(true);
      return;
    }

    try {
      await toggleLike();
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  /* =========================================================
     SAVE
  ========================================================= */

  const handleSave = async (e) => {
    e.stopPropagation();

    if (!user) {
      setShowAuthPrompt(true);
      return;
    }

    try {
      await toggleSave();
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  /* =========================================================
     APPLY
  ========================================================= */

  const handleApplyClick = (e) => {
    e.stopPropagation();

    if (!applyLink) {
      return;
    }

    if (!user) {
      setShowAuthPrompt(true);
      return;
    }

    setShowApplyConfirm(true);
  };

  const confirmApply = () => {
    setShowApplyConfirm(false);

    if (!applyLink) return;

    window.open(
      applyLink,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =========================================================
     CARD
  ========================================================= */

  return (
    <>
      <article
        ref={cardRef}
        className="opportunity-card"
        onClick={openDetail}
      >
        {/* =================================================
            TOP
        ================================================= */}

        <div className="opportunity-card__top">
          <div className="opportunity-card__category">
            {translatedCategory ||
              typeDetail ||
              type ||
              "Opportunity"}
          </div>

          <div className="opportunity-card__actions">
            <button
              type="button"
              className={`opportunity-card__icon-btn ${
                liked
                  ? "opportunity-card__icon-btn--active"
                  : ""
              }`}
              onClick={handleLike}
              aria-label={t("like") || "Like"}
            >
              <Heart
                size={18}
                fill={liked ? "currentColor" : "none"}
              />
            </button>

            <button
              type="button"
              className={`opportunity-card__icon-btn ${
                saved
                  ? "opportunity-card__icon-btn--active"
                  : ""
              }`}
              onClick={handleSave}
              aria-label={t("save") || "Save"}
            >
              <Bookmark
                size={18}
                fill={saved ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h3 className="opportunity-card__title">
          {title}
        </h3>

        {/* =================================================
            META
        ================================================= */}

        <div className="opportunity-card__meta">
          {translatedLocation && (
            <div className="opportunity-card__meta-item">
              <MapPin size={15} />
              <span>{translatedLocation}</span>
            </div>
          )}

          {deadline && (
            <div className="opportunity-card__meta-item">
              <CalendarDays size={15} />
              <span>{deadline}</span>
            </div>
          )}
        </div>

        {/* =================================================
            EVENT DATE
        ================================================= */}

        {eventDateRange && (
          <div className="opportunity-card__date">
            <CalendarDays size={15} />
            <span>{eventDateRange}</span>
          </div>
        )}

        {/* =================================================
            EXTRA INFO
        ================================================= */}

        {(escOrSalto || volunteeringType) && (
          <div className="opportunity-card__tags">
            {escOrSalto && (
              <span className="opportunity-card__tag">
                {escOrSalto}
              </span>
            )}

            {volunteeringType && (
              <span className="opportunity-card__tag">
                {volunteeringType}
              </span>
            )}
          </div>
        )}

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="opportunity-card__footer">
          <button
            type="button"
            className="opportunity-card__detail-btn"
            onClick={openDetail}
          >
            {t("card_view_details") || "Ətraflı bax"}
          </button>

          {applyLink && (
            <button
              type="button"
              className="opportunity-card__apply-btn"
              onClick={handleApplyClick}
            >
              {t("apply") || "Müraciət et"}

              <ExternalLink size={15} />
            </button>
          )}
        </div>
      </article>

      {/* =====================================================
          AUTH PROMPT
      ===================================================== */}

      <AuthPromptModal
        open={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
      />

      {/* =====================================================
          APPLY CONFIRM
      ===================================================== */}

      <ApplyConfirmModal
        open={showApplyConfirm}
        onClose={() => setShowApplyConfirm(false)}
        onConfirm={confirmApply}
        opportunity={opportunity}
      />
    </>
  );
}