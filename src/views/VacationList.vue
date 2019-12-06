<template>
  <background title="节假日管理">
    <div class="topBar">
      <el-row>
        <el-col :span="24" offset="0">
          <el-form label-width="5em">
            <el-form-item label="节日名称" >
              <el-input v-model="inputData.name" size="small"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker v-model="inputData.start" size="medium"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker v-model="inputData.end" size="medium"></el-date-picker>
            </el-form-item>
            <el-form-item >
              <el-button size="medium" type="primary" @click="newVac()">新增</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="节日名称"></el-table-column>
      <el-table-column prop="start" label="开始时间"></el-table-column>
      <el-table-column prop="end" label="结束时间"></el-table-column>
      <el-table-column  label="操作" fixed="right" width="10%">
        <template slot-scope="scope">
          <img src="../assets/delete.svg" @click="deleteRow(scope.row,tableData)"/>
        </template>
      </el-table-column>
    </el-table>
  </background>
</template>

<script>
import Background from "../components/Background.vue";
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
          name: "元旦",
          start: "",
          end: ""
        },
        {
          name: "端午节",
          start: "",
          end: ""
        },
        {
          name: "清明节",
          start: "",
          end: ""
        }
      ],
      inputData: {
        name: "",
        start: "",
        end: ""
      }
    };
  },
  methods: {
    deleteRow(index, data) {
      console.log(index);
      data.splice(index, 1);
    }
  }
};
</script>

<style>
.topBar {
  width: 100%;
  background-color: white;
}
</style>