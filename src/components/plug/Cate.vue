<template>
  <div class="channels">
    <h3>{{title}}</h3>
    <div class="channel">
 
        <div class="ch" v-for="(c,index) in cateList" @click="goDetails(c)">
          <div class="cl">       
            <img :src="c.bookCover[0] | staticUrl">
          </div>
          <div class="cr">
            <div>{{c.name}}</div>
            <div>{{c.bookCount}}本</div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    type: String,
    cateList: Array,
  },
  methods: {
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
  padding: 0.5rem 1rem;
  overflow: hidden;
  clear: both;
  .ch {
    text-align: left;
    float: left;
    width: 50%;
    line-height: 4rem;
    height: 4rem;
    padding: 0.5rem 0;
    img {
      width: 3rem;
      height: 4rem;
    }
  }
  .cr {
    float:left;
    padding-left: 0.5rem;
    color: #333;
    font-size: 14px;
    div {
      height: 2rem;
      line-height: 2rem;
    }
  }
  .cl {
    float: left;
    padding-left: 0.5rem
  }
}

</style>
