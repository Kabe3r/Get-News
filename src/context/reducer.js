import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true}
      case SET_STORIES:
        return {
          ...state,
          loading: false,
          news: action.payload.news,
          noOfPages: action.payload.noOfPages
        }
        case REMOVE_STORY:
          return {
            ...state,
            news: state.news.filter(story => story.objectID !== action.payload)
          }
          case HANDLE_SEARCH:
            return { ...state, query: action.payload, page: 0}
          case HANDLE_PAGE:
              if (action.payload === 'increase') {
                let nextPage = state.page + 1;
                if (nextPage > state.noOfPages - 1) {
                  nextPage = 0;
                }
                return { ...state, page: nextPage};
              }
              if (action.payload === 'decrease') {
                let prevPage = state.page - 1;
                if (prevPage < 0) {
                  prevPage = state.noOfPages - 1;
                }
                return { ...state, page: prevPage};
              }
        // eslint-disable-next-line no-fallthrough
        default:
          throw new Error (`no matching "${action.type}" action.type`)
  }
}
export default reducer
