import { staUrl } from '../common/common';

const fmtDate = (value, type) => {
  let fmtType = type === undefined ? 'yyyy-MM-dd' : type;
  let t = new Date(value);
  let tf = (i) => {
    return (i < 10 ? '0' : '') + i;
  };
  return fmtType.replace(/yyyy|MM|dd|hh|mm|ss/g, (p) => {
    switch (p) {
      case 'yyyy':
        return tf(t.getFullYear());
      case 'MM':
        return tf(t.getMonth() + 1);
      case 'dd':
        return tf(t.getDate());
      case 'hh':
        return tf(t.getHours());
      case 'mm':
        return tf(t.getMinutes());
      case 'ss':
        return tf(t.getSeconds());
    }
  });
};

const convert = (value) => {
  return (value / 10000).toFixed(2) + '万';
};

const staticUrl = (value) => {
  if (value === undefined) {
    return;
  }
  if (value.indexOf(staUrl) > -1) {
    return value;
  }
  return staUrl + value;
};

export {
  fmtDate,
  convert,
  staticUrl
};
