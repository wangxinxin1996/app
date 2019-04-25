<template>
  <div>
    <p class="Page-Title">日志信息</p>
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
        <el-col :span="10">
          <el-form-item label="查询日期：" class="right">
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
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="日志类型：">
            <el-select style="width: 93%;" v-model="formInline.log" placeholder="请选择日志类型">
              <el-option label="不限" value="banan"></el-option>
              <el-option label="异常日志" value="yuzhong"></el-option>
              <el-option label="操作日志" value="banan"></el-option>
              <el-option label="设备日志" value="yuzhong"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="right">
            <el-button type="primary" @click="onSubmit" :disabled="provinces.length==0">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <hr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 请求表单参数
      formInline: {
        province: null,
        city: null,
        area: null,
        timeRange: null,
        // startTime,endTime
        log: null
      },
      //保存请求结果数据
      tableData: [],
      //设备省市信息
      provinces: this.$store.getters.enterpriseRegion,
      cities: [],
      areaList: [],
      // 省市区企业选择控制权限，允许为false，否则为true
      regionControl: {
        province: true,
        city: true,
        area: true,
      },
      //监听form表单中数据是否发生变化
      formDataIsChange: true
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
      const { province, city, area, timeRange, log:logType } = this.formInline;
      console.log(this.formInline)
      this.$axios
        //日志查询接口
        .get("api/", {
          params: {
            province,
            city,
            area,
            startTime: timeRange ? timeRange[0] : null,
            endTime: timeRange ? timeRange[1] : null,
            logType
          }
        })
        .then(res => {
          console.log(res);
          //改变状态
          this.formDataIsChange = false;
          //重新请求清空数据
          this.tableData = [];
          if (res.status == 200) {
            res.data.forEach(log => {
              this.tableData.push({

              });
            });
          } else {
            this.$message.error("查询失败！");
          }
        }).catch(err => {
          this.$message.error("查询失败！");
        });
    },
    selectProvince(provinceName) {
      this.selectVmProvince(provinceName, this);
    },
    selectCity(cityName) {
      this.selectVmCity(cityName, this);
    },
    permissionControl() {
      this.permissionVmControl(this);
    }
  },
  computed: {
    // 用于监听表单数据变化
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
  }
};
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
</style>