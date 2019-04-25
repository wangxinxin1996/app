<template>
  <div>
    <p class="Page-Title">区域数据统计</p>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="5">
          <el-form-item>
            <el-col :span="7">
              <p>企业区域：</p>
            </el-col>
            <el-col :span="17">
              <el-select
                v-model="formInline.province"
                :placeholder="regionControl.province?'请选择省市':formInline.province"
                @change="selectProvince"
                :disabled="!regionControl.province"
              >
                <el-option
                  :label="province.provinceName"
                  :value="province.provinceName"
                  v-for="(province,index) in provinces"
                  :key="index"
                ></el-option>
                <!-- <el-option label="北京市" value="beijing"></el-option> -->
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-select
              v-model="formInline.city"
              :placeholder="regionControl.city?'请选择城市':formInline.city"
              @change="selectCity"
              :disabled="!regionControl.city"
            >
              <el-option
                :label="city.cityName"
                :value="city.cityName"
                v-for="(city,index) in cities"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-select
              v-model="formInline.area"
              :placeholder="regionControl.area?'请选择区县':formInline.area"
              @change="selectArea"
              :disabled="!regionControl.area"
            >
              <el-option
                :label="area.areaName"
                :value="area.areaName"
                v-for="(area,index) in areaList"
                :key="index"
              ></el-option>
              <!-- <el-option label="渝中区" value="yuzhong"></el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7"  >
          <el-form-item > 
            <el-col :span="7">
              <p>企业名称：</p>
            </el-col>
            <el-col :span="17">
              <el-select
                v-model="formInline.enterpriseName"
                :placeholder="regionControl.enterprise?'请选择企业名称':formInline.enterpriseName"
                @change="selectEnterprise"
                :disabled="!regionControl.enterprise"
              >
                <el-option
                  :label="enterprise.enterpriseName"
                  :value="enterprise.enterpriseName"
                  v-for="(enterprise,index) in enterprises"
                  :key="index"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13">
          <el-form-item label="查询方式：">
            <el-radio-group v-model="dataStatus" @change="statusClick">
              <el-radio label="表格"></el-radio>
              <el-radio label="折线图"></el-radio>
              <el-radio label="柱状图"></el-radio>
              <el-radio label="饼图"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="查询日期：">
            <div style="width:360px;">
              <el-date-picker
                v-model="formInline.timeRange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 100%;"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <hr>
    <div id="pie" class="Table" ref="pie_wrarp" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
