<template>
  <div :to="route" class="menu-item">
      <div class="role-hint">{{role}}</div>
      <div class="icon-bg">
          <img :src="icon" class="icon"/>
      </div>
      <div class="title">
          {{title}}
      </div>
  </div>
</template>

<script>
export default {
    props: ['icon','title', 'route', 'role']
}
</script>

<style lang="less" scoped>
.menu-item {
    margin: 8px;
    background-color:#f8f8f8;
    border-radius: 5px;
    flex-basis: 70px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 10px;
    .role-hint {
        font-size: 12px;
        background-color: #FFF8B6;
        border-radius:5px;
        margin-bottom: 10px;
        padding: 5px;
    }
    .icon-bg {
        width: 40px;
        height: 40px;
        border-radius: 100px;
        background-color:#f0f0f0;
        padding: 10px;
        .icon {
            width:100%;
        }
    }
    .title {
        margin-top: 20px;
        font-weight: bold;
        color:#005A3A;
        font-size:14px;
        white-space: nowrap;
    }
}
</style>