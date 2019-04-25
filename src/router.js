import Vue from 'vue'
import Router from 'vue-router'

// import Register from './views/Register'
import Nofind from './views/404'
import Login from './views/Login'
import Home from './views/Home'
//系统管理员
const Index = () => import('./views/Index.vue')
const AddUser = () => import('./views/AddUser')
const DeleteUser = () => import('./views/DeleteUser')
const SysAdminpersenCenter = () => import('./views/SysAdminpersenCenter')
const SAMap = () => import('./views/System/SAMap')
const SAHistory = () => import('./views/System/SAHistory')
const SAllmessage = () => import('./views/System/SAllmessage')  
const SYearmessage = () => import('./views/System/SYearmessage') 
const SMonthmessage = () => import('./views/System/SMonthmessage')  
const SDaymessage = () => import('./views/System/SDaymessage')  
const SAreastatistic = () => import('./views/System/SAreastatistic') 
const SAllsuperscalar = () => import('./views/System/SAllsuperscalar')
const SCompanydetail = () => import('./views/System/SCompanydetail')    
const SCompanymessage = () => import('./views/System/SCompanymessage')   
const SDailymess = () => import('./views/System/SDailymess')   
const SCaution = () => import('./views/System/SCaution')
const SPhotomess = () => import('./views/System/SPhotomess')
const SArealTime = () => import('./views/System/SArealTime')
const Addcompany = () => import('./views/System/Addcompany')
const Deletcompany = () => import('./views/System/Deletcompany')
const SAddcompany = () => import('./views/System/SAddcompany')
//管理员
const Aindex = () => import('./views/Aindex')
 

  // const Companydetail = () => import('./views/Companydetail')
  // const Companymessage = () => import('./views/Companymessage')
  // const Dailymess = () => import('./views/Dailymess')
  // const Caution = () => import('./views/Caution')
  // const Photomess = () => import('./views/Photomess')
