import React from "react";

export const initState = { isLoading: false, isLogin: false, topicLabel: [] };

export const ContextStore = React.createContext(initState);

export const combineReducers = (slices) => (state, action) =>
  Object.keys(slices).reduce(
    // use for..in loop, if you prefer it
    (acc, prop) => ({
      ...acc,
      [prop]: slices[prop](acc[prop], action),
    }),
    state
  );

export function loadingReducer(state, action) {
  console.log("loadingReducer", state, action);
  switch (action.type) {
    case "SET_LOADING":
      console.log(state, action);
      return Object.assign({}, state, {
        isLoading: true,
      });
    case "SET_FINISHED":
      console.log(state, action);
      return Object.assign({}, state, {
        isLoading: false,
      });
    default:
      return state;
  }
}

export function loginReducer(state, action) {
  let storage = window.localStorage;
  console.log('storage',storage)
  switch (action.type) {
    case "LOGIN":
      
      storage.login = 'true';
      return Object.assign({}, state, {
        isLogin: true,
      });
    case "LOGOUT":
      storage.login = 'false';
      return Object.assign({}, state, {
        isLogin: false,
      });

    default:
      return state;
  }
}

export function topicLabelReducer(state, action) {
  console.log("topicLabelReducer", state, action);
  switch (action.type) {
    case "ADD_TOPICLABEL":
      return Object.assign([], state.concat(action.id));

    default:
      return state;
  }
}
