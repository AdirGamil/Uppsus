export function NoteVideo({ note, handleChange }) {
  return (
    <div>
      {handleChange ? (
        <input
          className="input-edit-note"
          type="text"
          onChange={handleChange}
          id="src"
          placeholder="Edit video source..."
          value={note.info.src}
        />
      ) : (
        <video controls>
          <source src={note.info.src} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
