<template>
  <div>
    <p class="Page-Title">历史数据查询</p>
    <el-form ref="form" :inline="true">
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
        <el-col :span="14">
          <el-form-item label="数据状态：">
            <el-radio-group v-model="dataStatus" @change="statusClick">
              <el-radio label="全部"></el-radio>
              <el-radio label="正常"></el-radio>
              <el-radio label="超标"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="查询日期：" class="right">
            <div style="width:280px;">
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
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="provinces.length==0">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="static">
      <p>油烟浓度：正常1个，超标0个</p>
      <div class="choise">
        正常
        <div class="Normal"></div>离线
        <div class="Normal Normal1"></div>掉线
        <div class="Normal Normal2"></div>
      </div>
    </div>
    <hr>
    <template>
      <el-table :data="tempData" stripe style="width: 100%">
        <el-table-column prop="enterpriseName" label="企业名称"></el-table-column>
        <el-table-column prop="adress" label="企业区域"></el-table-column>
        <el-table-column prop="deviceName" label="设备名称"></el-table-column>
        <el-table-column prop="deviceType" label="设备类型"></el-table-column>
        <el-table-column prop="lampblackConcentration" label="油烟浓度"></el-table-column>
        <el-table-column prop="temperature" label="烟气温度"></el-table-column>
        <el-table-column prop="pressure" label="大气压强"></el-table-column>
        <el-table-column prop="airVolume" label="风量" width="70px"></el-table-column>
        <el-table-column prop="weedSpeed" label="风速" width="70px"></el-table-column>
        <el-table-column prop="dynPressure" label="动压" width="70px"></el-table-column>
        <el-table-column prop="staticPressure" label="静压" width="70px"></el-table-column>
        <el-table-column prop="fanStatus" label="风机" width="70px"></el-table-column>
        <el-table-column prop="purifierStatus" label="净化器" width="70px"></el-table-column>
        <el-table-column prop="date" label="检测时间" width="70px"></el-table-column>
      </el-table>
    </template>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      // 请求参数
      formInline: {
        province: null,
        city: null,
        area: null,
        enterpriseName: null,
        deviceName: null,
        timeRange: null
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
        timeRange
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
            startTime: timeRange ? timeRange[0] : null,
            endTime: timeRange ? timeRange[1] : null
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
          // 触发筛选函数
          this.statusClick(this.dataStatus);
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
    statusClick(value) {
      switch (value) {
        case "全部":
          this.tempData = [...this.tableData];
          break;
        case "正常":
          this.tempData = this.tableData.filter(item => {
            //根据官方油烟标准数据进行判断
            return item.lampblackConcentration <= 1;
          });
          break;
        case "超标":
          this.tempData = this.tableData.filter(item => {
            return item.lampblackConcentration > 1;
          });
      }
    },
    // 对角色查看权限进行控制，6个等级
    permissionControl(){
      this.permissionVmControl(this);
    }
  },
  computed: {
    formData() {
      //获取表单中的值
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
.Area {
  display: flex;
  flex-direction: row;
}
.Page-Title {
  line-height: 60px;
  text-decoration: center;
  font-size: 20px;
  font-weight: 500;
}
.left {
  margin-left: 2rem;
}
.right {
  margin-left: -1.5rem;
}

.Normal {
  width: 20px;
  height: 20px;
  background-color: green;
}

.Normal1 {
  background-color: gray;
}

.Normal2 {
  background-color: goldenrod;
}

.static {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.choise {
  position: relative;
  right: 4%;
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>