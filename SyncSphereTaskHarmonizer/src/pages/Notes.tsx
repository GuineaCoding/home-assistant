import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItemGroup, IonItemDivider, IonLabel, IonItem, IonFab, IonFabButton, IonIcon, IonButton, } from '@ionic/react';
import { add } from 'ionicons/icons';
import { goToAddNotes } from '../components/general-functionality/redirect/RedirectToPages';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../environments/environment';  
import { trash } from 'ionicons/icons';
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
              <IonLabel>{note.title}</IonLabel>
              <IonLabel>{note.content}</IonLabel>
              <IonIcon icon={trash} aria-label="Favorite" />
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
