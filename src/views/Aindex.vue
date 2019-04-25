<template>
  <!-- <div class="Aindex">
   <HeadNav></HeadNav>
  <AleftMenu></AleftMenu>
   <div class="rightContainer">
      <router-view></router-view>
    </div>
  </div>-->
  <div class="Aindex">
    <HeadNav></HeadNav>
    <AleftMenu></AleftMenu>
    <div class="rightContainer">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import HeadNav from "../components/HeadNav";
import AleftMenu from "../components/AleftMenu";

export default {
  name: "Aindex",
  components: {
    HeadNav,
    AleftMenu
  }
};
</script>

<style scoped>
.Aindex {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>