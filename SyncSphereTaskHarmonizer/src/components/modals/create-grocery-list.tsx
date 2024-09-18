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
  IonInput,
  IonButton,
  IonIcon,
  IonCheckbox
} from '@ionic/react';
import { addCircleOutline, trashOutline } from 'ionicons/icons';

const GroceryListPage: React.FC = () => {
  const [groceryItems, setGroceryItems] = useState([
    { id: 1, name: 'Milk', checked: false },
    { id: 2, name: 'Eggs', checked: true },
    { id: 3, name: 'Bread', checked: false }
  ]);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim()) {
      const nextId = groceryItems.length + 1;
      setGroceryItems([...groceryItems, { id: nextId, name: newItem.trim(), checked: false }]);
      setNewItem('');
    }
  };

  const toggleItem = (id) => {
    const updatedItems = groceryItems.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setGroceryItems(updatedItems);
  };

  const deleteItem = (id) => {
    setGroceryItems(groceryItems.filter(item => item.id !== id));
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
          {groceryItems.map(item => (
            <IonItem key={item.id}>
              <IonCheckbox slot="start" checked={item.checked} onIonChange={() => toggleItem(item.id)} />
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
