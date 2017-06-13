<template>
	<div id="gradeQuery">
		<top-title></top-title>
    	<top-bar></top-bar>
    	
    	<grade-content></grade-content>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar from '../../../../components/eduAdmin/markManage/gradeQueryPage/topBar/topBar'
import gradeContent from '../../../../components/eduAdmin/markManage/gradeQueryPage/gradeContent/gradeContent'

export default {
	name: 'gradeQuery',
	data () {
		return {
			
		}
	},
	components: {
    	topTitle, topBar, gradeContent
  	},
  	methods: {
      selYearsBtn: function () {

      }
  	}
}
</script>

<style scoped>

@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
