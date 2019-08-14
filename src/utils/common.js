const formatPassTime = function (startTime,currentTime) {
  let time = Number(currentTime) - Number(startTime)
  let day = parseInt(time / (1000 * 60 * 60 * 24))
  let hour = parseInt(time / (1000 * 60 * 60))
  let min = parseInt(time / (1000 * 60))
  let sec = parseInt(time/1000)
  let month = parseInt(day / 30)
  let year = parseInt(month / 12)
  if(year) {
    return year>1 ? (year + " years ago"):(year + " year ago")
  }
  if(month) {
    return month>1 ? (month + " months ago"):(month + " month ago")
  }
  if(day) {
    return day>1 ? (day + " days ago"):(day + " day ago")
  }
  if(hour) {
    return hour>1 ? (hour + " hours ago"):(hour + " hour ago")
  }
  if(min) {
    return min>1 ? (min + " mins ago"):(min + " min ago")
  }
  if(sec) {
    return sec>1 ? (sec + " secs ago"):(sec + " sec ago")
  }
}

const dataFilter = function (data,size) {
  if (data === 0) {
    return data;
  }
  if (data.toString().indexOf('.') == -1) {
    return data;
  }
  let h = Math.pow(10, size)
  let result = Math.floor(data * h) / h
  // replace返回的是字符串类型的，+转换成Number类型的，toFixed()返回值是字符串类型的
  // return +data.toFixed(size).replace(/[0|.]*$/,'');
  return result
}

const percentageFilter = function (data, size) {
  let dataStr = data.toString()
  if (data === 1) {
    return '100' + '%';
  } else if (dataStr.length <= 4) {
    return (data * 100).toString() + '%';
  } else {
    let h = Math.pow(10, size);
    let m = (Math.floor(data * h) / h) * 100;
    return m.toString() + '%';
  }
}

const changeTime = function (date) {
  let dateee = new Date(date).toJSON();
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/, '');
}

export {
  formatPassTime,
  dataFilter,
  percentageFilter,
  changeTime
}
