<script>
  /**
   * 執行SQL，顯示結果的component 
   * 由父層 NoteListBox 傳值 進來
   */
import { computed, reactive, ref, watch } from "vue-demi";
import { useStore } from "vuex";
import { apiUseNoticeParams } from "../../../api/index";
export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
    open:{
      type:Boolean,
      default:false
    }
  },
  setup(props) {
    const store = useStore();
    // 欄位名稱
    const coulums = reactive({ data: [] });
    const tableData = reactive({ data: [] });
    const noticeParams = new apiUseNoticeParams();

    watch(
      () => props.id,
      (value) => {
        noticeParams.initalPaarams();
        noticeParams.EXEC_SQL_ID = props.id;
        store.dispatch("HeaderEdit/EditNoticeAction", { ...noticeParams }).then((res) => {
          console.log(res);
          // 取得 Table 的 欄位名稱
          if (res.data.length > 0) {
            coulums.data = res.data[0]["TITLE"].split(",");
            console.log(coulums.data);
          }
          // 取得 Table 的 資料
          tableData.data = res.data;
        });
      }
    );
   


    return {
      tableData,
      coulums,
      props

    };
  },
};
</script>

<template>
  <div v-if="tableData.data.length>0" v-show="props.open">
    <el-table :data="tableData.data" stripe  size="small" table-layout="fixed">
      <el-table-column
        v-for="(item, index) in coulums.data"
        :key="item"
        :prop="item"
        :label="item"
      >
        <template #default="scope">
          <div>
            {{ scope.row[item] }}
          </div>
          <!-- <div v-if="item != scope.row['_CHICK']">
            {{ scope.row[item] }}
          </div>
          <div v-if="scope.row[item] == scope.row[item]">
            <a href=""> {{ scope.row[item] }}</a>
          </div> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style></style>
