import { useState, useEffect } from "react";

// initialTime は秒単位（例: 5分 → 300秒）
export default function CountdownTimer({ initialTime }) {
	const [timeLeft, setTimeLeft] = useState(initialTime);
	
	useEffect(() => {
			if (timeLeft <= 0) return;
			const timerId = setInterval(() => {
					setTimeLeft((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(timerId);
	}, [timeLeft]);
	
	// 秒数を分:秒の形式にフォーマットする関数
	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}:${secs.toString().padStart(2, "0")}`;
	};
	
	return (
		<div style={{ margin: "20px 0" }}>
		<h2>カウントダウンタイマー</h2>
		<p style={{ fontSize: "24px" }}>{formatTime(timeLeft)}</p>
		{timeLeft === 0 && <p>時間切れです！</p>}
		</div>
	);
}