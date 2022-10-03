<script>
import { onMounted, onUpdated, ref, toRef, watch } from "vue-demi";
import { useStore } from "vuex";
import { apiUsePediaParams } from "../../../api/index";
import DynamicTable from "./DynamicTable.vue";
import { useRoute } from "vue-router";

export default {
  props: {
    infoObj: {
      type: Object,
      default() {},
    },
    open:{
      type:Boolean,
      default:true
    }
  },
  components: {
    DynamicTable,
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const refHost = ref("");
    const refid = ref(0);
    const openBox = ref(false);
    const pediaParams = new apiUsePediaParams();
    const reftext = ref('input')

    /**
     * 按下執行語法按鈕，展開 DynamicTable 元件，顯示執行結果
     */
    const sqlAction = (id) => {
      openBox.value = !openBox.value;
      refid.value = id;
      // store.dispatch('DrawTableData',pediaParams);
    };
    /**
     * 對Note按下編輯，開啟Dialog
     */
    const dNoteEditAction = (category, description, id) => {
      console.log(props.infoObj);
      store.dispatch("NoteEdit/editCategory", category || "");
      store.dispatch("NoteEdit/editDescription", description);
      store.dispatch("NoteEdit/editID", id);
      store.dispatch("NoteEdit/openNoteEditDialogAction", true);
    };
    
     onMounted(()=>{
       setTimeout(()=>{  reftext.value='textarea'},100)
    
    
     })
   
    return {
      props,
      sqlAction,
      DynamicTable,
      refHost,
      refid,
      openBox,
      dNoteEditAction,
      reftext
    };
  },
};
</script>

<template>
  <div class="container">
    <!-- <div>
        {{props}}
           {{props.infoObj.DESCRIPTION}}
       </div> -->

    <!-- SQL_INSIDE == 0 -->
    <div class="noteList" v-if="props.infoObj.SQL_INSIDE == 0">
      <ul>
        <li>
          <!-- <span>{{ props.infoObj.DESCRIPTION }}</span> -->
          <el-input
          v-if="props.open"
              v-model="props.infoObj.DESCRIPTION"
              :type="reftext"
              placeholder="Please input"
              :readonly="true"
              resize="none"
              :autosize="true"
            />

          <div class="deditInfo">
            <div
              class="editIfnoList"
              @click="
                dNoteEditAction(
                  props.infoObj.CATEGORY,
                  props.infoObj.DESCRIPTION,
                  props.infoObj.ID
                )
              "
            >
              <span class="material-symbols-outlined" v-show="props.infoObj.READONLY ==0"> edit </span>
            </div>
            最後
            <div class="editIfnoList">
              <span class="material-symbols-outlined"> person </span>
              <span>{{ props.infoObj.UPD_BY }}</span>
            </div>

            <div class="editIfnoList">
              <span class="material-symbols-outlined"> schedule </span>
              <span>{{ props.infoObj.UPD_TIME }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- SQL_INSIDE == 1 -->
    <div class="noteList" v-if="props.infoObj.SQL_INSIDE == 1">
      <div>
        <ul>
          <li>
            <!-- <span>{{ props.infoObj.DESCRIPTION }}</span> -->
            <el-input
              v-model="props.infoObj.DESCRIPTION"
              :type="reftext"
              placeholder="Please input"
              :readonly="true"
              resize="none"
              :autosize="true"
            />
          </li>
        </ul>
      </div>
      <div class="noteBox">
        <div class="noteSqlBox">
          <div class="noteSql">
            <span>{{ props.infoObj.SQL }}</span>
          </div>
          <div>
            <a
              href="javascript:;"
              @click="sqlAction(props.infoObj.ID)"
              ><el-icon :size="30" :class="{ icon_collapse: openBox }"
                ><CaretRight /></el-icon
            ></a>
          </div>
        </div>
        <div class="noteTable">
          <DynamicTable :id="refid" :open="openBox" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  .noteList {
    font-size: 16px;
    ul {
      padding-left: 1em;
    }
    li {
      padding-bottom: 7px;
    }
    .noteBox {
      margin-left: 16px;

      .noteSqlBox {
        display: flex;

        align-items: flex-end;
        .noteSql {
          padding: 8px 6px;
          flex-grow: 1;
          background: #eee;
        }
        a {
          color: #27d55c;

          .icon_collapse {
            transform: rotate(90deg);
          }
        }
      }
      .noteTable {
        margin: 10px 0;
      }
    }

    .deditInfo {
      display: flex;
      align-items: center;
      color: #bbb;
      font-size: 12px;
      .editIfnoList {
        display: flex;
        align-items: center;
        margin-right: 10px;
        .material-symbols-outlined {
          font-size: 20px;
          font-variation-settings: "FILL" 0, "wght" 300, "GRAD" 0, "opsz" 20;
        }

        &:first-child:hover {
          cursor: pointer;
          color: red;
        }
      }
    }

    &:hover {
      .deditInfo {
        display: flex;
      }
    }
  }
}
</style>
