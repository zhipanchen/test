<template>
<div>
	<div class="positionBar">
		<span>您的当前位置：</span>
		<span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
		<!-- <span> > <a href="#/login/main/eduAdminHome?teacher" class="returnHome">教学管理</a></span> -->
		<span> > 教师签到</span>
	</div>
	<div class="blank">
        <div class="lpart">
            <span class="textWeight">我的上课列表</span>
        	<span class="textBlue">（注：请在上课后五天内填写）</span>
        </div>
    </div>

	<div id="myClassList">
		<div class="myCourseList">
			<table class="operationTable">
				<thead>
					<tr>
						<th width="15%">课程名称</th>
						<th width="13%">授课班级</th>
						<th width="10%">计划课时</th>
						<th width="10%">已上课时</th>
						<th width="12%">签到</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(data, index) in teachJournalList">
						<td :value="data.courseId">{{data.courseName}}</td>
						<td>{{data.className}}</td>
						<td>{{data.courseHours}}</td>
						<td>{{data.takedHours}}</td>
						<td class="textBtn" :value="data.courseAssociationId">
							<!-- 跳转到教师签到页面 -->
							<a :href="'#/teacher/teach/tchSignin?courseAssociationId='+data.courseAssociationId+'&'+'courseName='+encodeURIComponent(data.courseName)+'&'+'className='+encodeURIComponent(data.className)">签到</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'myClassList',
	data () {
		return {
			// coursewareSubmitResult: '',		// 判断课件是否已提交
			// teachPlanSubmitResult: '',		// 判断教学计划是否已提交
			// semester: '',
			modal: false,
			modalSubmit: false,
			modalResult: false,
			modalBool: '',
			submitBool: '',
			remindResult: '',
			uploadResult: '',
			teachJournalList: [
				// {courseId: 'GGBX0001', className: '一班', courseName: '基础护理技术', courseHours: '76', takedHours: '12'},
				// {courseId: 'GGBX0001', className: '一班', courseName: '基础护理技术', courseHours: '76', takedHours: '12'}
			],
			// 下载课件列表
			// uploadList: [{coursewareName:'123',coursewareId:'aaaa'},{coursewareName:'123',coursewareId:'aaaa'}],
			courseIdPost: '',
			uploadState: '',		// 上传状态
			fileName: '',
			// optHide1: true,		// 初始化时操作隐藏
			optHide2: true,		// 初始化时操作隐藏
			index: ''
		}
	},
	// 初始化获取已签到课程列表
	beforeMount: function() {
        this.$http.post('./getTeacherTeachJournal',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.teachJournalList = data.teachJournalList;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
	methods: {

	}
}
</script>

<style scoped>
.lpart span {
	margin-right: 1rem;
}
.lpart {
  margin: 0 5rem;
  float: left;
}
.textWeight {
  font-weight: bold;
  font-size: 1.1rem;
}

#myClassList {
	width: 100%;
	background-color: #f3f3f3;
	position: relative;
	display: inline-block;
	overflow: auto;
}
.myCourseList {
	text-align: center;
	background-color: white;
	margin: 1.5rem 5rem;
}
.textBtn span {
	margin: 0 0.3rem;
	display: inline-block;
}
</style>