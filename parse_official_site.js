
const axios = require('axios');
var _module = new parse_official_site();

/* kirara.star-api date format */
const keyword_time = /(?:[ ]?(\d+)年)?[ ]?(\d+)月[ ]?(\d+)日[ ]?(\d+)(?::|：)(\d+)[ ]?(?:~|～)[ ]?(?:[ ]?(\d+)年)?[ ]?(\d+)月[ ]?(\d+)日[ ]?(\d+)(?::|：)(\d+)/

/* necessary infomation with event date */
const keyword_title = ["【超強敵】", "【極】", "【超高難易度】", "【乱戦】"];

/* cross the year issue. because of unknown year. Note: x => suggest 1~6 */
const threshold_ms = (2 * 30 * 24 * 60 * 60 * 1000); // about 2 months ago

function parse_official_site() {
  if (!(this instanceof parse_official_site)) return new parse_official_site();
  return this;
}


/**
 * Get a date of the first weekend by month (Saturday)
 *  
 * @param {Number} year Specified year 
 * @param {Number} month Specified month
 * @return {String} jp timestring of start date.
 */
parse_official_site.prototype.firstWeekendDate = function (year, month) {
  if (typeof (year) != 'number' || typeof (month) != 'number' ) throw new Error('argv[year, month] are not number: year:' + typeof (year) + ' month' + typeof (month));

  let firstWeekend = new Date(Date.UTC(year, month-1, 1));
  firstWeekend.setDate(1 - firstWeekend.getDay() + 6);
  return `${year}-${('0' + month).substr(-2)}-${('0' + firstWeekend.getDate()).substr(-2)}T00:00:00+09:00`;
}

/**
 * Get an event date infomation 
 *
 * @param {String} url
 * @param {Boolean} simplify ture or false. simplify result.
 * @param {Number} year Specified event year
 * @return {Object} A object of event date info
 */
parse_official_site.prototype.eventDate = async function(url, simplify = true, year) {
  /* create an event information */
  let event_info = {}; 
  if (!url) return event_info;

  let web_info = await getpage(url);
  let basic_time = new Date();


  /* parse official information */
  if (!web_info.match(/<h1>(?:(?!<h1>|<h2>).|\r|\n)*|<h2>(?:(?!<h1>|<h2>).|\r|\n)*/g)) return event_info;
  
  if (web_info.match(/イベント「([^」]+)」/)) event_info.m_EventName = web_info.match(/イベント「([^」]+)」/)[1];
  event_info.categorys = [];

  web_info.match(/<h1>(?:(?!<h1>|<h2>).|\r|\n)*|<h2>(?:(?!<h1>|<h2>).|\r|\n)*/g).forEach(info_category => {
    /* create a category object and push to event_info */
    let category = {};
    category.title = "";
    if (info_category.match(/(<h1>(.*)<\/h1>|<h2>(.*)<\/h2>)/))
      category.title = label_clear(info_category.match(/(?:<h1>(.*)<\/h1>|<h2>(.*)<\/h2>)/)[1]);

    if (simplify) {
      if (!keyword_title.some(k => category.title.indexOf(k) >= 0)) return;

      category.date = parse_timer(info_category, year, basic_time);
      event_info.categorys.push(category); 
    }
    else {
      category.date = parse_timer(info_category, year, basic_time);
      event_info.categorys.push(category);
    }
  });

  return event_info;
}

function getpage(url) {
  if (typeof (url) != "string") throw new Error('argv[url] is not a string: ' + typeof (url));

  return axios.get(url)
              .then(resp => resp.data)
              .catch(err => console.log(err));
}

function label_clear(str) {
  return str.replace('/<[a-zA-z0-9]{1,5}>/g', '');
}

function parse_timer(info, year, cur_time) {
  let timer = [];
  if (info.search(keyword_time) >= 0) {
     info.match(new RegExp(keyword_time.source, "g")).forEach(time_str => {
        let [_, year1, month1, day1, hour1, min1, year2, month2, day2, hour2, min2] = time_str.match(keyword_time);
        let obj = {};
        year1 = year1 || year;
        year2 = year2 || year;
        obj.start_time = gen_jp_timestring(year1, month1, day1, hour1, min1, cur_time);
        obj.end_time = gen_jp_timestring(year2, month2, day2, hour2, min2, cur_time);
        timer.push(obj);
     });

  }
  return timer;
}


function gen_jp_timestring(year, month, day, hour, min, cur_time) {
  let jp_timestring_format = (year, month, day, hour, min) => `${year}-${('0' + month).substr(-2)}-${('0' + day).substr(-2)}T${('0' + hour).substr(-2)}:${('0' + min).substr(-2)}:00+09:00`;

  if (year)
    return jp_timestring_format(year, month, day, hour, min);

  year = cur_time.getFullYear();
  let tmp = Date.UTC(year, month - 1, day, hour, min);

  if (tmp > cur_time.getTime())
    return jp_timestring_format(year, month, day, hour, min);
  else if (cur_time.getTime() - tmp < threshold_ms)
    return jp_timestring_format(year, month, day, hour, min);
  else
    return jp_timestring_format(year + 1, month, day, hour, min);
}

module.exports = _module;