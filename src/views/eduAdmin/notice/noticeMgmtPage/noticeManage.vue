<template>
	<div id="noticeMgmt">
		<top-title></top-title>
    <top-bar></top-bar>
    <notice-mgmt-table></notice-mgmt-table>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar from '../../../../components/eduAdmin/notice/noticeMgmtPage/topBar/topBar'
import noticeMgmtTable from '../../../../components/eduAdmin/notice/noticeMgmtPage/noticeMgmtTable/noticeMgmtTable'

export default {
	name: 'noticeMgmt',
	components: {
    	topTitle, topBar, noticeMgmtTable
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
