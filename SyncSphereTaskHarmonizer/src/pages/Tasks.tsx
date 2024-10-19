import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonButton, IonInput } from '@ionic/react';
import { add, trash, createOutline } from 'ionicons/icons';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../environments/environment';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const auth = getAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      const user = auth.currentUser;
      if (user) {
        const userTasksCollection = collection(db, `tasks/${user.uid}/userTasks`);
        const tasksSnapshot = await getDocs(userTasksCollection);
        const userTasks = tasksSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(userTasks);
        setLoading(false);
      }
    };
    fetchTasks();
  }, [auth]);

  const addTask = async () => {
    const user = auth.currentUser;
    if (user && newTask.trim() !== '') {
      const userTasksCollection = collection(db, `tasks/${user.uid}/userTasks`);
      const taskData = { title: newTask, createdAt: new Date() };
      const newTaskDoc = await addDoc(userTasksCollection, taskData);
      setTasks([...tasks, { id: newTaskDoc.id, ...taskData }]);
      setNewTask('');
    }
  };

  const deleteTask = async (taskId: string) => {
    const user = auth.currentUser;
    if (user) {
      const taskDocRef = doc(db, `tasks/${user.uid}/userTasks/${taskId}`);
      await deleteDoc(taskDocRef);
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const editTask = async () => {
    const user = auth.currentUser;
    if (user && editTaskId && editTaskTitle.trim() !== '') {
      const taskDocRef = doc(db, `tasks/${user.uid}/userTasks/${editTaskId}`);
      await updateDoc(taskDocRef, { title: editTaskTitle });
      setTasks(tasks.map(task => task.id === editTaskId ? { ...task, title: editTaskTitle } : task));
      setEditTaskId(null);
      setEditTaskTitle('');
    }
  };

  if (loading) {
    return <IonContent>Loading tasks...</IonContent>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {tasks.map((task) => (
            <IonItem key={task.id}>
              {editTaskId === task.id ? (
                <IonInput
                  value={editTaskTitle}
                  onIonChange={(e) => setEditTaskTitle(e.detail.value!)}
                />
              ) : (
                <IonLabel>{task.title}</IonLabel>
              )}
              <IonButton color="danger" fill="clear" onClick={() => deleteTask(task.id)}>
                <IonIcon icon={trash} />
              </IonButton>
              <IonButton fill="clear" onClick={() => { setEditTaskId(task.id); setEditTaskTitle(task.title); }}>
                <IonIcon icon={createOutline} />
              </IonButton>
              {editTaskId === task.id && (
                <IonButton onClick={editTask}>Save</IonButton>
              )}
            </IonItem>
          ))}
        </IonList>

        <IonItem>
          <IonInput
            placeholder="Enter new task"
            value={newTask}
            onIonChange={(e) => setNewTask(e.detail.value!)}
          />
          <IonButton onClick={addTask}>Add Task</IonButton>
        </IonItem>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={addTask}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tasks;
