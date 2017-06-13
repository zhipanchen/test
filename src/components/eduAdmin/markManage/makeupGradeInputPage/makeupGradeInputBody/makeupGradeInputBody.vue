<template>
<div>
	<div class="positionBar">
		<span>您的当前位置：</span>
		<span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
		<!-- <span> > <a href="#/login/main/eduAdminHome?eduAdmin" class="returnHome">成绩管理</a></span> -->
		<span> > <a href="#/login/main/eduAdminHome?gradeManage" class="returnHome">补考</a></span>
		<span> > 补考成绩录入</span>
	</div>
	<div class="tableSelect">
		<!-- 填选信息进行查询学生补考成绩输入 -->
		<select v-model="selGradeType">
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
		<button class="am-btn am-btn-success am-radius" v-on:click="findBtn()">查询</button>
		<button class="am-btn am-btn-success am-radius rightBtn" v-show="submitShow" @click="submitBtn()">提交</button>
		<button class="am-btn am-btn-success am-radius rightBtn" v-show="buttonShow" @click="saveAllBtn()">保存</button>
		<button class="am-btn am-btn-success am-radius rightBtn" v-show="buttonShow" @click="compileBtn()">编辑</button>
	</div>

	<div id="makeupGradeInputBody">
		<!-- 补考成绩输入 -->
		<div class="makeupScoreTable">
			<table class="normalTable" id="inputGroup">
				<thead>
					<tr>
						<th width="34%">学号</th>
						<th width="33%">姓名</th>
						<th width="33%">补考成绩</th>
					</tr>
				</thead>
				<tbody>
					<tr  v-for="(makeupScore, index) in makeUpGradeInputList" :key="makeupScore">
						<td v-text="makeupScore.studentId"></td>
						<td v-text="makeupScore.studentName"></td>
						<td>
							<input id="input1" type="text" :value="makeupScore.makeupGrade" readonly="true" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<!-- 操作二次确认弹窗 -->
	<Modal v-model="modalOperation" id="modalBody" :styles="{top:'10rem'}">
		<div style="text-align:center; font-size:1.1rem;">
			<p v-if="opertaionBool === '1'">您确定要保存所修改内容吗？</p>
			<p v-else-if="opertaionBool === '2'">您确定要提交成绩单吗？</p>
			<p v-else-if="opertaionBool === '2'" style="color:red;">（提交后成绩将不可修改）</p>
		</div>
		<div slot="footer" style="text-align:center;">
			<Button v-if="opertaionBool === '1'" id="modalBtn" @click="saveOk()">确定</Button>	<!-- 保存确定 -->
			<Button v-else-if="opertaionBool === '2'" id="modalBtn" @click="submitOk()">确定</Button>	<!-- 提交确定 -->
			<Button id="modalBtn" @click="cancel()">取消</Button>
		</div>
	</Modal>

	<!-- 操作结果弹窗提示 -->
	<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
		<div style="text-align:center; font-size:1.1rem;">
		    <p v-if="remindResult === '1'">操作失败！请重试</p>
		    <p v-else-if= "remindResult === '2'">保存成功！</p>
		    <p v-else-if= "remindResult === '3'">提交成功！成绩将不可再修改。</p>
		    <p v-else-if= "remindResult === '4'">保存失败！</p>
		    <p v-else-if= "remindResult === '5'">提交失败！</p>
		    <p v-else-if= "remindResult === '6'">该课程没有可编辑的成绩！</p>
		    <p v-else-if= "remindResult === '7'">请输入所有成绩！</p>
    		<p v-else-if="remindResult === '8'">请选择年制！</p>
    		<p v-else-if="remindResult === '9'">请选择后进行查询！</p>
		    <p v-else-if= "remindResult === '10'">请正确输入成绩分值（0-100）！</p>
		</div>
	    <div slot="footer" style="text-align:center;">
	        <Button id="modalBtn" @click="resultOk()">确认</Button>
	    </div>
	</Modal>
</div>
</template>

