<script>
import { computed } from "vue-demi";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const sqlScript = computed(() => {
      return store.getters["getSQL_Script"];
    });

    const copyAction = (evt) => {
      evt.clipboardData.setData("text/plain", "禁止複製");
      alert("不允許複製");
      evt.preventDefault();
    };

    const notDragDrop = (evt) => {
      evt.preventDefault();
      return false;
    };
    return {
      sqlScript,
      copyAction,
      notDragDrop,
    };
  },
};
</script>

<template>
  <div class="sqlScriptWrap" v-if="sqlScript.length != 0">
    <div class="title">
      <h3>SQL_SCRIPT</h3>
    </div>

    <div>
      <!-- <el-table :data="sqlScript" height="400px" :scrollbar-always-on="true" :show-header="false"  :border="true"> 
        <el-table-column prop="SQL_SCRIPT" label="SQL_SCRIPT"/>
      </el-table> -->
      <el-input
        v-model="sqlScript[0].SQL_SCRIPT"
        :rows="25"
        type="textarea"
        placeholder="Please input"
        :readonly="true"
        resize="none"
        @copy="copyAction"
        @dragstart="notDragDrop"
        @drop="notDragDrop"
      />
    </div>
  </div>
</template>


<style lang="scss" scoped>
.sqlScriptWrap {
  .title {
    margin-bottom: 10px;
  }
}
</style>