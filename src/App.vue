<script>
import { watch } from "vue-demi";
export default {
  setup() {
    return {};
  },
};
</script>

<template>
  <router-view />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");

* {
  padding: 0;
  margin: 0;
}

html,
body {
  height: 100%;
}

// el-collapse
.el-collapse {
  border-top: none !important;
  border-bottom: none !important;
  .el-collapse-item__header {
    border-bottom: 1px solid #eee !important ;
    height: 22px !important;
    font-size: 24px !important;
    padding-bottom: 8px;
    margin-bottom: 8px;
    cursor: pointer !important;
    &.focusing {
      color: #000 !important;
    }
    .el-icon {
      margin-left: inherit !important;
      order: -1;
    }
  }

  .el-collapse-item__wrap {
    border-bottom: none !important ;
  }
}

.noteTable {
  .el-table__cell {
    padding: 0 !important;
  }
}

//table
.hostwrap {
  .el-table__cell {
    padding: 2px 0 !important;
  }
  .el-table__inner-wrapper {
    &::before {
    }
  }
}

.parametesWrap {
  .el-table__cell {
    padding: 2px 0 !important;
  }
}

.sqlScriptWrap {
  .el-table__cell {
    padding: 2px 0 !important;
    border-bottom: none !important;
    font-size: 12px;
    .cell {
      line-height: 14px !important;
    }
  }
}

// agGrid
.agGridwrap {
  .ag-root-wrapper.ag-layout-normal.ag-ltr {
    border: none !important;
    border-bottom: 1px solid #bdc3c7 !important;
  }
}

.agGridwrap {
  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 200, "GRAD" 0, "opsz" 20;
    font-size: 20px;
  }
  .keyIcon {
    transform: rotate(90deg);
    text-align: center;
    .material-symbols-outlined {
      font-variation-settings: "FILL" 1, "wght" 200, "GRAD" 0, "opsz" 20;
    }
  }

  .EditIcon {
    text-align: center;
    cursor: pointer;
    .material-symbols-outlined {
      font-variation-settings: "FILL" 1, "wght" 300, "GRAD" 0, "opsz" 20 !important;
    }
    &:hover {
      color: blue;
    }
  }

  .display_PKnone {
    .PKIcon {
      display: none;

      &.keyIcon {
        font-variation-settings: "FILL" 1, "wght" 300, "GRAD" 0, "opsz" 20;
      }
    }
  }

  .objectLink {
    text-decoration: none;
  }

  .discovered {
    .objectLink{
      color: #681da8;
    }
  }
}

//Dialog
.el-dialog__header {
  border-bottom: 1px solid #ccc !important;
  margin-right: 0 !important;
  padding: 5px 20px 0 20px !important;
  background: rgba(189, 219, 254, 0.4);
}

.el-dialog__headerbtn {
  height: 20px !important;
}
.el-dialog__body {
  padding: 10px 20px 20px 20px !important;
}

.scrollHeight {
  height: calc(100vh - 220px) !important;
  padding-right: 100px;
}

.ag-watermark {
  display: none !important;
}

.wrap .el-drawer__body {
  font-size: 15px;
  padding: 0;
}

.manageAccountWrap {
  .el-table__cell {
    padding: 2px 0 !important;
  }

  .ManageTopAgGridwrap {
    .ag-root-wrapper.ag-layout-normal.ag-ltr {
      border: none !important;
    }
  }
  .ManageUnderAgGridwrap {
    .ag-root-wrapper.ag-layout-normal.ag-ltr {
      border: none !important;
    }
    
    .cellRole{
      padding: 0 !important;
      border-left: 1px solid #ebeef5;
    }

    .cellRadio {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #59b359 !important;

      &:hover{
        background-color: bisque !important;
      }
      .radioStyle {
      opacity: 0;
      }

      .radioHidden {
        display: none;

        & ~ .lblRadioStyle {
          display: block;
          height: 100%;
          width: 100%;
          background: #000;
        }
        &:checked {
          & + .radioStyle {
            opacity: 1;
          }
        }
      }
    }
  }

  .btnSwitch{
    .el-icon{
              transform: rotate(90deg) !important;
           }
  }
}

.noteList{
  .el-textarea{
    vertical-align: text-top;
    .el-textarea__inner{
      padding: 0 ;
      box-shadow: none;

    }
  }
}

.noteWrap{
  .el-input__wrapper{
    box-shadow: none;
  }
}

textarea.el-textarea__inner{
   font-family: monospace;
   font-size: 13px;
   line-height: 16px;
}
</style>
