
import { apiUsePediaUseAction } from '../api/index'
import {apiGetNowTime} from '../componentAPI/index'
export default {
  namespaced: true,
  state: {
    openNoteEditDialog:false,
    openCollapseNoteDialog:false,
    readOnlyCollaspseTitle:false,
    category:'',
    description:'',
    ID:'',
  },
  actions: {
    openNoteEditDialogAction({commit},boolean){
        commit('setOpenNoteEditDialog',boolean);
    },
    openCollapseNoteDialogAction({commit},boolean){
        commit('setOpenCollapseNoteDialog',boolean);
    },
    readOnlyCollaspseTitleStatus({commit},boolean){
         commit('setReadOnlyCollaspseTitleStatus',boolean);
    },
    editCategory({commit},data){
        commit('setCategory',data);
    },
    editDescription({commit},data){
        commit('setDescription',data);
    },
    editID({commit},data){
        commit('setID',data);
    },
  },
  mutations: {
    setOpenNoteEditDialog(state,boolean){
        state.openNoteEditDialog = boolean;
    },
    setOpenCollapseNoteDialog(state,boolean){
        state.openCollapseNoteDialog = boolean
    },
    setReadOnlyCollaspseTitleStatus(state,boolean){
        state.readOnlyCollaspseTitle = boolean;
    },
    setCategory(state,data){
        state.category = data;
    },
    setDescription(state,data){
        state.description =data;
    },
    setID(state,data){
        state.ID = data;
    },
  },
  getters: {
    getOpenNoteEditDialog(state){
      return state.openNoteEditDialog;
    },
    getOpenCollapseNoteDialog(state){
       return state.openCollapseNoteDialog;
    },
    getReadOnlyCollaspseTitle(state){
       return state.readOnlyCollaspseTitle;
    },
    getCategory(state){
        return state.category
    },
    getDescription(state){
        return state.description
    },
    getID(state){
        return state.ID;
    },
  },
}