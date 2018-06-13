<template>
  <div class="list">

    <Head :title="$route.params.name"></Head>
    <div v-if="isShow">
      <div class="selects select-pos" @click="openDown">
        <span>{{minor===''? '全部' : minor}}</span>
        <span>-</span>
        <span>按{{typeName}}</span>
        <span><i class="mintui mintui-xiangxia down"></i></span>
      </div>
      <div class="selects select-pos" v-show="bShow">
        <div class="select-item">
          <div class="scr">
            <ul>
              <li v-for="i in types" :class="{active:i.value===type}" @click="selectType(i)">
                {{i.text}}</li>
            </ul>
          </div>
        </div>
        <div class="select-item">
          <div class="scr">
            <ul>
              <li :class="{active:minor === ''}" @click="selectMins('')">全部</li>
              <li v-for="i in mins" :class="{active:minor === i}" @click="selectMins(i)">
                {{i}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div :style="scrH" ref="bList" class="bList" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
      <BookList :bookList="bookList" :imgClass="'sImg'"></BookList>
    </div>
  </div>
</template>
<script>
import { Indicator, InfiniteScroll } from 'mint-ui';
import api from '../api/api';
import { types } from '../common/common';
import Head from './plug/Head';
import BookList from './plug/BookList';
export default {
  name: 'list',
  components: {
    Head,
    BookList
  },
  data() {
    return {
      bookList: [],
      loading: false,
      gender: '',
      type: 'hot',
      typeName: '热门',
      major: '',
      minor: '',
      limit: 20,
      page: 1,
      mins: [],
      types: types,
      scrH: {
        'height': ''
      },
      isShow: false,
      bShow: true
    }
  },
  created() {
    this.$navigation.on('forward', (to, from) => {
      document.title = this.$route.params.name;
    });
    this.major = this.$route.params.name;
    this.gender = this.$route.query.gender;
    this.scrH.height = window.innerHeight - 64 - 40 + 'px';
    if (this.gender === 'press') {
      this.scrH.height = window.innerHeight - 40 + 'px';
    }
    api.getCategoryDetails()
      .then((res) => {
        for (let obj of res.data[this.gender]) {
          if (obj.major === this.$route.params.name) {
            this.mins = obj.mins.slice(0);
          }
        }
      })
      .catch((err) => {
        console.log(err)
      });
    this.getListByCate();
  },
  mounted() {
    let box = this.$refs.bList;
    if (this.gender === 'press') {
      box.style.marginTop = '2.5rem';
    }
    box.addEventListener('scroll', () => {
      if (this.gender === 'press') {
        return;
      }
      let scrollTop = box.scrollTop;
      if (scrollTop === 0) {
        this.bShow = true;
        box.style.marginTop = '6.5rem';
        this.scrH.height = window.innerHeight - 64 - 40 + 'px';
      } else {
        this.bShow = false;
        box.style.marginTop = '4.5rem';
        this.scrH.height = window.innerHeight - 32 - 40 + 'px';
      }
    }, false)
  },
  methods: {
    openDown() {
      this.bShow = true;
    },
    getListByCate(isChange) {
      if (isChange) {
        this.bookList = [];
        this.page = 1;
      }
      Indicator.open('加载中');
      api.getListByCate(this.gender, this.type, this.major, this.minor, this.page, this.limit)
        .then((res) => {
          Indicator.close();
          this.isShow = true;
          if (this.gender === 'press') {
            this.isShow = false;
          }
          for (let obj of res.data.books) {
            this.bookList.push(obj);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadMore() {
      this.loading = true;
      this.page++;
      this.getListByCate(false);
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    selectMins(minor) {
      if (this.minor === minor) {
        return;
      }
      this.minor = minor;
      this.getListByCate(true);
    },
    selectType(i) {
      if (this.type === i.value) {
        return;
      }
      this.type = i.value;
      this.typeName = i.text;
      this.getListByCate(true);
    }
  },
}

</script>
<style lang="less" scoped>
.down {
  vertical-align: middle;
}

.bList {
  overflow-y: auto;
  margin-top: 6.5rem;
}

.selects {
  background-color: #f1f1f1;
  color: #000;
  font-family: STXingkai;
  font-size: 14px;
}

.select-pos {
  position: absolute;
  background-color: #f1f1f1;
  top: 2.5rem;
  left: 0;
  width: 100%;
  line-height: 2rem;
  opacity: 1;
  -webkit-transition: all .1s ease;
  z-index: 100;
}

.select-item {
  .scr {
    overflow: hidden;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
  }
  ul {
    font-size: 0;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    text-align: left;
    height: 2rem;
    li {
      display: inline-block;
      font-size: 14px;
      text-align: left;
      padding: 0 0.5rem;
      cursor: pointer;
      &:first-child {
        padding-left: 1rem;
      }
    }
  }
}

.active {
  color: #f00;
}

</style>
