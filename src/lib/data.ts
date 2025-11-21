import rawData from "@/data/data.json";
import { AppData } from "@/types";

const data = rawData as unknown as AppData;

export function getAppInfo() {
  return data.appInfo;
}

export function getHomePageData() {
  return data.pages.home;
}

export function getProfileData() {
  return data.pages.profile;
}

export function getCompetenciesData() {
  return data.pages.competencies;
}

export function getReferencesData() {
  return data.pages.references;
}

export function getMateriData() {
  return data.materi;
}

export function getTopic(id: string) {
  return data.materi.topics.find((t) => t.id === id);
}

export function getQuizData() {
  return data.quiz;
}

export default data;
