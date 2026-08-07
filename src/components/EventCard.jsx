import {
  ArrowRight,
  Clock3,
  MapPin,
  Wifi,
  Building2,
  BadgeDollarSign,
  Gift,
} from "lucide-react";

import { useLanguage } from "../hooks/useLanguage";

const ArrowIcon = () => (
  <ArrowRight size={17} strokeWidth={1.8} />
);

const ClockIcon = () => (
  <Clock3 size={16} strokeWidth={1.8} />
);

const PinIcon = () => (
  <MapPin size={16} strokeWidth={1.8} />
);

export default function EventCard({ event }) {
  const {
    title,
    category,
    emoji,
    type,
    date,
    time,
    location,
    price,
    priceAmount,
  } = event;

  const { t } = useLanguage();

  return (
    <div className="event-card">

      <div className="event-card__header">
        <div className="event-card__emoji">
          {emoji}
        </div>

        <div className="event-card__date">
          <span className="event-card__date-day">
            {date.day}
          </span>

          <span className="event-card__date-month">
            {date.month}
          </span>
        </div>

        <span
          className={`event-card__type-badge event-card__type-badge--${type}`}
        >
          {type === "online" ? (
            <>
              <Wifi size={14} strokeWidth={1.8} />
              {t("event_online")}
            </>
          ) : (
            <>
              <Building2 size={14} strokeWidth={1.8} />
              {t("event_offline")}
            </>
          )}
        </span>
      </div>

      <div className="event-card__body">
        <div className="event-card__category">
          {category}
        </div>

        <h3 className="event-card__title">
          {title}
        </h3>

        <div className="event-card__info">
          <div className="event-card__info-row">
            <ClockIcon />
            <span>{time}</span>
          </div>

          <div className="event-card__info-row">
            <PinIcon />
            <span>{location}</span>
          </div>
        </div>
      </div>

      <div className="event-card__footer">
        <span
          className={`event-card__price${
            price === "Pulsuz"
              ? " event-card__price--free"
              : ""
          }`}
        >
          {price === "Pulsuz" ? (
            <>
              <Gift size={16} strokeWidth={1.8} />
              {t("event_free")}
            </>
          ) : (
            <>
              <BadgeDollarSign size={16} strokeWidth={1.8} />
              {priceAmount}
            </>
          )}
        </span>

        <span className="event-card__register">
          {t("event_register")}
          <ArrowIcon />
        </span>
      </div>

    </div>
  );
}

