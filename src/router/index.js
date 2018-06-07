import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/bookshelf'
    },
    {
      path: '/choice',
      name: 'choice',
      component: ()=> import('@/components/choice'),
      meta: {
        title: '精选',
        showMeu:true
      }
    },
    {
      path: '/bookshelf',
      name: 'bookshelf',
      component: ()=>import('@/components/bookshelf'),
      meta: {
        title: '书架',
        showMeu:true
      }
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('@/components/category'),
      meta: {
        title: '分类',
        showMeu:true
      }
    },
    {
      path: '/categoryDetails/:name',
      name: 'categoryDetails',
      component: () => import('@/components/categoryDetails'),
      meta: {
        title: '',
        showMeu:false
      }
    },
    {
      path: '/rankingList',
      name: 'rankingList',
      component: () => import('@/components/rankingList'),
      meta: {
        title: '排行榜',
        showMeu:true
      }
    },
    {
      path: '/bookDetails/:id',
      name: 'bookDetails',
      component: () => import('@/components/bookDetails'),
      meta: {
        title: '详情',
        showMeu:false
      }
    },
    {
      path: '/recommend/:name',
      name: 'recommend',
      component: () => import('@/components/recommend'),
      meta: {
        title: '',
        showMeu:false
      }
    },
    {
      path: '/chapter/:id',
      name: 'chapter',
      component: () => import('@/components/chapter'),
      meta: {
        title: '目录',
        showMeu:false
      }
    },
    {
      path: '/searchBook',
      name: 'searchBook',
      component: () => import('@/components/searchBook'),
      meta: {
        title: '搜索',
        showMeu:false
      }
    },
    {
      path: '/comment/:cid',
      name: 'comment',
      component: () => import('@/components/comment'),
      meta: {
        title: '评论详情',
        showMeu:false
      }
    },
    {
      path: '/browseRecords',
      name: 'browseRecords',
      component: () => import('@/components/browseRecords'),
      meta: {
        title: '浏览记录',
        showMeu:false
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});





