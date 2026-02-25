import React, { useState } from 'react'
import { Send, Lightbulb, Lock, FileText, Link2, ChevronUp } from 'lucide-react'
import { mockChatMessages, mockResources } from '../data/mockData'

export default function EpisodeHub({ episode, podcast, isDarkTheme, onCollapse }) {
  const [activeTab, setActiveTab] = useState('feed')
  const [isExpanded, setIsExpanded] = useState(true)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState(mockChatMessages)

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          author: 'You',
          message: chatInput,
          timestamp: 'now',
          avatar: '😊'
        }
      ])
      setChatInput('')
    }
  }

  const bgClass = isDarkTheme ? 'bg-gray-800' : 'bg-white'
  const textClass = isDarkTheme ? 'text-gray-100' : 'text-gray-900'
  const secondaryBg = isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'
  const secondaryText = isDarkTheme ? 'text-gray-400' : 'text-gray-600'
  const borderClass = isDarkTheme ? 'border-gray-700' : 'border-gray-200'

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 rounded-t-3xl border-t ${borderClass} transition-all duration-300 ${
        isExpanded ? 'h-96' : 'h-16'
      } ${bgClass} shadow-2xl`}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full px-4 py-4 flex items-center justify-between border-b ${borderClass} rounded-t-3xl`}
      >
        <div className="flex-1 text-left">
          <h3 className={`font-bold ${textClass}`}>Episode Discussion</h3>
          {isExpanded && (
            <p className={`text-xs ${secondaryText}`}>
              {activeTab === 'feed' ? 'Live Feed' : 'The Case File'}
            </p>
          )}
        </div>
        <ChevronUp
          size={20}
          className={`transform transition-transform ${isExpanded ? '' : 'rotate-180'}`}
        />
      </button>

      {isExpanded && (
        <>
          {/* Tabs */}
          <div className={`flex border-b ${borderClass}`}>
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${
                activeTab === 'feed'
                  ? `text-purple-500 border-b-2 border-purple-500`
                  : secondaryText
              }`}
            >
              💬 Live Feed
            </button>
            <button
              onClick={() => setActiveTab('case')}
              className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${
                activeTab === 'case'
                  ? `text-purple-500 border-b-2 border-purple-500`
                  : secondaryText
              }`}
            >
              📋 Case File
            </button>
          </div>

          {/* Content */}
          <div className="h-80 overflow-y-auto">
            {activeTab === 'feed' && (
              <div className="flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`text-sm ${textClass}`}>
                      <div className="flex items-start gap-2">
                        <div className="text-lg">{msg.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2">
                            <span className="font-semibold">{msg.author}</span>
                            <span className={`text-xs ${secondaryText}`}>{msg.timestamp}</span>
                          </div>
                          <p className={secondaryText}>{msg.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className={`border-t ${borderClass} p-3`}>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Share your thoughts..."
                      className={`flex-1 px-3 py-2 rounded-lg text-sm outline-none transition-colors ${
                        isDarkTheme
                          ? 'bg-gray-700 text-white placeholder-gray-500'
                          : 'bg-gray-100 text-gray-900 placeholder-gray-400'
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
            )}

            {activeTab === 'case' && (
              <div className="p-4 space-y-3">
                {mockResources.map((resource) => (
                  <div
                    key={resource.id}
                    className={`p-3 rounded-lg border ${borderClass} transition-all hover:scale-102`}
                  >
                    {resource.type === 'update' ? (
                      <>
                        <div className="flex items-start gap-2 mb-2">
                          <Lightbulb size={16} className="text-amber-500 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-baseline gap-2">
                              <h4 className={`font-semibold text-sm ${textClass}`}>{resource.title}</h4>
                            </div>
                            <p className={`text-xs ${secondaryText} mt-1`}>
                              by {resource.author} • {resource.date}
                            </p>
                          </div>
                        </div>
                        <p className={`text-sm ${secondaryText}`}>{resource.content}</p>
                      </>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Link2 size={16} className="text-blue-500 flex-shrink-0" />
                        <div className="flex-1">
                          <a
                            href={resource.link}
                            className="text-sm font-semibold text-blue-500 hover:underline"
                          >
                            {resource.title}
                          </a>
                          <p className={`text-xs ${secondaryText}`}>{resource.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
