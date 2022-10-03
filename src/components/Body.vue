<script>
import { computed, onMounted, ref } from "vue-demi";
import { apiUsePediaParams } from "../api/index";
import { useStore } from "vuex";
import Detail from "./Body/Detial.vue";
import Collapse from "./Body/Collapse.vue";
import Note from "./Body/Note.vue";
import HostTable from "./Body/HostTable.vue";
import ObjectTable from "./Body/ObjectTable.vue";
import Parametes from "./Body/Parametes.vue";
import SqlScript from  "./Body/SQL_SCRIPT.vue";
import loadingIcon from "./Body/component/loading.vue";
import { apiGetBodyDataAction } from "../componentAPI/index";
import NoteEditDialog from "./Body/component/NoteEditDialog.vue";
import CollaspseEditDialog from "./Body/component/CollapseEditDialog.vue";
import { useRoute } from "vue-router";
export default {
  components: {
    Detail,
    Collapse,
    Note,
    HostTable,
    ObjectTable,
    loadingIcon,
    NoteEditDialog,
    CollaspseEditDialog,
    Parametes,
    SqlScript
  },
  setup() {
    const store = useStore();
    const pediaParams = new apiUsePediaParams();
    const { getBodyDataAction } = apiGetBodyDataAction();
    const route = useRoute();
    
    // const loading = computed(()=>{
    //   return store.getters["getLoading"];
    // })

    // const loading = computed({
    //   get() {
    //     return store.getters["getLoading"];
    //   },
    //   set(value) {
    //     store.dispatch("loadingSatatusAction", value);
    //   },
    // });

    const computedHeight = () => {
      const height = document.querySelector(".indexContainer").offsetHeight;
      const docHeight = document.querySelector("body").offsetHeight;
      if (height < docHeight) {
        document.querySelector(".dfoot").classList.add("heightFixed");
      } else {
      }
    };

    onMounted(() => {
      getBodyDataAction().then((res) => {
        // computedHeight();
      });

      //  pediaParams.initalPaarams();
      //  pediaParams.HOST= route.query.host;
      //  pediaParams.DB_NAME=route.query.db;
      //  pediaParams.SCHEMA_NAME=route.query.schema||"";
      //  pediaParams.OBJECT_NAME=route.query.object||"";
      //  store.dispatch('pediaAction',pediaParams).then((res)=>{
      //   loading.value=false
      //  });
    });

    return {
   
    };
  },
};
</script>

<template>

  <div class="wrap">
    <div>
      <Detail />
    </div>
    <div>
      <Note />
    </div>
    <div>
      <HostTable />
    </div>
    <div>
      <Parametes />
    </div>
    <div>
      <ObjectTable />
    </div>
    <div>
      <SqlScript/>
    </div>
    <div>
      <Collapse />
    </div>
    <NoteEditDialog />
    <CollaspseEditDialog />
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  // max-width: 960px;
  // margin: auto;
  div {
     margin: 20px auto 25px;
  }
}


</style>
