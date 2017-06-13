<template>
  <div id="back">
    <div id="messageNotice-tableDiv">
          <div id="topPla">
               <span id="titleWor">{{titleWor}}</span>
               <button class="am-btn am-btn-success am-radius" id="fresh2Button" @click="freshMes">刷新</button>
          </div>

          <div class="dropDown">
              <button @click="unfoldAlert1()" class="amButtom" >
                  <img class="iconImg"  :src="iconSrc1">
                  <span class="subtitle">{{subtitle1}}</span>
              </button>
              <div v-show="seen1" class="dropDown-content"><a class="contentH" :href="contentHref">{{content}}</a></div>
              <div v-show="seen1" class="dropDown-content"><a class="contentH" :href="contentHref">{{content}}</a></div>
              <div v-show="seen1" class="dropDown-content"><a class="contentH" :href="contentHref">{{content}}</a></div>

          </div>
          <div class="dropDown">
            <button @click="unfoldAlert2()" class="amButtom" >
                <img class="iconImg"  :src="iconSrc2">
                <span class="subtitle">{{subtitle2}}</span>
            </button>
            <div v-show="seen2" class="dropDown-content"><a class="contentH" :href="contentHref">{{content}}</a></div>
            <div v-show="seen2" class="dropDown-content"><a class="contentH" :href="contentHref">{{content}}</a></div>
            <div v-show="seen2" class="dropDown-content"><a class="contentH" :href="contentHref">{{content}}</a></div>

        </div>
          <div class="dropDown">
            <button @click="unfoldAlert3()" class="amButtom" >
                <img class="iconImg"  :src="iconSrc3">
                <span class="subtitle">{{subtitle3}}</span>
            </button>
            <div v-show="seen3" class="dropDown-content"><a class="contentH" :href="contentHref">{{content}}</a></div>
            <div v-show="seen3" class="dropDown-content"><a class="contentH" :href="contentHref">{{content}}</a></div>
            <div v-show="seen3" class="dropDown-content"><a class="contentH" :href="contentHref">{{content}}</a></div>

        </div>
          <div class="dropDown">
        <button @click="unfoldAlert4()" class="amButtom" >
          <img class="iconImg"  :src="iconSrc4">
          <span class="subtitle">{{subtitle4}}</span>
        </button>
        <div v-show="seen4" class="dropDown-content"><a class="contentH" :href="contentHref">{{content}}</a></div>
        <div v-show="seen4" class="dropDown-content"><a class="contentH" :href="contentHref">{{content}}</a></div>
        <div v-show="seen4" class="dropDown-content"><a class="contentH" :href="contentHref">{{content}}</a></div>

      </div>
          <div class="dropDown">
        <button @click="unfoldAlert5()" class="amButtom" >
          <img class="iconImg"  :src="iconSrc5">
          <span class="subtitle">{{subtitle5}}</span>
        </button>
        <div v-show="seen5" class="dropDown-content"><a class="contentH" :href="contentHref">{{content}}</a></div>
        <div v-show="seen5" class="dropDown-content"><a class="contentH" :href="contentHref">{{content}}</a></div>
        <div v-show="seen5" class="dropDown-content"><a class="contentH" :href="contentHref">{{content}}</a></div>

      </div>
          <div class="dropDown">
        <button @click="unfoldAlert6()" class="amButtom" >
          <img class="iconImg"  :src="iconSrc6">
          <span class="subtitle">{{subtitle6}}</span>
        </button>
        <div v-show="seen6" class="dropDown-content"><a class="contentH" :href="contentHref">{{content}}</a></div>
        <div v-show="seen6" class="dropDown-content"><a class="contentH" :href="contentHref">{{content}}</a></div>
        <div v-show="seen6" class="dropDown-content"><a class="contentH" :href="contentHref">{{content}}</a></div>

      </div>
    </div>
  </div>
</template>

