export const setStore = (name, value) => {
  if (!name) {
    return;
  }
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(name, value);
};

export const getStore = (name) => {
  if (!name) {
    return;
  }
  return window.localStorage.getItem(name);
};

export const removeStore = (name) => {
  if (!name) {
    return;
  }
  window.localStorage.removeItem(name);
};

export const bgColor = [
  { backgroundColor: '#FFEE99', color: '#000' },
  { backgroundColor: '#FF9966', color: '#000' },
  { backgroundColor: '#CC6699', color: '#000' },
  { backgroundColor: '#CCFFCC', color: '#000' },
  { backgroundColor: '#300', color: '#FFF' },
  { backgroundColor: '#333', color: '#FFF' },
  { backgroundColor: '#CCFF33', color: '#000' }
];

export const typeFace = {
  small: {
    fontSize: '12px',
    lineHeight: '20px',
    letterSpacing: '0px'
  },
  normal: {
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '1px'
  },
  big: {
    fontSize: '18px',
    lineHeight: '24px',
    letterSpacing: '0px'
  },
  large: {
    fontSize: '20px',
    lineHeight: '24px',
    letterSpacing: '0.5px'
  }
};

export const types = [
  { text: '热门', value: 'hot' },
  { text: '新书', value: 'new' },
  { text: '好评', value: 'reputation' },
  { text: '完结', value: 'over' },
  { text: '包月', value: 'monthly' }
];

export const staUrl = 'http://statics.zhuishushenqi.com';
