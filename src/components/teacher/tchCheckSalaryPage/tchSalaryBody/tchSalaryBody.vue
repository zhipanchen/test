<template>
<div>
	<div class="positionBar">
		<span>您的当前位置：</span>
		<span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
		<!-- <span> > <a href="#/login/main/eduAdminHome?teacher" class="returnHome">课程信息维护</a></span> -->
		<span> > 查看课酬</span>
	</div>
	<div class="tableSelect">
		<!-- <select v-model="selYearTerm">
			<option disabled>选择学期</option>
			<option v-for="yearTermOne in yearTerm" :value="yearTermOne">{{yearTermOne}}</option>
		</select>
      	<button class="am-btn am-btn-success am-radius" @click="searchBtn()">查询</button> -->
      	<div class="rpart">
			<button class="am-btn am-btn-success am-radius rightBtn" @click="exportBtn()">导出</button>
		</div>
	</div>

	<div id="salaryBody">
		<div class="salaryContent">
			<table class="normalTable">
				<thead>
					<tr>
						<th width="">职称</th>
						<th width="">课程编号</th>
						<th width="">所授课程</th>
						<th width="">授课班级</th>
						<th width="">计划课时</th>
						<th width="">课酬/课时</th>
						<th width="">总课酬(已签到)</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="data in teacherPayrollList">
						<td>{{data.workUnit}}  {{data.workDuty}}</td>
						<td v-text="data.courseId"></td>
						<td v-text="data.courseName"></td>
						<td>{{data.className}}</td>
						<td v-text="data.courseHours"></td>
						<td v-text="data.payPerCourse"></td>
						<td v-text="data.wage"></td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- 操作结果弹窗提示 -->
		<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
			<div style="text-align:center; font-size:1.1rem;">
			    <p>表格为空，没有数据导出！</p>
			</div>
		    <div slot="footer" style="text-align:center;">
		        <Button id="modalBtn" @click="resultOk()">确定</Button>
		    </div>
		</Modal>
	</div>
</div>
</template>

<script>
export default {
	name: 'salaryBody',
	data () {
		return {
			// selYearTerm: '选择学期',
			// yearTerm: [],
			teacherPayrollList: [
				// {}
			],
			modalResult: false
		}
	},
	beforeMount: function() {
        this.$http.post('./checkSalaryByTeacherself',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.teacherPayrollList = data.teacherPayrollList;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
	methods: {
	    // 下载按钮
	    exportBtn: function () {
	    	if (this.teacherPayrollList == []) {
	    		// 如果表格为空，弹窗提示，且不能下载
	    		this.modalResult = true;
	    	}else if (this.teacherPayrollList != []) {
	    		location.href = "./downloadteacherSalaryList"
	    	}
	    },
        // 弹窗提示点击确定，弹窗消失
        resultOk () {
        	this.modalResult = false;
        }
	}
}
</script>

<style scoped>
.spanButton {
	width: 100%;
	height: 3.5rem;
    line-height: 3.5rem;
	position: relative;
	display: inline-block;
	overflow: hidden;
}
.spanButton button {
	width: 5.6rem;
    margin: 0 0.7rem;
    outline: none;
}
.rpart {
  margin: .8rem 0rem;
  margin-top: 0;
  float: right;
}

#salaryBody {
	width: 100%;
	background-color: #f3f3f3;
	position: relative;
	display: inline-block;
	overflow: auto;
}
.salaryContent {
	text-align: center;
	background-color: white;
	margin: 1rem 5rem;
}
#salary input {
  /*margin: 0.6rem 0;*/
  margin-right: 1.4rem;
}
.buttonPart {
  float: right;
}

</style>