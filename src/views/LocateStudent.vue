<template>
  <background title="离/在校情况查询">
    <el-dialog title="学生离/在校情况" :visible.sync="dialogVisible" width="90%">
      <el-dialog width="50%" title="详细行程" :visible.sync="detailTrip" append-to-body>
        <el-timeline style="padding-left:10px">
          <el-timeline-item
            v-for="(activity, index) in detail.activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :hide-timestamp="true"
            :timestamp="activity.timestamp"
            placement="top"
          >
            <el-card shadow="hover">
              <div slot="header" class="clearfix">
                <span
                  style="font-size:20px; font-weight:bold;padding-left:10px"
                >{{ activity.content }}</span>
              </div>
              <p>
                <span class="index">离校时间</span>
                <span class="content">{{ activity.timestamp }}</span>
              </p>
              <p>
                <span class="index">返校时间</span>
                <span class="content">{{ activity.backTimestamp }}</span>
              </p>
              <p>
                <span class="index">详细去向</span>
                <span class="content">{{ activity.target }}</span>
              </p>
              <p>
                <span class="index">紧急联系</span>
                <span class="content">{{ activity.emergencyContact }}({{activity.emergencyPeople}})</span>
              </p>
              <p>
                <span class="index">在南京吗</span>
                <i v-if="activity.isNanjing" class="el-icon-success" style="margin-left:30px"></i>
                <i v-if="!activity.isNanjing" class="el-icon-error" style="margin-left:30px"></i>
              </p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-dialog>
      <el-container v-if="this.screenWidth>=760">
        <el-aside width="30%">
          <el-avatar shape="square" :size="150" :src="detail.avatar"></el-avatar>
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
              <div class="key">联系电话</div>
              <div class="value">{{detail.phoneNum}}</div>
            </div>
            <div class="row">
              <div class="key">在学校吗</div>
              <div class="value">
                <i v-if="detail.location === '在校'" class="el-icon-success"></i>
                <i v-if="!detail.location === '在校'" class="el-icon-error"></i>
              </div>
            </div>
          </div>
        </el-aside>
        <el-container>
          <el-main>
            <template v-for="(activity,index) in detail.activities">
              <el-card :key="index" shadow="hover" v-if="isNow(activity)">
                <div slot="header" class="clearfix">
                  <span style="font-size:20px; font-weight:bold;padding-left:10px">当前行程</span>
                  <el-button
                    style="float: right; padding: 3px 0 ; color:#0C84E4"
                    type="text"
                    @click="detailTrip = true"
                    v-if="!(isNoTrip())"
                  >详细行程</el-button>
                </div>
                <p>
                  <span class="index">离校原因</span>
                  <span class="content">{{ activity.content }}</span>
                </p>
                <p>
                  <span class="index">离校时间</span>
                  <span class="content">{{ activity.timestamp }}</span>
                </p>
                <p>
                  <span class="index">返校时间</span>
                  <span class="content">{{ activity.backTimestamp }}</span>
                </p>
                <p>
                  <span class="index">详细去向</span>
                  <span class="content">{{ activity.target }}</span>
                </p>
                <p>
                  <span class="index">紧急联系</span>
                  <span
                    class="content"
                  >{{ activity.emergencyContact }}({{activity.emergencyPeople}})</span>
                </p>
                <p>
                  <span class="index">在南京吗</span>
                  <i v-if="activity.isNanjing" class="el-icon-success"></i>
                  <i v-if="!activity.isNanjing" class="el-icon-error"></i>
                </p>
              </el-card>
            </template>
            <div v-if="isNoTrip()">
              <!-- <span>
                暂无当前行程
              </span>-->
              <template>
                <img :src="imgUrl" />
              </template>
              <el-button
                style="float: right; padding: 3px 0 ; color:#0C84E4"
                type="text"
                @click="detailTrip = true"
              >近期行程</el-button>
            </div>
          </el-main>
          <el-divider></el-divider>
          <el-footer>这里放请假详情</el-footer>
        </el-container>
      </el-container>
      <div v-if="this.screenWidth<760" class="mobile">
        <el-avatar shape="square" :size="150" :src="detail.avatar"></el-avatar>
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
            <div class="key">联系电话</div>
            <div class="value">{{detail.phoneNum}}</div>
          </div>
          <div class="row">
            <div class="key">在学校吗</div>
            <div class="value">
              <i v-if="detail.location === '在校'" class="el-icon-success"></i>
              <i v-if="!(detail.location === '在校')" class="el-icon-error"></i>
            </div>
          </div>
        </div>
        <el-timeline style="padding-left:10px">
          <el-timeline-item
            v-for="(activity, index) in detail.activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :hide-timestamp="true"
            :timestamp="activity.timestamp"
            placement="top"
          >
            <el-card shadow="hover">
              <div slot="header" class="clearfix">
                <span
                  style="font-size:20px; font-weight:bold;padding-left:10px"
                >{{ activity.content }}</span>
              </div>
              <p>
                <span class="index">离校时间</span>
                <span class="content">{{ activity.timestamp }}</span>
              </p>
              <p>
                <span class="index">返校时间</span>
                <span class="content">{{ activity.backTimestamp }}</span>
              </p>
              <p>
                <span class="index">详细去向</span>
                <span class="content">{{ activity.target }}</span>
              </p>
              <p>
                <span class="index">紧急联系</span>
                <span class="content">{{ activity.emergencyContact }}({{activity.emergencyPeople}})</span>
              </p>
              <p>
                <span class="index">在南京吗</span>
                <i v-if="activity.isNanjing" class="el-icon-success" ></i>
                <i v-if="!activity.isNanjing" class="el-icon-error"></i>
              </p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-dialog>
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
        <el-table-column prop="name" label="姓名" min-width="62px"></el-table-column>
        <el-table-column prop="cardnum" label="一卡通号" min-width="88px"></el-table-column>
        <el-table-column prop="schoolNum" label="学号" min-width="84px"></el-table-column>
        <el-table-column
          prop="location"
          label="在校情况"
          :filters="[{ text: '在校', value: '在校' }, { text: '离校', value: '离校' }]"
          :filter-method="filterLocation"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.location === '在校' ? 'success' : 'warning'"
              disable-transitions
            >{{scope.row.location==="在校"?"在校":"离校"}}</el-tag>
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
  Tag,
  Container,
  Aside,
  Footer,
  Main,
  Avatar,
  Timeline,
  TimelineItem,
  Card,
  Divider
} from "element-ui";

