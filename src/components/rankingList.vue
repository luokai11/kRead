<template>
  <div class="ranking">

    <Head :isBack="false" :title="'排行榜'">
      <Select :text="selectGender" :items="gender" :sid="'gender'" v-on:gender="selectG" slot="left"></Select>
      <Select :text="selectRank" :items="rank" :sid="'rank'" v-on:rank="selectR" slot="left"></Select>
    </Head>
    <div class="ranking_left" v-show="sb">
      <ul>
        <li :class="{actived : isActive === index}" v-for="(t,index) in gList" @click="changeType(index,t)">{{t.shortTitle}}</li>
      </ul>
    </div>
    <div class="ranking_right">      
      <BookList :bookList="bookList" :imgClass="'xImg'" :wdClass="'lc'" :bookClass="'books1'"></BookList>
    </div>
  </div>
</template>
<script>
import api from '../api/api.js';
import { Indicator, InfiniteScroll } from 'mint-ui';
import Select from './plug/Select';
import Head from './plug/Head';
import BookList from './plug/BookList';
export default {
  name: 'ranking',
  components: {
    Select,
    Head,
    BookList
  },
  data() {
    return {
      genderList: {},
      bookList: [],
      gList: [],
      gender: ['男生', '女生'],
      selectGender: '男生',
      rank: ['周榜', '月榜', '总榜'],
      selectRank: '周榜',
      isActive: 0,
      load: false,
      sb: false,
    }
  },
  created() {
    this.isActive = 0;
    api.getRank()
      .then((res) => {
        this.genderList = res.data;
        this.sb = true;
        var g = this.selectGender === '男生' ? 'male' : 'female';
        this.gList = this.genderList[g];
        this.getBook(this.gList[0]._id);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    goDetails(item) {
      this.$router.push({
        name: 'bookDetails',
        params: { id: item._id }
      });
    },
    selectR(value) {
      if (this.selectRank === value) {
        return;
      }
      this.selectRank = value;
      switch (value) {
        case '周榜':
          this.getBook(this.gList[this.isActive]._id);
          break;
        case '月榜':
          this.getBook(this.gList[this.isActive].monthRank);
          break;
        case '总榜':
          this.getBook(this.gList[this.isActive].totalRank);
          break;
      }
    },
    selectG(value) {
      if (this.selectGender === value) {
        return;
      }
      this.selectGender = value;
      this.selectRank = '周榜';
      this.isActive = 0;
      var g = this.selectGender === '男生' ? 'male' : 'female';
      this.gList = this.genderList[g];
      this.getBook(this.gList[0]._id);
    },
    getBook(id) {
      if (id === undefined) {
        alert('没有数据！');
        return;
      }
      Indicator.open('加载中');
      api.getRankList(id)
        .then((res) => {
          Indicator.close();
          this.bookList = res.data.ranking.books;
        })
        .catch((err) => {
          console.log(err)
        });
    },
    changeType(index, item) {
      this.isActive = index;
      this.bookList = [];
      this.selectRank = '周榜';
      this.getBook(item._id);
    }
  }
}

</script>
<style scoped>
.books .sug {
  padding-left: 0.5rem !important;
}

.ranking {
  overflow: hidden;
  margin-top: 2.5rem;
  margin-bottom: 3.5rem;
}

.ranking_left {
  float: left;
  width: 19%;
  background-color: #f5f5f5;
  position: fixed;
  top: 2.5rem;
  bottom: 3.5rem;
  font-family: SimSun;
  overflow-y: auto;
}

.ranking_left ul {
  height: 100%;
  overflow-y: auto;
  margin-right: -0.5rem;
}

.ranking_left li {
  padding: 0.8rem 0.5rem 0.8rem 0;
  cursor: pointer;
  font-size: 14px;
}

.ranking_right {
  width: 81%;
  float: right;
  overflow-y: auto;
}

.ranking_right .books {
  margin: 0.5rem 0 0 0.5rem;
}

.actived {
  background: #fff;
  border-left: 2px solid red;
}

</style>
