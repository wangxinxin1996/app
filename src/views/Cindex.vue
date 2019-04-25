<template>
  <div class="Cindex">
    <HeadNav></HeadNav>
    <CleftMenu></CleftMenu>
    <div class="rightContainer">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import HeadNav from "../components/HeadNav";
import CleftMenu from "../components/CleftMenu";

export default {
  name: "Aindex",
  components: {
    HeadNav,
    CleftMenu
  }
};
</script>

<style scoped>
.Cindex {
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