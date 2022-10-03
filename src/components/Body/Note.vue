<script>
import { computed, onMounted, ref } from "vue-demi";
import { useStore } from "vuex";
import NoteListBox from "../Body/component/NoteListBox.vue";
import { apiUsePediaUserParams } from "../../api/index";
import { useRoute } from 'vue-router';

export default {
  components: {
    NoteListBox,
  },
  setup() {
    const store = useStore();
    // const route = useRoute();
    const userParams=new apiUsePediaUserParams();
    /**
     * 判斷是不是唯讀，能不能新增附註
     * 0.false 1.true
     * 預設 1
     */
    const getReadOnly = computed(()=>{
      const res = store.getters["getDetail"];
      return res.length==0?1:res[0].READONLY
    });
    const getNoteData = computed(() => {
      console.log(store.getters["getNoetData"]);
      return store.getters["getNoetData"];
    });
    
    /**
     * 新增附註
     * 開啟編輯Dialog
     */
    const addNoteAction = ()=>{
      //  store.dispatch('NoteEdit/editDB',route.query.db);
      //  store.dispatch('NoteEdit/editCategory','');
      //  store.dispatch('NoteEdit/editDescription','');
      //  store.dispatch('NoteEdit/editID','');
      //  store.dispatch('NoteEdit/editObject',route.query.object);
      //  store.dispatch('NoteEdit/editSchema',route.query.schema);
       store.dispatch('NoteEdit/openNoteEditDialogAction',true);
    };


    // onMounted(()=>{
    //   setTimeout(()=>{
    //     oepn.value = true;
    //   },350)
    
    // })

    return {
      getNoteData,addNoteAction,getReadOnly
    };
  },
};
</script>

<template>

  <div class="noteWrap">
      <div class="title">
        <h3>附註</h3>
        <!-- DB.READONLY 0 = false, 1=true -->
        <span v-if="getReadOnly==0"  class="material-symbols-outlined" @click="addNoteAction()"> add </span>
      </div>
      <div v-for="item in getNoteData" :key="item.RID">
        <NoteListBox  :infoObj="item" />
      </div>
  </div>
</template>

<style lang="scss" scoped>
.noteWrap {
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .material-symbols-outlined{
      margin-left: 5px;
      &:hover{
        background: #eee;
        cursor: pointer;
      }
    }
  }
}
</style>
