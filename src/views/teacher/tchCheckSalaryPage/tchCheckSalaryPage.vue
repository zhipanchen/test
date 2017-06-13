<template>
	<div id="salary">
		<top-title></top-title>
    <top-bar></top-bar>
    
    <tch-salary-body></tch-salary-body>
	</div>
</template>

<script>
import topTitle from '../../../components/public/topTitle/topTitle'
import topBar from '../../../components/teacher/tchCheckSalaryPage/topBar/topBar'
import tchSalaryBody from '../../../components/teacher/tchCheckSalaryPage/tchSalaryBody/tchSalaryBody'

export default {
	name: 'salary',
	components: {
    	topTitle, topBar, tchSalaryBody
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
