<template>
  <div class="Map">
    <p class="Page-Title">油烟监测地图信息</p>
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
        <el-col :span="13">
          <el-form-item label="企业快查：">
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
            <el-button type="primary" @click="onSubmit" :disabled="provinces.length==0">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <hr>
    <div>
      <el-container style="height: 460px; ">
        <el-aside width="200px"  style="background-color: rgb(238, 241, 246); border: 1px solid #eee" >
          <p v-if="tempData.length<1">暂无企业信息</p>         
          <el-menu >
            <el-submenu index="1" v-for="(item,index) in tempData" :key="index"  >
              <template slot="title"> {{item.enterpriseName}}</template>
              <div>
                <p class="containt">企业地址：{{item.address}}</p>
                <p class="containt">油烟浓度：{{item.lampblackConcentration}}</p>
                <p class="containt">烟气温度：{{item.temperature}}</p>
                <p class="containt">监测时间：{{item.date}}</p>
              </div>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main ref="map" id="map">
          <!-- <div id="container"></div> -->
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
// var map = new AMap.Map('container');
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
        keyword: null
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
      //改变状态
      this.formDataIsChange = false;
      const {
        province,
        city,
        area,
        enterpriseName,
        deviceName,
        keyword
      } = this.formInline;
      this.$axios
        .get("/api/profile/lampblackInfo/getLampblackData", {
          params: {
            province,
            city,
            area,
            type: "realTime",
            enterpriseName,
            deviceName,
            keyword
            // startTime:"",
            // endTime:""
          }
        })
        .then(res => {
            //改变状态
          this.formDataIsChange = false;
          // console.log(res.data)
          this.tableData = [];
          res.data.forEach(enterprise => {
            enterprise.device.forEach(device => {
              device.lampblackInfoList.forEach(lampblackInfo => {
                this.tableData.push({
                  //企业名称
                  enterpriseName: enterprise.enterpriseName,
                  // 地址
                  address: enterprise.address,
                  // 设备名
                  deviceName: device.deviceName,
                  // 油烟浓度
                  lampblackConcentration:lampblackInfo.lampblackConcentration,
                  // 温度
                  temperature:lampblackInfo.temperature,
                  // 时间
                  date: lampblackInfo.formatDate,
                  // 压强
                  pressure: lampblackInfo.pressure,
                  // 流量
                  flow: lampblackInfo.flow,
                  // 经度
                  longitude: device.longitude,
                  // 纬度
                  latitude: device.latitude
                });
              })
            })
          });
          this.statusClick(this.dataStatus);
        });
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
    },
    //添加地图点标记
    addMark(map,enterprise){
      let marker = new AMap.Marker({
        position: map.getCenter()
      });
      marker.setMap(map);
      console.log(map.getCenter())
      // 设置鼠标划过点标记显示的文字提示
      marker.setTitle("我是marker的title");

      // 设置label标签
      // label默认蓝框白底左上角显示，样式className为：amap-marker-label
      marker.setLabel({
        //修改label相对于maker的位置
        offset: new AMap.Pixel(20, 20),
        content:
          `<div class='info'>
            <p>企业名称：</p>
            <p>企业名称：</p>
            <p>企业名称：</p>
          </div>`
      });
    }
  },
  computed: {
    //获取表单中的值
    formData() {
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
  },
  mounted() {
    let map = new AMap.Map("map", {
      resizeEnable: true,
      center: [116.397428, 39.90923],
      zoom: 13
    });
    this.addMark(map);
  }
};
</script>

<style scoped>
.Area {
  display: flex;
  flex-direction: row;
  
}
#map::-webkit-scrollbar {
  width: 0; /*滚动条宽度*/
  height: 0; /*滚动条高度*/
}
.Page-Title {
  line-height: 60px;
  text-decoration: center;
  font-size: 20px;
  font-weight: 500;
}

.right {
  margin-left: 2rem;
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
</style>