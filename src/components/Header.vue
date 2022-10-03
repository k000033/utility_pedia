<script>
import { computed, ref } from "vue-demi";
import { useStore } from "vuex";
import { Search } from "@element-plus/icons-vue";
import { apiUseSearchParams } from "../api/index";
import { apiExportSearchInfo } from "../componentAPI/index";
import SiderBar from './SideBar.vue'
export default {
  components: {
    Search,SiderBar
  },
  setup() {
    // const iptSearch = ref("");
    const store = useStore();
    const searchParams = new apiUseSearchParams();
    const { getSearchType, currentBtnSearch, getSearchText } =
      apiExportSearchInfo();
    const getDetail = computed(() => {
      return store.getters["getDetail"];
    });
    // /**
    //  *  搜尋文字
    //  */
    // const SearchText = computed({
    //   get() {
    //     return store.getters["SearchAction/getSearchText"];
    //   },
    //   set(value) {
    //     store.dispatch("SearchAction/setSearchTextAction", value);
    //   },
    // });

    /**
     * 側邊欄位
     */
    const btnSideBar_click = () => {
      store.dispatch('setOpenSiderBarAction',true);
    };

    const getLoading = computed(() => {
      return store.getters["getLoading"];
    });

    /**
     * 取得 搜尋範圍
     */
    // const getSearchType = computed(() => {
    //   return store.getters["SearchAction/getSearchType"];
    // });

    /**
     * 取得按下是哪一種搜尋方式
     */
    // const currentBtnsearch = computed({
    //   get() {
    //     return store.getters["SearchAction/getCurrentBtnSearch"];
    //   },
    //   set(value) {
    //     store.dispatch("SearchAction/setCurrentBtnSearchAction", value);
    //   },
    // });

    const currentTab = computed({get(){
        return store.getters["SearchAction/getCurrentTabText"];
    },set(value){
        store.dispatch("SearchAction/setCurrentTabAction", value);
    }})

    /**
     * 按下搜尋
     * 顯示loading圖案，切換搜尋畫面
     */
    // const btnSearch = () => {
    //   console.log(getSearchType.value)
    //   store.dispatch("SearchAction/claerSearchResult");
    //   store.dispatch("SearchAction/setCurrentPageAction",1);
    //   if (iptSearch.value == "") {
    //     store.dispatch("editSearchView", false);
    //     return;
    //   }
    //   //顯示loading圖案，切換搜尋畫面
    //   store.dispatch("loadingSatatusAction", true);
    //   store.dispatch("editSearchView", true);
    //   //帶入參數
    //   searchParams.initalPaarams();
    //   searchParams.FILTER = iptSearch.value ;
    //   searchParams.SEARCH_TYPE = getSearchType.value;
    //   store
    //     .dispatch("SearchAction/fetchSearchResult", searchParams)
    //     .then((res) => {
    //       //關閉loading圖案，切換搜尋畫面
    //       store.dispatch("SearchAction/setCurrentReslutAction");
    //       store.dispatch("loadingSatatusAction", false);
    //     });
    // };
    
    // 搜尋 訂閱 收藏 
    const btnSearch = (num) => {
      currentBtnSearch.value = num;
      console.log(getSearchType.value);
      //當如果是按放大鏡，
      if (getSearchText.value == "" && ["2", "3", "4"].includes(num)) {
        // store.dispatch("editSearchView", false);
        return;
      }
      store.dispatch("SearchAction/claerSearchResult");
      // store.dispatch("SearchAction/setCurrentPageAction", 1);
      //顯示loading圖案，切換搜尋畫面
      store.dispatch("loadingSatatusAction", true);
      // store.dispatch("editSearchView", true);
      store.dispatch("setCurrentViewAction", 'searchView');
      //帶入參數
      searchParams.initalPaarams();
      searchParams.FILTER = getSearchText.value;
      searchParams.SEARCH_TYPE = currentBtnSearch.value;
      searchParams.OBJECTS_TYPE = currentTab.value;
      store
        .dispatch("SearchAction/fetchSearchResult", searchParams)
        .then((res) => {
          //關閉loading圖案，切換搜尋畫面
          store.dispatch("SearchAction/setCurrentReslutAction");
          store.dispatch("loadingSatatusAction", false);
        });
    };

    // /**
    //  * 訂閱 收藏
    //  * @param {num} num
    //  */
    // const btnAction = (num) => {
    //   store.dispatch("SearchAction/claerSearchResult");
    //   store.dispatch("SearchAction/setCurrentPageAction", 1);
    //   //顯示loading圖案，切換搜尋畫面
    //   store.dispatch("loadingSatatusAction", true);
    //   store.dispatch("editSearchView", true);

    //   searchParams.initalPaarams();
    //   searchParams.FILTER = iptSearch.value;
    //   searchParams.SEARCH_TYPE = num;
    //   store
    //     .dispatch("SearchAction/fetchSearchResult", searchParams)
    //     .then((res) => {
    //       //關閉loading圖案，切換搜尋畫面
    //       store.dispatch("SearchAction/setCurrentReslutAction");
    //       store.dispatch("loadingSatatusAction", false);
    //     });
    // };

    return {
      getDetail,
      Search,
      getSearchText,
      btnSideBar_click,
      btnSearch,
      getLoading,
      // btnAction,
      getSearchType,
    };
  },
};
</script>

