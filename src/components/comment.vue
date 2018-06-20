<template>
  <div class="comm">

    <Head :title="'评论详情'">
    </Head>
    <div style="padding-top:0.5rem;">
      <div class="comments">
        <div class="comment">
          <div class="bCom">
            <img class="img" :src="obj.author.avatar | staticUrl">
          </div>
          <div class="rCom">
            <p style="color:#2399bf">{{obj.author.nickname}}</p>
            <p class="">{{obj.content}}</p>
            <p class="wsp">
              <span>{{obj.commentCount}}回复</span>
              <span>{{obj.created | fmtDate('yyyy-MM-dd')}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="comments" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <div class="comment" v-for="(r,index) in reviews">
          <div class="bCom">
            <img class="img" :src="r.author.avatar | staticUrl">
          </div>
          <div class="rCom">
            <p style="color:#2399bf">{{r.author.nickname}}</p>
            <p class="sp">{{r.content}}</p>
            <p class="wsp">
              <span>{{r.created | fmtDate('yyyy-MM-dd')}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { InfiniteScroll } from 'mint-ui';
import api from '../api/api';
import Head from './plug/Head';
export default {
  name: 'comm',
  components: {
    Head
  },
  data() {
    return {
      obj: {
        author: {
          activityAvatar: '',
          nickname: ''
        }
      },
      id: '',
      reviews: [],
      page: 1,
      limit: 20,
      loading: false,
      activityAvatar: '',
      noHas: false
    }
  },
  created() {
    this.id = this.$route.params.cid;
    this.getReviewDetails(this.id);
    this.getReviewList(this.id);
  },
  methods: {
    loadMore() {
      if (this.noHas) {
        return;
      }
      this.loading = true;
      this.page++;
      this.getReviewList(this.id);
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    getReviewList(id) {
      api.getReviewList(id, this.page, this.limit)
        .then((res) => {
          for (let [index, b] of res.data.comments.entries()) {
            this.reviews.push(b);
          }
          if (res.data.comments.length === 0 || res.data.comments.length < this.limit) {
            this.noHas = true;
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getReviewDetails(id) {
      api.getReviewDetails(id)
        .then((res) => {
          this.obj = res.data.review;
          this.activityAvatar = this.obj.author.activityAvatar;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}

</script>
<style lang="less" scoped>
.comm {
  margin-top: 2.5rem;
  overflow: hidden;
}

</style>
