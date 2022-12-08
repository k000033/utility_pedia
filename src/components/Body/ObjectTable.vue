<script>
import { computed, ref } from "vue-demi";
import { useStore } from "vuex";
import ObjectTypeAgGrid from "../Body/component/ObjectTypeAgGrid.vue";
import exportColumnExcel from './component/exportColumnExcel.vue'
export default {
  components: {
    ObjectTypeAgGrid,exportColumnExcel
  },
  setup() {
    const store = useStore();
    const wrapHeight = ref('0');
    const agGridHeight = ref('0');
    const agGridWidth = ref('0');
    const domLayout = ref('0');

    /**
     * 按照不同object_type，各別設定 AgGrid 高度 寬度
     */
    const getObjectTableType = computed(() => {
      const res = store.getters["getObjectTableType"];
      switch (res){
          case 'OBJECT':
          wrapHeight.value='750px';
          agGridHeight.value = '700px';
          agGridWidth.value = '100%';
          domLayout.value ='normal';
          break
          case 'COLUMN':
          wrapHeight.value='';
          agGridHeight.value = '';
          agGridWidth.value = '';
          domLayout.value ='autoHeight';
          break
          case 'DATABASE':
          wrapHeight.value='350px';
          agGridHeight.value = '300px';
          agGridWidth.value = '659px';
          domLayout.value ='normal';
          break
      }
      return res;
    });

    return { getObjectTableType,wrapHeight,agGridHeight,agGridWidth,domLayout };
  },
};
</script>

<template>
  <div class="ObjectWarp" :style="{height:wrapHeight}" v-if="getObjectTableType!=''">
    <div class="title">
      <h3>{{getObjectTableType}}</h3>
      <exportColumnExcel v-if="getObjectTableType=='COLUMN'"/>
    </div>
    <div>
      <div >
        <ObjectTypeAgGrid :agGridWidth="agGridWidth" :agGridHight="agGridHeight" :agGridType="getObjectTableType" :domLayout="domLayout"  />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ObjectWarp {
  .title {
    margin-bottom: 10px;
    display: flex;
  }
}
</style>
