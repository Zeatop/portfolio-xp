import { useState } from 'react'
import styles from './WindowContent.module.css'
import mailStyles from './MailContent.module.css'

const API_ENDPOINT = '/api/contact'

export default function MailContent() {
  const [from, setFrom]       = useState('')
  const [name, setName]       = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody]       = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus]   = useState('idle') // idle | sending | success | error
  const [error, setError]     = useState('')

  const isSending = status === 'sending'

  function validate() {
    if (!name.trim()) {
      setError('Please enter your name.')
      return false
    }
    if (!from.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) {
      setError('Please enter a valid sender email address.')
      return false
    }
    if (!body.trim()) {
      setError('Please write a message.')
      return false
    }
    if (body.length > 5000) {
      setError('Message too long (5000 characters max).')
      return false
    }
    setError('')
    return true
  }

  async function handleSend() {
    if (isSending) return
    if (!validate()) return

    setStatus('sending')

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          senderEmail: from,
          subject,
          message: body,
          website, // honeypot vide
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Sending failed.')
      }

      setStatus('success')
      // Reset après succès
      setName('')
      setFrom('')
      setSubject('')
      setBody('')
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Network error.')
    }
  }

  function handleDelete() {
    setSubject('')
    setBody('')
    setError('')
  }

  return (
    <div className={mailStyles.mail}>

      {/* Toolbar */}
      <div className={mailStyles.toolbar}>
        <button
          className={mailStyles.toolBtn}
          onClick={handleSend}
          disabled={isSending}
        >
          <img className={mailStyles.toolIcon} src="/winxp_icons/Earth (fixed).ico" alt="Send" />
          <span>{isSending ? 'Sending...' : 'Send'}</span>
        </button>
        <div className={mailStyles.toolSep} />
        <button className={mailStyles.toolBtn} onClick={handleDelete} disabled={isSending}>
          <img className={mailStyles.toolIcon} src="/winxp_icons/trash.png" alt="Delete" />
          <span>Delete</span>
        </button>
      </div>

      {/* Status bars */}
      {status === 'success' && (
        <div className={mailStyles.infoBar}>
          <span className={mailStyles.infoIcon}>✓</span>
          Message sent successfully — I'll reply soon!
        </div>
      )}
      {error && (
        <div className={mailStyles.errorBar}>
          <span>⚠️</span>
          {error}
        </div>
      )}

      {/* Honeypot — invisible aux humains, rempli par les bots */}
      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <label htmlFor="mail-website">Do not fill</label>
        <input
          id="mail-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {/* Fields */}
      <div className={mailStyles.fields}>
        <div className={mailStyles.row}>
          <span className={mailStyles.fieldLabel}>Name:</span>
          <input
            className={mailStyles.subjectInput}
            value={name}
            onChange={(e) => { setName(e.target.value); setError('') }}
            placeholder="Your name"
            disabled={isSending}
          />
        </div>
        <div className={mailStyles.divider} />
        <div className={mailStyles.row}>
          <span className={mailStyles.fieldLabel}>From:</span>
          <input
            className={`${mailStyles.subjectInput} ${error && !from ? mailStyles.inputError : ''}`}
            value={from}
            onChange={(e) => { setFrom(e.target.value); setError('') }}
            placeholder="your@email.com"
            type="email"
            disabled={isSending}
          />
        </div>
        <div className={mailStyles.divider} />
        <div className={mailStyles.row}>
          <span className={mailStyles.fieldLabel}>Subject:</span>
          <input
            className={mailStyles.subjectInput}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="(no subject)"
            disabled={isSending}
          />
        </div>
      </div>

      <div className={mailStyles.divider} />

      {/* Body */}
      <textarea
        className={mailStyles.body}
        value={body}
        onChange={(e) => { setBody(e.target.value); setError('') }}
        placeholder="Write your message here..."
        disabled={isSending}
      />
    </div>
  )
}