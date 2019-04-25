<template>
  <div class="deletcompany">
    <h1 class="search_condition">查询条件</h1>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="from">
      <el-row>
        <el-col :span="5">
          <el-form-item>
            <el-col :span="7">
              <p>企业区域：</p>
            </el-col>
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
        <el-col :span="8">
          <el-form-item>
            <el-col :span="7">
              <p>企业编码:</p>
            </el-col>
            <el-col :span="17">
              <el-input v-model="formInline.userNo" placeholder="企业编码"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="企业名称:">
        <el-input v-model="formInline.name" placeholder="企业名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('from')">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      size="small"
      icon="search"
      class="left"
      @click="onMoreCreateUser()"
    >删除企业</el-button>
    <el-button type="primary" size="small" icon="search" @click="onMoreCreateUser()">批量删除</el-button>
    <el-table
      :data="Usermessage"
      style="width: 100%"
      ref="multipleTable"
      @selection-change="handleSelectionChange()"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="countName" label="企业编码">
        <template slot-scope="scope">
          <span>{{ scope.row.countName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="企业名称">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="password" label="企业类型">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="identity" label="企业地址">
        <template slot-scope="scope">
          <span>{{ scope.row.identity }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="identity" label="负责人">
        <template slot-scope="scope">
          <span>{{ scope.row.identity }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="identity" label="负责人电话">
        <template slot-scope="scope">
          <span>{{ scope.row.identity }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, Usermessage)"
            type="text"
            size="small"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        userNo: "",
        name: "",
        identity: ""
      },
      user: {
        userName: "",
        password: "",
        identity: "",
        countName: ""
      },
      Usermessage: []
    };
  },
  methods: {}
};
</script>

<style scoped>
.deletcompany {
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