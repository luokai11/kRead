import Vuex from 'vuex';
import Vue from 'vue';
import mutations from './mutations';

const state = {
	curBook: {},
	bookShelfList: [],
	browseRecords: [],
	searchRecords: [],
	isNight: false,
	face: 'normal',
	skinColor: 0
};

Vue.use(Vuex);

export default new Vuex.Store({
	state,
	mutations
});
