import { combineReducers, configureStore } from "@reduxjs/toolkit";
//redux는 상태를 관리하는 라이브러리이지만, 상태 자체는 javascript객체 형태로 저장된다
//이 객체들은 직렬화가 가능해야 상태를 브라우저 스토리지에 저장하거나 네트워크를 통해서 전송할 수 있다
import userReducer from './userSlice';
import {FLUSH,REHYDRATE,PAUSE,PURGE,REGISTER,persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage';


//서로 다른 리듀싱 함수들을 값으로 가지는 객체를 받아서 createStore에 넘길 수 있는 하나의 리듀싱 함수로 변환
const rootReducer = combineReducers({
    //여러 reducer들을 하나의 reducer로 합쳐준다
        user : userReducer
    });




const persistConfig = {
    //리덕스 스토어 안에 있는 데이터를 로컬 스토리지나 세션 스토리지 중 어디다가 저장을 할지를 위한 부분
    //그냥 로컬스토리지에 저장할거면, storage에 저장하면 된다
        key : 'root', //로컬스토리지에 저장할 때 그 key의 이름을 설정하는 부분
        storage, //localStorage에 저장한다
        //whitelist : [], //여러 reducer 중에 해당 reducer만 localstorage에 저장
        //blacklist : [] //blacklist -> 그것만 제외
    };



const persistedReducer = persistReducer(persistConfig, rootReducer)
//persistConfig랑 rootReducer를 넣어서 persistReducer로 변환을 해주고 그걸 configureStore에 넣는다

/*
action이 미들웨어에서 사용되는 경우 작업에 Symbols, promise 또는 기타 직렬화할 수 없는 값을 사용해도 된다
action은 실제로 스토어에 도달하고 리듀서에 전달될 때까지만 직렬화 가능하면 된다
*/

//redux persist를 사용할 때만 serializable check를 하지 않게 하려면, 
export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware(
        {
            serializableCheck:{
                ignoredActions : [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER]
                //redux persist를 할 때 사용하는 타입들을 적어주자! 해당 타입들이 action에 올때만 serializableCheck를 ignore해주자
            }
        }
    )
})

export const persistor = persistStore(store);