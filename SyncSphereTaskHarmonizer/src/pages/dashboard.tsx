import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from '@ionic/react';

const Dashboard: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            <IonCardTitle>Card Title</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            
          </IonCardContent>
        </IonCard>

        <IonButton expand="block" style={{ margin: 10 }}>
          Create Note
        </IonButton>
        <IonButton expand="block" color="secondary" style={{ margin: 10 }}>
        Create Note 2
        </IonButton>

    
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
