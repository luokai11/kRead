<template>
  <div class="chapter">

    <Head :title="'目录'" v-show="sb">
    </Head>
    <div v-show="sb">
      <p class="cpd">共<span>{{chapters.length}}</span>章</p>
      <div class="chap">
        <v-bar wrapper="wrapper" vBar="false" vBarInternal="false">
          <div>
            <p v-for="(c,idx) in chapters" @click="getContent(idx,c)" :class="{selectd:idx === index}">{{c.title}}<span v-if="c.isVip" style="color:red;float: right;    padding-right: 5px;">vip</span>
            </p>
          </div>
        </v-bar>
      </div>
    </div>
    <div v-show="!sb" class="bc" :style="[typeFace[face],bgColor[skinColor]]">
      <div id="banner" :style="screen">
        <div class="swiper-container" style="height:inherit" @click="showPop">
          <swiper :options="swiperOption" ref="mySwiper" style="height:inherit">
            <swiper-slide :key="index" class="swiper-slide" v-for="(i,index) in bArr" v-html="i">{{i}}</swiper-slide>
          </swiper>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <div ref="popupTop" class="popupTop setUp" :class="{'popTop':popModal}">
      <div class="setLeft">
        <span class="back" @click="back"><i class="mintui mintui-back"></i></span>
      </div>
      <div class="setRight" @click="getContent(index)">
        <span>刷新</span>
      </div>
    </div>
    <div class="modal" v-show="popModal" @click="close">
    </div>
    <mt-popup v-model="popupVisible" position="bottom" :modal="false" class="popup">
      <div class="down" v-show="popChange==='nor'">
        <div class="item" @click="backList">
          <i class="mintui mintui-mulu"></i>
          <div>目录</div>
        </div>
        <div class="item" @click="changeNight">
          <div v-show="!isNight" @click="changeSkin(5)">
            <i class="mintui mintui-taiyang"></i>
            <div>日间模式</div>
          </div>
          <div v-show="isNight" @click="changeSkin(0)">
            <i class="mintui mintui-yueliang"></i>
            <div>夜间模式</div>
          </div>
        </div>
        <div class="item" @click="popChange = 'setUp'">
          <i class="mintui mintui-ziti"></i>
          <div>设置</div>
        </div>
      </div>
      <div v-show="popChange==='setUp'">
        <div class="flex fl_mg">
          <div class="fl_item" @click="changeSize('small')">small</div>
          <div class="fl_item" @click="changeSize('normal')">normal</div>
          <div class="fl_item" @click="changeSize('big')">big</div>
          <div class="fl_item" @click="changeSize('large')">large</div>
        </div>
        <div class="flex fl_mg">
          <div v-for="(item,index) in bgColor" :key="index" :style="item" class="bgc" @click="changeSkin(index)">
            <i class="mintui mintui-success icon" v-show="+skinColor===index"></i>
          </div>
        </div>
      </div>
    </mt-popup>
    <Dialog v-show="showDialog" :dialogObj="dialogOptions" ref="dialog"></Dialog>
  </div>
