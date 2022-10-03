<script>
import { computed } from "vue-demi";
import { useStore } from "vuex";
import {apiUseMangerParams} from '../api/index'
import {apiExportManagerData} from '../componentAPI/index'
export default {
  setup() {
    const store = useStore();
    const managerParams = new apiUseMangerParams();
    const {getTopAgGridData,by_object} = apiExportManagerData();
    const openSiderBar = computed({
      get() {
        return store.getters["getOpenSiderBar"];
      },
      set(value) {
        store.dispatch("setOpenSiderBarAction", value);
      },
    });

    // const getUID = computed(()=>{
    //   return store.getters["getUID"];
    // })
    
    /**
     * 點擊 管理者權限，撈取上下 AgGrid 資料
     */
    const manage_accounts_click = ()=>{
      by_object.value=0;
      getTopAgGridData();
      // managerParams.intitalParams();
      // managerParams.PID = getUID.value;
      // managerParams.BY_OBJECT =0;
      // store.dispatch('Manager/fetchManagersData',{...managerParams}).then((res)=>{
      //   console.log(res.data);
      //  if(res.data.length>0)
      //  {
      //    managerParams.intitalParams();
      //    managerParams.PID = getUID.value;
      //    managerParams.BY_OBJECT =0;
      //    managerParams.USER_ID = res.data[0].ID;
      //    store.dispatch('Manager/fetchManagersData',{...managerParams}).then((res)=>{
      //      console.log(res.data);
      //       window.MangerTopGridApi.getRowNode(0).selectThisNode(true);
      //    })
      //  };
      // })



      openSiderBar.value = false;
      store.dispatch("setCurrentViewAction", 'manageAccount');
    };

    return { openSiderBar,manage_accounts_click };
  },
};
</script>

<template>
  <div class="siderBarWrap">
    <el-drawer
      v-model="openSiderBar"
      :size="300"
      :lock-scroll="false"
      :show-close="true"
      direction="ltr"
      title="I am the title"
      :with-header="false"
    >
      <div class="dMenuList">
        <ul>
          <li>
            <a href="javascript:;" @click="manage_accounts_click">
              <span class="material-symbols-outlined"> manage_accounts </span>
              <span>管理者權限</span>
            </a>
          </li>
          <li>
            <a href="">
              <span class="material-symbols-outlined"> apps </span>
              <span>應用程式</span>
            </a>
          </li>
        </ul>
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.dMenuList {
  height: 100%;
    background-color: #eaecf0;
  ul {
    background-color: #fff;
    li {
      list-style: none;
      border-top: 1px solid #eaecf0;
      border-top-width: 1px;
      border-top-style: solid;
      border-top-color: rgb(234, 236, 240);
      a {
        color: #54595d;
        display: flex;
        align-items: center;
        line-height: inherit;
        max-width: 100%;
        padding: 12px 10px 12px 15px;
        font-size: 0.875rem;
        font-weight: bold;
        text-decoration: none;

        .material-symbols-outlined {
          font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
