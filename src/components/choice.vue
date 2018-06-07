<template>
  <div class="choice">
    <Head :isBack="false" :title="'精选'">
      <Select :text="selectValue" :items="gender" :sid="'gender'" v-on:gender="increment" slot="left">
      </Select>
    </Head>
    <div style="margin-top: 40px;">
      <div>
        <mt-swipe :auto="4000" class="mt-swipe">
          <mt-swipe-item class="mt-swipe-item" :key="index" v-for="(item,index) in sliderList"><img :src="item.img">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="contents" v-for="(items,index) in choiceList" v-if="items.sex === show">
        <div class="cnt" @click="more(items)">
          <h4>{{items.title}}</h4>
          <i class="mintui mintui-gengduo1"></i>
          <span>更多</span>
        </div>
        <BookList :bookList="items.books" :imgClass="'sImg'"></BookList>
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import api from '../api/api';
import Select from './plug/Select';
import Head from './plug/Head';
import BookList from './plug/BookList';
export default {
  name: 'choice',
  components: {
    Select,
    Head,
    BookList
  },
  data() {
    return {
      gender: ['男生', '女生'],
      selectValue: '男生',
      choiceList: [],
      sliderList: [],
      show: 'male'
    }
  },
  methods: {
    increment(value) {
      this.selectValue = value;
      this.show = value === '男生' ? 'male' : 'female';
    },
    more(obj) {
      this.$router.push({
        name: 'recommend',
        params: { name: obj.title },
        query: { id: obj._id }
      });
    }
  },
  created() {
    Indicator.open('加载中');
    api.getChoiceList()
      .then((res) => {
        Indicator.close();
        let data = res.data.data;
        this.choiceList = data.nodes.slice(0, data.nodes.length - 1);
        this.sliderList = data.spread.slice(0, 5);
      })
      .catch((err) => {
        console.log(err)
      });
  }
}

</script>
<style lang="less" scoped>
.choice {
  margin-bottom: 3.5rem;
  overflow: hidden;
  font-family: SimSun;
  background-color: #ddd;
}

.mt-swipe {
  height: 120px;
  .mt-swipe-item {
    line-height: 120px;
    img {
      height: 120px;
      width: 100%;
    }
  }
}

.contents {
  margin-bottom: 0.5rem;
  background-color: #fff;
}

.cnt {
  overflow: hidden;
  padding: 1rem 1rem 0.5rem;
  line-height: 18px;
  h4 {
    float: left;
    padding-left: 1rem;
    border-left: 2px solid red;
  }
  span {
    float: right;
    font-size: 12px;
    color: #888;
  }
  i {
    float: right;
    font-size: 14px;
    padding-left: 5px;
    color: #888;
  }
}

</style>
