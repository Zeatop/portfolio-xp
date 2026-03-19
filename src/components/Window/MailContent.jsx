import { useState } from 'react'
import styles from './WindowContent.module.css'
import mailStyles from './MailContent.module.css'

export default function MailContent() {
  const [to]      = useState('leo_jackson@hotmail.fr')
  const [subject, setSubject] = useState('')
  const [body,    setBody]    = useState('')
  const [sent,    setSent]    = useState(false)
  const [from, setFrom] = useState('')
  const [error, setError] = useState('')

  function handleSend() {
    if (!from.trim() || !from.includes('@')) {
        setError('Please enter a valid sender email address.')
        return
    }
    setError('')
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${from}\n\n${body}`)}`
    window.open(mailto, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    }

  return (
    <div className={mailStyles.mail}>

      {/* Toolbar */}
      <div className={mailStyles.toolbar}>
        <button className={mailStyles.toolBtn} onClick={handleSend}>
          <img className={mailStyles.toolIcon} src="/winxp_icons/Earth (fixed).ico" alt="Send" />
          <span>Send</span>
        </button>
        <div className={mailStyles.toolSep} />
        <button className={mailStyles.toolBtn} onClick={() => { setSubject(''); setBody('') }}>
          <img className={mailStyles.toolIcon} src="/winxp_icons/trash.png" alt="Delete" />
          <span>Delete</span>
        </button>
      </div>

      {/* Info bar */}
      {sent && (
        <div className={mailStyles.infoBar}>
          <span className={mailStyles.infoIcon}>ℹ️</span>
          Your mail client has been opened with this message.
        </div>
      )}
      {error && (
        <div className={mailStyles.errorBar}>
          <span>⚠️</span>
          {error}
        </div>
      )}

      {/* Fields */}
      <div className={mailStyles.fields}>
        <div className={mailStyles.row}>
          <div className={mailStyles.row}>
            <span className={mailStyles.fieldLabel}>From:</span>
            <input
                className={`${mailStyles.subjectInput} ${error ? mailStyles.inputError : ''}`}
                value={from}
                onChange={(e) => { setFrom(e.target.value); setError('') }}
                placeholder="your@email.com"
                type="email"
            />
            </div>
            <div className={mailStyles.divider} />
          <button className={mailStyles.fieldBtn}>To...</button>
          <div className={mailStyles.fieldValue}>{to}</div>
        </div>
        <div className={mailStyles.divider} />
        <div className={mailStyles.row}>
          <span className={mailStyles.fieldLabel}>Subject:</span>
          <input
            className={mailStyles.subjectInput}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="(no subject)"
          />
        </div>
      </div>

      <div className={mailStyles.divider} />

      {/* Body */}
      <textarea
        className={mailStyles.body}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your message here..."
      />
    </div>
  )
}