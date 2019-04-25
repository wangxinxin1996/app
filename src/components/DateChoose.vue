<template>
  <div>
    <p class="Page-Title">监测数据年报</p>
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
        <el-col :span="12">
          <el-form-item label="监测参数：">
            <el-radio-group v-model="dataStatus" @change="statusClick">
              <el-radio label="油烟浓度"></el-radio>
              <el-radio label="烟气温度"></el-radio>
              <el-radio label="流量"></el-radio>
              <el-radio label="大气压"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="查询日期：" class="right">
            <el-date-picker
              :type="dateType"
              :placeholder="dateType=='year'?'选择年份':(dateType=='month'?'选择月份':'选择日期')"
              v-model="formInline.date"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="provinces.length==0">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="provinces.length==0">导出</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <hr>
  </div>
</template>

<script>
export default {
  props:{
    dateType:String
  },
  data() {
    return {
      // 请求参数
      formInline: {
        province: null,
        city: null,
        area: null,
        enterpriseName: null,
        deviceName: null,
        keyword: null,
        date: null
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
      dataStatus:"油烟浓度",
      //监听form表单中数据是否发生变化
      formDataIsChange:true
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
        deviceName,
        keyword,
        date
      } = this.formInline;
      this.$axios
        .get("/api/profile/lampblackInfo/getLampblackData", {
          params: {
            province,
            city,
            area,
            type: "history",
            enterpriseName,
            deviceName,
            keyword,
            date
          }
        })
        .then(res => {
          //改变状态
          this.formDataIsChange = false;
          // console.log(res.data);
          //重新请求清空数据
          this.tableData = [];
          res.data.forEach(enterprise => {
            this.tableData.push({
              //企业名称
              enterpriseName: enterprise.enterpriseName,
              // 地址
              adress: enterprise.address,
              //设备名
              deviceName: enterprise.device[0].deviceName,
              // 设备类型
              deviceType: enterprise.device[0].deviceType,
              // 油烟浓度
              lampblackConcentration:
                enterprise.device[0].lampblackInfoList[0]
                  .lampblackConcentration,
              //温度
              temperature:
                enterprise.device[0].lampblackInfoList[0].temperature,
              // 压强
              pressure: enterprise.device[0].lampblackInfoList[0].pressure,
              // 风量
              airVolume: enterprise.device[0].lampblackInfoList[0].airVolume,
              // 风速
              weedSpeed: enterprise.device[0].lampblackInfoList[0].weedSpeed,
              //动压
              dynPressure:
                enterprise.device[0].lampblackInfoList[0].dynPressure,
              // 静压
              staticPressure:
                enterprise.device[0].lampblackInfoList[0].staticPressure,
              // 风机
              fanStatus: enterprise.device[0].fanStatus,
              // 净化器
              purifierStatus: enterprise.device[0].purifierStatus,
              // 时间
              date: enterprise.device[0].lampblackInfoList[0].formatDate
            });
          });
        });
    },
    selectProvince(provinceName) {
      this.selectVmProvince(provinceName,this);
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
    // 对角色查看权限进行控制，6个等级
    permissionControl(){
      this.permissionVmControl(this);
    },
    statusClick(value){
      switch(value){
        case '油烟浓度': 
          //doing...
          break;
        case '烟气温度':
          break;
        case '流量':
          break;
        case '大气压':
      }
    },
  },
  computed: {
    formData() {
      //获取表单中的值
      console.log(this.formInline)
      return this.formInline;
   
    },
    // 获取权限等级
    level(){
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
  beforeMount(){
    console.log(this.$route)
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
  margin-left: 5rem;
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
</style>
