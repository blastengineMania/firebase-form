// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { connectFunctionsEmulator, getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-functions.js";
// Firebaseの初期化
const firebaseConfig = {
	authDomain: "blastengine-form.firebaseapp.com",
	projectId: "blastengine-form",
	storageBucket: "blastengine-form.appspot.com",
	messagingSenderId: "314254063614",
	appId: "1:314254063614:web:a495c10d70a35c103eb2af"
};
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
// ローカル開発用
if (location.hostname === "localhost") {
	connectFunctionsEmulator(functions, "localhost", 5001);
}

// 初期化
document.addEventListener('DOMContentLoaded', e => {
	const result = document.querySelector('.result')
	result.style.display = 'none';
	// フォーム送信
	const form = document.querySelector('form#contact');
	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const form = e.target;
		const data = new FormData(form);
		const json = Object.fromEntries(data)
		const res = await httpsCallable(functions, 'contact')(json);
		if (res.data === 'success') {
			result.innerText = '送信しました。お問い合わせいただきありがとうございます。';
			result.style.display = 'block';
			form.reset();
		}
	});
});