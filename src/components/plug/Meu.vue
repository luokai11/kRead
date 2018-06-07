<template>
  <div class="meu">
    <div class="item" v-for="(meu,index) in meuList"  @click="changeMeu(index,meu)" :class='{checked:selected === meu.name}'>
       <router-link :to="meu.myLink">
          <i class="mintui" :class="[meu.icon]"></i>
          <div class="title">{{meu.title}}</div>
       </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'meu',
  data() {
    return {
      selected: '',
      path: '',
      meuList: [
        { name: 'bookshelf', title: '书架', myLink: '/bookshelf', icon: 'mintui-shujia' },
        { name: 'choice', title: '精选', myLink: '/choice', icon: 'mintui-shuku' },
        { name: 'category', title: '分类', myLink: '/category', icon: 'mintui-fenlei' },
        { name: 'rankingList', title: '排行榜', myLink: '/rankingList', icon: 'mintui-paihangbang' }
      ]
    }
  },
  methods: {
    changeMeu(index, meu) {
      this.selected = meu.name;
    }
  },
  mounted() {
    this.selected = this.$route.name;
  },
  watch: {
    '$route': function() {
      this.selected = this.$route.name;
    }
  }
}

</script>
<style scoped>
.meu {
  z-index: 999;
  position: fixed;
  display: flex;
  justify-content: space-around;
  bottom: 0;
  width: 100%;
  background: #fff linear-gradient(180deg, #EDEDF1, #E87 100%, transparent 0, transparent 0) 0 0 repeat-x;
  /* background-size: 100% 1px;*/
  background-color: hsla(0, 0%, 100%, .98);
  padding-top: 0.5rem;
}

.meu a {
  text-decoration: none;
  color: #000;
}

.meu img {
  width: 1.5rem;
}

.meu .item {
  width: 5rem;
  height: 3rem;
}

.meu .title {
  width: 5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: 14px;
}

.item i {
  font-size: 20px;
}

.checked div,
.checked i {
  color: red !important;
}

</style>
