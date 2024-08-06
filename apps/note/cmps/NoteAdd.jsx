import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'

const { useEffect, useState } = React

export function NoteAdd({ loadNotes }) {
  const cmps = ['NoteTxt', 'NoteImg', 'NoteTodos', 'NoteVideo']
  const [newNote, setNewNote] = useState(noteService.getEmptyNote())
  const [cmpInput, setCmpInput] = useState('NoteTxt')

  function onChangeCmp(type) {
    setCmpInput(type)
    setNewNote(noteService.getEmptyNote()) // Reset note when changing type
    setNewNote((prevNoteToEdit) => ({ ...prevNoteToEdit, type })) // Set the type of the new note
  }

  function handleChange({ target }) {
    const field = target.id
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break
      default:
        break
    }

    if (field === 'todos') {
      const todos = value
        .split(',')
        .map((todo) => ({ txt: todo.trim(), doneAt: null }))
      setNewNote((prevNoteToEdit) => ({
        ...prevNoteToEdit,
        info: { ...prevNoteToEdit.info, todos },
      }))
    } else {
      setNewNote((prevNoteToEdit) => ({
        ...prevNoteToEdit,
        info: { ...prevNoteToEdit.info, [field]: value },
      }))
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      onSaveNote()
    }
  }

  function onSaveNote(ev) {
    if (ev) ev.preventDefault()
    if (
      !newNote.info.title &&
      !newNote.info.txt &&
      !newNote.info.url &&
      !newNote.info.src &&
      newNote.info.todos.length === 0
    )
      return
    noteService.save(newNote).then((savedNote) => {
      loadNotes()
      setNewNote(noteService.getEmptyNote())
    })
  }

  return (
    <section className="add-note-main">
      <form className="note-form" onSubmit={onSaveNote}>
        <div className="input-with-buttons">
          <DynamicCmp
            cmpType={cmpInput}
            handleChange={handleChange}
            handleKeyPress={handleKeyPress}
          />

          <div className="note-input-buttons">
            {cmps.map((cmp) => (
              <button
                key={cmp}
                type="button"
                className={`note-input-btn ${
                  cmp === cmpInput ? 'active-input-btn' : ''
                }`}
                onClick={() => onChangeCmp(cmp)}
              >
                {cmp === 'NoteTxt' && (
                  <span className="material-symbols-outlined">add_comment</span>
                )}
                {cmp === 'NoteImg' && (
                  <span className="material-symbols-outlined">
                    add_photo_alternate
                  </span>
                )}
                {cmp === 'NoteTodos' && (
                  <span className="material-symbols-outlined">
                    format_list_bulleted
                  </span>
                )}
                {cmp === 'NoteVideo' && (
                  <span className="material-symbols-outlined">
                    video_library
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </form>
    </section>
  )
}

function DynamicCmp(props) {
  switch (props.cmpType) {
    case 'NoteTxt':
      return <NoteTxt {...props} />
    case 'NoteImg':
      return <NoteImg {...props} />
    case 'NoteTodos':
      return <NoteTodos {...props} />
    case 'NoteVideo':
      return <NoteVideo {...props} />
    default:
      return null
  }
}

function NoteTxt(props) {
  return (
    <input
      className="input-add-note note-text"
      type="text"
      onChange={props.handleChange}
      id="txt"
      placeholder="Enter new note here..."
      onKeyPress={props.handleKeyPress}
    />
  )
}

function NoteImg(props) {
  return (
    <input
      className="input-add-note note-text"
      type="text"
      onChange={props.handleChange}
      id="url"
      placeholder="Enter image url..."
      onKeyPress={props.handleKeyPress}
    />
  )
}

function NoteTodos(props) {
  return (
    <textarea
      className="input-add-note note-text"
      onChange={props.handleChange}
      id="todos"
      placeholder="Enter todos separated by commas..."
      onKeyPress={props.handleKeyPress}
    />
  )
}

function NoteVideo(props) {
  return (
    <input
      className="input-add-note note-text"
      type="text"
      onChange={props.handleChange}
      id="src"
      placeholder="Enter video src..."
      onKeyPress={props.handleKeyPress}
    />
  )
}
