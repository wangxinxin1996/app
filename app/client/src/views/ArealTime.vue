<template>
	<div class="ArealTime">
		<p class="Page-Title">油烟实时数据</p>
		<Ahead></Ahead>
		<!--		<Radio></Radio>-->
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
		<template>
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="company" label="企业名称">
				</el-table-column>
				<el-table-column prop="Area" label="企业区域">
				</el-table-column>
				<el-table-column prop="equipment" label="设备名称">
				</el-table-column>
				<el-table-column prop="equipment_type" label="设备类型">
				</el-table-column>
				<el-table-column prop="concentrate" label="油烟浓度">
				</el-table-column>
				<el-table-column prop="Date" label="检测时间">
				</el-table-column>
				<el-table-column prop="report" label="通讯" width="70px">
				</el-table-column>
				<el-table-column prop="fan" label="风机"  width="70px">
				</el-table-column>
				<el-table-column prop="purifier" label="净化器"  width="70px">
				</el-table-column>
			</el-table>
		</template>
	</div>
</template>

<script>
	import Ahead from "../components/Ahead";
	export default {
		name: "arealtime",
		components: {
			Ahead
		},
		data() {
			return {
				formInline: {
					user: '',
					region: ''
				},
				tableData: [{
					company: '2016-05-02',
					Area: '王小虎',
					equipment: '上海市普陀区金沙江路 ',
					equipment_type:'1',
					concentrate:'2',
					Date:'2016-05-02',
					report:'red',
					fan:'red',
					purifier:'red'
				},{
					company: '2016-05-02',
					Area: '王小虎',
					equipment: '上海市普陀区金沙江路 ',
					equipment_type:'1',
					concentrate:'2',
					Date:'2016-05-02',
					report:'red',
					fan:'red',
					purifier:'red'
				}]
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}
</script>

<style >
	.Page-Title {
		line-height: 60px;
		text-decoration: center;
		font-size: 20px;
		font-weight: 500;
	}
	
	.Normal {
		width: 20px;
		height: 20px;
		background-color: green;
	}
	
	.Normal1 {
		background-color: gray;
	}
	
	.Normal2 {
		background-color: goldenrod;
	}
	
	.static {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.choise {
		position: relative;
		right: 4%;
		width: 200px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>