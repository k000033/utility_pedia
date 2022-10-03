<script>
import { computed } from 'vue-demi';
import { useStore } from 'vuex'
export default {
  setup(){
      const store = useStore();
      const paramstesData = computed(()=>{
          return store.getters['getParameter']
      })
      return{
        paramstesData
      }
  }
}
</script>

<template>
  <div class="parametesWrap" v-if="paramstesData.length!=0">
    <div class="title">
      <h3>PARAMETES</h3>
    </div>
  <div>
    <el-table :data="paramstesData" style="width: 100%" table-layout="auto">
    <el-table-column prop="ORDINAL_POSITION" label="ORDINAL_POSITION"  width="180px" />
    <el-table-column prop="PARAMETER_NAME" label="PARAMETER_NAME"  />
    <el-table-column prop="DATA_TYPE" label="DATA_TYPE" />
    <el-table-column prop="PARAMETER_MODE" label="PARAMETER_MODE" />
  </el-table>
  </div>
  </div>
</template>

<style lang="scss" scoped>
.parametesWrap {

  .title {
    margin-bottom: 10px;
  }
}
</style>