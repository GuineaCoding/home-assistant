import { logOutOutline } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonPage,
  IonButton,
  IonIcon
} from '@ionic/react';

import './NavBar.css';

const NavBar: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle class="ion-text-center" style={{ flex: 1, textAlign: 'center' }}>
            My App
          </IonTitle>

          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={logOutOutline} />
              Logout
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <p>This is the page content!</p>
      </IonContent>
    </IonPage>
  );
};

export default NavBar;