</template>
<script>
import VBar from 'v-bar';
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { Indicator } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
import api from '../api/api';
import { bgColor, typeFace } from '../common/common';
import Head from './plug/Head';
import Dialog from './plug/Dialog';
export default {
  name: 'chapter',
  components: { VBar, swiper, swiperSlide, Head, Dialog },
  data() {
    return {
      chapters: [],
      bArr: [],
      bgColor: bgColor,
      popupVisible: false,
      popModal: false,
      showDialog: false,
      ps: '',
      sb: false,
      content: '',
      title: '',
      bidx: '',
      index: '',
      screen: {
        'height': '0px',
        'width': ''
      },
      dialogOptions: {
        title: '加入书架',
        content: '喜欢本书就加入书架吧！',
        cancelText: '不用了',
        confirmText: '加入书架'
      },
      popChange: 'nor',
      typeFace: typeFace,
      swiperOption: {
        direction: 'horizontal',
        effect: 'coverflow',
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        on: {
          touchEnd: () => {
            if (this.swiper.activeIndex === 0 && this.swiper.swipeDirection === 'prev') {
              this.getContent(this.index - 1);
            }
            if (this.swiper.activeIndex === (this.swiper.slidesGrid.length - 1) && this.swiper.swipeDirection === 'next') {
              this.getContent(this.index + 1);
            }
          },
        },
      },
    }
  },
  methods: {
    ...mapMutations([
      'INIT_STATE',
      'SET_CUR_BOOK',
      'UPDATA_SHELF',
      'SET_NIGHT',
      'SET_FACE',
      'SET_SKIN_COLOR',
      'ADD_SHELF'
    ]),
    changeSkin(idx) {
      let index = idx;
      this.SET_SKIN_COLOR(index);
    },
    changeNight() {
      let bool = !this.isNight;
      this.SET_NIGHT(bool);
    },
    changeSize(type) {
      this.SET_FACE(type);
      this.bArr = [];
      this.ps = this.setTextFmt(this.content, this.title)
      this.bArr = this.ps.split('\n');
    },
    backList() {
      this.popupVisible = false;
      this.popModal = false;
      this.sb = true;
    },
    close() {
      this.popupVisible = false;
      this.popModal = false;
    },
    showPop() {
      this.bidx = this.skinColor;
      this.popChange = 'nor';
      this.popupVisible = true;
      this.popModal = true;
    },
    back() {
      this.$router.go(-1);
    },
    getContent(index) {
      this.popupVisible = false;
      this.popModal = false;
      this.bArr = [];
      if (index < 0) {
        this.index = 0;
        return;
      }
      this.index = index;
      Indicator.open();
      api.getChapterContent(this.chapters[index].id)
        .then((res) => {
          Indicator.close();
          let book = this.curBook;
          book.already = index;
          this.SET_CUR_BOOK(book);
          this.UPDATA_SHELF(book);
          this.sb = false;
          this.content = res.data.chapter.cpContent;
          this.title = res.data.chapter.title;
          this.$nextTick(function() {
            if (!res.data.chapter.isVip) {
              this.ps = this.setTextFmt(this.content, this.title)
              this.bArr = this.ps.split('\n');
              this.swiper.slideTo(0, 10, false)
            } else {
              var str = '<h4 style="padding-bottom:1rem;font-weight: 100;">' + res.data.chapter.title + '</h4>' + '<div style="text-align:center;">收费章节,请到正版网站阅读</div>';
              this.bArr.push(str);
            }
          })
        })
        .catch((error) => {
          Indicator.close();
        })
    },
    setTextFmt(s, title) {
      var style = this.typeFace[this.face];
      var lineH = +style.lineHeight.replace(/px$/, '');
      var pageH = window.innerHeight - 40 - 16 - lineH;
      var pageW = window.innerWidth - 32;
      var letterSpacing = style.letterSpacing ? +style.letterSpacing.replace(/px$/, '') : 0;
      var fwidth = +style.fontSize.replace(/px$/, '') + letterSpacing;
      var maxLine = Math.floor(pageH / lineH);
      var pageLength = 0; // 页面长度计数器，单位：行
      var lineWidth = 0; // 单行长度计数器，单位：像素
      var articleStr = ''; // 文章内容存储
      var pageStr = ''; // 页面内容存储
      var lineStr = ''; // 单行内容存储
      var lineCharCounter = 0; // 每行字数计数器
      var spaceWidth = 0; // 剩余空白区域宽度
      var curChar = ''; // 当前检索的字符
      var wordNum = 0; // 文字编号
      var arr = s.split('\n');
      for (let i = 0, l = arr.length; i < l; i++) {
        var j = 0;
        var l1 = arr[i].length;
        while (j < l1) {
          let cur = arr[i][j];
          if (pageLength < maxLine) { // 每页未满
            lineWidth += fwidth;
            if (lineWidth < pageW) {
              lineStr += '<span>' + cur + '</span>';
              lineCharCounter += cur.length;
              j++;
            } else {
              pageW - lineWidth + fwidth;
              lineStr += '<span>' + cur + '</span>';
              spaceWidth = spaceWidth - fwidth;
              lineCharCounter += curChar.length;
              j++;
              if (Math.abs(spaceWidth) > 1) {
                pageStr += '<p>' + lineStr + '</p>';
              }
              pageLength++;
              // 初始化
              lineStr = '';
              lineWidth = 0;
              lineCharCounter = 0;
            }
          } else { // 每页已满
            pageStr = '<h6 style="padding-bottom:1rem;font-weight: 100;">' + title + '</h6>' + '<div>' + pageStr + '</div>' + '\n';
            articleStr += pageStr;
            // 初始化
            pageStr = '';
            pageLength = 0;
          }
        }
        // 每段结束
        if (lineStr.length > 0) { // 内容还没有被存储
          pageStr += '<p>' + lineStr + '</p>';
          pageLength++;
          // 初始化
          lineStr = '';
          lineWidth = 0;
          lineCharCounter = 0;
        }
      }
      // 全部文章结束
      pageStr = '<h6 style="padding-bottom:1rem;font-weight: 100;">' + title + '</h6>' + '<div>' + pageStr + '</div>';
      articleStr += pageStr;
      // 初始化
      pageStr = '';
      pageLength = 0;
      return articleStr;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.curBook.isShelf && !this.sb) {
      this.showDialog = true;
      this.$refs.dialog.promiseFn()
        .then(() => {
          let book = this.curBook;
          book.isShelf = true;
          this.SET_CUR_BOOK(book);
          this.ADD_SHELF(book);
          this.showDialog = false;
          next();
        })
        .catch((r) => {
          this.showDialog = false;
          if (r === 'close') {
            next(false);
          } else {
            next();
          }
        });
    } else {
      next();
    }
  },
  created() {
    this.sb = this.$route.query.isChap ? true : false;
    this.INIT_STATE();
    this.bidx = this.skinColor;
    this.screen.height = window.innerHeight - 16 + 'px';
    this.screen.width = window.innerWidth - 28 + 'px';
    Indicator.open();
    api.getChapters(this.$route.params.id)
      .then((res) => {
        this.chapters = res.data.chapters;
        if (this.$route.query.isChap) {
          Indicator.close();
          return;
        }
        this.index = this.curBook.already;
        this.getContent(this.index);
      });
  },
  computed: {
    ...mapState([
      'curBook',
      'isNight',
      'skinColor',
      'face'
    ]),
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  }
}

