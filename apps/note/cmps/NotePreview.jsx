const { useState } = React

import { ColorInput } from './ColorInput.jsx'
import { TodoNote } from './TodoNote.jsx'

export function NotePreview({
  notes,
  onRemoveNote,
  onUpdateNote,
  onColorChange,
  onDuplicateNote,
}) {
  const [editedNoteId, setEditedNoteId] = useState(null)
  const [editNoteData, setEditNoteData] = useState({ title: '', txt: '' })
  const [showColorPickerForNoteId, setShowColorPickerForNoteId] = useState(null)

  function handleEditClick(note) {
    setEditedNoteId(note.id)
    setEditNoteData({ title: note.info.title, txt: note.info.txt })
  }

  function handleSaveClick(note) {
    const updatedNote = { ...note, info: { ...note.info, ...editNoteData } }
    onUpdateNote(updatedNote)
    setEditedNoteId(null)
  }

  function handleColorClick(noteId) {
    setShowColorPickerForNoteId(
      noteId === showColorPickerForNoteId ? null : noteId
    )
  }

  function handlePinClick(note) {
    const updatedNote = { ...note, isPinned: !note.isPinned }
    onUpdateNote(updatedNote)
  }

  function handleDuplicateClick(note) {
    const duplicatedNote = {
      ...note,
      id: null,
      createdAt: Date.now(),
      style: { ...note.style },
      info: { ...note.info },
    }
    onDuplicateNote(duplicatedNote)
  }

  const pinnedNotes = notes.filter((note) => note.isPinned)
  const unpinnedNotes = notes.filter((note) => !note.isPinned)

  return (
    <section className="note-lists">
      {pinnedNotes.length > 0 && (
        <div className="note-list pinned-notes">
          <h2 className="note-pin-title">Pinned Notes</h2>
          {pinnedNotes.map((note) => (
            <div
              key={note.id}
              style={{ backgroundColor: note.style.backgroundColor }}
              className="note"
            >
              <h1 className="note-title">{note.info.title}</h1>
              {(note.type === 'NoteImg' || note.type === 'NoteTxt') &&
                note.info.url && <img src={note.info.url} alt="Note Image" />}
              <p onClick={() => handleEditClick(note)} className="note-txt">
                {note.info.txt}
              </p>
              {note.type === 'NoteTodos' && (
                <TodoNote
                  title={note.info.todos.map((todo) => todo.txt).join(', ')}
                  handleInputChange={(e) => handleEditClick(note)}
                />
              )}
              <div className="note-btns">
                <button
                  onClick={() => onRemoveNote(note.id)}
                  className="note-btn"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>

                <button
                  className="note-btn"
                  onClick={() => handleColorClick(note.id)}
                >
                  <span className="material-symbols-outlined">palette</span>
                </button>
                <button
                  className="note-btn"
                  onClick={() => handleDuplicateClick(note)}
                >
                  <span className="material-symbols-outlined">
                    control_point_duplicate
                  </span>
                </button>
                <button
                  className="note-btn"
                  onClick={() => handlePinClick(note)}
                  style={{ color: note.isPinned ? 'yellow' : 'inherit' }}
                >
                  <span className="material-symbols-outlined">
                    {note.isPinned ? 'push_pin' : 'keep'}
                  </span>
                </button>
              </div>

              {showColorPickerForNoteId === note.id && (
                <ColorInput
                  note={note}
                  onUpdateNote={onUpdateNote}
                  loadNotes={onColorChange}
                />
              )}
            </div>
          ))}
        </div>
      )}
      <div className="note-list unpinned-notes">
        {unpinnedNotes.map((note) => {
          if (editedNoteId === note.id) {
            return (
              <div
                key={note.id}
                style={{ backgroundColor: note.style.backgroundColor }}
                className="note"
              >
                <input
                  className="note-edit-input"
                  type="text"
                  name="title"
                  value={editNoteData.title}
                  onChange={(e) => {
                    setEditNoteData((prevData) => ({
                      ...prevData,
                      title: e.target.value,
                    }))
                  }}
                  placeholder="Enter title"
                />
                <textarea
                  className="note-edit-input"
                  name="txt"
                  value={editNoteData.txt}
                  onChange={(e) => {
                    setEditNoteData((prevData) => ({
                      ...prevData,
                      txt: e.target.value,
                    }))
                  }}
                  placeholder="Enter text"
                />
                <button
                  onClick={() => handleSaveClick(note)}
                  className="note-btn note-btn-edit"
                >
                  Save
                </button>
              </div>
            )
          } else {
            return (
              <div
                key={note.id}
                style={{ backgroundColor: note.style.backgroundColor }}
                className="note"
              >
                <h1 className="note-title">{note.info.title}</h1>
                {(note.type === 'NoteImg' || note.type === 'NoteTxt') &&
                  note.info.url && <img src={note.info.url} alt="Note Image" />}
                <p onClick={() => handleEditClick(note)} className="note-txt">
                  {note.info.txt}
                </p>
                {note.type === 'NoteTodos' && (
                  <TodoNote
                    title={note.info.todos.map((todo) => todo.txt).join(', ')}
                    handleInputChange={(e) => handleEditClick(note)}
                  />
                )}
                <div className="note-btns">
                  <button
                    onClick={() => onRemoveNote(note.id)}
                    className="note-btn"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>

                  <button
                    className="note-btn"
                    onClick={() => handleColorClick(note.id)}
                  >
                    <span className="material-symbols-outlined">palette</span>
                  </button>
                  <button
                    className="note-btn"
                    onClick={() => handleDuplicateClick(note)}
                  >
                    <span className="material-symbols-outlined">
                      control_point_duplicate
                    </span>
                  </button>
                  <button
                    className="note-btn"
                    onClick={() => handlePinClick(note)}
                    style={{ color: note.isPinned ? 'yellow' : 'inherit' }}
                  >
                    <span className="material-symbols-outlined">
                      {note.isPinned ? 'push_pin' : 'keep'}
                    </span>
                  </button>
                </div>

                {showColorPickerForNoteId === note.id && (
                  <ColorInput
                    note={note}
                    onUpdateNote={onUpdateNote}
                    loadNotes={onColorChange}
                  />
                )}
              </div>
            )
          }
        })}
      </div>
    </section>
  )
}
