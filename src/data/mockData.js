// Mock podcast data
export const mockPodcasts = [
  {
    id: 1,
    title: "Urban Garden Lab",
    creator: "Elena Rodriguez",
    category: "Educational",
    theme: "vibrant",
    image: "🌱",
    description: "Exploring sustainable urban gardening techniques",
    subscribers: 45200,
    episodes: [
      {
        id: 1,
        title: "Growing Tomatoes in Small Spaces",
        duration: 2340,
        publishedAt: "2 days ago",
        description: "Learn how to maximize your yields with container gardening",
        transcript: [
          { time: 0, text: "Welcome to Urban Garden Lab!" },
          { time: 15, text: "Today we're talking about growing tomatoes" },
          { time: 45, text: "Container gardening is perfect for small spaces" },
          { time: 120, text: "You'll need good drainage holes" },
          { time: 180, text: "Water consistently throughout the season" },
          { time: 300, text: "Pruning techniques to maximize yield" },
          { time: 450, text: "Watch for common pests and diseases" },
        ],
        comments: [
          { author: "GreenThumb_92", text: "Love the pruning tips!", time: 234 },
          { author: "SustyLiving", text: "Perfect for my balcony!", time: 567 },
          { author: "PlantDad", text: "Question about watering frequency?", time: 890 },
        ]
      },
      {
        id: 2,
        title: "Composting 101: Turn Waste into Gold",
        duration: 1920,
        publishedAt: "1 week ago",
        description: "Master the art of composting at home",
        transcript: [
          { time: 0, text: "Welcome back everyone!" },
          { time: 20, text: "Today's episode: composting for beginners" },
          { time: 100, text: "Brown materials: leaves, cardboard, paper" },
          { time: 250, text: "Green materials: food scraps, grass clippings" },
          { time: 400, text: "The magic ratio: 3 parts brown to 1 part green" },
          { time: 600, text: "Moisture is key to decomposition" },
        ],
        comments: [
          { author: "ZeroWaste", text: "Game changer for my garden!", time: 234 },
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Tech Talks Daily",
    creator: "Marcus Chen",
    category: "Technology",
    theme: "dark",
    image: "💻",
    description: "Deep dives into emerging technologies",
    subscribers: 89300,
    episodes: [
      {
        id: 3,
        title: "The Future of AI: Responsible Development",
        duration: 2850,
        publishedAt: "3 days ago",
        description: "Discussing ethical AI and responsible innovation",
        transcript: [
          { time: 0, text: "Tech Talks Daily, episode 156" },
          { time: 30, text: "Today we're discussing AI ethics and responsibility" },
          { time: 120, text: "Bias in machine learning models is a critical issue" },
          { time: 300, text: "Transparency in AI decision-making" },
          { time: 500, text: "Regulatory frameworks around the world" },
          { time: 700, text: "The role of developers in responsible AI" },
        ],
        comments: [
          { author: "TechEthics", text: "Finally someone discussing this!", time: 345 },
          { author: "CodeNinja", text: "Great perspectives from the panel", time: 789 },
        ]
      },
      {
        id: 4,
        title: "Quantum Computing Explained",
        duration: 2200,
        publishedAt: "2 weeks ago",
        description: "Breaking down quantum mechanics for developers",
        transcript: [
          { time: 0, text: "Welcome to Tech Talks Daily" },
          { time: 25, text: "Quantum computing: the next frontier" },
          { time: 150, text: "Qubits: the quantum bit" },
          { time: 300, text: "Superposition and entanglement explained" },
          { time: 500, text: "Current quantum computers and their limitations" },
        ],
        comments: []
      }
    ]
  },
  {
    id: 3,
    title: "True Crime Chronicles",
    creator: "Detective Sarah Winters",
    category: "True Crime",
    theme: "dark",
    image: "🔍",
    description: "Investigating real cases and mysterious disappearances",
    subscribers: 234500,
    episodes: [
      {
        id: 5,
        title: "Case #47: The Missing Paintings",
        duration: 3240,
        publishedAt: "5 days ago",
        description: "A $2M art heist that baffled authorities",
        transcript: [
          { time: 0, text: "True Crime Chronicles, case number 47" },
          { time: 40, text: "The missing paintings investigation" },
          { time: 180, text: "Timeline of events on the night of the heist" },
          { time: 400, text: "Evidence collected at the scene" },
          { time: 650, text: "Suspects and their motives" },
          { time: 900, text: "Breaking: new lead emerges after 5 years" },
        ],
        comments: [
          { author: "CrimeBuff", text: "This is insane! Any updates?", time: 456 },
          { author: "DetectiveMode", text: "The second suspect seems guilty to me", time: 678 },
        ]
      }
    ]
  }
];

// Mock live chat messages
export const mockChatMessages = [
  { id: 1, author: "GreenThumb_92", message: "Love Elena's content!", timestamp: "2m ago", avatar: "👤" },
  { id: 2, author: "SustyLiving", message: "Just started container gardening!", timestamp: "5m ago", avatar: "👤" },
  { id: 3, author: "PlantDad", message: "Anyone else dealing with aphids?", timestamp: "8m ago", avatar: "👤" },
  { id: 4, author: "UrbanFarmer", message: "The drainage tip was so helpful", timestamp: "1m ago", avatar: "👤" },
];

// Mock case file resources
export const mockResources = [
  {
    id: 1,
    type: "update",
    author: "Elena Rodriguez",
    title: "📌 Pinned: Latest Gardening Trends 2024",
    content: "Explore the top 5 gardening trends this season including vertical gardens and hydroponics.",
    date: "2 days ago"
  },
  {
    id: 2,
    type: "resource",
    title: "🔗 Complete Composting Guide",
    description: "Comprehensive PDF guide to composting at home",
    link: "#"
  },
  {
    id: 3,
    type: "resource",
    title: "🔗 Soil Testing Kit Recommendations",
    description: "Top 3 affordable soil testing kits for home gardeners",
    link: "#"
  },
  {
    id: 4,
    type: "update",
    author: "Elena Rodriguez",
    title: "📌 Community Challenge: 30-Day Growth Challenge",
    content: "Join our community in growing something new this month. Share your progress and get featured!",
    date: "1 week ago"
  }
];
