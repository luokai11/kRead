import {
  setStore,
  getStore,
  removeStore
} from '../common/common';

import {
  INIT_STATE,
  ADD_SEARCH_RECORDS,
  DEL_SEARCH_RECORDS,
  EMPTY_SEARCH_RECORDS,
  ADD_BROWSE_RECORDS,
  DEL_BROWSE_RECORDS,
  EMPTY_BROWSE_RECORDS,
  SET_CUR_BOOK,
  ADD_SHELF,
  DEL_SHELF,
  UPDATA_SHELF,
  EMPTY_SHELF,
  SET_LINE_HEIGHT,
  SET_SKIN_COLOR,
  SET_NIGHT,
  SET_FONT_SIZE
} from './mutation-types';

export default {
  [INIT_STATE](state) {
    if (getStore('curBook')) {
      state.curBook = JSON.parse(getStore('curBook'));
    }
    if (getStore('bookShelfList')) {
      state.bookShelfList = JSON.parse(getStore('bookShelfList'));
    }
    if (getStore('browseRecords')) {
      state.browseRecords = JSON.parse(getStore('browseRecords'));
    }
    if (getStore('searchRecords')) {
      state.searchRecords = JSON.parse(getStore('searchRecords'));
    }
    state.skinColor = getStore('skinColor') ? +getStore('skinColor') : 0;
    state.isNight = getStore('isNight') === 'true' ? true : false;
    state.lineHeight = getStore('lineHeight') ? getStore('lineHeight') : 20;
    state.fontSize = getStore('fontSize') ? getStore('fontSize') : 16;
  },
  [ADD_SEARCH_RECORDS](state, value) {
    let index = Array.indexOf(state.searchRecords, value);
    if (index >= 0) {
      state.searchRecords.splice(index, 1);
    }
    state.searchRecords.unshift(value);
    setStore('searchRecords', state.searchRecords);
  },
  [DEL_SEARCH_RECORDS](state, value) {
    let index = Array.indexOf(state.searchRecords, value);
    if (index >= 0) {
      state.searchRecords.splice(index, 1);
    }
    setStore('searchRecords', state.searchRecords);
  },
  [EMPTY_SEARCH_RECORDS](state) {
    state.searchRecords = [];
    removeStore('searchRecords');
  },
  [ADD_BROWSE_RECORDS](state, book) {
    let b = false;
    for (let [idx, obj] of state.bookShelfList.entries()) {
      if (obj.id === book.id) {
        b = true;
        break;
      }
    }
    if (!b) {
      let len = state.browseRecords.length;
      if (len > 0) {
        for (let [idx, b] of state.browseRecords.entries()) {
          if (b.id === book.id) {
            state.browseRecords.splice(idx, 1);
          }
        }
      }
      state.browseRecords.unshift(book);
    }
    setStore('browseRecords', state.browseRecords);
  },
  [DEL_BROWSE_RECORDS](state, bId) {
    state.browseRecords.map((value, index) => {
      if (value.id === bId) {
        state.browseRecords.splice(index, 1);
      }
    });
    setStore('browseRecords', state.browseRecords);
  },
  [EMPTY_BROWSE_RECORDS](state) {
    state.browseRecords = [];
    removeStore('browseRecords');
  },
  [SET_CUR_BOOK](state, book) {
    state.curBook = book;
    setStore('curBook', state.curBook);
  },
  [ADD_SHELF](state, book) {
    state.bookShelfList.unshift(book);
    setStore('bookShelfList', state.bookShelfList);
  },
  [DEL_SHELF](state, bId) {
    state.bookShelfList.map((value, index) => {
      if (value.id === bId) {
        state.bookShelfList.splice(index, 1);
      }
    });
    setStore('bookShelfList', state.bookShelfList);
  },
  [UPDATA_SHELF](state, book) {
    for (let [idx, obj] of state.bookShelfList.entries()) {
      if (book.id === obj.id) {
        state.bookShelfList.splice(idx, 1, book);
        break;
      }
    }
    setStore('bookShelfList', state.bookShelfList);
  },
  [EMPTY_SHELF](state) {
    state.bookShelfList = [];
    removeStore('bookShelfList');
  },
  [SET_LINE_HEIGHT](state, value) {
    state.lineHeight = value;
    setStore('lineHeight', state.lineHeight);
  },
  [SET_SKIN_COLOR](state, idx) {
    state.skinColor = idx;
    setStore('skinColor', state.skinColor);
  },
  [SET_NIGHT](state, bool) {
    state.isNight = bool;
    setStore('isNight', state.isNight);
  },
  [SET_FONT_SIZE](state, value) {
    state.fontSize = value;
    setStore('fontSize', state.fontSize);
  }
};
