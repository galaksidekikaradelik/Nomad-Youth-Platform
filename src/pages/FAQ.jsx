import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'


const FAQ_KEYS = [
  { qKey: 'faq_q1', aKey: 'faq_a1' },
  { qKey: 'faq_q2', aKey: 'faq_a2' },
  { qKey: 'faq_q3', aKey: 'faq_a3' },
  { qKey: 'faq_q4', aKey: 'faq_a4' },
  { qKey: 'faq_q5', aKey: 'faq_a5' },
  { qKey: 'faq_q6', aKey: 'faq_a6' },
  { qKey: 'faq_q7', aKey: 'faq_a7' },
]

function FAQItem({ question, answer, isOpen, onToggle, itemRef }) {
  return (
    <div className="faq-item" ref={itemRef}>
      <button
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className={`faq-icon${isOpen ? ' faq-icon--open' : ''}`}>
          +
        </span>
      </button>
      <div className={`faq-answer${isOpen ? ' faq-answer--open' : ''}`}>
        <p>{answer}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)
  const [searchParams] = useSearchParams()
  const itemRefs = useRef([])

  useEffect(() => {
    const qParam = searchParams.get('q')
    if (qParam) {
      const idx = parseInt(qParam, 10) - 1
      if (idx >= 0 && idx < FAQ_KEYS.length) {
        setOpenIndex(idx)
        setTimeout(() => {
          itemRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100)
      }
    }
  }, [searchParams])

  return (
    <div className="section">
      <div className="container">

        <div className="page-header">
          <div className="page-header__eyebrow">{t('faq_eyebrow')}</div>
          <h1 className="page-header__title">{t('faq_title')}</h1>
          <p className="page-header__desc">{t('faq_desc')}</p>
        </div>

        <div className="faq-list">
          {FAQ_KEYS.map((item, i) => (
            <FAQItem
              key={item.qKey}
              itemRef={el => (itemRefs.current[i] = el)}
              question={t(item.qKey)}
              answer={t(item.aKey)}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

      </div>
    </div>
  )
}