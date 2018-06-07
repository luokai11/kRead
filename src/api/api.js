import axios from 'axios';

// const api = 'http://api.zhuishushenqi.com';
// const chapter = 'http://chapter2.zhuishushenqi.com/chapter/http://vip.zhuishushenqi.com';
const api = '/api';
const chapter = '/chapter';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 20000;

export default {
  //获取所有的排行榜
  getRank() {
    return axios.get(api + '/ranking/gender');
  },

  //根据id获取排行榜内容
  getRankList(id) {
    return axios.get(api + '/ranking/' + id);
  },

  //获取所有分类
  getCategory() {
    return axios.get(api + '/cats/lv2/statistics');
  },

  //获取所有小说分类
  getCategoryDetails() {
    return axios.get(api + '/cats/lv2');
  },

  //根据分类获取小说列表(type:hot,new,reputation,over,monthly)
  getListByCate(gender, type, major, minor = '', page, limit) {
    return axios.get(api + '/book/by-categories?gender=' + gender + '&type=' + type + '&major=' + major + '&minor=' + minor + '&start=' + (page - 1) * limit + '&limit=' + limit);
  },

  //根据id获取小说
  getBook(bookId) {
    return axios.get(api + '/book/' + bookId);
  },

  //获取小说正版源
  getGenuineSource(bookId) {
    return axios.get(api + '/btoc?view=summary&book=' + bookId);
  },

  //获取小说源(正版源与盗版源)
  getMixSource(bookId) {
    return axios.get(api + '/atoc?view=summary&book=' + bookId);
  },

  //获取小说章节（混合源，大概可认为是正版网站的公众章节+最快更新的盗版网站章节的混合）
  getMixChapters(bookId) {
    return axios.get(api + '/mix-atoc/' + bookId + '?view=chapters');
  },

  //获取小说章节
  getChapters(id) {
    return axios.get(api + '/btoc?view=summary&book=' + id)
      .then(data => {
        return axios.get(api + '/atoc/' + data.data[0]._id + '?view=chapters');
      });
  },

  //获取小说章节内容
  getChapterContent(id) {
    return axios.get(chapter + '/chapter/' + id+'?cv=1526289871104');
  },

  //获取搜索热词
  getHotWords() {
    return axios.get(api + '/book/search-hotwords');
  },

  //搜索自动补充
  autoComplete(searchWord) {
    return axios.get(api + '/book/auto-complete?query=' + searchWord);
  },

  //模糊搜索
  fuzzySearch(searchWord) {
    return axios.get(api + '/book/fuzzy-search?query=' + searchWord);
  },

  //获取小说最新章节（书架）
  getUpdate(bookList) {
    return axios.get(api + '/book?view=updated&id=' + bookList.toString());
  },

  //根据作者获取书籍
  getBookByAuthor() {
    return axios.get(api + '/book/accurate-search?author=' + '忘语');
  },

  //获取同类推荐
  getRecommend(id) {
    return axios.get(api + '/book/' + id + '/recommend');
  },

  //获取热门评论
  getHotReview(id) {
    return axios.get(api + '/post/review/best-by-book?book=' + id);
  },

  //获取帖子评论列表
  getReviewList(id, page, limit) {
    return axios.get(api + '/post/review/' + id + '/comment?' + 'start=' + ((page - 1) * limit) + '&limit=' + limit);
  },

  //获取帖子详情
  getReviewDetails(id) {
    return axios.get(api + '/post/review/' + id);
  },

  //获取精选列表
  getChoiceList() {
    return axios.get(api + '/mweb/home?node=575f74f27a4a60dc78a435a3&spread=575f74f27a4a60dc78a435a3&pl=ios');
  },

  //获取精选列表书籍
  getChoiceBooks(id, page, size) {
    return axios.get(api + '/recommendPage/node/books/all/' + id + '?ajax=ajax&st=' + page + '&size=' + size);
  },

  //获取热门关键字
  getHotWords() {
    return axios.get(api + '/book/hot-word');
  }
};
