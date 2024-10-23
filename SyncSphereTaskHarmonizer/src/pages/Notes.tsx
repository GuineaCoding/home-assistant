import React, { useState, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonItem, IonFab,
  IonFabButton, IonIcon, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonCol, IonInput, IonSearchbar
} from '@ionic/react';
import { add, trash } from 'ionicons/icons';
import { goToAddNotes } from '../components/general-functionality/redirect/RedirectToPages';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../environments/environment';

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
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
          title: doc.data().title,
          content: doc.data().content
        }));
        setNotes(userNotes);
        setLoading(false);
      }
    };
    fetchNotes();
  }, [auth]);

  const deleteNote = async (noteId: string) => {
    const user = auth.currentUser;
    if (user) {
      const noteDocRef = doc(db, `notes/${user.uid}/userNotes/${noteId}`);
      await deleteDoc(noteDocRef);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchText.toLowerCase()) ||
    note.content.toLowerCase().includes(searchText.toLowerCase())
  );

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
          onIonChange={e => setSearchText(e.detail.value!)}
          placeholder="Search notes"
        />

        <IonList>
          {filteredNotes.map((note, index) => (
            <IonCard key={note.id || index}>
              <IonCardHeader>
                <IonCardTitle>{note.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{note.content}</p>
                <IonRow>
                  <IonCol size="9"></IonCol>
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
          <IonFabButton onClick={notePageRedirect}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Notes;
