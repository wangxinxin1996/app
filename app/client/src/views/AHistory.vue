<template>
	<div>
		<p class="Page-Title">历史数据查询</p>
		<el-form ref="form" :model="form" :inline="true" size="small ">
			<el-form-item label="企业区域：">
				<el-input v-model="form.name" class="Input"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="form.name" class="Input"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="form.name" class="Input"></el-input>
			</el-form-item>
			<el-form-item label="企业名称|设备：">
				<el-select v-model="form.region" placeholder="请选择活动区域" class="Input">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			
			<el-form-item>
				<el-select v-model="form.region" placeholder="请选择活动区域" class="Input">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="数据状态：">
				<el-radio-group v-model="form.resource">
					<el-radio label="全部"></el-radio>
					<el-radio label="正常"></el-radio>
					<el-radio label="超标"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="企业快查：" >
				<el-input v-model="form.name" placeholder="企业关键字" class="Input"></el-input>
			</el-form-item>
			<el-form-item label="查询日期：" class="right">
				<div>
				<el-col :span="11">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11" >
					<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
				</el-col>
				</div>
				<div>
				<el-col :span="11"  >
					<el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11"  >
					<el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
				</el-col>
				</div>
			</el-form-item>
			<el-form-item  class="right">
				<el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
		<div class="static">
			<p>油烟浓度：正常1个，超标0个</p>
			<div class="choise">
				正常
				<div class="Normal"></div>
				离线
				<div class="Normal Normal1"></div>
				掉线
				<div class="Normal Normal2"></div>
			</div>
		</div>
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
	.Input {
		max-width: 150px;
	}
	.right{
	position: relative;
	right:-26%;
	}
	.el-col-2{
		width:auto;
	}
	
</style>