<template>
	<div id="adminCancelGrade">
		<top-title></top-title>
    	<top-bar></top-bar>
    	<cancel-content></cancel-content>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar from '../../../../components/eduAdmin/markManage/adminCancelGradePage/topBar/topBar'
import cancelContent from '../../../../components/eduAdmin/markManage/adminCancelGradePage/cancelContent/cancelContent'

export default {
	name: 'adminCancelGrade',
	data () {
		return {
			
		}
	},
	components: {
    	topTitle, topBar, cancelContent
  	},
  	methods: {
  		checkTableBtn: function () {

  		}
  	}
}
</script>

<style scoped>
#adminCancelGrade input {
  margin-right: 1.4rem;
}
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
