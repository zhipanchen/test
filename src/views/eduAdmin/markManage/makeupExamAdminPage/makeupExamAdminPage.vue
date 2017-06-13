<template>
	<div id="makeupExamAdmin">
		<top-title></top-title>
    	<top-bar></top-bar>
      
      <makeup-list></makeup-list>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar from '../../../../components/eduAdmin/markManage/makeupExamAdminPage/topBar/topBar'
import makeupList from '../../../../components/eduAdmin/markManage/makeupExamAdminPage/makeupList/makeupList'

export default {
	name: 'makeupExamAdmin',
  components: {
      topTitle, topBar, makeupList
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
/*.blank {
  height: 2.9rem;
}*/
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
