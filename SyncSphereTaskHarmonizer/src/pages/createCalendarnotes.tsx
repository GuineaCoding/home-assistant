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
  IonDatetime
} from '@ionic/react';

const AddCalendarNote: React.FC = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');

  const handleSaveNote = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Saving Calendar Note:', { title, details, date });
    
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Calendar Note</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <form onSubmit={handleSaveNote}>
          <IonItem>
            <IonLabel position="floating">Title</IonLabel>
            <IonInput
              value={title}
              onIonChange={e => setTitle(e.detail.value!)}
              required />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Details</IonLabel>
            <IonInput
              value={details}
              onIonChange={e => setDetails(e.detail.value!)}
              required />
          </IonItem>
          <IonItem>
            <IonLabel>Date</IonLabel>
            <IonDatetime
              displayFormat="MMM DD, YYYY"
              min="2020-01-01"
              max="2030-12-31"
              value={date}
              onIonChange={e => setDate(e.detail.value!)}
            />
          </IonItem>
          <IonButton expand="block" type="submit" className="ion-margin-top">
            Save Note
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddCalendarNote;
