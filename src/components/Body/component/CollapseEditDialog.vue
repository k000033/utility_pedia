<script>
import { computed } from "vue-demi";
import { useStore } from "vuex";
import { Check, Close } from "@element-plus/icons-vue";
import { apiUseNoticeParams } from "../../../api/index";
import { useRoute } from "vue-router";
import {
  apiGetBodyDataAction,
  apiExportNoteIfno,
} from "../../../componentAPI/index";
import { ElMessage } from "element-plus";
export default {
  components: {
    ElMessage,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const noticeParams = new apiUseNoticeParams();
    /**
     * 重新撈取BODY資料
     */
    const { getBodyDataAction } = apiGetBodyDataAction();
    const { category, description, ID, readOnly,uid } =
      apiExportNoteIfno();
    const openDialog = computed({
      get() {
        return store.getters["NoteEdit/getOpenCollapseNoteDialog"];
      },
      set(value) {
        store.dispatch("NoteEdit/openCollapseNoteDialogAction", value);
      },
    });

    /**
     * 儲存類別/附註描述
     */
    const btnSave = () => {
      if (category.value == "") {
        error('分類不能為空');
        return;
      };

      noticeParams.initalPaarams();
      noticeParams.UID = uid.value;
      noticeParams.CATEGORY = category.value;
      noticeParams.NOTES_ID = ID.value;
      noticeParams.DESCRIPTION = description.value;
      store.dispatch("HeaderEdit/EditNoticeAction", noticeParams).then((res) => {
        for (const item of res.data) {
          if (item.RTN_CODE == 0) {
            getBodyDataAction();
            openDialog.value = false;
          } else {
            error(item.RTN_MSG);
          }
        }
      });
    };

    const btnCencel = () => {
      openDialog.value = false;
    };

    const error = (msg) => {
      ElMessage({
        message: msg,
        type: "error",
        duration: 3000,
      });
    };


    return {
      ID,
      btnSave,
      openDialog,
      btnCencel,
      description,
      Check,
      Close,
      category,
      readOnly,
    };
  },
};
</script>

<template>
  <div class="dHeadEditBox">
    <el-dialog
      width="600px"
      v-model="openDialog"
      :title="ID == '' ? '新增' : '編輯'"
      :draggable="true"
    >
      <div>
        <div>
          <label class="lblTitle">分類</label>
          <el-input
            v-model="category"
            placeholder="Please input"
            :disabled="readOnly"
          />
        </div>
        <div>
          <label class="lblTitle">附註</label>
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
