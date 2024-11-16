import {
  combineReducers,
  configureStore,
  // createImmutableStateInvariantMiddleware,
} from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/auth.slice";
import { depositeReducer } from "../features/deposite/deposite.slice";
import { networkReducer } from "../features/network/network.slice";
import { currencyReducer } from "../features/currency/currency.slice";
import { withdrawlReducer } from "../features/withdrawl/withdrawl.slice";
import { tradeReducer } from "../features/trade/trade.slice";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";
// import { currencyReducer } from "../features/currency/currency.slice";
// import { networkReducer } from "../features/network/network.slice";
// import { depositeReducer } from "../features/deposite/deposite.slice";
// const persistConfig = {
//   key: "root",
//   storage,
// };

// const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
//   ignoredPaths: ["ignoredPath", "ignoredNested.one", "ignoredNested.two"],
// });

const combineReducer = combineReducers({
  auth: authReducer,
  desposite: depositeReducer,
  network: networkReducer,
  currency: currencyReducer,
  withdrawl: withdrawlReducer,
  trade: tradeReducer,
});

// const persistedReducer = persistReducer(persistConfig, combineReducer);

const store = configureStore({
  reducer: combineReducer,

  // reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
// export const persistor = persistStore(store);
