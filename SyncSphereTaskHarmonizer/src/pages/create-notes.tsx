import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonTextarea
} from '@ionic/react';

const AddNotes: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSaveNote = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement your logic to save the note here
    console.log('Saving Note:', { title, content });
    // Optionally reset fields or navigate away
    setTitle('');
    setContent('');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Note</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSaveNote}>
          <IonItem>
            <IonLabel position="floating">Title</IonLabel>
            <IonInput
              value={title}
              onIonChange={e => setTitle(e.detail.value!)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Content</IonLabel>
            <IonTextarea
              value={content}
              onIonChange={e => setContent(e.detail.value!)}
              required
            />
          </IonItem>
          <IonButton expand="block" type="submit" class="ion-margin-top">
            Save Note
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddNotes;
