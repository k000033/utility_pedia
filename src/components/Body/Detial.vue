<script>
import { computed } from "vue-demi";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { apiUseMarkParams } from "../../api/index";
import HaderEditDialog from "../Body/component/HaderEditDialog.vue";
export default {
  components: {
    HaderEditDialog,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const useMarkParams = new apiUseMarkParams();
    const getDetail = computed(() => {
      return store.getters["getDetail"];
    });
    
    const getUserROle = computed(()=>{
      const res =  store.getters["getDetail"];
      return res.length==0?5:res[0].USER_ROLE;
    })
    // const getSubscription = computed(() => {
    //   store.getters["HeaderEdit/getSubscription"];
    // });

    /**
     * 訂閱按鈕
     * TYPE = 1
     * REFERENCE_TYPE = 0 訂閱，1不訂閱
     * REFERENCE = 訂閱人員顛
     */
    const btnSubscription = () => {
      useMarkParams.initalPaarams();
      useMarkParams.UID = getDetail.value[0].UID;
      useMarkParams.TYPE = 1;
      store.dispatch("HeaderEdit/editMarkAction", useMarkParams).then((res) => {
        getDetail.value[0].REFERENCE_TYPE =
          getDetail.value[0].REFERENCE_TYPE == 1 ? 0 : 1;
        getDetail.value[0].REFERENCE = res.data[0].REFERENCE;
      });
    };
    /**
     * 開啟編輯Dialog
     * 設定Dialog 要用的參數
     */
    const openEditDialog = () => {
      store.dispatch("HeaderEdit/editTitle", getDetail.value[0].OBJ_CAPTION);
      store.dispatch(
        "HeaderEdit/editDescription",
        getDetail.value[0].OBJ_DESCRIPTION || ""
      );
      store.dispatch("HeaderEdit/editLeavelType", getDetail.value[0].LEVELTYPE);
      store.dispatch(
        "HeaderEdit/editObjectLevel",
        getDetail.value[0].OBJECT_LEVEL
      );
      // store.dispatch("HeaderEdit/editObjectName", getDetail.value[0].OBJECT_NAME);
      store.dispatch(
        "HeaderEdit/editSchema",
        getDetail.value[0].SCHEMA_NAME || ""
      );
      store.dispatch("HeaderEdit/editObject", getDetail.value[0].OBJECT_NAME);
      store.dispatch("HeaderEdit/openEditDialogAction", true);
    };
    // username: route.query.username,
    //       host: params.HOST,
    //       db: params.DB_NAME,
    //       schema: params.SCHEMA_NAME,
    //       object: params.OBJECT_NAME,
    return {
      getDetail,
      btnSubscription,
      openEditDialog,
      getUserROle
    };
  },
};
</script>

<template>
  <div v-if="getDetail[0]" class="container">
    <!-- <div>
          <span>{{getDetail[0].OBJ_LOCATIION}} _ {{getDetail[0].OBJ_TYPE}}</span>
      </div> -->
    <div class="obj_type">
      <span>{{ getDetail[0].OBJ_TYPE }}</span>
    </div>
    <div class="obj_name">
      <span>{{ getDetail[0].OBJ_NAME }}</span>
    </div>
    <div class="obj_cpiton">
      <span>{{ getDetail[0].OBJ_CAPTION }} </span>
    </div>
    <div>
      <div class="obj_action">
        <nav>
          <ul class="page_action">
            <li class="liGroupIcon">
              <span class="material-symbols-outlined spnGroupIcon">
                group
              </span>
            </li>
            <li>
              <a href="javascript:;" @click="btnSubscription()">
                <span
                  :class="[
                    'material-symbols-outlined',
                    'spanIcon',
                    { isRefference: getDetail[0].REFERENCE_TYPE == 1 },
                  ]"
                >
                  notifications
                </span>
                <span class="spn_action spnUse">訂閱</span></a
              >
            </li>
            <li>
              <a href="javascript:;" @click="openEditDialog">
                <span class="material-symbols-outlined spanIcon">
                  import_contacts
                </span>
                <span class="spn_action spnEdit"> 收藏</span>
              </a>
            </li>
            <li v-if="getUserROle==2">
              <a href="javascript:;" @click="openEditDialog">
                <span class="material-symbols-outlined spanIcon spnEditIcon">
                  edit
                </span>
                <span class="spn_action spnEdit"> 編輯</span>
              </a>
            </li>
          </ul>
        </nav>
        <!-- <span class="material-symbols-outlined"> edit </span> -->
      </div>
    </div>
    <div class="refferenceBOX" v-if="getDetail[0].REFERENCE != null">
      <div>引用者清單</div>
      <div>
        {{ getDetail[0].REFERENCE }}
      </div>
    </div>
    <div class="dDescription" v-if="getDetail[0].OBJ_DESCRIPTION != null">
      <div>
        <span>{{ getDetail[0].OBJ_DESCRIPTION }}</span>
      </div>
    </div>
    <div>
      <HaderEditDialog :levelType="getDetail[0].LEVELTYPE" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
.container {
  margin-top: 30px;
  .obj_type {
    font-size: 9px;
  }
  .obj_name {
    font-size: 42px;
    font-weight: bold;
  }

  .obj_action {
    border-bottom: 1px solid #c8ccd1;
    padding-bottom: 8px;
    margin-bottom: 8px;
    .page_action {
      display: flex;
      list-style: none;
      justify-content: flex-end;
      li {
        //  群組ICon
        &.liGroupIcon {
          margin-right: auto;
          .spnGroupIcon {
            color: #3ec31d;
            // animation: test .3s infinite alternate-reverse ;
            transition: 0.3s;
          }
        }

        a {
          color: #000;
          display: flex;
          align-items: center;
          text-decoration: none;
          padding: 0 12px;

          .spanIcon {
            padding-right: 5px;
            &.spnEditIcon {
              font-variation-settings: "FILL" 1, "wght" 700, "GRAD" 0, "opsz" 48;
            }
            &.isRefference {
              font-variation-settings: "FILL" 1, "wght" 700, "GRAD" 0, "opsz" 48;
              color: #dddd0c;
            }
          }
        }
      }
    }
  }

  .obj_cpiton {
    display: flex;
    align-items: flex-end;
    font-size: 14px;
    padding-bottom: 8px;
    border-bottom: 1px solid #c8ccd1;
    margin-bottom: 8px;
    .material-symbols-outlined {
      margin-left: auto;
      font-variation-settings: "FILL" 1, "wght" 700, "GRAD" 0, "opsz" 48;
      padding: 2px;
      &:hover {
        outline: 1px solid #aaa;
        background: #eee;
      }
    }
  }

  .refferenceBOX {
    background: #f9f9f9;
    padding: 8px 8px 8px 30px;
    box-sizing: border-box;
    position: relative;
    font-size: 13px;
    &::before {
      content: "lightbulb";
      font-family: "Material Icons";
      position: absolute;
      left: 10px;
      top: 9px;
      color: #dddd0c;
    }
  }

  .dDescription {
    margin-top: 25px;
  }
}

@keyframes test {
  0% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(10deg);
  }
}
</style>
