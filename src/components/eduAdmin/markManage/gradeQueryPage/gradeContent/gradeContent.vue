<template>
<div>
	<div class="positionBar">
		<span>您的当前位置：</span>
		<span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
		<!-- <span> > <a href="#/login/main/eduAdminHome?eduAdmin" class="returnHome">成绩管理</a></span> -->
		<span> > <a href="#/login/main/eduAdminHome?gradeManage" class="returnHome">成绩</a></span>
		<span> > 成绩查询</span>
	</div>
	<div class="tableSelect addTableSelect">
		<!-- 填选信息进行查询学生成绩 -->
		<select v-model="selGradeType" @change="gradeChange()">
			<option disabled value="">选择年制</option>
			<option v-for="gradeTypeOne in gradeType" :value="gradeTypeOne.value">{{gradeTypeOne.text}}</option>
		</select>
		<select v-model="selYearTerm">
			<option disabled value="">选择学期</option>
			<option v-for="yearTermOne in yearTerm" :value="yearTermOne.startYearSemester">{{yearTermOne.startYearSemester}}</option>
		</select>
		<select v-model="selCourseName">
			<option disabled value="">选择课程</option>
			<option v-for="courseNameOne in courseInfo" :value="courseNameOne.courseId">{{courseNameOne.courseName}}</option>
		</select>
		<select v-model="selClassId">
			<option disabled value="">选择班级</option>
			<option v-for="classIdOne in classInfo" :value="classIdOne.classId">{{classIdOne.className}}</option>
		</select>
		<span class="inputNumber">
			<input v-model="studentId" placeholder="输入学号">
		</span>
		<button class="am-btn am-btn-success am-radius" @click="inquireBtn()">查询</button>
		<span>
		<button class="am-btn am-btn-success am-radius" @click="exportBtn()">导出</button>
		<!-- <form action="./exportScoreList" method="get"><button :value="this.scoreListByStuNo" name="scoreListByStuNo" type="submit" class="am-btn am-btn-success am-radius">导出</button></form> -->
		</span>
	</div>

	<!-- 成绩单列表 -->
	<div id="gradeContent">
		<div class="gradeContentBody">
			<table class="normalTable">
				<thead>
					<tr>
						<th>学号</th>
						<th>姓名</th>
						<th>年级</th>
						<th>专业</th>
						<th>学期</th>
						<th>课程</th>
						<th>分数</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="data in scoreListByStuNo">
						<td v-text="data.studentId"></td>
						<td v-text="data.studentName"></td>
						<td v-text="data.term"></td>
						<td v-text="data.specialityName"></td>
						<td v-text="data.stuSemester"></td>
						<td v-text="data.courseName"></td>
						<td v-text="data.grade"></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<!-- 错误弹窗提示 -->
	<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
		<div style="text-align:center; font-size:1.1rem;">
		    <p v-if="resultBool === '1'">未找到所查询内容！</p>
		    <p v-else-if="resultBool === '2'">未找到可下载的内容！</p>
		    <p v-else-if="resultBool === '3'">请选择年制！</p>
		    <p v-else-if="resultBool === '4'">请选择后进行查询！</p>
		</div>
	    <div slot="footer" style="text-align:center;">
	        <Button id="modalBtn" @click="resultOk()">确认</Button>
	    </div>
	</Modal>
</div>
</template>

<script>
export default {
	name: 'gradeContent',
	data () {
		return {
			// 全局变量定义
			selGradeType: '',
			selYearTerm: '',
			selCourseName: '',
			selClassId: '',
			gradeType: [
				{text: '三年制', value: '3'},
				{text: '五年制', value: '5'}
			],
			yearTerm: [
				// "2016-2017学年第一学期"
			],
			courseInfo: [
				// {courseName: '护理学', courseId: '123456'}
			],
			classInfo: [
				// {className: '一班', classId: '1256'}
			],
			studentId: '',
			// 返回学生成绩列表
			scoreListByStuNo: [
				// {stuNum: '20142201010', stuName: '何平', stuGrade: '大二', stuMajor: '护理学', stuSemester: '2016-2017第一学期', stuCourse: '护理学', stuScore: '80'}
				// {},{},{}
			],
			modalResult: false,
			resultBool: ''
		}
	},
	// 页面初始化，获取学期、课程下拉数据
	beforeMount: function() {
        this.$http.post('./getYearTermList',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.yearTerm = data.yearTerm;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
        this.$http.post('./courseManage/getCourseAndClassInfo',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.courseInfo = data.courseInfo;
            // this.classInfo = data.classInfo;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
    methods: {
    	// 选择年制后，班级列表对应更改
    	gradeChange: function () {
    		// alert("1")
    		this.$http.post('./courseManage/getCourseAndClassInfo',{},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body.classInfo;
	            // this.classInfo = [];
	            if(this.selGradeType==3){
	            	this.classInfo=(data.three);  
	            }else if(this.selGradeType==5){
	            	this.classInfo=(data.five);
	            }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
	        });
    	},
    	// 查询按钮
    	inquireBtn: function() {
    		if (this.selGradeType == "") {
    			// this.selGradeType = '0';
    			this.modalResult = true;
    			this.resultBool = '3';
    		}else if (this.selYearTerm == "" || this.selCourseName == "" || this.selClassId == "") {
    			this.modalResult = true;
    			this.resultBool = '4';
    		}else {
	    		this.$http.post('./findScoreByStuNo',{
		        	"gradeType": this.selGradeType,
		        	"yearTerm": this.selYearTerm,
		        	"courseId": this.selCourseName,
		        	"classId": this.selClassId,
		        	"studentId": this.studentId
		        },{    
		            "Content-Type":"application/json"
		        }).then(function(response){
		            console.log("获取申请:");
		            console.log(response.body);
		            var data = response.body;
		            if (data.scoreListByStuNo.length != 0) {
		            	this.scoreListByStuNo = data.scoreListByStuNo;
		            }else {
		            	this.$Message.warning("未找到所查询内容！");
				        // this.modalResult = true;
				        // this.resultBool = '1';
				    }
		        },function(error){
		            console.log("获取申请error:");
		            console.log(error);
	        	});
    		}
    		
    	},
    	// 导出按钮
    	exportBtn: function() {
    		if (this.selGradeType == "") {
    			this.modalResult = true;
    			this.resultBool = '3';
    		}else if (this.selYearTerm == "" || this.selCourseName == "" || this.selClassId == "") {
    			this.modalResult = true;
    			this.resultBool = '4';
    		}else {
    			location.href = "./exportScoreListByStu?gradeType="+this.selGradeType+"&"+"yearTerm="+this.selYearTerm+"&"+"courseId="+this.selCourseName+"&"+"classId="+this.selClassId+"&"+"studentId="+this.studentId;
    		}
    	},
    	// 弹窗提示点击确定，弹窗消失
    	resultOk: function () {
    		this.modalResult = false;
    	}
    }
}
</script>

<style scoped>
#gradeContent {
	background-color: #f3f3f3;
	width: 100%;
	text-align: center;
}
.gradeContentBody {
	padding: 1rem 5rem;
}
.inputNumber {
  /*margin-right: 1.4rem;*/
}
/*.gradeContentBody table {
	margin-bottom: 1.6rem;
}*/
.addTableSelect span {
	display: inline-block;
}

</style>
