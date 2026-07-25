export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    const delta = 1

    for (let i = 0; i < totalPages; i++) {
      if (
        i === 0 ||
        i === totalPages - 1 ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...')
      }
    }
    return pages
  }

  return (
    <div className="pagination">
      <button
        className="pagination__arrow"
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Əvvəlki səhifə"
      >
        ‹
      </button>

      {getPageNumbers().map((p, idx) =>
        p === '...' ? (
          <span key={`dots-${idx}`} className="pagination__dots">…</span>
        ) : (
          <button
            key={p}
            className={`pagination__num${p === currentPage ? ' active' : ''}`}
            onClick={() => onPageChange(p)}
          >
            {p + 1}
          </button>
        )
      )}

      <button
        className="pagination__arrow"
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Növbəti səhifə"
      >
        ›
      </button>
    </div>
  )
}