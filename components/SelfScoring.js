import { useState, useEffect } from "react";
import { db, auth } from "../src/firebase";
import { setDoc, doc, getDoc, deleteDoc } from "firebase/firestore";

export default function SelfScoring({ questionId }) {
	const [score, setScore] = useState(null);
	const user = auth.currentUser;
	
	useEffect(() => {
			if (!user) return;
			const fetchScore = async () => {
				const scoreRef = doc(db, "users", user.uid, "scores", questionId);
				const scoreSnap = await getDoc(scoreRef);
				if (scoreSnap.exists()) {
					setScore(scoreSnap.data().score);
				}
			};
			fetchScore();
	}, [user, questionId]);
	
	const handleScoreChange = async (selectedScore) => {
		if (!user) {
			alert("ログインしてください");
			return;
		}
		setScore(selectedScore);
		const scoreRef = doc(db, "users", user.uid, "scores", questionId);
		await setDoc(scoreRef, { score: selectedScore });
	};
	
	const handleReset = async () => {
		if (!user) return;
		const scoreRef = doc(db, "users", user.uid, "scores", questionId);
		await deleteDoc(scoreRef);
		setScore(null);
	};
	
	return (
		<div style={{ margin: "20px 0", padding: "10px", border: "1px solid #ddd" }}>
		<h3>問題 {questionId}</h3>
		<button
		onClick={() => handleScoreChange("○")}
		style={{ backgroundColor: score === "○" ? "green" : "white", marginRight: "10px" }}
		>
		○
		</button>
		<button
		onClick={() => handleScoreChange("×")}
		style={{ backgroundColor: score === "×" ? "red" : "white", marginRight: "10px" }}
		>
		×
		</button>
		<button
		onClick={() => handleScoreChange("△")}
		style={{ backgroundColor: score === "△" ? "yellow" : "white" }}
		>
		△
		</button>
		<button
		onClick={handleReset}
		style={{ marginLeft: "10px", padding: "5px", backgroundColor: "gray", color: "white" }}
		>
		リセット
		</button>
		</div>
	);
}