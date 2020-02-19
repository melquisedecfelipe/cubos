const INITIAL_STATE = {
  films: [],
};

// TYPES
export const Types = {
  GET_ALL_FILMS: 'films/GET_ALL_FILMS',
  SET_STORAGE_FILMS: 'films/SET_STORAGE_FILMS',
};

// REDUCERS
export default function item(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_ALL_FILMS:
      return {
        ...state,
        films: action.films,
      };
    case Types.SET_STORAGE_FILMS:
      localStorage.setItem('films', JSON.stringify(action.films));
      return {
        ...state,
        films: action.films,
      };
    default:
      return state;
  }
}

// ACTIONS
export const Creators = {
  getAll: films => ({
    type: Types.GET_ALL_FILMS,
    films,
  }),
  setFilms: films => ({
    type: Types.SET_STORAGE_FILMS,
    films,
  }),
};
