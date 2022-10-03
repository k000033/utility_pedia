<script>
import { computed } from 'vue-demi';
import { useStore } from 'vuex'
export default {
  setup(){
      const store = useStore();
      const sqlScript = computed(()=>{
         return store.getters['getSQL_Script'];
      });
      return{
        sqlScript
      }
  }
}
</script>

<template>
  <div class="sqlScriptWrap" v-if="sqlScript.length!=0">
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
              readonly="ture"
              resize="none"
        
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