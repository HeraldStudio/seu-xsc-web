<template>
  <background title="学生课表查询">
    <el-dialog title="学生基本信息" :visible.sync="dialogVisible" width="90%">
      <div class="detail-table">
        <div class="row">
          <div class="key">姓名</div>
          <div class="value">{{detail.name}}</div>
        </div>
        <div class="row">
          <div class="key">学号</div>
          <div class="value">{{detail.schoolNum}}</div>
        </div>
        <div class="row">
          <div class="key">一卡通号</div>
          <div class="value">{{detail.cardnum}}</div>
        </div>
        <div class="row">
          <div class="key">生源地</div>
          <div class="value">{{detail.region}}</div>
        </div>
        <div class="row">
          <div class="key">联系电话</div>
          <div class="value">{{detail.phoneNum}}</div>
        </div>
        <div class="row">
          <div class="key">其他字段</div>
          <div class="value">其他信息</div>
        </div>
      </div>
    </el-dialog>
    <div>
      <el-radio-group v-model="radio1">
        <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
        <el-radio-button label="深圳"></el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <p class="content-title">快捷搜索</p>
      <div class="search-container">
        <el-input v-model="searchKey" placeholder="一卡通号/学号/姓名"></el-input>
        <el-button style="margin-left:10px;" type="primary" @click="search">搜索</el-button>
      </div>
    </div>
    <div>
      <p class="content-title"></p>
      <el-table :data="list" stripe style="width: 100%" @row-click="showDetail">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="cardnum" label="一卡通号"></el-table-column>
        <el-table-column prop="schoolNum" label="学号"></el-table-column>
      </el-table>
    </div>
  </background>
</template>

<script>
import Background from "../components/Background.vue";
import { Input, Dialog, Table, TableColumn, RadioButton, RadioGroup } from "element-ui";

export default {
  components: {
    background: Background,
    "el-input": Input,
    "el-dialog": Dialog,
    "el-table": Table,
    "el-table-column": TableColumn,
    "el-radio-button":RadioButton,
    "el-radio-group":RadioGroup
  },
  data() {
    return {
      searchFilters: "all",
      searchKey: "",
      dialogVisible: false,
      detail: {
        name: "赵拯基",
        schoolNum: "06A171xx",
        cardnum: "213171xxx",
        region: "河北省邯郸市",
        phoneNum: "132231110xx"
      },
      list: [
        {
          name: "赵拯基",
          schoolNum: "06A171xx",
          cardnum: "213171xxx"
        },
        {
          name: "高睿昊",
          schoolNum: "090161xx",
          cardnum: "213162xxx"
        },
        {
          name: "任栗晗",
          schoolNum: "71118xxx",
          cardnum: "21318xxxx"
        }
      ]
    };
  },
  methods: {
    search() {
      this.dialogVisible = true;
    },
    //showDetail(row, col) {
    showDetail() {
      // console.log(row, col);
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.search-container {
  display: flex;
}
.detail-table {
  border-top: 1px solid #eee;
  padding-top: 10px;
  .row {
    display: flex;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    .key {
      width: 5em;
      text-align: right;
      font-size: 16px;
      font-weight: bold;
    }
    .value {
      font-size: 16px;
      margin-left: 10px;
    }
  }
}
</style>