import { AnnoucementType } from "../types/annoucement";

const dummyAnnoucement = {
    id: "1",
    title: "Why You Should Practice and Participate in Competitions!",
    createdAt: "2025-12-20",
    description: "Regular practice and actively attempting competitions play a crucial role in long-term improvement and confidence building.\n\nPracticing consistently helps reinforce fundamental concepts, improve problem-solving speed, and identify weak areas that need more attention.\n\nWhen you attempt competitions, you are exposed to real-world pressure, time constraints, and a variety of challenging problems that go beyond routine practice.\n\nThis experience helps you develop resilience, adaptability, and better decision-making skills.\n\nEven if the results are not perfect, each competition provides valuable feedback and learning opportunities.\n\nOver time, combining focused practice with competition attempts builds discipline, sharpens your skills, and prepares you to perform better in future challenges, exams, or real-life scenarios.",
} as AnnoucementType;

const dummyAnnoucement2 = {
    id: "2",
    title: "How to Manage Your Time Effectively During Exams",
    createdAt: "2025-12-19",
    description: "Effective time management during exams can significantly improve your performance.\n\nStart by quickly scanning through the entire paper to understand the types of questions and allocate your time accordingly.\n\nPrioritize answering the questions you are most confident in first to secure those marks early.\n\nKeep track of time and avoid spending too long on any one question.\n\nIf you get stuck, move on and come back later if time permits.\n\nLastly, leave a few minutes at the end to review your answers and make sure nothing is missed.",
} as AnnoucementType;

const dummyAnnoucement3 = {
    id: "3",
    title: "Tips for Staying Motivated During Long Study Sessions",
    createdAt: "2025-12-18",
    description: "Staying motivated during long study sessions can be challenging but is key to effective learning.\n\nBreak your study time into smaller chunks with short breaks in between to keep your focus sharp.\n\nSet clear, achievable goals for each session to give yourself a sense of progress.\n\nUse techniques like the Pomodoro Technique to balance work and rest.\n\nReward yourself after completing tasks, whether it’s a snack, a walk, or a short activity you enjoy.\n\nRemember, consistency is more important than intensity. Small daily efforts add up to big results!",
} as AnnoucementType;

export const DUMMY_ANNOUNCEMENTS = [dummyAnnoucement, dummyAnnoucement2, dummyAnnoucement3];
