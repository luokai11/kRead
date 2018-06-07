
import Vue from 'vue';
import Vuex from 'vuex';
import {
  sync
} from 'vuex-router-sync';
import App from './App';
import store from './store';
import router from './router';

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);

import Navigation from 'vue-navigation';
Vue.use(Navigation, {router});

import './assets/index.less';

import * as filters from './filters/index';
Object.keys(filters).forEach((key)=>{
  Vue.filter(key,filters[key]);
});

Vue.use(Vuex);
Vue.use(Mint);

Vue.config.productionTip = false;

sync(store, router);

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }else {
    to.meta.title = to.params.name;
    document.title = to.params.name;
  }
  next();
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');