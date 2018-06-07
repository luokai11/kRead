<template>
  <div class="classify">
    <Head :isBack="false" :title="'分类'">
    </Head>
    <div  v-if="sc">
      <Cate :title="'男生频道'" :type="'male'"   :cateList="classifyList.male"></Cate>
      <Cate :title="'女生频道'" :type="'female'" :cateList="classifyList.female"></Cate>
      <Cate :title="'出版频道'" :type="'press'"  :cateList="classifyList.press"></Cate>
    </div>
  </div>
</template>
<script>
  import { Indicator } from 'mint-ui';
  import api from '../api/api';
  import Head from './plug/Head';
  import Cate from './plug/Cate';
  export default {
  components:{
    Head,
    Cate
  },
  data() {
    return {
      classifyList: {},
      sc: false
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      Indicator.open('加载中');
      api.getCategory()
      .then((res) => {
        Indicator.close();
        this.sc = true;
        this.classifyList = res.data;
      }).catch((error) => {
        console.log(error);
      });
    }
  }
  }
</script>

<style scoped>
  .classify {
    margin:3.5rem 0;
  }
</style>
