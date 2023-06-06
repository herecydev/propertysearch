import { EstateAgent } from "./estateAgent";

type Property = {
  id: string;
  title: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
};

export type PropertySummary = Property & {
  summary: string;
};

export type PropertyDetail = Property & {
  description: string;
  estateAgent: EstateAgent;
};
