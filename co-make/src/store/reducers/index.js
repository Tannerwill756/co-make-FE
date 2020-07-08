import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { mainReducer } from './mainReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['mainReducer']
}

const rootReducer = combineReducers({ mainReducer })

export default persistReducer(persistConfig, rootReducer);