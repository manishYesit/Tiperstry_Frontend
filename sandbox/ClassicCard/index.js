import React, { useEffect } from "react";
import CardRoot from "./components/CardRoot"
import lozad from "lozad";


export default function ClassicCard(props) {
	useEffect(() => {
		const observer = lozad(); // lazy loads elements with default selector as '.lozad'
		observer.observe();
	}, []);

	return (
		<div>
			<CardRoot topic={props.topic} />
		</div>
	)
}
