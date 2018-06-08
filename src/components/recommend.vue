<template>
  <div class="list">

    <Head :title="$route.params.name"></Head>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false" :style="scrH">
      <BookList :bookList="bookList" :imgClass="'sImg'"></BookList>
    </div>
  </div>
</template>
<script>
import { Indicator, InfiniteScroll } from 'mint-ui';
import api from '../api/api';
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
      page: 1,
      size: 20,
      loading: false,
      scrH: {
        'height': '',
        'overflow': 'auto'
      }
    }
  },
  created() {
    this.scrH.height = window.innerHeight - 40 + 'px';
    this.getChoiceBooks();
  },
  methods: {
    getChoiceBooks() {
      let id = this.$route.query.id;
      Indicator.open('加载中');
      api.getChoiceBooks(id, this.page, this.size)
        .then((res) => {
          Indicator.close();
          this.bookList.push(...res.data.data);
        })
        .catch((err) => {
          console.log(err)
        });
    },
    loadMore() {
      this.loading = true;
      this.page++;
      this.getChoiceBooks();
      setTimeout(() => {
        this.loading = false;
      }, 2500);
    }
  }
}

</script>
<style scoped>
.list {
  margin-top: 2.5rem;
  overflow: hidden;
}

</style>
