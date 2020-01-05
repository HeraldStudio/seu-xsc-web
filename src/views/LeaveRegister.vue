<template>
  <background title="请假登记">
    <el-dialog :visible.sync="modifyDialogVisible" width="90%">
      <div slot="title">{{detail.type}}申请详情</div>
      <el-form ref="form" :model="form" label-width="85px">
        <el-form-item label="请假类型">
          <el-radio v-model="form.type" label="病假">病假</el-radio>
          <el-radio v-model="form.type" label="事假">事假</el-radio>
        </el-form-item>
        <el-form-item label="请假缘由">
          <el-input v-model="form.reason"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            class="value"
            v-model="form.startTime"
            type="datetime"
            placeholder="点击选择"
            :default-time="['20:00:00', '20:00:00']"
            format="yyyy-MM-dd hh:mm"
            value-format="yyyy-MM-dd hh:mm"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            class="value"
            v-model="form.endTime"
            type="datetime"
            placeholder="点击选择"
            :default-time="['20:00:00', '20:00:00']"
            format="yyyy-MM-dd hh:mm"
            value-format="yyyy-MM-dd hh:mm"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="是否离校">
          <el-radio v-model="form.leaveCampus" label="1">离校</el-radio>
          <el-radio v-model="form.leaveCampus" label="0">校内</el-radio>
        </el-form-item>
        <el-form-item label="离开南京">
          <el-radio v-model="form.leaveNanjing" label="1">是</el-radio>
          <el-radio v-model="form.leaveNanjing" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="具体去向">
          <el-input v-model="form.destination"></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人">
          <el-input v-model="form.emergencyContact"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-tabs v-model="activeName">
      <el-tab-pane label="待处理" name="first">
        <div class="search-container">
          <el-input v-model="searchKey" placeholder="一卡通号/学号/姓名"></el-input>
          <el-button style="margin-left:10px;" type="primary" @click="search">搜索</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已处理" name="second">
        <div class="search-container">
          <el-input v-model="searchKey" placeholder="一卡通号/学号/姓名"></el-input>
          <el-button style="margin-left:10px;" type="primary" @click="search">搜索</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div>
      <p class="content-title"></p>
      <el-table
        :data="tableData.filter(data => {
          let tmp= data.name.toLowerCase().includes(searchText)
          tmp = tmp||data.schoolNum.toLowerCase().includes(searchText.toLowerCase())
          tmp = tmp||data.cardNum.toLowerCase().includes(searchText.toLowerCase())
          tmp = tmp||data.text.toLowerCase().includes(searchText.toLowerCase())
          if(activeName == 'first') tmp = (data.state != '未处理') && tmp
          else if (activeName == 'second') tmp = (data.state == '未处理') && tmp
          return tmp
          })"
        style="width: 100%"
        @row-click="showDetail"
        :default-sort="{prop: 'read', order: 'descending'}"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          prop="read"
          label="消息状态"
          :fliters="[{ text: 'true', value: '已读'}, { text: 'false', value: '未读' }]"
          :fliter-method="fliterRead"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="70"
          :filters="[{ text: '事假', value: '事假' }, { text: '病假', value: '病假' }]"
          :filter-method="filterType"
          filter-placement="bottom-end"
        ></el-table-column>
        <el-table-column prop="start" label="日期" :sortable="true"></el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          :filters="[{ text: '未处理', value: '未处理' }, { text: '待定', value: '待定' }]"
          :filter-method="filterState"
          filter-placement="bottom-end"
          width="70"
        >
          
        </el-table-column>
      </el-table>
      <p v-if="activeName == 'first'">
        <el-button class="add-new" type="primary" icon="el-icon-plus" @click="newRegister()" circle></el-button>
      </p>
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
  // RadioGroup,
  //Tag,
  Tabs,
  TabPane,
  DatePicker,
  Form,
  FormItem
  // alert
} from "element-ui";

