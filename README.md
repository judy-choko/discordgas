# discordgas
ディスコードのウェブフックをGASで叩くときのコードです。チャットGPTと会話でき、スクレイピングもしてくれます。

## 使い方
1. SCRAPEURL：スクレイピングしたい記事のURLを一つ
2. BASEURL：スクレイピングした記事のベースURL
3. BOTNAME：botの名前
4. WEBHOOK_URL2：ウェブフックのURL
5. 上記をそれぞれ[chat.gs]に入力する。
6. parserライブラリを導入する、「1Mc8BthYthXx6CoIz90-JiSzSafVnT6U3t0z_W3hLTAX5ek4w0G_EIrNw」でライブラリに追加。
7. phantomJSCloudScrapingとchatGPTを登録してAPIキーを取得
8. スクリプトプロパティに、「phantomkey」「APIKEY」をそれぞれ登録する
9. [trigger.gs]の関数をトリガーで設定して毎日起動させる

スクレイピングしたい記事に合わせて、スクレイピングの部分は調整してください。
毎朝ツンデレのchatGPTがニュース付きで朝の挨拶をしてくれますよ！
