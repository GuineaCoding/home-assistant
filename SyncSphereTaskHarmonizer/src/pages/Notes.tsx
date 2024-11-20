import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonLabel,
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonCol,
  IonInput,
  IonSearchbar,
} from '@ionic/react';
import { add, trash } from 'ionicons/icons';
import { goToAddNotes } from '../components/general-functionality/redirect/RedirectToPages';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../environments/environment';

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<{ id: string; title: string; content: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const auth = getAuth();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userNotesCollection = collection(db, `notes/${user.uid}/userNotes`);
          const notesSnapshot = await getDocs(userNotesCollection);
          const userNotes = notesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as { id: string; title: string; content: string }[];
          setNotes(userNotes);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
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
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const filteredNotes = searchText
    ? notes.filter(
        note =>
          note.title.toLowerCase().includes(searchText.toLowerCase()) ||
          note.content.toLowerCase().includes(searchText.toLowerCase())
      )
    : notes;

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
        <IonSearchbar
          value={searchText}
          onIonChange={e => setSearchText(e.detail.value || '')}
          placeholder="Search notes"
        />

        <IonList>
          {filteredNotes.map(note => (
            <IonCard key={note.id}>
              <IonCardHeader>
                <IonCardTitle>{note.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{note.content}</p>
                <IonRow>
                  <IonCol size="9" />
                  <IonCol size="3">
                    <IonButton color="danger" fill="clear" onClick={() => deleteNote(note.id)}>
                      <IonIcon icon={trash} />
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={goToAddNotes}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Notes;
