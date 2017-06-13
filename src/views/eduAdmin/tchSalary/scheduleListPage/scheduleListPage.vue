<template>
	<div id="salary">
		<top-title></top-title>
    <top-bar></top-bar>
    
    <schedule-list-body></schedule-list-body>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar from '../../../../components/eduAdmin/tchSalary/scheduleListPage/topBar/topBar'
import scheduleListBody from '../../../../components/eduAdmin/tchSalary/scheduleListPage/scheduleListBody/scheduleListBody'

export default {
	name: 'salary',
	components: {
    	topTitle, topBar, scheduleListBody
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
