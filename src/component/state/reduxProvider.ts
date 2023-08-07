// // Provider
// import { Provider } from "react-redux";
// // import { rootReducer, bindMiddleware } from "@/state/global/redux/reducer";
// import rootReducer from "../../store/rootReducer";
// import { createStore } from "redux";
// // import createSagaMiddleware from "redux-saga";
// import { initialState } from "../../store/column/column.reducer";

// /**
//  *
//  * @param {*} _context
//  * @param {*} state  to add values to initial state
//  * @returns a mock store instance
//  */
// export const makeStore = (_context: any, state: any) => {
//   //   const saga = createSagaMiddleware();
//   const store = createStore(
//     rootReducer,
//     { ...initialState, ...state }
//     // bindMiddleware([saga])
//   );
//   // store.sagaTask = saga.run(rootSaga) disabled sagas as they are not required for our current use case

//   return store;
// };

// const ReduxProviderTest = ({ children, store = {} }) => (
//   <Provider store={makeStore(null, store)}>{children}</Provider>
// );

// export default ReduxProviderTest;
