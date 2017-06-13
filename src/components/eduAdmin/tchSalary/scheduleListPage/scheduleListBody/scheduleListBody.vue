<template>
<div>
	<div class="positionBar">
		<span>您的当前位置：</span>
		<span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
		<!-- <span> > <a href="#/login/main/eduAdminHome?eduAdmin" class="returnHome">课酬模块</a></span> -->
		<span> > 上课列表</span>
	</div>
	<div class="tableSelect">
      	<select v-model="selTeacher">
			<option disabled value="">选择教师</option>
			<option v-for="teacherListOne in teacherInfo" :value="teacherListOne.teacherId">{{teacherListOne.teacherName}}</option>
		</select>
      	<button class="am-btn am-btn-success am-radius" @click="searchBtn()">查询</button>
    </div>

	<div id="scheduleListBody">
		<div class="scheduleContent">
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
							<!-- 跳转到教务查看签到页面 -->
							<a :href="'#/eduAdmin/emolument/seeSigninList?courseAssociationId='+data.courseAssociationId+'&'+'courseName='+encodeURIComponent(data.courseName)+'&'+'className='+encodeURIComponent(data.className)">签到</a>
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
	data () {
		return {
			selTeacher: '',
			teacherInfo: [],
			teachJournalList: [
				// {courseId: 'GGBX0001', courseName: '基础护理技术', courseHours: '76', takedHours: '12'},
				// {courseId: 'GGBX0001', courseName: '基础护理技术', courseHours: '76', takedHours: '12'}
			],
			modalResult: false
		}
	},
	beforeMount: function() {
        // 获取下拉框教师列表
        this.$http.post('./teacherManage/getAllTeacherNameAndId',{},{
        // this.$http.post('./courseManage/getCourseAndClassInfo',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.teacherInfo = data;
            // this.teacherInfo = data.teacherNameAndIdList;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
	methods: {
		// 查询按钮
		searchBtn: function () {
			this.$http.post('./getTeacherTeachJournalByEdu',{
				"teacherId": this.selTeacher
			},{
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
	}
}
</script>

<style scoped>
#scheduleListBody {
	width: 100%;
	background-color: #f3f3f3;
	position: relative;
	display: inline-block;
	overflow: auto;
}
.scheduleContent {
	text-align: center;
	background-color: white;
	margin: 1rem 5rem;
}

</style>