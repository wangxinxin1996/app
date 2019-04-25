<template>
  <div class="Map">
    <p class="Page-Title">企业监测明细曲线</p>
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
        <el-col :span="6">
          <el-form-item>
            <el-col :span="8">
              <p>企业名称|设备：</p>
            </el-col>
            <el-col :span="16">
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
        <el-col :span="4">
          <el-form-item>
            <el-select v-model="formInline.deviceName" placeholder="请选择设备名称">
              <el-option 
                :label="dev.deviceName"
                :value="dev.deviceName"
                v-for="(dev,index) in device"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13">
      <el-form-item label="企业快查:">
        <el-input v-model="formInline.keyword" placeholder="企业关键字"></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="11">
      <el-form-item label="数据状态：" class="right">
        <el-radio-group v-model="dataStatus" @change="statusClick">
          <el-radio label="全部"></el-radio>
          <el-radio label="正常"></el-radio>
          <el-radio label="超标"></el-radio>
        </el-radio-group>
      </el-form-item>
   
      <el-form-item class="right">
        <el-button type="primary" @click="onSubmit" :disabled="provinces.length==0">搜索</el-button>
      </el-form-item>
      </el-col>
      </el-row>
    </el-form>
    <hr>
     <div>
      <span>图表方式：</span>
      <el-radio-group v-model="diagramStatus" @change="diagramstatusClick">
        <el-radio label="折线图"></el-radio>
        <el-radio label="柱状图"></el-radio>
      </el-radio-group>
      <div id="pie" class="Table" ref="pie_wrarp" style="width: 600px;height:400px;"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
export default {
  name: "arealtime",
  data() {
    return {
      // 请求参数
      formInline: {
        province: null,
        city: null,
        area: null,
        enterpriseName: null,
        deviceName: null,
        keyword:null,
      },
      //保存请求结果数据
      tableData: [],
      //临时数据用于页面显示
      tempData: [],
      //设备省市信息
      provinces: this.$store.getters.enterpriseRegion,
      cities: [],
      areaList: [],
      enterprises:[],
      device:[],
      // 省市区企业选择控制权限，允许为false，否则为true
      regionControl:{
        province:true,
        city:true,
        area:true,
        enterprise:true
      },
      //数据状态,默认全部
      dataStatus:"全部",
      //默认选择折线图
      diagramStatus:"折线图",
      //监听form表单中数据是否发生变化
      formDataIsChange:true
    };
  },
  methods: {
    onSubmit() {
      //表单中的内容没有发生变化，不用查询
      if(!this.formDataIsChange){
        return ;
      }
      //改变状态
      this.formDataIsChange = false;
      const {province,city,area,enterpriseName,deviceName,keyword} = this.formInline;
      this.$axios.get("/api/profile/lampblackInfo/getLampblackData",
        {
          params:{
            province,
            city,
            area,
            type:"realTime",
            enterpriseName,
            deviceName,
            keyword,
            // startTime:"",
            // endTime:""
        }}).then(res => {
          // console.log(res.data)
          this.tableData = [];
          res.data.forEach(enterprise => {
            this.tableData.push({
              // 企业名
              enterpriseName: enterprise.enterpriseName,
              // 地址
              areaName: enterprise.address,
              // 设备名
              deviceName: enterprise.device[0].deviceName,
              // 设备类型
              deviceType: enterprise.device[0].deviceType,
              // 油烟浓度
              lampblackConcentration: enterprise.device[0].lampblackInfoList[0].lampblackConcentration,
              // 油烟温度
              temperature:enterprise.device[0].lampblackInfoList[0].temperature,
              // 日期
              date: enterprise.device[0].lampblackInfoList[0].formatDate,
              // 通讯
              communicationStatus: enterprise.device[0].communicationStatus,
              // 风机
              fanStatus: enterprise.device[0].fanStatus,
              // 净化器
              purifierStatus: enterprise.device[0].purifierStatus
            })
          });
          this.statusClick(this.dataStatus);
        })
    },
    selectProvince(provinceName) {
      // 调用全局方法
      this.selectVmProvince(provinceName,this)
    },
    selectCity(cityName) {
      this.selectVmCity(cityName,this)
    },
    selectArea(areaName) {
      this.selectVmArea(areaName,this)
    },
    selectEnterprise(enterpriseName) {
      this.selectVmEnterprise(enterpriseName,this)
    },
    statusClick(value){
      switch(value){
        case '全部': 
          this.tempData = [...this.tableData];
          break;
        case '正常':
          this.tempData = this.tableData.filter(item => {
            //根据官方油烟标准数据进行判断
            return item.lampblackConcentration <= 1;
          })
          break;
        case '超标':
          this.tempData = this.tableData.filter(item => {
            return item.lampblackConcentration > 1;
          })
          break;
      }
    },
    // 对角色查看权限进行控制，6个等级
    permissionControl(){
      this.permissionVmControl(this);
    },

    //折线图
    showBokenLine(myEchart){
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
          data: ["01", "02", "03", "04","05", "06","07", "08", "09", "10", "11","12"
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
    //柱状图
    showHistogram(myEchart){
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
        xAxis: [
          {
            type: "category",
            name: "月份",
            data: [  "01","02","03", "04","05","06", "07", "08", "09", "10","11","12"
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
    //选择折线或者柱状
     diagramstatusClick(value) {
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
  computed:{
    //获取表单中的值
    formData(){
      return this.formInline;
    },
    // 获取权限等级
    level(){
      return this.$store.getters.user.rolePermission.role.level;
    }
  },
  watch:{
    //监听form表单值的变化
    formData:{
      //表单变化，处理函数
      handler(val, oldVal){
        //改变表单变化状态
        this.formDataIsChange = true;
      },
      //开启深度监听
      deep:true
    }
  },
  beforeMount(){
    if(this.provinces.length>0){
      this.permissionControl();
    }else{
      this.$message({
          message: '该权限信息不足，暂无可查询数据！',
          type: 'warning'
        });
    }
  }
}
</script>

<style scoped>
.Area{
  display:flex;
  flex-direction: row;
}
.Page-Title {
  line-height: 60px;
  text-decoration: center;
  font-size: 20px;
  font-weight: 500;
}

.right {
 margin-left:2rem; 
} 

.containt {
  line-height: 20px;
  font-size: 13px;
  color: grey;
 
}
/* #container {
  width: 300px;
  height: 180px;
} */
#map {
  overflow: hidden;
}
span {
  color: #606266;
  font-size: 14px;
}
.Table {
  margin: auto;
}
</style>