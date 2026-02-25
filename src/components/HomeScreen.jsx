import React, { useState } from 'react'
import { Zap, Library, Play, MoreVertical } from 'lucide-react'

export default function HomeScreen({ podcasts, isDarkTheme, onSelectPodcast }) {
  const [isDiscoveryMode, setIsDiscoveryMode] = useState(false)
  const [currentMicroClipIndex, setCurrentMicroClipIndex] = useState(0)

  const textClass = isDarkTheme ? 'text-gray-100' : 'text-gray-900'
  const secondaryText = isDarkTheme ? 'text-gray-400' : 'text-gray-600'
  const bgClass = isDarkTheme ? 'bg-gray-900' : 'bg-white'
  const secondaryBg = isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
  const borderClass = isDarkTheme ? 'border-gray-700' : 'border-gray-200'

  // Get all episodes for micro-clip view
  const allEpisodes = podcasts.flatMap(podcast =>
    podcast.episodes.map(ep => ({ ...ep, podcast }))
  )

  const currentEpisode = allEpisodes[currentMicroClipIndex]

  const handleSwipeUp = () => {
    setCurrentMicroClipIndex((prev) =>
      prev < allEpisodes.length - 1 ? prev + 1 : prev
    )
  }

  const handleSwipeDown = () => {
    setCurrentMicroClipIndex((prev) =>
      prev > 0 ? prev - 1 : prev
    )
  }

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 border-b ${borderClass} ${bgClass}`}>
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`text-2xl font-bold ${textClass}`}>Sona</h1>
              <p className={`text-xs ${secondaryText}`}>Your Social Podcast Hub</p>
            </div>
            <div className={`px-4 py-2 rounded-full border ${borderClass} flex items-center gap-2 text-sm font-semibold`}>
              <button
                onClick={() => setIsDiscoveryMode(false)}
                className={`flex items-center gap-1 transition-colors ${
                  !isDiscoveryMode
                    ? 'text-purple-500'
                    : secondaryText
                }`}
              >
                <Library size={16} />
                <span className="hidden sm:inline">Library</span>
              </button>
              <div className={`w-px h-4 ${borderClass}`} />
              <button
                onClick={() => setIsDiscoveryMode(true)}
                className={`flex items-center gap-1 transition-colors ${
                  isDiscoveryMode
                    ? 'text-purple-500'
                    : secondaryText
                }`}
              >
                <Zap size={16} />
                <span className="hidden sm:inline">Discover</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 pb-24">
        {!isDiscoveryMode ? (
          /* Library Mode - Subscribed Shows */
          <div className="py-4 space-y-3">
            <h2 className={`text-lg font-bold ${textClass} px-2 mb-4`}>Your Shows</h2>
            {podcasts.map((podcast) => (
              <button
                key={podcast.id}
                onClick={() => onSelectPodcast(podcast)}
                className={`w-full p-4 rounded-xl border ${borderClass} transition-all hover:scale-102 text-left`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg w-14 h-14 flex items-center justify-center flex-shrink-0">
                    {podcast.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold ${textClass} truncate`}>{podcast.title}</h3>
                    <p className={`text-sm ${secondaryText} truncate`}>{podcast.creator}</p>
                    <p className={`text-xs ${secondaryText} mt-1`}>
                      {podcast.subscribers.toLocaleString()} subscribers • {podcast.episodes.length} episodes
                    </p>
                  </div>
                  <Play size={20} className="text-purple-500 flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Discovery Mode - Micro-Clip Feed (TikTok style) */
          <div className="py-4">
            <div className="text-center mb-8">
              <h2 className={`text-lg font-bold ${textClass}`}>Trending Episodes</h2>
              <p className={`text-sm ${secondaryText}`}>Swipe up for more</p>
            </div>

            {currentEpisode && (
              <div className="mb-6">
                {/* Micro Clip Card */}
                <div
                  className={`relative rounded-2xl overflow-hidden border ${borderClass} aspect-video mb-4 transition-all`}
                >
                  {/* Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-20" />

                  {/* Content */}
                  <div className={`relative w-full h-full flex flex-col justify-between p-6 ${secondaryBg}`}>
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{currentEpisode.podcast.image}</div>
                        <div>
                          <h3 className={`font-bold ${textClass} text-sm`}>{currentEpisode.podcast.title}</h3>
                          <p className={`text-xs ${secondaryText}`}>{currentEpisode.podcast.creator}</p>
                        </div>
                      </div>
                      <button className={`p-2 rounded-full hover:${secondaryBg}`}>
                        <MoreVertical size={18} className={secondaryText} />
                      </button>
                    </div>

                    {/* Title */}
                    <div>
                      <h2 className={`text-xl font-bold ${textClass} leading-tight line-clamp-2 mb-2`}>
                        {currentEpisode.title}
                      </h2>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-500 font-semibold">
                          {currentEpisode.podcast.category}
                        </span>
                        <span className={`text-xs ${secondaryText}`}>
                          3.2K reactions • 892 comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-between px-2">
                  <button
                    onClick={handleSwipeDown}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                      isDarkTheme
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => onSelectPodcast(currentEpisode.podcast, currentEpisode)}
                    className="flex-1 px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold text-sm hover:bg-purple-600 transition-colors"
                  >
                    ▶ Play Episode
                  </button>
                  <button
                    onClick={handleSwipeUp}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                      isDarkTheme
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Next →
                  </button>
                </div>

                {/* Progress Indicator */}
                <div className="flex justify-center gap-1 mt-4">
                  {allEpisodes.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 rounded-full transition-all ${
                        idx === currentMicroClipIndex
                          ? 'w-8 bg-purple-500'
                          : isDarkTheme
                          ? 'w-2 bg-gray-700'
                          : 'w-2 bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
