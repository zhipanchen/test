<template>
	<div id="salary">
		<top-title></top-title>
    <top-bar></top-bar>
    
    <salary-body></salary-body>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar from '../../../../components/eduAdmin/tchSalary/salaryPage/topBar/topBar'
import salaryBody from '../../../../components/eduAdmin/tchSalary/salaryPage/salaryBody/salaryBody'

export default {
	name: 'salary',
	components: {
    	topTitle, topBar, salaryBody
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
