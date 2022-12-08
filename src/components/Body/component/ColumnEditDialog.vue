<script>
import { computed } from "vue-demi";
import { useStore } from "vuex";
import { Check, Close } from "@element-plus/icons-vue";
import { apiUseHeaderEditParams } from "../../../api/index";
import {
  apiGetBodyDataAction,
  apiExportDBIfno,
  apiSwitchCpSqlName,
} from "../../../componentAPI/index";
import { ElMessage } from "element-plus";
export default {
  components: {
    ElMessage,
  },
  setup() {
    const store = useStore();
    const editParams = new apiUseHeaderEditParams();
    const { getBodyDataAction } = apiGetBodyDataAction();
    /**
     * Dialog 開啟關閉
     */
    const openDialog = computed({
      get() {
        return store.getters["ColumnEdit/getOpenDilaog"];
      },
      set(val) {
        store.dispatch("ColumnEdit/openDialogAction", val);
      },
    });
    /**
     * 編輯描述的參數
     */
    const description = computed({
      get() {
        return store.getters["ColumnEdit/getDescription"];
      },
      set(val) {
        store.dispatch("ColumnEdit/editDescriptionAction", val);
      },
    });
    /**
     * 顯示正在編輯的Column名稱
     */
    const columnName = computed(() => {
      return store.getters["ColumnEdit/getColumnName"];
    });
    /**
     * 取的目前物件的資訊
     */
    const getDetail = computed(() => {
      return store.getters["getDetail"];
    });
    
    /**
     * 儲存
     */
    const btnSave = () => {
      let scrollHeight = 0;
      // 紀錄目前AgGrid 捲軸位子
      if (document.querySelector(".ag-body-viewport") != null) {
        scrollHeight = document.querySelector(".ag-body-viewport").scrollTop;
      }
      columnDesSave(scrollHeight);
    };
    /**
     * 儲存要帶入的參數，執行axios
     */
    const columnDesSave = (scrollHeight) => {
      editParams.initalPaarams();
      editParams._NAME = apiSwitchCpSqlName(getDetail.value[0].SERVER);
      editParams.DB_NAME = getDetail.value[0].DB_NAME;
      editParams.OBJECT_NAME = getDetail.value[0].OBJECT_NAME;
      editParams.SCHEMA_NAME = getDetail.value[0].SCHEMA_NAME;
      editParams.COLUMN_NAME = columnName.value;
      editParams.ATTR_TYPE = 0;
      editParams.LEVELTYPE = "TABLE";
      editParams.VALUE = description.value;
      store
        .dispatch("ColumnEdit/editColumnDesAction", editParams)
        .then((res) => {
          for (const item of res.data) {
            // 成功
            if (item.RTN_CODE == 0) {
              getBodyDataAction().then((res) => {
                setTimeout(() => {
                  //回到 刷新前，AgGrid的卷軸位子
                  document.querySelector(".ag-body-viewport").scrollTop =
                    scrollHeight;
                }, 10);
              });
              openDialog.value = false;
            } else {
              // 失敗
              error(item.RTN_MSG);
            }
          }
        });
    };
    
    /**
     * 錯誤訊息
     */
    const error = (msg) => {
      ElMessage({
        message: msg,
        type: "error",
        duration: 3000,
      });
    };
   
   /**
    * 取消，關閉Dialog
    */
    const btnCencel = () => {
      openDialog.value = false;
    };

    return {
      openDialog,
      description,
      btnSave,
      columnName,
      btnCencel,
      Check,
      Close,
    };
  },
};
</script>

<template>
  <div class="dColumnEditBox">
    <el-dialog
      width="600px"
      v-model="openDialog"
      title="編輯"
      :draggable="true"
    >
      <div>
        <div>
          <label class="lblTitle lblblock">對象</label>
          <span>{{ columnName }}</span>
        </div>
        <div>
          <label class="lblTitle">描述</label>
          <el-input
            v-model="description"
            autosize
            type="textarea"
            placeholder="Please input"
          />
        </div>
        <div class="btnGroup">
          <el-button type="primary" :icon="Check" @click="btnSave"
            >儲存</el-button
          >
          <el-button type="primary" :icon="Close" @click="btnCencel"
            >取消</el-button
          >
        </div>
        <div class="clear"></div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.dColumnEditBox {
  .lblTitle {
    display: inline-block;
    margin: 10px 0;
    color: #746a6a91;

    &.lblblock {
      display: block;
    }
  }
  .btnGroup {
    padding-top: 20px;
    float: right;
  }

  .clear {
    clear: both;
  }
}
</style>