<script>
    import icon1 from'./icon1.png'
    import icon2 from'./icon2.png'
    export default {
        name:'messageNoticePage-tableDiv',
        data () {
            return {
                titleWor:'您好，老师！祝您有一个愉快的工作日！',
                subtitle1:'学院公告',
                subtitle2:'部门发布',
                subtitle3:'科研动态',
                subtitle4:'对外播报',
                subtitle5:'教务文件',
                subtitle6:'校务公布',
                iconSrc1:icon1,
                iconSrc2:icon1,
                iconSrc3:icon1,
                iconSrc4:icon1,
                iconSrc5:icon1,
                iconSrc6:icon1,
                content:'内容',
                contentHref:'#',
                seen1:false,
                seen2:false,
                seen3:false,
                seen4:false,
                seen5:false,
                seen6:false
                    }
        },
        methods:{
            unfoldAlert1: function () {
                if(this.seen1==true){
                    this.seen1=false;
                    this.iconSrc1=icon1;
                }else{
                    this.seen1=true;
                    this.iconSrc1=icon2;
                }
            },
            unfoldAlert2: function () {
                if(this.seen2==true){
                    this.seen2=false;
                    this.iconSrc2=icon1;
                }else{
                    this.seen2=true;
                    this.iconSrc2=icon2;
                }
            },
            unfoldAlert3: function () {
                if(this.seen3==true){
                    this.seen3=false;
                    this.iconSrc3=icon1;
                }else{
                    this.seen3=true;
                    this.iconSrc3=icon2;
                }
            },
          unfoldAlert4: function () {
            if(this.seen4==true){
              this.seen4=false;
              this.iconSrc4=icon1;
            }else{
              this.seen4=true;
              this.iconSrc4=icon2;
            }
          },
          unfoldAlert5: function () {
            if(this.seen5==true){
              this.seen5=false;
              this.iconSrc5=icon1;
            }else{
              this.seen5=true;
              this.iconSrc5=icon2;
            }
          },
          unfoldAlert6: function () {
            if(this.seen6==true){
              this.seen6=false;
              this.iconSrc6=icon1;
            }else{
              this.seen6=true;
              this.iconSrc6=icon2;
            }
          },
            freshMes:function(){
              this.$Message.success('刷新成功！');
            }

        }

    }

</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
    #back{
      width:100%;
      height:100%;
      background-color: #f3f3f3;
    }
    html{
        font-size: 16px;
        /*color: #f3f3f3;*/
    } /*整个页面的样式*/
    #topPla{
        position: relative;
        margin:0.3rem;
        display: flex;
        align-items: center;
       /*justify-content: space-around;*/
        padding: 0.3rem;
        justify-content: space-between;
    } /*文字与按钮*/
    #titleWor{
        font-size: 0.8rem;
    }/*文字*/
    #fresh2Button{

        min-width: 5rem;
    }/*按钮*/
    #messageNotice-tableDiv{
      background-color: white;
      width: 87%;
      /*height:50rem;*/
      position: relative;
      margin-left:5rem;
    }/*背景*/
    .amButtom{
        width:100%;
        background-color: #37937a;
        border:thin solid #d4d4d9;
        height:2.5rem;
        color:white;
        font-size: 1rem;
        display:flex;
        outline:none
    }/*绿条*/
    li{
    list-style-type: none;
    }/*去点*/
    .iconImg{
        position: relative;
        margin: 0.5rem 0.2rem;
        width: 1.5rem;
        height: 1.5rem;
    }/*绿条上的图标*/
    .subtitle{
        font-size: 1rem;
        display: flex;
        padding:0.5rem 1rem;
        position: relative;
        color:white;

    }/*子标题*/
    .dropDown-content{
        background-color:white;
        width:99.7%;
        height:2rem;
        border:thin solid #d4d4d9;
        display: flex;
        align-items: center;
        font-size: 0.8rem;
    }/*内容*/
    .contentH{
        position:relative;
        left:3rem;
    }
</style>
