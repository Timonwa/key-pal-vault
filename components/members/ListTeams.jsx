import React from "react";
import useStore from "../../store";
import { baseURL, authHeaders } from "../../store/axiosDefaults";

export default function ListTeams() {
  const userTeams = useStore((state) => state.userTeams);
	console.log(userTeams);
	
  return <div>ListTeams</div>;
}
