const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

router.get('/api/notes', async (req, res) => {
  try {
    const data = await fs.promises.readFile("db/db.json", "utf8");
    const notes = JSON.parse(data);
    res.json(notes);
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: 'Failed to read notes' });
  }
});

router.post('/api/notes', async (req, res) => {
  try {
    const { title, text } = req.body;
    const data = await fs.promises.readFile("db/db.json", "utf8");
    const notes = JSON.parse(data);
    const newNote = { title, text, id: uuidv4() };
    notes.push(newNote);
    await fs.promises.writeFile("db/db.json", JSON.stringify(notes));
    res.json(newNote);
  } catch (error) {
    console.error('Error writing file:', error);
    res.status(500).json({ error: 'Failed to save note' });
  }
});

router.delete('/api/notes/:id', async (req, res) => {
  try {
    const data = await fs.promises.readFile("db/db.json", "utf8");
    const notes = JSON.parse(data);
    const filteredNotes = notes.filter((note) => note.id !== req.params.id);
    await fs.promises.writeFile("db/db.json", JSON.stringify(filteredNotes));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

module.exports = router;

