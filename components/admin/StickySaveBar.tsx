'use client'

interface Props {
  isSaving: boolean
  isDirty?: boolean
  onSave: () => void
  onCancel?: () => void
}

export default function StickySaveBar({ isSaving, isDirty = true, onSave, onCancel }: Props) {
  if (!isDirty) return null

  return (
    <div className="sticky-save-bar">
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E6FF2A] animate-ping" />
        <span className="text-xs font-medium text-[#d2e7eb]">Unsaved changes on this page</span>
      </div>

      <div className="flex items-center gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="text-xs text-gray-300 hover:text-white px-3 py-1.5 rounded transition-colors"
          >
            Discard
          </button>
        )}

        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="btn-lime text-xs px-4 py-2"
        >
          {isSaving ? (
            <>
              <svg className="animate-spin w-3.5 h-3.5 text-[#191e00]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Saving Changes...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-[#191e00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  )
}
