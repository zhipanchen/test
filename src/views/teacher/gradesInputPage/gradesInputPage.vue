<template>
	<div id="grdInput">
		<top-title></top-title>
    	<top-bar></top-bar>
    	
    	<grade-put-body></grade-put-body>
	</div>
</template>

<script>
import topTitle from '../../../components/public/topTitle/topTitle'
import topBar from '../../../components/teacher/gradesInputPage/topBar/topBar'
import gradePutBody from '../../../components/teacher/gradesInputPage/gradePutBody/gradePutBody'

export default {
	name: 'grdInput',
	data () {
		return {
			
		}
	},
	components: {
		topTitle, topBar, gradePutBody
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