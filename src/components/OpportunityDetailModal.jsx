import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

import apiClient from "../api/apiClient";

import {
  ArrowLeft,
  Heart,
  Bookmark,
  MapPin,
  CalendarDays,
  Clock,
  Languages,
  Wallet,
  ExternalLink,
  Loader2,
} from "lucide-react";

import { translateCategory } from "../data/categoryTranslation";
import { translateCountry } from "../data/locationTranslation";

export default function OpportunityDetailsPage() {
  const { opportunityId } = useParams();
  const navigate = useNavigate();

  const { lang, t } = useLanguage();
  const { user } = useAuth();

  const [opportunity, setOpportunity] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  /* =========================================================
     FETCH OPPORTUNITY
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    const fetchOpportunity = async () => {
      if (!opportunityId) {
        setError("Opportunity ID tapılmadı.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await apiClient.get(
          `/opportunities/${opportunityId}/details`,
          {
            params: {
              userId: user?.id,
              lang,
            },
          }
        );

        if (cancelled) return;

        const data =
          response?.data?.data ??
          response?.data ??
          null;

        if (!data) {
          setError(
            t("opportunity_not_found") ||
              "İmkan tapılmadı."
          );
          return;
        }

        setOpportunity(data);

        /*
         * Backend detail response-da bunlardan biri varsa
         * initial state kimi götürürük.
         */
        setLiked(
          Boolean(
            data.liked ??
            data.isLiked ??
            data.userLiked ??
            false
          )
        );

        setSaved(
          Boolean(
            data.saved ??
            data.isSaved ??
            data.userSaved ??
            false
          )
        );
      } catch (err) {
        console.error(
          "Failed to load opportunity:",
          err
        );

        if (!cancelled) {
          setError(
            err?.response?.status === 404
              ? t("opportunity_not_found") ||
                  "İmkan tapılmadı."
              : t("opportunity_load_error") ||
                  "İmkanı yükləmək mümkün olmadı."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchOpportunity();

    return () => {
      cancelled = true;
    };
  }, [opportunityId, user?.id, lang, t]);

  /* =========================================================
     LIKE
  ========================================================= */

  const handleLike = async () => {
    if (!user) {
      return;
    }

    try {
      /*
       * Sənin mövcud like endpoint-in fərqlidirsə,
       * burada həmin endpoint-i istifadə etmək lazımdır.
       *
       * Hazırda kartdakı useLike hook-un davranışına
       * toxunmamaq üçün sadə UI state saxlayırıq.
       */

      setLiked((prev) => !prev);
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  /* =========================================================
     SAVE
  ========================================================= */

  const handleSave = async () => {
    if (!user) {
      return;
    }

    try {
      setSaved((prev) => !prev);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  /* =========================================================
     APPLY
  ========================================================= */

  const handleApply = () => {
    if (!opportunity?.applyLink) {
      return;
    }

    window.open(
      opportunity.applyLink,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="opportunity-details-page">
        <div className="opportunity-details-page__loading">
          <Loader2
            size={32}
            className="opportunity-details-page__spinner"
          />

          <p>
            {t("loading") || "Yüklənir..."}
          </p>
        </div>
      </main>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error || !opportunity) {
    return (
      <main className="opportunity-details-page">
        <div className="opportunity-details-page__error">
          <h1>
            {t("opportunity_not_found") ||
              "İmkan tapılmadı"}
          </h1>

          <p>
            {error ||
              t("opportunity_load_error") ||
              "İmkanı yükləmək mümkün olmadı."}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/opportunities")
            }
          >
            <ArrowLeft size={17} />
            {t("back_to_opportunities") ||
              "İmkanlara qayıt"}
          </button>
        </div>
      </main>
    );
  }

  /* =========================================================
     DATA
  ========================================================= */

  const {
    title,
    category,
    type,
    typeDetail,

    country,
    location,

    deadline,
    applyLink,

    description,
    descriptionTranslations,

    duration,
    language,

    eventDateRange,
    financialSupport,

    organization,
    organizer,
    organizationName,

    visaType,
    durationType,

    escOrSalto,
    volunteeringType,
  } = opportunity;

  const translatedDescription =
    descriptionTranslations?.[lang] ||
    description ||
    "";

  const translatedCategory =
    translateCategory(category, lang) ||
    category ||
    typeDetail ||
    type ||
    "";

  const translatedLocation =
    translateCountry(
      country || location,
      lang
    ) ||
    country ||
    location ||
    "";

  const displayOrganization =
    organization?.name ||
    organizationName ||
    organizer?.name ||
    "";

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="opportunity-details-page">
      <div className="opportunity-details-page__container">

        {/* ===================================================
            BACK
        =================================================== */}

        <button
          type="button"
          className="opportunity-details-page__back"
          onClick={() =>
            navigate("/opportunities")
          }
        >
          <ArrowLeft size={18} />

          {t("back_to_opportunities") ||
            "İmkanlara qayıt"}
        </button>

        {/* ===================================================
            HEADER
        =================================================== */}

        <header className="opportunity-details-page__header">

          <div className="opportunity-details-page__category">
            {translatedCategory}
          </div>

          <h1 className="opportunity-details-page__title">
            {title}
          </h1>

          {displayOrganization && (
            <div className="opportunity-details-page__organization">
              {displayOrganization}
            </div>
          )}

          <div className="opportunity-details-page__actions">

            <button
              type="button"
              className={`opportunity-details-page__action ${
                liked
                  ? "opportunity-details-page__action--active"
                  : ""
              }`}
              onClick={handleLike}
              title={
                t("like") || "Bəyən"
              }
            >
              <Heart
                size={19}
                fill={
                  liked
                    ? "currentColor"
                    : "none"
                }
              />

              <span>
                {liked
                  ? t("liked") || "Bəyənildi"
                  : t("like") || "Bəyən"}
              </span>
            </button>

            <button
              type="button"
              className={`opportunity-details-page__action ${
                saved
                  ? "opportunity-details-page__action--active"
                  : ""
              }`}
              onClick={handleSave}
              title={
                t("save") || "Yadda saxla"
              }
            >
              <Bookmark
                size={19}
                fill={
                  saved
                    ? "currentColor"
                    : "none"
                }
              />

              <span>
                {saved
                  ? t("saved") || "Saxlanıldı"
                  : t("save") || "Yadda saxla"}
              </span>
            </button>

          </div>
        </header>

        {/* ===================================================
            INFO GRID
        =================================================== */}

        <section className="opportunity-details-page__info">

          {deadline && (
            <div className="opportunity-details-page__info-item">
              <CalendarDays size={19} />

              <div>
                <span>
                  {t("deadline") || "Son tarix"}
                </span>

                <strong>
                  {deadline}
                </strong>
              </div>
            </div>
          )}

          {translatedLocation && (
            <div className="opportunity-details-page__info-item">
              <MapPin size={19} />

              <div>
                <span>
                  {t("location") || "Məkan"}
                </span>

                <strong>
                  {translatedLocation}
                </strong>
              </div>
            </div>
          )}

          {duration && (
            <div className="opportunity-details-page__info-item">
              <Clock size={19} />

              <div>
                <span>
                  {t("duration") || "Müddət"}
                </span>

                <strong>
                  {duration}
                </strong>
              </div>
            </div>
          )}

          {language && (
            <div className="opportunity-details-page__info-item">
              <Languages size={19} />

              <div>
                <span>
                  {t("language") || "Dil"}
                </span>

                <strong>
                  {language}
                </strong>
              </div>
            </div>
          )}

          {eventDateRange && (
            <div className="opportunity-details-page__info-item">
              <CalendarDays size={19} />

              <div>
                <span>
                  {t("event_date") ||
                    "Tədbir tarixi"}
                </span>

                <strong>
                  {eventDateRange}
                </strong>
              </div>
            </div>
          )}

          {financialSupport && (
            <div className="opportunity-details-page__info-item">
              <Wallet size={19} />

              <div>
                <span>
                  {t("financial_support") ||
                    "Maliyyə dəstəyi"}
                </span>

                <strong>
                  {financialSupport}
                </strong>
              </div>
            </div>
          )}

          {visaType && (
            <div className="opportunity-details-page__info-item">
              <div>
                <span>
                  {t("visa") || "Viza"}
                </span>

                <strong>
                  {visaType}
                </strong>
              </div>
            </div>
          )}

          {durationType && (
            <div className="opportunity-details-page__info-item">
              <div>
                <span>
                  {t("duration_type") ||
                    "Müddət tipi"}
                </span>

                <strong>
                  {durationType}
                </strong>
              </div>
            </div>
          )}

        </section>

        {/* ===================================================
            DESCRIPTION
        =================================================== */}

        <section className="opportunity-details-page__content">

          <div className="opportunity-details-page__description">

            <h2>
              {t("description") ||
                "Təsvir"}
            </h2>

            {translatedDescription ? (
              <div
                className="opportunity-details-page__description-text"
                dangerouslySetInnerHTML={{
                  __html:
                    translatedDescription,
                }}
              />
            ) : (
              <p>
                {t("no_description") ||
                  "Bu imkan üçün təsvir mövcud deyil."}
              </p>
            )}

          </div>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="opportunity-details-page__sidebar">

            <div className="opportunity-details-page__apply-card">

              <h3>
                {t("interested") ||
                  "Maraqlanırsınız?"}
              </h3>

              <p>
                {t("apply_description") ||
                  "Bu imkan üçün müraciət etmək istəyirsinizsə, aşağıdakı düymədən istifadə edin."}
              </p>

              <button
                type="button"
                className="opportunity-details-page__apply-btn"
                onClick={handleApply}
                disabled={!applyLink}
              >
                {t("apply") ||
                  "Müraciət et"}

                <ExternalLink size={17} />
              </button>

            </div>

          </aside>

        </section>

        {/* ===================================================
            EXTRA TAGS
        =================================================== */}

        {(escOrSalto || volunteeringType) && (
          <section className="opportunity-details-page__tags">

            {escOrSalto && (
              <span>
                {escOrSalto}
              </span>
            )}

            {volunteeringType && (
              <span>
                {volunteeringType}
              </span>
            )}

          </section>
        )}

      </div>
    </main>
  );
}