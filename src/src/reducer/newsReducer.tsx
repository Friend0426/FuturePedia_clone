export interface toolCategory {
  createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  categoryDescription: string;
  categoryName: string;  
}

export interface NewsState {
  _id: string;
  duplictae: boolean;
  favCount: number;
  image: string;
  pricing: string[];
  publishedAt: string;
  publishedAt_timestamp: number;
  reviewCount: number;
  reviewScore: number;
  socialLinks: string[];
  sponser: boolean;
  startingPrice: string;
  status: string;
  tagsIndex: string[];
  toolCategories: toolCategory[];
  toolName: string;
  toolShortDescription: string;
  verified: boolean;
  verifiedReason: string;
  websiteUrl: string;
}

export type NewsAction = {
  type: string;
  from: number;
  payload: NewsState[];
}

export const newsReducer = (state: NewsState[] = [], action: NewsAction) => {
  console.log(typeof action.type, action.type, "|", action.payload);
  switch (action.type) {
    case 'data':
      return [...state.slice(0, action.from), ...action.payload];
    default:
      return state;
  }
}