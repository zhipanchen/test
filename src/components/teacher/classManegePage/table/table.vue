<template >
   <div id="back">
    <div id="classManege-table">
      <div id="klassDiv">
      <span>班级：{{klass}}</span>
        <span id="num">人数：{{num}}</span>
      <a href="#/teacher/classList">  <span id="list" >查看班级名单</span></a>
     </div>
      <div id="tableDiv">
      <table class="operationTable">
        <thead>
         <tr>
           <th width="25%">班级获奖名称</th>
           <th width="25%">获奖等级</th>
           <th width="25%">上传</th>
           <th width="25%">操作</th>
         </tr>
        </thead>
        <tbody>
         <tr  v-for="(data,index) in tableList" :key="data.name">
           <td><input :id="'Input'+index" type="text" v-model.lazy="data.name" ></td>
           <td><select :id="'Select'+index" v-model="data.selected">
             <option  v-for="option1 in options1" :value="option1.value">
             {{ option1.text }}
           </option></select></td>
           <td><span>上传</span>
               <span>查看</span>
           </td>
           <td>
              <img title="保存" @click="save(index)" class='img'style="display:inline;" :src="imgSrc1" :id="'save'+index">
            <img title="取消" @click="edit(index)" class='img'style="display:inline;" :src="imgSrc2" :id="'edit'+index">
             <img title="编辑" @click="change(index)" class='img' style="display:none;" :src="imgSrc4" :id="'change'+index">
             <img title="删除" @click="del(index)" class='img' style="display:none;" :src="imgSrc5" :id="'del'+index">
           </td>
         </tr>
        </tbody>
      </table>
        <img title="添加"  @click="add" id='img3'  :src="imgSrc3" >
      </div>
    </div>
   </div>
</template>

<script>
  import icon1 from'./right.png'
  import icon2 from'./wrong.png'
  import icon3 from'./plus.png'
  import icon4 from'./change.png'
  import icon5 from'./delete.png'
    export default {
        name: 'classManege-table',
        data () {
            return {
              imgSrc1:icon1,
              imgSrc2:icon2,
              imgSrc3:icon3,
              imgSrc4:icon4,
              imgSrc5:icon5,
              klass:'2014级1班',
              num:'50',
              selected: '0',
              tableList:[{name:'1',selected:'2'},{name:'2',selected:'1'}],
              options1:[{text:'选择级别',value:'0'},
                {text:'校级',value:'1'},
                {text:'省级',value:'2'},
                {text:'国家级',value:'3'}
              ]
            }
        },
        methods:{
          //添加
          add: function(){
            this.tableList.push({name:'',input:'',selected:'0'});
          },
          //保存
          save:function(index){
            var Input = document.getElementById("Input"+index);
            var Select = document.getElementById("Select"+index);
            if(Input.value!="")
            {
            if(confirm('确认保存？'))
            {
              var save=document.getElementById("save"+index);
              save.style.display='none';
              var edit=document.getElementById("edit"+index);
              edit.style.display='none';
              var change=document.getElementById("change"+index);
              change.style.display='inline';
              var del=document.getElementById("del"+index);
              del.style.display='inline';
              Input.readOnly=true;
              Select.disabled = true;
            }}
            else{alert('请输入奖项！');}
          },
          //取消
          edit:function(index){
            if(confirm('取消保存？')) {
              var save=document.getElementById("save"+index);
              save.style.display='none';
              var edit=document.getElementById("edit"+index);
              edit.style.display='none';
              var change=document.getElementById("change"+index);
              change.style.display='inline';
              var del=document.getElementById("del"+index);
              del.style.display='inline';
              var Input = document.getElementById("Input"+index);
              var Select = document.getElementById("Select"+index);
              Input.readOnly=true;
              Select.disabled = true;
//              取消保存时后台应返回之前的值
            }
          },
          //编辑
          change: function (index) {
            var Input = document.getElementById("Input"+index);
            Input.readOnly=false;
            var Select = document.getElementById("Select"+index);
            Select.disabled =false ;
            var save=document.getElementById("save"+index);
            save.style.display='inline';
            var edit=document.getElementById("edit"+index);
            edit.style.display='inline';
            var change=document.getElementById("change"+index);
            change.style.display='none';
            var del=document.getElementById("del"+index);
            del.style.display='none';
          },
          //删除
          del:function(index){
            if(confirm("您确定要删除该奖项吗？")){
              this.tableList.splice(index,1);
            }
          }

        }
    }
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  html{
    font-size: 16px;
  }
  #back{
    background-color: #f3f3f3;
    padding-top:0.1rem;
    height:37rem;
  }
#classManege-table {
  background-color: white;
  margin-right:5rem;
  margin-left:5rem;
  height:30rem;
  position: relative;
  font-family: 微软雅黑;

}
#klassDiv{
  text-align: left;
  margin:2rem;
  padding-top: 2rem;
  margin-left:4rem;
}
  #num{
    margin-left: 2rem;;
  }
  #tableDiv {
    background-color: white;
    height:30rem;
    position: relative;
    padding-left: 1rem;
  }
  table{
    /*border: solid 1px white;*/
    /*border-collapse: collapse;*/
    /*margin-left:1rem;*/
    /*margin-right:1rem;*/
    /*width:96%;*/

  }
  thead{
    border-bottom:solid 2px lightgrey;
  }

  tr{
    height:3rem;
  }
  #list{
    margin-left:2rem;
  }
  button{
    color: white;
    background-color: mediumseagreen;
    border: none;
    border-radius: 0.2rem;
    width: 5rem;
    height: 2rem;
    min-width: 5rem;
    position: relative;

  }
  .img{
    width: 1.5rem;
    height:1.5rem;
  }
  #img3{
    width: 1.5rem;
    height:1.5rem;
    display: flex;
    margin-left:7rem;
  }
  select{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.7rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
  }
  input{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.3rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
    width:6rem;
  }


</style>
