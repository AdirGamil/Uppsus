export function NoteButtons({
  note,
  onRemoveNote,
  onColorClick,
  onDuplicateClick,
  onPinClick,
  showColorPicker,
}) {
  return (
    <div className="note-btns">
      <button onClick={() => onRemoveNote(note.id)} className="note-btn">
        <span className="material-symbols-outlined">delete</span>
      </button>

      <button className="note-btn" onClick={() => onColorClick(note.id)}>
        <span className="material-symbols-outlined">palette</span>
      </button>
      <button className="note-btn" onClick={() => onDuplicateClick(note)}>
        <span className="material-symbols-outlined">
          control_point_duplicate
        </span>
      </button>
      <button
        className="note-btn"
        onClick={() => onPinClick(note)}
        style={{ color: note.isPinned ? 'yellow' : 'inherit' }}
      >
        <span className="material-symbols-outlined">
          {note.isPinned ? 'push_pin' : 'keep'}
        </span>
      </button>

      {showColorPicker && (
        <ColorInput
          note={note}
          onUpdateNote={onUpdateNote}
          loadNotes={onColorChange}
        />
      )}
    </div>
  )
}
