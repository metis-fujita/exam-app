import { useState, useEffect } from "react";
import { db, auth } from "../src/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Chart.js をセットアップ
Chart.register(ArcElement, Tooltip, Legend);

export default function SelfScoringStats() {
	const [stats, setStats] = useState({ "○": 0, "×": 0, "△": 0 });
	const user = auth.currentUser;
	
	useEffect(() => {
			if (!user) return;
			
			const fetchStats = async () => {
				const scoresRef = collection(db, "users", user.uid, "scores");
				const scoresSnap = await getDocs(scoresRef);
				
				let count = { "○": 0, "×": 0, "△": 0 };
				scoresSnap.docs.forEach((doc) => {
						const score = doc.data().score;
						if (count[score] !== undefined) {
							count[score]++;
						}
				});
				
				setStats(count);
			};
			
			fetchStats();
	}, [user]);
	
	// グラフ用のデータ
	const data = {
		labels: ["○", "×", "△"],
		datasets: [
		{
			data: [stats["○"], stats["×"], stats["△"]],
			backgroundColor: ["green", "red", "yellow"],
			hoverOffset: 4,
		},
		],
	};
	
	return (
		<div style={{ margin: "20px 0", padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
		<h2>自己採点統計</h2>
		{stats["○"] + stats["×"] + stats["△"] === 0 ? (
				<p>データがありません</p>
			) : (
				<Pie data={data} />
		)}
		</div>
	);
}