export default {
  components: {
    background: Background,
    "el-input": Input,
    "el-dialog": Dialog,
    "el-table": Table,
    "el-table-column": TableColumn,
    "el-tag": Tag,
    "el-container": Container,
    "el-aside": Aside,
    "el-footer": Footer,
    "el-main": Main,
    "el-avatar": Avatar,
    "el-timeline": Timeline,
    "el-timeline-item": TimelineItem,
    "el-card": Card,
    "el-divider": Divider
  },
  data() {
    return {
      imgUrl: require("../static/noTrip.png"),
      screenWidth: document.body.clientWidth,
      searchKey: "",
      dialogVisible: false,
      detailTrip: false,
      detail: {
        name: "赵拯基",
        avatar:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        schoolNum: "06A171xx",
        cardnum: "213171xxx",
        content: "回家",
        phoneNum: "132231110xx",
        location: "在校",
        target: "河北省邯郸市", // 详细去向
        timestamp: "2019-12-27 20:00",
        backTimestamp: "2019-12-28 20:00", // 返校时间
        emergencyContact: "18866666666",
        emergencyPeople: "妈妈",
        isNanjing: false, // 是否离开南京  √：el-icon-check   ×：el-icon-error
        activities: [
          {
            content: "回家", // 行程事由
            timestamp: "2019-12-07 20:00",
            target: "东大九龙湖旅馆", // 详细去向
            backTimestamp: "2020-02-01 20:00", // 返校时间
            color: "#EEE8AA",
            emergencyContact: "181****9984",
            emergencyPeople: "我是紧急联系人",
            isNanjing: true // 是否离开南京  √：el-icon-check   ×：el-icon-error
          },
          {
            content: "旅游",
            timestamp: "2020-02-03 20:00",
            target: "东大九龙湖野生动物园",
            backTimestamp: "2020-02-05 20:00",
            color: "#EEE8AA",
            emergencyContact: "181****9984",
            emergencyPeople: "我是紧急联系人",
            isNanjing: false
          }
        ]
      },
      list: [
        {
          name: "赵拯基",
          schoolNum: "06A171xx",
          cardnum: "213171xxx",
          location: "在校"
        },
        {
          name: "高睿昊",
          schoolNum: "090161xx",
          cardnum: "213162xxx",
          location: "在校"
        },
        {
          name: "任栗晗",
          schoolNum: "71118xxx",
          cardnum: "21318xxxx",
          location: "不知道在哪儿"
        }
      ]
    };
  },
  methods: {
    search() {
      this.dialogVisible = true;
      console.log(this.isNoTrip());
    },
    showDetail() {
      this.dialogVisible = true;
    },
    filterLocation(value, row) {
      if (value === "在校" && row.location === "在校") {
        return true;
      }
      if (value !== "在校" && row.location !== "在校") {
        return true;
      }
      return false;
    },
    isNow(activity) {
      let now = new Date().format("yyyy-MM-dd hh:mm");
      if (now <= activity.backTimestamp && now >= activity.timestamp)
        return true;
      else return false;
    },
    isNoTrip() {
      let now = new Date().format("yyyy-MM-dd hh:mm");
      for (let e in this.detail.activities) {
        if (
          now <= this.detail.activities[e].backTimestamp &&
          now >= this.detail.activities[e].timestamp
        ) {
          return false;
        }
      }
      return true;
    }
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  }
};
</script>

