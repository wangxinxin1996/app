<template>
<div id="SysAdminpersenCenter">
<PersenCenter></PersenCenter>
</div>
</template>

<script>
	import PersenCenter from "../components/PersenCenter"
	export default{
		name:"SysAdminpersenCenter",
		components: {
			PersenCenter
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style>
#SysAdminpersenCenter{
	position: absolute;
	top: 30%;
	left: 30%;
   
}
</style>