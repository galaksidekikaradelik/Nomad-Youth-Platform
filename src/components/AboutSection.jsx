import { t } from '../data/translations'

export default function AboutSection({
  description,
  location,
  email,
  phone,
  website,
}) {
  return (
    <section className="organization-details__section">
      <h2 className="organization-details__heading">
        {t('org_about_title')}
      </h2>

      <p>{description || 'Bu təşkilat haqqında məlumat yoxdur.'}</p>

      <div className="organization-details__contact">
        <h3>{t('org_contact_title')}</h3>

        {location && (
          <div className="organization-details__contact-item">
            <span>📍</span>
            <span>{location}</span>
          </div>
        )}

        {email && (
          <a
            href={`mailto:${email}`}
            className="organization-details__contact-item"
          >
            <span>✉</span>
            <span>{email}</span>
          </a>
        )}

        {phone && (
          <a
            href={`tel:${phone}`}
            className="organization-details__contact-item"
          >
            <span>☎</span>
            <span>{phone}</span>
          </a>
        )}

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="organization-details__contact-item"
          >
            <span>🌐</span>
            <span>Website</span>
          </a>
        )}
      </div>
    </section>
  )
}
