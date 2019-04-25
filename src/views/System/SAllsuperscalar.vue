<template>
  <div>
    <p class="Page-Title">数据超标汇总</p>
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
              <p>企业名称：</p>
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
      </el-row>
      <el-form-item label="监测日期：">
        <el-date-picker
          v-model="formInline.timeRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 100%;"
        ></el-date-picker>
        <!--<el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 100%;"></el-date-picker>-->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="provinces.length==0">查询</el-button>
      </el-form-item>
    </el-form>
    <hr>
       <template>
			<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%">
        <el-table-column prop="company" label="所在市">
				</el-table-column>
        	<el-table-column prop="Area" label="所在区">
				</el-table-column>
				<el-table-column prop="company" label="油烟浓度报警数">
				</el-table-column>
				<el-table-column prop="equipment" label="油烟超标率">
				</el-table-column>
        <el-table-column prop="equipment" label="烟气报警数">
				</el-table-column>
				<el-table-column prop="equipment_type" label="烟气温度超标率">
				</el-table-column>
				<el-table-column prop="concentrate" label="环境报警数">
				</el-table-column>
				<el-table-column prop="concentrate" label="环境温度超标率">
				</el-table-column>
        <el-table-column prop="concentrate" label="总超标率">
				</el-table-column>
				<el-table-column prop="Date" label="合计">
				</el-table-column>
			</el-table>
		</template>
     <el-pagination v-if="Value" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[8,10,50, 100, 500]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="10" style="width: 360px;margin:auto">
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
        timeRange: null
      },
       //当只有一页的时候隐藏分页
      Value: true,
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
      //数据统计方式,默认表格
      dataStatus:"表格",
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
          //改变状态
          this.formDataIsChange = false;
          //重新请求清空数据
          this.tableData = [];
          res.data.forEach(enterprise => {
            this.tableData.push({
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
              flow:
                enterprise.device[0].lampblackInfoList[0]
                  .flow,
              // 压强
              pressure: enterprise.device[0].lampblackInfoList[0].pressure,
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
     //分页
     handleSizeChange(val) {
       this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currentPage =val;
      }
  },
  computed: {
    // 用于监听表单数据变化
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
  },
    
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
</style>