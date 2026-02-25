import React, { useState } from 'react'
import { Upload, X, Check, AlertCircle } from 'lucide-react'

export default function EpisodeUpload({ isDarkTheme, onBack }) {
  const [step, setStep] = useState(1) // 1: Upload, 2: Details, 3: Preview
  const [fileName, setFileName] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    tags: [],
    explicit: false,
    publishDate: 'now',
    scheduleDate: '',
  })
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [tagInput, setTagInput] = useState('')

  const textClass = isDarkTheme ? 'text-gray-100' : 'text-gray-900'
  const secondaryText = isDarkTheme ? 'text-gray-400' : 'text-gray-600'
  const bgClass = isDarkTheme ? 'bg-gray-900' : 'bg-white'
  const cardBg = isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
  const borderClass = isDarkTheme ? 'border-gray-700' : 'border-gray-200'
  const inputBg = isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileName(file.name)
      setIsUploading(true)
      // Simulate upload
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setIsUploading(false)
        }
        setUploadProgress(Math.min(progress, 100))
      }, 300)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const addTag = () => {
    if (tagInput.trim() && formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const removeTag = (idx) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== idx)
    }))
  }

  const handlePublish = () => {
    // Simulate publish
    setStep(3)
  }

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Header */}
      <div className={`border-b ${borderClass} sticky top-0 z-10`}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${textClass}`}>Upload New Episode</h1>
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${
              isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
          >
            <X size={24} className={secondaryText} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className={`border-t ${borderClass}`}>
          <div className="max-w-4xl mx-auto px-4 py-4 flex gap-4">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                      s <= step
                        ? 'bg-purple-500 text-white'
                        : isDarkTheme
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {s}
                  </div>
                  <span className={`text-sm font-semibold ${s <= step ? 'text-purple-500' : secondaryText}`}>
                    {['Upload', 'Details', 'Review'][s - 1]}
                  </span>
                </div>
                <div className={`h-1 rounded-full ${s < step ? 'bg-purple-500' : isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {step === 1 && (
          <div>
            {/* File Upload Area */}
            <label className={`border-2 border-dashed ${borderClass} rounded-xl p-12 text-center cursor-pointer transition-all hover:border-purple-500 ${
              isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
            }`}>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Upload size={48} className="text-purple-500 mx-auto mb-4" />
              <h3 className={`text-lg font-bold ${textClass} mb-2`}>
                {fileName || 'Drop your audio file here'}
              </h3>
              <p className={`${secondaryText} mb-4`}>or click to browse</p>
              <p className={`text-xs ${secondaryText}`}>Supports MP3, WAV, M4A • Max 500MB</p>
            </label>

            {/* Upload Progress */}
            {fileName && (
              <div className={`${cardBg} border ${borderClass} rounded-xl p-6 mt-6`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-semibold ${textClass}`}>{fileName}</span>
                  <span className={`text-sm ${secondaryText}`}>{Math.round(uploadProgress)}%</span>
                </div>
                <div className={`w-full h-2 rounded-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                {uploadProgress === 100 && !isUploading && (
                  <div className="flex items-center gap-2 mt-4 text-green-500">
                    <Check size={20} />
                    <span className="font-semibold">Upload complete!</span>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={onBack}
                className={`flex-1 px-6 py-3 rounded-lg font-bold transition-colors ${
                  isDarkTheme
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={!fileName || uploadProgress < 100}
                className={`flex-1 px-6 py-3 rounded-lg font-bold transition-colors ${
                  fileName && uploadProgress === 100
                    ? 'bg-purple-500 text-white hover:bg-purple-600'
                    : isDarkTheme
                    ? 'bg-gray-800 text-gray-600'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                Next: Episode Details
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className={`block text-sm font-bold ${textClass} mb-2`}>Episode Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., How to Grow Organic Lettuce Indoors"
                className={`w-full px-4 py-3 rounded-lg border ${borderClass} outline-none transition-colors ${inputBg}`}
              />
            </div>

            {/* Description */}
            <div>
              <label className={`block text-sm font-bold ${textClass} mb-2`}>Episode Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your episode content..."
                rows="5"
                className={`w-full px-4 py-3 rounded-lg border ${borderClass} outline-none transition-colors resize-none ${inputBg}`}
              />
            </div>

            {/* Tags */}
            <div>
              <label className={`block text-sm font-bold ${textClass} mb-2`}>Tags (up to 5)</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Add tag and press Enter"
                  className={`flex-1 px-4 py-2 rounded-lg border ${borderClass} outline-none transition-colors ${inputBg}`}
                />
                <button
                  onClick={addTag}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, idx) => (
                  <div key={idx} className="bg-purple-500/20 text-purple-500 px-3 py-1 rounded-full flex items-center gap-2">
                    {tag}
                    <button onClick={() => removeTag(idx)} className="hover:text-purple-600">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Publishing Options */}
            <div className={`${cardBg} border ${borderClass} rounded-xl p-6`}>
              <h3 className={`font-bold ${textClass} mb-4`}>Publishing Options</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="publishDate"
                    value="now"
                    checked={formData.publishDate === 'now'}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className={`font-semibold ${textClass}`}>Publish Immediately</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="publishDate"
                    value="schedule"
                    checked={formData.publishDate === 'schedule'}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <div>
                    <span className={`font-semibold ${textClass} block`}>Schedule for Later</span>
                    {formData.publishDate === 'schedule' && (
                      <input
                        type="datetime-local"
                        name="scheduleDate"
                        value={formData.scheduleDate}
                        onChange={handleInputChange}
                        className={`mt-2 px-3 py-2 rounded-lg border ${borderClass} outline-none ${inputBg}`}
                      />
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Explicit Content */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="explicit"
                checked={formData.explicit}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className={`${textClass}`}>Mark as explicit content</span>
            </label>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className={`flex-1 px-6 py-3 rounded-lg font-bold transition-colors ${
                  isDarkTheme
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Back
              </button>
              <button
                onClick={() => handlePublish()}
                disabled={!formData.title || !formData.description}
                className={`flex-1 px-6 py-3 rounded-lg font-bold transition-colors ${
                  formData.title && formData.description
                    ? 'bg-purple-500 text-white hover:bg-purple-600'
                    : isDarkTheme
                    ? 'bg-gray-800 text-gray-600'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                Review & Publish
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 animate-pulse">✅</div>
            <h2 className={`text-3xl font-bold ${textClass} mb-2`}>Episode Published!</h2>
            <p className={`${secondaryText} mb-8`}>{formData.title}</p>
            <div className={`${cardBg} border ${borderClass} rounded-xl p-6 mb-8 text-left max-w-md mx-auto`}>
              <h3 className={`font-bold ${textClass} mb-4`}>What's Next?</h3>
              <ul className={`space-y-3 ${secondaryText} text-sm`}>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Episode is now live on Sona</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Notifications sent to subscribers</span>
                </li>
                <li className="flex gap-2">
                  <span>→</span>
                  <span>Share to social media</span>
                </li>
                <li className="flex gap-2">
                  <span>→</span>
                  <span>Monitor analytics dashboard</span>
                </li>
              </ul>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={onBack}
                className={`px-6 py-3 rounded-lg font-bold transition-colors ${
                  isDarkTheme
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Back to Dashboard
              </button>
              <button
                className="px-6 py-3 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600 transition-colors"
              >
                View Episode →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
