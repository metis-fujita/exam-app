import { useState } from "react";
import { auth, provider, db } from "../src/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

// 必要なコンポーネントをインポート
import CountdownTimer from "../components/CountdownTimer";
import Stopwatch from "../components/Stopwatch";
import SelfScoring from "../components/SelfScoring";
import SelfScoringHistory from "../components/SelfScoringHistory";
import SelfScoringStats from "../components/SelfScoringStats"; // 追加！

export default function Home() {
  const [user, setUser] = useState(null);
  const [lastLogin, setLastLogin] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);

      const userRef = doc(db, "users", result.user.uid);
      await setDoc(
        userRef,
        { lastLogin: new Date().toISOString() },
        { merge: true }
      );

      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setLastLogin(userSnap.data().lastLogin);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("ログインに失敗しました");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setLastLogin(null);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 className="text-3xl font-bold text-blue-500">受験アプリ</h1>

      {user ? (
        <div>
          <p>ようこそ、{user.displayName} さん！</p>
          <p>メール: {user.email}</p>
          {lastLogin && <p>前回のログイン: {new Date(lastLogin).toLocaleString()}</p>}
          <button 
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            onClick={handleLogout} style={{ padding: "10px", fontSize: "16px", marginTop: "10px" }}>
            ログアウト
          </button>
        </div>
      ) : (
        <button 
          className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
          onClick={handleLogin} style={{ padding: "10px", fontSize: "16px" }}>
          Googleでログイン
        </button>
      )}

      {/* タイマー機能の表示 */}
      <CountdownTimer initialTime={300} />
      <Stopwatch />

      {/* 自己採点機能の表示 */}
      <SelfScoring questionId="1" />
      <SelfScoring questionId="2" />
      <SelfScoring questionId="3" />

      {/* 採点履歴の表示 */}
      <SelfScoringHistory />

      {/* 統計データの表示（追加！） */}
      <SelfScoringStats />
    </div>
  );
}