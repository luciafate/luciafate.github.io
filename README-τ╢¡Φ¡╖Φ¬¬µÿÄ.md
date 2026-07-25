# Lucia紫微斗數網站｜維護說明（Jekyll版）

網站現在改用 **Jekyll**，這是 GitHub Pages 原生支援的系統。最大差別是：
以後新增、修改、隱藏文章，**都可以直接在 GitHub 網頁上操作，不用碰HTML或JavaScript**。

這份文件全部用網頁操作說明，不需要安裝任何軟體。

---

## 1. 如何透過GitHub網頁新增文章

1. 打開你的網站repo，進入 `_posts` 資料夾。
2. 點右上角「Add file」→「Create new file」。
3. 檔名格式固定：`年-月-日-英文網址代稱.md`，例如 `2026-08-01-wo-de-xin-wenzhang.md`（年月日要跟文章發布日期一致，代稱只能用小寫英文、數字、連字號，不要用空格或中文）。
4. 把 `post-template.md`（專案根目錄，直接複製整份）的內容貼進去，照欄位說明填寫。
5. 拉到頁面最下方，選「Commit directly to the main branch」，按綠色按鈕送出。
6. 等1〜3分鐘（GitHub會自動重新building網站），文章就會自動出現在首頁「最新文章」跟文章列表頁，不用改任何其他檔案。

---

## 2. 如何修改文章正文

1. 進入 `_posts` 資料夾，點你要修改的那篇文章。
2. 點右上角鉛筆圖示（Edit this file）。
3. 直接修改文字（`---` 到 `---` 之間是欄位設定，不要動；下面才是正文）。
4. 修改完，一樣選「Commit directly to the main branch」送出即可。

---

## 3. 如何調整主分類、標籤及系列

打開文章檔案最上面的欄位區塊（`---` 之間）：

```yaml
category: learn        # 六選一，只能填以下其中一個
tags: ["心理學", "AI"]  # 標籤，可以填多個
series: "系列名稱"      # 沒有系列就留空字串 ""
seriesOrder: 2          # 沒有系列就留 ~
```

**六大主分類代碼（不可自行新增或更改代碼）：**

| 代碼(category) | 顯示名稱 |
|---|---|
| learn | 學懂紫微 |
| relationship | 感情與關係 |
| career | 職涯與財富 |
| wellbeing | 身心與成長 |
| fate | 命運與選擇 |
| culture | 人文與異聞 |

每篇文章只能填一個 `category`。跨領域內容用 `tags` 補充，標籤沒有固定清單，直接打字即可。

同系列文章的 `series` 要打**一模一樣的文字**，`seriesOrder` 填第幾篇（數字），這樣文章內頁的「上一篇/下一篇」跟「相關文章」才會正確關聯。

---

## 4. 如何設定或更換首頁三篇精選文章

打開想設成精選的文章，把欄位改成：

```yaml
featured: true
featuredOrder: 1     # 1、2、3，決定排列順序（1會是橫跨整列的那一篇）
```

不想再當精選文章的，把 `featured` 改回 `false` 就好。首頁一律只顯示3篇，多設定也只會取前3篇（依 `featuredOrder` 排序）。

---

## 5. 如何上傳、更換及刪除文章圖片

1. 圖片先放進 `assets/images/posts/` 資料夾（GitHub網頁「Add file」→「Upload files」即可上傳）。
2. 檔名用英文小寫＋連字號，例如 `tanlang-cover.jpg`，不要用空格或中文檔名。
3. 回到文章的 `---` 欄位區，設定：

```yaml
image: "/assets/images/posts/tanlang-cover.jpg"
imageAlt: "圖片內容的文字說明（給看不到圖片的讀者跟搜尋引擎用）"
imageCaption: "圖片下方要顯示的說明文字，沒有就留空字串"
```

沒有設定 `image` 時，網站不會顯示主圖區，也不會出現「待補」或破圖提示。要移除圖片，把 `image` 改回空字串 `""` 即可，圖片檔案本身可以留著或到 `assets/images/posts/` 資料夾裡刪除。

---

## 6. 如何上傳、更換及移除聲音檔

