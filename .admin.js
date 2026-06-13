// 管理者パスワードのSHA-256ハッシュ
// パスワードを変更する場合: echo -n '新パスワード' | shasum -a 256
window.ADMIN_PASS_HASH = 'c52b4b58d313a1eea3163de3f72d1658b91fb474992bf2b447777836e800286d';

// Google Apps Script デプロイURL
// gas-code.gs をデプロイ後、取得したURLをここに設定してください
// 空のままにするとローカル(localStorage)モードで動作します
window.GAS_URL = 'https://script.google.com/macros/s/AKfycbzIiRiZNq97FkWCjwikm4R8TC4nOSgadVVnAxDkOBSSwP9Jot6RrYviPtwr8BmMAtWW4w/exec';
