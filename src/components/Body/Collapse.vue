<script>
import { computed, reactive, ref } from "vue-demi";
import { useStore } from "vuex";
import DynamicTable from "./Detial.vue";
import NoteListBox from "./component/NoteListBox.vue";
import { useRoute } from "vue-router";
export default {
  components: {
    DynamicTable,
    NoteListBox,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const activeNames =ref('');
    const titles = reactive({ data: [] });
    const getCollapse = computed(() => {
      return store.getters["getCollapse"];
    });
    const getCollapseTitle = computed(() => {
      return store.getters["getCollapseTitle"];
    });
    
    // 本地相依性
    const getLocalDependency = computed(() => {
      return store.getters["getLocalDependency"];
    });
    // 外不相依性
    const getExternalDependency = computed(()=>{
      return store.getters['getExternalDependency'];
    })

    const getReadOnly = computed(()=>{
      const res = store.getters["getDetail"];
     
      return res.length==0?1:res[0].READONLY
    });

    /**
     * 針對選擇的類別做新增的Note，設定參數
     * @param {*} category
     */
    const addCollapeNote = (category) => {
      store.dispatch("NoteEdit/editCategory", category);
      store.dispatch("NoteEdit/editDescription", "");
      store.dispatch("NoteEdit/editID", "");
      store.dispatch("NoteEdit/readOnlyCollaspseTitleStatus", true);
      store.dispatch("NoteEdit/openCollapseNoteDialogAction", true);
    };
    
    /**
     * 新增類別
     */
    const btnAddCollapse = () => {
      // store.dispatch("NoteEdit/editDB", route.query.db);
      store.dispatch("NoteEdit/editCategory", "");
      store.dispatch("NoteEdit/editDescription", "");
      store.dispatch("NoteEdit/editID", "");
      // store.dispatch("NoteEdit/editObject", route.query.object);
      // store.dispatch("NoteEdit/editSchema", route.query.schema);
      store.dispatch("NoteEdit/readOnlyCollaspseTitleStatus", false);
      store.dispatch("NoteEdit/openCollapseNoteDialogAction", true);
    };

    return {
      getCollapse,
      getCollapseTitle,
      activeNames,
      addCollapeNote,
      btnAddCollapse,
      getLocalDependency,
      getExternalDependency,
      getReadOnly
    };
  },
};
</script>

<template>
  <div class="collapse_container">
    <div class="dAddCollapse">
      <h3>分類附註</h3>
        <span v-if="getReadOnly==0" class="material-symbols-outlined" @click="btnAddCollapse()"> add </span>
    </div>
    <el-collapse v-model="activeNames" v-if="getCollapseTitle.length > 0">
      <el-collapse-item
        v-for="(title, key) in getCollapseTitle"
        :key="title"
        :title="title"
        :name="title"
      >
        <template #title>
          <h2 class="title">{{ title }}</h2>
          <span
            class="material-symbols-outlined"
            @click.stop="addCollapeNote(title)"
          >
            add
          </span>
        </template>
        <div v-for="item in getCollapse" :key="item.RID">
          <template v-if="item.CATEGORY == title">
          <NoteListBox :open="activeNames.includes(title)"  :infoObj="item" />
        </template>
        </div>
        <!-- <DynamicTable :item_id="1" :item_name="'2'" /> -->
      </el-collapse-item>
    </el-collapse>

    <!-- 參考 -->
    <el-collapse v-model="activeNames" v-if="(getExternalDependency.length>0||getLocalDependency.length>0)">
      <el-collapse-item title="相依性" name="1">
        <div v-if="getLocalDependency.length>0">
          <ul class="ulRefer">
            <li>
              <span>本地相依性</span>
              <div>
                <el-table
                  :data="getLocalDependency"
                  stripe
                  size="small"
                  table-layout="auto"
                >
                    <el-table-column prop="DEPEND_TYPE" label="DEPEND_TYPE"/>
                    <el-table-column prop="DB_NAME" label="DB_NAME" />
                    <el-table-column prop="SCHEMA_NAME" label="SCHEMA_NAME" />
                    <el-table-column prop="OBJECT_NAME" label="OBJECT_NAME" />
                    <el-table-column prop="TYPE_DESC" label="TYPE_DESC" />
                    <el-table-column prop="DESCRIPTION" label="DESCRIPTION" />
                  </el-table>
  
              </div>
            </li>
          </ul>
        </div>
        
        <div v-if="getExternalDependency.length>0">
      
          <ul class="ulRefer">
            <li>
              <span>外地相依性</span>
              <div>
           
                <el-table
                  :data="getExternalDependency"
                  stripe
                  size="small"
                  table-layout="auto"
                  height="200"
                  :scrollbar-always-on="true"
                >
                    <el-table-column prop="HOST" label="HOST"/>
                    <el-table-column prop="DB_NAME" label="DB_NAME" />
                    <el-table-column prop="SCHEMA_NAME" label="SCHEMA_NAME" />
                    <el-table-column prop="OBJECT_NAME" label="OBJECT_NAME" />
                  </el-table>

              </div>
            </li>
          </ul>
       
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="scss" scoped>
.collapse_container {
  margin-top: 40px;
  padding-bottom: 60px;
  .title {
    font-size: 1em;
    font-weight: 100;
  }
  .material-symbols-outlined {
    font-variation-settings: "FILL" 1, "wght" 700, "GRAD" 0, "opsz" 48;
    padding: 2px;
    &:hover {
      outline: 1px solid #aaa;
      background: #eee;
    }
  }

  .dAddCollapse {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    .material-symbols-outlined{
      font-variation-settings: "FILL" 1, "wght" 600, "GRAD" 0, "opsz" 48;
      margin-left: 5px;
      &:hover{
        background: #eee;
        cursor: pointer;
      }
    }
  }

  .ulRefer {
    margin-left: 20px;
    font-size: 16px;
  }
}
</style>