1. 音檔（建議MP3）上傳到 `assets/audio/` 資料夾。
2. 檔名一樣用英文小寫＋連字號，例如 `tanlang-audio.mp3`。
3. 文章欄位設定：

```yaml
audio: "/assets/audio/tanlang-audio.mp3"
audioTitle: "Lucia語音導讀"     # 不填會自動顯示這個預設文字
```

有設定時，文章內頁會自動出現「Lucia語音導讀」播放器；沒有設定完全不會顯示這一區，不會有空白區塊。播放器不會自動播放，手機、桌機都能正常使用。

`audio` 必須填可直接播放的音訊檔網址（例如網站內的MP3檔），不能填Spotify、SoundOn節目頁等一般網頁網址。若日後要嵌入Podcast平台，需另行加入該平台的嵌入播放器。

---

## 7. 如何暫時隱藏及重新發布文章

文章欄位裡的 `published`：

```yaml
published: false   # 隱藏這篇文章，不會出現在網站任何地方
published: true     # 重新發布
```

改成 `false` 存檔後，這篇文章會整個從網站消失（首頁、列表頁、分類都不會出現），但檔案還在，之後改回 `true` 就會恢復。適合寫到一半、還沒定稿的文章先用這個方式暫存。

---

## 8. 如何修改LINE贈品名稱、按鈕文字及網址

打開 `_data/site-settings.yml` 這一個檔案，裡面集中管理全站的LINE資訊與其他文案：

```yaml
line:
  add_friend_url: "https://lin.ee/P3hMk4B"     # LINE正式加好友網址
  official_id: "@400pbrxh"
  qr_image: "/assets/images/line-qr.jpg"        # QR Code圖片路徑
  gift_name: "紫微斗數小秘笈"                    # 贈品名稱
  hero_primary_btn_text: "加LINE領取斗數小秘笈"  # 首屏主要按鈕文字
  hero_secondary_btn_text: "先讀精選文章"
  nav_btn_text: "加LINE好友"                     # 導覽列按鈕文字
  reading_btn_text: "加入 LINE 了解與預約"        # 論命區按鈕文字
```

改這個檔案裡的文字，**全站所有用到的地方會自動同步**（導覽列、首屏、LINE行動區、論命區、每篇文章結尾），不用逐頁修改。

同一個檔案裡也放了首屏文案、電子書資料、論命方案內容，需要調整文案時都先來這裡找。

---

## 9. 如何預覽並確認網站已更新

**最簡單的方式（不用裝任何軟體）：**
把檔案改好、Commit之後，GitHub Pages會自動重新產生網站，通常1〜3分鐘內完成。
可以到repo的「Actions」分頁，看到最上面那筆有綠色勾勾，就代表網站已經更新完成，重新整理正式網址就看得到最新內容。

**進階方式（如果之後想在自己電腦先預覽再上傳）：**
需要安裝Ruby與Jekyll（`bundle exec jekyll serve`），這部分需要工程背景協助設定，非必要不用做，直接用GitHub Pages自動部署即可。

---

## 10. 如何從大量舊文章分批轉換為Markdown

你在Threads上還有很多篇還沒放進網站，建議這樣分批做，不要一次全部塞：

1. 每次挑5〜10篇同一批（例如同一個系列，或同一個分類）。
2. 複製 `post-template.md`，依照第1點的方式在 `_posts` 建立新檔案。
3. 標題、正文直接貼上，欄位（分類、標籤、系列、日期、閱讀時間）照實填寫，摘要（`excerpt`）自己濃縮成一兩句話。
4. 每批做完就Commit一次、上網站確認顯示正常，再做下一批，比較不容易漏改或出錯。
5. 目前站上只有〈貪狼的桃花，從來不是你想的那樣〉已放入完整全文；其餘15個示範文章檔已設定為 `published: false`，因此不會在正式網站顯示。日後補入完整正文並確認無誤後，再把該篇的 `published` 改為 `true`。

---

## 11. 如何新增電子書、課程或免費影片

網站現在有首頁及四個獨立功能分頁：`index.html`（首頁）、`blog.html`（文章）、`ebook.html`（電子書）、`courses.html`（線上課程）、`reading.html`（論命）。首頁的電子書／課程／論命三個卡片只是導引入口，完整內容都在各自的分頁。

