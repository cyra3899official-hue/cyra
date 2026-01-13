// app/types.ts
export interface SkinAnalysisResponse {
  clinical_reasoning?: string;
  problem: string;
  rootCauses: string[];
  thingsToAvoid: string[];
  keyIngredients: string[];
  solutionStrategy: string;
  lifestyleTips: string[];
  expectedResults: string;
  recommendedProduct: {
    name: string;
    price: number;
    reason: string;
  };
}