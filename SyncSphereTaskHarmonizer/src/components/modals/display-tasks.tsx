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
import db from './firebaseConfig';  

const DisplayTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('tasks')
      .orderBy('dueDate') 
      .onSnapshot(snapshot => {
        const tasksData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTasks(tasksData);
      });

    return () => unsubscribe();  
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
