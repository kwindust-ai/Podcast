# Sona Creator Studio - Design Overview

## 🎯 Project Transformation

**From**: Listener-focused podcast discovery platform
**To**: Creator-centric podcast management and publishing platform

## 👥 User Persona: Podcast Creator

### Primary Goals
- Upload and publish episodes efficiently
- Understand listener behavior through analytics
- Engage with audience in real-time
- Post corrections, resources, and updates
- Grow and monetize their podcast

### Key Pain Points (Addressed)
- Complex multi-step upload processes → Simplified 3-step wizard
- Lack of analytics → Comprehensive dashboard with charts
- No direct audience engagement → Live streaming with chat
- Delayed information sharing → Instant episode updates
- Scattered creator tools → Unified creator studio

## 📱 Core Features

### 1. Dashboard (Home View)
**Purpose**: Quick overview and access to all creator tools

**Components**:
- Creator profile header with podcast info
- 4 key stat cards (subscribers, total listens, hours played, growth %)
- 3 prominent action buttons:
  - 📤 Upload New Episode (primary CTA)
  - 📊 View Analytics
  - 🔴 Go Live
- Recent episodes list preview

**UI Patterns**:
- Grid layout for stats (responsive: 1→2→4 columns)
- Gradient buttons for key actions
- Smooth hover animations

---

### 2. Episode Upload (Upload View)
**Purpose**: Streamlined workflow for publishing episodes

**Step 1: Upload**
- Drag-and-drop audio file area
- Progress bar with percentage
- Supported formats indicator (MP3, WAV, M4A, max 500MB)
- Success confirmation

**Step 2: Details**
- Title input (required)
- Description textarea (required)
- Tags system (up to 5 tags, interactive add/remove)
- Publishing options:
  - Publish Immediately
  - Schedule for Later (datetime picker)
- Explicit content checkbox

**Step 3: Review**
- Success confirmation screen
- Next steps checklist:
  - Episode is now live
  - Notifications sent to subscribers
  - Share to social media (suggested)
  - Monitor analytics (suggested)
- Action buttons: Back to Dashboard, View Episode

**UI Patterns**:
- Multi-step progress indicator (top of page)
- Clear validation states
- Disabled states for incomplete forms
- Animated success state

---

### 3. Analytics (Analytics View)
**Purpose**: Deep insights into episode performance

**Key Sections**:
1. **Episode Selector** - Grid of published episodes
2. **Key Metrics** (4 cards):
   - Total Plays with trend indicator
   - Downloads with trend indicator
   - Average Listen Time
   - Comments count

3. **Time Range Filter** - 7d, 30d, 90d, All-Time

4. **Visualizations** (using Recharts):
   - **Plays Over Time** - Line chart showing daily trends
   - **Listener Behavior** - Pie chart (completion %, partial plays, skipped)
   - **Downloads** - Bar chart over time
   - **New Subscribers** - Line chart acquisition rate

5. **Engagement Metrics** - Final row showing:
   - Total shares
   - Total comments
   - Completion rate %
   - Revenue generated

**UI Patterns**:
- Chart-specific color coding (purple, blue, green, pink)
- Dark/light mode compatible chart styling
- Tooltip interactions on hover
- Episode selector with visual feedback

---

### 4. Live Streaming (Live View)
**Purpose**: Real-time audience engagement and broadcasting

**Main Components**:
1. **Video Feed Area**
   - Large 16:9 aspect ratio display
   - Gradient background (purple to pink)
   - Live badge with pulsing indicator
   - Viewer count (real-time increment simulation)
   - Stream title and description overlay

2. **Microphone Controls**
   - Mute/Unmute button (toggles between red and green)
   - Status indicator text
   - Settings button
   - End Stream button (prominent red)

3. **Live Chat Sidebar**
   - Chat header with message count
   - Scrollable message list
   - Each message shows: author, timestamp, content
   - Message input with Send button

4. **End Stream Modal**
   - Stream summary stats
   - Duration, peak viewers, chat count
   - Save Stream button
   - Back to Dashboard button

**UI Patterns**:
- Full-height flex layout
- Real-time counter updates
- Chat auto-scroll behavior
- Animated live badge with pulse effect

---

### 5. Episode Updates (Updates View)
**Purpose**: Post-publication content management

**Main Sections**:
1. **Episode Selector** - Choose which episode to update

2. **Add Update Form** (expandable):
   - Update type selector (3 options with icons):
     - 📌 Update (announcements)
     - ⚠️ Correction (clarifications)
     - 📄 Resource (links, PDFs)
   - Title input
   - Content textarea
   - Publish/Cancel buttons

3. **Update History**
   - Chronological list of all updates
   - Each update card shows:
     - Icon based on type
     - Title and timestamp
     - Full content
     - Engagement (likes, reply option)
     - More menu

4. **Sidebar - Suggested Updates**
   - Smart suggestions based on:
     - Common listener requests
     - Mentioned resources
     - Follow-up topics
   - Clickable to pre-fill form
   - Best practices tips

**UI Patterns**:
- Three-column layout (left: selector, center: updates, right: suggestions)
- Expandable form with type-specific icons
- Interactive suggestion cards with hover states

---

## 🎨 Design System

