<template>
	<div id="gradeStat">
		<top-title></top-title>
    	<top-bar></top-bar>
    	
    	<grade-table></grade-table>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar from '../../../../components/eduAdmin/markManage/gradeStatPage/topBar/topBar'
import gradeTable from '../../../../components/eduAdmin/markManage/gradeStatPage/gradeTable/gradeTable'

export default {
	name: 'gradeStat',
	components: {
    	topTitle, topBar, gradeTable
  	}
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
