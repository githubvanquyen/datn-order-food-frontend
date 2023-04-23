import {configureStore} from "@reduxjs/toolkit"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slide/authSlide"
import productSlide from "./slide/productSlide";
import orderSlider from "./slide/orderSlider";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };

  const rootReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer:{
        auth: rootReducer,
        product: productSlide,
        order: orderSlider
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export let persistor = persistStore(store);
export default store;