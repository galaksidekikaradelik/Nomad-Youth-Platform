import { useState } from 'react'

const FAQS = [
  {
    q: 'Erasmus+ nədir?',
    a: 'Erasmus+ Avropa İttifaqının təhsil, gənclər və idman sahəsində maliyyələşdirdiyi proqramdır. Bu proqram çərçivəsində gənclər xaricdə təhsil ala, könüllü fəaliyyətlərdə iştirak edə və ya təlim kurslarına qatıla bilər — əksər hallarda gediş-gəliş, yaşayış və qidalanma xərcləri qismən və ya tam ödənilir.',
  },
  {
    q: 'Youth Exchange (Gənclər Mübadiləsi) nədir?',
    a: 'Youth Exchange — müxtəlif ölkələrdən olan gənc qruplarının bir araya gəlib, ortaq mövzu ətrafında bir neçə gün birgə fəaliyyət göstərdiyi qısamüddətli layihədir. Məqsəd mədəniyyətlərarası ünsiyyət, komanda işi və yeni bacarıqlar qazanmaqdır. Adətən yaş həddi 13-30 arasında dəyişir və iştirak demək olar ki, pulsuzdur.',
  },
  {
    q: 'CV necə hazırlanır?',
    a: 'Yaxşı CV qısa, aydın və konkret olmalıdır — adətən 1 səhifə kifayətdir. Əsas bölmələr: şəxsi məlumat, təhsil, iş/könüllülük təcrübəsi, bacarıqlar və dillər. Hər təcrübəni nəticə yönümlü ifadə et (nə etdin, hansı nəticəyə gətirib çıxardı). Nomad Youth-un "CV Hazırlanması" xidməti vasitəsilə bu prosesdə peşəkar dəstək ala bilərsən.',
  },
  {
    q: 'Motivation Letter (Motivasiya Məktubu) nədir?',
    a: 'Motivasiya məktubu — müraciət etdiyin layihəyə niyə uyğun olduğunu və nə üçün məhz bu imkanı seçdiyini izah edən qısa mətndir. Adətən niyə maraqlandığını, hansı bacarıq və təcrübəyə malik olduğunu və layihədən nə gözlədiyini əhatə edir. Şablon mətn əvəzinə şəxsi və konkret nümunələr istifadə etmək daha effektlidir.',
  },
  {
    q: 'İlk dəfə necə müraciət etməliyəm?',
    a: 'Əvvəlcə "İmkanlar" səhifəsində maraqlandığın sahəni (kateqoriya, format, ölkə) filtrlə tap. Layihənin təsvirini diqqətlə oxu, tələb olunan sənədləri (CV, motivasiya məktubu və s.) hazırla və "Müraciət et" düyməsi ilə təşkilatın öz müraciət formuna keç. Əmin deyilsənsə, "Xidmətlər" bölməsindən müraciət dəstəyi ala bilərsən.',
  },
]

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={onToggle}>
        <span>{item.q}</span>
        <span className={`faq-icon${isOpen ? ' faq-icon--open' : ''}`}>+</span>
      </button>
      <div className={`faq-answer${isOpen ? ' faq-answer--open' : ''}`}>
        <p>{item.a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="section">
      <div className="container">

        <div className="page-header">
          <div className="page-header__eyebrow">Kömək</div>
          <h1 className="page-header__title">Tez-tez Verilən Suallar</h1>
          <p className="page-header__desc">
            Erasmus+, müraciət prosesi və platformadan istifadə haqqında ən çox soruşulan suallar.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((item, i) => (
            <FAQItem
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

      </div>
    </div>
  )
}