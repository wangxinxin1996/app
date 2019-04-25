<template>
  <div class="wrapper">
  <el-row class="menu_page">
    <el-col>
      <el-menu
        mode="vertical"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
        class="el-menu-vertical-demo">
        <router-link to="/home">
          <el-menu-item index="1">
            <i class="fa fa-margin fa-server"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="'fa fa-margin '+item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
              <el-menu-item :index="citem.path">
                <span slot="title">{{citem.name}}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
  </div>
</template>
<script>
export default {
  name: "leftmenu",
  data() {
    return {
      items: [
        {
          icon: "",
          name: "实时数据",
          path: "ontime",
          children: [
            { path: "/sArealtime", name: "油烟实时数据" },
            { path: "/sAhistory", name: "历史数据查询" },
            { path: "/sAmap", name: "油烟监测地图" }
          ]
        },
        {
          icon: "",
          name: "数据报表",
          path: "info",
          children: [
            { path: "/sAllmessage", name: "油烟监测数据明细" },
            { path: "/sYearmessage", name: "油烟监测数据年报" },
            { path: "/sMonthmessage", name: "油烟监测数据月报" },
            { path: "/sDaymessage", name: "油烟监测数据日报" },
            { path: "/sAreastatistic", name: "区域监测数据统计" },
            { path: "/sAllsuperscalar", name: "监测超标汇总报表" },
            { path: "/sCompanydetail", name: "企业监测明细曲线" }
          ]
        },
        {
          icon: "",
          name: "系统管理",
          path: "system",
          children: [
            { path: "/sCompanymessage", name: "餐饮企业明细" },
            { path: "/sDailymess", name: "监测日志管理" },
            { path: "/sCaution", name: "预备报警管理" },
            { path: "/sPhotomess", name: "现场照片管理" }
          ]
        },
        {
          icon: "fa-money",
          name: "用户信息管理",
          path: "Usermessage",
          children: [{ path: "/AddUser", name: "用户信息添加" },{path:"/DeleteUser",name:"用户信息删除"}]
        },
        {
          icon: "fa-asterisk",
          name: "企业信息管理",
          path: "Companymessage",
          children: [{ path: "/sAddcompany", name: "企业信息添加" },{path:"/deletcompany",name:"企业信息删除"}]
        },{
          icon: "fa-user-o",
          name: "个人信息中心",
          path: "persencenter",
          children: [{ path: "/SysAdminPersenCenter", name: "个人信息修改" }]
        }
        
      ]
    };
  }
};
</script>
<style scoped>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.wrapper {
  position: fixed;
  width: 180px;
  height: calc(100% - 71px);
  overflow: auto;
}
.wrapper::-webkit-scrollbar {
  width: 3px; /*滚动条宽度*/
  height: 3px; /*滚动条高度*/
}
/*定义滚动条轨道 内阴影+圆角*/  
.wrapper::-webkit-scrollbar-track  
{  
    background-color: rgb(195, 209, 211);/*滚动条的背景颜色*/  
}  
  
/*定义滑块 内阴影+圆角*/  
.wrapper::-webkit-scrollbar-thumb  
{  
    background-color: rgb(15, 19, 29);  /*滚动条的背景颜色*/
}

.menu_page {
  position: absolute;
  /* top: 71px; */
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
