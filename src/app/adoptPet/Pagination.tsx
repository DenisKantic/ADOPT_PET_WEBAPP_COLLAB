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
    <div className="bottom-0 bg-white left-0 fixed border-t-2 border-[#2F5382] w-full flex items-center justify-center py-1">
      <button
        className="btn bg-[#2F5382] disabled:text-black disabled:bg-gray-200 text-white text-md"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        Prethodna
      </button>
      <span className="text-black text-sm px-4">
        Stranica {page} od {totalPages}
      </span>
      <button
        className="btn bg-[#2F5382] text-white disabled:text-black disabled:bg-gray-200 text-md"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Sljedeća
      </button>
    </div>
  )
}

export default Pagination
