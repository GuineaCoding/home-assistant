import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon
} from '@ionic/react';
import { logInOutline, personAddOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  const history = useHistory();

  const handleSignIn = () => {
    history.push('/signin');
  };

  const handleSignUp = () => {
    history.push('/signup');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <IonButton expand="block" onClick={handleSignUp} style={{ marginBottom: '10px' }}>
            <IonIcon slot="start" icon={personAddOutline} />
            Sign Up
          </IonButton>
          <IonButton expand="block" onClick={handleSignIn}>
            <IonIcon slot="start" icon={logInOutline} />
            Sign In
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
