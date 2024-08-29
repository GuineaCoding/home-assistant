import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonDatetime,
  IonSelect,
  IonSelectOption
} from '@ionic/react';

const CreateActivity: React.FC = () => {
  const [activityName, setActivityName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Creating Activity:', { activityName, description, date, category });
    // Add your code here to handle the activity creation logic, e.g., API call
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Activity</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">Activity Name</IonLabel>
            <IonInput
              value={activityName}
              onIonChange={e => setActivityName(e.detail.value!)}
              required />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonInput
              value={description}
              onIonChange={e => setDescription(e.detail.value!)}
              required />
          </IonItem>
          <IonItem>
            <IonLabel>Date</IonLabel>
            <IonDatetime
              displayFormat="MMM DD, YYYY"
              min="2020-01-01"
              value={date}
              onIonChange={e => setDate(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel>Category</IonLabel>
            <IonSelect value={category} placeholder="Select One" onIonChange={e => setCategory(e.detail.value)}>
              <IonSelectOption value="fitness">Fitness</IonSelectOption>
              <IonSelectOption value="education">Education</IonSelectOption>
              <IonSelectOption value="social">Social</IonSelectOption>
              <IonSelectOption value="hobby">Hobby</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonButton expand="block" type="submit" class="ion-margin-top">
            Create Activity
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateActivity;
