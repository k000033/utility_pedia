<script>
import { computed, ref } from "vue-demi";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { apiUseSearchParams } from "../api/index";
import { apiExportSearchInfo } from "../componentAPI/index";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const { getSearchType, currentBtnSearch, getSearchText } =
      apiExportSearchInfo();
    const searchParams = new apiUseSearchParams();
    const currentPage = computed(() => {
      return store.getters["SearchAction/getCurrentPage"];
    });


    const currentTab = computed({
      get() {
        return store.getters["SearchAction/getCurrentTabText"];
      },
      set(value) {
        store.dispatch("SearchAction/setCurrentTabAction", value);
      },
    });
    /**
     * 取得搜尋結果清單
     */
    const getResult = computed(() => {
      return store.getters["SearchAction/getCurrentReslut"];
    });
    /**
     * 取得搜尋 sever DB 數量
     */
    const getSeverData = computed(() => {
      return store.getters["SearchAction/getSeverData"];
    });
    /**
     * 取得錯誤訊息
     */
    const getSearchMsg = computed(() => {
      return store.getters["SearchAction/getSearchMsg"];
    });

    /**
     * 取得頁數
     */
    const getPageCount = computed(() => {
      return store.getters["SearchAction/getPageCount"];
    });
    /**
     * 取得總比數
     */
    const getDataTotal = computed(() => {
      return store.getters["SearchAction/getDataTotal"];
    });

    /**
     * 取得/設定當前 UID
     */
    const currentUid = computed({
      get() {
        return store.getters["getUID"];
      },
      set(value) {
        store.dispatch("setUIDAction", value);
      },
    });
    const getObject = computed(() => {
      return store.getters["HeaderEdit/getObject"];
    });
    /**
     * 取得/設定 搜尋範圍
     */
    // const getSearchType = computed({
    //   get() {
    //     return store.getters["SearchAction/getSearchType"];
    //   },
    //   set(value) {
    //     store.dispatch("SearchAction/setSearchTypeAction", value);
    //   },
    // });

    /**
     * 取得當前按下哪一種搜尋按鈕
     */
    // const currentBtnSearch = computed({
    //   get() {
    //     return store.getters["SearchAction/getCurrentBtnSearch"];
    //   },
    //   set(value) {
    //     store.dispatch("SearchAction/setCurrentBtnSearchAction", value);
    //   },
    // });

    // const currentBtnSearch = computed(() => {
    //   return store.getters["SearchAction/getCurrentBtnSearch"];
    // });

    /**
     * 取得當前搜尋文字
     */
    // const getSearchText = computed(() => {
    //   return store.getters["SearchAction/getSearchText"];
    // });

    /**
     * 點擊連結事件
     * @param {String} uid
     */
    const aTitle_click = (uid, chickable) => {
      if (chickable == 0) {
        return;
      }
      currentUid.value = uid;
      reslodUrl();
    };
    /**
     * 跳轉頁面
     */
    const reslodUrl = () => {
      const url = router.resolve({
        path: "/index",
        query: {
          username: route.query.username,
          uid: currentUid.value || "",
        },
      });
      console.log(url);
      // 修改網址
      document.location.href = url.href;
      document.location.reload();
    };
    /**
     * 回上一頁
     */
    const btnArrowLeft = () => {
        currentTab.value='ALL';
      store.dispatch("SearchAction/claerSearchResult");
      // store.dispatch("editSearchView", false);
      store.dispatch("setCurrentViewAction", 'body');
    };
    /**
     * 頁籤切換
     */
    const pageChange = (num) => {
      store.dispatch("SearchAction/setCurrentPageAction", num);
      store.dispatch("SearchAction/setCurrentReslutAction");
    };
    /**
     * 切換TAB
     */
    const dTab_Click = (tabText) => {
      currentTab.value = tabText;
      reSearchResult();
      //   store.dispatch("SearchAction/claerSearchResult");
      //   store.dispatch("SearchAction/setCurrentPageAction", 1);
      //   store.dispatch("loadingSatatusAction", true);
      //   currentTab.value = tabText;
      //   searchParams.initalPaarams();
      //   searchParams.SEARCH_TYPE = currentBtnSearch.value;
      //   searchParams.FILTER = getSearchText.value;
      //   searchParams.OBJECT_TYPE = tabText;
      //   store
      //     .dispatch("SearchAction/fetchSearchResult", searchParams)
      //     .then((res) => {
      //       //關閉loading圖案，切換搜尋畫面
      //       store.dispatch("SearchAction/setCurrentReslutAction");
      //       store.dispatch("loadingSatatusAction", false);
      //     });
    };

    const sltSearchType_change = (num) => {
      if (getSearchText.value == "") {
        return;
      }

      currentBtnSearch.value = num;
      reSearchResult();
    };

    const reSearchResult = () => {
      //清除資料
      store.dispatch("SearchAction/claerSearchResult");
      //將Page分頁，改回1
      //   store.dispatch("SearchAction/setCurrentPageAction", 1);
      //loading圖案 出現
      store.dispatch("loadingSatatusAction", true);
      // currentTab.value = tabText;
      searchParams.initalPaarams();
      searchParams.SEARCH_TYPE = currentBtnSearch.value;
      searchParams.FILTER = getSearchText.value;
      searchParams.OBJECTS_TYPE = currentTab.value;
      store
        .dispatch("SearchAction/fetchSearchResult", searchParams)
        .then((res) => {
          //關閉loading圖案，切換搜尋畫面
          store.dispatch("SearchAction/setCurrentReslutAction");
          store.dispatch("loadingSatatusAction", false);
        });
    };

    const value = ref("2");
    return {
      getObject,
      getResult,
      aTitle_click,
      getSeverData,
      getSearchMsg,
      btnArrowLeft,
      getPageCount,
      currentPage,
      pageChange,
      getDataTotal,
      dTab_Click,
      currentTab,
      getSearchType,
      sltSearchType_change,
    };
  },
};
</script>

