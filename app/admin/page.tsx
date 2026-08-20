'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './Admin.module.css'

interface BlogBlock {
  type: 'paragraph' | 'heading' | 'quote' | 'image'
  text?: string
  url?: string
  alt?: string
}

interface BlogPost {
  id?: number
  slug: string
  title: string
  category: string
  readTime: string
  imageUrl: string
  date?: string
  authorName: string
  authorRole: string
  authorImage: string
  content: string | BlogBlock[]
}

const initialFormState: BlogPost = {
  slug: '',
  title: '',
  category: 'Web Development',
  readTime: '05 Min to Read',
  imageUrl: '',
  date: '',
  authorName: 'KR Admin',
  authorRole: 'Team Member',
  authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  content: ''
}

export default function AdminPage() {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loadingAuth, setLoadingAuth] = useState(true)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loadingBlogs, setLoadingBlogs] = useState(false)
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list')
  
  const [formData, setFormData] = useState<BlogPost>(initialFormState)
  const [formError, setFormError] = useState('')
  const [savingForm, setSavingForm] = useState(false)

  const fetchBlogs = useCallback(async () => {
    setLoadingBlogs(true)
    try {
      const res = await fetch('/api/blogs')
      if (res.ok) {
        const data = await res.json()
        setBlogs(data)
      }
    } catch (err) {
      console.error('Error fetching blogs', err)
    } finally {
      setLoadingBlogs(false)
    }
  }, [])

  // 1. Auth check on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/check-auth')
        if (res.ok) {
          setIsAuthenticated(true)
          fetchBlogs()
        }
      } catch (err) {
        console.error('Auth verification failed', err)
      } finally {
        setLoadingAuth(false)
      }
    }
    checkAuth()
  }, [fetchBlogs])

  // 3. Handle Login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      if (res.ok) {
        setIsAuthenticated(true)
        fetchBlogs()
      } else {
        const data = await res.json()
        setLoginError(data.error || 'Incorrect password')
      }
    } catch (err) {
      console.error("Login submission error:", err)
      setLoginError('Server error. Please try again.')
    }
  }

  // 4. Handle Logout submission
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' })
      if (res.ok) {
        setIsAuthenticated(false)
        setBlogs([])
        setCurrentView('list')
      }
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  // 5. Slug helper
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: slugify(title)
    }))
  }

  // 6.5 Image upload helper
  const handleImageUpload = async (file: File, callback: (url: string) => void) => {
    const uploadFormData = new FormData()
    uploadFormData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      })

      if (res.ok) {
        const data = await res.json()
        callback(data.url)
      } else {
        alert('Image upload failed!')
      }
    } catch (error) {
      console.error('Image upload error:', error)
      alert('Network error during image upload.')
    }
  }

  // 6.7 Rich text helper commands
  const execEditorCommand = (command: string, value: string = '') => {
    if (editorRef.current) {
      editorRef.current.focus()
      document.execCommand(command, false, value)
    }
  }

  const insertImageAtCursor = (url: string) => {
    if (editorRef.current) {
      editorRef.current.focus()
      document.execCommand('insertImage', false, url)
    }
  }

  // 7. Initialize Create View
  const handleStartCreate = () => {
    setFormData(initialFormState)
    setFormError('')
    setCurrentView('create')
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = ''
      }
    }, 50)
  }

  // 8. Initialize Edit View
  const handleStartEdit = (post: BlogPost) => {
    let contentHtml = ''
    if (Array.isArray(post.content)) {
      contentHtml = post.content.map(block => {
        switch (block.type) {
          case 'paragraph':
            return `<p>${block.text}</p>`
          case 'heading':
            return `<h2>${block.text}</h2>`
          case 'quote':
            return `<blockquote>${block.text}</blockquote>`
          case 'image':
            return `<img src="${block.url}" alt="${block.alt || ''}" />`
          default:
            return ''
        }
      }).join('\n')
    } else if (typeof post.content === 'string') {
      contentHtml = post.content
    }

    setFormData({
      ...post,
      content: contentHtml
    })
    setFormError('')
    setCurrentView('edit')
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = contentHtml
      }
    }, 50)
  }

  // 9. Save (Create or Update) Blog post
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    const contentHtml = editorRef.current?.innerHTML || ''

    if (!formData.title || !formData.slug || !formData.imageUrl || !contentHtml) {
      setFormError('Please fill out all fields including content.')
      return
    }

    setSavingForm(true)

    const payload: BlogPost = {
      ...formData,
      content: contentHtml
    }

    const isEdit = currentView === 'edit'
    const endpoint = isEdit ? `/api/blogs/${formData.slug}` : '/api/blogs'
    const method = isEdit ? 'PUT' : 'POST'

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        fetchBlogs()
        setCurrentView('list')
        setFormData(initialFormState)
      } else {
        const data = await res.json()
        setFormError(data.error || 'Failed to save post. Verify data and slug.')
      }
    } catch (err) {
      console.error("Save post error:", err)
      setFormError('Network error occurred. Try again.')
    } finally {
      setSavingForm(false)
    }
  }

  // 10. Delete Post
  const handleDeletePost = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: 'DELETE' })
      if (res.ok) {
        fetchBlogs()
      } else {
        alert('Failed to delete blog post.')
      }
    } catch (err) {
      console.error('Delete request error:', err)
    }
  }

  // A. Render Loading State
  if (loadingAuth) {
    return (
      <div className={styles.adminPage}>
        <div className={styles.container} style={{ textAlign: 'center', paddingTop: '100px' }}>
          <h2>Checking system session...</h2>
        </div>
      </div>
    )
  }

  // B. Render Login Screen
  if (!isAuthenticated) {
    return (
      <div className={styles.adminPage}>
        <div className={styles.loginWrapper}>
          <div className={styles.loginCard}>
            <h1 className={styles.loginTitle}>KR TASKER</h1>
            <p className={styles.loginSubtitle}>Enter administrator passcode to access blog controls</p>
            <form onSubmit={handleLogin}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Passcode</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={styles.textInput}
                  minLength={12}
                  maxLength={128}
                  autoComplete="current-password"
                  required
                />
              </div>
              <button type="submit" className={styles.btnSubmit}>Log In</button>
              {loginError && <p className={styles.errorMsg}>{loginError}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }

  // C. Render Main Views (List / Create / Edit)
  return (
    <div className={styles.adminPage}>
      <div className={styles.container}>
        
        {/* Dashboard Header */}
        <header className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>
            KR Tasker <span>Admin Dashboard</span>
          </h1>
          <div className={styles.headerActions}>
            {currentView === 'list' ? (
              <button onClick={handleStartCreate} className={styles.btnAccent}>+ Create New Blog</button>
            ) : (
              <button onClick={() => setCurrentView('list')} className={styles.btnOutline}>← Back to List</button>
            )}
            <button onClick={handleLogout} className={styles.btnOutline}>Log Out</button>
          </div>
        </header>

        {/* View 1: List View */}
        {currentView === 'list' && (
          <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <h3 className={styles.tableTitle}>Published Blogs</h3>
              <button onClick={fetchBlogs} className={styles.btnOutline} style={{ padding: '6px 12px', fontSize: '13px' }}>Reload</button>
            </div>
            {loadingBlogs ? (
              <p style={{ textAlign: 'center', padding: '40px' }}>Loading articles...</p>
            ) : blogs.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '40px', color: '#898a8e' }}>No blog posts found. Create one to get started.</p>
            ) : (
              <table className={styles.blogTable}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Author</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map(post => (
                    <tr key={post.slug}>
                      <td className={styles.blogTitleCell}>{post.title}</td>
                      <td>
                        <span className={styles.categoryBadge}>{post.category}</span>
                      </td>
                      <td style={{ color: '#898a8e', fontSize: '14px' }}>{post.date}</td>
                      <td>{post.authorName}</td>
                      <td>
                        <div className={styles.actionButtons} style={{ justifyContent: 'flex-end' }}>
                          <button onClick={() => handleStartEdit(post)} className={styles.btnEdit}>Edit</button>
                          <button onClick={() => handleDeletePost(post.slug)} className={styles.btnDelete}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* View 2 & 3: Create / Edit View */}
        {(currentView === 'create' || currentView === 'edit') && (
          <div className={styles.formCard}>
            <h3 className={styles.tableTitle} style={{ marginBottom: '30px' }}>
              {currentView === 'create' ? 'Create New Blog Post' : 'Edit Blog Post'}
            </h3>

            <form onSubmit={handleSavePost}>
              <div className={styles.formGrid}>
                
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Blog Title*</label>
                  <input
                    type="text"
                    placeholder="Enter blog title"
                    value={formData.title}
                    onChange={e => handleTitleChange(e.target.value)}
                    className={styles.textInput}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Slug (Auto-generated)*</label>
                  <input
                    type="text"
                    placeholder="example-blog-slug"
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: slugify(e.target.value) })}
                    className={styles.textInput}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Category*</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className={styles.textInput}
                    style={{ background: 'rgba(0,0,0,0.3)', color: '#f8f7f2' }}
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Graphic Designing">Graphic Designing</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Branding">Branding</option>
                    <option value="Social Media">Social Media</option>
                    <option value="SEO">SEO</option>
                    <option value="Studio Life">Studio Life</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Read Time*</label>
                  <input
                    type="text"
                    placeholder="Ex: 08 Min to Read"
                    value={formData.readTime}
                    onChange={e => setFormData({ ...formData, readTime: e.target.value })}
                    className={styles.textInput}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Featured Image URL*</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={formData.imageUrl}
                      onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                      className={styles.textInput}
                      required
                    />
                    <label className={styles.btnOutline} style={{ padding: '12px 18px', cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={e => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleImageUpload(file, (url) => {
                              setFormData(prev => ({ ...prev, imageUrl: url }))
                            })
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Publish Date (Optional - defaults to today)</label>
                  <input
                    type="text"
                    placeholder="Ex: 20 Jul 2026"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className={styles.textInput}
                  />
                </div>

                {/* Author Info */}
                <div className={styles.formGridFull} style={{ marginTop: '20px', borderTop: '1px solid rgba(248, 247, 242, 0.1)', paddingTop: '20px' }}>
                  <h4 style={{ marginBottom: '15px', color: '#e6ff2a' }}>Author Details</h4>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Author Name*</label>
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={e => setFormData({ ...formData, authorName: e.target.value })}
                    className={styles.textInput}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Author Role*</label>
                  <input
                    type="text"
                    value={formData.authorRole}
                    onChange={e => setFormData({ ...formData, authorRole: e.target.value })}
                    className={styles.textInput}
                    required
                  />
                </div>

                <div className={`${styles.inputGroup} ${styles.formGridFull}`}>
                  <label className={styles.inputLabel}>Author Image URL*</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="text"
                      value={formData.authorImage}
                      onChange={e => setFormData({ ...formData, authorImage: e.target.value })}
                      className={styles.textInput}
                      required
                    />
                    <label className={styles.btnOutline} style={{ padding: '12px 18px', cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={e => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleImageUpload(file, (url) => {
                              setFormData(prev => ({ ...prev, authorImage: url }))
                            })
                          }
                        }}
                      />
                    </label>
                  </div>
                      {/* Rich Text Editor */}
                <div className={`${styles.formGridFull} ${styles.blocksSection}`}>
                  <h4 className={styles.blocksTitle}>Blog Content (Rich Text Editor)</h4>
                  <p style={{ fontSize: '13px', color: '#898a8e', marginBottom: '15px' }}>
                    Tip: You can copy and paste formatted articles directly from Google Docs or Word. It will automatically preserve headings, formatting, lists, and links!
                  </p>
                  
                  <div className={styles.blockButtonsRow} style={{ background: 'rgba(12, 70, 81, 0.03)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(12, 70, 81, 0.1)' }}>
                    <button type="button" onClick={() => execEditorCommand('bold')} className={styles.btnBlockType} style={{ fontWeight: 'bold' }}>B</button>
                    <button type="button" onClick={() => execEditorCommand('italic')} className={styles.btnBlockType} style={{ fontStyle: 'italic' }}>I</button>
                    <button type="button" onClick={() => execEditorCommand('underline')} className={styles.btnBlockType} style={{ textDecoration: 'underline' }}>U</button>
                    <button type="button" onClick={() => execEditorCommand('formatBlock', '<h2>')} className={styles.btnBlockType}>H2</button>
                    <button type="button" onClick={() => execEditorCommand('formatBlock', '<h3>')} className={styles.btnBlockType}>H3</button>
                    <button type="button" onClick={() => execEditorCommand('formatBlock', '<p>')} className={styles.btnBlockType}>Paragraph</button>
                    <button type="button" onClick={() => execEditorCommand('insertUnorderedList')} className={styles.btnBlockType}>• List</button>
                    <button type="button" onClick={() => execEditorCommand('insertOrderedList')} className={styles.btnBlockType}>1. List</button>
                    <button type="button" onClick={() => {
                      const url = prompt('Enter link URL:')
                      if (url) execEditorCommand('createLink', url)
                    }} className={styles.btnBlockType}>Link</button>
                    
                    <label className={styles.btnBlockType} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                      + Insert Image
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={e => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleImageUpload(file, (url) => {
                              insertImageAtCursor(url)
                            })
                          }
                        }}
                      />
                    </label>
                    <button type="button" onClick={() => execEditorCommand('removeFormat')} className={styles.btnBlockType} style={{ color: '#ff4d4d' }}>Clear Format</button>
                  </div>

                  <div style={{ marginTop: '15px' }}>
                    <div
                      id="rich-editor"
                      ref={editorRef}
                      contentEditable
                      style={{
                        minHeight: '400px',
                        maxHeight: '600px',
                        border: '1px solid rgba(12, 70, 81, 0.2)',
                        borderRadius: '10px',
                        padding: '20px',
                        background: '#ffffff',
                        color: '#0c4651',
                        outline: 'none',
                        overflowY: 'auto',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '16px',
                        lineHeight: '1.6'
                      }}
                    />
                  </div>
                </div>

              </div>

              {formError && <p className={styles.errorMsg} style={{ marginBottom: '20px' }}>{formError}</p>}

              <div className={styles.formActions}>
                <button type="button" onClick={() => setCurrentView('list')} className={styles.btnOutline} disabled={savingForm}>Cancel</button>
                <button type="submit" className={styles.btnAccent} disabled={savingForm}>
                  {savingForm ? 'Saving Post...' : 'Save Blog Post'}
                </button>
              </div>            </div>
            </form>
          </div>
        )}

      </div>
    </div>
  )
}
