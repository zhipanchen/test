<template>
    <div id="checkCourseDiv">
        <div id="operationDiv">
            <div id="selectDiv">
                <select id="termSelect" v-model="termSelect">
                    <option disabled>请选择学期</option>
                    <option v-for="term in terms" :value="term.value">{{ term.name }}</option>
                </select>
                <select id="weekSelect" v-model="weekSelect">
                    <option disabled>请选择周数</option>
                    <option v-for="week in weeks" :value="week.value">{{ week.name }}</option>
                </select>
                <button id="queryButton" @click="queryCourseClick()"  class="am-btn am-btn-success am-radius">查找</button>
            </div>
        </div>
        <div class="positionBar">
            <span>您的当前位置：</span>
            <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
            <span> > <a href="#/login/main/eduAdminHome?course" class="returnHome">智能排课</a> > 排课信息 > 查看当前课表</span>
        </div>
        <div id="mainDiv">
            <p id="tableTipP">
                支持分别以学期和周数为条件，对全校的课程表进行查询；支持调换选定的两门课程。
                <form action="./acdeminSeeCurriculumExcel" method="get">
                    <input type="text" v-model="termExport" name="yearSemester" style="display: none">
                    <input type="text" v-model="weekExport" name="week" style="display:none;">
                    <div class="am-btn am-btn-success am-radius" style="position: absolute;right: 7rem;z-index: 10" @click="exportClick()">导出</div>
                    <button id="exportButton" style="display: none" type="submit"></button>
                </form>
            </p>
            <p id="tableInfoP">当前课表：{{ term }} {{ week }} </p>
            <tableDiv :queryCourse="queryCourse"></tableDiv><!--表格组件-->
        </div>
        <Modal
            v-model="modal"
            width="400"
            :mask-closable="false"
            id="modalBody"
            :styles="{top:'10rem'}">
            <div style="font-size: 1.1rem;text-align: center;">
                <p>{{ errorMessage }}</p>
            </div>
            <div slot="footer" style="text-align: center">
                <button id="modalBtn" @click="modal = false">确定</button>
            </div>
        </Modal>
    </div>
</template>
<!--待完善查询课表的数据交互，需要确认后端的查询方式；待完善下拉搜索功能，需要确认后端提供数据库搜索支持还是前端通过js搜索处理-->
<script>
    import tableDiv from '../tableDiv/tableDiv.vue'
    export default {
        name: 'checkCourseDiv',
        data () {
            return {
                term: '',//显示搜索后的课表信息标题
                week: '',
                termSelect: '请选择学期',
                weekSelect: '请选择周数',
//                选择值绑定
                queryCourse: [],
                termExport: "",
                weekExport: "",
//                查找结果课表
                weeks:[
                    { "name":"第一周", "value":"1" },
                    { "name":"第二周", "value":"2" },
                    { "name":"第三周", "value":"3" },
                    { "name":"第四周", "value":"4" },
                    { "name":"第五周", "value":"5" },
                    { "name":"第六周", "value":"6" },
                    { "name":"第七周", "value":"7" },
                    { "name":"第八周", "value":"8" },
                    { "name":"第九周", "value":"9" },
//                    { "name":"第十周", "value":"10" },
                    { "name":"第十一周", "value":"11" },
                    { "name":"第十二周", "value":"12" },
                    { "name":"第十三周", "value":"13" },
                    { "name":"第十四周", "value":"14" },
                    { "name":"第十五周", "value":"15" },
                    { "name":"第十六周", "value":"16" },
                    { "name":"第十七周", "value":"17" },
                    { "name":"第十八周", "value":"18" },
                    { "name":"第十九周", "value":"19" }
//                    { "name":"第二十周", "value":"20" }
                ],
//                周数选择
                terms:[
                    /*{ "name":"2015-2016 第1学期", "value":"2015-2016.1" },
                    { "name":"2015-2016 第2学期", "value":"2015-2016.2" },
                    { "name":"2016-2017 第1学期", "value":"2016-2017.1" },
                    { "name":"2016-2017 第2学期", "value":"2016-2017.2" },
                    { "name":"2017-2018 第1学期", "value":"2017-2018.1" },
                    { "name":"2017-2018 第2学期", "value":"2017-2018.2" }*/
                ],
//                学期选择
                modal: false,
//                对话框显隐
                errorMessage: "",
//                对话框内容
            }
        },
        components: {
            tableDiv
        },
        beforeMount: function() {
            this.$http.post('./acdeminSeeCurriculum',{
//            this.$http.post('../testPhp/checkCourse.php',{
                "yearSemester": "",
                "week": ""
            },{
                "Content-Type":"application/json"
            }).then(function(response){
                console.log("获取课表:");
                console.log(response.body);
                this.queryCourse = response.body.acdeminCurriculum;
                this.terms = [];
                for (var i = 0; i < response.body.yearSemester.length; i++) {
                    this.terms.push({"name":response.body.yearSemester[i].split(".")[0] + " 第" + response.body.yearSemester[i].split(".")[1] + "学期", "value":response.body.yearSemester[i]});
                }
            },function(error){
                this.$Message.error('连接失败，请重试！');
            });
        },
//    页面dom加载前获取后端数据
        methods: {
            exportClick: function(){
                if(this.termSelect == "请选择学期"){
                    this.termExport = "";
                }else{
                    this.termExport = this.termSelect;
                }
                if(this.weekSelect == "请选择周数"){
                    this.weekExport = "";
                }else{
                    this.weekExport = this.weekSelect;
                }
                document.getElementById("exportButton").click();
            },
            queryCourseClick: function(){
//                查找课表
                if(this.termSelect == "请选择学期" || this.weekSelect == "请选择周数"){
                    this.errorMessage = "学期和周数都是必选的，请确认重试！";
                    this.modal = true;
                }else {
                    this.$http.post('./acdeminSeeCurriculum', {
//                this.$http.post('../testPhp/checkCourseQuery.php',{
                        "yearSemester": this.termSelect,
                        "week": this.weekSelect
                    }, {
                        "Content-Type": "application/json"
                    }).then(function (response) {
                        console.log("查找课表:");
                        console.log(response.body);
                        this.queryCourse = response.body.acdeminCurriculum;
                        this.term = this.termSelect.split(".")[0] + "年第" + this.termSelect.split(".")[1] + "学期";
                        this.week = "第" + this.weekSelect + "周";
                    }, function (error) {
                        this.$Message.error('连接失败，请重试！');
                    });
                }
            }
        }
    }
</script>

<style scoped>
    #checkCourseDiv{
        background-color: #f3f3f3;
    }
    #mainDiv{
        /*页面*/
        background-color: white;
        margin: 0 5rem;
        min-height: 33rem;
    }
    select{
        margin-right: 1.4rem;
    }
    #operationDiv{
        /*查找区域*/
        background-color: white;
        margin: 0 0 0.6rem;
    }
    #selectDiv{
        /*选择框区域*/
        padding: 0.6rem 5rem;
    }
    #tableTipP{
        /*功能页面标题*/
        color: #C1C1C1;
        position: relative;
        text-align: left;
        z-index: 2;
        padding: 1rem;
        margin: 0;
    }
    #tableInfoP{
        /*表格课表标题*/
        text-align: left;
        position: relative;
        margin-top: 0;
        left: 1rem;
    }
    @media screen and (max-width:1025px) {
        html {
            font-size: 56%;
        }
    }
</style>
