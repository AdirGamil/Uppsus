import { NoteTxt } from './dynamicInputs/NoteTxt.jsx'
import { NoteImg } from './dynamicInputs/NoteImg.jsx'
import { NoteTodos } from './dynamicInputs/NoteTodos.jsx'
import { NoteVideo } from './dynamicInputs/NoteVideo.jsx'

const { useState } = React

export function DynamicCmp({ cmpType, note, handleChange }) {
  switch (cmpType) {
    case 'NoteTxt':
      return <NoteTxt note={note} handleChange={handleChange} />
    case 'NoteImg':
      return <NoteImg note={note} handleChange={handleChange} />
    case 'NoteTodos':
      return <NoteTodos note={note} handleChange={handleChange} />
    case 'NoteVideo':
      return <NoteVideo note={note} handleChange={handleChange} />
    default:
      return null
  }
}
