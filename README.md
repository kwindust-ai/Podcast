# Sona - Social Podcast Platform

A functional web-app prototype for "Sona," a social podcast platform with advanced features including a dual-layer player, real-time chat, transcript search, and context-aware UI theming.

## 🚀 Features

### Core Features Implemented

1. **Dual-Layer Player with Timestamp Bubbles**
   - Custom audio player component with visual progress bar
   - Hoverable timestamp bubbles that reveal comments and transcript snippets
   - Seek functionality with time display
   - Volume control

2. **Episode Hub with Two Tabs**
   - **Live Feed**: Real-time mock chat for episode discussion
   - **The Case File**: Structured forum with pinned creator updates and resource links
   - Expandable/collapsible interface with smooth animations

3. **Context-Aware UI Theme**
   - Toggle between "Dark/Serious" theme (for True Crime hubs)
   - And "Vibrant/Social" theme (for Comedy/Educational hubs)
   - Auto-theme selection based on podcast category
   - Manual theme override option

4. **Library Mode vs. Discovery Mode**
   - **Library Mode**: Vertical list of subscribed shows with episode counts
   - **Discovery Mode**: TikTok-style micro-clip feed with swipe navigation
   - Smooth toggle in header

5. **Transcript Search**
   - Search bar that finds episodes by keywords
   - Highlights matching timestamps in results
   - Shows full transcript context for each match

6. **Mock Data**
   - Elena's "Urban Garden Lab" (Educational, Vibrant theme)
   - Marcus's "Tech Talks Daily" (Technology, Dark theme)
   - "True Crime Chronicles" (True Crime, Dark theme)
   - Full episodes with transcripts, timestamps, and comments

## 🛠️ Tech Stack

- **React 18.2.0** - UI framework
- **Vite 4.3.9** - Build tool
- **Tailwind CSS 3.3.0** - Styling
- **Lucide React 0.263.1** - Icons

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

## 🎯 Project Structure

```
src/
├── App.jsx                 # Main application component
├── main.jsx               # React entry point
├── index.css              # Global styles
├── components/
│   ├── DualLayerPlayer.jsx      # Custom audio player
│   ├── EpisodeHub.jsx           # Live feed & case file
│   ├── HomeScreen.jsx           # Library & Discovery modes
│   └── Search.jsx               # Transcript search
└── data/
    └── mockData.js        # Mock podcasts and data
```

## 🎨 Design Features

- **Mobile-First Responsive Design** - Optimized for all screen sizes
- **Smooth Animations** - Slide-up panels, fade transitions
- **Native App Feel** - Bottom navigation, expandable components
- **Accessibility** - Keyboard navigation, clear labels
- **High-End Visual Polish** - Gradients, shadows, micro-interactions

## 🎮 Usage

### Home Screen
- Switch between Library (subscribed shows) and Discovery (trending episodes)
- Tap any episode to start playing

### Player
- Use the play/pause button to control playback
- Click on timestamp bubbles in the progress bar to jump to specific moments
- Expand the episode hub at the bottom to see live chat or resources

### Search
- Type keywords to search across all episodes
- Results show matching timestamps with context
- Click a result to navigate to that episode

### Theme Toggle
- Use the moon/sun icon in the bottom navigation to toggle dark/light mode
- Some podcasts auto-select their theme based on category

## 📝 Mock Data

### Podcasts Included

1. **Urban Garden Lab** by Elena Rodriguez
   - Category: Educational
   - Theme: Vibrant
   - Episodes: Growing Tomatoes, Composting 101

2. **Tech Talks Daily** by Marcus Chen
   - Category: Technology
   - Theme: Dark
   - Episodes: AI Ethics, Quantum Computing

3. **True Crime Chronicles** by Detective Sarah Winters
   - Category: True Crime
   - Theme: Dark
   - Episodes: The Missing Paintings

## 🚀 Future Enhancements

- Audio streaming integration
- User authentication and profiles
- Real-time WebSocket chat
- Timestamp bookmarking
- Share to social media
- Push notifications
- Offline caching
- Advanced search filters

## 📄 License

MIT License - feel free to use this prototype as a foundation for your own podcast platform!
