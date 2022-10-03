<script>
import { computed } from "vue-demi";
import { useStore } from "vuex";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import { apiUseMangerParams } from '../../api/index'
import {apiExportManagerData} from '../../componentAPI/index';
export default {
  components: {
    AgGridVue,
  },
  setup() {
    const store = useStore();
    const managerParams = new apiUseMangerParams();
    const {setMagagerAction} = apiExportManagerData();
    const getTopList = computed(() => {
      return store.getters["Manager/getUnderList"];
    });
    
    /**
     * 點擊下方的AgGrid，修改權限
     * @param {Object} cell 
     */
    const CellMouseDown = (cell) => {
      const radio =   document.querySelector(`.radioHidden[data-id="${cell.data.ID}"][data-role="${cell.colDef.field}"]`);
      console.log(radio)
      radio.checked = true;

      const topRowData = window.MangerTopGridApi.getSelectedRows();
      const topID = topRowData[0].ID;
      const underID = cell.data.ID;
      const role = cell.colDef.field;
      setMagagerAction(topID,underID,role);
    };
    return {
      getTopList,
      CellMouseDown,
      columnDefs: [
        {
          headerName: "NAME",
          field: "NAME",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "200%",
        },
        {
          headerName: "CAPTION",
          field: "CAPTION",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "342px",
        },
        {
          headerName: "無權限",
          field: "0",
          cellRenderer: function (params) {
            return `<div class="cellRadio">
                     <input class="radioHidden" data-id="${params.data.ID}" data-role="${params.colDef.field}" type="radio" name="${params.data.ID}" ${params.data.ROLE=='0'?'checked=':''}>
                     <span class="material-symbols-outlined radioStyle">done</span>
                   </div>`;
          },
          width: "100%",
          cellClass: 'cellRole'
        },
        {
          headerName: "讀者",
          field: "5",
          cellRenderer: function (params) {
            return `<div class="cellRadio">
                <input class="radioHidden" data-id="${params.data.ID}" data-role="${params.colDef.field}" type="radio" name="${params.data.ID}" name="${params.data.ID}" ${params.data.ROLE=='5'?'checked=':''}>
                     <span class="material-symbols-outlined radioStyle">done</span>
                   </div>`;
          },
          width: "100%",
            cellClass: 'cellRole'
        },
        {
          headerName: "設計者",
          field: "3",
          cellRenderer: function (params) {
            return `<div class="cellRadio">
                <input class="radioHidden" data-id="${params.data.ID}" data-role="${params.colDef.field}" type="radio" name="${params.data.ID}" ${params.data.ROLE=='3'?'checked=':''}>
                <span class="material-symbols-outlined radioStyle">done</span>
                  
                   </div>`;
          },
          width: "100%",
          cellClass: 'cellRole'
        },
        {
          headerName: "管理員",
          field: "2",
          cellRenderer: function (params) {
            return `<div class="cellRadio">
                <input class="radioHidden" data-id="${params.data.ID}" data-role="${params.colDef.field}" type="radio" name="${params.data.ID}" ${params.data.ROLE=='2'?'checked=':''}>
                     <span class="material-symbols-outlined radioStyle">done</span>
                   </div>`;
          },
          width: "100%",
          cellClass: 'cellRole'
        },
      ],
      defaultColDef: {
        floatingFilter: true,
        resizable: true,
      },
      onGridReady(params) {
        window.MangerUnderGridApi = params.api;
        window.MangerUnderGridColumnApi = params.columnApi;
      },
    };
  },
};
</script>

<template>
  <div class="ManageUnderAgGridwrap">
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
    >
    </ag-grid-vue>
  </div>
</template>

<style lang="scss" scoped>
.ManageUnderAgGridwrap {
  height: 100%;
}
</style>
