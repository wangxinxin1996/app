import Vue from 'vue'
import Router from 'vue-router'
//系统管理员
import Index from './views/Index.vue'
import Register from './views/Register'
import Nofind from './views/404'
import Login from './views/Login'
import Home from './views/Home'
import InfoShow from './views/InfoShow'
import FoundList from './views/FoundList'
import AddUser from './views/AddUser'
import DeleteUser from './views/DeleteUser'
import SysAdminpersenCenter from './views/SysAdminpersenCenter'
import ArealTime from './views/ArealTime'
import Addcompany from './views/Addcompany'
import Deletcompany from './views/Deletcompany'
//管理员
import Aindex from './views/Aindex'
import AHistory from './views/AHistory'
import AMap from './views/AMap'
import Allmessage from './views/Allmessage'
import Yearmessage from './views/Yearmessage'
import Monthmessage from './views/Monthmessage'
import Daymessage from './views/Daymessage'
import Areastatistic from './views/Areastatistic'
import Allsuperscalar from './views/Allsuperscalar'
import Companydetail from './views/Companydetail'
import Companymessage from './views/Companymessage'
import Dailymess from './views/Dailymess'
import Caution from './views/Caution'
import Photomess from './views/Photomess'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '*', name: '/404', component: Nofind },
    //系统管理员进入首页
    { path: '/', redirect: '/index' },
    //管理员进入首页
    { path: '/', redirect: '/aindex' },
    { path: '/register', name: 'register', component: Register },
    //登录
    { path: '/login', name: 'login', component: Login },
    //系统管理员
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        { path: '', component: Home },
        { path: '/home', name: 'home', component: Home },
//      { path: '/infoshow', name: 'infoshow', component: InfoShow },
//      { path: '/foundlist', name: 'foundlist', component: FoundList },
        { path: '/adduser', name: 'adduser', component: AddUser },
        { path: '/deleteuser', name: 'deleteuser', component: DeleteUser },
        { path: '/sysadminpersencenter', name: 'sysadminpersencenter', component: SysAdminpersenCenter },
        { path: '/addcompany', name: 'addcompany', component: Addcompany },
         { path: '/deletcompany', name: 'deletcompany', component: Deletcompany },
      ]
    },
    //管理员
    {
    	path: '/aindex',
      name: 'aindex',
      component: Aindex,
      children:[
       { path: '', component: Home },
       { path: '/home', name: 'home', component: Home },
       { path: '/arealtime',name: 'arealtime', component: ArealTime },
       { path: '/ahistory', name: 'ahistory', component: AHistory },
       { path: '/amap', name: 'amap', component: AMap},
       { path: '/allmessage', name: 'allmessage', component: Allmessage},
       { path: '/yearmessage', name: 'yearmessage', component: Yearmessage},
       { path: '/monthmessage', name: 'monthmessage', component: Monthmessage},
       { path: '/daymessage', name: 'daymessage', component: Daymessage},
       { path: '/areastatistic', name: 'areastatistic', component: Areastatistic},
       { path: '/allsuperscalar', name: 'allsuperscalar', component: Allsuperscalar},
       { path: '/companydetail', name: 'companydetail', component: Companydetail},
       { path: '/companymessage', name: 'companymessage', component: Companymessage},
       { path: '/dailymess', name: 'dailymess', component: Dailymess},
       { path: '/caution', name: 'caution', component: Caution},
       { path: '/photomess', name: 'photomess', component: Photomess}
      ]
    },
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router;