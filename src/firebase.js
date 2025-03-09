import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebaseの設定情報（Firebaseコンソールから取得）
const firebaseConfig = {
  apiKey: "AIzaSyCcLK_Kk8TXPpgB2uJgjyoiNTlrTJFQ48Q",
  authDomain: "exam-app-4f397.firebaseapp.com",
  projectId: "exam-app-4f397",
  storageBucket: "exam-app-4f397.firebasestorage.app",
  messagingSenderId: "645516545603",
  appId: "1:645516545603:web:68bdfed898173e33f2cef6"
};

// Firebaseアプリの初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);  // ✅ ここでのみ Firestore を定義

// 必要なものをエクスポート
export { auth, provider, db };