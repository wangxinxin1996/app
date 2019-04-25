<template>
  <div>
    <p class="Page-Title">日志信息</p>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="14">
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
    
        <el-col :span="10">
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
        timeRange: null,
      },
      //设备省市信息
      provinces: this.$store.getters.enterpriseRegion,
    };
  },
  methods: {
    onSubmit() {
    },
  
  },
  
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