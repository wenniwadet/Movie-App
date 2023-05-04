import { Tabs, Input } from 'antd'
import { SearchOutlined, StarOutlined } from '@ant-design/icons'

import MoviesList from '../MoviesList/MoviesList'

import './PageContent.css'

function PageContent({ movies, loading, error, activeTab, query, onChangeTab, onChangeQuery, windowWidth }) {
  const searchForm = (
    <Input
      className="movies__search-form"
      placeholder="Введите название фильма"
      onChange={onChangeQuery}
      prefix={<SearchOutlined style={{ marginRight: 10 }} />}
      defaultValue={query}
    />
  )

  const content = (
    <div className="movies__content">
      {activeTab === 'Search' ? searchForm : null}
      <MoviesList movies={movies} loading={loading} activeTab={activeTab} error={error} windowWidth={windowWidth} />
    </div>
  )

  const label = ['Search', 'Rated']
  const items = label.map((el, idx) => ({
    key: idx + 1,
    label: (
      <span>
        {el === 'Search' ? <SearchOutlined /> : <StarOutlined />}
        {el}
      </span>
    ),
    children: content,
  }))

  return (
    <Tabs
      activeKey={activeTab === 'Search' ? 1 : 2}
      items={items}
      onChange={onChangeTab}
      centered
      animated={{ inkBar: false }}
      size="large"
    />
  )
}

export default PageContent
