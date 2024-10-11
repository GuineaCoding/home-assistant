import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonGrid, IonRow, IonCol, IonButton, IonIcon, IonText, IonCard, IonCardContent
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
                <IonCardContent className="ion-text-center">
                  <IonIcon icon={airplane} size="large" />
                  <IonText>Notes</IonText>
                  <IonButton expand="block" onClick={notesRedirect}>Go to Notes</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard>
                <IonCardContent className="ion-text-center">
                  <IonIcon icon={bluetooth} size="large" />
                  <IonText>Connect</IonText>
                  <IonButton expand="block">Connect</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardContent className="ion-text-center">
                  <IonIcon icon={heart} size="large" />
                  <IonText>Tasks</IonText>
                  <IonButton expand="block">Check Tasks</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard>
                <IonCardContent className="ion-text-center">
                  <IonIcon icon={wifi} size="large" />
                  <IonText>Internet</IonText>
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
