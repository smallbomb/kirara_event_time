# kirara_event_time
sample to parse kirara event time from web site
```
npm install
```
```
node .
```

## example
```
await parse_official_site.eventDate("https://kirara.star-api.com/cat_news/information/880")

/*
ラブラブトラベル大作戦
  豪華素材がドロップする【超強敵】クエスト開催！
    start_time:  2020-09-12T17:00:00+09:00
    end_time:    2020-09-29T15:59:00+09:00
  さらなる挑戦！【極】クエスト！
    start_time:  2020-09-16T17:00:00+09:00
    end_time:    2020-09-29T15:59:00+09:00
*/
```