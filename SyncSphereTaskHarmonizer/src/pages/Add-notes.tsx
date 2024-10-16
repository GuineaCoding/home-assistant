import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonTextarea,
  IonToolbar,
  IonTitle,
  IonButton,
  IonToast
} from "@ionic/react";
import { db } from '../environments/environment'; 
import { collection, addDoc } from "firebase/firestore";

const AddNotes: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSaveNote = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      setToastMessage("No authenticated user found");
      setShowToast(true);
      return;
    }
  
    if (!title.trim() || !content.trim()) {
      setToastMessage("Both title and content are required");
      setShowToast(true);
      return;
    }
  
    try {
      const notesRef = collection(db, `notes/${user.uid}/userNotes`);
      const docRef = await addDoc(notesRef, {
        title: title.trim(),
        content: content.trim(),
        created: new Date(),
        isPublic: false
      });
      setToastMessage("Note added successfully!");
      setShowToast(true);
      setTitle('');
      setContent('');
    } catch (err) {
      if (err instanceof Error) {
        setToastMessage("Error adding note: " + err.message);
      } else {
        setToastMessage("An unknown error occurred");
      }
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Note</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Add a new note</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel position="floating">Title</IonLabel>
              <IonTextarea
                value={title}
                onIonChange={(e) => setTitle(e.detail.value!)}
                placeholder="Enter note title"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Content</IonLabel>
              <IonTextarea
                value={content}
                onIonChange={(e) => setContent(e.detail.value!)}
                placeholder="Write your notes here..."
                autoGrow={true}
              />
            </IonItem>

            <IonButton expand="block" onClick={handleSaveNote} style={{ marginTop: '20px' }}>Save Note</IonButton>
          </IonCardContent>
        </IonCard>
        
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddNotes;
