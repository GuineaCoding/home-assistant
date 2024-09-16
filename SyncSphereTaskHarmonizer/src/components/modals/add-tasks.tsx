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

const AddTaskPage: React.FC = () => {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddTask = () => {
    // Logic to handle the task addition goes here
    console.log("Task Added:", taskName, dueDate);
    // Clear the form
    setTaskName('');
    setDueDate('');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Task</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel position="floating">Task Name</IonLabel>
          <IonInput value={taskName} onIonChange={e => setTaskName(e.detail.value!)} clearInput />
        </IonItem>
        <IonItem>
          <IonLabel>Due Date</IonLabel>
          <IonDatetime displayFormat="MMM DD, YYYY" min="2020" value={dueDate} onIonChange={e => setDueDate(e.detail.value!)} />
        </IonItem>
        <IonButton expand="block" onClick={handleAddTask}>Add Task</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddTaskPage;
