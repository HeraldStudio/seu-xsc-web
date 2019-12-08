<template>
  <background title="请假审批">
    <el-dialog title="请假申请详情" :visible.sync="dialogVisible" width="90%">
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
          <div class="key">类型</div>
          <div class="value">{{detail.type}}</div>
        </div>
        <div class="row">
          <div class="key">离校时间</div>
          <div class="value">{{detail.start}}</div>
        </div>
        <div class="row">
          <div class="key">回校时间</div>
          <div class="value">{{detail.start}}</div>
        </div>
        <div class="row">
          <div class="key">请假缘由</div>
          <div class="value">{{detail.text}}</div>
        </div>
        <div class="row">
          <div class="key">证明材料</div>
          <div class="value">{{detail.evidence}}</div>
        </div>
        <div class="row">
          <div class="key">联系电话</div>
          <div class="value">{{detail.phoneNum}}</div>
        </div>
        <div class="detail-button">
          <el-button type="warning" @click="reject()">驳回</el-button>
          <el-button type="primary" @click="approval()">同意</el-button>
        </div>
      </div>
    </el-dialog>
    <div>快捷
      <p class="content-title">搜索</p>
      <div class="search-container">
        <el-input v-model="searchText" placeholder="一卡通号/学号/姓名"></el-input>
      </div>
      <el-radio-group v-model="type" >
        <el-radio label>所有</el-radio>
        <el-radio label="事假">事假</el-radio>
        <el-radio label="病假">病假</el-radio>
      </el-radio-group>
    </div>
    <div>
      <p class="content-title"></p>
      <el-table
        :data="tableData.filter(data => {
          let tmp= data.name.toLowerCase().includes(searchText.toLowerCase())
          tmp = tmp&&data.schoolNum.toLowerCase().includes(searchText.toLowerCase())
          tmp = tmp&&data.cardnum.toLowerCase().includes(searchText.toLowerCase())
          tmp = tmp&&((data.type==type)||!type)
          return tmp
          })"
        stripe
        style="width: 100%"
        @row-click="showDetail"
      >
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="start" label="时间"></el-table-column>
      </el-table>
    </div>
  </background>
</template>

<script>
import Background from "../components/Background.vue";
import {
  Input,
  Dialog,
  Table,
  TableColumn,
  Radio,
  RadioGroup
} from "element-ui";

export default {
  components: {
    background: Background,
    "el-input": Input,
    "el-dialog": Dialog,
    "el-table": Table,
    "el-table-column": TableColumn,
    "el-radio": Radio,
    "el-radio-group": RadioGroup
  },
  data() {
    return {
      searchText: "",
      dialogVisible: false,
      type: "",
      detail: {
        name: "赵拯基",
        schoolNum: "06A171xx",
        cardnum: "213171xxx",
        phoneNum: "132231110xx",
        state:"waiting",
      },
      tableData: [
        {
          name: "赵拯基",
          schoolNum: "06A171xx",
          cardnum: "213171xxx",
          type: "事假",
          state:"waiting",
        },
        {
          name: "高睿昊",
          schoolNum: "090161xx",
          cardnum: "213162xxx",
          type: "事假",
          state:"waiting"
        },
        {
          name: "任栗晗",
          schoolNum: "71118xxx",
          cardnum: "21318xxxx",
          type: "病假",
          state:"waiting"
        },
        {
          name: "黄开鸿",
          schoolNum: "09018xxx",
          cardnum: "21318xxxx",
          type: "病假",
          state:"waiting"
        }
      ]
    };
  },
  methods: {
    showDetail(row) {
      this.detail = row;
      this.dialogVisible = true;
    },
    approval(){
      this.tableData.splice(this.tableData.indexOf(this.detail),1)
      //toDo: 同意申请API
      this.dialogVisible=false
    },
    reject(){
      this.tableData.splice(this.tableData.indexOf(this.detail),1)
      //toDo: 拒绝申请API
      this.dialogVisible =false
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
  .detail-button {
    text-align: center;
  }
}
</style>