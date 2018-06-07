<template>
  <div class="selectbox">
    <div class="select-selection" @click.stop="open">
      <span>
        {{text}}
      </span>
    </div>
    <div>
      <div class="select_down" style="top:-1px;" :class="{'dis':!showDown}">
        <ul>
          <li class="select-item" v-for="i in items" :class="{'select-item-selected':text=== i}" @click.stop="selectClick(i)">
            {{i}}
          </li>
        </ul>
      </div>
      <div class="modal"  v-show="showDown" @click="close" style="background-color: initial"></div>
    </div>
  </div>
</template>
<script>
export default{
  name:'selectbox',
  props:{
    items:Array,
    text:String,
    sid:String
  },
  data(){
    return {
      showDown:false
    }
  },
  methods:{
    open(){
      this.showDown = true;
    },
    selectClick(value){
      this.showDown = false;
      this.$emit(this.sid,value);
    },
    close(){
      this.showDown = false;
    }
  }
}
</script>
<style>
 ul {
  margin:0;
  padding:0;
 }
 .dwn {
    vertical-align: middle;
    margin-left: -7px;
 }
.selectbox{
    float:left;
    padding-left: 1rem;
    width: 3.5rem;
    line-height: 1.5rem;
    margin: 0.5rem 0;
  }
  .select_down {
    max-height: 200px;
    overflow: auto;
    margin: 5px 0;
    padding: 5px 0;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    position: absolute;
    z-index: 9999;
  }
  .select_down ul{
    color:#555;
    width:4rem;
    padding-left: 0!important;
    text-align: left;
  }
  .select-item{
    margin: 0;
    line-height: normal;
    padding: 7px 12px;
    clear: both;
    color: #495060;
    font-size: 12px!important;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    transition: background .2s ease-in-out;
    letter-spacing: 1px;
  }
  .select-selection {
    display: block;
    box-sizing: border-box;
    outline: 0;
    -webkit-user-select: none;
    cursor: pointer;
    position: relative;
    background-color: #A00000;
    border: 1px solid #B00;
    color:#fff;
    border-radius: 4px;
    transition: all .2s ease-in-out;
  }

  .select-selection span {
    display: block;
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    letter-spacing: 1px;
    text-align: center;
  }
  .select-item-selected {
    color: #fff;
    background: rgba(45,140,240,.9)
  }

  .dis {
    display:none;
  }
</style>