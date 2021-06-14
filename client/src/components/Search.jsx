import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { fetchItemsBySearch } from '../redux/actions/products'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Search() {
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()
  const gender = useSelector(({ app }) => app.gender)

  const query = useQuery()
  const history = useHistory()
  const page = query.get('page') || 1
  const searchQuery = query.get('searchQuery')

  const handleVisible = () => {
    setSearchVisible(!searchVisible)
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchItems()
    }
  }

  const searchItems = (e) => {
    e.preventDefault()

    if (searchValue.trim()) {
      dispatch(fetchItemsBySearch(searchValue, gender))
      history.push(`/search?q=${searchValue || 'none'}&gender=${gender}`)
    } else {
      history.push('/')
    }
  }

  return (
    <>
      <button className="search__btn btn-reset" aria-label="Find" onClick={handleVisible}>
        <span>
          <svg version="1.1" x="0px" y="0px" viewBox="0 0 512.005 512.005">
            <g>
              <path
                d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
			S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
			c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
			 M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"
              />
            </g>
          </svg>
        </span>
        <input type="text" placeholder="Искать здесь" />
      </button>
      {searchVisible && (
        <div className="search">
          <div className="search__top search-top">
            <Link to="/" className="search-top__link logo">
              Denim
            </Link>
            <button className="search-top__link btn-reset" onClick={handleVisible}>
              <svg
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                width="16px"
                height="16px"
                viewBox="0 0 357 357">
                <g id="close">
                  <polygon
                    points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 
				214.2,178.5"
                  />
                </g>
              </svg>
            </button>
          </div>
          <form className="search-form" onSubmit={searchItems}>
            <input
              type="search"
              placeholder="Поиск"
              className="search-form__input"
              onKeyPress={handleKeyPress}
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
            />

            <button type="submit" className="search-form__btn btn-reset">
              <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512.005 512.005">
                <g>
                  <path
                    d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
			S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
			c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
			 M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"
                  />
                </g>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Search
