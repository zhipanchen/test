<template>
	<div id="salary">
		<top-title></top-title>
    <top-bar></top-bar>
    
    <see-signin-list-body></see-signin-list-body>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar from '../../../../components/eduAdmin/tchSalary/seeSigninListPage/topBar/topBar'
import seeSigninListBody from '../../../../components/eduAdmin/tchSalary/seeSigninListPage/seeSigninListBody/seeSigninListBody'

export default {
	name: 'salary',
	components: {
    	topTitle, topBar, seeSigninListBody
  },
  methods: {
   
  }
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
