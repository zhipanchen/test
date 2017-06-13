<template>
    <div id="checkCourse_tableDiv">
        <!--<button id="exchangeButton" @click="exchangeClick" class="am-btn am-btn-success am-radius">确认调课</button>-->
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
            <tr v-for="(item,index) in items" id="courseTr">
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
        <table id="courseDetailTable" class="normalTable">
           <!--<thead>
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
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>-->
        </table>
    </div>

</template>

<script>
    export default {
        name: 'checkCourse_tableDiv',
        data () {
            return {
                checked: 0,
                items:[
                    /*{   "className": '高职2013级1班（45人）', "firstCourse":'语文<br>教师姓名<br>（教室）<br>（时间）',
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
//                课表信息
            }
        },
        props:['queryCourse'],
//        父组件传递查找结果课表
        watch: {
            queryCourse: function () {
                this.items = this.queryCourse;
                for (var i = 0; i < this.items.length; i++) {
                    for ( var key in this.items[i]){
                        if(this.items[i][key].indexOf("br") > 0){
                            console.log(this.items[i][key]);
                            var first = this.items[i][key].split("<br>");
                            this.items[i][key] = first[0];
                            for (var j = 0; j < first.length - 1; j++) {
                                this.items[i][key] += "<br>"+first[j+1];
                            }
                        }
                    }
                }
//                查找课表替换
            }
        },
        /*methods: {
            exchangeClick: function(){
                var td = document.getElementsByTagName("td");
                var td1 = null;
                var td2 = null;
                var tdNum = 0;
                var buffer = null;
                for(var i = 0;i < td.length;i++){
                    if(td[i].style.background == "lightskyblue" && tdNum == 0){
                        td1 = td[i];
                        tdNum = 1;
                    }else if(td[i].style.background == "lightskyblue" && tdNum == 1){
                        td2 = td[i];
                        tdNum = 2;
                    }
                }
                buffer = td1.innerHTML;
                td1.innerHTML = td2.innerHTML;
                td2.innerHTML = buffer;
                for(var i = 0;i < td.length;i++){
                    td[i].style.background = "white";
                }
                this.checked = 0;
            },
            courseClick: function(name,index){
                console.log(this.queryCourse);
                var td = document.getElementById(name+index);
                if (td.style.background == "lightskyblue") {
                    td.style.background = "white";
                    this.checked--;
                } else {
                    if(this.checked < 2) {
                        td.style.background = "lightskyblue";
                        this.checked++;
                    }else{
                        alert("已选择了需要调换的两门课程！");
                    }
                }
            },
        }*/
    }
</script>

<style scoped>
    #checkCourse_tableDiv{
        position: relative;
    }
    #exchangeButton{
        position: absolute;
        top: -3rem;
        right: 1.5rem;
        display: none;
    }
    #checkCourseTable{
        /*课表*/
        position: relative;
        margin: 0.5rem auto;
        width: 97%;
        border: thin solid #d4d4d9;
        border-collapse: collapse;
        text-align: center;
    }
    td{
        border: thin solid #d4d4d9;
        /*max-width: 3rem;*/
    }
    .headTr td{
        /*表头单元格*/
        height: 1rem;
    }
    td input{
        outline: none;
        border: none;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        text-align: center;
    }
    td:hover{
        cursor: pointer;
    }
    #headTdTime{
        /*表头时间*/
        text-align: right;
        border: none;
        width: 8.3rem;
    }
    #headTdCourse{
        /*表头科目*/
        border: none;
    }
    #headTdClass{
        /*表头班级*/
        padding-left: 0.5rem;
        text-align: left;
        border: none;
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
    #courseDetailTable{
        /*课程详细信息表格*/
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
