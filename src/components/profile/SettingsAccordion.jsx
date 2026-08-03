export default function SettingsAccordion({ title, isOpen, onToggle, children }) {
  return (
    <div className="faq-item settings-accordion">
      <button className="faq-question" onClick={onToggle} aria-expanded={isOpen}>
        <span>{title}</span>
        <span className={`faq-icon${isOpen ? ' faq-icon--open' : ''}`} aria-hidden="true">+</span>
      </button>
      <div className={`faq-answer${isOpen ? ' faq-answer--open' : ''}`}>
        <div className="settings-accordion__content">
          {children}
        </div>
      </div>
    </div>
  );
}