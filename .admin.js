// 管理者パスワードのSHA-256ハッシュ
// パスワードを変更する場合: echo -n '新パスワード' | shasum -a 256
window.ADMIN_PASS_HASH = '1429c4db00774780dccee2b78edfa6b480058eb0ff7fe675be5f7c5fc08c23ba';

// Google Apps Script デプロイURL
// gas-code.gs をデプロイ後、取得したURLをここに設定してください
// 空のままにするとローカル(localStorage)モードで動作します
window.GAS_URL = 'https://script.google.com/macros/s/AKfycbzIiRiZNq97FkWCjwikm4R8TC4nOSgadVVnAxDkOBSSwP9Jot6RrYviPtwr8BmMAtWW4w/exec';
