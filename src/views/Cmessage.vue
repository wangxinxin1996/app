<template>
  <div class="Allmessage">
    <p class="Page-Title">油烟监测明细报表</p>
    <el-form ref="form" :model="form" :inline="true">
         <el-row>
        <el-col :span="5">
          <el-form-item>
            <el-col :span="7"><p>企业区域：</p></el-col>
              <el-col :span="17">
              <el-select v-model="formInline.region" placeholder="请选择省市">
              <el-option label="重庆市" value="chongqing"></el-option>
              <el-option label="北京市" value="beijing"></el-option>
             </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
           <el-select v-model="formInline.region" placeholder="请选择城市">
              <el-option label="重庆市" value="chongqing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-select v-model="formInline.region" placeholder="请选择区县">
              <el-option label="巴南区" value="banan"></el-option>
              <el-option label="渝中区" value="yuzhong"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-col :span="8"><p>企业名称|设备：</p></el-col>
              <el-col :span="16">
				    <el-select v-model="formInline.region" placeholder="请选择企业名称">
                <el-option label="巴南区" value="banan"></el-option>
                <el-option label="渝中区" value="yuzhong"></el-option>
              </el-select>
			  </el-col>
            
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            
            <el-select v-model="formInline.region" placeholder="请选择设备名称">
              <el-option label="巴南区" value="banan"></el-option>
              <el-option label="渝中区" value="yuzhong"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="查询日期：" >
            <div class="Data">
              <el-col :span="10">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="formInline.date1"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="10">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="formInline.date1"
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
                <el-time-picker placeholder="选择时间" v-model="formInline.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <hr>
    <template>
			<el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="company" label="企业编号">
				</el-table-column>
        	<el-table-column prop="Area" label="企业区域">
				</el-table-column>
				<el-table-column prop="company" label="企业名称">
				</el-table-column>
				<el-table-column prop="equipment" label="设备名称">
				</el-table-column>
        <el-table-column prop="equipment" label="设备类型">
				</el-table-column>
				<el-table-column prop="equipment_type" label="油烟浓度">
				</el-table-column>
				<el-table-column prop="concentrate" label="油烟状态">
				</el-table-column>
				<el-table-column prop="concentrate" label="烟气温度">
				</el-table-column>
        <el-table-column prop="concentrate" label="烟气状态">
				</el-table-column>
				<el-table-column prop="Date" label="监测时间">
				</el-table-column>
			</el-table>
		</template>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
        resource: "",
        data1: "",
        data2: "",
        name: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
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

.el-col-2 {
  width: auto;
}
.Data {
  width: 400px;
}
</style>