import { useStore } from "vuex";
import { computed } from "vue";
import { apiUseMangerParams } from '../api/index'
export const exportManagerData = () => {
  const store = useStore();
  const managerParams = new apiUseMangerParams();
  /**
   * 取得/設定 by_object 參數
   */
  const by_object = computed({
    get() {
      return store.getters['Manager/getBy_Object'];
    }, set(value) {
      store.dispatch('Manager/setBy_ObjectAction', value);
    }
  });
  /**
   * 取得 UID
   */
  const getUID = computed(() => {
    return store.getters["getUID"];
  })
  /**
   * 取得 人員/物件的上下AgGrid資料
   * @param {string} user_id 
   * @param {string} uid 
   */
  const getTopAgGridData = () => {
    // 先取得上面AgGrid資料
    managerParams.intitalParams();
    managerParams.PID = getUID.value;
    managerParams.BY_OBJECT = by_object.value;
    store.dispatch('Manager/fetchManagersData', { ...managerParams }).then((res) => {
      console.log(res.data);
      if (res.data.length > 0) {
        getUnderAgGridData(res.data[0].ID);

        if (by_object.value == 0) {
          window.MangerTopGridApi.getRowNode(managerParams.USER_ID).selectThisNode(true);
        } else if (by_object.value == 1) {
          window.MangerTopGridApi.getRowNode(managerParams.UID).selectThisNode(true);
        }
        // //在取得下面AgGrid 資料
        // managerParams.intitalParams();
        // managerParams.PID = getUID.value;
        // managerParams.BY_OBJECT = by_object.value;
        // // 0. 是以人的角度去做設定
        // // 1. 是以物件的角度去做設定
        // if (by_object.value == 0) {
        //   //當沒有傳入 user_id 時，預設第一筆人員 ID;
        //   managerParams.USER_ID = id == "" ? res.data[0].ID : id;
        // } else {
        //    //當沒有傳入 uid 時，預設第一筆物件 uid;
        //   managerParams.UID = id == "" ? res.data[0].ID : id;
        // };

        // store.dispatch('Manager/fetchManagersData', { ...managerParams }).then((res) => {
        //   console.log(res.data);
        //   if (by_object.value == 0&&id=="") {
        //     window.MangerTopGridApi.getRowNode(managerParams.USER_ID).selectThisNode(true);
        //   }else if(by_object.value == 1&&id==""){
        //     window.MangerTopGridApi.getRowNode(managerParams.UID).selectThisNode(true);
        //   }      

        // })
      };
    })
  }

  const getUnderAgGridData = (id) => {
    //在取得下面AgGrid 資料
    managerParams.intitalParams();
    managerParams.PID = getUID.value;
    managerParams.BY_OBJECT = by_object.value;
    // 0. 是以人的角度去做設定
    // 1. 是以物件的角度去做設定
    if (by_object.value == 0) {
      //當沒有傳入 user_id 時，預設第一筆人員 ID;
      managerParams.USER_ID = id;
    } else {
      //當沒有傳入 uid 時，預設第一筆物件 uid;
      managerParams.UID = id;
    };

    store.dispatch('Manager/fetchManagersData', { ...managerParams }).then((res) => {
      console.log(res.data);


    })
  };

  const setMagagerAction = (topID, underID, role) => {
    managerParams.intitalParams();
    if (by_object.value == 0) {
      managerParams.USER_ID = topID;
      managerParams.UID = underID;
    } else {
      managerParams.UID = topID;
      managerParams.USER_ID = underID;
    }
    managerParams.ROLE = role;
    store.dispatch('Manager/setManagerAction', { ...managerParams });
  }



  return { getTopAgGridData, by_object, getUnderAgGridData, setMagagerAction }
}