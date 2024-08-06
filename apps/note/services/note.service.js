// note service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  _createNote,
  getDefaultFilter,
}

function query(filterBy = getDefaultFilter()) {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      notes = notes.filter((note) =>
        regex.test(note.info.txt || note.info.title)
      )
    }
    return notes
  })
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {

    const title = note.info ? note.info.title : note.title
    const txt = note.info ? note.info.txt : note.txt
    const url = note.info ? note.info.url : note.url
    const src = note.info ? note.info.src : note.src
    const todos = note.info ? note.info.todos : []
    const backgroundColor = note.style
      ? note.style.backgroundColor
      : getKeepRandomColor()

    note = _createNote(title, txt, url, src, backgroundColor, note.type, todos)
    return storageService.post(NOTE_KEY, note)
  }
}

function _createNote(
  title,
  txt,
  url,
  src,
  backgroundColor,
  type = 'NoteTxt',
  todos = []
) {
  const isEmptyContent = !title && !txt && !url && !src && todos.length === 0

  const newNote = {
    id: utilService.makeId(),
    createdAt: Date.now(),
    type: type,
    isPinned: false,
    style: {
      backgroundColor: backgroundColor || getKeepRandomColor(),
    },
    info: {
      title: title || 'Note',
      txt: isEmptyContent ? utilService.makeLorem(5) : txt || '',
      url: url || '',
      src: src || '',
      todos: type === 'NoteTodos' ? todos : undefined,
    },
  }

  return newNote
}

function getEmptyNote() {
  return { id: '', title: '', txt: '', url: '', src: '', todos: [] }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = []
    for (let i = 0; i < 10; i++) {
      notes.push(_createNote())
    }
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

function getDefaultFilter() {
  return { txt: '' }
}

function getKeepRandomColor() {
  const colors = [
    '#B4FF9F',
    '#F9FFA4',
    '#FFD59E',
    '#FFA1A1',
    '#FFF475',
    '#F28B82',
    '#FBBC04',
    '#FFF475',
    '#CCFF90',
    '#A7FFEB',
    '#CBF0F8',
    '#AECBFA',
    '#D7AEFB',
    '#FDCFE8',
    '#E6C9A8',
    '#E8EAED',
  ]
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}
