這次修正三件事：

1. 試讀器換頁不再「跳回上方」
- 完全移除換頁時的自動 scrollTo。
- 改成新頁圖片載入完成後再替換，降低閃一下的感覺。
- 閱讀框高度固定，橫式表格頁與直式書頁切換時，整個版面不會上下跳動。
- Vol.1、Vol.2 共用這份 reader.js / reader.css，所以兩冊都會一起改善。

2. 電子書頁移除 Vol.1 介紹影片
- ebook.html 不再顯示影片區塊。
- Vol.1 直接以「封面＋介紹＋線上試讀＋購買平台」完整排版。
- 原本 assets/videos/ebook-vol1-intro.mp4 即使仍留在 repo，也不會再被載入或顯示。
  若日後想省 repo 空間，可再手動刪除該 mp4。

3. Vol.2 Readmoo 已正式上架
- Vol.2 試讀頁底部加入 Readmoo 正式購買按鈕：
  https://readmoo.com/book/210501725000101
- ebook.html 的 Vol.2 購買區也使用正式 Readmoo 連結。
- Google Play Books 仍維持「即將上架」。

覆蓋檔案：
assets/preview/shared/reader.js
assets/preview/shared/reader.css
preview/vol2/index.html
ebook.html
_data/ebooks.yml

操作：
解壓縮 → 將 assets、preview、_data 與 ebook.html 複製到 luciafate.github.io 根目錄
→ 選擇覆蓋 → GitHub Desktop Commit → Push origin
