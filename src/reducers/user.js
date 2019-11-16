export const INIT_USER = {
  data: null,
  token: null,
};

export const setUserReducer = (global, dispatch, action) => ({
  user: {
    data: action.data,
    token: action.token,
  },
});

export const cleanUserReducer = () => ({
  user: {
    data: null,
    token: null,
  },
});
