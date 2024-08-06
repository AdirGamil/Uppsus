export function NoteTodos({ note, handleChange }) {
  return (
    <div>
      {handleChange ? (
        <input
          className="input-edit-note"
          type="text"
          onChange={handleChange}
          id="title"
          placeholder="Edit todos..."
          value={note.info.title}
        />
      ) : (
        <p>{note.info.title}</p>
      )}
    </div>
  )
}
