import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import questionReducer from "./slices/questionSlicer";
import clientReducer from "./slices/clientSlicer";
import resolvedQuestionnaireReducer from "./slices/resolvedQuestionnaireSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  user: userReducer,
  questions: questionReducer,
  resolvedQuestionnaire: resolvedQuestionnaireReducer,
  clientList: clientReducer
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store)