import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonButton, IonInput, IonTextarea, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import { add, trash, createOutline, saveOutline } from 'ionicons/icons';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../environments/environment';

const Target: React.FC = () => {
  const [targets, setTargets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTargetTitle, setNewTargetTitle] = useState('');
  const [newTargetDescription, setNewTargetDescription] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchTargets = async () => {
      const user = auth.currentUser;
      if (user) {
        const userTargetsCollection = collection(db, `targets/${user.uid}/userTargets`);
        const targetsSnapshot = await getDocs(userTargetsCollection);
        const loadedTargets = targetsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTargets(loadedTargets);
        setLoading(false);
      }
    };
    fetchTargets();
  }, [auth]);

  const addTarget = async () => {
    const user = auth.currentUser;
    if (user && newTargetTitle.trim() !== '' && newTargetDescription.trim() !== '') {
      const userTargetsCollection = collection(db, `targets/${user.uid}/userTargets`);
      const targetData = { title: newTargetTitle, description: newTargetDescription, createdAt: new Date() };
      const newTargetDoc = await addDoc(userTargetsCollection, targetData);

      setTargets([...targets, { id: newTargetDoc.id, ...targetData }]);
      setNewTargetTitle('');
      setNewTargetDescription('');
    }
  };

  const deleteTarget = async (targetId: string) => {
    const user = auth.currentUser;
    if (user) {
      const targetDocRef = doc(db, `targets/${user.uid}/userTargets/${targetId}`);
      await deleteDoc(targetDocRef);

      setTargets(targets.filter(target => target.id !== targetId));
    }
  };

  const updateTarget = async (targetId: string, title: string, description: string) => {
    const user = auth.currentUser;
    if (user && title.trim() !== '' && description.trim() !== '') {
      const targetDocRef = doc(db, `targets/${user.uid}/userTargets/${targetId}`);
      await updateDoc(targetDocRef, { title, description });

      setTargets(targets.map(target => target.id === targetId ? { ...target, title, description } : target));
      setEditId(null);
    }
  };

  if (loading) {
    return <IonContent>Loading targets...</IonContent>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Targets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Add New Target</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonInput
                placeholder="Enter target title"
                value={newTargetTitle}
                onIonChange={(e) => setNewTargetTitle(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonTextarea
                placeholder="Enter target description"
                value={newTargetDescription}
                onIonChange={(e) => setNewTargetDescription(e.detail.value!)}
              />
            </IonItem>
            <IonButton expand="block" onClick={addTarget}>Add Target</IonButton>
          </IonCardContent>
        </IonCard>

        <IonList>
          {targets.map((target) => (
            <IonCard key={target.id}>
              <IonCardHeader>
                <IonCardTitle>
                  {editId === target.id ? (
                    <IonInput value={newTargetTitle} onIonChange={e => setNewTargetTitle(e.detail.value!)} />
                  ) : (
                    target.title
                  )}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {editId === target.id ? (
                  <IonTextarea value={newTargetDescription} onIonChange={e => setNewTargetDescription(e.detail.value!)} />
                ) : (
                  <p>{target.description}</p>
                )}
                <IonRow>
                  <IonCol size="9"></IonCol>
                  <IonCol size="3">
                    <IonButton color="danger" fill="clear" onClick={() => deleteTarget(target.id)}>
                      <IonIcon icon={trash} />
                    </IonButton>
                    {editId === target.id ? (
                      <IonButton onClick={() => updateTarget(target.id, newTargetTitle, newTargetDescription)}>
                        <IonIcon icon={saveOutline} />
                      </IonButton>
                    ) : (
                      <IonButton onClick={() => { setEditId(target.id); setNewTargetTitle(target.title); setNewTargetDescription(target.description); }}>
                        <IonIcon icon={createOutline} />
                      </IonButton>
                    )}
                  </IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>

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
