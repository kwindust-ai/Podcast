import React, { useState, useEffect } from 'react'
import { Mic, MicOff, Eye, MessageCircle, Share2, Settings, X, Send } from 'lucide-react'

export default function LiveStream({ isDarkTheme, onBack }) {
  const [isLive, setIsLive] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [viewerCount, setViewerCount] = useState(234)
  const [liveChat, setLiveChat] = useState([
    { author: 'Elena', message: '🎙️ LIVE NOW! Join me for Q&A!', timestamp: '30s ago' },
    { author: 'GreenThumb_92', message: 'Love this! Question about indoor herbs?', timestamp: '20s ago' },
    { author: 'PlantDad', message: 'This is amazing content!', timestamp: '15s ago' },
  ])
  const [chatInput, setChatInput] = useState('')
  const [liveTime, setLiveTime] = useState(0)

  useEffect(() => {
    if (!isLive) return
    const interval = setInterval(() => {
      setLiveTime(prev => prev + 1)
      setViewerCount(prev => prev + Math.floor(Math.random() * 5 - 2))
    }, 1000)
    return () => clearInterval(interval)
  }, [isLive])

  const textClass = isDarkTheme ? 'text-gray-100' : 'text-gray-900'
  const secondaryText = isDarkTheme ? 'text-gray-400' : 'text-gray-600'
  const bgClass = isDarkTheme ? 'bg-gray-900' : 'bg-white'
  const cardBg = isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
  const borderClass = isDarkTheme ? 'border-gray-700' : 'border-gray-200'

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
          author: 'You',
          message: chatInput,
          timestamp: 'now'
        }
      ])
      setChatInput('')
    }
  }

  return (
    <div className={`min-h-screen ${bgClass} flex flex-col`}>
      {/* Header */}
      <div className={`border-b ${borderClass} sticky top-0 z-10 backdrop-blur-lg bg-opacity-90`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${textClass} flex items-center gap-2`}>
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              Live Now
            </h1>
            <p className={`text-sm ${secondaryText}`}>{formatTime(liveTime)}</p>
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
        <div className="max-w-6xl mx-auto h-full px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Feed & Controls */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Video Area */}
            <div className={`relative rounded-xl overflow-hidden ${cardBg} border ${borderClass} mb-4 flex-1 min-h-96`}>
              <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center relative">
                <div className="text-8xl animate-pulse">🎙️</div>
                
                {/* Live Badge */}
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  LIVE
                </div>

                {/* Viewer Count */}
                <div className={`absolute top-4 right-4 ${cardBg} border ${borderClass} px-4 py-2 rounded-lg flex items-center gap-2`}>
                  <Eye size={18} className="text-purple-500" />
                  <span className={`font-bold ${textClass}`}>{viewerCount.toLocaleString()}</span>
                </div>

                {/* Stream Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-white text-2xl font-bold">Urban Garden Lab Q&A</h2>
                  <p className="text-white/80 mt-1">Answering your gardening questions live!</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className={`${cardBg} border ${borderClass} rounded-xl p-6 flex items-center justify-between`}>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-lg transition-all ${
                    isMuted
                      ? 'bg-red-500 text-white'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                </button>
                <span className={`font-semibold ${textClass}`}>
                  Microphone {isMuted ? 'Off' : 'On'}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button className={`p-3 rounded-lg transition-colors ${
                  isDarkTheme ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}>
                  <Settings size={24} className={secondaryText} />
                </button>
                <button
                  onClick={() => setIsLive(false)}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
                >
                  End Live Stream
                </button>
              </div>
            </div>
          </div>

          {/* Live Chat Sidebar */}
          <div className={`${cardBg} border ${borderClass} rounded-xl flex flex-col h-full`}>
            {/* Chat Header */}
            <div className={`border-b ${borderClass} p-4 flex items-center gap-2`}>
              <MessageCircle size={20} className="text-purple-500" />
              <span className={`font-bold ${textClass}`}>Live Chat</span>
              <span className={`ml-auto text-sm ${secondaryText}`}>{liveChat.length}</span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {liveChat.map((msg, idx) => (
                <div key={idx} className={`${isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-3`}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className={`font-bold ${textClass} text-sm`}>{msg.author}</span>
                    <span className={`text-xs ${secondaryText}`}>{msg.timestamp}</span>
                  </div>
                  <p className={`${secondaryText} text-sm`}>{msg.message}</p>
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
                  placeholder="Say something..."
                  className={`flex-1 px-3 py-2 rounded-lg text-sm outline-none transition-colors ${
                    isDarkTheme
                      ? 'bg-gray-600 text-white placeholder-gray-400'
                      : 'bg-white text-gray-900 placeholder-gray-500'
                  }`}
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

      {/* End Stream Modal */}
      {!isLive && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`${bgClass} rounded-2xl p-8 max-w-md`}>
            <h2 className={`text-2xl font-bold ${textClass} mb-4`}>Stream Ended</h2>
            <div className={`${cardBg} rounded-lg p-4 mb-6 space-y-3`}>
              <div className="flex justify-between">
                <span className={secondaryText}>Duration</span>
                <span className={`font-bold ${textClass}`}>{formatTime(liveTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className={secondaryText}>Peak Viewers</span>
                <span className={`font-bold ${textClass}`}>{(viewerCount + 150).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className={secondaryText}>Chat Messages</span>
                <span className={`font-bold ${textClass}`}>{liveChat.length}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={onBack}
                className={`flex-1 px-6 py-3 rounded-lg font-bold transition-colors ${
                  isDarkTheme
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Back to Dashboard
              </button>
              <button
                className="flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600 transition-colors"
              >
                Save Stream
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
