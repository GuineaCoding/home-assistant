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
  IonNote,
  IonCheckbox,
  IonIcon,
  IonButton
} from '@ionic/react';
import { checkmarkDoneOutline, closeCircleOutline } from 'ionicons/icons';
import db from './firebaseConfig';  

const DisplayDailyTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('dailyTasks')
      .orderBy('created', 'desc')  
      .onSnapshot(snapshot => {
        const fetchedTasks = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTasks(fetchedTasks);
      });

    return () => unsubscribe();  
  }, []);

  const toggleCompletion = (taskId, completed) => {
    db.collection('dailyTasks').doc(taskId).update({
      completed: !completed
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Daily Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {tasks.map(task => (
            <IonItem key={task.id} lines="full">
              <IonLabel>{task.name}</IonLabel>
              <IonNote slot="end" color={task.completed ? 'success' : 'danger'}>
                {task.completed ? 'Completed' : 'Pending'}
              </IonNote>
              <IonButton fill="clear" slot="end" onClick={() => toggleCompletion(task.id, task.completed)}>
                <IonIcon icon={task.completed ? closeCircleOutline : checkmarkDoneOutline} />
              </IonButton>
              <IonCheckbox 
                slot="start" 
                checked={task.completed} 
                onIonChange={() => toggleCompletion(task.id, task.completed)} 
              />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DisplayDailyTasksPage;
