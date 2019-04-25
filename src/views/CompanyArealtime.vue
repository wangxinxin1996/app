<template>
  <div class="ArealTime">
    <p class="Page-Title">企业实时数据</p>
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
        <!-- <el-col :span="13">
          <el-form-item label="企业快查：">
            <el-input v-model="formInline.keyword" placeholder="企业关键字"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="24">
          <el-form-item label="数据状态：" class="right">
            <el-radio-group v-model="dataStatus" @change="statusClick">
              <el-radio label="全部"></el-radio>
              <el-radio label="正常"></el-radio>
              <el-radio label="超标"></el-radio>
              <el-radio label="离线"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="right">
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  
    <hr>
    <template>
      <el-table :data="tempData" stripe style="width: 100%">
        <el-table-column prop="enterpriseName" label="企业名称"></el-table-column>
        <el-table-column prop="areaName" label="企业区域"></el-table-column>
        <el-table-column prop="deviceName" label="设备名称"></el-table-column>
        <el-table-column prop="deviceType" label="设备类型"></el-table-column>
        <el-table-column prop="lampblackConcentration" label="油烟浓度"></el-table-column>
        <el-table-column prop="temperature" label="烟气温度"></el-table-column>
        <el-table-column prop="date" label="检测时间"></el-table-column>
        <el-table-column prop="communicationStatus" label="通讯" width="70px"></el-table-column>
        <el-table-column prop="fanStatus" label="风机" width="70px"></el-table-column>
        <el-table-column prop="purifierStatus" label="净化器" width="70px"></el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
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
      this.selectVmProvince(provinceName,this);
    },
    selectCity(cityName) {
      this.selectVmCity(cityName,this);
    },
    selectArea(areaName) {
      this.selectVmArea(areaName,this);
    },
    selectEnterprise(enterpriseName) {
      this.selectVmEnterprise(enterpriseName,this);
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
        case '离线':
          this.tempData = this.tableData.filter(item => {
            return item.communicationStatus==='离线' || item.purifierStatus==='离线' || item.fanStatus==='离线';
          })
      }
    },
    // 对角色查看权限进行控制，6个等级
    permissionControl(){
      this.permissionVmControl(this);
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
};
</script>

<style scoped>
.ArealTime {
  width: 100%;
}
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
</style>