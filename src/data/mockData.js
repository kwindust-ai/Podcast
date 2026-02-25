// Mock creator dashboard data
export const creatorProfile = {
  id: 1,
  name: "Elena Rodriguez",
  email: "elena@urbangarden.com",
  podcastTitle: "Urban Garden Lab",
  podcastImage: "🌱",
  bio: "Exploring sustainable urban gardening techniques",
  subscribers: 45200,
  totalListens: 892340,
  totalHours: 12450,
  joinedDate: "January 2023",
  theme: "vibrant",
}

// Mock episodes data for creator
export const creatorEpisodes = [
  {
    id: 1,
    title: "Growing Tomatoes in Small Spaces",
    status: "published",
    duration: 2340,
    publishedAt: "2 days ago",
    publishedDate: "Feb 22, 2026",
    description: "Learn how to maximize your yields with container gardening",
    thumbnail: "🍅",
    fileSize: "45.2 MB",
    analytics: {
      plays: 3420,
      downloads: 892,
      avgListenTime: "1:58",
      completionRate: 84,
      shares: 234,
      comments: 127,
      newSubscribers: 48,
      revenue: 234.50,
    },
    audioFile: "episode-001.mp3"
  },
  {
    id: 2,
    title: "Composting 101: Turn Waste into Gold",
    status: "published",
    duration: 1920,
    publishedAt: "1 week ago",
    publishedDate: "Feb 15, 2026",
    description: "Master the art of composting at home",
    thumbnail: "🌍",
    fileSize: "38.7 MB",
    analytics: {
      plays: 2890,
      downloads: 645,
      avgListenTime: "1:45",
      completionRate: 91,
      shares: 156,
      comments: 89,
      newSubscribers: 32,
      revenue: 178.30,
    },
    audioFile: "episode-002.mp3"
  },
  {
    id: 3,
    title: "Spring Garden Prep: Season Planning",
    status: "draft",
    duration: null,
    publishedAt: null,
    createdDate: "Feb 23, 2026",
    description: "Getting your garden ready for spring planting",
    thumbnail: "🌸",
    progress: 75,
    fileSize: "52.1 MB",
  },
  {
    id: 4,
    title: "Q&A Live: Your Garden Questions Answered",
    status: "scheduled",
    duration: null,
    scheduledFor: "Feb 28, 2026 at 3:00 PM PST",
    description: "Live episode where I answer your questions about gardening",
    thumbnail: "💬",
    isLive: true,
  }
];

// Mock analytics data
export const analyticsData = [
  { day: "Mon", plays: 320, downloads: 85, newSubs: 12 },
  { day: "Tue", plays: 450, downloads: 120, newSubs: 18 },
  { day: "Wed", plays: 380, downloads: 95, newSubs: 14 },
  { day: "Thu", plays: 520, downloads: 145, newSubs: 22 },
  { day: "Fri", plays: 680, downloads: 180, newSubs: 32 },
  { day: "Sat", plays: 890, downloads: 210, newSubs: 41 },
  { day: "Sun", plays: 640, downloads: 160, newSubs: 28 },
];

// Mock comments/messages
export const episodeComments = [
  {
    id: 1,
    author: "GreenThumb_92",
    text: "Love the pruning tips! Can you do a follow-up on indoor gardening?",
    timestamp: "2 hours ago",
    likes: 42,
    avatar: "👤"
  },
  {
    id: 2,
    author: "SustyLiving",
    text: "Perfect for my balcony! Just implemented your drainage system.",
    timestamp: "5 hours ago",
    likes: 38,
    avatar: "👤"
  },
  {
    id: 3,
    author: "PlantDad",
    text: "Question about watering frequency in hot climates?",
    timestamp: "8 hours ago",
    likes: 12,
    avatar: "👤"
  }
];

// Mock episode updates
export const episodeUpdates = [
  {
    id: 1,
    type: "update",
    title: "New Resources Added",
    content: "I've added a downloadable PDF guide for container gardening measurements.",
    date: "Feb 22, 2026",
    icon: "📄"
  },
  {
    id: 2,
    type: "correction",
    title: "Correction: Watering Schedule",
    content: "In the episode I mentioned watering twice daily, but for most vegetables once daily is sufficient.",
    date: "Feb 22, 2026",
    icon: "⚠️"
  }
];

// Mock suggested content
export const suggestedUpdates = [
  {
    id: 1,
    type: "resource",
    title: "Soil Testing Kit",
    description: "Link to the recommended soil testing kit mentioned in episode"
  },
  {
    id: 2,
    type: "correction",
    title: "Watering Frequency",
    description: "Clarification on watering schedules for different vegetables"
  },
  {
    id: 3,
    type: "followup",
    title: "Indoor Gardening Deep Dive",
    description: "Follow-up episode based on listener requests"
  }
];

// Remove old data exports
export const mockChatMessages = []
export const mockResources = []
