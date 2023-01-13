import React, { useContext, useEffect, useReducer } from 'react'

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'
import reducer from './reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const initialState = {
  loading: true,
  query: 'javascript',
  news: [],
  page: 0,
  noOfPages: 0,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchNews = async (url) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({ 
        type: SET_STORIES,
        payload: { news: data.hits, noOfPages: data.nbPages }
      })
    } catch (error) {
      console.log(error);
    }
  }

  const removeStory = (id) => {
    dispatch({  type: REMOVE_STORY, payload: id })
  }

  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query})
  }

  const handlePage = (num) => {
    dispatch({  type: HANDLE_PAGE, payload: num })
  }

  useEffect(() => {
   fetchNews(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);

  return <AppContext.Provider value={{ 
    ...state, 
    removeStory,
    handlePage,
    handleSearch
    }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
