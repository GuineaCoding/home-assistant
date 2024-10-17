import React from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonGrid, IonRow, IonCol, IonButton, IonIcon, IonText, IonCard, IonCardContent, IonCardHeader
} from '@ionic/react';
import { airplane, bluetooth, heart, wifi } from 'ionicons/icons';
import { goToNotes } from '../components/general-functionality/redirect/RedirectToPages';

const Home: React.FC = () => {
  const notesRedirect = goToNotes();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonIcon icon={airplane} size="large" />
                  <IonText><h2>Notes</h2></IonText>
                </IonCardHeader>
                <IonCardContent className="ion-text-center">
                  <IonButton expand="block" onClick={notesRedirect}>Go to Notes</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonIcon icon={bluetooth} size="large" />
                  <IonText><h2>Connect</h2></IonText>
                </IonCardHeader>
                <IonCardContent className="ion-text-center">
                  <IonButton expand="block">Connect</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonIcon icon={heart} size="large" />
                  <IonText><h2>Tasks</h2></IonText>
                </IonCardHeader>
                <IonCardContent className="ion-text-center">
                  <IonButton expand="block">Check Tasks</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonIcon icon={wifi} size="large" />
                  <IonText><h2>Internet</h2></IonText>
                </IonCardHeader>
                <IonCardContent className="ion-text-center">
                  <IonButton expand="block">Access</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