</script>
<style lang="less" scoped>
.chapter {
  overflow: hidden;
  background-color: #fff;
  .cpd {
    text-align: left;
    font-size: 14px;
    line-height: 20px;
    padding: 10px 16px;
    border-bottom: 1px solid #ddd;
    margin-top: 40px;
  }
}

.chap {
  margin-top: 40px;
  overflow: hidden;
  position: absolute;
  top: 40px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
  display: flex;
  p {
    text-align: left;
    line-height: 20px;
    padding: 10px 16px;
    border-bottom: 1px solid #ddd;
    font-size: 12px;
  }
  .wrapper {
    width: 100%;
    overflow: hidden;
  }
}

.bc {
  font-family: SimSun;
  text-align: left;
  #banner {
    padding: 0.5rem 0;
    margin: 0px auto;
  }
}

.popup {
  width: 100%;
  font-family: SimSun;
  background-color: #000;
  color: #fff;
}

.popupTop {
  position: fixed;
  width: 100%;
  top: -50px;
  background: #000;
  color: #fff;
  height: 0px;
  transition: 0.2s ease-out;
}

.popTop {
  top: 0;
  height: 2.5rem;
}

.down {
  display: flex;
  justify-content: space-around;
  .item {
    padding: 0.5rem 0;
    width: 5rem;
  }
}

.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 99;
}

.bgc {
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 1.25rem;
}

.selectd {
  color: red;
}

.icon {
  font-size: 20px;
  color: rgb(17, 17, 17);
  display: inline-block;
  padding: 10px 0;
}

.swiper-pagination {
  position: relative;
  bottom: 16px;
  font-size: 12px;
  text-align: left;
}

.fl_item {
  width: 20%;
  border: 1px solid #fff;
  padding: 5px 0;
  border-radius: 4px;
}

.fl_mg {
  margin: 1rem 0;
}

</style>
