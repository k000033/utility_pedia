import { createStore } from 'vuex'
import { apiUsePediaAction,apiUseExternalDependencyAction,apiUseRegisterAction,apiUseGetUIDAction } from '../api/index'
import HeaderEdit from './HeaderEdit'
import NoteEdit from './NoteEdit'
import SearchAction from './SearchAction'
import Manager from './Manager'
import ColumnEdit from './ColumnEdit'
import {apiGetNowTime} from '../componentAPI/index'
export default createStore({
  state: {
    //dataSet
    detial: [],
    noteData:[],
    collapsetTitle: [],
    collapse: [],
    hostTableData:[],
    objectTableData:[],
    parameter:[],
    sqlScript:[],
    // dataSet end

    objectTableType:'',
    loading:true,

    //相依性
    localDependency:[],
    externalDependency:[],
    //相依性 end
    uid:'',
    // 搜尋畫面
    // isSearchView:false,
    currentView:'body',
    // 搜尋畫面 end

    // 側邊欄位開關
    openSiderBar:false,
   
  },
  actions: {
    pediaAction({ commit,state }, params) {
      // state.loading = true;
      return apiUsePediaAction(params).then((res) => {
        console.log('------------------------------------------------');
        console.log('-- pediaAction() start ::: ' + apiGetNowTime());
        console.log('-- Table length ::: ' + res.data.data.length);
        console.log('-- data error ::: ' + res.data.msg);
        console.log('-- pediaAction() end ::: ' + apiGetNowTime());
        console.log('------------------------------------------------');
        if (params.NOTES_ID == "") {
          commit('setDetail', res.data.dataSet.Table);
          commit('setNoteData',res.data.dataSet.Table1);
          commit('setHostTableData',res.data.dataSet.Table2);
          commit('setParameter', res.data.dataSet.Table3);
          commit('setObjectTableData',res.data.dataSet.Table4);
          commit('setSQL_Script', res.data.dataSet.Table5);
          commit('setCollapse', res.data.dataSet.Table6);
          commit('setLocalDependency', res.data.dataSet.Table7);
          return res.data;
        } else {
          return res.data;
        }

      }).catch((err) => {

      })
    },
    DrawTableData({ commit }, params) {
      return apiUsePediaAction(params).then((res) => { 
        console.log('------------------------------------------------');
        console.log('-- pediaAction() start ::: ' + apiGetNowTime());    
        console.log('-- Table length ::: ' + res.data.data.length);
        console.log('-- data error ::: ' + res.data.msg);
        console.log('-- pediaAction() end ::: ' + apiGetNowTime());
        console.log('------------------------------------------------');
          return res.data;

      }).catch((err) => {

      })
    },
    loadingSatatusAction({commit},boolen){
       commit('setIsloading',boolen);
    },
    getExternalDependency({commit},params){
      apiUseExternalDependencyAction(params).then((res)=>{
        console.log('------------------------------------------------');
        console.log('-- getExternalDependency() start ::: ' + apiGetNowTime());    
        console.log('-- Table length ::: ' + res.data.data.length);
        console.log('-- data error ::: ' + res.data.msg);
        console.log('-- getExternalDependency() end ::: ' + apiGetNowTime());
        console.log('------------------------------------------------');
        commit('setExternalDependency',res.data);
        return res.data;
      });
    },
    registerAction({commit},params){
      return apiUseRegisterAction(params).then((res)=>{
        console.log('------------------------------------------------');
        console.log('-- getExternalDependency() start ::: ' + apiGetNowTime());    
        console.log('-- Table length ::: ' + res.data.data.length);
        console.log('-- data error ::: ' + res.data.msg);
        console.log('-- getExternalDependency() end ::: ' + apiGetNowTime());
        console.log('------------------------------------------------');
        return res.data;
      });
    },
    setUIDAction({commit},data){
      commit('setUID',data)
    },
    // editSearchView({commit},bollean){
    //   commit('setIsSearchView',bollean);
    // },
    setOpenSiderBarAction({commit},booleam){
      commit('setOpenSiderBar',booleam);
    },
    setCurrentViewAction({commit},viewString){
      commit('setCurrentVuew',viewString);
    },
    getUIDAction({commit},params){
      return apiUseGetUIDAction(params).then((res)=>{
           return res.data;
      });
    }
  },
  mutations: {
    setDetail(state, data) {
      
      
      data[0].SUBSCRIBE = data[0].REFERENCE_TYPE %5==0
      data[0].COLLAPSE = data[0].REFERENCE_TYPE %3==0
      data[0].MANAGER = data[0].REFERENCE_TYPE %2==0
      state.detial = data;
      // 
    },
    setCollapse(state, data) {
      state.collapse = data;
      if (data.length > 0) {
        data.forEach(item => {
          var isExist = state.collapsetTitle.includes(item.CATEGORY);
          if (!isExist) {
            state.collapsetTitle.push(item.CATEGORY);
          };
        })
      };
    },
    setNoteData(state, data) {
      state.noteData = data;
    },
    setHostTableData(state,data){
      state.hostTableData = data;
    },
    setObjectTableData(state,data){
      state.objectTableData = data;
      if(data.length>0)
      {
        state.objectTableType =  data[0].QUERY_TYPE;
      }
    },
    setIsloading(state , boolen){
      state.loading = boolen;
    },
    setParameter(state,data){
      state.parameter = data;
    },setSQL_Script(state,data){
      state.sqlScript =data;
    },
    setLocalDependency(state,data){
      state.localDependency = data;
    },
    setExternalDependency(state,data){
      state.externalDependency = data.data;
    },setUID(state,data){
      state.uid = data;
    },
    // setIsSearchView(state,boolean){
    //   state.isSearchView = boolean;
    // },
    setOpenSiderBar(state,boolean){
      state.openSiderBar = boolean;
    },
    setCurrentVuew(state,viewString){
      state.currentView= viewString;
    }
  },
  getters: {
    getDetail(state) {
      return state.detial;
    },
    getCollapseTitle(state) {
      return state.collapsetTitle;
    },
    getCollapse(state) {
      return state.collapse;
    },
    getTables(state) {
      return state.Tables;
    },
    getNoetData(state){
      return state.noteData;
    },
    gotHostTableData(state){
      return state.hostTableData;
    },
    getObjectTableData(state){
      return state.objectTableData;
    },
    getObjectTableType(state){
      return state.objectTableType;
    },
    getLoading(state){
      return state.loading;
    },
    getParameter(state){
      return state.parameter;
    },
    getSQL_Script(state){
      return state.sqlScript;
    },
    getLocalDependency(state){
      return state.localDependency;
    },
    getExternalDependency(state){
      return state.externalDependency;
    },
    getUID(state){
      return state.uid;
    },
    // getIsSearchView(state){
    //   return state.isSearchView;
    // },
    getOpenSiderBar(state){
      return state.openSiderBar;
    },
    getCurrentVuew(state){
      return state.currentView;
    }
  },
  modules: {
    HeaderEdit,NoteEdit,SearchAction,Manager,ColumnEdit
  }
  
})
