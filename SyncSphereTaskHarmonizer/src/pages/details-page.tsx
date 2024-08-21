import React, { useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList,
  IonItem, IonAvatar, IonLabel, IonImg
} from '@ionic/react';

interface Item {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const DetailPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, title: 'Item 1', description: 'Description for item 1', imageUrl: 'path/to/image1.jpg' },
    { id: 2, title: 'Item 2', description: 'Description for item 2', imageUrl: 'path/to/image2.jpg' },
    { id: 3, title: 'Item 3', description: 'Description for item 3', imageUrl: 'path/to/image3.jpg' }
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {items.map((item) => (
            <IonItem key={item.id} lines="full">
              <IonAvatar slot="start">
                <IonImg src={item.imageUrl} />
              </IonAvatar>
              <IonLabel>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DetailPage;
