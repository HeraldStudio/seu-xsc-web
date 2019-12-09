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
          <div class="value">{{detail.cardNum}}</div>
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
          <div class="value">{{detail.end}}</div>
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
        <div class="detail-button" >
          <el-button type="warning" @click="reject()">驳回</el-button>
          <el-button type="infor" @click="letWaiting()" v-if="detail.state=='未处理'">待定</el-button>
          <el-button type="primary" @click="approval()">同意</el-button>
        </div>
      </div>
    </el-dialog>
    <div>快捷
      <p class="content-title">搜索</p>
      <div class="search-container">
        <el-input v-model="searchText" placeholder="一卡通号/学号/姓名"></el-input>
      </div>
      <!-- <el-radio-group v-model="type">
        <el-radio label="">所有</el-radio>
        <el-radio label="事假">事假</el-radio>
        <el-radio label="病假">病假</el-radio>
      </el-radio-group> -->
    </div>
    <div>
      <p class="content-title"></p>
      <el-table
        :data="tableData.filter(data => {
          let tmp= data.name.toLowerCase().includes(searchText)
          tmp = tmp||data.schoolNum.toLowerCase().includes(searchText.toLowerCase())
          tmp = tmp||data.cardNum.toLowerCase().includes(searchText.toLowerCase())
          //tmp = tmp||((data.type==type)||!type)
          return tmp
          })"
        stripe
        style="width: 100%"
        @row-click="showDetail"
      >
        <el-table-column prop="name" label="姓名" width="65"></el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="70"
          :filters="[{ text: '事假', value: '事假' }, { text: '病假', value: '病假' }]"
          :filter-method="filterType"
          filter-placement="bottom-end"
        ></el-table-column>
        <el-table-column prop="start" label="请假日期"></el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          :filters="[{ text: '未处理', value: '未处理' }, { text: '待定', value: '待定' }]"
          :filter-method="filterState"
          filter-placement="bottom-end"
          width="70"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state === '未处理' ? 'warning' : 'primary'"
              disable-transitions
            >{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>
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
  // Radio,
  // RadioGroup,
  Tag
} from "element-ui";

export default {
  components: {
    background: Background,
    "el-input": Input,
    "el-dialog": Dialog,
    "el-table": Table,
    "el-table-column": TableColumn,
    // "el-radio": Radio,
    // "el-radio-group": RadioGroup,
    "el-tag": Tag
  },
  data() {
    return {
      searchText: "",
      dialogVisible: false,
      type: "",
      detail: {},
      tableData: [
        {
          name: "赵拯基",
          schoolNum: "06A171xx",
          cardNum: "213171xxx",
          start:"2019/10/1",
          end:'2019/10/7',
          type: "事假",
          state: "未处理",
          text:"asudfhasduofasdfhoasdhgoasdfhoasdhsavnlasdfhdgouaodghoasdfsadflksalvnasldnglhiasdfhioasdghoiaso"
        },
        {
          name: "高睿昊",
          schoolNum: "090161xx",
          cardNum: "213162xxx",
          start:"2019/10/1",
          end:'2019/10/7',
          type: "事假",
          state: "未处理"
        },
        {
          name: "任栗晗",
          schoolNum: "71118xxx",
          cardNum: "21318xxxx",
          type: "病假",
          state: "未处理"
        },
        {
          name: "黄开鸿",
          schoolNum: "09018xxx",
          cardNum: "21318xxxx",
          type: "病假",
          state: "未处理"
        }
      ]
    };
  },
  methods: {
    showDetail(row) {
      this.detail = row;
      this.dialogVisible = true;
    },
    approval() {
      this.tableData.splice(this.tableData.indexOf(this.detail), 1);
      //toDo: 同意申请API
      this.dialogVisible = false;
    },
    reject() {
      this.tableData.splice(this.tableData.indexOf(this.detail), 1);
      //toDo: 拒绝申请API
      this.dialogVisible = false;
    },
    letWaiting() {
      this.tableData[this.tableData.indexOf(this.detail)].state = "待定";
      //toDo: 待定API
      this.dialogVisible = false;
    },
    filterState(value, row) {
      return row.state == value;
    },
    filterType(value, row){
      return row.type==value
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
      width:90%;
      font-size: 16px;
      margin-left: 10px;
    }
  }
  .detail-button {
    text-align: center;
  }
}
</style>