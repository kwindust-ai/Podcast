import React, { useState, useEffect } from 'react'
import { Play, Pause, Volume2, SkipBack, SkipForward, Eye, MessageCircle, Share2, Settings, X, Send, ThumbsUp } from 'lucide-react'
import { creatorEpisodes } from '../data/mockData'

export default function LiveStream({ isDarkTheme, onBack }) {
  const [selectedEpisode, setSelectedEpisode] = useState(creatorEpisodes[0])
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(240) // 4 minutes in
  const [viewerCount, setViewerCount] = useState(3450)
  const [liveChat, setLiveChat] = useState([
    { id: 1, author: 'TrueCrimeFanatic', message: 'That DNA evidence is unbelievable. Game changer for the prosecution!', timestamp: '2m ago', likes: 89 },
    { id: 2, author: 'LawSchoolStudent', message: 'This testimony just proved the chain of custody was maintained. Admissible evidence.', timestamp: '1m ago', likes: 64 },
    { id: 3, author: 'CourtJunkie', message: 'Sarah your analysis is so detailed. Has anyone found the trial transcripts?', timestamp: '45s ago', likes: 45 },
    { id: 4, author: 'InvestigativeReporter', message: 'The motive angle is the weakest link imo. Need more financial records', timestamp: '30s ago', likes: 23 },
  ])
  const [chatInput, setChatInput] = useState('')
  const [volume, setVolume] = useState(70)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= selectedEpisode.duration) {
          setIsPlaying(false)
          return selectedEpisode.duration
        }
        return prev + 1
      })
      // Simulate viewer fluctuation
      setViewerCount(prev => prev + Math.floor(Math.random() * 8 - 3))
    }, 1000)
    return () => clearInterval(interval)
  }, [isPlaying, selectedEpisode.duration])

  const textClass = isDarkTheme ? 'text-gray-100' : 'text-gray-900'
  const secondaryText = isDarkTheme ? 'text-gray-400' : 'text-gray-600'
  const bgClass = isDarkTheme ? 'bg-gray-900' : 'bg-white'
  const cardBg = isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
  const borderClass = isDarkTheme ? 'border-gray-700' : 'border-gray-200'
  const inputBg = isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setLiveChat(prev => [
        ...prev,
        {
          id: prev.length + 1,
          author: 'You',
          message: chatInput,
          timestamp: 'now',
          likes: 0
        }
      ])
      setChatInput('')
    }
  }

  const handleLikeMessage = (id) => {
    setLiveChat(prev => prev.map(msg => 
      msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
    ))
  }

  return (
    <div className={`min-h-screen ${bgClass} flex flex-col`}>
      {/* Header */}
      <div className={`border-b ${borderClass} sticky top-0 z-10 backdrop-blur-lg`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${textClass} flex items-center gap-2`}>
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              Episode Broadcast
            </h1>
            <p className={`text-sm ${secondaryText}`}>{viewerCount.toLocaleString()} watching now</p>
          </div>
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${
              isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
          >
            <X size={24} className={secondaryText} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Player & Controls */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Episode Selector */}
            <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
              {creatorEpisodes.map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => {
                    setSelectedEpisode(ep)
                    setCurrentTime(0)
                    setIsPlaying(true)
                  }}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all flex-shrink-0 ${
                    selectedEpisode.id === ep.id
                      ? 'bg-purple-500 text-white'
                      : `${cardBg} ${textClass} border ${borderClass} hover:border-purple-500`
                  }`}
                >
                  {ep.title}
                </button>
              ))}
            </div>

            {/* Player Area */}
            <div className={`relative rounded-xl overflow-hidden ${cardBg} border ${borderClass} mb-6 aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20`}>
              {/* Player Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎙️</div>
                  <h3 className="text-white text-2xl font-bold">{selectedEpisode.title}</h3>
                  <p className="text-white/70 mt-2">{selectedEpisode.description}</p>
                </div>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-24 h-24 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors flex items-center justify-center shadow-2xl"
                >
                  {isPlaying ? (
                    <Pause size={48} className="text-white fill-white" />
                  ) : (
                    <Play size={48} className="text-white fill-white ml-1" />
                  )}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-gray-300'} rounded-full h-1 mb-2 cursor-pointer hover:h-2 transition-all`}>
                  <div
                    className="bg-purple-500 h-full rounded-full transition-all"
                    style={{ width: `${(currentTime / selectedEpisode.duration) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-white text-xs">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(selectedEpisode.duration)}</span>
                </div>
              </div>
            </div>

            {/* Playback Controls */}
            <div className={`${cardBg} border ${borderClass} rounded-xl p-6`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setCurrentTime(Math.max(0, currentTime - 15))}
                    className={`p-3 rounded-lg transition-colors ${
                      isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <SkipBack size={24} className={textClass} />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-6 py-3 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors flex items-center gap-2 font-bold"
                  >
                    {isPlaying ? (
                      <>
                        <Pause size={20} className="fill-current" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play size={20} className="fill-current ml-0.5" />
                        Play
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setCurrentTime(Math.min(selectedEpisode.duration, currentTime + 15))}
                    className={`p-3 rounded-lg transition-colors ${
                      isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <SkipForward size={24} className={textClass} />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  {/* Volume Control */}
                  <div className="flex items-center gap-2">
                    <Volume2 size={20} className={secondaryText} />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-24 h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className={`text-sm ${secondaryText} w-8`}>{volume}%</span>
                  </div>

                  <button className={`p-3 rounded-lg transition-colors ${
                    isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}>
                    <Share2 size={20} className={textClass} />
                  </button>

                  <button className={`p-3 rounded-lg transition-colors ${
                    isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}>
                    <Settings size={20} className={textClass} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Audience Chat Sidebar */}
          <div className={`${cardBg} border ${borderClass} rounded-xl flex flex-col h-full`}>
            {/* Chat Header */}
            <div className={`border-b ${borderClass} p-4 flex items-center gap-2`}>
              <MessageCircle size={20} className="text-purple-500" />
              <span className={`font-bold ${textClass}`}>Audience Discussion</span>
              <span className={`ml-auto text-sm ${secondaryText}`}>{liveChat.length}</span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {liveChat.map((msg) => (
                <div key={msg.id} className={`${isDarkTheme ? 'bg-gray-700/50' : 'bg-gray-100'} rounded-lg p-3`}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className={`font-bold ${textClass} text-sm`}>{msg.author}</span>
                    <span className={`text-xs ${secondaryText}`}>{msg.timestamp}</span>
                  </div>
                  <p className={`${secondaryText} text-sm mb-2`}>{msg.message}</p>
                  <button
                    onClick={() => handleLikeMessage(msg.id)}
                    className={`text-xs flex items-center gap-1 transition-colors ${
                      isDarkTheme ? 'hover:text-purple-400' : 'hover:text-purple-600'
                    } ${msg.likes > 0 ? 'text-purple-500' : secondaryText}`}
                  >
                    <ThumbsUp size={14} className="fill-current" />
                    {msg.likes > 0 && <span>{msg.likes}</span>}
                  </button>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className={`border-t ${borderClass} p-4`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Join the discussion..."
                  className={`flex-1 px-3 py-2 rounded-lg text-sm outline-none transition-colors ${inputBg}`}
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