export default {
  data() {
    return {
      // 请求参数
      formInline: {
        province: null,
        city: null,
        area: null,
        enterpriseName: null,
        timeRange: null
      },
      //保存请求结果数据
      tableData: [],
      //设备省市信息
      provinces: this.$store.getters.enterpriseRegion,
      cities: [],
      areaList: [],
      enterprises: [],
      device: [],
      // 省市区企业选择控制权限，允许为false，否则为true
      regionControl: {
        province: true,
        city: true,
        area: true,
        enterprise: true
      },
      //数据统计方式,默认表格
      dataStatus: "表格",
      //监听form表单中数据是否发生变化
      formDataIsChange: true
    };
  },
  methods: {
    onSubmit() {
      //表单中的内容没有发生变化，不用查询
      if (!this.formDataIsChange) {
        return;
      }
      const {
        province,
        city,
        area,
        enterpriseName,
        timeRange
      } = this.formInline;
      this.$axios
        .get("/api/profile/lampblackInfo/areaStatistics", {
          params: {
            province,
            city,
            area,
            enterpriseName,
            startTime: timeRange ? timeRange[0] : null,
            endTime: timeRange ? timeRange[1] : null
          }
        })
        .then(res => {
          console.log(res.data);
          //改变状态
          this.formDataIsChange = false;
          //重新请求清空数据
          this.tableData = [];
          res.data.forEach(enterprise => {
            this.tableData.push({
              // 需要展示的内容
              //企业编号
              enterpriseNo: enterprise.enterpriseNo,
              //企业名称
              enterpriseName: enterprise.enterpriseName,
              //设备名
              deviceName: enterprise.device[0].deviceName,
              // 设备类型
              deviceType: enterprise.device[0].deviceType,
              // 油烟浓度
              lampblackConcentration:
                enterprise.device[0].lampblackInfoList[0]
                  .lampblackConcentration,
              // 流量
              flow: enterprise.device[0].lampblackInfoList[0].flow,
              // 压强
              pressure: enterprise.device[0].lampblackInfoList[0].pressure,
              // 时间
              date: enterprise.device[0].lampblackInfoList[0].formatDate
            });
          });
        });
      // 触发筛选函数
      this.statusClick(this.dataStatus);
    },
    selectProvince(provinceName) {
      this.selectVmProvince(provinceName, this);
    },
    selectCity(cityName) {
      this.selectVmCity(cityName, this);
    },
    selectArea(areaName) {
      this.selectVmArea(areaName, this);
    },
    selectEnterprise(enterpriseName) {
      this.selectVmEnterprise(enterpriseName, this);
    },
    // 展示表格
    showTabel() {},
    // 折线图
    showBokenLine(myEchart) {
      myEchart.setOption({
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            return params[0].value;
          }
        },
        xAxis: {
          type: "category",
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
          boundaryGap: false
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [1, 15, 20, 30, 40, 18, 100, 20, 500, 300, 120, 110, 123, 10],
            type: "line"
          }
        ]
      });
    },
    // 柱状图
    showHistogram(myEchart) {
      myEchart.setOption({ 
        legend: {
          data: [
            "油烟浓度正常",
            "油烟浓度报警",
            "烟气温度正常",
            "烟气温度报警",
            "环境温度正常",
            "环境温度报警",
            "大气压强正常",
            "大气压强报警",
            "合计",
            "合计"
          ]
        },
        tooltip: {},

        xAxis: [
          {
            type: "category",
            data: ["油烟浓度", "烟气温度", "环境温度", "大气压强", "合计"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            type: "bar",
            data: [5506.3, 1674.7, 1405, 1023.2, 969],
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    "#C1232B",
                    "#B5C334",
                    "#FCCE10",
                    "#E87C25",
                    "#0AD862"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            }
          },
          {
            name: "2011",
            type: "bar",
            data: [5506.3, 1674.7, 1405, 1023.2, 969],
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    "#27727B",
                    "#FE8463",
                    "#9BCA63",
                    "#FAD860",
                    "#0AD862"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            }
          }
        ]
      });
    },
    // 饼图
    showPie(myEchart) {
      myEchart.setOption({
        series: [
          {
            radius: "55%",
            type: "pie",
            data: [
              { value: 235, name: "油盐浓度正常" },
              { value: 274, name: "油烟浓度报警" },
              { value: 310, name: "烟气温度正常" },
              { value: 335, name: "烟气温度报警" },
              { value: 400, name: "环境温度正常" },
              { value: 400, name: "环境温度报警" }
            ]
          }
        ]
      });
    },
    // 对角色查看权限进行控制，6个等级
    permissionControl() {
      this.permissionVmControl(this);
    },
    statusClick(value) {
      let myEchart = echarts.init(this.$refs.pie_wrarp);
      switch (value) {
        case "表格":
          //展示表格数据
           this.showTabel(myEchart);
          break;
        case "折线图":
          //展示折线图
          this.showBokenLine(myEchart);
          break;
        case "柱状图":
          //展示柱状图
          this.showHistogram(myEchart);
          break;
        default:
          //饼图
          this.showPie(myEchart);
      }
    }
  },
  computed: {
    formData() {
      //获取表单中的值
      return this.formInline;
    },
    // 获取权限等级
    level() {
      return this.$store.getters.user.rolePermission.role.level;
    }
  },
  watch: {
    //监听form表单值的变化
    formData: {
      //表单变化，处理函数
      handler(val, oldVal) {
        //改变表单变化状态
        this.formDataIsChange = true;
      },
      //开启深度监听
      deep: true
    }
  },
  beforeMount() {
    if (this.provinces.length > 0) {
      this.permissionControl();
    } else {
      this.$message({
        message: "该权限信息不足，暂无可查询数据！",
        type: "warning"
      });
    }
  },
  mounted(){
    // 触发筛选函数
    this.statusClick(this.dataStatus);
  }
};
</script>

<style scoped>
.Page-Title {
  line-height: 60px;
  text-decoration: center;
  font-size: 20px;
  font-weight: 500;
}
.Area {
  display: flex;
  flex-direction: row;
}
.right {
  margin-left: 2rem;
}

.el-main {
  text-align: center;
  line-height: 160px;
}

.containt {
  line-height: 20px;
  font-size: 13px;
  color: grey;
}
.Table {
  margin: auto;
}
</style>