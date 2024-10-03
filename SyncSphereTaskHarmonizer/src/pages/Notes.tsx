import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonItem, IonFab, IonFabButton, IonIcon, IonButton } from '@ionic/react';
import { add, trash } from 'ionicons/icons';
import { goToAddNotes } from '../components/general-functionality/redirect/RedirectToPages';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../environments/environment';  

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);  
  const notePageRedirect = goToAddNotes();
  const auth = getAuth();

  useEffect(() => {
    const fetchNotes = async () => {
      const user = auth.currentUser;
      if (user) {
        const userNotesCollection = collection(db, `notes/${user.uid}/userNotes`);
        const notesSnapshot = await getDocs(userNotesCollection);
        const userNotes = notesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(userNotes);
        setLoading(false);
      }
    };
    fetchNotes();
  }, [auth]);

  const deleteNote = async (noteId: string) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const noteDocRef = doc(db, `notes/${user.uid}/userNotes/${noteId}`);
        await deleteDoc(noteDocRef);

        // Update the UI by filtering out the deleted note
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
      }
    } catch (error) {
      console.error("Error deleting note: ", error);
    }
  };

  if (loading) {
    return <IonContent>Loading notes...</IonContent>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {notes.map((note, index) => (
            <IonItem key={note.id || index}>
              <IonLabel>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
              </IonLabel>
              <IonButton color="danger" fill="clear" onClick={() => deleteNote(note.id)}>
                <IonIcon icon={trash} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonButton onClick={notePageRedirect}>Add Note</IonButton>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={notePageRedirect}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Notes;
