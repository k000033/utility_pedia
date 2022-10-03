import { useStore } from "vuex";
import { computed } from "vue";

/**
 *  取得 編輯 header Dialog 的 參數的值
 * @returns
 */
export const exportDBInfo = ()=>{
    const store = useStore();
    const uid = computed(()=>{
        return store.getters['getUID'];
    });
    const description = computed({get(){
        return store.getters["HeaderEdit/getDescription"]
    },set(value){
      store.dispatch("HeaderEdit/editDescription",value)
    }});

    const title = computed({get(){
        return store.getters["HeaderEdit/getTitle"]
    },set(value){
      store.dispatch("HeaderEdit/editTitle",value)
    }});

    const levelType = computed(()=>{
        return store.getters["HeaderEdit/getLevelType"];
    });

    const objectLevel = computed(()=>{
        return store.getters["HeaderEdit/getObjectLevel"];
    })

    const DB = computed(()=>{
        return store.getters["HeaderEdit/getDB"];
    });

    const schema = computed(()=>{
        return store.getters["HeaderEdit/getSchema"];
    });


    const object = computed(()=>{
        return store.getters["HeaderEdit/getObject"];
    });


    return {levelType,uid,description,title,DB,schema,object,objectLevel}
}