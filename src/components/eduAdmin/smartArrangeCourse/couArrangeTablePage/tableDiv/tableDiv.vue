<template>
    <div id="couArrangeTable_tableDiv">
        <!--<button id="exchangeButton" @click="modal1 = true" class="am-btn am-btn-success am-radius">确认调课</button>-->
        <table id="checkCourseTable">
            <tr class="headTr">
                <td id="headTdTime">时间</td>
                <td class="weekTd" colspan="3">星期一</td>
                <td class="weekTd" colspan="3">星期二</td>
                <td class="weekTd" colspan="3">星期三</td>
                <td class="weekTd" colspan="3">星期四</td>
                <td class="weekTd" colspan="3">星期五</td>
                <td rowspan="3">教室安排</td>
                <td rowspan="3">班主任</td>
            </tr>
            <tr class="headTr">
                <td id="headTdCourse">科目</td>
                <td class="" colspan="2">上午</td>
                <td class="">下午</td>
                <td class="" colspan="2">上午</td>
                <td class="">下午</td>
                <td class="" colspan="2">上午</td>
                <td class="">下午</td>
                <td class="" colspan="2">上午</td>
                <td class="">下午</td>
                <td class="" colspan="2">上午</td>
                <td class="">下午</td>
            </tr>
            <tr class="headTr">
                <td id="headTdClass">班级</td>
                <td>1-2</td>
                <td>3-4</td>
                <td>5-6</td>
                <td>1-2</td>
                <td>3-4</td>
                <td>5-6</td>
                <td>1-2</td>
                <td>3-4</td>
                <td>5-6</td>
                <td>1-2</td>
                <td>3-4</td>
                <td>5-6</td>
                <td>1-2</td>
                <td>3-4</td>
                <td>5-6</td>
            </tr>
            <tr  v-for="(item,index) in items" id="courseTr">
                <td class="sectionTd" v-html="item.className"></td>
                <td :id="'first'+index" @click="courseClick('first',index)" v-html="item.firstCourse"></td>
                <td :id="'second'+index" @click="courseClick('second',index)" v-html="item.secondCourse"></td>
                <td :id="'third'+index" @click="courseClick('third',index)" v-html="item.thirdCourse"></td>
                <!--<td :id="index" @click="courseClick('third',index)"></td>-->
                <td :id="'fourth'+index" @click="courseClick('fourth',index)" v-html="item.fourthCourse"></td>
                <td :id="'fifth'+index" @click="courseClick('fifth',index)" v-html="item.fifthCourse"></td>
                <td :id="'sixth'+index" @click="courseClick('sixth',index)" v-html="item.sixthCourse"></td>
                <!--<td :id="index" @click="courseClick('third',index)"></td>-->
                <td :id="'seventh'+index" @click="courseClick('seventh',index)" v-html="item.seventhCourse"></td>
                <td :id="'eighth'+index" @click="courseClick('eighth',index)" v-html="item.eighthCourse"></td>
                <td :id="'ninth'+index" @click="courseClick('ninth',index)" v-html="item.ninthCourse"></td>
                <!--<td :id="index" @click="courseClick('third',index)"></td>-->
                <td :id="'tenth'+index" @click="courseClick('tenth',index)" v-html="item.tenthCourse"></td>
                <td :id="'eleventh'+index" @click="courseClick('eleventh',index)" v-html="item.eleventhCourse"></td>
                <td :id="'twelfth'+index" @click="courseClick('twelfth',index)" v-html="item.twelfthCourse"></td>
                <!--<td :id="index" @click="courseClick('third',index)"></td>-->
                <td :id="'thirteenth'+index" @click="courseClick('thirteenth',index)" v-html="item.thirteenthCourse"></td>
                <td :id="'fourteenth'+index" @click="courseClick('fourteenth',index)" v-html="item.fourteenthCourse"></td>
                <td :id="'fifteenth'+index" @click="courseClick('fifteenth',index)">班会</td>
                <td :id="'classroomName'+index"  v-html="item.classroomName"></td>
                <td :id="'classHeadmaster'+index" v-html="item.classHeadmaster"></td>
            </tr>
        </table>
        <!--<p id="courseDetailP">尚未排课的课程（请确保排课课程数量设置不超出限制）：</p>-->
        <!--<table id="courseDetailTable" class="normalTable">
            <thead>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>-->
        <Modal
            v-model="modal1"
            width="400"
            :mask-closable="false"
            id="modalBody"
            :styles="{top:'10rem'}">
            <div style="font-size: 1.1rem;text-align: center;">
                <p>您确定调换该两门课程吗?</p>
            </div>
            <div slot="footer" style="text-align: center">
                <button id="modalBtn" @click="exchangeClick()">确定</button>
                <button id="modalBtn" @click="modal1 = false">取消</button>
            </div>
        </Modal>
        <Modal
            v-model="modal2"
            width="400"
            :mask-closable="false"
            id="modalBody"
            :styles="{top:'10rem'}">
            <div style="font-size: 1.1rem;text-align: center;">
                <p>{{ errorMessage }}</p>
            </div>
            <div slot="footer" style="text-align: center">
                <button id="modalBtn" @click="modal2 = false">确定</button>
            </div>
        </Modal>
    </div>

