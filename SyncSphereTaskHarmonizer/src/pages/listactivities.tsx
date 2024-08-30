import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonIcon
} from '@ionic/react';
import { bicycle, walk, fitness } from 'ionicons/icons';

const activities = [
  { id: 1, title: 'Morning Run', icon: walk, time: '7:00 AM' },
  { id: 2, title: 'Cycle to Work', icon: bicycle, time: '8:30 AM' },
  { id: 3, title: 'Gym Session', icon: fitness, time: '6:00 PM' }
];

const ListActivities: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>List Activities</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {activities.map((activity) => (
            <IonItem key={activity.id}>
              <IonAvatar slot="start">
                <IonIcon icon={activity.icon} />
              </IonAvatar>
              <IonLabel>
                <h2>{activity.title}</h2>
                <p>{activity.time}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ListActivities;
