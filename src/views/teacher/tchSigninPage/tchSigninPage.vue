<template>
	<div id="normalSchedule">
		<top-title></top-title>
    	<top-bar></top-bar>
      <!-- <div class="my-label">
          <span class="textWeight">【基础护理技术·对口高职2015护理1班】</span>
          <span class="textBlue">（注：请在上课后五天内填写）</span>
      </div> -->
      <tch-signin></tch-signin>
  </div>
</template>

<script>
import topTitle from '../../../components/public/topTitle/topTitle'
import topBar from '../../../components/teacher/tchSigninPage/topBar/topBar'
import tchSignin from '../../../components/teacher/tchSigninPage/table/table'

export default {
	name: 'normalSchedule',
	components: {
    	topTitle, topBar, tchSignin
  	}
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
