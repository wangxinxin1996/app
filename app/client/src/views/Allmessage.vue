<template>
	<div>
		<p class="Page-Title">油烟监测明细报表</p>
		<el-form ref="form" :model="form" :inline="true" >
			<el-form-item label="企业区域：">
				<el-input v-model="form.name" ></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="form.name" ></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="form.name" ></el-input>
			</el-form-item>
			<el-form-item label="企业名称|设备：">
				<el-select v-model="form.region" placeholder="请选择活动区域" >
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			
			<el-form-item>
				<el-select v-model="form.region" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="企业快查：" >
				<el-input v-model="form.name" placeholder="企业关键字" ></el-input>
			</el-form-item>
			<el-form-item label="查询日期：" class="right">
			<div class="Data">
			<el-col :span="10">
				<el-date-picker  type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
			</el-col>
			<el-col class="line" :span="2">-</el-col>
			<el-col :span="10" >
				<el-date-picker  type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
			</el-col>
			</div>
			<div class="Data">
			<el-col :span="10"  >
				<el-time-picker placeholder="选择时间" v-model="form.date2" style="width:100%;"></el-time-picker>
			</el-col>
			<el-col class="line" :span="2">-</el-col>
			<el-col :span="10"  >
				<el-time-picker  placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
			</el-col>
			</div>	
			</el-form-item>
			<el-form-item  class="right">
				<el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
		<hr />
	</div>

</template> 
<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
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

<style scoped>
	.right{
	position: relative;
	right:-34%;
	}
	.el-col-2{
		width:auto;
	}
	.Data{
		width:400px;
	}
</style>