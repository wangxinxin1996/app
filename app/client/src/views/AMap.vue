<template>
	<div>
		<p class="Page-Title">油烟监测地图信息</p>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="企业区域:">
				<el-input v-model="formInline.user" placeholder="重庆市" :disabled="true">重庆市</el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="formInline.user" placeholder="重庆市" :disabled="true">重庆市</el-input>
			</el-form-item>
			<el-form-item>
				<el-select v-model="formInline.region" placeholder="请选择区县">
					<el-option label="巴南区" value="banan"></el-option>
					<el-option label="渝中区" value="yuzhong"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="企业名称|设备：">
				<el-select v-model="formInline.region" placeholder="请选择企业名称">
					<el-option label="巴南区" value="banan"></el-option>
					<el-option label="渝中区" value="yuzhong"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-select v-model="formInline.region" placeholder="请选择设备名称">
					<el-option label="巴南区" value="banan"></el-option>
					<el-option label="渝中区" value="yuzhong"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="企业快查:">
				<el-input v-model="formInline.user" placeholder="企业关键字"></el-input>
			</el-form-item>
			<el-form-item label="数据状态：" class="right">
				<el-radio-group v-model="formInline.resource">
					<el-radio label="全部"></el-radio>
					<el-radio label="正常"></el-radio>
					<el-radio label="超标"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item class="right">
				<el-button type="primary" @click="onSubmit">搜索</el-button>
			</el-form-item>
		</el-form>
		<hr>
		<div>
			<el-container>
				<el-aside width="200px">
					<el-menu>
						<el-submenu index="1">
							<template slot="title">企业一</template>
							<div>
								<p class="containt">企业地址：</p>
								<p class="containt">油烟浓度：</p>
								<p class="containt">烟气温度：</p>
								<p class="containt">监测时间：</p>
							</div>
						</el-submenu>
						<el-submenu index="2">
							<template slot="title">企业一</template>
							<div>
								<p class="containt">企业地址：</p>
								<p class="containt">油烟浓度：</p>
								<p class="containt">烟气温度：</p>
								<p class="containt">监测时间：</p>
							</div>

						</el-submenu>
					</el-menu>
				</el-aside>
				<el-main>Main</el-main>
			</el-container>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formInline: {
					user: '',
					region: '',
					resource: ''
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
	.Page-Title {
		line-height: 60px;
		text-decoration: center;
		font-size: 20px;
		font-weight: 500;
	}
	
	.right {
		position: relative;
		right: -36%;
	}
	
	.el-main {
		text-align: center;
		line-height: 160px;
	}
	.containt{
		line-height: 20px;
		font-size: 13px;
		color: grey;
	}
</style>