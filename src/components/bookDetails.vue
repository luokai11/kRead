<template>
  <div class="detail" ref="wrapper">
    <div class="bg">

      <Head class="bg">
        <div class="fd" :class="{top:istop}" slot="left">
          <span class="back" @click="back"><i class="mintui mintui-back"></i></span> {{obj.title}}
        </div>
      </Head>
      <div class="bookDe">
        <div class="books">
          <div class="bLeft">
            <img :src="obj.cover | staticUrl" class="bImg">
          </div>
          <div class="bRight">
            <div>{{obj.title}}</div>
            <div class="sugge">{{obj.author}}</div>
            <div class="sugge">{{obj.minorCate}}</div>
            <div class="sugge">
              <div class="star-rating">
                <div class="star-rating-top" ref="star">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <div class="star-rating-bottom">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
            </div>
            <div class="sugge"><span>{{obj.wordCount | convert}}</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav">
      <div class="item3">
        <p class="p1">人气</p>
        <p>{{obj.latelyFollower}}</p>
      </div>
      <div class="item3">
        <p class="p1">留存率</p>
        <p>{{obj.retentionRatio+'%'}}</p>
      </div>
      <div class="item3">
        <p class="p1">日更/字</p>
        <p>{{obj.serializeWordCount}}</p>
      </div>
    </div>
    <div class="synopsis">
      <p>简介</p>
      <p class="sp" id="slide" @click="slide">{{obj.longIntro}}</p>
      <i @click="slide" v-show="showDown" class="mintui mintui-xiangxia"></i>
    </div>
    <div class="content">
      <mt-cell title="目录" is-link class="mt-cell" @click.native="goRead(true)">
        <span>连载至{{obj.chaptersCount}}章</span>&nbsp;
        <span>更新于{{obj.updated | fmtDate('yyyy-MM-dd')}}</span>
      </mt-cell>
    </div>
    <div class="content" style="background-color:#fff;">
      <mt-cell title="书评" :value="totalCount+'人评论'" is-link class="mt-cell">
      </mt-cell>
      <div class="comments">
        <div class="comment" v-for="(r,index) in reviews" v-if="index < 3" @click="commentDetails(r)">
          <div class="bCom">
            <img :src="r.author.avatar | staticUrl">
          </div>
          <div class="rCom">
            <p style="color:#2399bf">{{r.author.nickname}}</p>
            <p class="sp">{{r.content}}</p>
            <p class="wsp">
              <span>{{r.commentCount}}回复</span>
              <span>{{r.created | fmtDate('yyyy-MM-dd')}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="content" style="margin-bottom:3rem;">
      <mt-cell title="同类推荐" value="更多" is-link class="mt-cell">
      </mt-cell>
      <div style="overflow:hidden">
        <div class="boxs sx" style="margin-bottom: -6px;overflow-x: scroll;">
          <div class="box pdr" v-for="(b,index) in bookList" v-if="index -1 <6" @click="details(b)">
            <div>
              <img :src="b.cover | staticUrl">
            </div>
            <div>
              {{b.title}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex fixed items">
      <div class="item2 bs" @click="goRead(false)">
        <p>立即阅读</p>
      </div>
      <div class="item2 bs" @click="add" v-show="!isAdd">
        <i class="mintui mintui-jiarushujia"></i>
        <p>加入书架</p>
      </div>
      <div class="item2 bs opa" v-show="isAdd">
        <i class="mintui mintui-jiarushujia"></i>
        <p>已加入</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import api from '../api/api';
import Head from './plug/Head';
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'detail',
  components: {
    Head
  },
  data() {
    return {
      istop: false,
      bookList: [],
      obj: {},
      showDown: true,
      reviews: [],
      totalCount: '',
      isAdd: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  created() {
    this.INIT_STATE();
    document.title = '详情';
    let id = this.$route.params.id;
    let isShelf = false;
    for (let obj of Object.values(this.bookShelfList)) {
      if (obj.id === id) {
        this.SET_CUR_BOOK(obj);
        isShelf = true;
        break;
      }
    }
    if (!isShelf) {
      this.SET_CUR_BOOK({
        id: id,
        title: '',
        author: '',
        cover: '',
        lastChapter: '',
        longIntro: '',
        updated: '',
        already: '',
        isShelf: ''
      });
    }
    this.isAdd = this.curBook.isShelf;
    this.getBook();
    this.getRecommend();
    this.getHotReview();
  },
  computed: {
    ...mapState([
      'curBook',
      'bookShelfList'
    ])
  },
  methods: {
    ...mapMutations([
      'INIT_STATE',
      'SET_CUR_BOOK',
      'ADD_SHELF',
      'ADD_BROWSE_RECORDS',
      'DEL_BROWSE_RECORDS'
    ]),
    add() {
      let book = this.curBook;
      book.isShelf = true;
      this.isAdd = true;
      this.SET_CUR_BOOK(book);
      this.ADD_SHELF(book);
      this.DEL_BROWSE_RECORDS(book.id);
    },
    handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= 200) {
        this.istop = true;
      } else {
        this.istop = false;
      }
    },
    getRecommend() {
      api.getRecommend(this.$route.params.id)
        .then((res) => {
          this.bookList = res.data.books;
        });
    },
    getHotReview() {
      api.getHotReview(this.$route.params.id)
        .then((res) => {
          this.reviews = res.data.reviews;
          this.totalCount = res.data.total;
        });
    },
    getBook() {
      Indicator.open();
      api.getBook(this.$route.params.id)
        .then((res) => {
          Indicator.close();
          this.obj = res.data;
          let book = this.curBook;
          book.title = this.obj.title;
          book.author = this.obj.author;
          book.updated = this.obj.updated;
          book.cover = this.obj.cover;
          book.lastChapter = this.obj.lastChapter;
          book.longIntro = this.obj.longIntro;
          this.SET_CUR_BOOK(book);
          this.ADD_BROWSE_RECORDS(book);
          this.updated = this.obj.lastChapter + '   ' + this.obj.updated;
          this.getStar(res.data.rating.score);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    back() {
      this.$router.go(-1);
    },
    getStar(rating) {
      var star = this.$refs.star;
      star.style.width = (rating / 10) * 100 + '%';
    },
    slide() {
      var p = document.getElementById('slide');
      if (this.showDown) {
        p.style.display = 'block';
      } else {
        p.style.display = '-webkit-box';
      }
      this.showDown = !this.showDown;
    },
    goRead(isChapter) {
      if (isChapter) {
        this.$router.push({
          name: 'chapter',
          params: { id: this.$route.params.id },
          query: { isChap: isChapter }
        });
      } else {
        this.$router.push({
          name: 'chapter',
          params: { id: this.$route.params.id }
        });
      }
    },
    commentDetails(r) {
      this.$router.push({
        name: 'comment',
        params: { cid: r._id }
      });
    },
    details(b) {
      this.$router.push({
        name: 'bookDetails',
        params: { id: b._id }
      });
    }
  },
  watch: {
    '$route': function() {
      this.isAdd = this.curBook.isShelf;
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.getBook();
    this.getRecommend();
    this.getHotReview();
    next();
  }
}

</script>
<style lang="less" scoped>
.wsp {
  font-size: 12px;
  color: #666;
  padding-bottom: 0.5rem;
  span:first-child {
    padding-right: 0.5rem;
  }
}

.comment {
  clear: both;
  overflow: hidden;
}

.bCom {
  float: left;
  padding-left: 1rem;
  width: 18%;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 1.5rem;
  }
}

.rCom {
  float: right;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
  width: 75%;
  p {
    width: 226px;
    word-break: break-all;
  }
}

.detail {
  background-color: #ddd;
}

.synopsis {
  background-color: #fff;
  padding: 1rem;
  text-align: left;
  margin-bottom: 0.5rem;
  i {
    position: relative;
    float: right;
    right: -13px;
    top: -21px;
  }
}

.sp {
  margin: 0.5rem 0;
  display: -webkit-box;
  text-overflow: hidden;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: #444;
  font-size: 12px;
}

.bg {
 /* background: url('/static/bc.png') no-repeat bottom;
  background-size: 100% 100%;
  background-attachment: fixed;*/
  background-color:#000;
}

.back {
  padding: 0 1rem;
}

.bookDe {
  padding-top: 2.5rem;
}

.fd {
  text-align: left;
  display: none;
  position: relative;
  height: 2.5rem;
  line-height: 2.5rem;
  width: 100%;
  color: #fff;
  /*background: url('/static/bc.png') no-repeat;*/
}

.top {
  display: block;
  top: 0;
  z-index: 4;
  position: fixed;
}

.opa {
  opacity: 0.5;
}

</style>
