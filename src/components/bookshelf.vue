<template>
  <div class="bookshelf">

    <Head :isBack="false" :title="'作品'">
      <i slot="right" class="mintui mintui-search" @click="goSearch"></i>
      <i slot="right" class="mintui mintui-shanchu" @click="empty" v-if="!isDiv"></i>
    </Head>
    <div class="page-tab-container">
      <div class="content">
        <div class="books" v-for="(b,index) in bookShelfList" @click="details(b,false)" :key="index">
          <div class="bLeft">
            <img :src="b.cover | staticUrl" class="sImg">
          </div>
          <div class="sug tf">
            <div class="sugge">{{b.title}}</div>
            <div class="sugge">{{b.author}}</div>
            <div class="sugge">
              <span>{{b.lastChapter}}</span>
              <a><i class="mintui mintui-gengduo" @click.stop="more(b)"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isDiv" class="isDiv">
        <img src="/static/paper.png">
        <div class="nodes">
          暂无书籍
        </div>
        <div class="brower">
          <router-link to="/choice">
            去书库找找
            <i>&gt;</i>
          </router-link>
        </div>
      </div>
      <div class="brower">
        <router-link to="/browseRecords">
          浏览记录
          <i>&gt;</i>
        </router-link>
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" class="popup">
      <div>
        <div class="d1">
          <img :src="book.cover | staticUrl">
          <div>{{book.title}}</div>
          <div>{{book.author}}</div>
        </div>
        <div class="d3">
          {{book.longIntro}}
        </div>
        <div class="d2">
          最新:<span>{{book.lastChapter}}</span>
        </div>
        <div class="operate">
          <div class="ope" @click="details(book,true)">
            <i class="mintui mintui-mulu"></i>
            <div>详情</div>
          </div>
          <div class="ope" @click="delBook(book.id)">
            <i class="mintui mintui-shanchu"></i>
            <div>删除</div>
          </div>
          <div class="ope">
            <i class="mintui mintui-zhiding"></i>
            <div>置顶</div>
          </div>
          <div class="ope">
            <i class="mintui mintui-fenxiang"></i>
            <div>分享</div>
          </div>
        </div>
      </div>
    </mt-popup>
    <Dialog v-show="showDialog" :dialogObj="dialogOptions" ref="dialog">
    </Dialog>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import api from '../api/api';
import { Indicator } from 'mint-ui';
import Dialog from './plug/Dialog';
import Head from './plug/Head';
export default {
  name: 'bookshelf',
  components: {
    Dialog,
    Head
  },
  data() {
    return {
      book: {},
      popupVisible: false,
      isDiv: false,
      showDialog: false,
      dialogOptions: {
        title: '温馨提示',
        content: '确定要清空您的书架?'
      }
    }
  },
  created() {
    this.INIT_STATE();
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
      'DEL_SHELF',
      'EMPTY_SHELF'
    ]),
    delBook(id) {
      this.DEL_SHELF(id);
      this.popupVisible = false;
    },
    more(obj) {
      this.book = obj;
      this.popupVisible = true;
    },
    details(book,bool) {
      this.popupVisible = false;
      if(book.already === '' || bool){
        this.$router.push({
          name: 'bookDetails',
          params: { id: book.id }
        });
      }else {
        this.$router.push({
          name: 'chapter',
          params: { id: book.id },
          query: { isChap: false }
        });
      }
    },
    goSearch() {
      this.$router.push('searchBook')
    },
    empty() {
      this.showDialog = true;
      this.$refs.dialog.promiseFn()
        .then(() => {
          this.EMPTY_SHELF();
          this.showDialog = false;
        })
        .catch(() => {
          this.showDialog = false;
        });
    }
  },
  watch: {
    'bookShelfList': function() {
      if (this.bookShelfList.length === 0) {
        this.isDiv = true;
      }else {
        this.isDiv = false;
      }
    }
  }
}

</script>
<style lang="less" scoped>
.bookshelf {
  margin-bottom: 3.5rem;
  overflow: hidden;
}

.content {
  margin-bottom: 1rem;
}

.content .books:last-child {
  border-bottom: 1px solid #ddd;
}

.popup {
  width: 100%;
  font-family: 宋体;
}

.d3 {
  font-size: 14px;
  text-align: left;
  letter-spacing: 1px;
  padding: 0.5rem 0.5rem;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  line-height: 22px;
}

.d1 {
  line-height: 4rem;
  height: 4rem;
  background-image: url(/static/bc.png);
  color: #EE7700;
  text-align: left;
  img {
    width: 4rem;
    height: 4.5rem;
    float: left;
    margin-top: -0.5rem;
    padding-left: 0.5rem;
  }

  div {
    line-height: 2rem;
    font-size: 14px;
    padding-left: 5.5rem;
    &:last-child {
      color: #666;
      font-size: 12px;
    }
  }
}

.d2 {
  text-align: left;
  padding: 1rem 0.5rem;
  font-size: 12px;
  border-bottom: 1px solid #ddd;
}

.operate {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .ope {
    width: 3.8rem;
    padding: 1rem 0;
    div {
      font-size: 14px;
      margin-top: 0.3rem;
    }
    i {
      font-size: 20px;
    }
  }
}

</style>
