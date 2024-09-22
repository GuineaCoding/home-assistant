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
import db from './firebaseConfig'; // Import Firestore

const GroceryListPage: React.FC = () => {
  const [groceryItems, setGroceryItems] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('groceries').onSnapshot(snapshot => {
      const groceriesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGroceryItems(groceriesData);
    });
    return unsubscribe;
  }, []);

  const handleAddItem = () => {
    if (newItem.trim()) {
      db.collection('groceries').add({
        name: newItem.trim(),
        checked: false
      });
      setNewItem('');
    }
  };

  const toggleItem = (id, checked) => {
    db.collection('groceries').doc(id).update({
      checked: !checked
    });
  };

  const deleteItem = (id) => {
    db.collection('groceries').doc(id).delete();
  };

  const [newItem, setNewItem] = useState('');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Grocery List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {groceryItems.map(item => (
            <IonItem key={item.id}>
              <IonCheckbox slot="start" checked={item.checked} onIonChange={() => toggleItem(item.id, item.checked)} />
              <IonLabel>{item.name}</IonLabel>
              <IonButton fill="clear" slot="end" onClick={() => deleteItem(item.id)}>
                <IonIcon icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
          <IonItem>
            <IonInput value={newItem} placeholder="Add new item" onIonChange={e => setNewItem(e.detail.value!)} />
            <IonButton fill="clear" slot="end" onClick={handleAddItem}>
              <IonIcon icon={addCircleOutline} />
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default GroceryListPage;