</template>

<script>
    export default {
        name: 'couArrangeTable_tableDiv',
        data () {
            return {
                checked: 0,
//                纪录选择的课程数量
                modal1: false,
//                对话框显隐
                modal2: false,
                errorMessage: "",
                items:[
                    /*{   "className": '高职2013级1班（45人）', "firstCourse":'语文+教师姓名+（教室）+（时间）',
                        "secondCourse": "数学",
                        "thirdCourse": "英语",
                        "fourthCourse": "英语",
                        "fifthCourse": "英语",
                        "sixthCourse": "英语",
                        "seventhCourse": "英语",
                        "eighthCourse": "英语",
                        "ninthCourse": "英语",
                        "tenthCourse": "英语",
                        "eleventhCourse": "英语",
                        "twelfthCourse": "英语",
                        "thirteenthCourse": "英语",
                        "fourteenthCourse": "英语",
                        "fifteenthCourse": "英语",
                        "classroomName": "C105",
                        "classHeadmaster": "张三"
                    },
                    {   "className": '高职2013级2班（47人）', "firstCourse":'2',
                        "secondCourse": "数学",
                        "thirdCourse": "英语",
                        "fourthCourse": "英语",
                        "fifthCourse": "英语",
                        "sixthCourse": "英语",
                        "seventhCourse": "英语",
                        "eighthCourse": "英语",
                        "ninthCourse": "英语",
                        "tenthCourse": "英语",
                        "eleventhCourse": "英语",
                        "twelfthCourse": "英语",
                        "thirteenthCourse": "英语",
                        "fourteenthCourse": "英语",
                        "fifteenthCourse": "英语",
                        "classroomName": "C105",
                        "classHeadmaster": "张三"},
                    {   "className": '高职2014级1班（57人）', "firstCourse":'3',
                        "secondCourse": "数学",
                        "thirdCourse": "英语",
                        "fourthCourse": "英语",
                        "fifthCourse": "英语",
                        "sixthCourse": "英语",
                        "seventhCourse": "英语",
                        "eighthCourse": "英语",
                        "ninthCourse": "英语",
                        "tenthCourse": "英语",
                        "eleventhCourse": "英语",
                        "twelfthCourse": "英语",
                        "thirteenthCourse": "英语",
                        "fourteenthCourse": "英语",
                        "fifteenthCourse": "英语",
                        "classroomName": "C105",
                        "classHeadmaster": "张三"},
                    {   "className": '高职2014级2班（54人）', "firstCourse":'4',
                        "secondCourse": "数学",
                        "thirdCourse": "英语",
                        "fourthCourse": "英语",
                        "fifthCourse": "英语",
                        "sixthCourse": "英语",
                        "seventhCourse": "英语",
                        "eighthCourse": "英语",
                        "ninthCourse": "英语",
                        "tenthCourse": "英语",
                        "eleventhCourse": "英语",
                        "twelfthCourse": "英语",
                        "thirteenthCourse": "英语",
                        "fourteenthCourse": "英语",
                        "fifteenthCourse": "英语",
                        "classroomName": "C105",
                        "classHeadmaster": "张三"},
                    {   "className": '高职2015级1班（52人）', "firstCourse":'5',
                        "secondCourse": "数学",
                        "thirdCourse": "英语",
                        "fourthCourse": "英语",
                        "fifthCourse": "英语",
                        "sixthCourse": "英语",
                        "seventhCourse": "英语",
                        "eighthCourse": "英语",
                        "ninthCourse": "英语",
                        "tenthCourse": "英语",
                        "eleventhCourse": "英语",
                        "twelfthCourse": "英语",
                        "thirteenthCourse": "英语",
                        "fourteenthCourse": "英语",
                        "fifteenthCourse": "英语",
                        "classroomName": "C105",
                        "classHeadmaster": "张三"},
                    {   "className": '高职2015级2班（53人）', "firstCourse":'6',
                        "secondCourse": "数学",
                        "thirdCourse": "英语",
                        "fourthCourse": "英语",
                        "fifthCourse": "英语",
                        "sixthCourse": "英语",
                        "seventhCourse": "英语",
                        "eighthCourse": "英语",
                        "ninthCourse": "英语",
                        "tenthCourse": "英语",
                        "eleventhCourse": "英语",
                        "twelfthCourse": "英语",
                        "thirteenthCourse": "英语",
                        "fourteenthCourse": "英语",
                        "fifteenthCourse": "英语",
                        "classroomName": "C105",
                        "classHeadmaster": "张三"},
                    {   "className": '高职2016级1班（55人）', "firstCourse":'7',
                        "secondCourse": "数学",
                        "thirdCourse": "英语",
                        "fourthCourse": "英语",
                        "fifthCourse": "英语",
                        "sixthCourse": "英语",
                        "seventhCourse": "英语",
                        "eighthCourse": "英语",
                        "ninthCourse": "英语",
                        "tenthCourse": "英语",
                        "eleventhCourse": "英语",
                        "twelfthCourse": "英语",
                        "thirteenthCourse": "英语",
                        "fourteenthCourse": "英语",
                        "fifteenthCourse": "英语",
                        "classroomName": "C105",
                        "classHeadmaster": "张三"},
                    {   "className": '高职2016级2班（54人）', "firstCourse":'8',
                        "secondCourse": "数学",
                        "thirdCourse": "英语",
                        "fourthCourse": "英语",
                        "fifthCourse": "英语",
                        "sixthCourse": "英语",
                        "seventhCourse": "英语",
                        "eighthCourse": "英语",
                        "ninthCourse": "英语",
                        "tenthCourse": "英语",
                        "eleventhCourse": "英语",
                        "twelfthCourse": "英语",
                        "thirteenthCourse": "英语",
                        "fourteenthCourse": "英语",
                        "fifteenthCourse": "英语",
                        "classroomName": "C105",
                        "classHeadmaster": "张三"},
                    {   "className": '中职2015级1班（55人）', "firstCourse":'9',
                        "secondCourse": "数学",
                        "thirdCourse": "英语",
                        "fourthCourse": "英语",
                        "fifthCourse": "英语",
                        "sixthCourse": "英语",
                        "seventhCourse": "英语",
                        "eighthCourse": "英语",
                        "ninthCourse": "英语",
                        "tenthCourse": "英语",
                        "eleventhCourse": "英语",
                        "twelfthCourse": "英语",
                        "thirteenthCourse": "英语",
                        "fourteenthCourse": "英语",
                        "fifteenthCourse": "英语",
                        "classroomName": "C105",
                        "classHeadmaster": "张三"},
                    {   "className": '中职2015级2班（59人）', "firstCourse":'10',
                        "secondCourse": "数学",
                        "thirdCourse": "英语",
                        "fourthCourse": "英语",
                        "fifthCourse": "英语",
                        "sixthCourse": "英语",
                        "seventhCourse": "英语",
                        "eighthCourse": "英语",
                        "ninthCourse": "英语",
                        "tenthCourse": "英语",
                        "eleventhCourse": "英语",
                        "twelfthCourse": "英语",
                        "thirteenthCourse": "英语",
                        "fourteenthCourse": "英语",
                        "fifteenthCourse": "英语",
                        "classroomName": "C105",
                        "classHeadmaster": "张三"},
                    {   "className": '中职2015级3班（63人）', "firstCourse":'11',
                        "secondCourse": "数学",
                        "thirdCourse": "英语",
                        "fourthCourse": "英语",
                        "fifthCourse": "英语",
                        "sixthCourse": "英语",
                        "seventhCourse": "英语",
                        "eighthCourse": "英语",
                        "ninthCourse": "英语",
                        "tenthCourse": "英语",
                        "eleventhCourse": "英语",
                        "twelfthCourse": "英语",
                        "thirteenthCourse": "英语",
                        "fourteenthCourse": "英语",
                        "fifteenthCourse": "英语",
                        "classroomName": "C105",
                        "classHeadmaster": "张三"},
                    {   "className": '中职2015级4班（57人）', "firstCourse":'12',
                        "secondCourse": "数学",
                        "thirdCourse": "英语",
                        "fourthCourse": "英语",
                        "fifthCourse": "英语",
                        "sixthCourse": "英语",
                        "seventhCourse": "英语",
                        "eighthCourse": "英语",
                        "ninthCourse": "英语",
                        "tenthCourse": "英语",
                        "eleventhCourse": "英语",
                        "twelfthCourse": "英语",
                        "thirteenthCourse": "英语",
                        "fourteenthCourse": "英语",
                        "fifteenthCourse": "英语",
                        "classroomName": "C105",
                        "classHeadmaster": "张三"},
                    {   "className": '中职2015级5班（57人）', "firstCourse":'13',
                        "secondCourse": "数学",
                        "thirdCourse": "英语",
                        "fourthCourse": "英语",
                        "fifthCourse": "英语",
                        "sixthCourse": "英语",
                        "seventhCourse": "英语",
                        "eighthCourse": "英语",
                        "ninthCourse": "英语",
                        "tenthCourse": "英语",
                        "eleventhCourse": "英语",
                        "twelfthCourse": "英语",
                        "thirteenthCourse": "英语",
                        "fourteenthCourse": "英语",
                        "fifteenthCourse": "英语",
                        "classroomName": "C105",
                        "classHeadmaster": "张三"},
                    {   "className": '中职2016级1班（71人）', "firstCourse":'14',
                        "secondCourse": "数学",
                        "thirdCourse": "英语",
                        "fourthCourse": "英语",
                        "fifthCourse": "英语",
                        "sixthCourse": "英语",
                        "seventhCourse": "英语",
                        "eighthCourse": "英语",
                        "ninthCourse": "英语",
                        "tenthCourse": "英语",
                        "eleventhCourse": "英语",
                        "twelfthCourse": "英语",
                        "thirteenthCourse": "英语",
                        "fourteenthCourse": "英语",
                        "fifteenthCourse": "英语",
                        "classroomName": "C105",
                        "classHeadmaster": "张三"},
                    {   "className": '中职2016级2班（73人）', "firstCourse":'15',
                        "secondCourse": "数学",
                        "thirdCourse": "英语",
                        "fourthCourse": "英语",
                        "fifthCourse": "英语",
                        "sixthCourse": "英语",
                        "seventhCourse": "英语",
                        "eighthCourse": "英语",
                        "ninthCourse": "英语",
                        "tenthCourse": "英语",
                        "eleventhCourse": "英语",
                        "twelfthCourse": "英语",
                        "thirteenthCourse": "英语",
                        "fourteenthCourse": "英语",
                        "fifteenthCourse": "英语",
                        "classroomName": "C105",
                        "classHeadmaster": "张三"},
                    {   "className": '中职2016级3班（74人）', "firstCourse":'16',
                        "secondCourse": "数学",
                        "thirdCourse": "英语",
                        "fourthCourse": "英语",
                        "fifthCourse": "英语",
                        "sixthCourse": "英语",
                        "seventhCourse": "英语",
                        "eighthCourse": "英语",
                        "ninthCourse": "英语",
                        "tenthCourse": "英语",
                        "eleventhCourse": "英语",
                        "twelfthCourse": "英语",
                        "thirteenthCourse": "英语",
                        "fourteenthCourse": "英语",
                        "fifteenthCourse": "英语",
                        "classroomName": "C105",
                        "classHeadmaster": "张三"},
                    {   "className": '中职2016级4班（74人）', "firstCourse":'17',
                        "secondCourse": "数学",
                        "thirdCourse": "英语",
                        "fourthCourse": "英语",
                        "fifthCourse": "英语",
                        "sixthCourse": "英语",
                        "seventhCourse": "英语",
                        "eighthCourse": "英语",
                        "ninthCourse": "英语",
                        "tenthCourse": "英语",
                        "eleventhCourse": "英语",
                        "twelfthCourse": "英语",
                        "thirteenthCourse": "英语",
                        "fourteenthCourse": "英语",
                        "fifteenthCourse": "英语",
                        "classroomName": "C105",
                        "classHeadmaster": "张三"}*/
                ]
//                排课结果课表
            }
        },
        beforeMount: function() {
//    页面dom加载前获取后端数据
            this.$http.post('./autoArrangeSeeCurriculum',{
//            this.$http.post('../testPhp/checkCourse.php',{
                "yearSemester": "",
                "week": ""
            },{
                "Content-Type":"application/json"
            }).then(function(response){
                console.log("获取课表:");
                console.log(response.body);
                this.items = response.body;
            },function(error){
                this.$Message.error("连接失败，请重试！");
            });
        },
        methods: {
            exchangeClick: function(){
//                调课
                var td = document.getElementsByTagName("td");
                var td1 = null;
                var td2 = null;
                var tdNum = 0;
                var buffer = null;
                for(var i = 0;i < td.length;i++){
                    if((td[i].style.backgroundColor == "lightskyblue" || td[i].style.backgroundColor == "rgb(135, 206, 250)") && tdNum == 0){
                        td1 = td[i];
                        tdNum = 1;
                    }else if((td[i].style.backgroundColor == "lightskyblue" || td[i].style.backgroundColor == "rgb(135, 206, 250)") && tdNum == 1){
                        td2 = td[i];
                        tdNum = 2;
                    }
                }
                if(tdNum < 2 ){
//                    this.$Message.warning("请选择需要调换的两门课程！",2);
                    this.modal1 = false;
                    this.errorMessage = "请选择需要调换的两门课程！";
                    this.modal2 = true;
                }else {
                    buffer = td1.innerHTML;
                    td1.innerHTML = td2.innerHTML;
                    td2.innerHTML = buffer;
                    for (var i = 0; i < td.length; i++) {
                        td[i].style.background = "white";
                    }
                    this.checked = 0;
                    this.$Message.success("调换成功！",2);
                    this.modal1 = false;
                }
            },
            courseClick: function(name,index){
//                选择需要调换的课程
                /*var td = document.getElementById(name+index);
                console.log(td.style.backgroundColor);
                if (td.style.backgroundColor == "lightskyblue" || td.style.backgroundColor == "rgb(135, 206, 250)") {
                    td.style.backgroundColor = "white";
                    this.checked--;
                } else {
                    if(this.checked < 2) {
                        td.style.backgroundColor = "lightskyblue";
                        this.checked++;
                    }else{
                        this.errorMessage = "已选择了需要调换的两门课程！";
                        this.modal2 = true;
                    }
                }*/
            }
        }
    }
