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
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
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
      </IonContent>
    </IonPage>
  );
};

export default GroceryListPage;
