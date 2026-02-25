import React, { useState } from 'react'
import { Home, Search as SearchIcon, Settings, Moon, Sun } from 'lucide-react'
import HomeScreen from './components/HomeScreen'
import Search from './components/Search'
import DualLayerPlayer from './components/DualLayerPlayer'
import EpisodeHub from './components/EpisodeHub'
import { mockPodcasts } from './data/mockData'

export default function App() {
  const [currentView, setCurrentView] = useState('home')
  const [selectedPodcast, setSelectedPodcast] = useState(null)
  const [selectedEpisode, setSelectedEpisode] = useState(null)
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  // For context-aware UI theme
  const getCurrentTheme = () => {
    if (!selectedPodcast) return isDarkTheme
    // Auto-select theme based on podcast category
    if (selectedPodcast.theme === 'dark') return true
    return isDarkTheme
  }

  const isContextDarkTheme = getCurrentTheme()

  const handleSelectPodcast = (podcast, episode = null) => {
    setSelectedPodcast(podcast)
    setSelectedEpisode(episode || podcast.episodes[0])
    setCurrentView('player')
  }

  const handleBack = () => {
    setCurrentView('home')
    setSelectedPodcast(null)
    setSelectedEpisode(null)
  }

  const bgClass = isContextDarkTheme ? 'bg-gray-900' : 'bg-white'
  const textClass = isContextDarkTheme ? 'text-gray-100' : 'text-gray-900'

  return (
    <div className={`${bgClass} min-h-screen transition-colors duration-300`}>
      {/* Player View */}
      {currentView === 'player' && selectedPodcast && selectedEpisode && (
        <div className="fixed inset-0 z-40">
          <div className={`${bgClass} min-h-screen flex flex-col`}>
            {/* Header */}
            <div className={`sticky top-0 z-50 border-b ${isContextDarkTheme ? 'border-gray-700' : 'border-gray-200'} ${bgClass} backdrop-blur-lg`}>
              <div className="flex items-center justify-between p-4">
                <button
                  onClick={handleBack}
                  className={`text-2xl transition-transform hover:scale-110`}
                >
                  ✕
                </button>
                <h1 className={`font-bold ${textClass}`}>Now Playing</h1>
                <button className={`p-2 rounded-full transition-all ${
                  isContextDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}>
                  <Settings size={20} className={isContextDarkTheme ? 'text-gray-400' : 'text-gray-600'} />
                </button>
              </div>
            </div>

            {/* Player Content */}
            <div className="flex-1 overflow-y-auto pb-96 px-4 pt-4">
              <DualLayerPlayer
                episode={selectedEpisode}
                podcast={selectedPodcast}
                isDarkTheme={isContextDarkTheme}
              />

              {/* Episode Details */}
              <div className="mb-6">
                <h2 className={`text-2xl font-bold ${textClass} mb-4`}>Episode Details</h2>
                <div className={`p-4 rounded-lg ${isContextDarkTheme ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className={`font-semibold ${textClass} mb-2`}>Transcript Preview</h3>
                  <div className="space-y-2">
                    {selectedEpisode.transcript?.slice(0, 5).map((line, idx) => (
                      <div
                        key={idx}
                        className={`text-sm ${isContextDarkTheme ? 'text-gray-400' : 'text-gray-600'} pb-2 border-b ${
                          isContextDarkTheme ? 'border-gray-700' : 'border-gray-200'
                        }`}
                      >
                        <span className="font-semibold text-purple-500">{line.time}s:</span> {line.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Episode Hub */}
            <EpisodeHub
              episode={selectedEpisode}
              podcast={selectedPodcast}
              isDarkTheme={isContextDarkTheme}
            />
          </div>
        </div>
      )}

      {/* Home/Search View */}
      {currentView !== 'player' && (
        <>
          <div className="min-h-screen pb-20">
            {currentView === 'home' && (
              <HomeScreen
                podcasts={mockPodcasts}
                isDarkTheme={isContextDarkTheme}
                onSelectPodcast={handleSelectPodcast}
              />
            )}
            {currentView === 'search' && (
              <Search podcasts={mockPodcasts} isDarkTheme={isContextDarkTheme} />
            )}
          </div>

          {/* Bottom Navigation */}
          <div
            className={`fixed bottom-0 left-0 right-0 border-t ${
              isContextDarkTheme ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            } backdrop-blur-lg`}
          >
            <div className="max-w-2xl mx-auto flex items-center justify-around">
              <button
                onClick={() => setCurrentView('home')}
                className={`flex-1 flex flex-col items-center gap-1 py-4 transition-colors ${
                  currentView === 'home' ? 'text-purple-500' : isContextDarkTheme ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <Home size={24} />
                <span className="text-xs font-semibold">Home</span>
              </button>

              <button
                onClick={() => setCurrentView('search')}
                className={`flex-1 flex flex-col items-center gap-1 py-4 transition-colors ${
                  currentView === 'search' ? 'text-purple-500' : isContextDarkTheme ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <SearchIcon size={24} />
                <span className="text-xs font-semibold">Search</span>
              </button>

              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className={`flex-1 flex flex-col items-center gap-1 py-4 transition-colors ${
                  isContextDarkTheme ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {isContextDarkTheme ? <Sun size={24} /> : <Moon size={24} />}
                <span className="text-xs font-semibold">
                  {isContextDarkTheme ? 'Light' : 'Dark'}
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
