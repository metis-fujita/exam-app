import { useState, useEffect } from "react";

export default function Stopwatch() {
	const [elapsed, setElapsed] = useState(0);
	const [running, setRunning] = useState(false);
	
	useEffect(() => {
			let timerId;
			if (running) {
				timerId = setInterval(() => {
						setElapsed((prev) => prev + 1);
				}, 1000);
			}
			return () => clearInterval(timerId);
	}, [running]);
	
	const formatTime = (seconds) => {
		const min = Math.floor(seconds / 60);
		const sec = seconds % 60;
		return `${min}:${sec.toString().padStart(2, "0")}`;
	};
	
	return (
		<div style={{ margin: "20px 0" }}>
		<h2>ストップウォッチ</h2>
		<p style={{ fontSize: "24px" }}>{formatTime(elapsed)}</p>
		<button onClick={() => setRunning(true)} style={{ marginRight: "10px" }}>
		スタート
		</button>
		<button onClick={() => setRunning(false)} style={{ marginRight: "10px" }}>
		ストップ
		</button>
		<button onClick={() => { setElapsed(0); setRunning(false); }}>
		リセット
		</button>
		</div>
	);
}