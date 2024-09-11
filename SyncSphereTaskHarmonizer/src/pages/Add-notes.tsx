import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonTextarea,
  IonToolbar,
  IonTitle,
  IonButton,
  IonToast
} from "@ionic/react";
import { db } from '../environments/environment'; 
import { collection, doc, getDocs, addDoc, setDoc } from "firebase/firestore";

const AddNotes: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSaveNote = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.error("No authenticated user found");
      return;
    }
  
    if (!title.trim() || !content.trim()) {
      console.error("Both title and content are required");
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
      console.log("Note added successfully with ID:", docRef.id);
    } catch (err) {
      console.error("Error adding document:", err);
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
        <IonList>
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

          <IonButton expand="block" onClick={handleSaveNote}>Save Note</IonButton>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={toastMessage}
            duration={3000}
          />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddNotes;