const Company = () => import('./views/Company')
//企业用户
const Cindex = () => import('./views/Cindex')
const CompanyArealtime = () => import('./views/CompanyArealtime')
const Chistory = () => import('./views/Chistory')
const Cmessage = () => import('./views/Cmessage')
const Cdetail = () => import('./views/Cdetail')
const Cdailymess = () => import('./views/Cdailymess')
const Cphotomess = () => import('./views/Cphotomess')
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '*', name: '/404', component: Nofind },
    //登录
    { path: '/login', name: 'login', component: Login },
    //系统管理员进入首页
    { path: '/', redirect: '/login' },
    //管理员进入首页
    { path: '/', redirect: '/login' },
    // { path: '/register', name: 'register', component: Register },

    //系统管理员
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        { path: '', component: Home },
        { path: '/home', name: 'home', component: Home },
        { path: '/sArealTime', name: 'sArealTime', component: SArealTime, meta: { keepAlive: true } },
        { path: '/sAhistory', name: 'sAhistory', component: SAHistory, meta: { keepAlive: true } },
        { path: '/sAmap', name: 'sAmap', component: SAMap, meta: { keepAlive: true } },
        { path: '/sAllmessage', name: 'sAllmessage', component: SAllmessage },
        { path: '/sYearmessage', name: 'sYearmessage', component: SYearmessage },
        { path: '/sMonthmessage', name: 'sMonthmessage', component: SMonthmessage },
        { path: '/sDaymessage', name: 'sDaymessage', component: SDaymessage },
        { path: '/sAreastatistic', name: 'sAreastatistic', component: SAreastatistic },
        { path: '/sAllsuperscalar', name: 'sAllsuperscalar', component: SAllsuperscalar },
        { path: '/sCompanydetail', name: 'sCompanydetail', component: SCompanydetail },
        { path: '/sCompanymessage', name: 'sCompanymessage', component: SCompanymessage },
        { path: '/sDailymess', name: 'sDailymess', component: SDailymess },
        { path: '/sCaution', name: 'sCaution', component: SCaution },
        { path: '/sPhotomess', name: 'sPhotomess', component: SPhotomess },
        { path: '/adduser', name: 'adduser', component: AddUser, meta: { keepAlive: true } },
        { path: '/deleteuser', name: 'deleteuser', component: DeleteUser, meta: { keepAlive: true } },
        { path: '/sysadminpersencenter', name: 'sysadminpersencenter', component: SysAdminpersenCenter },
        { path: '/addcompany', name: 'addcompany', component: Addcompany, meta: { keepAlive: true } },
        { path: '/deletcompany', name: 'deletcompany', component: Deletcompany, meta: { keepAlive: true } },
        { path: '/sAddcompany', name: 'sAddcompany', component: SAddcompany, meta: { keepAlive: true } },
      ]
    },
    //管理员
    {
      path: '/aindex',
      name: 'aindex',
      component: Aindex,
      children: [
        { path: '', component: Home },
        { path: '/homes', name: 'homes', component: Home },
        { path: '/arealtime', name: 'arealtime', component: SArealTime },
        { path: '/ahistory', name: 'ahistory', component: SAHistory },
        { path: '/amap', name: 'amap', component: SAMap },
        { path: '/allmessage', name: 'allmessage', component: SAllmessage },
        { path: '/yearmessage', name: 'yearmessage', component: SYearmessage },
        { path: '/monthmessage', name: 'monthmessage', component: SMonthmessage },
        { path: '/daymessage', name: 'daymessage', component: SDaymessage },
        { path: '/areastatistic', name: 'areastatistic', component: SAreastatistic },
        { path: '/allsuperscalar', name: 'allsuperscalar', component: SAllsuperscalar },
        { path: '/companydetail', name: 'companydetail', component: SCompanydetail },
        { path: '/companymessage', name: 'companymessage', component: SCompanymessage },
        { path: '/dailymess', name: 'dailymess', component: SDailymess },
        { path: '/caution', name: 'caution', component: SCaution },
        { path: '/photomess', name: 'photomess', component: SPhotomess },
        { path: '/company', name: 'company', component: Company },
        // { path: '/arealtime', name: 'arealtime', component: SArealTime },
        // { path: '/ahistory', name: 'ahistory', component: AHistory },
        // { path: '/amap', name: 'amap', component: AMap },
        // { path: '/allmessage', name: 'allmessage', component: Allmessage },
        // { path: '/yearmessage', name: 'yearmessage', component: Yearmessage },
        // { path: '/monthmessage', name: 'monthmessage', component: Monthmessage },
        // { path: '/daymessage', name: 'daymessage', component: Daymessage },
        // { path: '/areastatistic', name: 'areastatistic', component: Areastatistic },
        // { path: '/allsuperscalar', name: 'allsuperscalar', component: Allsuperscalar },
        // { path: '/companydetail', name: 'companydetail', component: Companydetail },
        // { path: '/companymessage', name: 'companymessage', component: Companymessage },
        // { path: '/dailymess', name: 'dailymess', component: Dailymess },
        // { path: '/caution', name: 'caution', component: Caution },
        // { path: '/photomess', name: 'photomess', component: Photomess },
        // { path: '/company', name: 'company', component: Company },
      ]
    },
    //企业用户
    {
      path: '/cindex',
      name: 'cindex',
      component: Cindex,
      children: [
        { path: '', component: Home },
        { path: '/Chome', name: 'Chome', component: Home },
        { path: '/companyArealtime', name: 'companyArealtime', component: CompanyArealtime },
        { path: '/chistory', name: 'chistory', component: Chistory },
        { path: '/cmessage', name: 'cmessage', component: SAllmessage },
        { path: '/cdetail', name: 'cdetail', component: SCompanydetail },
        { path: '/cdailymess', name: 'cdailymess', component: Cdailymess },
        { path: '/cphotomess', name: 'cphotomess', component: Cphotomess },
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