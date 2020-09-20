const parse_official_site = require('./parse_official_site.js');

(async function main() {

  console.log(parse_official_site.firstWeekendDate(2020, 8)); // 2020.8
  // => 2020-08-01T00:00:00+09:00
  console.log(parse_official_site.firstWeekendDate(2021, 1)); // 2021.1
  // => 2021-01-02T00:00:00+09:00

  show(await parse_official_site.eventDate(""));
  // => {}
  show(await parse_official_site.eventDate("https://krr-prd-web.star-api.com/news/8997/"));
  // => {"m_EventName":"年末年始特番！お正月だよエトワリア","categorys":[{"title":"豪華素材がドロップする「【超強敵】クエスト」開催！","date":[{"start_time":"2020-01-01T00:00:00+09:00","end_time":"2020-01-14T13:59:00+09:00"}]},{"title":"さらなる挑戦！「【極】クエスト」！","date":[{"start_time":"2020-01-03T17:00:00+09:00","end_time":"2020-01-14T13:59:00+09:00"}]}]}
  /*
  年末年始特番！お正月だよエトワリア
    豪華素材がドロップする「【超強敵】クエスト」開催！
      2020-01-01T00:00:00+09:00
      2020-01-14T13:59:00+09:00
    さらなる挑戦！「【極】クエスト」！
      2020-01-03T17:00:00+09:00
      2020-01-14T13:59:00+09:00
  */
  
  show(await parse_official_site.eventDate("https://krr-prd-web.star-api.com/news/8997/", false));
  // => {"m_EventName":"年末年始特番！お正月だよエトワリア","categorys":[{"title":"イベントで素材をGETしてトレードショップで交換しよう！","date":[{"start_time":"2019-12-26T17:00:00+09:00","end_time":"2020-01-21T13:59:00+09:00"},{"start_time":"2020-01-01T00:00:00+09:00","end_time":"2020-01-21T13:59:00+09:00"}]},{"title":"イベント限定キャラクターを仲間にしよう！","date":[]},{"title":"「イベント限定コールチケット」をGETしてキャラクターを覚醒させよう！","date":[]},{"title":"イベント素材を「コンテンツ限定限界突破素材」に交換しよう！","date":[]},{"title":"イベントボーナス効果について","date":[]},{"title":"豪華素材がドロップする「【超強敵】クエスト」開催！","date":[{"start_time":"2020-01-01T00:00:00+09:00","end_time":"2020-01-14T13:59:00+09:00"}]},{"title":"さらなる挑戦！「【極】クエスト」！","date":[{"start_time":"2020-01-03T17:00:00+09:00","end_time":"2020-01-14T13:59:00+09:00"}]},{"title":"イベントミッション実施！","date":[{"start_time":"2019-12-26T17:00:00+09:00","end_time":"2020-01-14T23:59:00+09:00"},{"start_time":"2020-01-01T00:00:00+09:00","end_time":"2020-01-14T23:59:00+09:00"}]}]}
  /* 
  年末年始特番！お正月だよエトワリア
    イベントで素材をGETしてトレードショップで交換しよう！
      2019-12-26T17:00:00+09:00
      2020-01-21T13:59:00+09:00
      2020-01-01T00:00:00+09:00
      2020-01-21T13:59:00+09:00
    イベント限定キャラクターを仲間にしよう！
    「イベント限定コールチケット」をGETしてキャラクターを覚醒させよう！
    イベント素材を「コンテンツ限定限界突破素材」に交換しよう！
    イベントボーナス効果について
    豪華素材がドロップする「【超強敵】クエスト」開催！
      2020-01-01T00:00:00+09:00
      2020-01-14T13:59:00+09:00
    さらなる挑戦！「【極】クエスト」！
      2020-01-03T17:00:00+09:00
      2020-01-14T13:59:00+09:00
    イベントミッション実施！
      2019-12-26T17:00:00+09:00
      2020-01-14T23:59:00+09:00
      2020-01-01T00:00:00+09:00
      2020-01-14T23:59:00+09:00
  */

  show(await parse_official_site.eventDate("https://kirara.star-api.com/cat_news/information/880"));
  // => {"m_EventName":"ラブラブトラベル大作戦","categorys":[{"title":"豪華素材がドロップする【超強敵】クエスト開催！","date":[{"start_time":"2020-09-12T17:00:00+09:00","end_time":"2020-09-29T15:59:00+09:00"}]},{"title":"さらなる挑戦！【極】クエスト！","date":[{"start_time":"2020-09-16T17:00:00+09:00","end_time":"2020-09-29T15:59:00+09:00"}]}]}
  /*
  ラブラブトラベル大作戦
    豪華素材がドロップする【超強敵】クエスト開催！
      2020-09-12T17:00:00+09:00
      2020-09-29T15:59:00+09:00
    さらなる挑戦！【極】クエスト！
      2020-09-16T17:00:00+09:00
      2020-09-29T15:59:00+09:00
  */

 show(await parse_official_site.eventDate("https://kirara.star-api.com/cat_news/information/880", true, 2019));
  // => {"m_EventName":"ラブラブトラベル大作戦","categorys":[{"title":"豪華素材がドロップする【超強敵】クエスト開催！","date":[{"start_time":"2019-09-12T17:00:00+09:00","end_time":"2019-09-29T15:59:00+09:00"}]},{"title":"さらなる挑戦！【極】クエスト！","date":[{"start_time":"2019-09-16T17:00:00+09:00","end_time":"2019-09-29T15:59:00+09:00"}]}]}
  /*
  ラブラブトラベル大作戦
    豪華素材がドロップする【超強敵】クエスト開催！
      2019-09-12T17:00:00+09:00
      2019-09-29T15:59:00+09:00
    さらなる挑戦！【極】クエスト！
      2019-09-16T17:00:00+09:00
      2019-09-29T15:59:00+09:00
  */

})();

function show(eventDate) {
  console.log(JSON.stringify(eventDate));
  if (!eventDate.categorys) return;

  console.log(eventDate.m_EventName);
  console.group();
  eventDate.categorys.forEach(e => {
    console.log(e.title);
    console.group();
    e.date.forEach(d => {
      console.log(d.start_time);
      console.log(d.end_time);
    });
    console.groupEnd();
  });
  console.groupEnd();
  console.log();
}