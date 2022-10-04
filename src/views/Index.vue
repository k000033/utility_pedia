<script>
import Header from "../components/Header.vue";
import Body from "../components/Body.vue";
import Foot from "../components/Foot.vue";
import SearchResult from "../components/SearchResult.vue";
import { computed, onMounted, ref, watch } from "vue-demi";
import { useRoute } from "vue-router";
import store from "@/store";
import loadingIcon from "../components/Body/component/loading.vue";
import BackTop from "../components/Body/component/BackTop.vue";
import ManageAccount from "../components/ManageAccount.vue";
import Error from "../components/ERROR.vue";
export default {
  components: {
    Header,
    Body,
    Foot,
    SearchResult,
    loadingIcon,
    BackTop,
    ManageAccount,
    Error,
  },
  setup() {
    /**
     * 回上一頁，因為更改querystring，不會更改reload，所以用watch監聽網址，當有更改後，重新reload
     */
    const route = useRoute();
    watch(
      () => route.fullPath,
      (value, old) => {
        if (route.query.uid == "") return;
        document.location.reload();
      }
    );

    const loading = computed(() => {
      return store.getters["getLoading"];
    });
    // const getIsSearchView = computed(()=>{
    //    return store.getters['getIsSearchView'];
    // });
    const getCurrentView = computed(() => {
      return store.getters["getCurrentVuew"];
    });

    onMounted(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0 });
      }, 50);
    });

    return { loading, getCurrentView };
  },
};
</script>

<template>
  <div :class="['loadingIcon', { loading: !loading }]">
    <loadingIcon />
  </div>

  <div class="wrap">
    <div class="indexContainer">
      <div>
        <Header />
      </div>

      <div class="contain">
        <div v-show="getCurrentView == 'body'" :class="{ loading: loading }">
          <Body />
        </div>

        <div v-show="getCurrentView == 'searchView'">
          <SearchResult />
        </div>

        <div v-show="getCurrentView == 'manageAccount'">
          <ManageAccount />
        </div>
        <div v-show="getCurrentView == 'error'">
          <Error />
        </div>
      </div>
      <!-- <div v-show="!getIsSearchView" :class=" { loading: loading }">
        <Foot />
      </div>      -->
    </div>
    <div>
      <BackTop />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  position: relative;

  .contain {
    max-width: 960px;
    margin: auto;
    margin: 20px auto 25px;
  }
}

/* 进入之前和离开后的样式 */
// .v-enter-from,
// .v-leave-to {
//   opacity: 0;
// }
/* 离开和进入过程中的样式 */
// .v-enter-active,
// .v-leave-active {
/* 添加过渡动画 */
//   transition: opacity 0.6s ease;
// }
/* 进入之后和离开之前的样式 */
// .v-enter-to,
// .v-leave-from {
//   opacity: 1;
// }
.loadingIcon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 55px - 50px);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.loading {
  display: none;
}
</style>
