<template>
  <div>
    <div class="bg">
      <img class="blue-block block-mobile" src="../assets/background/small-blue-block.svg" />
      <img class="blue-block block-pc" src="../assets/background/small-blue-block-pc.svg" />
      <img class="orange-block block-mobile" src="../assets/background/small-orange-block.svg" />
      <img class="orange-block block-pc" src="../assets/background/small-orange-block-pc.svg" />
    </div>
    <div class="app-content-wrapper">
    <div class="header">
      <img class="home-buttom" src="../assets/home.svg" />
      <img class="seu-logo" src="../assets/seu-logo.svg" />
      <div class="title">学工一站通</div>
      <div class="space"></div>
      <img class="logout-button" src="../assets/logout.svg" />
    </div>
    <div class="app-content">
      <h2 class="app-title">{{title}}</h2>
      <p class="app-desc">{{desc}}</p>
      <div class="panel">
        <slot></slot>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "desc", "isHome"]
};
</script>

<style lang="less" scoped>
.bg {
  z-index: -100;
  width: 100%;
  top: 0;
  position: fixed;
  @media screen and (min-width: 600px) {
    .block-mobile {
      display: none;
    }
  }
  @media screen and (max-width: 600px) {
    .block-pc {
      display: none;
    }
  }
  .blue-block {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: -98;
    animation: blueSlideIn 1s;
  }
  .orange-block {
    width: 60%;
    position: fixed;
    right: 0;
    top: 160px;
    z-index: -99;
    animation: orangeSlideIn 2s;
  }

  @keyframes blueSlideIn {
    from {
      top: -20px;
    }
    to {
      top: 0;
    }
  }
  @keyframes orangeSlideIn {
    from {
      top: 100px;
    }
    to {
      top: 160px;
    }
  }
}

.header {
  position: absolute;
  top: 5px;
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  align-items: center;
  animation: slideIn 1s;
  width: 100%;
  max-width: 1000px;
  .home-buttom {
    width: 30px;
    margin-left: 20px;
  }
  .seu-logo {
    width: 50px;
    margin-left: 7px;
  }
  .title {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    margin-left: 7px;
  }
  .space {
    flex-grow: 1;
  }
  .logout-button {
    width: 25px;
    margin-right: 20px;
  }
  @media screen and (min-width: 600px) {
    .logout-button {
      margin-right: 40px;
    }
    .home-buttom {
        margin-left: 40px;
    }
  }
  @keyframes slideIn {
    from {
      margin-top: -5px;
    }
    to {
      margin-top: 5px;
    }
  }
}
@media screen and (min-width: 600px) {
    .header {
        top: 15px;
    }
}
.app-content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.app-content {
  position: absolute;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  top: 50px;
  animation: appContentSlideIn 1s;
  .app-title {
    color: #fff;
    margin-bottom: 0;
    margin-left: 20px;
  }
  .app-desc {
    color: #fff;
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .panel {
    background: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin: 0 20px;
    margin-bottom: 30px;
    padding: 15px;
  }
  @media screen and (min-width: 600px) {
    .panel {
      margin: 0 40px;
      margin-top: 20px;
    }
    .app-title {
      margin-left: 40px;
      margin-right: 40px;
      margin-top: 40px;
    }
    .app-desc {
      margin-left: 40px;
    }
  }
}
@keyframes appContentSlideIn {
    from {
        opacity: 0;
        top:30px;
    }
    to {
        opacity: 1;
        top: 50px;
    }
}
</style>