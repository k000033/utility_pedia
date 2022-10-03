import { useStore } from "vuex";
import { computed } from "vue";
/**
 * 取得 編輯Note Dialog 參數的值
 * @returns 
 */
export const exportNoteInfo = () => {
    const store = useStore();

    const category = computed({get(){
        return store.getters["NoteEdit/getCategory"];
    },set(value){
        store.dispatch('NoteEdit/editCategory', value)
    }})

    const description = computed({
        get() {
            return store.getters["NoteEdit/getDescription"]
        }, set(value) {
            store.dispatch('NoteEdit/editDescription', value)
        }
    });

    const ID = computed(() => {
        return store.getters["NoteEdit/getID"]
    })

    const readOnly = computed(()=>{
        return store.getters["NoteEdit/getReadOnlyCollaspseTitle"]
    })

    const uid = computed(()=>{
        return store.getters["getUID"];
    })

    return { category, description, ID,readOnly,uid }
}