import { Pagination } from 'antd'

import './MoviePagination.css'

function MoviePagination({ totalMovies, onChangePage, currentPage }) {
  return (
    <Pagination
      className="movies__pagination"
      total={totalMovies}
      pageSize={20}
      onChange={onChangePage}
      current={currentPage}
      hideOnSinglePage
      showSizeChanger={false}
    />
  )
}

export default MoviePagination
