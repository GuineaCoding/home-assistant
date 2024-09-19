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
  IonCheckbox,
  IonButton,
  IonIcon
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

const GroceryListPage: React.FC = () => {
  const [groceries, setGroceries] = useState([
    { id: 1, name: 'Milk', checked: false },
    { id: 2, name: 'Eggs', checked: false },
    { id: 3, name: 'Bread', checked: false }
  ]);

  const handleCheck = (id) => {
    const newGroceries = groceries.map(item => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setGroceries(newGroceries);
  };

  const handleDelete = (id) => {
    setGroceries(groceries.filter(item => item.id !== id));
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
            <IonItem key={grocery.id}>
              <IonLabel>{grocery.name}</IonLabel>
              <IonCheckbox 
                slot="start" 
                checked={grocery.checked} 
                onIonChange={() => handleCheck(grocery.id)}
              />
              <IonButton 
                slot="end" 
                fill="clear" 
                onClick={() => handleDelete(grocery.id)}
              >
                <IonIcon icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default GroceryListPage;
