import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AnalysisSummary {
    id: AnalysisId;
    overallScore: bigint;
    snippet: string;
    timestamp: Timestamp;
    categoryScores: CategoryScores;
}
export type Timestamp = bigint;
export interface Analysis {
    id: AnalysisId;
    overallScore: bigint;
    tips: Array<Tip>;
    resumeText: string;
    timestamp: Timestamp;
    categoryScores: CategoryScores;
}
export interface CategoryScores {
    formatting: bigint;
    education: bigint;
    clarity: bigint;
    experience: bigint;
    keywords: bigint;
    skills: bigint;
}
export type AnalysisId = bigint;
export type AnalysisResult = {
    __kind__: "ok";
    ok: Analysis;
} | {
    __kind__: "err";
    err: string;
};
export interface Tip {
    text: string;
    category: string;
    priority: Priority;
}
export enum Priority {
    low = "low",
    high = "high",
    medium = "medium"
}
export interface backendInterface {
    analyzeResume(resumeText: string): Promise<AnalysisResult>;
    deleteAnalysis(id: AnalysisId): Promise<boolean>;
    getAnalysis(id: AnalysisId): Promise<Analysis | null>;
    listAnalyses(): Promise<Array<AnalysisSummary>>;
}
