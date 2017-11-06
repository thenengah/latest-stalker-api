export default (state, action) => {
  switch(action.type) {
    case '@@redux/INIT':
      return {
        ...state,
        latest: {}
      } 
    case 'FILE':
      return {
        ...state,
        dependency: action.dependency
      }
    case 'LATEST':
      return {
        ...state,
        latest: {
          ...state.latest,
          [action.body.name] : action.body.version
        } 
      }
    case 'REFRESH':
      return {
        ...state,
        dependency: null,
        latest: {} 
      }
  }
}
