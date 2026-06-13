// 管理者パスワードのSHA-256ハッシュ
// パスワードを変更する場合: echo -n '新パスワード' | shasum -a 256
window.ADMIN_PASS_HASH = '54482595177116e6103b076dbf30648e5d0537dd1ed9cf5ae4562fa8a700d47b';

// Google Apps Script デプロイURL
// gas-code.gs をデプロイ後、取得したURLをここに設定してください
// 空のままにするとローカル(localStorage)モードで動作します
window.GAS_URL = 'https://script.google.com/macros/s/AKfycbzIiRiZNq97FkWCjwikm4R8TC4nOSgadVVnAxDkOBSSwP9Jot6RrYviPtwr8BmMAtWW4w/exec';
