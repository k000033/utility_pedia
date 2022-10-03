<script>
import { computed } from "vue-demi";
import { useStore } from "vuex";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridVue } from "ag-grid-vue3";
import {apiExportManagerData} from '../../componentAPI/index'
import "ag-grid-enterprise";
export default {
  components:{
    AgGridVue
  },
  setup() {
    const store = useStore();
    const getTopList = computed(() => {
      return store.getters["Manager/getTopList"];
    });

    const {getManagerData,getUnderAgGridData} = apiExportManagerData();
    /**
     * 點擊上面AgGrid的Row，取得 ID，重新撈取下面 AgGrid資料
     * @param {Object} rowData 
     */
    const CellMouseDown = (rowData)=>{
      getUnderAgGridData(rowData.data.ID);
    };
    
    // AgGrid 每一ROW 加上ID
    const getRowId = (rowData)=>{
      return rowData.data.ID;
    };


    return {
      getRowId,
      getTopList,
      CellMouseDown,
      columnDefs: [
        {
          headerName: "NAME",
          field: "NAME",
          filter: "agTextColumnFilter",
          sortable: true,
          width: "200px",
        },
        {
          headerName: "CAPTION",
          field: "CAPTION",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "342px",
        },
      ],     
      defaultColDef: {
        floatingFilter: true,
        resizable: true,
      },
      onGridReady(params) {
        window.MangerTopGridApi = params.api;
        window.MangerTopGridColumnApi = params.columnApi;
      },
    };
  },
};
</script>

<template>
  <div class="ManageTopAgGridwrap">
    <ag-grid-vue
    style="width: 100%; height: 100%"
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      :rowData="getTopList.data"
      :defaultColDef="defaultColDef"
      animateRows="true"
      @grid-ready="onGridReady"
      enableCellTextSelection="true"
      @CellMouseDown="CellMouseDown"
      rowSelection="single"
      :getRowId="getRowId"
    >
    </ag-grid-vue>
  </div>
</template>

<style lang="scss" scoped>
    .ManageTopAgGridwrap{
      height: 100%;
    }
</style>
