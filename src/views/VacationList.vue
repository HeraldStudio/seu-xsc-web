// toDo: 表格数组自动排序
<template>
  <background title="节假日管理">
    <div class="topBar">
      <el-row>
        <el-col :span="24" offset="0">
          <el-form label-width="5em">
            <el-form-item label="节日名称" prop="name">
              <el-input v-model="inputData.name" size="medium" placeholder="需要添加的节假日名"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker
                type="date"
                v-model="inputData.start"
                size="medium"
                placeholder="节假日开始时间"
                format="yyyy 年 MM 月 dd 日"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                type="date"
                v-model="inputData.end"
                size="medium"
                placeholder="节假日结束时间"
                format="yyyy 年 MM 月 dd 日"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button size="medium" type="primary" @click="newRow(inputData,tableData)">新增</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="tableData"
      stripe="true"
      style="width: 100%"
      @selection-change="selectChange"
      :default-sort="{prop: 'start', order: 'ascending'}"
    >
      <el-table-column class="el-table-column" type="selection" width="27%"></el-table-column>
      <el-table-column class="el-table-column" prop="name" label="名称" width="70%"></el-table-column>
      <el-table-column class="el-table-column" prop="start" label="开始时间"></el-table-column>
      <el-table-column class="el-table-column" prop="end" label="结束时间"></el-table-column>
    </el-table>
    <el-button
      class="deleteButton"
      type="danger"
      size="large"
      v-if="multipleSelection.length"
      @click="deleteRow(multipleSelection,tableData)"
    >删除选中行</el-button>
  </background>
</template>

<script>
import Background from "../components/Background.vue";
// import deleteIcon from "../assets/delete.svg"
import {
  Table,
  TableColumn,
  Button,
  Row,
  Col,
  form,
  formItem,
  Input,
  DatePicker
} from "element-ui";

export default {
  components: {
    background: Background,
    "el-table": Table,
    "el-table-column": TableColumn,
    "el-button": Button,
    "el-col": Col,
    "el-row": Row,
    "el-form": form,
    "el-form-item": formItem,
    "el-input": Input,
    "el-date-picker": DatePicker
  },
  data() {
    return {
      tableData: [
        {
          name: "国庆节",
          start: "2019/10/1",
          end: "2019/10/7"
        },
        {
          name: "元旦节",
          start: "2019/12/31",
          end: "2020/1/1"
        },
        {
          name: "清明节",
          start: "2019/4/1",
          end: "2019/4/2"
        }
      ],
      inputData: {
        name: "",
        start: "",
        end: ""
      },
      multipleSelection: []
    };
  },
  methods: {
    deleteRow(list, data) {
      this.$confirm("是否删除选中行", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "confirm",
        center: true
      }).then(() => {
        list.forEach(x => {
          data.splice(data.indexOf(x), 1);
        });
        this.$message({
          message: "删除成功",
          center: "true",
          customClass: "message"
        });
      });
    },
    newRow(index, data) {
      if (!index.name) {
        this.$message({
          message: "名称不能为空!",
          type: "warning",
          center: "true",
          customClass: "message"
        });
      } else if (index.start == "") {
        this.$message({
          message: "必须填写开始时间!",
          type: "warning",
          center: "true",
          customClass: "message"
        });
      } else if (index.end == "") {
        let d = {
          name: index.name,
          start: `${index.start.getFullYear()}/${index.start.getMonth() +
            1}/${index.start.getDate()}`,
          end: `未定义`
        };

        data.push(d);
        this.inputData = {
          name: "",
          start: "",
          end: ""
        };
      } else if (index.start.getTime() > index.end.getTime()) {
        this.$message({
          message: "开始时间晚于结束时间!",
          type: "warning",
          center: "true",
          customClass: "message"
        });
      } else {
        let d = {
          name: index.name,
          start: `${index.start.getFullYear()}/${index.start.getMonth() +
            1}/${index.start.getDate()}`,
          end: `${index.end.getFullYear()}/${index.end.getMonth() +
            1}/${index.end.getDate()}`
        };

        data.push(d);
        this.inputData = {
          name: "",
          start: "",
          end: ""
        };
      }
    },
    selectChange(data) {
      this.multipleSelection = data;
    }
  }
};
</script>

<style>
.topBar {
  width: 100%;
  background-color: white;
}
.deleteIcon {
  width: 5px;
  height: 5px;
}
.deleteButton {
  margin-top: 1em;
  margin-left: 2.5em;
}
.message {
  margin-top: 2.2em;
  font-size: 20px;
  height: 2.5em;
}
.confirm {
  width: 80%;
}
.el-table-column {
  text-align: right;
}
</style>