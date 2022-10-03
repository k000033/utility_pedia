<script>
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import { useStore } from "vuex";
import { computed, onBeforeMount, onMounted, reactive, watch } from "vue-demi";
import { useRoute, useRouter } from "vue-router";
import HaderEditDialog from "../component/HaderEditDialog.vue";
import { apiUseRegisterParams } from "../../../api/index";
export default {
  props: {
    agGridHight: {
      type: String,
      default: 0,
    },
    agGridType: {
      type: String,
      default: "",
    },
    agGridWidth: {
      type: String,
      default: 0,
    },
  },
  components: {
    AgGridVue,
    HaderEditDialog,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const useRegisterParams = new apiUseRegisterParams();
    const getObjectAgGridData = computed(() => {
      return store.getters["getObjectTableData"];
    });

    /**
     * 開啟編輯Dialog
     */
    const openEditDialog = () => {
      store.dispatch("HeaderEdit/openEditDialogAction", true);
    };

    const uid = computed({
      get() {
      return  store.getters["getUID"];
      },
      set(value) {
        store.dispatch("setUIDAction", value);
      },
    });

    /**
     * 1.如果點擊是 OBJECT、CAPTION 連結，跳轉該物件的畫面\
     * 2.如果是點擊編輯，則開起編輯視窗
     * @param {*} cell 被點擊的欄位
     */
    const CellMouseDown = (cell) => {
      if (cell.value == "") {
        return;
      }
      // 點擊 OBJECT、CAPTION的欄位 跳轉該物件的頁面
      if (["OBJECT_NAME"].includes(cell.colDef.field)) {
        if (cell.data.UID == null) {
          useRegisterParams.initalPaarams();
          useRegisterParams.PID = uid.value;
          useRegisterParams.OBJECT = cell.data.OBJECT;
          useRegisterParams.OBJECT_ID = cell.data.OBJECT_ID;
          useRegisterParams.OBJECT_LEVEL = cell.data.OBJECT_LEVEL;
          store.dispatch("registerAction", useRegisterParams).then((res) => {
            console.log(res);
            uid.value = res.data[0].UID;
            reslodUrl();
          });
          return;
        } else {
          uid.value =  cell.data.UID;
          reslodUrl();
        }
      }

      // 點擊編輯欄位、 開啟編輯 Dialog
      if (["EDIT"].includes(cell.colDef.field)) {
        store.dispatch("HeaderEdit/editTitle", cell.data.CAPTION || "");
        store.dispatch(
          "HeaderEdit/editDescription",
          cell.data.DESCRIPTION || ""
        );
        store.dispatch("HeaderEdit/editLeavelType", cell.data.LEVELTYPE);
        store.dispatch("HeaderEdit/editObjectLevel", cell.data.OBJECT_LEVEL);
        store.dispatch("HeaderEdit/editObject", cell.data.OBJECT_NAME);
        store.dispatch("HeaderEdit/editSchema", cell.data.SCHEMA_NAME||'');
        store.dispatch("HeaderEdit/editDB", cell.data.DB_NAME);
        // store.dispatch("HeaderEdit/editObjectName", cell.data.OBJECT_NAME);
        openEditDialog();
      }
    };

    const reslodUrl = () => {
      const url = router.resolve({
        path: "/index",
        query: {
          username: route.query.username,
          uid: uid.value || "",
        },
      });
      console.log(url);
      // 修改網址
      document.location.href = url.href;
      document.location.reload();
    };

    /**
     * Table欄位名稱
     */
    const columnColDefs = [
      {
        headerName: "PK",
        field: "PK",
        filter: "agTextColumnFilter",
        sortable: true,
        width: "80px",
        cellClass: "keyIcon",
        cellRenderer: function (params) {
          return `<div> <span class="material-symbols-outlined">vpn_key</span></div>`;
        },
      },
      {
        headerName: "COLUMN",
        field: "COLUMN_NAME",
        filter: "agTextColumnFilter",
        sortable: true,
        width: "140px",
      },
      {
        headerName: "DATA_TYPE",
        field: "DATA_TYPE",
        filter: "agTextColumnFilter",
        sortable: true,
        width: "203px",
      },
      {
        headerName: "IS_NULLABLE",
        field: "IS_NULLABLE",
        filter: "agTextColumnFilter",
        sortable: true,
        width: "140px",
      },
      {
        headerName: "COLUMN_DEFAULT",
        field: "COLUMN_DEFAULT",
        filter: "agTextColumnFilter",
        sortable: true,
        width: "140px",
      },
      {
        headerName: "DESCRIPTION",
        field: "DESCRIPTION",
        filter: "agTextColumnFilter",
        sortable: true,
        width: "240px",
      },
    ];
    /**
     * DB欄位名稱
     */

    const objectColDefs = [
      {
        headerName: "編輯",
        field: "EDIT",
        width: "70px",
        cellClass: "EditIcon",
        cellRenderer: function (params) {
          return `<a><span class="material-symbols-outlined">edit</span></a>`;
        },
      },
      {
        headerName: "SCHEMA",
        field: "SCHEMA_NAME",
        filter: "agTextColumnFilter",
        sortable: true,
        width: "120px",
      },
      {
        headerName: "OBJECT",
        field: "OBJECT_NAME",
        filter: "agTextColumnFilter",
        sortable: true,
        width: "200px",
        cellRenderer: function (params) {
          return `<div><a href="javascript:;" class="objectLink" >${params.value}</a></div>`;
        },
      },
      {
        headerName: "CAPTION",
        field: "CAPTION",
        filter: "agTextColumnFilter",
        sortable: true,
        width: "120px",
      },
      {
        headerName: "TYPE",
        field: "TYPE_DESC",
        filter: "agTextColumnFilter",
        sortable: true,
        width: "203px",
      },
      {
        headerName: "USER",
        field: "USER",
        filter: "agTextColumnFilter",
        sortable: true,
        width: "100px",
      },
      {
        headerName: "CRT_TIME",
        field: "CRT_TIME",
        filter: "agTextColumnFilter",
        sortable: true,
        width: "140px",
      },
      {
        headerName: "UPD_TIME",
        field: "UPD_TIME",
        filter: "agTextColumnFilter",
        sortable: true,
        width: "140px",
      },
    ];

    /**
     * HOST欄位名稱
     */
    const hostColDefs = [
      {
        headerName: "OBJECT",
        field: "OBJECT_NAME",
        filter: "agTextColumnFilter",
        sortable: true,
        width: "120px",
        cellRenderer: function (params) {
          return `<div><a href="javascript:;" >${params.value}</a></div>`;
        },
      },
      {
        headerName: "CAPTION",
        field: "CAPTION",
        filter: "agTextColumnFilter",
        sortable: true,
        width: "200px"
      },
      {
        headerName: "UPD_TIME",
        field: "UPD_TIME",
        filter: "agTextColumnFilter",
        sortable: true,
        width: "120px",
      },
      {
        headerName: "CRT_TIME",
        field: "CRT_TIME",
        filter: "agTextColumnFilter",
        sortable: true,
        width: "203px",
      },
    ];

    return {
      props,
      CellMouseDown,
      getObjectAgGridData,
      columnDefs:
        props.agGridType == "OBJECT"
          ? objectColDefs
          : props.agGridType == "COLUMN"
          ? columnColDefs
          : hostColDefs,
      defaultColDef: {
        floatingFilter: true,
        resizable: true,
      },
      rowClassRules: {
        display_PKnone: function (params) {
          return params.data.PK == "";
        },
        display_Readlynone: function (params) {
          return params.data.READONLY != 0;
        },
      },
      onGridReady(params) {
        window.ObjectGridApi = params.api;
        window.ObejctGridColumnApi = params.columnApi;
      },
    };
  },
};
</script>

<template>
  <div class="agGridwrap" v-if="!getObjectAgGridData.lenth > 0">
    <ag-grid-vue
      :style="[{ width: props.agGridWidth }, { height: props.agGridHight }]"
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      :rowData="getObjectAgGridData"
      :defaultColDef="defaultColDef"
      animateRows="true"
      @grid-ready="onGridReady"
      enableCellTextSelection="true"
      @CellMouseDown="CellMouseDown"
      :rowClassRules="rowClassRules"
    >
    </ag-grid-vue>
  </div>
</template>

<style lang="scss" scoped></style>
