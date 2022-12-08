<script>
import { computed, ref } from "vue-demi";
import { useStore } from "vuex";
import { Check, Close } from "@element-plus/icons-vue";
import { apiSwitchCpSqlName } from "../../../componentAPI/index";
import { apiUseHeaderEditParams, apiUseNoticeParams } from "../../../api/index";
import { useRoute } from "vue-router";
import {
  apiGetBodyDataAction,
  apiExportDBIfno,
} from "../../../componentAPI/index";
import { ElMessage } from "element-plus";
export default {
  props: {
    // levelType: {
    //   type: String,
    //   default: "",
    // },
    // description: {
    //   type: String,
    //   default: "",
    // },
    // title: {
    //   type: String,
    //   default: "",
    // },
  },
  components: {
    ElMessage,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const headerEditparams = new apiUseHeaderEditParams();
    const noticeParams = new apiUseNoticeParams();
    // 更新Body資料
    const { getBodyDataAction } = apiGetBodyDataAction();
    const {
      levelType,
      uid,
      description,
      title,
      objectName,
      schema,
      object,
      objectLevel,
    } = apiExportDBIfno();
    // 控制Dialog 開啟關閉
    const openDialog = computed({
      get() {
        return store.getters["HeaderEdit/getOopnEditDialog"];
      },
      set(value) {
        store.dispatch("HeaderEdit/openEditDialogAction", value);
      },
    });

    // const levelType = computed({get(){
    //     return store.getters["HeaderEdit/getLevelType"]
    // },set(value){
    //     store.dispatch("HeaderEdit/editLeavelType",value)
    // }});

    const getDetail = computed(() => {
      return store.getters["getDetail"];
    });

    const btnCencel = () => {
      openDialog.value = false;
    };

    /**
     * 儲存按鈕
     */
    const btnSave = () => {
      let scrollHeight = 0;
      // 紀錄目前AgGrid 捲軸位子
      if (document.querySelector(".ag-body-viewport") != null) {
          scrollHeight =
          document.querySelector(".ag-body-viewport").scrollTop;
      }

      // SERVER Hearder 的儲存
      if (objectLevel.value <= 0) {
        objectSave(scrollHeight);
      } else {
        notObjectSave(scrollHeight);
      }
    };
 
    const objectSave = (scrollHeight) => {
      noticeParams.initalPaarams();
      noticeParams.UID = uid.value;
      noticeParams.CATEGORY = title.value;
      noticeParams.LEVEL_TYPE = levelType.value;
      noticeParams.DESCRIPTION = description.value;
      store
        .dispatch("HeaderEdit/EditNoticeAction", noticeParams)
        .then((res) => {
          // for (const item of res.data) {
          //         if (item.RTN_CODE == 0) {
          //           getBodyDataAction();
          //           openDialog.value = false;
          //         } else {
          //           error(item.RTN_MSG);
          //         }
          //       }
          getBodyDataAction(scrollHeight).then((res) => {
            //回到 刷新前，AgGrid的卷軸位子
            if (document.querySelector(".ag-body-viewport") != null) {
            setTimeout(() => {
              document.querySelector(".ag-body-viewport").scrollTop =
                scrollHeight;
            }, 10);
          };
          });
          openDialog.value = false;
        });
    };

    const notObjectSave = (scrollHeight) => {
      // ATTR_TYPE = 0 存入標題
      headerEditparams.initalPaarams();
      headerEditparams._NAME = apiSwitchCpSqlName(getDetail.value[0].SERVER);
      headerEditparams.DB_NAME = getDetail.value[0].DB_NAME;
      headerEditparams.OBJECT_NAME = object.value;
      headerEditparams.SCHEMA_NAME = schema.value;
      headerEditparams.LEVELTYPE = levelType.value;
      headerEditparams.ATTR_TYPE = 0;
      headerEditparams.VALUE = title.value;
      store
        .dispatch("HeaderEdit/headerEditAction", { ...headerEditparams })
        .then((res) => {
          // ATTR_TYPE = 1 當標題存入後，再存入描述
          headerEditparams.ATTR_TYPE = 1;
          headerEditparams.VALUE = description.value;
          store
            .dispatch("HeaderEdit/headerEditAction", {
              ...headerEditparams,
            })
            .then((res) => {
              //判斷 存入成功與否
              //成功，重新整理
              //失敗，錯誤訊息
              for (const item of res.data) {
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
                  error(item.RTN_MSG);
                }
              }
              //  getBodyDataAction();
            });
        });
    };

    const error = (msg) => {
      ElMessage({
        message: msg,
        type: "error",
        duration: 3000,
      });
    };

    // return store.getters["HeaderEdit/getOopnEditDialog"];
    return {
      openDialog,

      description,
      title,
      Check,
      Close,
      btnCencel,
      btnSave,
      object,
    };
  },
};
</script>

<template>
  <div class="dHeadEditBox">
    <el-dialog
      width="600px"
      v-model="openDialog"
      title="編輯"
      :draggable="true"
    >
      <div>
        <div>
          <label class="lblTitle lblblock">對象</label>
          <span>{{ object }}</span>
        </div>
        <div>
          <label class="lblTitle">標題</label>
          <el-input v-model="title" placeholder="Please input" />
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
.dHeadEditBox {
  .lblTitle {
    display: inline-block;
    margin: 10px 0;

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
