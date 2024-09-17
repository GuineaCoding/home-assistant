import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonNote
} from '@ionic/react';


const initialTasks = [
  { id: 1, name: 'Complete project report', dueDate: '2023-10-05' },
  { id: 2, name: 'Prepare for meeting', dueDate: '2023-10-06' },
  { id: 3, name: 'Call John', dueDate: '2023-10-07' }
];

const DisplayTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);

  
  useEffect(() => {
   
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {tasks.map(task => (
            <IonItem key={task.id}>
              <IonLabel>{task.name}</IonLabel>
              <IonNote slot="end">{task.dueDate}</IonNote>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DisplayTasksPage;
