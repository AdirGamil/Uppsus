export function NoteImg({ note, handleChange }) {
  return (
    <div>
      {handleChange ? (
        <input
          className="input-edit-note"
          type="text"
          onChange={handleChange}
          id="url"
          placeholder="Edit image URL..."
          value={note.info.url}
        />
      ) : (
        <img src={note.info.url} alt="Note Image" />
      )}
    </div>
  )
}
