import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonButton,
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import { db } from './firebaseConfig'; // Adjust the path as necessary
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

const GroceryListPage: React.FC = () => {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "groceries"), (snapshot) => {
      const groceryList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGroceries(groceryList);
    });

    return () => unsubscribe();
  }, []);

  const handleCheck = async (id) => {
    const groceryRef = doc(db, "groceries", id);
    const grocery = groceries.find(item => item.id === id);
    
    if (grocery) {
      await updateDoc(groceryRef, { checked: !grocery.checked });
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "groceries", id));
  };

  const addGrocery = async (name) => {
    await addDoc(collection(db, "groceries"), { name, checked: false });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Grocery List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {groceries.map(grocery => (
            <IonItemSliding key={grocery.id}>
              <IonItem>
                <IonCheckbox 
                  slot="start" 
                  checked={grocery.checked} 
                  onIonChange={() => handleCheck(grocery.id)}
                />
                <IonLabel>{grocery.name}</IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => handleDelete(grocery.id)}>
                  <IonIcon icon={trashOutline} slot="icon-only" />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
        <IonButton onClick={() => addGrocery('New Item')}>Add Grocery</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default GroceryListPage;
