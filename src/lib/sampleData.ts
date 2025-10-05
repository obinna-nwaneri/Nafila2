export type UserRole = "entrepreneur" | "investor" | "admin" | "general";

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  socialHandles?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    website?: string;
  };
  verification?: {
    kycStatus: "pending" | "verified" | "rejected";
    businessDocs?: string[];
  };
  metrics?: {
    followers: number;
    likes: number;
    dealsClosed?: number;
  };
}

export interface BusinessIdea {
  id: string;
  ownerId: string;
  title: string;
  sector: string;
  problem: string;
  solution: string;
  marketOpportunity: string;
  businessModel: string;
  financialProjections: string;
  traction: string;
  location: string;
  media?: {
    pitchVideo?: string;
    deckUrl?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  status: "raising" | "bootstrapped" | "idea" | "growing";
  targetRaise?: string;
  followers: number;
  likes: number;
}

export interface InvestorProfile {
  id: string;
  userId: string;
  ticketSize: string;
  sectors: string[];
  geography: string[];
  riskAppetite: "low" | "medium" | "high";
  tractionPreference: string;
  watchlist: string[];
}

export interface FeedEntry {
  id: string;
  userId: string;
  message: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export const users: UserAccount[] = [
  {
    id: "user_entrepreneur_1",
    name: "Amina Yusuf",
    email: "amina@nafila.africa",
    role: "entrepreneur",
    password: "Nafila@2024",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    bio: "Founder of EcoPack, transforming agricultural waste into biodegradable packaging.",
    location: "Lagos, Nigeria",
    socialHandles: {
      linkedin: "https://linkedin.com/in/aminayusuf",
      instagram: "https://instagram.com/ecopack.africa",
      youtube: "https://youtube.com/@ecopack"
    },
    verification: {
      kycStatus: "verified",
      businessDocs: ["CAC-REG-10293", "TIN-445620"]
    },
    metrics: {
      followers: 420,
      likes: 1365,
      dealsClosed: 2
    }
  },
  {
    id: "user_investor_1",
    name: "Kwame Mensah",
    email: "kwame.mensah@panthera.vc",
    role: "investor",
    password: "InvestSmart!2024",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    bio: "Partner at Panthera Capital investing in sustainable supply-chain infrastructure.",
    location: "Accra, Ghana",
    socialHandles: {
      linkedin: "https://linkedin.com/in/kwamemensah",
      twitter: "https://twitter.com/kwameVC"
    },
    verification: {
      kycStatus: "verified",
      businessDocs: ["SEC-INV-9043"]
    },
    metrics: {
      followers: 880,
      likes: 2390,
      dealsClosed: 14
    }
  },
  {
    id: "user_admin_1",
    name: "Nafila Admin",
    email: "admin@nafila.africa",
    role: "admin",
    password: "AdminSecure#2024",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    bio: "Operational excellence lead managing onboarding, moderation, and analytics.",
    location: "Remote",
    verification: {
      kycStatus: "verified"
    },
    metrics: {
      followers: 240,
      likes: 640
    }
  }
];

export const primaryEntrepreneurIdeas: BusinessIdea[] = [
  {
    id: "idea_1",
    ownerId: "user_entrepreneur_1",
    title: "EcoPack Africa",
    sector: "Circular Economy",
    problem: "Over 8M tons of plastic waste produced annually in West Africa with limited recycling.",
    solution: "Biodegradable packaging made from cassava peels sourced from smallholder farmers.",
    marketOpportunity: "Food & beverage brands seeking ESG compliant packaging in ECOWAS.",
    businessModel: "B2B supply contracts with FMCGs and marketplaces.",
    financialProjections: "$1.5M ARR forecast by FY26 with 45% gross margin.",
    traction: "Signed MOUs with 3 FMCGs and delivered 50 pilot shipments.",
    location: "Lagos, Nigeria",
    media: {
      pitchVideo: "https://youtu.be/ecoPackPitch",
      instagram: "https://instagram.com/ecopack.africa",
      youtube: "https://youtube.com/@ecopack"
    },
    status: "raising",
    targetRaise: "$750k Seed",
    followers: 260,
    likes: 940
  },
  {
    id: "idea_2",
    ownerId: "user_entrepreneur_1",
    title: "SafiCold Logistics",
    sector: "AgriTech",
    problem: "Post-harvest losses cost East African farmers $4B annually due to inadequate cold chain.",
    solution: "Solar-powered cold storage pods deployed through cooperatives.",
    marketOpportunity: "1.4M smallholder farmers within East African Grain Council.",
    businessModel: "Revenue share model with cooperatives and B2B contracts with exporters.",
    financialProjections: "$3.2M ARR by FY27 with 35% EBITDA margin.",
    traction: "120 pilot farmers onboarded with 28% waste reduction.",
    location: "Nairobi, Kenya",
    media: {
      pitchVideo: "https://youtu.be/saficoldPitch",
      instagram: "https://instagram.com/saficold"
    },
    status: "growing",
    targetRaise: "$1.2M Series A",
    followers: 410,
    likes: 1280
  },
  {
    id: "idea_3",
    ownerId: "user_entrepreneur_1",
    title: "BluePulse Health",
    sector: "HealthTech",
    problem: "Clinics lack remote monitoring for chronic patients leading to avoidable readmissions.",
    solution: "AI-enabled vitals monitoring with clinician dashboards and patient wearables.",
    marketOpportunity: "175k chronic patients served by regional hospitals in Ghana.",
    businessModel: "Subscription-based SaaS for hospitals plus device rentals.",
    financialProjections: "$980k ARR within 24 months, break-even at 18 months.",
    traction: "3 hospitals in pilot with 1,200 patients enrolled.",
    location: "Accra, Ghana",
    media: {
      pitchVideo: "https://youtu.be/bluepulsePitch"
    },
    status: "raising",
    targetRaise: "$500k Seed",
    followers: 330,
    likes: 1050
  }
];

export const primaryInvestors: InvestorProfile[] = [
  {
    id: "investor_profile_1",
    userId: "user_investor_1",
    ticketSize: "$100k - $500k",
    sectors: ["Circular Economy", "AgriTech", "Climate"],
    geography: ["West Africa", "East Africa"],
    riskAppetite: "medium",
    tractionPreference: "Post-revenue with demonstrable supply chain partners.",
    watchlist: ["idea_1", "idea_2"]
  },
  {
    id: "investor_profile_2",
    userId: "user_investor_1",
    ticketSize: "$500k - $1.5M",
    sectors: ["HealthTech", "FinTech"],
    geography: ["West Africa"],
    riskAppetite: "medium",
    tractionPreference: "Clinics with >500 patients or ARR > $40k.",
    watchlist: ["idea_3"]
  }
];

export const socialFeed: FeedEntry[] = [
  {
    id: "feed_1",
    userId: "user_entrepreneur_1",
    message: "EcoPack just shipped our 10,000th compostable mailer with zero delivery defects!",
    timestamp: "2024-05-18T08:30:00Z",
    likes: 124,
    comments: 16
  },
  {
    id: "feed_2",
    userId: "user_investor_1",
    message: "Reviewing sustainable supply chain pitches this week. Drop your decks!",
    timestamp: "2024-05-19T11:00:00Z",
    likes: 212,
    comments: 45
  },
  {
    id: "feed_3",
    userId: "user_admin_1",
    message: "New compliance update: upload CAC certificates and national IDs before June 30 for verification badges.",
    timestamp: "2024-05-20T17:45:00Z",
    likes: 86,
    comments: 9
  }
];
