<template>
  <div class="detail" ref="wrapper">
    <div class="bg">

      <Head class="bg">
        <div class="fd" :class="{top:istop}" slot="left">
          <span class="back" @click="back"><i class="mintui mintui-back"></i></span> {{curBook.title}}
        </div>
      </Head>
    </div>
    <BookDe :bId="id" ref="BookDe"></BookDe>
    <Comm :bId="id"></Comm>
    <Recommend :bId="id"></Recommend>
    <BookMeu></BookMeu>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import api from '../api/api';
import Head from './plug/Head';
import { mapState, mapMutations } from 'vuex';
import BookDe from './plug/BookDe';
import Comm from './plug/Comm';
import Recommend from './plug/Recommend';
import BookMeu from './plug/BookMeu';
export default {
  name: 'detail',
  components: {
    Head,
    BookDe,
    Comm,
    Recommend,
    BookMeu
  },
  provide: function() {
    return {
      goRead: this.goRead
    }
  },
  data() {
    return {
      istop: false,
      id: ''
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  created() {
    this.INIT_STATE();
    document.title = '详情';
    this.id = this.$route.params.id;
    let isShelf = false;
    for (let obj of Object.values(this.bookShelfList)) {
      if (obj.id === this.id) {
        this.SET_CUR_BOOK(obj);
        isShelf = true;
        break;
      }
    }
    if (!isShelf) {
      this.SET_CUR_BOOK({
        id: this.id,
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
      'SET_CUR_BOOK'
    ]),
    handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= 200) {
        this.istop = true;
      } else {
        this.istop = false;
      }
    },
    back() {
      this.$router.go(-1);
    },
    goRead(isChapter) {
      if (isChapter) {
        this.$router.push({
          name: 'chapter',
          params: { id: this.id },
          query: { isChap: isChapter }
        });
      } else {
        this.$router.push({
          name: 'chapter',
          params: { id: this.id }
        });
      }
    }
  }
}

</script>
<style lang="less" scoped>
.detail {
  background-color: #ddd;
}

.bg {
  background-color: #000;
}

.back {
  padding: 0 1rem;
}

.fd {
  text-align: left;
  display: none;
  position: relative;
  height: 2.5rem;
  line-height: 2.5rem;
  width: 100%;
  color: #fff;
}

.top {
  display: block;
  top: 0;
  z-index: 4;
  position: fixed;
}

</style>
