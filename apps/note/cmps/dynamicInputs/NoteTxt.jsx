export function NoteTxt({ note, handleChange }) {
  return (
    <div>
      {handleChange ? (
        <input
          className="input-edit-note"
          type="text"
          onChange={handleChange}
          id="txt"
          placeholder="Edit note text..."
          value={note.info.txt}
        />
      ) : (
        <p>{note.info.txt}</p>
      )}
    </div>
  )
}
