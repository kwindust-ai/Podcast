// Mock creator dashboard data
export const creatorProfile = {
  id: 1,
  name: "Detective Sarah Mitchell",
  email: "sarah@crimechronicles.com",
  podcastTitle: "Crime Chronicles Deep Dive",
  podcastImage: "🔍",
  bio: "Investigative true crime journalism covering landmark cases and legal developments",
  subscribers: 127400,
  totalListens: 2342890,
  totalHours: 35680,
  joinedDate: "March 2022",
  theme: "investigative",
}

// Mock episodes data for creator
export const creatorEpisodes = [
  {
    id: 1,
    title: "The Blackwell Case: Part 1 - The Disappearance",
    status: "published",
    duration: 3480,
    publishedAt: "3 days ago",
    publishedDate: "Feb 21, 2026",
    description: "Deep investigation into the disappearance of financial executive James Blackwell and the evidence that emerged in the first 48 hours",
    thumbnail: "🔍",
    fileSize: "52.4 MB",
    analytics: {
      plays: 8420,
      downloads: 2156,
      avgListenTime: "2:58",
      completionRate: 79,
      shares: 567,
      comments: 342,
      newSubscribers: 143,
      revenue: 612.30,
    },
    audioFile: "episode-001.mp3"
  },
  {
    id: 2,
    title: "The Blackwell Case: Part 2 - The Investigation Deepens",
    status: "published",
    duration: 3120,
    publishedAt: "5 days ago",
    publishedDate: "Feb 19, 2026",
    description: "Police discover new evidence, witness testimonies conflict, and a surprising suspect emerges in this pivotal episode",
    thumbnail: "🔍",
    fileSize: "48.8 MB",
    analytics: {
      plays: 7890,
      downloads: 1945,
      avgListenTime: "2:42",
      completionRate: 85,
      shares: 489,
      comments: 298,
      newSubscribers: 118,
      revenue: 534.20,
    },
    audioFile: "episode-002.mp3"
  },
  {
    id: 3,
    title: "The Blackwell Case: Part 3 - Arrest and Breakthrough",
    status: "published",
    duration: 2880,
    publishedAt: "1 week ago",
    publishedDate: "Feb 14, 2026",
    description: "A major arrest is made after DNA evidence surfaces. We analyze what this means for the prosecution's case",
    thumbnail: "🔍",
    fileSize: "44.2 MB",
    analytics: {
      plays: 9150,
      downloads: 2320,
      avgListenTime: "2:35",
      completionRate: 88,
      shares: 623,
      comments: 401,
      newSubscribers: 167,
      revenue: 671.50,
    },
    audioFile: "episode-003.mp3"
  },
  {
    id: 4,
    title: "The Kovac Trial: Opening Arguments & Media Frenzy",
    status: "published",
    duration: 2640,
    publishedAt: "2 weeks ago",
    publishedDate: "Feb 7, 2026",
    description: "We cover the dramatic opening day of the high-profile Kovac embezzlement trial with expert legal analysis",
    thumbnail: "⚖️",
    fileSize: "40.5 MB",
    analytics: {
      plays: 6240,
      downloads: 1456,
      avgListenTime: "2:18",
      completionRate: 82,
      shares: 312,
      comments: 189,
      newSubscribers: 84,
      revenue: 389.75,
    },
    audioFile: "episode-004.mp3"
  },
  {
    id: 5,
    title: "Cold Case Files: The Martinez Connection",
    status: "draft",
    duration: null,
    publishedAt: null,
    createdDate: "Feb 24, 2026",
    description: "New DNA technology reopens a 15-year-old case. Exclusive interview with the lead investigator",
    thumbnail: "🧬",
    progress: 85,
    fileSize: "58.3 MB",
  },
  {
    id: 6,
    title: "Legal Roundup: February Court Decisions",
    status: "scheduled",
    duration: null,
    scheduledFor: "Feb 28, 2026 at 6:00 PM EST",
    description: "Monthly recap of important appellate decisions and their implications for ongoing cases",
    thumbnail: "�",
    isLive: true,
  }
];

// Mock analytics data
export const analyticsData = [
  { day: "Mon", plays: 850, downloads: 210, newSubs: 34 },
  { day: "Tue", plays: 1280, downloads: 320, newSubs: 58 },
  { day: "Wed", plays: 950, downloads: 245, newSubs: 42 },
  { day: "Thu", plays: 1420, downloads: 380, newSubs: 71 },
  { day: "Fri", plays: 1850, downloads: 480, newSubs: 92 },
  { day: "Sat", plays: 2140, downloads: 540, newSubs: 128 },
  { day: "Sun", plays: 1680, downloads: 420, newSubs: 84 },
];

