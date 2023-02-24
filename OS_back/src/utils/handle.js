/**
 * 获取时间对象数据
 * */

function nowDate() {
  let x = new Date();
  return {
    nowTime: x.getTime(), //当前的time
    day: x.getDate(), // 日
    week: x.getDay(), // 周
    month: x.getMonth() + 1, // 月
    year: x.getFullYear() // 年
  };
}

/**
 * 获取今天的时间戳
 * */

export function getDayMsg() {
  // time1 是当天零点的时刻 时间戳
  let time1 = new Date(new Date().toLocaleDateString()).getTime();
  // time2 当天23点59分59秒 时间戳
  let time2 =
    new Date(new Date().toLocaleDateString()).getTime() +
    24 * 60 * 60 * 1000 -
    1;
  return { time1, time2 };
}

/**
 * 获取这周的时间戳
 * */

export function getWeekMsg() {
  // time1 是周一的零点的时刻
  let date = nowDate();
  let x = Date.parse(`${date.year}  ${date.month}  ${date.day}`);
  let time1 = x - (date.week - 1) * 86400000;
  // time2 当天23点59分59秒 时间戳
  let time2 =
    new Date(new Date().toLocaleDateString()).getTime() +
    24 * 60 * 60 * 1000 -
    1;
  return { time1, time2 };
}

/**
 * 获取这个月的时间戳
 * */

export function getMonthMsg() {
  let date = nowDate();
  // tiem1 是当月1号零点的时刻
  let time1 = Date.parse(`${date.year}  ${date.month}  1`);
  // time2 当天23点59分59秒 时间戳
  let time2 =
    new Date(new Date().toLocaleDateString()).getTime() +
    24 * 60 * 60 * 1000 -
    1;
  return { time1, time2 };
}

/**
 * 生成sql语句
 * */

export function createSql(obj, arr = false) {
  let sql;
  if (!arr) {
    sql = Object.keys(obj).reduce((prev, next) => {
      prev += `${next} = '${obj[next]}',`;
      return prev;
    }, "");
  } else {
    sql = arr.reduce((prev, next) => {
      prev += `${next} = '${obj[next]}',`;
      return prev;
    }, "");
  }
  return sql.slice(0, -1);
}

export function createInsertSql(obj, arr = false) {
  let sql = {
    columns: "(",
    values: "("
  };
  if (!arr) {
    Object.keys(obj).reduce((prev, next) => {
      sql.columns += `${next},`;
      sql.values += `'${obj[next]}',`;
    }, sql);
  } else {
    arr.reduce((prev, next) => {
      sql.columns += `${next}`;
      sql.values += `,'${obj[next]}'`;
    }, sql);
  }
  sql.columns = sql.columns.slice(0, -1).concat(")");
  sql.values = sql.values.slice(0, -1).concat(")");
  return sql;
}
