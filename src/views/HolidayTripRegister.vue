<template>
  <background title="节假日行程登记">
    <div style="text-align:right">
      <el-button type="primary" @click="newTrip">新建行程</el-button>
    </div>
    <el-timeline>
      <el-timeline-item
        :icon="startTime.icon"
        :type="startTime.type"
        :color="startTime.color"
        :size="startTime.size"
        :timestamp="startTime.timestamp"
        placement="top"
      >
        <p style="font-size:20px;font-family:微软雅黑">{{ startTime.content }}</p>
      </el-timeline-item>
      <el-timeline-item
        v-for="(activity, index) in activities"
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
            <span style="font-size:20px; font-weight:bold;padding-left:10px">{{ activity.content }}</span>
            <el-button style="float: right; padding: 3px 0 ; color:red" type="text">删除</el-button>
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
            <i v-if="activity.isNanjing" class="el-icon-check"></i>
            <i v-if="!activity.isNanjing" class="el-icon-error"></i>
          </p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item
        :icon="endTime.icon"
        :type="endTime.type"
        :color="endTime.color"
        :size="endTime.size"
        :timestamp="endTime.timestamp"
        placement="top"
      >
        <p style="font-size:20px;font-family:微软雅黑">{{ endTime.content }}</p>
      </el-timeline-item>
    </el-timeline>
    <el-dialog :visible.sync="CreateTrip" width="90%" :before-close="handleClose">
      <span slot="title">
        <span class="title">新建行程</span>
        <el-divider></el-divider>
      </span>
      <div>
        <span class="index">行程事由：</span>
        <el-radio-group v-model="newCause" size="medium">
          <el-radio-button label="回家"></el-radio-button>
          <el-radio-button label="旅行"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="dialogRow">
        <!-- <p class="index">离校、返校时间：</p> -->
        <el-date-picker
          v-model="newTimestamp"
          type="datetimerange"
          start-placeholder="离校日期"
          end-placeholder="返校日期"
          :default-time="['20:00:00', '20:00:00']"
          format="yyyy-MM-dd hh:mm"
          value-format="yyyy-MM-dd hh:mm"
          style="width:100%"
        ></el-date-picker>
      </div>
      <div class="dialogRow">
        <span class="index">详细去向：</span>
        <!-- <v-distpicker></v-distpicker> -->
        <el-input placeholder="请输入 省-市-区（如江苏省-南京市-栖霞区）" v-model="newTarget"></el-input>
      </div>
      <div class="dialogRow">
        <p class="index">应急联系人：</p>
        <el-input v-model="newEmergencyPeople"></el-input>
      </div>
      <div class="dialogRow">
        <p class="index">应急联系方式：</p>
        <el-input v-model="newEmergencyContact"></el-input>
      </div>
      <div class="dialogRow">
        <span class="index">是否离开南京：</span>
        <el-button
          v-if="newIsNanjing"
          type="success"
          icon="el-icon-check"
          circle
          @click="newIsNanjing = false"
          size="small"
        ></el-button>
        <el-button
          v-if="!newIsNanjing"
          type="danger"
          icon="el-icon-close"
          circle
          @click="newIsNanjing = true"
          size="small"
        ></el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="CreateTrip = false">取 消</el-button>
        <el-button type="primary" @click="createTrip">确 定</el-button>
      </span>
    </el-dialog>
  </background>
</template>

