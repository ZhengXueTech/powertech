# PowerTech 工具箱

清道達人（PowerTech）教學與競賽用的網頁工具。

網址：https://zhengxuetech.github.io/powertech/

## 工具

| 工具 | 資料夾 | 說明 |
|---|---|---|
| 清道達人網頁遙控器 | `controller/` | Web Bluetooth 遙控器，取代原廠 App |
| 萬用遙控器（T-Display） | `tdisplay/` | 自製遙控器安裝教學與韌體（`UniRemote_v0.2.zip`）：BLE 控車、選單、Wi-Fi 手機／平板控制 |
| PS2 小車配置台與教學 | `ps2car/` | Arduino PS2 手把小車：教學頁、網頁配置台、工具包 zip（`PS2_Car_tool_efun.zip`） |

## 新增工具

1. 新增一個資料夾，例如 `timer/`，裡面放 `index.html`
2. 打開根目錄的 `index.html`，在 `TOOLS` 清單加一筆，`path` 填 `'timer/'`
3. 要讓新工具也能離線使用：打開 `sw.js`，把 `'./timer/'`、`'./timer/index.html'` 加進 `PRECACHE`，並把 `VERSION` 改成下一版（例如 `pt-v2`）

## 離線使用（PWA）

有網路時用 Chrome 開一次，選單 ⋮ →「安裝應用程式」或「加到主畫面」。之後斷網也能從主畫面開啟，藍牙控制不需要網路。

## 清道達人藍牙協定（實測）

- BLE 服務 `FFE0`、特徵 `FFE1`
- 連線期間約每 60ms 送 1 個位元組，每個位元代表一顆按鈕，`00` = 全部停止

| 位元組 | 按鈕 | 馬達 |
|---|---|---|
| `01` / `02` | ˅ / ˄ | M1 右前輪 |
| `04` / `08` | ‹ / › | M2 滾刷 |
| `10` / `20` | − / + | M3 後門 |
| `40` / `80` | A / B | M4 左前輪 |

## 授權

CC BY-NC-SA 4.0 © ZhengXueTech
