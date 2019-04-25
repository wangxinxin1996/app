// 定义全局函数
exports.install = function (Vue) {
  // vm为组件中的vue实例对象
  Vue.prototype.selectVmProvince = function (provinceName,vm){
    for (let i = 0; i < vm.provinces.length; i++) {
      if (provinceName === vm.provinces[i].provinceName) {
        vm.cities = vm.provinces[i].cities;
        vm.formInline.city = null;
        vm.formInline.area = null;
        vm.formInline.enterpriseName = null;
        vm.formInline.deviceName = null;
        vm.areaList = [];
        vm.enterprises = [];
        vm.device = [];
        return;
      }
    }
  };
  Vue.prototype.selectVmCity = function (cityName,vm){
    for (let i = 0; i < vm.cities.length; i++) {
      if (cityName === vm.cities[i].cityName) {
        vm.areaList = vm.cities[i].areaList;
        vm.formInline.area = null;
        vm.formInline.enterpriseName = null;
        vm.formInline.deviceName = null;
        vm.enterprises = [];
        vm.device = [];
        return;
      }
    }
  };
  Vue.prototype.selectVmArea = function (areaName,vm){
    for (let i = 0; i < vm.areaList.length; i++) {
      if (areaName === vm.areaList[i].areaName) {
        vm.enterprises = vm.areaList[i].enterprises;
        vm.formInline.enterpriseName = null;
        vm.formInline.deviceName = null;
        vm.device = [];
        return;
      }
    }
  };
  Vue.prototype.selectVmEnterprise = function (enterpriseName,vm){
    for (let i = 0; i < vm.enterprises.length; i++) {
      if (enterpriseName === vm.enterprises[i].enterpriseName) {
        vm.device = vm.enterprises[i].device;
        vm.formInline.deviceName = null;
        return;
      }
    }
  };
  //权限控制
  Vue.prototype.permissionVmControl = function (vm){
    switch(vm.level){
      //系统管理员
      case 0:
        break;
      // 省管理员
      case 1:
        vm.formInline.province = vm.provinces.length>0?vm.provinces[0].provinceName:null;
        vm.regionControl.province = false;
        vm.selectProvince(vm.formInline.province);
        break;
      //市管理员
      case 2:
        vm.formInline.province = vm.provinces.length>0?vm.provinces[0].provinceName:null;
        vm.selectProvince(vm.formInline.province)
        vm.formInline.city = vm.provinces[0].cities.length>0?vm.provinces[0].cities[0].cityName:null;
        vm.selectCity(vm.formInline.city);
        vm.regionControl.province = false;
        vm.regionControl.city = false;
        break;
      //区管理员
      case 3:
        vm.formInline.province = vm.provinces.length>0?vm.provinces[0].provinceName:null;
        vm.selectProvince(vm.formInline.province)
        vm.formInline.city = vm.provinces[0].cities.length>0?vm.provinces[0].cities[0].cityName:null;
        vm.selectCity(vm.formInline.city);
        vm.formInline.area = vm.provinces[0].cities[0].areaList.length>0?vm.provinces[0].cities[0].areaList[0].areaName:null;
        vm.selectArea(vm.formInline.area);
        vm.regionControl.province = false;
        vm.regionControl.city = false;
        vm.regionControl.area = false;
        break;
      //巡检员和用户
      default:
        vm.formInline.province = vm.provinces.length>0?vm.provinces[0].provinceName:null;
        vm.selectProvince(vm.formInline.province)
        vm.formInline.city = vm.provinces[0].cities.length>0?vm.provinces[0].cities[0].cityName:null;
        vm.selectCity(vm.formInline.city)
        vm.formInline.area = vm.provinces[0].cities[0].areaList.length>0?vm.provinces[0].cities[0].areaList[0].areaName:null;
        vm.selectArea(vm.formInline.area)
        vm.formInline.enterpriseName = vm.provinces[0].cities[0].areaList[0].enterprises.length>0?vm.provinces[0].cities[0].areaList[0].enterprises[0].enterpriseName:null;
        vm.selectEnterprise(vm.formInline.enterpriseName)
        vm.regionControl.province = false;
        vm.regionControl.city = false;
        vm.regionControl.area = false;
        vm.regionControl.enterprise = false;
    }
  }
};