<script>
export default {
	data () {
		return {
			buttonShow: false,
			submitShow: false,	// 初始化，编辑、保存、提交按钮不显示
			selGradeType: '',
			selYearTerm: '',
			selCourseName: '',
			gradeType: [		// 选择年制
				{text: '三年制', value: '3'},
				{text: '五年制', value: '5'}
			],
			yearTerm: [],		// 选择学期
			courseInfo: [],		// 选择课程
			makeUpGradeInputList: [
				// {studentId: '010203', studentName: '何平', makeupGrade: '75'},
				// {studentId: '010203', studentName: '何平', makeupGrade: '75'}
			],
			modalOperation: false,
			modalResult: false,
			opertaionBool: '',
			remindResult: ''
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
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
    methods: {
    	// 查询按钮************************************************************************
    	findBtn: function () {
    		if (this.selGradeType == "") {
    			// this.selGradeType = '0';
    			this.modalResult = true;
    			this.remindResult = '8';
    		}else if (this.selYearTerm == "" || this.selCourseName == "") {
    			this.modalResult = true;
    			this.remindResult = '9';
    		}else {
	    		this.$http.post('./getMakeUpGradeInputList',{
					"gradeType": this.selGradeType,
					"yearTerm": this.selYearTerm,
					"courseId": this.selCourseName,
				},{
		            "Content-Type":"application/json"
		        }).then(function(response){
		            console.log("获取申请:");
		            console.log(response.body);
		            var data = response.body;
		            // if(data.result == "1") {
	                    this.makeUpGradeInputList = data.makeUpGradeInputList;
	                    // 如果返回数据不为空，即可进行编辑修改学生补考成绩
	                    if (this.makeUpGradeInputList.length != 0) {
	                    	this.buttonShow = true;
	                    	this.submitShow = true;
	                    }else {
	                    	this.modalResult = true;
	                    	this.remindResult = '6';
	                    }
	                // }else {
	                //     // this.$Message.error('操作失败！请重试');
	                //     this.modalResult = true;
	                //     this.remindResult = '1';
	                // }
		        },function(error){
		            console.log("获取申请error:");
		            console.log(error);
		        });
    		}
    		
    	},
    	// 编辑修改补考成绩*****************************************************************
    	compileBtn: function () {
    		var inputGroup = document.getElementById("inputGroup");
    		var input = inputGroup.getElementsByTagName("input");
    		for (var i = 0; i < this.makeUpGradeInputList.length; i++) {
    			input[i].readOnly = false;
    			input[i].style.border = "0.1rem solid #d4d4d9";
    		}
    	},
    	// 点击保存**************************************************************************
    	saveAllBtn: function () {
    		var inputGroup = document.getElementById("inputGroup");
    		var input = inputGroup.getElementsByTagName("input");
    		var emptyNum = '0';
    		var wrongNum = '0';
    		// 判断是否有未输入空值
    		for (var i = 0; i < this.makeUpGradeInputList.length; i++) {
    			this.makeUpGradeInputList[i].makeupGrade = input[i].value;
    			if (input[i].value == "") {
    				emptyNum++;
    			}else if (input[i].value>100) {
					wrongNum++;
				}
    		}
    		// 输入非空判断
    		if (emptyNum == '0' && wrongNum == '0') {
    			this.modalOperation = true;
    			this.opertaionBool = '1';
    		}else if (wrongNum != '0') {
    			this.modalResult = true;
                this.remindResult = '10';
    		}else {
    			this.modalResult = true;
    			this.remindResult = '7';
    		}
    	},
    	// 确认保存修改成绩
    	saveOk: function () {
    		this.modalOperation = false;
    		var inputGroup = document.getElementById("inputGroup");
    		var input = inputGroup.getElementsByTagName("input");
    		for (var i = 0; i < this.makeUpGradeInputList.length; i++) {
    			input[i].readOnly = true;
    			input[i].style.border = "none";
    		}
    		this.$http.post('./saveMakeUpScore',{
    			"operateType": "1",
    			"gradeType": this.selGradeType,
				"yearTerm": this.selYearTerm,
				"courseId": this.selCourseName,
				"makeUpGradeInputList": this.makeUpGradeInputList
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if(data.result == "1") {
                    this.$Message.success('保存成功！');
                    // this.remindResult = '2';
                }else {
                    // this.$Message.error('操作失败！请重试');
	            	this.modalResult = true;
                    this.remindResult = '4';
                }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
	        });
    	},
    	// 点击提交***********************************************************
    	submitBtn: function () {
    		this.modalOperation = true;
    		this.opertaionBool = '2';
    	},
    	// 确认补考成绩，提交后不可再修改
    	submitOk: function () {
    		this.modalOperation = false;
    		this.$http.post('./saveMakeUpScore',{
    			"operateType": "2",
    			"gradeType": this.selGradeType,
				"yearTerm": this.selYearTerm,
				"courseId": this.selCourseName,
				"makeUpGradeInputList": this.makeUpGradeInputList
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if(data.result == "1") {
                    this.$Message.success('提交成功！成绩将不可再修改。');
                    // this.remindResult = '3';
                    this.buttonShow = false;
                }else {
                    // this.$Message.error('操作失败！请重试');
                    this.modalResult = true;
                    this.remindResult = '5';
                }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
	        });
    	},
    	// 保存、提交弹窗取消
    	cancel: function () {
    		this.modalOperation = false;
    	},
    	// 信息提示确认并取消弹窗
    	resultOk: function () {
    		this.modalResult = false;
    	}
    }
}
</script>

<style scoped>
#makeupGradeInputBody {
	width: 100%;
	background-color: #f3f3f3;
	position: relative;
	display: inline-block;
	overflow: auto;
}
.makeupScoreTable {
	text-align: center;
	background-color: white;
	margin: 1rem 5rem;
}
.makeupScoreTable input {
	outline:none;
    border: none;
    margin: 0;
    text-align: center;
}

.rightBtn {
	float: right;
}
</style>