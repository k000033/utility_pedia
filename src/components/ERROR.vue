<script>
import { useStore } from 'vuex'
export default {
   setup(){

       const store = useStore();
       const BtnReturn =()=>{
           store.dispatch('setCurrentViewAction','body');
       }
       return{
        BtnReturn
       }
   }
}
</script>

<template>
    <div class="errorWrap">
        <div class="errorContent">
           <p>錯誤</p>
        </div>
        <div class="btn">
            <el-button type="primary" @click="BtnReturn">返回上一頁</el-button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
 .errorWrap{
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
     height: 100%;

     .errorContent{
         display: flex;
         flex-direction: column;
         align-items: flex-start;
         margin-bottom: 10px;
     }

     .btn{
         
     }
 }
</style>