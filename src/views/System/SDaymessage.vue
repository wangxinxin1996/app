<template>
<div>
  <DateChoose :dateType="'date'"/>
     <div>
      <span>图表方式：</span>
      <el-radio-group v-model="dataStatus" @change="statusClick">
        <el-radio label="折线图"></el-radio>
        <el-radio label="柱状图"></el-radio>
      </el-radio-group>
      <div id="pie" class="Table" ref="pie_wrarp" style="width: 600px;height:400px;"></div>
    </div>
     <div>
      <template>
        <el-table :data="message" class="Table" style="width: 80%">
          <el-table-column prop="Tile" width="180" label="检测参数"></el-table-column>
          <el-table-column label="01"></el-table-column>
          <el-table-column label="02"></el-table-column>
          <el-table-column label="03"></el-table-column>
          <el-table-column label="04"></el-table-column>
          <el-table-column label="05"></el-table-column>
          <el-table-column label="06"></el-table-column>
          <el-table-column label="07"></el-table-column>
          <el-table-column label="08"></el-table-column>
          <el-table-column label="09"></el-table-column>
          <el-table-column label="10"></el-table-column>
          <el-table-column label="11"></el-table-column>
          <el-table-column label="12"></el-table-column>
          
        </el-table>
      </template>
    </div>
  </div>
    
</template>

<script>
import DateChoose from "../../components/DateChoose";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
export default {
  name: "sDaymessage",
  components: {
    DateChoose
  },
   data() {
    return {
      //默认折线图
      dataStatus: "折线图",
      message: [
        {
          Tile: "油烟浓度(mg/m3)"
        },
        {
          Tile: "烟气温度(℃)"
        },
        {
          Tile: "流量(L/min)"
        },
        {
          Tile: "大气压强(kPa)"
        }
      ]
    };
  },
  methods: {
    //展示折线图
    showBokenLine(myEchart) {
      // console.log(this.$refs.pie_wrarp)
      // let myEchart = echarts.init(this.$refs.pie_wrarp);
      myEchart.setOption({
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            return params[0].value;
          }
        },
        xAxis: {
          type: "category",
          name: "月份",
          data: [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12", "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12", "01",
            "02",
            "02",     
          ],
          boundaryGap: false
        },
        yAxis: {
          type: "value",
          name: "监测数据"
        },
        series: [
          {
            data: [1, 15, 20, 30, 40, 18, 100, 20, 500, 300, 120, 110],
            type: "line"
          }
        ]
      });
    },
    //展示柱状图
    showHistogram(myEchart) {
      //  let myEchart = echarts.init(this.$refs.pie_wrarp);
      myEchart.setOption({
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            return params[0].value;
          },
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
        },

        color: ["#3398DB"],
        // grid: {
        //   left: "3%",
        //   right: "4%",
        //   bottom: "3%",
        //   containLabel: true
        // },
        xAxis: [
          {
            type: "category",
            name: "月份",
            data: [
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
              "12"
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "监测数据"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [1, 15, 20, 30, 40, 18, 100, 20, 500, 300, 120, 110]
          }
        ]
      });
    },

    statusClick(value) {
      let myEchart = echarts.init(this.$refs.pie_wrarp);
      switch (value) {
        case "折线图":
          //展示折线图

          this.showBokenLine(myEchart);
          break;
        case "柱状图":
          //展示柱状图
          this.showHistogram(myEchart);

          break;
      }
    }
  },
  mounted() {
    // 触发筛选函数
    this.statusClick(this.dataStatus);
  }
};
</script>
<style scoped>
span {
  color: #606266;
  font-size: 14px;
}
.Table {
  margin: auto;
}
</style>