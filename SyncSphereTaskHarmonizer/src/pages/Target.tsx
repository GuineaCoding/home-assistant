import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonButton, IonInput, IonTextarea } from '@ionic/react';
import { add, trash } from 'ionicons/icons';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../environments/environment'; 
const Target: React.FC = () => {
  const [targets, setTargets] = useState<any[]>([]);  
  const [loading, setLoading] = useState(true);   
  const [newTargetTitle, setNewTargetTitle] = useState('');  
  const [newTargetDescription, setNewTargetDescription] = useState('');  
  const auth = getAuth();


  useEffect(() => {
    const fetchTargets = async () => {
      const user = auth.currentUser;
      if (user) {
        const userTargetsCollection = collection(db, `targets/${user.uid}/userTargets`);
        const targetsSnapshot = await getDocs(userTargetsCollection);
        const userTargets = targetsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTargets(userTargets);
        setLoading(false);
      }
    };
    fetchTargets();
  }, [auth]);

  const addTarget = async () => {
    const user = auth.currentUser;
    if (user && newTargetTitle.trim() !== '' && newTargetDescription.trim() !== '') {
      const userTargetsCollection = collection(db, `targets/${user.uid}/userTargets`);
      const targetData = { 
        title: newTargetTitle, 
        description: newTargetDescription,
        createdAt: new Date(),
      };
      const newTargetDoc = await addDoc(userTargetsCollection, targetData);

   
      setTargets([...targets, { id: newTargetDoc.id, ...targetData }]);
      setNewTargetTitle('');  
      setNewTargetDescription('');  
    }
  };


  const deleteTarget = async (targetId: string) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const targetDocRef = doc(db, `targets/${user.uid}/userTargets/${targetId}`);
        await deleteDoc(targetDocRef);

        setTargets(prevTargets => prevTargets.filter(target => target.id !== targetId));
      }
    } catch (error) {
      console.error("Error deleting target: ", error);
    }
  };

  if (loading) {
    return <IonContent>Loading targets...</IonContent>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Targets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {targets.map((target) => (
            <IonItem key={target.id}>
              <IonLabel>
                <h2>{target.title}</h2>
                <p>{target.description}</p>
              </IonLabel>
              <IonButton color="danger" fill="clear" onClick={() => deleteTarget(target.id)}>
                <IonIcon icon={trash} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>


        <IonItem>
          <IonInput
            placeholder="Enter new target title"
            value={newTargetTitle}
            onIonChange={(e) => setNewTargetTitle(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonTextarea
            placeholder="Enter new target description"
            value={newTargetDescription}
            onIonChange={(e) => setNewTargetDescription(e.detail.value!)}
          />
        </IonItem>
        <IonButton onClick={addTarget}>Add Target</IonButton>

 
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={addTarget}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Target;
