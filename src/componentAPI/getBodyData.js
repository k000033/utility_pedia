import { useStore } from "vuex";
import { apiUsePediaParams,apiUseExternalDependency } from '../api/index'
import { useRoute,router, useRouter } from "vue-router";
import { computed } from "vue";
import {apiSwitchCpSqlName} from '../componentAPI/index'

/**
 * ` 取得 Body 資料
 * @returns
 */
export const getBodyData = () => {
    const store = useStore();
    const pediaParams = new apiUsePediaParams();
    const externalDependencyParams = new apiUseExternalDependency();
    const route = useRoute();
    const router= useRouter();
    // 取得 loading 狀態，來顯示loading icon
    const loading = computed({
        get() {
            return store.getters['getLoading'];
        }, set(value) {
            store.dispatch('loadingSatatusAction', value);
        }
    });

    
    /**
    *  透過網址去取值
    */
    const getBodyDataAction = () => {
        pediaParams.initalPaarams();
        pediaParams.UID =route.query.uid||'';
        return store.dispatch('pediaAction', pediaParams).then((res) => {
            console.log(res)
            store.dispatch('setUIDAction',res.data[0].UID);
            // loading icon 關掉
            loading.value = false;  //
            externalDependencyParams.DB_NAME =res.data[0].DB_NAME|| "";
            externalDependencyParams.OBJECT_ID = res.data[0].OBJECT_ID||'';
            externalDependencyParams._NAME = apiSwitchCpSqlName(res.data[0].SERVER);
            store.dispatch('getExternalDependency',externalDependencyParams);
            // if(data){
            //     state.objectID = data[0].OBJECT_ID;
            // }
        });
        
    }
    return { getBodyDataAction }
};