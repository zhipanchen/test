<template>
	<div id="authorityMgmt1">
		<top-title></top-title>
   	<top-bar></top-bar>
    <!-- <div id="main">
      <div class="lPart">
        <roles></roles>
      </div>
      <div class="rPart">
        <personal-authorities></personal-authorities>
      </div>
    </div> -->
    <role-manage></role-manage>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar from '../../../../components/eduAdmin/userManage/authorityMgmt1Page/topBar/topBar'
import roleManage from '../../../../components/eduAdmin/userManage/authorityMgmt1Page/roleManage/roleManage'

export default {
	name: 'authorityMgmt1',
	components: {
    	topTitle, topBar, roleManage
  	}
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
