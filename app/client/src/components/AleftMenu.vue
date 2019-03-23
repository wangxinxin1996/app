<template>
	<el-row class="menu_page">
         <el-col>
             <el-menu
                mode="vertical"
                background-color="#324057"
                text-color="#fff"
                active-text-color="#409eff" 
                class="el-menu-vertical-demo">
                <router-link to="/home">
                    <el-menu-item index="0">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>
                <template  v-for="item in items" >
                    <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                        <template slot="title">
                            <i :class="'fa fa-margin '+item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </template>
                        <router-link v-for="(citem,cindex) in item.children" 
                            :to="citem.path" :key="cindex">
                            <el-menu-item 
                                :index='citem.path'>
                                <span slot="title">{{citem.name}}</span>
                            </el-menu-item> 
                        </router-link>  
                    </el-submenu>
                    
                </template>
             </el-menu>
         </el-col>
    </el-row>
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
          children: [{ path: "/arealtime", name: "油烟实时数据" },{path:"/ahistory",name:"历史数据查询"},{path:"/amap",name:"油烟监测地图"}]
        },
        {
          icon: "",
          name: "数据报表",
          path: "info",
          children: [{ path: "/allmessage", name: "油烟监测数据明细" },{path:"/yearmessage",name:"油烟监测数据年报"},{path:"monthmessage",name:"油烟监测数据月报"},{path:"/daymessage",name:"油烟监测数据日报"},{path:"/areastatistic",name:"区域监测数据统计"},{path:"/allsuperscalar",name:"监测超标汇总报表"},{path:"/companydetail",name:"企业监测明细曲线"}]
        },{
          icon: "",
          name: "系统管理",
          path: "system",
          children: [{ path: "/companymessage", name: "餐饮企业明细" },{path:"/dailymess",name:"监测日志管理"},{path:"/caution",name:"预备报警管理"},{path:"/photomess",name:"现场照片管理"}]
        }
      ]
    };
  }
};
</script>

<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
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