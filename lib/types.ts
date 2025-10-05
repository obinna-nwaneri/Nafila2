export type UserRole = "ENTREPRENEUR" | "INVESTOR" | "USER" | "ADMIN";

export type EntrepreneurIdea = {
  id: string;
  title: string;
  problem: string;
  solution: string;
  market: string;
  businessModel: string;
  financials: string;
  traction: string;
  sector: string;
  location: string;
  pitchUrl: string | null;
  instagram: string | null;
  otherLinks: string | null;
  isVerified: boolean;
  ownerName: string;
  ownerAvatar: string | null;
  updatedAt: string;
};

export type InvestorProfile = {
  id: string;
  userId: string;
  fullName: string;
  sectors: string[];
  ticketSizeMin: number;
  ticketSizeMax: number;
  geography: string[];
  riskAppetite: string;
  bio: string;
  contactEmail: string;
  linkedIn: string | null;
  website: string | null;
};
