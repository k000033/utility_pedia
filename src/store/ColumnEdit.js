import { apiUseHeaderEditAction} from '../api/index'
import {apiGetNowTime} from '../componentAPI/index'
export default {
  namespaced: true,
  state: {
    openEditDialog: false,
    description:'',
    columnName:'',
    object:''
  },
  actions: {
     openDialogAction({commit},booleam){
        commit('openDialog',booleam);
     },
     editDescriptionAction({commit},text){
        commit('editDescription',text);
     },
     setColumnNameAction({commit},text){
        commit('setColumnName',text);
     },
     editColumnDesAction({commit},data){
        return apiUseHeaderEditAction(data).then((res)=>{
            console.log('------------------------------------------------');
            console.log('-- editColumnDesAction() start ::: ' + apiGetNowTime());
            console.log('-- Table length ::: ' + res.data.data.length);
            console.log('-- data error ::: ' + res.data.msg);
            console.log('-- editColumnDesAction() end ::: ' + apiGetNowTime());
            console.log('------------------------------------------------');
            console.log(res.data);
            return res.data;
        })
     }
  },
  mutations: {
    openDialog(state,booleam){
        state.openEditDialog = booleam;
    },
    editDescription(state,text){
        state.description = text;
    },
    setColumnName(state,text){
        state.columnName = text;
    }
  },
  getters: {
    getOpenDilaog(state){
        return state.openEditDialog;
    },
    getDescription(state){
        return state.description;
    },
    getColumnName(state){
        return state.columnName;
    }
  },
}