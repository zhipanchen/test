<template>
	<div id="normalSchedule">
		<top-title></top-title>
    	<top-bar></top-bar>
      <!-- <div class="my-label">
          <span class="textWeight">【基础护理技术·对口高职2015护理1班】</span>
          <span class="textBlue">（注：请在上课后五天内填写）</span>
      </div> -->
      <schedule-list></schedule-list>
  </div>
</template>

<script>
import topTitle from '../../../components/public/topTitle/topTitle'
import topBar from '../../../components/teacher/normalSchedulePage/topBar/topBar'
import scheduleList from '../../../components/teacher/normalSchedulePage/scheduleList/scheduleList'

export default {
	name: 'normalSchedule',
	components: {
    	topTitle, topBar, scheduleList
  	}
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
