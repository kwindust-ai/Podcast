import React, { useState, useEffect } from 'react'
import { Play, Pause, Volume2, Share2, Heart } from 'lucide-react'

export default function DualLayerPlayer({ episode, podcast, isDarkTheme }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [hoveredBubble, setHoveredBubble] = useState(null)
  const [volume, setVolume] = useState(70)

  const duration = episode?.duration || 2340

  // Simulate time progression
  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false)
            return duration
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration])

  const handleSeek = (time) => {
    setCurrentTime(Math.min(Math.max(time, 0), duration))
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Create timestamp markers from transcript
  const markers = episode?.transcript?.slice(0, 5).map((item, idx) => ({
    ...item,
    id: idx,
    position: (item.time / duration) * 100
  })) || []

  const bgClass = isDarkTheme ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-50'
  const textClass = isDarkTheme ? 'text-gray-100' : 'text-gray-900'
  const secondaryText = isDarkTheme ? 'text-gray-400' : 'text-gray-600'

  return (
    <div className={`${bgClass} rounded-2xl p-6 mb-6`}>
      {/* Episode Info */}
      <div className="flex gap-4 mb-6">
        <div className={`text-5xl bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl w-16 h-16 flex items-center justify-center`}>
          {podcast?.image}
        </div>
        <div className="flex-1">
          <h3 className={`text-sm font-semibold ${secondaryText}`}>{podcast?.creator}</h3>
          <h2 className={`text-xl font-bold ${textClass} line-clamp-2`}>{episode?.title}</h2>
          <p className={`text-xs ${secondaryText} mt-1`}>{formatTime(duration)}</p>
        </div>
      </div>

      {/* Progress Bar with Timestamp Bubbles */}
      <div className="mb-4">
        <div className="relative h-12 mb-3">
          {/* Base progress track */}
          <div
            className={`absolute bottom-4 w-full h-1.5 rounded-full cursor-pointer ${
              isDarkTheme ? 'bg-gray-700' : 'bg-gray-300'
            }`}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const percentage = (e.clientX - rect.left) / rect.width
              handleSeek(percentage * duration)
            }}
          >
            {/* Filled progress */}
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          {/* Timestamp Bubbles */}
          {markers.map((marker) => (
            <div
              key={marker.id}
              className="absolute bottom-5 transform -translate-x-1/2 cursor-pointer"
              style={{ left: `${marker.position}%` }}
              onMouseEnter={() => setHoveredBubble(marker.id)}
              onMouseLeave={() => setHoveredBubble(null)}
              onClick={() => handleSeek(marker.time)}
            >
              {/* Bubble */}
              <div
                className={`w-2 h-2 rounded-full transform transition-all ${
                  hoveredBubble === marker.id
                    ? 'scale-150 bg-pink-500'
                    : isDarkTheme
                    ? 'bg-gray-500 hover:bg-pink-400'
                    : 'bg-purple-400 hover:bg-pink-500'
                }`}
              />

              {/* Tooltip */}
              {hoveredBubble === marker.id && (
                <div
                  className={`absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs px-2 py-1 rounded ${
                    isDarkTheme
                      ? 'bg-gray-800 text-gray-100'
                      : 'bg-gray-900 text-white'
                  } pointer-events-none z-10`}
                >
                  <div className="font-semibold">{formatTime(marker.time)}</div>
                  <div className="text-xs opacity-90 max-w-xs line-clamp-2">{marker.text}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Time Display */}
        <div className="flex justify-between text-xs">
          <span className={`font-semibold ${secondaryText}`}>{formatTime(currentTime)}</span>
          <span className={secondaryText}>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-4">
        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center justify-center w-12 h-12 rounded-full font-bold transition-all ${
            isDarkTheme
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-400/50'
          }`}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Volume Control */}
        <div className="flex items-center gap-2 flex-1">
          <Volume2 size={18} className={secondaryText} />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full cursor-pointer accent-purple-500"
          />
          <span className={`text-xs ${secondaryText} w-8`}>{volume}%</span>
        </div>

        {/* Action Buttons */}
        <button className={`p-2 rounded-full transition-all hover:scale-110 ${
          isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-white'
        }`}>
          <Heart size={20} className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} />
        </button>
        <button className={`p-2 rounded-full transition-all hover:scale-110 ${
          isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-white'
        }`}>
          <Share2 size={20} className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} />
        </button>
      </div>

      {/* Episode Description */}
      <p className={`text-sm ${secondaryText} leading-relaxed`}>
        {episode?.description}
      </p>
    </div>
  )
}
