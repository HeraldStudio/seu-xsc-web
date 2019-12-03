<template>
  <div>
    <div class="bg">
      <img class="blue-block" src="../assets/background/small-blue-block.svg" />
      <img class="orange-block" src="../assets/background/small-orange-block.svg" />
    </div>
    <div class="header">
        <img class="seu-logo" src="../assets/seu-logo.svg" />
        <div class="title">学工一站通</div>

    </div>
    <div>
        <h2>{{title}}</h2>
        <p>{{desc}}</p>
    </div>
    <div class="panel">
    </div>
  </div>
</template>

<script>
export default {
    props:['title','desc','isHome']
};
</script>

<style lang="less" scoped>
.bg {
  z-index: -100;
  width: 100%;
  top: 0;
  .blue-block {
    position: absolute;
    top: 0;
    z-index: -98;
    animation: blueSlideIn 1s;
  }
  .orange-block {
    position: absolute;
    right: 0;
    top: 180px;
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
      right: -80px;
    }
    to {
      right: 0;
    }
  }
}
.header {
    position: absolute;
    top: 5px;
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    margin-left: 17px;
    align-items: center;
    animation: slideIn 1s;
    .seu-logo {
        width:50px;
    }
    .title {
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        margin-left: 7px;
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
</style>