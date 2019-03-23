<template>
	<!--系统管理员界面的头部 -->
	<div id="AdminHead">
		<h1 class="search_condition">查询条件</h1>
	 	<el-form :inline="true" :model="formInline" class="demo-form-inline">
	 	<el-form-item label="账号:"><el-input v-model="formInline.userNo" placeholder="账号"></el-input></el-form-item>
		<el-form-item label="姓名:"><el-input v-model="formInline.name" placeholder="姓名"></el-input></el-form-item>
		<el-form-item label="身份类型:">
			<el-select v-model="formInline.region" placeholder="身份类型">
				<el-option label="系统管理员" value="adminuser"></el-option>
				<el-option label="管理员" value="user"></el-option>
			</el-select>
		</el-form-item>
	  <el-form-item>
	    <el-button type="primary" @click="onSubmit">查询</el-button>	    
	  </el-form-item>
	</el-form>		
	</div>
</template>
<script>
	export default {
    data() {
      return {
        formInline: {
          userNo: '',
          name: ''
        } 
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style>
#AdminHead {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.search_condition{
	width: 100px;
	height: 50px;
}
</style>