<template>
	<div id="noticeSetting">
		<top-title></top-title>
    <top-bar></top-bar>
    <notice-table></notice-table>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar from '../../../../components/eduAdmin/notice/noticeSettingPage/topBar/topBar'
import noticeTable from '../../../../components/eduAdmin/notice/noticeSettingPage/table/table'

export default {
	name: 'noticeSetting',
	components: {
    	topTitle, topBar, noticeTable
  }
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
