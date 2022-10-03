<script>
import { computed, ref } from "vue-demi";
import { useStore } from "vuex";
import ObjectTypeAgGrid from "../Body/component/ObjectTypeAgGrid.vue";
export default {
  components: {
    ObjectTypeAgGrid,
  },
  setup() {
    const store = useStore();
    const wrapHeight = ref('0');
    const agGridHeight = ref('0');
    const agGridWidth = ref('0');

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
          break
          case 'COLUMN':
          wrapHeight.value='350px';
          agGridHeight.value = '300px';
          agGridWidth.value = '100%';
          break
          case 'DATABASE':
          wrapHeight.value='350px';
          agGridHeight.value = '300px';
          agGridWidth.value = '659px';
          break
      }
      return res;
    });

    return { getObjectTableType,wrapHeight,agGridHeight,agGridWidth };
  },
};
</script>

<template>
  <div class="ObjectWarp" :style="{height:wrapHeight}" v-if="getObjectTableType!=''">
    <div class="title">
      <h3>{{getObjectTableType}}</h3>
    </div>
    <div>
      <div >
        <ObjectTypeAgGrid :agGridWidth="agGridWidth" :agGridHight="agGridHeight" :agGridType="getObjectTableType"  />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ObjectWarp {
  .title {
    margin-bottom: 10px;
  }
}
</style>
