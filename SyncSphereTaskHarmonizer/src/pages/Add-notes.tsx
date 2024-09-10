import React, { useState } from 'react';
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
  IonButton
} from "@ionic/react";
import { db } from '../environments/environment'; 
import { collection, addDoc } from "firebase/firestore"; 

const AddNotes: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSaveNote = async () => {
    if (!title || !content) {
      console.error("Title and content are required");
      return;
    }
    
    try {
      await addDoc(collection(db, "notes"), {
        title: title,
        content: content,
        created: new Date() 
      });
      console.log("Note added successfully");
      setTitle('');  
      setContent('');
    } catch (err) {
      console.error("Error adding document: ", err);
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
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddNotes;
