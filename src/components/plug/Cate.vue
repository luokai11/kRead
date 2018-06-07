<template>
  <div class="channels">
    <h3>{{title}}</h3>
    <div class="channel">
      <div v-for="(c,index) in cateList" @click="goDetails(c)">
        <div class="ch">
          <img :src="c.bookCover[0] | staticUrl">
          <p>{{c.name}}</p>
          <p>{{c.bookCount}}本</p>
        </div>
        <div class="sl" v-if="index%2===0"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      title:String,
      type:String,
      cateList:Array,
    },
    methods:{
      goDetails(item) {
        this.$router.push({
          name: 'categoryDetails',
          params: { name: item.name },
          query: { gender: this.type }
        });
      }
    }
  }
</script>
<style lang="less" scoped>
.channels {
  margin-bottom: 1rem;
  h3 {
    text-align: left;
    border-left: 3px solid red;
    padding-left: 0.3rem;
    margin-left: 1rem;
  }
}

.channel {
  padding: 0.5rem 1.5rem;
  overflow: hidden;
  clear: both;
  .ch {
    text-align: left;
    float: left;
    width: 40%;
    line-height: 4rem;
    height: 4rem;
    padding: 0.5rem 0;
      img {
        width: 3rem;
        height: 4rem;
      }
      p {
        display: inline-block;
        position: absolute;
        float: right;
        line-height: 2rem;
        height: 2rem;
        padding-left: 0.5rem;
        font-family: 宋体;
        font-size: 14px;
        &:last-child {
          margin-top: 2rem;
          font-size: 12px;
          color: #666;
        }
      }
  }
  .sl {
    border-right: 1px solid #ddd;
    height: 2rem;
    width: 1px;
    float: left;
    margin: 1.5rem 1.5rem;
  }
}
</style>