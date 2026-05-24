// ============================================================
// にんケット４ タイムトライアル記録管理 - Google Apps Script
// ============================================================
// 【セットアップ手順】
// 1. Google スプレッドシートを新規作成
// 2. 拡張機能 > Apps Script を開く
// 3. このファイルの内容を全コピーして貼り付け（既存コードを置き換え）
// 4. 「initSheet」を選択して▶実行（ヘッダー行を作成）
// 5. デプロイ > 新しいデプロイ
//    - 種類: ウェブアプリ
//    - 実行者: 自分
//    - アクセスできるユーザー: 全員
// 6. デプロイ後に表示されるURLを .admin.js の GAS_URL に設定
// ============================================================

// ヘッダー行を初期化（初回のみ手動で「initSheet」を実行）
function initSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['記録', 'シリアルNo', 'ニックネーム', 'X ID', '登録日時']);
    sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
  }
}

// GET: 全記録を返す
function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var values = sheet.getDataRange().getValues();
    var records = [];
    for (var i = 1; i < values.length; i++) {
      var row = values[i];
      if (!row[0]) continue; // 空行スキップ
      records.push({
        time:     String(row[0] || ''),
        serial:   String(row[1] || ''),
        nickname: String(row[2] || ''),
        xid:      String(row[3] || ''),
        created:  row[4] ? new Date(row[4]).getTime() : 0
      });
    }
    return jsonOut({ records: records });
  } catch (err) {
    return jsonOut({ error: err.toString() });
  }
}

// POST: 記録の追加 / 上書き
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // --- 新規追加 ---
    if (data.action === 'add') {
      var values = sheet.getDataRange().getValues();
      for (var i = 1; i < values.length; i++) {
        if (String(values[i][1]) === String(data.record.serial)) {
          return jsonOut({ duplicate: true });
        }
      }
      sheet.appendRow([
        data.record.time,
        data.record.serial,
        data.record.nickname,
        data.record.xid || '',
        new Date(data.record.created)
      ]);
      return jsonOut({ success: true });
    }

    // --- 上書き ---
    if (data.action === 'overwrite') {
      var values = sheet.getDataRange().getValues();
      for (var i = 1; i < values.length; i++) {
        if (String(values[i][1]) === String(data.record.serial)) {
          sheet.getRange(i + 1, 1, 1, 5).setValues([[
            data.record.time,
            data.record.serial,
            data.record.nickname,
            data.record.xid || '',
            new Date(data.record.created)
          ]]);
          return jsonOut({ success: true });
        }
      }
      // 見つからない場合は新規追加
      sheet.appendRow([
        data.record.time,
        data.record.serial,
        data.record.nickname,
        data.record.xid || '',
        new Date(data.record.created)
      ]);
      return jsonOut({ success: true });
    }

    return jsonOut({ error: 'Unknown action: ' + data.action });
  } catch (err) {
    return jsonOut({ error: err.toString() });
  }
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
