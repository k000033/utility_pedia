
import { apiUsePediaUseAction,apiUseHeaderEditAction,apiUseNotionAction,apiUseMarkAction } from '../api/index'
import {apiGetNowTime} from '../componentAPI/index'
export default {
  namespaced: true,
  state: {
    subscription: [],
    openEditDialog: false,
    title:'',
    description:'',
    leavelType:'',
    objectName:'',
    DB:'',
    schema:'',
    object:'',
    objectLevel:''
  },
  actions: {
    pediaUserAction({ commit }, params) {
      return apiUsePediaUseAction(params).then((res) => {
        console.log('------------------------------------------------');
        console.log('-- pediaAction() start ::: ' + apiGetNowTime());
        console.log('-- Table length ::: ' + res.data.data.length);
        console.log('-- data error ::: ' + res.data.msg);
        console.log('-- pediaAction() end ::: ' + apiGetNowTime());
        console.log('------------------------------------------------');
        return res.data;
      }).catch((err) => {

      });
    },
    EditNoticeAction({commit},params){
      return apiUseNotionAction(params).then((res)=>{
        console.log('------------------------------------------------');
        console.log('-- pediaAction() start ::: ' + apiGetNowTime());
        console.log('-- Table length ::: ' + res.data.data.length);
        console.log('-- data error ::: ' + res.data.msg);
        console.log('-- pediaAction() end ::: ' + apiGetNowTime());
        console.log('------------------------------------------------');
        return res.data;
      });
    },
    openEditDialogAction({ commit }, boolen) {
      commit('setOpenEditDialog', boolen);
    },
    headerEditAction({commit},params){
      return apiUseHeaderEditAction(params).then((res)=>{
        console.log('------------------------------------------------');
        console.log('-- pediaAction() start ::: ' + apiGetNowTime());
        console.log('-- Table length ::: ' + res.data.data.length);
        console.log('-- data error ::: ' + res.data.msg);
        console.log('-- pediaAction() end ::: ' + apiGetNowTime());
        console.log('------------------------------------------------');
           console.log(res);
           return res.data;
      }) 
    },
    editMarkAction({commit},params){
      return apiUseMarkAction(params).then((res)=>{
        //type = 1 訂閱
        if(params.TYPE==1){
          commit('setSubscription',res.data);
          return res.data;
        }
      })
    },
    editTitle({commit},title){
      commit('setTitle',title);
    },
    editDescription({commit},description){
      commit('setDescription',description);
    },
    editLeavelType({commit},leavelType){
      commit('setLeavelType',leavelType);
    },
    editObjectName({commit},objectName){
      commit('setObjectName',objectName);
    },
    editObject({commit},object){
      commit('setObject',object);
    },
    editDB({commit},DB){
      commit('setDB',DB);
    },
    editSchema({commit},schema){
      commit('setSchema',schema);
    },
    editObjectLevel({commit},objectLevel){
      commit('setObjectLevel',objectLevel);
    }
  },
  mutations: {
    setOpenEditDialog(state, boolen) {
      state.openEditDialog = boolen;
    },
    setTitle(state,title){
       state.title = title;
    },
    setDescription(state,description){
      state.description = description;
    },
    setLeavelType(state,leavelType){
      state.leavelType = leavelType;
    },
    setObjectName(state,objectName){
      state.objectName = objectName;
    },
    setSubscription(state,data){
      state.subscription =data;
    },
    setObject(state,object){
      state.object = object;
    },
    setDB(state,DB){
      state.DB = DB;
    },
    setSchema(state,schema){
      state.schema = schema;
    },
    setObjectLevel(state,objectLevel){
      state.objectLevel = objectLevel;
    }
  },
  getters: {
    getOopnEditDialog(state) {
      return state.openEditDialog;
    },
    getTitle(state){
      return state.title;
    },
    getDescription(state){
      return state.description;
    },
    getLevelType(state){
      return state.leavelType;
    },
    getObjectName(state){
      return state.objectName;
    },
    getSubscription(state){
      return state.subscription;
    },
    getObject(state){
     return state.object;
    },
    getDB(state){
     return state.DB ;
    },
    getSchema(state){
      return state.schema ;
    },
    getObjectLevel(state){
      return state.objectLevel;
    }
  },
}