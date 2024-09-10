import React from 'react';
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

const AddNotes: React.FC = () => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const handleSaveNote = () => {
    console.log("Note saved:", { title, content });
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
