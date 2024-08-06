// demoData.js
export const demoNotes = [
    {
      id: 'n1',
      type: 'NoteTodos',
      isPinned: false,
      style: { backgroundColor: '#FFEB3B' },
      info: {
        title: 'Shopping List',
        todos: [
          { txt: 'Buy milk', done: false },
          { txt: 'Buy bread', done: true },
          { txt: 'Buy eggs', done: false },
        ],
      },
      createdAt: Date.now(),
    },
    {
      id: 'n2',
      type: 'NoteTodos',
      isPinned: true,
      style: { backgroundColor: '#FFCDD2' },
      info: {
        title: 'Work Tasks',
        todos: [
          { txt: 'Finish report', done: false },
          { txt: 'Email client', done: true },
          { txt: 'Update website', done: false },
        ],
      },
      createdAt: Date.now(),
    },
    {
      id: 'n3',
      type: 'NoteTodos',
      isPinned: false,
      style: { backgroundColor: '#C8E6C9' },
      info: {
        title: 'Home Chores',
        todos: [
          { txt: 'Clean kitchen', done: true },
          { txt: 'Mow lawn', done: false },
          { txt: 'Take out trash', done: false },
        ],
      },
      createdAt: Date.now(),
    },
  ];
  