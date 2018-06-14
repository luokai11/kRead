<template>
  <div class="searchBook" v-if="hh">

    <Head>
      <div slot="right">
        <i class="mintui mintui-search input_icon" @click="search"></i>
        <span class=" del" v-show="keyWord.length>0" @click="removekey">&times</span>
        <input type="text" class="search" placeholder="请输入关键字" v-model="keyWord">
      </div>
    </Head>
    <div class="searchContent">
      <div class="content" v-show="show ==='bs'">
        <BookList :bookList="books" :imgClass="'sImg'"></BookList>
      </div>
      <div class="keywords" v-show="show ==='kh'">
        <div class="hotWords">
          <div class="hotHead">
            <span class="sp1">热门关键字</span>
            <span class="sp2" @click="getRandom">换一批</span>
          </div>
          <ul>
            <li v-for="h in  hotRandoms" @click="selectKey(h.word)">{{h.word}}</li>
          </ul>
        </div>
        <ul class="scrollH">
          <li v-for="(k,index) in searchRecords" @click="selectKey(k)" v-if="index<8">
            <i class="mintui mintui-search"></i>{{k}}
            <i class="mintui mintui-shanchu fr" @click.stop="deletekey(k)"></i>
          </li>
        </ul>
        <ul v-if="searchRecords.length>0">
          <li class="emp" @click="empty">清空搜索历史</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../api/api';
import Head from './plug/Head';
import BookList from './plug/BookList';
import { Indicator } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'searchBook',
  components: {
    Head,
    BookList
  },
  data() {
    return {
      keyWord: '',
      books: [],
      hotWords: [],
      hotRandoms: [],
      show: 'kh',
      hh: true
    }
  },
  created() {
    this.INIT_STATE();
    api.getHotWords()
      .then((res) => {
        this.hotWords = res.data.searchHotWords;
        this.getRandom();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    ...mapState([
      'searchRecords'
    ])
  },
  methods: {
    ...mapMutations([
      'INIT_STATE',
      'ADD_SEARCH_RECORDS',
      'DEL_SEARCH_RECORDS',
      'EMPTY_SEARCH_RECORDS'
    ]),
    getRandom() {
      let arr = this.hotWords.slice();
      let arr1 = [];
      for (let i = 0; i < 10; i++) {
        let idx = Math.ceil(Math.random() * arr.length - 1);
        arr1.push(arr[idx]);
        arr.splice(idx, 1);
      }
      this.hotRandoms = arr1.slice();
    },
    search() {
      let keyWord = this.keyWord.trim().replace(/\s/g, '');
      if(keyWord === ''){
        return;
      }
      this.show = 'bs';
      this.ADD_SEARCH_RECORDS(keyWord);
      Indicator.open('查询中');
      api.fuzzySearch(keyWord)
        .then((res) => {
          Indicator.close();
          this.books = res.data.books;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removekey() {
      this.keyWord = '';
      this.show = 'kh';
      this.books = [];
    },
    selectKey(key) {
      this.keyWord = key;
      this.search();
    },
    deletekey(key) {
      this.DEL_SEARCH_RECORDS(key);
    },
    empty() {
      this.EMPTY_SEARCH_RECORDS();
    }
  },
  watch: {
    'keyWord': function() {
      let keyWord = this.keyWord.trim().replace(/\s/g, '');
      if (keyWord.length === 0) {
        this.show = 'kh';
        this.books = [];
      }
    }
  }
}

</script>
<style lang="less" scoped>
.hotWords {
  .hotHead {
    clear: both;
    overflow: hidden;
    display: block;
    content: '';
    padding: 0.5rem 1rem;
  }
  .sp1 {
    float: left;
    padding: 5px;
  }
  .sp2 {
    float: right;
    padding: 5px;
    border: 1px solid #777;
    border-radius: 4px;
    color: #777;
  }
  span {
    font-size: 12px;
  }
  ul {
    padding: 0 10px;
    display: inline-block;
    text-align: center;
    margin-bottom: 0.5rem;
    li {
      float: left;
      padding: 0px 8px !important;
      border-bottom: none;
      border: 1px solid #555 !important;
      margin: 4px;
      border-radius: 8px;
    }
  }
}

.input_icon {
  position: absolute;
  right: 22px;
  line-height: 25px;
  top: 9px;
}

input:focus {
  border-bottom: 2px #fff solid;
}

.del {
  padding: 0;
  position: absolute;
  right: 50px;
  background: #555;
  height: 18px;
  width: 18px;
  line-height: 18px;
  top: 11px;
  border-radius: 9px;
}

.searchContent {
  margin-top: 2.5rem;
}

.keywords {
  ul {
    text-align: left;
    li {
      line-height: 2rem;
      border-bottom: 1px solid #f1f1f1;
      list-style-type: none;
      padding-left: 1rem;
      font-size: 12px;
      i {
        padding-right: 1rem;
        font-size: 14px;
      }
    }
  }
}

.sp {
  display: -webkit-box;
  text-overflow: hidden;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2
}

.emp {
  text-align: center;
  color: #17E;
  font-size: 14px;
  cursor: pointer;
  padding-left: 0px !important;
}

</style>