<style lang="less" scoped>
.index {
  font-size: 16px;
  font-weight: bold;
  font-family: 微软雅黑;
  margin: 16px 0;
}
.content {
  margin-left: 30px;
  font-size: 14px;
  font-family: 微软雅黑;
}
.search-container {
  display: flex;
}
.el-container {
  .el-aside {
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
          .el-icon-success {
            background-color: white;
            color: #67c23a;
            font-size: 26px;
            border-radius: 15px;
            margin-left: 0px;
          }
          .el-icon-error {
            background-color: white;
            color: #f56c6c;
            font-size: 26px;
            border-radius: 15px;
            margin-left: 0px;
          }
        }
      }
    }
  }
  .el-container {
    .el-icon-success {
      background-color: white;
      color: #67c23a;
      font-size: 26px;
      border-radius: 15px;
      margin-left: 30px;
    }
    .el-icon-error {
      background-color: white;
      color: #f56c6c;
      font-size: 26px;
      border-radius: 15px;
      margin-left: 30px;
    }
  }
}
.mobile {
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
        .el-icon-success {
          background-color: white;
          color: #67c23a;
          font-size: 26px;
          border-radius: 15px;
          margin-left: 0px;
        }
        .el-icon-error {
          background-color: white;
          color: #f56c6c;
          font-size: 26px;
          border-radius: 15px;
          margin-left: 0px;
        }
      }
    }
    .el-timeline {
      .el-timeline-item {
        .el-card {
          .index {
            font-size: 16px;
            font-weight: bold;
            font-family: 微软雅黑;
            margin: 10px 0;
          }
          .content {
            margin-left: 10px;
            font-size: 14px;
            font-family: 微软雅黑;
          }
        }
      }
    }
  }
  .el-timeline{
    .el-timeline-item{
      .el-card{
        .content{
          margin-left: 10px;
        }
      }
    }
  }
}
.el-icon-success {
  background-color: white;
  color: #67c23a;
  font-size: 26px;
  border-radius: 15px;
  margin-left: 10px;
}
.el-icon-error {
  background-color: white;
  color: #f56c6c;
  font-size: 26px;
  border-radius: 15px;
  margin-left: 10px;
}

</style>