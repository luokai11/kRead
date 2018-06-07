<template>
  <div class="dialog">
    <div class="dialog-box animated dialogIn">
      <div class="dialog-box-header">
        <div class="dialog-box-title">{{dialog.title}}</div>
      </div>
      <div class="dialog-box-content">
        <div class="dialog-box-message">{{dialog.content}}</div>
      </div>
      <div class="dialog-box-btns">
        <button class="dialog-box-btn dialog-box-cancel" @click="cancel">{{dialog.cancelText}}</button>
        <button class="dialog-box-btn dialog-box-confirm" @click="confirm">{{dialog.confirmText}}</button>
      </div>
    </div>
    <div class="modal" @click="close">
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      dialogObj:Object
    },
    data(){
      return {
        reject:'',
        resolve:'',
        promise:''
      }
    },
    computed:{
      dialog:function(){
        let obj = this.dialogObj;
        return {
          title:obj.title || '提示',
          content:obj.content,
          showConfirmButton:obj.showConfirmButton || true,
          showCancelButton:obj.showCancelButton || true,
          confirmText: obj.confirmText || '确定',
          cancelText: obj.cancelText || '取消'
        }
      }
    },
    methods:{
      cancel(){
        this.reject('cancel');
      },
      confirm(){
        this.resolve('confirm');
      },
      close(){
        this.reject('close');
      },
      promiseFn(){
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
        return this.promise;
      }
    }
  }
</script>
<style lang="less" scoped>
  .dialog-box {
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: #fff;
    width: 64%;
    border-radius: 4px;
    font-size: 16px;
    -webkit-user-select: none;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: 0.2s;
    transition:0.2s;
    background-color: #fff;
    border: 1px solid #ddd;
    z-index:2001;
    -webkit-box-shadow: 0px 0px 12px 2px #555;
    -moz-box-shadow: 0px 0px 12px 2px #555;
    box-shadow: 0px 0px 12px 2px #555;
  }
  .dialog-box-header {
    line-height: 2rem;
    text-align: left;
    padding: 0 0.75rem;
    font-size: 14px;
    font-weight: bold;
  }
  .dialog-box-content {
    line-height: 2rem;
    padding: 1rem 1.5rem;
    text-align: left;
    font-size: 12px;
    color:#888;
  }
  .dialog-box-btns {
    line-height: 2rem;
    text-align: right;
    padding: 0.5rem;
  }

  .dialog-box-btn {
    border: none;
    background-color: #fff;
    color: #15D;
    cursor: pointer;
  }
  .dialogIn{
    -webkit-animation-name: dialogIn;
    animation-name:dialogIn;
  }
  .animated {
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode:both;
    animation-fill-mode: both;
}
  @keyframes dialogIn {
    0% {
      opacity: 0;
      -webkit-transform: scale(.3) translate(-50%, -50%);
      -ms-transform: scale(.3) translate(-50%, -50%);
      transform: scale(.3) translate(-50%, -50%);
    }
    100% {
        opacity: 1;
        -webkit-transform: scale(1) translate(-50%, -50%);
        -ms-transform: scale(1) translate(-50%, -50%);
        transform: scale(1) translate(-50%, -50%);
      }
  }
</style>