<template>
  <!--系统管理员界面的头部 -->
  <div id="AdminHead">
    <h1 class="search_condition">查询条件</h1>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="from">
    
          <el-form-item label='用户区域:'>
          
              <el-select v-model="formInline.region" placeholder="请选择省市">
                <el-option label="重庆市" value="chongqing"></el-option>
                <el-option label="北京市" value="beijing"></el-option>
              </el-select>
           
          </el-form-item>

          <el-form-item>
            <el-select v-model="formInline.region" placeholder="请选择城市">
              <el-option label="重庆市" value="chongqing"></el-option>
            </el-select>
          </el-form-item>

  
          <el-form-item>
            <el-select v-model="formInline.region" placeholder="请选择区县">
              <el-option label="巴南区" value="banan"></el-option>
              <el-option label="渝中区" value="yuzhong"></el-option>
            </el-select>
          </el-form-item>

      <el-row>
        <el-form-item label="用户账号:">
          <el-input v-model="formInline.userNo" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名:">
          <el-input v-model="formInline.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份类型:">
          <el-select v-model="formInline.roleName" placeholder="身份类型">
            <el-option label="系统管理员" value="系统管理员"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
						<el-option label="巡检员" value="admin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('from')">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        userNo: "",
        name: "",
        roleName: ""
      }
    };
  },
  methods: {
    onSubmit(from) {
      this.$refs[from].validate(val => {
        if (val) {
          this.$axios
            .get("/api/profile/users/findUsers", {
              params: {
                countName: this.formInline.userNo,
                userName: this.formInline.name,
                roleName: this.formInline.roleName
              }
            })
            .then(res => {
              if (!res.status) {
                console.log("err");
              } else {
                var { data } = res;
                //将查询到的数据传到Add
                this.$emit("getUserList", data);
              }
            });
        }
      });
    }
  }
};
</script>

<style>
#AdminHead {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.search_condition {
  width: 5rem;
  height: 2.5rem;
}
</style>