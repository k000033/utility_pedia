<script>
import { computed, onMounted, ref } from "vue-demi";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const getHostTableData = computed(() => {
      return store.getters["gotHostTableData"];
    });

    /**
     * 點擊 Host 連結，跳轉網頁
     * @param {} params
     */
    const urlAction = (params) => {
      console.log(params);
      let url = router.resolve({
        path: "/index",
        query: {
          username: route.query.username,
          uid: params.UID || "",
        },
      });
      console.log(url);
      document.location.href = url.href;
      document.location.reload();
    };

    return {
      getHostTableData,
      urlAction,
    };
  },
};
</script>

<template>
  <div class="hostwrap" v-if="getHostTableData.length != 0">
    <div class="title">
      <h3>LOCATION</h3>
    </div>
    <div>
      <el-table :data="getHostTableData" :show-header="false">
        <el-table-column prop="CAPTION" label="CAPTION" width="80px" />
        <el-table-column prop="NAME" label="NAME">
          <template #default="scope">
            <a
              class="aLink"
              href="javascript:;"
              @click="urlAction(scope.row)"
              >{{ scope.row.NAME }}</a
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hostwrap {
  &.loading {
    display: none;
  }
  .title {
    margin-bottom: 10px;
  }

  .aLink {
    color: blue;
    text-decoration: none;
  }
}
</style>