<script>
import Background from "../components/Background.vue";
import {
  Timeline,
  TimelineItem,
  Card,
  Dialog,
  Divider,
  RadioGroup,
  RadioButton,
  DatePicker
} from "element-ui";
// import VDistpicker from 'v-distpicker'
export default {
  components: {
    background: Background,
    "el-timeline": Timeline,
    "el-timeline-item": TimelineItem,
    "el-card": Card,
    "el-dialog": Dialog,
    "el-divider": Divider,
    "el-radio-group": RadioGroup,
    "el-radio-button": RadioButton,
    "el-date-picker": DatePicker
    // "v-distpicker": VDistpicker
  },
  data() {
    return {
      newTarget: "",
      newCause: "回家",
      newEmergencyPeople: "我是紧急联系人",
      newEmergencyContact: "181****9984",
      newTimestamp: "",
      newIsNanjing: true,
      CreateTrip: false,
      startTime: {
        content: "开始假期啦",
        timestamp: "2019-12-06 20:00",
        size: "large",
        type: "primary",
        color: "#0BBD87"
      },
      emergencyContact: "181****9984",
      emergencyPeople: "我是紧急联系人",
      activities: [
        {
          content: "回家", // 行程事由
          timestamp: "2019-12-07 20:00",
          target: "东大九龙湖旅馆", // 详细去向
          backTimestamp: "2020-02-01 20:00", // 返校时间
          color: "#EEE8AA",
          emergencyContact: "181****9984",
          emergencyPeople: "我是紧急联系人",
          isNanjing: true // 是否离开南京  √：el-icon-check   ×：el-icon-close
        },
        {
          content: "旅游",
          timestamp: "2020-02-03 20:00",
          target: "东大九龙湖野生动物园",
          backTimestamp: "2020-02-05 20:00",
          color: "#EEE8AA",
          emergencyContact: "181****9984",
          emergencyPeople: "我是紧急联系人",
          isNanjing: true
        }
      ],
      endTime: {
        content: "假期结束啦,是时候好好学习啦~",
        timestamp: "2020-02-06 20:00",
        size: "large",
        color: "#DB7093"
      }
    };
  },
  methods: {
    newTrip() {
      this.CreateTrip = true;
    },
    createTrip() {
      if (this.newTimestamp === "") {
        this.$message("请选择你的离/返校时间！");
      } else if (this.isTimeOverlap()) {
        this.$message("请勿与已有行程冲突！");
      } else if (this.newTarget === "") {
        this.$message("请输入你的详细去向！");
      } else if (this.newEmergencyPeople === "") {
        this.$message("请输入你的紧急联系人！");
      } else if (this.newEmergencyContact === "") {
        this.$message("请输入你的紧急联系人的联系方式！");
      } else {
        this.activities.push({
          content: this.newCause,
          timestamp: this.newTimestamp[0],
          target: this.newTarget, // 详细去向
          backTimestamp: this.newTimestamp[1], // 返校时间
          color: "#EEE8AA",
          emergencyContact: this.newEmergencyContact,
          emergencyPeople: this.newEmergencyPeople,
          isNanjing: this.newIsNanjing // 是否离开南京  √：el-icon-check   ×：el-icon-close
        });
        this.activities.sort((a, b) => {
          if (a.timestamp < b.timestamp) {
            return -1;
          } else {
            return 1;
          }
        });
        this.newCause = "回家";
        this.timestamp = "";
        this.newTarget = "";
        this.newIsNanjing = true;
        this.CreateTrip = false;
        this.newTimestamp = "";
      }
    },
    handleClose() {
      this.newCause = "回家";
      this.timestamp = "";
      this.newTarget = "";
      this.newIsNanjing = true;
      this.CreateTrip = false;
    },
    isTimeOverlap() {
      for (let element of this.activities) {
        if (
          this.newTimestamp[0] <= element.backTimestamp &&
          this.newTimestamp[1] >= element.timestamp
        ) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/common.css";
.title {
  font-size: 20px;
  font-weight: bold;
}
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
.el-icon-check {
  background-color: #67c23a;
  color: white;
  font-size: 26px;
  border-radius: 15px;
  margin-left: 30px;
}
.el-icon-close {
  background-color: #f56c6c;
  color: white;
  font-size: 26px;
  border-radius: 15px;
  margin-left: 30px;
}
.dialogRow {
  margin-top: 25px;
}
.el-divider {
  margin-bottom: 0px;
}
</style>