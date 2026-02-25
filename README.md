# Sona Creator Studio

A powerful web-app prototype for podcast creators on the "Sona" social podcast platform. Streamline your podcast creation workflow with upload management, detailed analytics, live streaming, and episode updates.

## 🎙️ Features for Podcast Creators

### 1. **Creator Dashboard**
   - Overview of key statistics (subscribers, total listens, hours played, growth)
   - Quick access buttons for uploading, analytics, and going live
   - Recent episodes list with status indicators

### 2. **Episode Upload Workflow**
   - **Step 1: Upload** - Drag-and-drop audio file upload with progress tracking
   - **Step 2: Details** - Add title, description, tags, and publishing options
   - **Step 3: Review** - Confirm and publish episode with next steps guidance
   - Schedule episodes for future publishing
   - Mark explicit content
   - Support for multiple audio formats (MP3, WAV, M4A)

### 3. **Episode Analytics**
   - **Key Metrics**: Plays, Downloads, Average Listen Time, Comments
   - **Charts & Visualizations**:
     - Plays over time (line chart)
     - Listener behavior (completion rate pie chart)
     - Downloads tracking (bar chart)
     - New subscriber acquisition
   - Time range filters (7d, 30d, 90d, all-time)
   - Episode comparison view
   - Revenue tracking per episode

### 4. **Live Streaming**
   - Real-time episode broadcasting
   - Live chat with listeners
   - Microphone control (mute/unmute)
   - Viewer count tracking
   - Stream summary on end (duration, peak viewers, chat count)
   - Stream saving functionality

### 5. **Episode Updates & Resources**
   - **Post-Episode Updates**:
     - 📌 General Updates
     - ⚠️ Corrections
     - 📄 Resource Links
   - **Suggested Updates** based on listener feedback
   - Like and reply to updates
   - Update history timeline
   - Best practices guide for creators

### 6. **Context-Aware UI**
   - Toggle between dark mode (serious/analytical) and light mode (creative/vibrant)
   - Smooth theme transitions
   - Persistent user preferences

## 🛠️ Tech Stack

- **React 18.2.0** - UI framework
- **Vite 4.3.9** - Build tool and dev server
- **Tailwind CSS 3.3.0** - Styling
- **Lucide React 0.263.1** - Icons
- **Recharts 2.10.3** - Analytics visualizations

## 📦 Installation

1. Clone or navigate to the project directory
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## 🎯 Project Structure

```
src/
├── App.jsx                      # Main application component
├── main.jsx                     # React entry point
├── index.css                    # Global styles
├── components/
│   ├── CreatorDashboard.jsx     # Main dashboard view
│   ├── EpisodeUpload.jsx        # Multi-step upload wizard
│   ├── Analytics.jsx            # Episode analytics & charts
│   ├── LiveStream.jsx           # Live streaming interface
│   ├── EpisodeUpdates.jsx       # Episode updates & resources
│   ├── DualLayerPlayer.jsx      # (Legacy) Custom audio player
│   ├── EpisodeHub.jsx           # (Legacy) Chat & resources
│   ├── HomeScreen.jsx           # (Legacy) Listener home
│   └── Search.jsx               # (Legacy) Transcript search
└── data/
    └── mockData.js              # Creator data & mock analytics
```

## 🎨 Design Features

- **Creator-Focused Interface** - Everything optimized for podcast creators
- **Multi-Step Workflows** - Intuitive uploading and configuration
- **Rich Analytics** - Visual insights into listener behavior
- **Live Interaction** - Real-time connection with your audience
- **Mobile-Responsive** - Works seamlessly on all screen sizes
- **Dark/Light Modes** - Switch between professional and creative themes
- **High-Fidelity Mockups** - Production-ready UI patterns

## 📊 Mock Data

### Creator Profile
- **Name**: Elena Rodriguez
- **Podcast**: Urban Garden Lab 🌱
- **Subscribers**: 45,200
- **Total Listens**: 892,340
- **Hours Played**: 12,450+

### Sample Episodes
1. **Growing Tomatoes in Small Spaces** - Published ✅
   - 3,420 plays, 892 downloads, 84% completion rate
2. **Composting 101** - Published ✅
   - 2,890 plays, 645 downloads, 91% completion rate
3. **Spring Garden Prep** - Draft 📝
4. **Q&A Live** - Scheduled 📅

### Analytics Data
- 7-day analytics with plays, downloads, and new subscriber trends
- Listener behavior breakdown (completion rates)
- Revenue tracking per episode
- Engagement metrics (shares, comments)

## 🚀 User Flows

### Upload Episode
1. Select and upload audio file
2. Add episode details (title, description, tags)
3. Choose publishing options (immediate or scheduled)
4. Review and publish
5. See confirmation with next steps

### View Analytics
1. Select episode from dropdown
2. View key metrics cards
3. Analyze charts over different time ranges
4. Understand listener behavior
5. Track revenue and growth

### Go Live
1. Start live stream
2. Manage microphone and settings
3. Interact with live chat
4. Monitor viewer count
5. End stream and view summary

### Manage Updates
1. Select episode
2. Add corrections, resources, or updates
3. Publish to listener feed
4. Track engagement (likes, replies)
5. Use suggested updates for quick setup

## 🎬 Next Steps & Enhancements

- **Real Audio Processing**: Integrate actual audio file uploads and encoding
- **WebSocket Chat**: Real-time listener chat during live streams
- **Payment Integration**: Monetization and revenue tracking
- **User Authentication**: Creator accounts with email/social login
- **Storage Solutions**: AWS S3 or similar for episode files
- **Notifications**: Email/push alerts for episode activity
- **Social Sharing**: Direct integration with social platforms
- **Advanced SEO**: Show descriptions, keywords, categories
- **Sponsorship Tools**: Manage sponsors and ad breaks
- **Listener Profiles**: Understand your audience demographics
- **A/B Testing**: Test episode descriptions and cover art

## 📄 License

MIT License - Use this prototype as a foundation for your podcast creation platform!

## 🤝 Support

This is a prototype designed for UX/UI evaluation. For production use, additional backend services and security measures would be needed.

