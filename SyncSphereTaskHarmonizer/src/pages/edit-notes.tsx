import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonTextarea, IonItem, IonLabel, IonButton, IonList } from '@ionic/react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firebase config file

interface Note {
  id?: string;
  title: string;
  content: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'notes'), (snapshot) => {
      const notesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Note));
      setNotes(notesData);
    });
    return () => unsubscribe();
  }, []);

  const addNote = async () => {
    if (newNote.title && newNote.content) {
      await addDoc(collection(db, 'notes'), newNote);
      setNewNote({ title: '', content: '' });
    }
  };

  const updateNote = async (note: Note) => {
    if (note.id) {
      const noteDoc = doc(db, 'notes', note.id);
      await updateDoc(noteDoc, { title: note.title, content: note.content });
    }
  };

  const deleteNote = async (noteId: string) => {
    const noteDoc = doc(db, 'notes', noteId);
    await deleteDoc(noteDoc);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Notes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {notes.map(note => (
            <IonItem key={note.id}>
              <IonLabel>
                <IonInput
                  value={note.title}
                  onIonChange={e => setNotes(notes.map(n => n.id === note.id ? { ...note, title: e.detail.value! } : n))}
                  placeholder="Note Title"
                />
                <IonTextarea
                  value={note.content}
                  onIonChange={e => setNotes(notes.map(n => n.id === note.id ? { ...note, content: e.detail.value! } : n))}
                  placeholder="Note Content"
                />
              </IonLabel>
              <IonButton onClick={() => updateNote(note)}>Save</IonButton>
              <IonButton color="danger" onClick={() => deleteNote(note.id!)}>Delete</IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonItem>
          <IonInput
            value={newNote.title}
            onIonChange={e => setNewNote({ ...newNote, title: e.detail.value! })}
            placeholder="New Note Title"
          />
        </IonItem>
        <IonItem>
          <IonTextarea
            value={newNote.content}
            onIonChange={e => setNewNote({ ...newNote, content: e.detail.value! })}
            placeholder="New Note Content"
          />
        </IonItem>
        <IonButton expand="full" onClick={addNote}>Add Note</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Notes;