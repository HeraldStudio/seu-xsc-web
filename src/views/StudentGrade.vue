<template>
  <background title="学生成绩查询">
    <el-menu :default-active="type" class="el-menu-demo" mode="horizontal" @select="changeType">
      <el-menu-item index="student">按学生查询</el-menu-item>
      <el-menu-item index="subject">按科目查询</el-menu-item>
    </el-menu>
    <!--
    <div class="radio-pannel">
      <el-radio-group v-model="type" @change="changeType(type)" class="types">
        <el-radio label="student">学生</el-radio>
        <el-radio label="subject">科目</el-radio>
      </el-radio-group>
    </div>
    -->
    <div class="search-pannel">
      <div class="search-container">
        <el-input v-model="searchKey" :placeholder="searchHint"></el-input>
        <el-button style="margin-left:10px;" type="primary" @click="search">搜索</el-button>
      </div>
    </div>
    <div>
      <el-table v-if="type==='student'" :data="studentList" stripe style="width: 100%" @row-click="showDetail" ref="filterTable">
        <el-table-column  prop="name" label="姓名" ></el-table-column>
        <el-table-column  prop="cardnum" label="一卡通号" ></el-table-column>
        <el-table-column  prop="schoolNum" label="学号" :filters="filterCalssList" :filter-method="filterHandle"></el-table-column>
      </el-table>
      <el-table v-if="type==='subject'" :data="subjectList" stripe style="width: 100%" @row-click="showDetail" ref="filterTable">
        <el-table-column prop="title" label="名称" ></el-table-column>
        <el-table-column prop="average" label="平均分" ></el-table-column>
        <el-table-column prop="term" label="学期"  sortable :filters="filterTermList" :filter-method="filterHandle" ></el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog title="成绩列表" :visible.sync="detailForStudent" width="360px">
        <el-table :data="detailForStudentList" style="width: 100%" :row-class-name="selectStyle">
          <el-table-column prop="title" label="科目"></el-table-column>
          <el-table-column prop="credit" label="学分"></el-table-column>
          <el-table-column prop="grade" label="成绩"></el-table-column>
          <el-table-column prop="type" label="成绩性质"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
    <el-dialog title="详情列表" :visible.sync="detailForSubject" width="360px">
      <div class="title-header">
        <p class="content" @click="detailForSubjectList=detailForSubjectListFail">不及格 {{failcount + '/' + total}}</p>
        <p @click="detailForSubjectList=detailForSubjectListTotal">全选</p>
      </div>
      <el-table :data="detailForSubjectList" style="width: 100%" >
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="cardnum" label="一卡号"></el-table-column>
        <el-table-column prop="schoolNum" label="学号"></el-table-column>
        <el-table-column prop="grade" label="成绩"></el-table-column>
      </el-table>
    </el-dialog>
  </background>
</template>

<script>
import Background from "../components/Background.vue";
import { Input, Table, TableColumn, Dialog, Menu, MenuItem} from "element-ui";
export default {
  components: {
    background: Background,
    // "el-radio-group": RadioGroup,
    // "el-radio": Radio,
    "el-input": Input,
    "el-table": Table,
    "el-dialog": Dialog,
    "el-table-column": TableColumn,
    "el-menu": Menu,
    "el-menu-item":  MenuItem
  },
  data() {
    return {
      type: "student",
      searchKey: "",
      searchHint: "一卡通号/学号/姓名",
      studentList: [
        {
          name: "赵拯基",
          schoolNum: "060174xx",
          cardnum: "213171xxx"
        },
        {
          name: "高睿昊",
          schoolNum: "090161xx",
          cardnum: "213162xxx"
        },
        {
          name: "任栗晗",
          schoolNum: "711182xx",
          cardnum: "21318xxxx"
        }
      ],
      subjectList: [
        {
          title: "信号与系统",
          average: 77.6,
          term: "2018-3",
          failcount: "12/180"
        },
        {
          title: "数学物理方法",
          average: 67.6,
          term: "2018-2",
          failcount: "6/180"
        }
      ],
      filterTermList: [
        {
          text: '2018-3',
          value: '2018-3'
        },
        {
          text: '2018-2',
          value: '2018-2'
        },
      ],
      filterCalssList: [
        {
          text: '060174班',
          value: '060174'
        },
        {
          text: '090161班',
          value: '090161'
        },
        {
          text: '711182班',
          value: '711182'
        },
        
      ],
      detailForStudentList: [
        {
          title: "高等数学",
          credit: 4.5,
          grade: 97,
          type: '首修'
        },
        {
          title: "大学英语",
          credit: 1.5,
          grade: 80,
          type: '首修'
        },
        {
          title: "固体物理",
          credit: 2,
          grade: 59,
          type: '首修'
        },

      ],
      detailForSubjectListTotal: [
       {
          name: "赵拯基",
          schoolNum: "060174xx",
          cardnum: "213171xxx",
          grade: 55
        },
        {
          name: "高睿昊",
          schoolNum: "090161xx",
          cardnum: "213162xxx",
          grade: 99
        },
        {
          name: "任栗晗",
          schoolNum: "711182xx",
          cardnum: "21318xxxx",
          grade: 80
        }
      ],
      detailForSubjectListFail: [
       {
          name: "赵拯基",
          schoolNum: "060174xx",
          cardnum: "213171xxx",
          grade: 55
        },
      ],
      detailForSubjectList: [],
      detailForStudent: false,
      detailForSubject: false,
      failcount: "1",
      total: "180"
    };
  },
  methods: {
    changeType(key) {
      this.type = key;
      this.searchHint = this.type === "student" ? "一卡通号/学号/姓名" : "科目";
      this.$refs.filterTable.clearFilter()
    },
    showDetail() {
      if (this.type === "student") {
        this.detailForStudent = true;
      } else if (this.type === "subject") {
        this.detailForSubject = true;
      } else {
        console.log("");
      }
    },
    filterHandle(value, row) {
      if (this.type === "subject") {
        return row.term === value;
      }else if (this.type === "student") {
        return row.schoolNum.startsWith(value)
      }else{
        return true
      }
    },
    selectStyle({row}) {
      if (row.grade >= 96) {
        return 'success-row';
      } else if (row.grade < 60) {
        return 'warning-row';
      }
      return '';
    },
    async search() {
      console.log(this.searchKey);
    }
  },
  created() {
    this.detailForSubjectList = this.detailForSubjectListTotal;
  }
};
</script>

<style lang="less" scoped>
@import "../assets/common.css";
.types {
  display: flex;
  justify-content: space-around;
}
.radio-pannel {
  margin-top: 5px;
  margin-bottom: 15px;
}
.search-pannel {
  margin-bottom: 5px;
}
.search-container {
  display: flex;
}
.title-header {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.content {
  color: #F56C6C;
}
.el-menu-demo {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-bottom: 15px;
  
  .el-menu-item {
    height: 35px;
    line-height: 35px;
  }
}

</style>