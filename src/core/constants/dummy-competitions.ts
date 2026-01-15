import { Track, Competition } from "../types";
import { TRACK_DATA } from "./tracks-info";

export const dummyCompetitions: Competition[] = [
  {
    id: "comp1",
    title: "React Native Hackathon",
    date: "2024-11-10",
    description: "A 48-hour hackathon focused on building innovative React Native apps.",
    trackId: TRACK_DATA[Track.MOBILE].id,
    score: 71,  // stretched hardcoded
  },
  {
    id: "comp2",
    title: "Backend API Challenge",
    date: "2024-09-22",
    description: "Develop a secure and efficient REST API within 24 hours.",
    trackId: TRACK_DATA[Track.BACKEND].id,
    score: 91,  // stretched hardcoded
  },
  {
    id: "comp3",
    title: "Front-End Design Sprint",
    date: "2024-10-05",
    description: "Create an engaging and responsive user interface using modern web technologies.",
    trackId: TRACK_DATA[Track.FRONTEND].id,
    score: 50,  // stretched hardcoded
  },
  {
    id: "comp4",
    title: "Database Optimization Contest",
    date: "2024-08-15",
    description: "Improve query performance and schema design for a large dataset.",
    trackId: TRACK_DATA[Track.DATABASE].id,
    score: 79,  // stretched hardcoded
  },
  {
    id: "comp5",
    title: "AI Model Hackathon",
    date: "2024-12-01",
    description: "Build a machine learning model to predict user behavior from raw data.",
    trackId: TRACK_DATA[Track.AI].id,
    score: 100, // stretched hardcoded
  },
  {
    id: "comp6",
    title: "Cybersecurity Capture The Flag",
    date: "2024-07-30",
    description: "Solve security challenges and find vulnerabilities in a simulated environment.",
    trackId: TRACK_DATA[Track.SECURITY].id,
    score: 59,  // stretched hardcoded
  },
  {
    id: "comp7",
    title: "DevOps Automation Challenge",
    date: "2024-09-10",
    description: "Automate deployment pipelines and infrastructure provisioning.",
    trackId: TRACK_DATA[Track.DEVOPS].id,
    score: 85,  // stretched hardcoded
  },
  {
    id: "comp8",
    title: "Game Jam",
    date: "2024-11-20",
    description: "Create a playable game prototype in 72 hours using Unity or Unreal Engine.",
    trackId: TRACK_DATA[Track.GAME].id,
    score: 68,  // stretched hardcoded
  },
  {
    id: "comp9",
    title: "Game Jam 2",
    date: "2024-11-20",
    description: "Create a playable game prototype in 72 hours using Unity or Unreal Engine.",
    trackId: TRACK_DATA[Track.GAME].id,
    score: 68,  // stretched hardcoded
  },
  {
    id: "comp10",
    title: "Game Jam 3",
    date: "2024-11-20",
    description: "Create a playable game prototype in 72 hours using Unity or Unreal Engine.",
    trackId: TRACK_DATA[Track.GAME].id,
    score: 68,  // stretched hardcoded
  },
];

export const getCompetitionById = (id: string) => {
  return dummyCompetitions.find((competition) => competition.id === id);
}