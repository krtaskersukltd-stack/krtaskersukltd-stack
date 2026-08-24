'use client'

interface Props {
  title: string
  url: string
  description: string
}

export default function SERPPreview({ title, url, description }: Props) {
  const displayTitle = title || 'Page Title Placeholder - KR Tasker Digital'
  const displayUrl = url || 'https://www.krtaskerdigital.com/your-page-slug'
  const displayDesc = description || 'This is how your page meta description will appear in Google search engine result pages. Ensure it is engaging and under 160 characters.'

  return (
    <div className="admin-card border-[#E5E4E0]">
      <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        Google SERP Preview
      </h3>

      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm font-sans">
        <div className="text-xs text-[#202124] mb-1 flex items-center gap-1.5 truncate">
          <span className="w-4 h-4 rounded-full bg-[#0C4651] text-[#E6FF2A] text-[9px] font-bold inline-flex items-center justify-center">KR</span>
          <span className="text-[#202124] font-normal">KR Tasker Digital</span>
          <span className="text-gray-400">›</span>
          <span className="text-gray-600 truncate">{displayUrl}</span>
        </div>

        <h4 className="text-lg text-[#1a0dab] hover:underline cursor-pointer font-normal leading-snug line-clamp-1 mb-1">
          {displayTitle}
        </h4>

        <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
          {displayDesc}
        </p>
      </div>
    </div>
  )
}
