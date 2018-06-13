import Vuex from 'vuex';
import Vue from 'vue';
import mutations from './mutations';

const state = {
	curBook: {},
	bookShelfList: [],
	browseRecords: [],
	searchRecords: [],
	isNight: false,
	lineHeight:20,
	fontSize:16,
	skinColor: 0
};

Vue.use(Vuex);

export default new Vuex.Store({
	state,
	mutations
});
