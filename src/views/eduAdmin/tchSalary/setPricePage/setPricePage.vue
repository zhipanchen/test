<template>
	<div id="setPrice">
		<top-title></top-title>
    	<top-bar></top-bar>
    	
      <set-price-body></set-price-body>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar from '../../../../components/eduAdmin/tchSalary/setPricePage/topBar/topBar'
import setPriceBody from '../../../../components/eduAdmin/tchSalary/setPricePage/setPriceBody/setPriceBody'

export default {
	name: 'setPrice',
	components: {
    	topTitle, topBar, setPriceBody
  	},
  	data () {
  		return {
  			
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
