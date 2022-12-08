<script>
import ExcelJs from "exceljs";
import { useStore } from "vuex";
import { computed, ref } from "vue-demi";
import { ElMessage } from "element-plus";
export default {
  components: {
    ElMessage,
  },
  setup() {
    const store = useStore();
    const exportExcelLoading = ref(false);
    const getDetail = computed(()=>{
      return store.getters["getDetail"];
    });
    const getObjectAgGridData = computed(() => {
      return store.getters["getObjectTableData"];
    });

    let columnList = [
      { PK: "主鍵" },
      { COLUMN_NAME: "資料行名稱" },
      { DATA_TYPE: "資料類型" },
      { IS_NULLABLE: "允許NULL" },
      { COLUMN_DEFAULT: "預設值" },
      { DESCRIPTION: "描述" },
    ];

    /**
     * 匯出EXCEL
     */
    const btnExportExcel = () => {
      exportExcelLoading.value = true;
      const data = getObjectAgGridData.value;
      //產生GRID
      // excelDataList.data = res.data;
      //匯出EXCEL總資料
          let excelRows = [];
          //匯出EXCEL每一筆資料
          let ValueAry = [];
          //EXCEL欄位名稱
          let columnAry = [];

          if (data.length == 0) {
            error("沒有資料");
            exportExcelLoading.value = false;
          }

          for (let [index, item] of data.entries()) {
            ValueAry = [];
            for (let key of columnList) {
              // console.log(key)
              if (index == 0) {
                // 欄位
                // 0: {name: '品類'}
                // 1: {name: '活動起日'}
                columnAry.push({ name: Object.values(key)[0] });
              }
              ValueAry.push(item[Object.keys(key)]);
            }
            excelRows.push(ValueAry);
            if (index == data.length - 1) {
              makeExcel(columnAry, excelRows);
            }
          }
    };

    const makeExcel = (excelColumn, excelRows) => {
      console.log(excelRows);
      const workbook = new ExcelJs.Workbook(); // 創建試算表檔案
      const sheet = workbook.addWorksheet("工作表1"); //在檔案中新增工作表 參數放自訂名稱
      sheet.addTable({
        // 在工作表裡面指定位置、格式並用columsn與rows屬性填寫內容
        name: "table名稱", // 表格內看不到的，讓你之後想要針對這個table去做額外設定的時候，可以指定到這個table
        ref: "A3", // 從A1開始
        columns: excelColumn,
        rows: excelRows,
      });

      sheet.getColumn(1).width = 9 + 0.71;
      sheet.getColumn(1).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

      sheet.getColumn(2).width = 20 + 0.71;
      sheet.getColumn(2).alignment = {
        vertical: "middle",
        horizontal: "left",
        wrapText: true,
      };

      sheet.getColumn(3).width = 15 + 0.71;
      sheet.getColumn(3).alignment = {
        vertical: "middle",
        horizontal: "left",
        wrapText: true,
      };

      sheet.getColumn(4).width = 15 + 0.71;
      sheet.getColumn(4).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

      sheet.getColumn(5).width = 12 + 0.71;
      sheet.getColumn(5).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      sheet.getColumn(6).width = 60.29 + 0.71;
      sheet.getColumn(6).alignment = {
        vertical: "middle",
        horizontal: "left",
        wrapText: true,
      };


      sheet.getRow(1).height = 20;
      sheet.getCell("A1").font = {
        size: 18,
      };
      sheet.getRow(2).height = 20;
      sheet.getCell("A2").font = {
        size: 14,
      };
      sheet.getCell("A1").alignment = {
        vertical: "middle",
        horizontal: "left",
      };
           sheet.getCell("A2").alignment = {
        vertical: "middle",
        horizontal: "left",
      };

      sheet.mergeCells("A1", "F1");
      sheet.getCell("A1").value = getDetail.value[0].DB_NAME+'.'+getDetail.value[0].OBJ_NAME;
      sheet.getRow(2).alignment = {
        vertical: "middle",
        horizontal: "left",
        wrapText: true,
      };
            sheet.mergeCells("A2", "F2");
      sheet.getCell("A2").value = getDetail.value[0].OBJ_CAPTION;
      sheet.getRow(2).alignment = {
        vertical: "middle",
        horizontal: "left",
        wrapText: true,
      };

    //   sheet.getColumn(4).eachCell({ includeEmpty: true }, function (cell) {
    //     console.log(cell);
    //     if (cell.value == "無產品別") {
    //       sheet.getCell(cell.address).fill = {
    //         type: "pattern",
    //         pattern: "solid",
    //         fgColor: {
    //           argb: "FFFFe462",
    //         },
    //       };
    //     }
    //   });

      // 表格裡面的資料都填寫完成之後，訂出下載的callback function
      // 異步的等待他處理完之後，創建url與連結，觸發下載
      workbook.xlsx.writeBuffer().then((content) => {
        const link = document.createElement("a");
        const blobData = new Blob([content], {
          type: "application/vnd.ms-excel;charset=utf-8;",
        });
        link.download = `${getDetail.value[0].DB_NAME+'.'+getDetail.value[0].OBJ_NAME}.xlsx`;
        link.href = URL.createObjectURL(blobData);
        link.click();
        exportExcelLoading.value = false;
      });
    };

    // 上方顯示訊息
    // 成功訊息
    const success = (msg) => {
      ElMessage({
        message: msg,
        type: "success",
        duration: 4000,
      });
    };

    // 失敗訊息
    const error = (msg) => {
      ElMessage({
        message: msg,
        type: "error",
        duration: 3000,
      });
    };
    return {
      exportExcelLoading,
      btnExportExcel,
      getDetail
    };
  },
};
</script>

<template>
  <div class="btnExportExcel">
    <el-button
      type="primary"
      size="small"
      @click="btnExportExcel"
      :loading="exportExcelLoading"
      >匯出EXCEL</el-button
    >
  </div>
</template>

<style lang="scss" scoped>
.btnExportExcel {
  margin-left: 12px;
}
</style>