export default {
  components: {
    background: Background,
    "el-input": Input,
    "el-dialog": Dialog,
    "el-table": Table,
    "el-table-column": TableColumn,
    //"el-tag": Tag,
    "el-tabs": Tabs,
    "el-tab-pane": TabPane,
    "el-date-picker": DatePicker,
    "el-radio": Radio,
    "el-form": Form,
    "el-form-item": FormItem
    // "el-alert": alert
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      newType: "",
      newName: "",
      newSchoolNum: "",
      newCardNum: "",
      newTimestamp: "",
      newReason: "",
      activeName: "first",
      searchText: "",
      modifyDialogVisible: false,
      dialogVisible: false,
      type: "",
      detail: {},
      form: {
        type:'', // 请假类型：病假/事假
        reason:'', // 请假缘由
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        leaveCampus: false, //
        leaveNanjing: false, //
        destination: '', //
        emergencyContact: ''
      },
      tableData: [
        {
          name: "刘幽远",
          schoolNum: "06A171xx",
          cardNum: "213171xxx",
          start: "2019-10-1 20:00",
          end: "2019-10-7 20:00",
          type: "事假",
          state: "同意",
          read: "已读",
          text:
            "asudfhasduofasdfhoasdhgoasdfhoasdhsavnlasdfhdgouaodghoasdfsadflksalvnasldnglhiasdfhioasdghoiaso"
        },
        {
          name: "刘幽远",
          schoolNum: "090161xx",
          cardNum: "213162xxx",
          start: "2019-10-1 20:00",
          end: "2019-10-7 20:00",
          type: "事假",
          read: "未读",
          state: "驳回",
          text:
            "asudfhasduofasdfhoasdhgoasdfhoasdhsavnlasdfhdgouaodghoasdfsadflksalvnasldnglhiasdfhioasdghoiaso"
        },
        {
          name: "刘幽远",
          schoolNum: "71118xxx",
          cardNum: "21318xxxx",
          start: "2019-10-1 20:00",
          end: "2019-10-7 20:00",
          type: "病假",
          read: "未读",
          state: "同意",
          text:
            "asudfhasduofasdfhoasdhgoasdfhoasdhsavnlasdfhdgouaodghoasdfsadflksalvnasldnglhiasdfhioasdghoiaso"
        },
        {
          name: "刘幽远",
          schoolNum: "09018xxx",
          cardNum: "21318xxxx",
          start: "2019-10-1 20:00",
          end: "2019-10-7 20:00",
          type: "病假",
          read: "待反馈",
          state: "未处理",
          text:
            "asudfhasduofasdfhoasdhgoasdfhoasdhsavnlasdfhdgouaodghoasdfsadflksalvnasldnglhiasdfhioasdghoiaso"
        }
      ]
    };
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  methods: {
    handlePreview(file) {
      console.log(file);
    },
    isTimeOverlap() {
      for (let element of this.tableData) {
        if (element.state != "未处理") continue;
        if (
          this.newTimestamp[0] <= element.end &&
          this.newTimestamp[1] >= element.start
        ) {
          return true;
        }
      }
      return false;
    },
    tableRowClassName({ row }) {
      if (this.activeName === "second") return "";
      if (row.read === "未读") {
        return "warning-row";
      }
      return "";
    },
    newRegister() {
      this.modifyDialogVisible = true;
    },
    showDetail(row) {
      this.detail = row;
      this.dialogVisible = true;
    },
    approval() {
      this.tableData.splice(this.tableData.indexOf(this.detail), 1);
      //toDo: 同意申请API
      this.dialogVisible = false;
    },
    remove() {
      this.tableData.splice(this.tableData.indexOf(this.detail), 1);
      this.dialogVisible = false;
    },
    ensure() {
      this.detail.read = "已读";
      console.log(this.detail.read);
      this.dialogVisible = false;
    },
    submit() {
      if (this.newTimestamp === "") {
        this.$message("请选择你的离/返校时间！");
      } else if (this.isTimeOverlap()) {
        this.$message("请勿与已有行程冲突！");
      } else if (this.newSchoolNum === "") {
        this.$message("请输入你的学号");
      } else if (this.newName === "") {
        this.$message("请输入你的姓名");
      } else if (this.newCardNum === "") {
        this.$message("请输入你的一卡通号");
      } else {
        this.tableData.push({
          name: this.newName,
          schoolNum: this.newSchoolNum,
          cardNum: this.newCardNum,
          read: "待反馈",
          state: "未处理",
          type: this.newType,
          start: this.newTimestamp[0],
          end: this.newTimestamp[1],
          text: this.newReason
        });
        this.newReason = "";
        this.newName = "";
        this.newSchoolNum = "";
        this.newCardNum = "";
        this.newTimestamp = "";
        this.newType = "";
      }
      this.modifyDialogVisible = false;
    },
    filterState(value, row) {
      return row.state == value;
    },
    filterType(value, row) {
      return row.type == value;
    },
    fliterRead(value, row) {
      return row.read == value;
    },
    readOrNot(object1, object2) {
      let r1 = object1.read;
      let r2 = object2.read;
      if (r1[0] != r2[0]) {
        if (r1[0] == "未") return 1;
        else return -1;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/common.css";
.upload-demo {
  display: flex;
  justify-content: space-between;
  .el-icon-upload {
    width: 100%;
  }
  .el-upload__text {
    font-size: 16px;
  }
}
.add-new {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  font-size: 16px;
}
.search-container {
  display: flex;
}
.detail-table {
  border-top: 1px solid #eee;
  padding-top: 10px;
  .card {
    margin-top: 1em;
    .card-header {
      font-weight: bold;
      font-size: 18px;
    }
  }
  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    .key {
      width: 6em;
      text-align: right;
      font-size: 16px;
      font-weight: bold;
    }
    .key-input {
      width: 6em;
      text-align: right;
      font-size: 16px;
      margin-top: 7px;
      font-weight: bold;
    }
    .value {
      width: 90%;
      font-size: 16px;
      margin-left: 10px;
    }
    .app-Radio {
      width: 120%;
      font-size: 15px;
      font-weight: bold;
    }
  }
}
</style>