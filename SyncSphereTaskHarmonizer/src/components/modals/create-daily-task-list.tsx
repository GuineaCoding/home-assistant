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
  IonInput,
  IonButton,
  IonIcon,
  IonCheckbox
} from '@ionic/react';
import { addCircleOutline, trashOutline } from 'ionicons/icons';
import db from './firebaseConfig'; 

const CreateDailyTaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

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

  const handleAddTask = () => {
    if (newTask.trim()) {
      db.collection('dailyTasks').add({
        name: newTask,
        completed: false,
        created: new Date()  
      });
      setNewTask('');
    }
  };

  const toggleComplete = (id, completed) => {
    db.collection('dailyTasks').doc(id).update({
      completed: !completed
    });
  };

  const deleteTask = (id) => {
    db.collection('dailyTasks').doc(id).delete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Daily Task List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {tasks.map(task => (
            <IonItem key={task.id}>
              <IonLabel>{task.name}</IonLabel>
              <IonCheckbox 
                slot="start" 
                checked={task.completed} 
                onIonChange={() => toggleComplete(task.id, task.completed)} 
              />
              <IonButton fill="clear" slot="end" onClick={() => deleteTask(task.id)}>
                <IonIcon icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
          <IonItem>
            <IonInput 
              value={newTask} 
              placeholder="Enter new task" 
              onIonChange={e => setNewTask(e.detail.value!)} 
              onKeyPress={e => e.key === 'Enter' && handleAddTask()}
            />
            <IonButton fill="clear" slot="end" onClick={handleAddTask}>
              <IonIcon icon={addCircleOutline} />
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CreateDailyTaskListPage;
