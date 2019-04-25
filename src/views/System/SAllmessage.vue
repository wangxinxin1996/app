<template>
  <div class="Allmessage">
    <p class="Page-Title">油烟监测明细报表</p>
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
        <el-col :span="12">
          <el-form-item label="企业快查：">
            <el-form-item >
              <!-- <el-col :span="7">
                <p>企业快查：</p>
              </el-col> -->
              <el-col :span="22">
                <el-input v-model="formInline.keyword" placeholder="企业关键字" class="Input"></el-input>
              </el-col>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="查询日期：" class="right">
            <div class="Data">
              <el-col :span="10">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="formInline.startTime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="10">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="formInline.endTime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
            </div>
            <div class="Data">
              <el-col :span="10">
                <el-time-picker placeholder="选择时间" v-model="formInline.date2" style="width:100%;"></el-time-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="10">
                <el-time-picker placeholder="选择时间" v-model="formInline.endTime" style="width: 100%;"></el-time-picker>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="provinces.length==0">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <hr>
    <template>
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%">
        <el-table-column prop="enterpriseNo" label="企业编号"></el-table-column>
        <el-table-column prop="enterpriseName" label="企业名称"></el-table-column>
        <el-table-column prop="deviceName" label="设备名称"></el-table-column>
        <el-table-column prop="deviceType" label="设备类型"></el-table-column>
        <el-table-column prop="lampblackConcentration" label="油烟浓度"></el-table-column>
        <el-table-column prop="flow" label="流量"></el-table-column>
        <el-table-column prop="pressure" label="大气压强"></el-table-column>
        <el-table-column prop="date" label="监测时间"></el-table-column>
      </el-table>
    </template>
     <el-pagination v-if="Value" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[8,10,50, 100, 500]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="Len" style="width: 360px;margin:auto">
  </el-pagination>

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
        keyword: null,
        startTime: null,
        endTime: null
      },
      //当只有一页的时候隐藏分页
      Value: false,
      //获取到的数据长度
      Len:'',
      //当前页
      currentPage:1,
      //分割条数
      pagesize:8,
      //保存请求结果数据
      tableData: [],
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
      console.log(this.formInline)
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
        startTime,
        endTime
      } = this.formInline;
      this.$axios
        .get("/api/profile/lampblackInfo/detailed", {
          params: {
            province,
            city,
            area,
            enterpriseName,
            deviceName,
            keyword,
            startTime,
            endTime
          }
        })
        .then(res => {
          //改变状态
          this.formDataIsChange = false;
          console.log(res.data)
          //重新请求清空数据
          this.tableData = [];
          res.data.forEach(enterprise => {
            this.Len=res.data.length;
           if(this.Len/8>1&&this.Len%8>=0)
           {
             this.Value=true;
           }
            enterprise.device.forEach(device => {
              device.lampblackInfoList.forEach(lampblackInfo => {
                this.tableData.push({
                  //企业编号
                  enterpriseNo: enterprise.enterpriseNo,
                  //企业名称
                  enterpriseName: enterprise.enterpriseName,
                  //设备名
                  deviceName: device.deviceName,
                  // 设备类型
                  deviceType: device.deviceType,
                  // 油烟浓度
                  lampblackConcentration:lampblackInfo.lampblackConcentration,
                  // 流量
                  flow:lampblackInfo.flow,
                  // 压强
                  pressure: lampblackInfo.pressure,
                  // 时间
                  date: lampblackInfo.formatDate
                });
              })
            })
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
     //分页
     handleSizeChange(val) {
       this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currentPage =val;
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

.right {
  margin-left: 5rem;
}
.el-col-2 {
  width: auto;
}
.Data {
  width: 350px;
}
</style>