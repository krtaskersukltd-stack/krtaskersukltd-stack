'use client'

import type { PageSection, PageSectionType } from '@/lib/cms-types'

interface SectionBlockEditorProps {
  sections: PageSection[]
  onAddSection: (type: PageSectionType) => void
  onRemoveSection: (idx: number) => void
  onMoveSection: (idx: number, dir: 'up' | 'down') => void
  onToggleSectionEnabled: (idx: number) => void
  onUpdateSectionData: (idx: number, key: string, value: any) => void
}

export default function SectionBlockEditor({
  sections = [],
  onAddSection,
  onRemoveSection,
  onMoveSection,
  onToggleSectionEnabled,
  onUpdateSectionData,
}: SectionBlockEditorProps) {
  return (
    <div className="space-y-6">
      <div className="admin-card border-[#E5E4E0] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-gray-900 text-base">Controlled Page Sections</h3>
            <p className="text-xs text-gray-500">
              Add approved UI section components matching the KR Tasker public design system.
            </p>
          </div>

          {/* Section Add Selector */}
          <div className="flex items-center gap-2">
            <select
              id="add-section-select"
              className="admin-input text-xs w-48"
              defaultValue="hero"
            >
              <option value="hero">Hero Section</option>
              <option value="rich_text">Rich Text Section</option>
              <option value="features">Feature Cards</option>
              <option value="faq">FAQ Accordion</option>
              <option value="cta">Call-to-Action Banner</option>
            </select>
            <button
              onClick={() => {
                const sel = (document.getElementById('add-section-select') as HTMLSelectElement).value
                onAddSection(sel as PageSectionType)
              }}
              className="btn-lime text-xs px-4 py-2"
            >
              + Add Section
            </button>
          </div>
        </div>

        {sections.length === 0 ? (
          <div className="py-12 text-center text-xs text-gray-400">
            No section blocks added yet. Click &quot;+ Add Section&quot; to build this page.
          </div>
        ) : (
          <div className="space-y-4">
            {sections.map((sec, idx) => (
              <div key={sec.id} className="p-4 bg-[#faf9f4] border border-[#E5E4E0] rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onMoveSection(idx, 'up')}
                      disabled={idx === 0}
                      className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-600 disabled:opacity-30"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => onMoveSection(idx, 'down')}
                      disabled={idx === sections.length - 1}
                      className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-600 disabled:opacity-30"
                    >
                      ▼
                    </button>
                    <span className="text-xs font-bold text-[#0C4651] uppercase tracking-wider">
                      Section #{idx + 1}: {sec.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-gray-700 font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sec.isEnabled}
                        onChange={() => onToggleSectionEnabled(idx)}
                        className="rounded border-gray-300 text-[#0C4651] focus:ring-[#0C4651]"
                      />
                      Enabled
                    </label>
                    <button
                      onClick={() => onRemoveSection(idx)}
                      className="text-xs text-red-600 hover:text-red-700 font-medium ml-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Section Specific Inputs */}
                {sec.type === 'hero' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Heading</label>
                      <input
                        type="text"
                        value={sec.data?.title || ''}
                        onChange={(e) => onUpdateSectionData(idx, 'title', e.target.value)}
                        className="admin-input text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Subheading</label>
                      <input
                        type="text"
                        value={sec.data?.subheading || ''}
                        onChange={(e) => onUpdateSectionData(idx, 'subheading', e.target.value)}
                        className="admin-input text-xs"
                      />
                    </div>
                  </div>
                )}

                {sec.type === 'rich_text' && (
                  <div className="pt-2">
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Body HTML / Content</label>
                    <textarea
                      rows={4}
                      value={sec.data?.content || ''}
                      onChange={(e) => onUpdateSectionData(idx, 'content', e.target.value)}
                      className="admin-input text-xs font-mono"
                    />
                  </div>
                )}

                {sec.type === 'cta' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">CTA Title</label>
                      <input
                        type="text"
                        value={sec.data?.title || ''}
                        onChange={(e) => onUpdateSectionData(idx, 'title', e.target.value)}
                        className="admin-input text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Button Text</label>
                      <input
                        type="text"
                        value={sec.data?.ctaText || ''}
                        onChange={(e) => onUpdateSectionData(idx, 'ctaText', e.target.value)}
                        className="admin-input text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
