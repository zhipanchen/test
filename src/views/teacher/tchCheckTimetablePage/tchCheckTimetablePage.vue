<template>
	<div id="tchCheckTable">
		<top-title></top-title>
    	<top-bar></top-bar>
    	
    	<form name="tableInfo"><timetable></timetable></form>
	</div>
</template>

<script>
import topTitle from '../../../components/public/topTitle/topTitle'
import topBar from '../../../components/teacher/tchCheckTimetablePage/topBar/topBar'
import timetable from '../../../components/teacher/tchCheckTimetablePage/timetable/timetable'

export default {
	name: 'tchCheckTable',
	data () {
		return {
			
		}
	},
	components: {
		topTitle, topBar, timetable
	},
	methods: {
		
	}
}
</script>

<style scoped>

/*.tableSelect {
	margin: 0.6rem 5rem;
}
.tableSelect select {
	margin-right: 1.4rem;
	border-radius: 1rem;
	width: 10rem;
	font-size: 0.8rem;
	outline: none;
}*/
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>