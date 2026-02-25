import React, { useState } from 'react'
import { Search as SearchIcon, X, Clock } from 'lucide-react'

export default function Search({ podcasts, isDarkTheme }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const textClass = isDarkTheme ? 'text-gray-100' : 'text-gray-900'
  const secondaryText = isDarkTheme ? 'text-gray-400' : 'text-gray-600'
  const bgClass = isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
  const inputBg = isDarkTheme ? 'bg-gray-700' : 'bg-white'
  const borderClass = isDarkTheme ? 'border-gray-700' : 'border-gray-200'

  const handleSearch = (query) => {
    setSearchQuery(query)
    setIsSearching(query.length > 0)

    if (query.length === 0) {
      setSearchResults([])
      return
    }

    const queryLower = query.toLowerCase()
    const results = []

    podcasts.forEach((podcast) => {
      podcast.episodes.forEach((episode) => {
        const matchingTranscripts = episode.transcript?.filter(
          (t) =>
            t.text.toLowerCase().includes(queryLower)
        ) || []

        if (
          episode.title.toLowerCase().includes(queryLower) ||
          matchingTranscripts.length > 0
        ) {
          results.push({
            episodeTitle: episode.title,
            podcastTitle: podcast.title,
            creator: podcast.creator,
            image: podcast.image,
            duration: episode.duration,
            timestamps: matchingTranscripts.map((t) => ({
              time: t.time,
              text: t.text,
              highlighted: true
            }))
          })
        }
      })
    })

    setSearchResults(results)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Search Header */}
      <div className={`sticky top-0 z-20 border-b ${borderClass} ${inputBg} backdrop-blur-lg bg-opacity-90`}>
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="relative">
            <SearchIcon size={18} className={`absolute left-3 top-3.5 ${secondaryText}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search episodes, transcripts, creators..."
              className={`w-full pl-10 pr-10 py-2.5 rounded-lg border ${borderClass} outline-none transition-all ${
                isDarkTheme
                  ? 'bg-gray-700 text-white placeholder-gray-500'
                  : 'bg-gray-50 text-gray-900 placeholder-gray-400'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className={`absolute right-3 top-3.5 ${secondaryText} hover:text-gray-700`}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        {isSearching ? (
          <>
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                <h3 className={`text-sm font-bold ${secondaryText} px-2`}>
                  {searchResults.length} Result{searchResults.length !== 1 ? 's' : ''} Found
                </h3>

                {searchResults.map((result, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border ${borderClass} transition-all hover:scale-102 cursor-pointer`}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-2xl">{result.image}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold ${textClass} truncate`}>
                          {result.podcastTitle}
                        </h3>
                        <p className={`text-sm ${secondaryText} truncate`}>{result.creator}</p>
                      </div>
                    </div>

                    {/* Episode Title */}
                    <h4 className={`font-semibold ${textClass} mb-2 line-clamp-2`}>
                      {result.episodeTitle}
                    </h4>

                    {/* Matching Timestamps */}
                    {result.timestamps.length > 0 && (
                      <div className="space-y-2 mt-3 pt-3 border-t border-gray-700">
                        {result.timestamps.slice(0, 3).map((ts, tsIdx) => (
                          <div
                            key={tsIdx}
                            className={`flex items-start gap-2 p-2 rounded ${bgClass}`}
                          >
                            <Clock size={14} className="text-purple-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-semibold text-purple-500`}>
                                {formatTime(ts.time)}
                              </p>
                              <p className={`text-sm ${secondaryText} line-clamp-2`}>
                                {ts.text}
                              </p>
                            </div>
                          </div>
                        ))}
                        {result.timestamps.length > 3 && (
                          <p className={`text-xs ${secondaryText} text-center py-2`}>
                            +{result.timestamps.length - 3} more match{result.timestamps.length - 3 !== 1 ? 'es' : ''}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className={`font-bold ${textClass} mb-2`}>No results found</h3>
                <p className={`text-sm ${secondaryText}`}>
                  Try searching for a different keyword or podcast name
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🎙️</div>
            <h3 className={`font-bold ${textClass} mb-2`}>Search Episodes</h3>
            <p className={`text-sm ${secondaryText}`}>
              Find episodes by keywords, creators, or topics
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
