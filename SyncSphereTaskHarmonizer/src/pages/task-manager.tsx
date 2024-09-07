import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonIcon,
  IonAlert
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask(''); // Clear input after adding
    }
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((item, idx) => idx !== index);
    setTasks(updatedTasks);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Task Manager</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {tasks.map((task, index) => (
            <IonItem key={index}>
              <IonLabel>{task}</IonLabel>
              <IonButton fill="clear" onClick={() => deleteTask(index)}>
                <IonIcon icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonItem>
          <IonInput
            value={newTask}
            placeholder="Enter new task"
            onIonChange={e => setNewTask(e.detail.value!)}
            onKeyDown={handleKeyDown}
          />
          <IonButton onClick={addTask}>Add Task</IonButton>
        </IonItem>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Error'}
          message={'Please enter a task name.'}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default TaskManager;
