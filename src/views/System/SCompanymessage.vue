1<template>
  <div class="companymessage">
    <p class="Page-Title">餐饮企业信息</p>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="企业区域:">
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
      </el-form-item>
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
        </el-select>
      </el-form-item>
      <el-form-item label="企业名称:">
        <el-input v-model="formInline.enterpriseName" placeholder="企业关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onsearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onexport">导出</el-button>
      </el-form-item>
    </el-form>
    <hr>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripestyle="width: 100%">
      <el-table-column prop="enterpriseNo" label="企业编码"></el-table-column>
      <el-table-column prop="enterpriseName" label="企业名称">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="handleClick(scope.row)"
            type="text"
            size="small"
          >{{scope.row.enterpriseName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="city" label="市"></el-table-column>
      <el-table-column prop="area" label="区"></el-table-column>
      <el-table-column prop="street" label="街道"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="telephone" label="企业电话"></el-table-column>
      <el-table-column prop="founder" label="创建人"></el-table-column>
      <el-table-column prop="date" label="创建日期"></el-table-column>
    </el-table>
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
      // 请求表单参数
      formInline: {
        province: null,
        city: null,
        area: null,
        enterpriseName: null
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
      enterprises: [],
      device: [],
      // 省市区企业选择控制权限，允许为false，否则为true
      regionControl: {
        province: true,
        city: true,
        area: true,
        enterprise: true
      },
      //监听form表单中数据是否发生变化
      formDataIsChange: true
    };
  },
  methods: {
    handleClick(row) {
       this.$router.push({ path:'/company'});
    },
    onsearch() {
      //表单中的内容没有发生变化，不用查询
      if(!this.formDataIsChange){
        return ;
      }
      //改变状态
      this.formDataIsChange = false;
      const { province, city, area, enterpriseName } = this.formInline;
      this.$axios
        .get("api/profile/enterprise/findEnterpriseByAreaAndName", {
          params: {
            province,
            city,
            area,
            enterpriseName
          }
        })
        .then(res => {
          this.Len=res.data.length;
         
           if(this.Len/8>1&&this.Len%8>=0)
           {
             this.Value=true;
           }
          //重新请求清空数据
          this.tableData = [];
          if (res.status == 200) {
            res.data.forEach(enterprise => {
              this.tableData.push({
                //企业编号
                enterpriseNo: enterprise.enterpriseNo,
                //企业名称
                enterpriseName: enterprise.enterpriseName,
                // 市
                city: enterprise.enterpriseLocation.cityName,
                // 区
                area: enterprise.enterpriseLocation.areaName,
                //街道
                street: enterprise.street,
                // 地址
                address: enterprise.address,
                // 企业电话
                telephone: enterprise.telephone,
                // 创建人
                founder: enterprise.founder,
                // 时间
                date: enterprise.formatDate
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
    // 对角色查看权限进行控制，6个等级
    permissionControl() {
      this.permissionVmControl(this);
    },
     //分页
     handleSizeChange(val) {
       this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currentPage =val;
      } ,
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
.Page-Title {
  line-height: 60px;
  text-decoration: center;
  font-size: 20px;
  font-weight: 500;
}
</style>