### Colors
- **Primary**: Purple (#8b5cf6)
- **Secondary**: Pink (#ec4899)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)
- **Neutral**: Gray (50-900 scale)

### Typography
- Font Family: System default (-apple-system, BlinkMacSystemFont, etc.)
- Headings: Bold (font-bold)
- Body: Regular weight
- Sizes: Responsive (12px → 32px)

### Layout
- Max container width: 1200px (6xl)
- Padding: 16px (mobile) → 32px (desktop)
- Gap/spacing: 8px, 12px, 16px, 24px (8px increments)
- Border radius: 8px (rounded-lg), 12px (rounded-xl), 16px (rounded-2xl)

### Dark Mode
- Background: #111827 (gray-900)
- Cards: #1f2937 (gray-800)
- Borders: #374151 (gray-700)
- Text: #f3f4f6 (gray-100)
- Secondary: #d1d5db (gray-400)

### Responsive Breakpoints
- Mobile: <640px (sm)
- Tablet: 640px-1024px (md, lg)
- Desktop: >1024px (xl, 2xl)

---

## 🔄 Navigation Flow

```
Dashboard
├── Upload → Step 1: Upload → Step 2: Details → Step 3: Review → [Publish]
├── Analytics → Episode Selection → Time Range Filter → [View Charts]
├── Live → Stream Setup → [Start Broadcast] → Chat Interaction → [End Stream]
└── Updates → Episode Selection → [Add/View Updates]

[Back] arrow returns to Dashboard from any view
```

---

## 📊 Mock Data Structure

### Creator Profile
```javascript
{
  name: "Elena Rodriguez",
  email: "elena@urbangarden.com",
  podcastTitle: "Urban Garden Lab",
  podcastImage: "🌱",
  subscribers: 45200,
  totalListens: 892340,
  totalHours: 12450,
  joinedDate: "January 2023",
  theme: "vibrant"
}
```

### Episode
```javascript
{
  id: 1,
  title: "String",
  status: "published|draft|scheduled",
  duration: 2340,  // seconds
  publishedDate: "Feb 22, 2026",
  analytics: {
    plays: 3420,
    downloads: 892,
    avgListenTime: "1:58",
    completionRate: 84,
    shares: 234,
    comments: 127,
    newSubscribers: 48,
    revenue: 234.50
  }
}
```

---

## 🎬 Key Interactions

### Upload Workflow
1. User clicks "Upload New Episode"
2. Drags audio file to drop zone OR clicks to browse
3. File uploads with visual progress (0-100%)
4. Success state shows file name and checkmark
5. User clicks "Next: Episode Details"
6. Fills in required fields (title, description)
7. Optionally adds tags, explicit flag, scheduling
8. Clicks "Review & Publish"
9. Sees success screen with next steps

### Analytics Deep Dive
1. Dashboard shows overall stats
2. User clicks "View Analytics"
3. Selects specific episode from grid
4. Views key metrics immediately
5. Adjusts time range with buttons (7d/30d/90d/all)
6. Charts update with filtered data
7. Can compare multiple episodes by re-selecting

### Live Broadcast
1. User clicks "Go Live"
2. Sees video placeholder and stream title
3. Toggles microphone (red=off, green=on)
4. Viewers appear in live chat
5. Viewer count updates in real-time
6. Creator manages chat interaction
7. Clicks "End Live Stream"
8. Sees summary modal with stats

### Episode Updates
1. User selects episode from dropdown
2. Views all previous updates
3. Clicks "Add Update"
4. Form expands below header
5. Selects update type (radio buttons)
6. Fills title and content
7. Clicks "Publish Update"
8. New update appears at top of history
9. Users can like and reply

---

## 🔧 Technical Implementation

### Component Hierarchy
```
App.jsx
├── CreatorDashboard
├── EpisodeUpload (3-step form)
├── Analytics (with Recharts)
├── LiveStream (chat sidebar)
└── EpisodeUpdates (3-column layout)
```

### State Management
- React hooks (useState) for all components
- Data stored in mockData.js
- Theme toggle in App.jsx (global)
- Navigation via view state (dashboard/upload/analytics/live/updates)

### Styling Approach
- Tailwind CSS utility classes
- No external CSS files
- Responsive classes (sm:, md:, lg:)
- Dark mode via `isDarkTheme` prop
- Conditional classes based on theme

---

## ✨ Best Practices Implemented

1. **Mobile-First Design** - Starts mobile, scales up
2. **Accessible** - Semantic HTML, clear labels
3. **Responsive** - Works on all screen sizes
4. **Dark Mode** - Complete dark/light themes
5. **User Feedback** - Loading states, success confirmations
6. **Error Prevention** - Form validation, disabled states
7. **Performance** - Lightweight, no unnecessary re-renders
8. **Consistency** - Repeated patterns and components

---

## 🚀 Future Iterations

### Phase 2: Enhanced Creator Tools
- Bulk episode upload
- Episode series/seasons
- Audience insights (demographics, geography)
- Comment moderation tools
- Automated transcription

### Phase 3: Monetization
- Sponsorship marketplace
- Premium listener features
- Ad insertion and revenue split
- Subscriber tiers

### Phase 4: Community
- Creator collaboration tools
- Guest invitations
- Content libraries
- Cross-promotion

### Phase 5: Integration
- Social media scheduling
- Email marketing
- RSS feed management
- Distribution to all platforms
