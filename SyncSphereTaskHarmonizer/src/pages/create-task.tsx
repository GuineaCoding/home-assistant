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

const CreateTask: React.FC = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleCreateTask = (event: React.FormEvent) => {
    event.preventDefault();
    
    console.log('Task Created:', { taskName, description, dueDate });
   
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Task</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <form onSubmit={handleCreateTask}>
          <IonItem>
            <IonLabel position="floating">Task Name</IonLabel>
            <IonInput 
              value={taskName}
              onIonChange={e => setTaskName(e.detail.value!)}
              required />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonInput 
              value={description}
              onIonChange={e => setDescription(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel>Due Date</IonLabel>
            <IonDatetime
              displayFormat="MMM DD, YYYY"
              min="2020-01-01"
              max="2030-12-31"
              value={dueDate}
              onIonChange={e => setDueDate(e.detail.value!)}
            />
          </IonItem>
          <IonButton expand="block" type="submit" class="ion-margin-top">Create Task</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateTask;
