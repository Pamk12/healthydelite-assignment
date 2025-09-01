import { Request, Response } from 'express';
import Note, { INote } from '../models/Note';
import mongoose from 'mongoose';

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching notes.' });
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Note content cannot be empty.' });
    }
    const newNote = new Note({
      content,
      user: req.userId,
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating note.' });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { noteId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        return res.status(404).json({ message: 'Invalid note ID.' });
    }

    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }
    if (note.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'User not authorized to delete this note.' });
    }
    
    await Note.findByIdAndDelete(noteId);
    res.status(200).json({ message: 'Note deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting note.' });
  }
};