<template>
  <div class="dSearchWrap">
    <!-- TOP -->
    <div class="dSearchTop">
      <div class="dSearchAction">
        <div class="dArrowlefr" @click="btnArrowLeft">
          <el-icon><ArrowLeftBold /></el-icon><span>結束查詢</span>
        </div>

        <!-- 頁籤 -->
        <div class="dSearchTab">
          <div
            :class="['dSearchTablist', { open: currentTab == 'ALL' }]"
            @click="dTab_Click('ALL')"
          >
            <span>All</span>
          </div>
            <!-- <div
                :class="['dSearchTablist', { open: currentTab == 'All Object' }]"
                @click="dTab_Click('All Object')"
            >
                <span>All Object</span>
            </div> -->
          <div
            :class="['dSearchTablist', { open: currentTab == 'Table' }]"
            @click="dTab_Click('Table')"
          >
            <span>Table</span>
          </div>
          <div
            :class="['dSearchTablist', { open: currentTab == 'View' }]"
            @click="dTab_Click('View')"
          >
            <span>View</span>
          </div>
          <div
            :class="['dSearchTablist', { open: currentTab == 'Procedure' }]"
            @click="dTab_Click('Procedure')"
          >
            <span>Procedure</span>
          </div>
          <div
            :class="['dSearchTablist', { open: currentTab == 'Function' }]"
            @click="dTab_Click('Function')"
          >
            <span>Function</span>
          </div>
          <div
            :class="['dSearchTablist','otherTab', { open: currentTab == 'SQL SCRIPT' }]"
            @click="dTab_Click('SQL SCRIPT')"
          >
            <span>SQL Script</span>
          </div>
          <div
            :class="['dSearchTablist', { open: currentTab == 'Application' }]"
            @click="dTab_Click('Application')"
          >
            <span>Application</span>
          </div>
          <!-- 搜索範圍 -->
          <div class="dSearchTablist">
            <el-select
              v-model="getSearchType"
              class="m-2"
              placeholder="Select"
              size="small"
              @change="sltSearchType_change"
            >
              <el-option key="2" label="一般範圍" value="2" />
              <el-option key="3" label="較大範圍" value="3" />
              <el-option key="4" label="最大範圍" value="4" />
            </el-select>
          </div>
        </div>
      </div>
      <!-- 頁籤下的資訊 -->
      <div class="dSeverData" v-if="getSeverData.length > 0">
        <span>{{ getSeverData[0].MAPPING_TEXT }}</span>
      </div>
    </div>
    <!-- body -->
    <!-- <el-scrollbar view-class="scrollHeight" :always="true"> -->
      <div v-for="item in getResult" :key="item.OBJECT_NAME">
        <div :class="['rlsList', { chickable: item.CLICKABLE == 1 }]">
          <div class="rlsTitle">
            <!-- UMP_itm.UMP_CATEGORY -->
            <a
              class="aTitle"
              href="javascript:;"
              @click="aTitle_click(item.UID, item.CLICKABLE)"
              >{{
                item.DB_NAME + "_" + item.SCHEMA_NAME + "." + item.OBJECT_NAME
              }}
            </a>
          </div>
          <!-- 商品分類主檔 USER_TABLE -->
          <div class="rlsType">
            <span v-if="item.CAPTION1!=null"> {{ item.CAPTION || "" }}</span
            ><span>{{ item.TYPE_DESC }}</span>
          </div>
          <div class="rlsAdministrator">
            <span>{{ item.ADMINISTRATOR }}</span>
          </div>
          <!-- 2022-08-12 11:13:34 — 儲存商品分類基本資料。分類的各階層資料皆儲存於此資料表中 -->
          <div class="rlsDesc">
            {{ item.MODIFY_DATE + " — " + (item.DESCRIPTION || "") }}
          </div>
          <div v-if="item.TXT!=null">
            <el-input
              v-model="item.TXT"
              :rows="6"
              type="textarea"
              placeholder="Please input"
              readonly="ture"
              resize="none"
        
            />
          </div>
        </div>
      </div>
    <!-- </el-scrollbar> -->
    <!-- foot -->
    <div class="dPagination" v-if="getResult.length > 0">
      <el-pagination
        :page-size="12"
        :pager-count="9"
        layout="prev, pager, next,total"
        :total="getDataTotal"
        :current-page="currentPage"
        @current-change="pageChange"
        :hide-on-single-page="true"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dSearchWrap {
  max-width: 960px;
  margin: auto;
  margin-top: 30px;
  padding-bottom: 50px;
  .rlsList {
    margin: 10px 0;
    .rlsTitle {
      font-size: 20px;
      margin-bottom: 5px;
      .aTitle {
        text-decoration: none;
        color: #000;
        cursor: default;
      }
    }
    .rlsType {
      font-size: 10px;
      margin-bottom: 5px;
      color: #a18888;
      span:first-child {
        margin-right: 10px;
      }
    }
    .rlsAdministrator {
      font-size: 10px;
      color: #a18888;
    }
    .rlsDesc {
      font-size: 14px;
      color: #a18888;
    }

    // 可以點擊的樣式
    &.chickable {
      .aTitle {
        color: #1a0dab;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }

      .rlsType {
        font-size: 10px;
        color: #a18888;
        margin-bottom: 5px;
      }
      .rlsDesc {
        font-size: 14px;
        color: #a18888;
      }
    }
  }
  .dSearchTop {
    margin-bottom: 10px;
    .dSearchAction {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      border-bottom: 1px solid #aaa;
      //   返回
      .dArrowlefr {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-right: 15px;
        padding-bottom: 6px;
      }

      // 頁籤
      .dSearchTab {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #303133;
        // 頁籤LIST
        .dSearchTablist {
          margin: 0 10px;
          display: flex;
          align-items: center;
          padding-bottom: 5px;
          cursor: pointer;
          height: 22px;
          position: relative;
          &.otherTab{
                    &::before{
                      content: '';
                      position: absolute;
                      top: 0;
                      left: -10px;
                      width: 2px;
                      height: 80%;
                      background-color: rgb(179, 169, 169);
                    }
          }


          //   目前點擊的頁切
          &.open {
            color: #409eff;
            position: relative;
            &::after {
              content: "";
              position: absolute;
              width: 100%;
              height: 2px;
              background-color: #409eff;
              bottom: 0px;
            }
          }

        }
      }
    }
    .dSeverData {
      font-size: 14px;
      color: #70757a;
    }
  }

  .dPagination {
    display: flex;
    justify-content: center;
  }
}
</style>
