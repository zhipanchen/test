<template>
	<div id="grdInput">
		<top-title></top-title>
    	<top-bar></top-bar>
    	
    	<makeup-grade-input></makeup-grade-input>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar from '../../../../components/eduAdmin/markManage/makeupGradeInputPage/topBar/topBar'
import makeupGradeInput from '../../../../components/eduAdmin/markManage/makeupGradeInputPage/makeupGradeInputBody/makeupGradeInputBody'

export default {
	name: 'makeupGrdInput',
	data () {
		return {
			
		}
	},
	components: {
		topTitle, topBar, makeupGradeInput
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