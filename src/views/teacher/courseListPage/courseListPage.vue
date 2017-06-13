<template>
	<div id="classList">
		<top-title></top-title>
    	<top-bar></top-bar>
      
      <my-class-list></my-class-list>
	</div>
</template>

<script>
import topTitle from '../../../components/public/topTitle/topTitle'
import topBar from '../../../components/teacher/courseListPage/topBar/topBar'
import myClassList from '../../../components/teacher/courseListPage/myClassList/myClassList'

export default {
	name: 'classList',
  data () {
    return {
      
    }
  },
	components: {
    	topTitle, topBar, myClassList
  }
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
