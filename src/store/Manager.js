import { apiUseManagerAction } from '../api/index'
import { apiGetNowTime } from '../componentAPI/index'
export default {
    namespaced: true,
    state: {
        topList: [],
        underList: [],
        by_object :0
    },
    actions: {
        fetchManagersData({ commit }, params) {
            return apiUseManagerAction(params).then((res) => {
                console.log('------------------------------------------------');
                console.log('-- fetchManagersData() start ::: ' + apiGetNowTime());
                console.log('-- Table length ::: ' + res.data.data.length);
                console.log('-- data error ::: ' + res.data.msg);
                console.log('-- fetchManagersData() end ::: ' + apiGetNowTime());
                console.log('------------------------------------------------');
                if (params.BY_OBJECT == 0){
                    if (params.USER_ID == "") {
                        commit('setTopList', res.data);
                    } else {
                        commit('setUnderList', res.data);
                    } 

                }else if(params.BY_OBJECT == 1){
                    if (params.UID == "") {
                        commit('setTopList', res.data);
                    } else {
                        commit('setUnderList', res.data);
                    } 
                }

                return res.data;
            })
        },
        setBy_ObjectAction({commit},type){
            commit('setBy_Object',type);
        },
        setManagerAction({commit},params){
            return apiUseManagerAction(params).then((res) => {
                console.log('------------------------------------------------');
                console.log('-- setManagerAction() start ::: ' + apiGetNowTime());
                console.log('-- Table length ::: ' + res.data.data.length);
                console.log('-- data error ::: ' + res.data.msg);
                console.log('-- setManagerAction() end ::: ' + apiGetNowTime());
                console.log('------------------------------------------------');
                return res.data;
            })
        }
    },
    mutations: {
        setTopList(state, data) {
            state.topList = data;
        },
        setUnderList(state, data) {
            state.underList = data;
        },
        setBy_Object(state,type){
            state.by_object = type;
        }
    },
    getters: {
        getTopList(state) {
            return state.topList;
        },
        getUnderList(state) {
            return state.underList;
        },
        getBy_Object(state){
            return state.by_object;
        }
    },
}