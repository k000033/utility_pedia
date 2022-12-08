<script>
export default {
  setup() {
    window.onload = function () {
      window.onscroll = function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop; //获取距离页面顶部的距离
        var uptop = document.getElementById("uptop"); //获取div元素
        if (t >= 80) {
          //当距离顶部超过300px时
          uptop.style.bottom = 50 + "px"; //使div距离底部30px，也就是向上出现
        } else {
          //如果距离顶部小于300px
          uptop.style.bottom = -80 + "px"; //使div向下隐藏
        }
      };

      var top = document.getElementById("to-top"); //获取图片元素
      var timer = null;
      top.onclick = function () {
        //点击图片时触发点击事件
        timer = setInterval(function () {
          //设置一个计时器
          var ct =
            document.documentElement.scrollTop || document.body.scrollTop; //获取距离顶部的距离
          ct -= 30;
          if (ct > 0) {
            //如果与顶部的距离大于零
            window.scrollTo(0, ct); //向上移动30px
          } else {
            //如果距离小于等于零
            window.scrollTo(0, 0); //移动到顶部
            clearInterval(timer); //清除计时器
          }
        }, 10); //隔5ms执行一次前面的function，展现一种平滑滑动效果
      };
      window.onscroll = function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop; //获取距离页面顶部的距离
        var uptop = document.getElementById("uptop"); //获取div元素
        if (t >= 80) {
          //当距离顶部超过300px时
          uptop.style.bottom = 50 + "px"; //使div距离底部30px，也就是向上出现
        } else {
          //如果距离顶部小于300px
          uptop.style.bottom = -180 + "px"; //使div向下隐藏
        }
      };

      window.onscroll = function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop; //获取距离页面顶部的距离
        var uptop = document.getElementById("uptop"); //获取div元素
        if (t >= 80) {
          //当距离顶部超过300px时
          uptop.style.bottom = 50 + "px"; //使div距离底部30px，也就是向上出现
        } else {
          //如果距离顶部小于300px
          uptop.style.bottom = -180 + "px"; //使div向下隐藏
        }
      };

      var top = document.getElementById("to-top"); //获取图片元素
      var timer = null;
      top.onclick = function () {
        clearInterval(timer);
        //点击图片时触发点击事件
        timer = setInterval(function () {
          //设置一个计时器
          var ct =
            document.documentElement.scrollTop || document.body.scrollTop; //获取距离顶部的距离
          ct -= 30;
          if (ct > 0) {
            //如果与顶部的距离大于零
            window.scrollTo(0, ct); //向上移动30px
          } else {
            //如果距离小于等于零
            window.scrollTo(0, 0); //移动到顶部
            clearInterval(timer); //清除计时器
          }
        }, 10); //隔5ms执行一次前面的function，展现一种平滑滑动效果
      };


    //   var top = document.getElementById("uptop"); //获取图片元素
    //   var timer = null;
    //   top.onclick = function () {
    //     //点击图片时触发点击事件
    //     timer = setInterval(function () {
    //       //设置一个计时器
    //       var ct =
    //         document.documentElement.scrollTop || document.body.scrollTop; //获取距离顶部的距离
    //       ct -= 30;
    //       if (ct > 0) {
    //         //如果与顶部的距离大于零
    //         window.scrollTo(0, ct); //向上移动30px
    //       } else {
    //         //如果距离小于等于零
    //         window.scrollTo(0, 0); //移动到顶部
    //         clearInterval(timer); //清除计时器
    //       }
    //     }, 5); //隔5ms执行一次前面的function，展现一种平滑滑动效果
    //   };
    };
  },
};
</script>

<template>
  <div class="uptop" id="uptop">
    <span id="to-top" class="material-symbols-outlined">
        arrow_upward
</span>
  </div>
</template>

<style scoped>
.uptop {
  position: fixed;
  bottom: -80px;
  right: 60px;
  width: 50px;
  z-index: 9999;
  text-align: center;
  width: 40px;
  height: 40px;
  border: 1px solid #eee;  
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0,0,0,.12);
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all .5s;
}
.uptop img {
  width: 80%;
  cursor: pointer;
}
#to-top{
    
    color: #5f6368;
    width: 100%;
    height: 100%;
    line-height: 40px;
}


</style>