// Mock comments/messages
export const episodeComments = [
  {
    id: 1,
    author: "TrueCrimeJunkie23",
    text: "The Blackwell case just got way more interesting! That DNA evidence is game-changing.",
    timestamp: "2 hours ago",
    likes: 142,
    avatar: "👤"
  },
  {
    id: 2,
    author: "LegalEagle_Pro",
    text: "Excellent analysis of the chain of custody issues. Your legal breakdown is top-notch.",
    timestamp: "5 hours ago",
    likes: 98,
    avatar: "👤"
  },
  {
    id: 3,
    author: "CourtWatcher",
    text: "Can you do a follow-up once the trial starts? This case is too important to miss details on.",
    timestamp: "8 hours ago",
    likes: 76,
    avatar: "👤"
  },
  {
    id: 4,
    author: "InvestigativeJourno",
    text: "Great use of primary sources and court documents. This is real investigative journalism.",
    timestamp: "12 hours ago",
    likes: 64,
    avatar: "👤"
  }
];

// Mock episode updates - now focused on legal developments
export const episodeUpdates = [
  {
    id: 1,
    type: "update",
    title: "BREAKING: Blackwell Case - Preliminary Hearing Scheduled",
    content: "The suspect's preliminary hearing has been scheduled for March 8, 2026. This will be a critical moment where the prosecution must demonstrate probable cause. Court documents now available in our show notes.",
    date: "Feb 23, 2026",
    icon: "⚖️"
  },
  {
    id: 2,
    type: "correction",
    title: "Correction: DNA Timeline",
    content: "In Part 2, I stated the DNA results took 6 weeks. Official court records show they actually arrived in 5 weeks. Thank you to listeners for the correction.",
    date: "Feb 22, 2026",
    icon: "⚠️"
  },
  {
    id: 3,
    type: "update",
    title: "Kovac Trial - Day 2 Summary",
    content: "The prosecution's star witness testified today, revealing previously unknown financial transfers. We've added a detailed breakdown of the transaction timeline to our research page.",
    date: "Feb 21, 2026",
    icon: "📊"
  },
  {
    id: 4,
    type: "update",
    title: "Appellate Court Decision Released",
    content: "The state appeals court ruled on similar evidence admissibility in the Martinez case. This precedent could impact how evidence is handled in Blackwell.",
    date: "Feb 19, 2026",
    icon: "📄"
  }
];

// Mock suggested content - legal updates and case follow-ups
export const suggestedUpdates = [
  {
    id: 1,
    type: "legal-update",
    title: "Preliminary Hearing Coverage",
    description: "Live coverage and real-time analysis of the Blackwell suspect's preliminary hearing on March 8"
  },
  {
    id: 2,
    type: "correction",
    title: "DNA Evidence Chain of Custody",
    description: "Detailed explanation of how DNA evidence was collected, stored, and handled per court documents"
  },
  {
    id: 3,
    type: "expert-analysis",
    title: "Guest Appearance: Criminal Defense Attorney",
    description: "Follow-up episode with legal expert discussing strategy implications of recent testimony"
  },
  {
    id: 4,
    type: "case-comparison",
    title: "Similar Cases & Legal Precedent",
    description: "Analysis of how precedent from similar cases could affect the Blackwell trial outcome"
  },
  {
    id: 5,
    type: "investigative-follow-up",
    title: "Suspect's Background Deep Dive",
    description: "Investigation into the suspect's history, finances, and potential motive"
  }
];

// Episode-specific comments and timestamped updates
export const episodeTimestampedUpdates = {
  1: [ // The Blackwell Case: Part 1
    {
      id: 1,
      timestamp: "12:45",
      title: "DNA Evidence Confirmed",
      content: "Lab results just came in - DNA found under victim's fingernails matches suspect's profile with 99.9% accuracy.",
      postedAt: "Feb 22, 2026 2:30 PM",
      type: "breaking"
    },
    {
      id: 2,
      timestamp: "28:30",
      title: "Witness Statement Update",
      content: "New witness came forward claiming to have seen the suspect near Blackwell's home the night of disappearance.",
      postedAt: "Feb 22, 2026 1:15 PM",
      type: "update"
    }
  ],
  2: [ // The Blackwell Case: Part 2
    {
      id: 1,
      timestamp: "5:20",
      title: "Suspect's Alibi Unravels",
      content: "Suspect claimed to be in another state. Cell phone records place them 2 miles from crime scene.",
      postedAt: "Feb 21, 2026 3:45 PM",
      type: "breaking"
    },
    {
      id: 2,
      timestamp: "34:15",
      title: "Financial Motive Established",
      content: "Blackwell's will leaves entire estate to suspect. Motive now crystal clear.",
      postedAt: "Feb 21, 2026 2:20 PM",
      type: "update"
    }
  ],
  3: [ // The Blackwell Case: Part 3
    {
      id: 1,
      timestamp: "8:30",
      title: "ARREST MADE",
      content: "After DNA confirmation, suspect arrested at home. No resistance during arrest.",
      postedAt: "Feb 20, 2026 5:10 PM",
      type: "breaking"
    },
    {
      id: 2,
      timestamp: "45:00",
      title: "Statement to Police Released",
      content: "Suspect confessed to argument that turned physical. Claims it was self-defense.",
      postedAt: "Feb 20, 2026 4:30 PM",
      type: "major"
    }
  ],
  4: [ // The Kovac Trial
    {
      id: 1,
      timestamp: "15:30",
      title: "First Witness Takes Stand",
      content: "Prosecution's star witness testifies about seeing Kovac move suspicious funds offshore.",
      postedAt: "Feb 21, 2026 11:20 AM",
      type: "update"
    }
  ]
};