<template>
  <div class="wrap">
    <div class="header_container">
      <!-- 標堤 / 側邊攔 -->
      <div class="header_title">
        <!-- 側邊攔ICON -->
        <span
          class="material-symbols-outlined menuIcon"
          @click="btnSideBar_click"
        >
          menu
        </span>
        <SiderBar />
        <span class="spnTitle">Schemap</span>
      </div>
      <!-- 搜尋 -->
      <div class="dSearch">
        <!-- 搜尋框 -->
        <div class="mt-4">
          <el-input
            v-model="getSearchText"
            placeholder="Please input"
            class="input-with-select"
            size="large"
            :clearable="true"
            @keyup.enter="btnSearch(getSearchType)"
            :disabled="getLoading"
          >
            <template #append>
              <el-button :icon="Search" @click="btnSearch(getSearchType)" />
            </template>
          </el-input>
        </div>
        <!-- 訂閱 -->
        <div class="btnSearchType">
          <a @click="btnSearch(1)">
            <!-- <el-icon><Bell @click="btnAction(1)" /></el-icon> -->
            <el-icon><Bell /></el-icon>
          </a>
        </div>
        <!-- 收藏 -->
        <div class="btnSearchType">
          <a @click="btnSearch(0)">
            <!-- <el-icon><Reading @click="btnAction(0)" /></el-icon> -->
            <el-icon><Reading /></el-icon>
          </a>
        </div>
        <div></div>
      </div>
      <!-- 登入者資訊 -->
      <div class="header_title header_user" v-if="getDetail[0]">
        <!-- 登入者 -->
        <div class="loginUser">
          <el-icon :size="15"><Avatar /></el-icon
          ><span class="userInfo"
            >{{ getDetail[0].USER_NAME }} {{ getDetail[0].ROLE_NAME }}</span
          >
        </div>
        <!-- 最後登入時間 -->
        <div class="loginTime">
          <el-icon :size="15"><Timer /></el-icon>
          <span class="userInfo">{{ getDetail[0].LOGIN_TIME }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  height: 55px;
  background-color: #eaecf0;
  box-shadow: 0 0 4px 0px #917575;
  position: relative;
  .header_container {
    max-width: 960px;
    margin: auto;
    display: flex;
    align-items: center;
    height: 100%;

    .spnTitle {
      font-weight: bold;
      font-size: 38px;
      /* box-shadow: 1px 1px 1px #aaa; */
      font-style: oblique;
      text-shadow: 4px 2px 1px #aaa;
    }

    .header_title {
      &:first-child {
        font-size: 30px;
        display: flex;
        align-items: center;

        .material-symbols-outlined {
          font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
          font-size: 30px;
          margin-right: 10px;
          cursor: pointer;
        }
      }

      &.header_user {
        margin-left: auto;
        font-size: 14px;
        .loginTime {
          display: flex;
          align-items: center;
        }
        .userInfo {
          padding-left: 10px;
        }
      }
    }

    .dSearch {
      width: 330px;
      display: flex;
      align-items: center;
      flex-grow: 1;

      justify-content: center;
      .btnSearchType {
        cursor: pointer;
        background-color: #f5f7fa;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100%;
        padding: 0 20px;
        white-space: nowrap;
        border-radius: 4px;
        box-shadow: 0 1px 0 0#dcdfe6 inset, 0 -1px 0 0 #dcdfe6 inset,
          -1px 0 0 0 #dcdfe6 inset;
        a {
          padding: 8px 15px;
          margin: 0 -20px;
          color: #606266;
          line-height: 0em;
          display: flex;
          align-items: center;
          height: 24px;
          overflow: height;

          .el-icon {
            color: #909399;
          }
        }
      }
    }
  }
}
</style>
