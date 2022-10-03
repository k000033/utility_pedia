import { apiUseSearchAction } from '../api/index'
export default {
    namespaced: true,
    state: {
        searchResult: [],
        severdata: [],
        searchMsg: [],
        currentReslut: [],
        pageCount: 0,
        currentPage: 1,
        pageSize: 12,
        dataTotol: 0,
        // 一般搜尋，較大搜尋，最大搜尋
        searchType: '2',
        // 紀錄按下哪種搜尋按鈕
        currentBtnSearch:0,
        // 紀錄搜尋欄位文字
        searchText:'',
        currentTabText:'ALL'
    },
    actions: {
        // 取得搜尋資料
        fetchSearchResult({ commit }, params) {
            return apiUseSearchAction(params).then((res) => {
                console.log(res.data);
                commit('setSearchResult', res.data.dataSet.Table);
                commit('setSeverData', res.data.dataSet.Table1);
                commit('setSearchMsg', res.data.dataSet.Table2);
                commit('setDataTotol', res.data.dataSet.Table);
                return res.data;
            });
        },
        // 清除搜尋結果
        claerSearchResult({ commit }) {
            commit('clrSearhResult');
        },
        // 設定當前頁籤
        setCurrentPageAction({ commit }, currentPage) {
            commit('setCurrentPage', currentPage);
        },
        // 取得當前頁籤的筆數資料
        setCurrentReslutAction({ commit }) {
            commit('setCurrentReslut');
        },
        // 設定搜尋範圍
        setSearchTypeAction({ commit }, type) {
            commit('setSearchType', type);
        },
        setCurrentBtnSearchAction({commit},type){
            commit('setCurrentBtnSearch',type);
        },
        setSearchTextAction({commit},text){
            commit('setSearchText',text);
        },
        setCurrentTabAction({commit},tabText){
            commit('setCurrentTabText',tabText);
        }
    },
    mutations: {
        setSearchResult(state, data) {
            state.searchResult = data;
            //return array.slice((page_number - 1) * page_size, page_number * page_size);
            // const arr = data.slice((state.currentPage-1)*state.pageSize,state.currentPage * state.pageSize)
            // state.searchResult = arr    ;
        },

        clrSearhResult(state) {
            state.searchResult = []; //清空搜尋的結果
            state.currentReslut = []; //清空當前頁籤的資料
            state.severdata = []; //清空sever 資料
            state.searchMsg = []; //清空錯誤訊息
            state.currentPage =1;
        }, setSeverData(state, data) {
            state.severdata = data;
        },
        setSearchMsg(state, data) {
            state.searchMsg = data;
        },
        setPageCount(state, data) {
            // 取得最大整數，無條件近位
            state.pageCount = Math.ceil(data / 15);
        },
        setDataTotol(state, data) {
            state.dataTotol = data.length;
        },
        setCurrentPage(state, currentPage) {
            state.currentPage = currentPage;
        }, setCurrentReslut(state) {
            // 取得當前頁籤的資料
            const arr = state.searchResult.slice((state.currentPage - 1) * state.pageSize, state.currentPage * state.pageSize)
            state.currentReslut = arr;
        }, setSearchType(state, type) {
            state.searchType = type;
        },
        setCurrentBtnSearch(state,type){
            state.currentBtnSearch = type;
        },
        setSearchText(state,text){
            state.searchText = text;
        },
        setCurrentTabText(state,tabText){
            state.currentTabText = tabText;
        }
    },
    getters: {
        getSearchResult(state) {
            return state.searchResult;
        },
        getSeverData(state) {
            return state.severdata;
        },
        getSearchMsg(state) {
            return state.searchMsg;
        },
        getPageCount(state) {
            return state.pageCount;
        },
        getDataTotal(state) {
            return state.dataTotol;
        },
        getCurrentReslut(state) {
            return state.currentReslut;
        }, getSearchType(state) {
            return state.searchType;
        },
        getCurrentPage(state){
            return state.currentPage;
        },
        getCurrentBtnSearch(state){
            return state.currentBtnSearch;
        },
        getSearchText(state){
            return state.searchText;
        },
        getCurrentTabText(state){
            return state.currentTabText;
        }
    },
}