export const episodeListenerComments = {
  1: [ // The Blackwell Case: Part 1
    {
      id: 1,
      author: "CriminalJusticeStu",
      message: "Wait, the DNA evidence was found under the fingernails? That means she fought back. This case just got way darker.",
      timestamp: "3 hours ago",
      episodeTimestamp: "12:45",
      likes: 234
    },
    {
      id: 2,
      author: "DetectiveNerd",
      message: "The cell phone records are so important. That's when the alibi completely falls apart.",
      timestamp: "5 hours ago",
      episodeTimestamp: "28:30",
      likes: 189
    },
    {
      id: 3,
      author: "LawStudentLife",
      message: "Can you explain more about how DNA from fingernails is admissible? Chain of custody must be ironclad.",
      timestamp: "7 hours ago",
      episodeTimestamp: "5:20",
      likes: 156
    },
    {
      id: 4,
      author: "TrueCrimeFan89",
      message: "The disappearance seems less mysterious now. When you have motive + opportunity + evidence...",
      timestamp: "8 hours ago",
      episodeTimestamp: "34:15",
      likes: 142
    },
    {
      id: 5,
      author: "ForensicsGeek",
      message: "That 99.9% accuracy is incredible. This case feels solved already and we're only on episode 1!",
      timestamp: "10 hours ago",
      episodeTimestamp: "8:30",
      likes: 198
    }
  ],
  2: [ // The Blackwell Case: Part 2
    {
      id: 1,
      author: "SleuthMaster",
      message: "The alibi falling apart was INSANE. Cell phone records don't lie.",
      timestamp: "2 hours ago",
      episodeTimestamp: "5:20",
      likes: 267
    },
    {
      id: 2,
      author: "CaseAnalyzer",
      message: "Estate worth millions? That's the classic motive right there. Follow the money.",
      timestamp: "4 hours ago",
      episodeTimestamp: "45:00",
      likes: 213
    },
    {
      id: 3,
      author: "TrialWatcher",
      message: "Part 2 is even better than Part 1. The pacing of evidence reveals is perfect.",
      timestamp: "6 hours ago",
      episodeTimestamp: "15:30",
      likes: 178
    },
    {
      id: 4,
      author: "LegalBeagle",
      message: "With cell phone records + financial motive + DNA... prosecution has an airtight case.",
      timestamp: "8 hours ago",
      episodeTimestamp: "52:00",
      likes: 234
    }
  ],
  3: [ // The Blackwell Case: Part 3
    {
      id: 1,
      author: "BreakingNewsBuff",
      message: "THE ARREST! I literally gasped when you announced it. This investigation moved fast.",
      timestamp: "1 hour ago",
      episodeTimestamp: "8:45",
      likes: 445
    },
    {
      id: 2,
      author: "JusticeSeeker",
      message: "The self-defense claim seems weak considering the premeditation shown in earlier episodes.",
      timestamp: "3 hours ago",
      episodeTimestamp: "22:15",
      likes: 289
    },
    {
      id: 3,
      author: "CourtJunkie",
      message: "Can't believe this is going to trial. The confession almost guarantees conviction.",
      timestamp: "5 hours ago",
      likes: 312
    },
    {
      id: 4,
      author: "CriminalDefenseLawyer",
      text: "As someone in the legal field, the prosecution's evidence chain here is exemplary. Defense has a tough road.",
      timestamp: "7 hours ago",
      likes: 223
    }
  ],
  4: [ // The Kovac Trial
    {
      id: 1,
      author: "FinancialCrimeNerd",
      text: "Offshore accounts in the Cayman Islands is textbook money laundering. Kovac is toast.",
      timestamp: "4 hours ago",
      likes: 178
    },
    {
      id: 2,
      author: "TrialObserver",
      text: "That witness testimony at 15:30 was devastating for the defense. Direct evidence of intent.",
      timestamp: "6 hours ago",
      likes: 145
    },
    {
      id: 3,
      author: "CorporateFraud",
      text: "This is the clearest embezzlement case I've heard in ages. Great breakdown Sarah.",
      timestamp: "8 hours ago",
      likes: 167
    }
  ]
};

// Remove old data exports
export const mockChatMessages = []
export const mockResources = []
