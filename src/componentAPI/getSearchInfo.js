import { useStore } from "vuex";
import { computed } from "vue";


export const exportSearchInfo = () => {
    const store = useStore();

    /**
     * 取得/設定 搜尋範圍
     */
    const getSearchType = computed({
        get() {
            return store.getters["SearchAction/getSearchType"];
        },
        set(value) {
            store.dispatch("SearchAction/setSearchTypeAction", value);
        },
    });
    /**
     * 取得當前按下哪一種搜尋按鈕
     */
    const currentBtnSearch = computed({
        get() {
            return store.getters["SearchAction/getCurrentBtnSearch"];
        },
        set(value) {
            store.dispatch("SearchAction/setCurrentBtnSearchAction", value);
        },
    });

    /**
    * 取得當前搜尋文字
    */
        const getSearchText = computed({
        get() {
            return store.getters["SearchAction/getSearchText"];
        },
        set(value) {
            store.dispatch("SearchAction/setSearchTextAction", value);
        },
    });

    return {getSearchType,currentBtnSearch,getSearchText}
}  