**新增一本電子書：** 打開 `_data/ebooks.yml`，複製其中一筆（用 `-` 開頭那一段）貼在最後面，改成新書的書名、副標、封面路徑、介紹文字、適合讀者條列、購買連結。存檔後 `ebook.html` 會自動多顯示一本書，不用改HTML。

**新增一門課程：** 打開 `_data/courses.yml`，複製一筆貼在最後面。`status` 欄位控制卡片行為：
- `building`：只顯示「建構中」徽章＋LINE通知按鈕
- `free`：填 `url` 後顯示可點擊的免費連結
- `paid`：需要同時把 `show_buy_button` 改成 `true`、填好 `url`，才會顯示購買按鈕（避免尚未定案的課程被誤認為可購買）

**新增／更換免費入門影片：** 打開 `_data/free-videos.yml`，比照格式新增或修改。`url` 留空時，卡片會顯示「影片連結準備中」，不會出現點了沒反應的按鈕；有正式的YouTube或Threads貼文連結時，直接填入 `url` 即可。若有縮圖，把圖片放入 `assets/images/` 後，在 `thumbnail` 填入圖片路徑。

**電子書封面圖片**放在 `assets/images/`，檔名建議用英文小寫＋連字號，上傳後在 `ebooks.yml` 的 `cover` 欄位填路徑即可。

---

## 檔案結構

```
lucia-jekyll/
├── _config.yml              網站基本設定、六大分類清單與說明文字
├── _data/
│   ├── site-settings.yml    LINE資訊、首頁文案、論命方案（集中設定檔）
│   ├── ebooks.yml            電子書清單（可新增多本）
│   ├── courses.yml           課程清單（可新增多門）
│   └── free-videos.yml       免費入門影片清單
├── _layouts/
│   ├── default.html         一般頁面版面（首頁、文章列表、電子書、課程、論命頁）
│   └── post.html            文章內頁版面
├── _includes/
│   ├── head.html             共用<head>
│   ├── header.html           頁首（含首頁連結、手機導覽選單）
│   ├── footer.html           頁尾
│   └── line-cta.html         LINE行動區（可依頁面自訂標題/說明/按鈕文字）
├── _posts/                   所有文章（.md檔），新增文章主要在這裡操作
├── assets/
│   ├── css/style.css         全站樣式
│   ├── js/nav.js              手機導覽選單邏輯
│   ├── js/blog-filter.js      文章列表頁分類篩選邏輯
│   ├── images/                 Logo、電子書封面、LINE QR Code
│   ├── images/posts/           文章圖片放這裡
│   └── audio/                   文章語音檔放這裡
├── index.html                 首頁
├── blog.html                  文章列表頁（含六大分類說明卡片）
├── ebook.html                 電子書頁（可擴充多本書）
├── courses.html                線上課程頁（免費短課＋系統課程建構中）
├── reading.html                論命頁（服務內容、費用、流程）
├── post-template.md           新增文章可直接複製的模板
└── README-維護說明.md         這份文件
```

## 這次轉換的重要提醒

- 頁尾原本尚未完成的「隱私權政策」假連結已移除。日後若正式建立隱私權頁面，再加入真實連結。
- 所有尚未補入正式全文的示範文章都已保留檔案但暫時隱藏，避免訪客讀到內部的「內容待補」文字。

- 文章網址從原本的 `post.html?slug=xxx` 改成 `/articles/xxx/` 這種正式路徑，這是Jekyll的標準做法，對SEO更有利。因為網站目前還沒正式上線，還沒有人分享過舊網址，所以這次改動不會有「連結失效」的實際影響；不過**這是最後一次可以無痛改網址結構的機會**，正式上線、開始被分享/收錄之後，網址就不建議再變動了。
- 目前 `url` 與 `baseurl` 在 `_config.yml` 裡先留空，等你確定要部署在GitHub Pages的哪個網址（使用者網站 `username.github.io` 或專案網站 `username.github.io/repo名稱`），要記得回來填這兩個欄位，否則圖片、CSS路徑在正式網址上可能會跑掉。
- LINE正式網址、QR Code圖片都已經換成你提供的真實資料，不再是預留框。
