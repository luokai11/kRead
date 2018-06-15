<template>
  <div class="records">

    <Head>
      <div class="back" slot="left">
        浏览记录
      </div>
      <i class="mintui mintui-shanchu" @click="empty" slot="right" v-if="!isDiv"></i>
    </Head>
    <div class="content">
      <div class="books" v-for="(b,index) in browseRecords" @click="details(b,false)">
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
        暂无浏览记录
      </div>
      <div class="brower">
        <router-link to="/choice">
          去书库找找
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
        <div class="d2">
          最新:<span>{{book.lastChapter}}</span>
        </div>
        <div class="operate">
          <div class="ope" @click="details(book,true)">
            <i class="mintui mintui-mulu"></i>
            <div>详情</div>
          </div>
          <div class="ope" @click="addBook(book)">
            <i class="mintui mintui-jiarushujia"></i>
            <div>加入书架</div>
          </div>
          <div class="ope" @click="delBook(book.id)">
            <i class="mintui mintui-shanchu"></i>
            <div>删除</div>
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
import Dialog from './plug/Dialog';
import Head from './plug/Head';
export default {
  name: 'records',
  components: {
    Dialog,
    Head
  },
  data() {
    return {
      popupVisible: false,
      book: {},
      isDiv: false,
      showDialog: false,
      dialogOptions: {
        title: '温馨提示',
        content: '确定要清空您的浏览记录?'
      }
    }
  },
  created() {
    if(this.browseRecords.length === 0){
      this.isDiv = true;
    }
  },
  computed: {
    ...mapState([
      'browseRecords'
    ])
  },
  methods: {
    ...mapMutations([
      'INIT_STATE',
      'DEL_BROWSE_RECORDS',
      'ADD_SHELF',
      'EMPTY_BROWSE_RECORDS'
    ]),
    delBook(id) {
      this.DEL_BROWSE_RECORDS(id);
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
    addBook(obj) {
      this.popupVisible = false;
      let book = obj;
      book.isShelf = true;
      this.ADD_SHELF(book);
      this.DEL_BROWSE_RECORDS(book.id);
    },
    empty() {
      this.showDialog = true;
      this.$refs.dialog.promiseFn()
        .then(() => {
          this.EMPTY_BROWSE_RECORDS();
          this.showDialog = false;
        })
        .catch(() => {
          this.showDialog = false;
        });
    }
  },
  watch: {
    'browseRecords': function() {
      if (this.browseRecords.length === 0) {
        this.isDiv = true;
      }else {
        this.isDiv = false;
      }
    }
  }
}

</script>
<style lang="less" scoped>
.records {
  margin-top: 2.5rem;
}

.content .books:last-child {
  border-bottom: 1px solid #ddd;
}

.popup {
  width: 100%;
  font-family: 宋体;
}

.d1 {
  line-height: 4rem;
  height: 4rem;
  background-image: url(/static/bc.png);
  color: #EE7700;
  text-align: left;
}

.d1 div {
  line-height: 2rem;
  font-size: 14px;
  padding-left: 5.5rem;
  &:last-child {
    color: #666;
    font-size: 12px;
  }
}

.d1 img {
  width: 4rem;
  height: 4.5rem;
  float: left;
  margin-top: -0.5rem;
  padding-left: 0.5rem;
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
}

.operate .ope {
  width: 3.8rem;
  padding: 1rem 0;
}

.ope i {
  font-size: 20px;
}

.ope div {
  font-size: 14px;
  margin-top: 0.3rem;
}

</style>