</script>

<style scoped>
    #couArrangeTable_tableDiv{
        position: relative;
    }
    #exchangeButton{
        /*调课按钮*/
        position: absolute;
        top: -3rem;
        right: 1.5rem;
    }
    #checkCourseTable{
        position: relative;
        margin: 0.5rem auto;
        width: 97%;
        border: thin solid #d4d4d9;
        border-collapse: collapse;
        text-align: center;
    }
    #checkCourseTable td{
        border: thin solid #d4d4d9;
        /*max-width: 3rem;*/
    }
    .headTr td{
        height: 1rem;
    }
    #checkCourseTable td input{
        outline: none;
        border: none;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        text-align: center;
    }
    #checkCourseTable td:hover{
        cursor: pointer;
    }
    #headTdTime{
        text-align: right;
        border: none !important;
        width: 8.3rem;
    }
    #headTdCourse{
        border: none !important;
    }
    #headTdClass{
        padding-left: 0.5rem;
        text-align: left;
        border: none !important;
    }
    #headTdTime:after{
        /*表头分割线*/
        content: "";
        position: absolute;
        width: 0.05rem;
        height: 6rem;
        top: 0;
        left: 4rem;
        background-color: #d4d4d9;
        display: block;
        transform: rotate(-47deg);
        -ms-transform: rotate(-47deg);/* IE 9 */
        -webkit-transform: rotate(-47deg);/* Safari and Chrome */
        -o-transform: rotate(-47deg);/* Opera */
        -moz-transform: rotate(-47deg);/* Firefox */
        transform-origin: top;
    }
    #headTdClass:before{
        /*表头分割线*/
        content: "";
        position: absolute;
        width: 0.05rem;
        height: 8.75rem;
        top: 2rem;
        left:0;
        background-color: #d4d4d9;
        display: block;
        transform: rotate(-76deg);
        -ms-transform: rotate(-76deg);/* IE 9 */
        -webkit-transform: rotate(-76deg);/* Safari and Chrome */
        -o-transform: rotate(-76deg);/* Opera */
        -moz-transform: rotate(-76deg);/* Firefox */
        transform-origin: top;
    }
    #courseDetailP{
        padding-left: 1rem;
        margin-bottom: 0;
    }
    #courseDetailTable{
        position: relative;
        margin: 0.5rem auto;
        width: 97%;
        border-collapse: collapse;
        table-layout: fixed;
    }
    @media screen and (max-width:1025px) {
        #headTdTime:after{
            width: 0.1rem;
            height: 6.7rem;
            transform: rotate(-43deg);
            -ms-transform: rotate(-43deg);/* IE 9 */
            -webkit-transform: rotate(-43deg);/* Safari and Chrome */
            -o-transform: rotate(-43deg);/* Opera */
            -moz-transform: rotate(-43deg);/* Firefox */
        }
        #headTdClass:before{
            width: 0.1rem;
            height: 9rem;
            transform: rotate(-71.3deg);
            -ms-transform: rotate(-71.3deg);/* IE 9 */
            -webkit-transform: rotate(-71.3deg);/* Safari and Chrome */
            -o-transform: rotate(-71.3deg);/* Opera */
            -moz-transform: rotate(-71.3deg);/* Firefox */
        }
    }
    @media screen and (min-width:1025px) and (max-width:1173px) {
        #headTdTime:after{
            width: 0.1rem;
        }
        #headTdClass:before{
            width: 0.1rem;
        }
    }
</style>
