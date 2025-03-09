import { useState, useEffect } from "react";
import { db, auth } from "../src/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function SelfScoringHistory() {
	const [scores, setScores] = useState([]);
	const user = auth.currentUser;
	
	useEffect(() => {
			if (!user) return;
			
			const fetchScores = async () => {
				const scoresRef = collection(db, "users", user.uid, "scores");
				const scoresSnap = await getDocs(scoresRef);
				const scoresList = scoresSnap.docs.map(doc => ({
							id: doc.id,
							score: doc.data().score
				}));
				setScores(scoresList);
			};
			
			fetchScores();
	}, [user]);
	
	const handleDelete = async (questionId) => {
		if (!user) return;
		await deleteDoc(doc(db, "users", user.uid, "scores", questionId));
		setScores(scores.filter(q => q.id !== questionId));
	};
	
	return (
		<div style={{ margin: "20px 0", padding: "10px", border: "1px solid #ddd" }}>
		<h2>採点履歴</h2>
		{scores.length === 0 ? (
				<p>採点データがありません</p>
			) : (
				<ul>
				{scores.map((q) => (
							<li key={q.id}>
							問題 {q.id}: {q.score} 
							<button onClick={() => handleDelete(q.id)} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>
							削除
							</button>
							</li>
				))}
				</ul>
		)}
		</div>
	);
}