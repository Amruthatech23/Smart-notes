let notes = [];

function addNote() {
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  if (!title || !content) return alert('Please fill in both fields.');

  notes.push({ title, content });
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
  renderNotes();
}

function renderNotes(filter = '') {
  const container = document.getElementById('notes');
  container.innerHTML = '';
  notes
    .filter(note =>
      note.title.toLowerCase().includes(filter.toLowerCase()) ||
      note.content.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach((note, index) => {
      const noteEl = document.createElement('div');
      noteEl.className = 'note';
      noteEl.innerHTML = `
        <h3 contenteditable="true" onblur="updateTitle(${index}, this.innerText)">${note.title}</h3>
        <p contenteditable="true" onblur="updateContent(${index}, this.innerText)">${note.content}</p>
        <button onclick="editNote(${index})">Edit</button>
        <button class="delete" onclick="deleteNote(${index})">Delete</button>
      `;
      container.appendChild(noteEl);
    });
}

function deleteNote(index) {
  notes.splice(index, 1);
  renderNotes();
}

function editNote(index) {
  alert('You can edit the title/content directly. Changes are auto-saved.');
}

function updateTitle(index, newTitle) {
  notes[index].title = newTitle;
}

function updateContent(index, newContent) {
  notes[index].content = newContent;
}

document.getElementById('search').addEventListener('input', function () {
  renderNotes(this.value);
});
