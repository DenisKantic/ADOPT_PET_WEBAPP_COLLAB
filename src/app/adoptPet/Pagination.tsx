// Pagination.tsx
import React from 'react'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="bottom-0 left-0 fixed bg-red-400 w-full flex items-center justify-center py-1">
      <button
        className="btn btn-secondary disabled:text-black disabled:bg-pink-200 text-black text-md"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        Prethodna
      </button>
      <span className="text-black text-sm px-4">
        Stranica {page} od {totalPages}
      </span>
      <button
        className="btn btn-primary text-black disabled:text-black disabled:bg-pink-200 text-md"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Sljedeća
      </button>
    </div>
  )
}

export default Pagination
