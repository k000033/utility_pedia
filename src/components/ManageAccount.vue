<script>
import { computed, onMounted, ref, watch } from "vue-demi";
import { useStore } from "vuex";
import ManagerTopAgGrid from "./ManageAccount/ManagerTopAgGrid.vue";
import ManagerUnderAgGrid from "./ManageAccount/ManageUnderAgGrid.vue";
import {apiUseMangerParams} from '../api/index'
import { Switch } from "@element-plus/icons-vue";
import {apiExportManagerData} from '../componentAPI/index'
export default {
  components: {
    ManagerTopAgGrid,
    ManagerUnderAgGrid,
    Switch,
  },
  setup() {
    const store = useStore();
    const managerParams = new apiUseMangerParams();
    const {getTopAgGridData,by_object} = apiExportManagerData();
    const getUserList = computed(() => {
      return store.getters["Manager/getUserList"];
    });


    const getUID = computed(()=>{
      return store.getters["getUID"];
    })
    
    /**
     * 切換角度
     */
    const btnSwitch_click =()=>{
      by_object.value = by_object.value==0?1:0;
      getTopAgGridData();
    };
    
    /**
     * 返回 body畫面
     */
    const btnArrowLeft=()=>{
      store.dispatch('setCurrentViewAction','body');
    }

    return {
      getUserList,
      Switch,
      btnSwitch_click,
      by_object,
      btnArrowLeft
    };
  },
};
</script>
<template>
  <div class="manageAccountWrap">
    <div class="dbtnAction">
      <div class="dArrowlefr" @click="btnArrowLeft">
        <el-icon><ArrowLeftBold /></el-icon><span>結束設定</span>
      </div>
      <div class="dSwitch">
        <span :class="{notBy:by_object==1}">使用者角度</span>
        <el-button class="btnSwitch1" type="primary" :icon="Switch" @click="btnSwitch_click" />
        <span :class="{notBy:by_object==0}">物件角度</span>
      </div>
    </div>
    <div class="userBox">
      <div class="title">
        <h3>{{by_object==0?"使用者":"物件"}}</h3>
      </div>
      <div class="boxContent userContent">
        <ManagerTopAgGrid />
        <!-- <el-table
          ref="UseTable"
          :data="getUserList.data"
          height="100%"
          style="width: 100%"
          table-layout="fixed"
          highlight-current-row="true"
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="USER_ID" label="USER_ID" />
          <el-table-column prop="USER_NAME" label="USER_NAME" />
          <el-table-column prop="ROLE" label="ROLE" />
        </el-table> -->
      </div>
    </div>
    <div class="permissionBox">
      <div class="title">
        <div>
          <h3>{{by_object==0?"物件":"使用者"}}</h3>
        </div>
        <!-- <div class="dSwitch">
          <el-button class="btnSwitch" type="primary" :icon="Switch" />
        </div> -->
      </div>
      <div class="boxContent permissionContent">
        <ManagerUnderAgGrid />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.manageAccountWrap {
  height: calc(100vh - 170px);

  .dbtnAction {
    margin-bottom: 8px;
    padding-bottom: 5px;
    border-bottom: 1px solid #aaa;
    display: flex;
    .dArrowlefr {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-right: 15px;
      padding-bottom: 6px;
    }
    .dSwitch{
        flex-grow: 1;
        text-align: center;
        margin-right: 50px;
        .btnSwitch1{
            margin: 0 10px;
        }
        .notBy{
          color: #ccc;
        }
    }
  }

  .userBox {
    height: 40%;
  }
  .permissionBox {
    height: 60%;
    margin-top: 35px;
  }

  .title {
    display: flex;
   .dSwitch{
       flex-grow: 1;
       position: relative;
       .btnSwitch{
           position: absolute;
           top: -25px;
           left: 0;
           right: 0;
           margin: auto;
           width: 50px;
  
       }
   }
  }

  .boxContent {
    height: 85%;
    border: 1px solid #ebeef5;
    margin-top: 10px;
    box-sizing: border-box;
  }

  .userContent {
  }

  .permissionContent {
  }
}
</style>
