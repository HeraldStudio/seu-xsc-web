<template>
  <div class="home">
    <div class="bg">
      <img class="bg-big-blue-block" src="../assets/background/big-blue-block.svg" />
      <img class="bg-big-orange-block" src="../assets/background/big-orange-block.svg" />
    </div>
    <div class="logo-title">
      <img class="seu-logo" src="../assets/seu-logo.svg" />
      <div></div>
      <img class="seu-font" src="../assets/seu-font.svg" />
      <p class="big-title">学工一站通平台</p>
      <div class="title-decoration"></div>
      <el-button style="margin-top:40px;width: 160px; font-size: 16px;" type="success" size="medium">点击进入</el-button>
    </div>
    <div class="copyright">
      <p>版权所有 © 东南大学学工部学生处 联系方式：xxxxxxxxxxx</p>
      <p>由 东南大学小猴偷米工作室 提供技术支持</p>
    </div>
  </div>
</template>

<script>
import { Button } from "element-ui";
export default {
  name: "home",
  components: {
    "el-button": Button
  }
};
</script>

<style lang="less">
.bg {
  z-index: -10;
  position: fixed;
  width: 100%;
  .bg-big-blue-block {
    width: 100%;
    position: fixed;
    left: 0;
    animation: blue-move-in 1s;
  }
  .bg-big-orange-block {
    width: 60%;
    position: fixed;
    bottom: 0;
    right: 0;
    animation: orange-move-in 2s;
  }
  @keyframes blue-move-in {
    from {
      top: -100px;
    }
    to {
      top: 0px;
    }
  }
  @keyframes orange-move-in {
    from {
      right: -80px;
    }
    to {
      right: 0;
    }
  }
}

.logo-title {
  position: fixed;
  top:0px;
  width:100%;
  text-align: center;
  animation: fadeIn 2s;
  .seu-font {
    color:#fff;
    width: 220px;
    margin-top:-50px;
    margin-bottom: -60px;
  }
  .seu-logo {
    width: 160px;
    margin-top: 20px;
  }
  .big-title {
    font-size: 24px;
    color: #fff;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .title-decoration{
    animation: line-extract 1s;
    margin-top: -40px;
    height: 2px; 
    font-size:24px; 
    width: 7em; 
    background:#fff;
    margin:0 auto;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 100;
    }
  }
  @keyframes line-extract {
    from {
      width: 0;
    }
    to {
      width: 7em;
    }
  }
}
.copyright{
    position: fixed;
    bottom: 10px;
    text-align:center;
    width: 100%;
    animation: slideIn 1s;
    p {
      margin: 3px;
      font-size: 10px;
    }
    @keyframes slideIn {
      from {
        bottom: -30px;
        opacity: 0;
      }
      to {
        bottom:10px;
        opacity: 100;
      }
    }
  }
</style>