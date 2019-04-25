<template>
  <div class="companymessage">
    <p class="Page-Title">餐饮企业信息</p>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" >
      <el-form-item label="企业区域:">
        <el-input v-model="formInline.province" placeholder="重庆市" :disabled="true">重庆市</el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.city" placeholder="重庆市" :disabled="true">重庆市</el-input>
      </el-form-item>
      <el-form-item>
         <el-input v-model="formInline.user" placeholder="巴南区" :disabled="true">巴南区</el-input>
      </el-form-item>
      <el-form-item label="企业名称:">
        <el-input v-model="formInline.enterpriseName" placeholder="企业关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onsearch">查询</el-button>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="onsearch">添加企业</el-button>
      </el-form-item>
	  <el-form-item>
        <el-button type="primary" @click="onexport">导出</el-button>
      </el-form-item>
    </el-form>
    <hr>
    <el-table :data="tableData" stripestyle="width: 100%">
      <el-table-column prop="enterpriseNo" label="企业编码" ></el-table-column>
      <el-table-column prop="enterpriseName" label="企业名称" > 
		<template slot-scope="scope">
          <el-button 
            @click.native.prevent="handleClick(scope.row)"
			type="text"
            size="small">{{scope.row.enterpriseName}}</el-button>
        </template></el-table-column>
      <el-table-column prop="province" label="市"></el-table-column>
	  <el-table-column prop="city" label="区"></el-table-column>
	  <el-table-column prop="area" label="街道"></el-table-column>
	  <el-table-column prop="address" label="地址"></el-table-column>
	  <el-table-column prop="telephone"  label="企业电话"></el-table-column>
	  <el-table-column prop="founder"  label="创建人"></el-table-column>
	 <el-table-column prop="formatData"  label="创建日期"></el-table-column>	  
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        province: "重庆市",
        city: "重庆市",
        area: "",
        enterpriseName: ""
      },
     tableData: []
      }
  },
  methods:{
	  	handleClick(row){
        this.$router.push({ path:'/company'});
      },
       onsearch() {
      this.$axios
      .get("api/profile/enterprise/findEnterpriseByAreaAndName", {
        params: {area:this.formInline.area,enterpriseName:this.formInline.enterpriseName}
      })
      .then(res => {
        if(res.status==200){
          const {data} = res;
          console.log(data)
          this.tableData = data;
          console.log(this.tableData[0].enterpriseName)
        }
      })
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