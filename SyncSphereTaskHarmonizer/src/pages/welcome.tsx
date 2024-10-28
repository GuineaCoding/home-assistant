import React, { useState } from 'react';
import {
  IonContent, IonButton, IonPage, IonText, IonGrid, IonRow, IonCol, IonImg, IonModal
} from '@ionic/react';
import SignInModal from '../components/modals/SignInModal';
import SignUpModal from '../components/modals/SignUpModal';

const WelcomePage: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid fixed>
          <IonRow>
            <IonCol>
              <IonText color="primary" style={{ fontSize: '1.8em', fontWeight: 'bold' }}>
                Welcome to Our Amazing App!
              </IonText>
              <p style={{ fontSize: '1.2em', marginTop: '15px' }}>
                Access all the features by signing in or signing up today.
              </p>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center" style={{ marginTop: '30px' }}>
            <IonCol size="12" size-md="6">
              <IonButton expand="block" onClick={() => setShowSignIn(true)}>Sign In</IonButton>
              <IonModal isOpen={showSignIn} onDidDismiss={() => setShowSignIn(false)} swipeToClose={true}>
                <SignInModal onClose={() => setShowSignIn(false)} />
              </IonModal>
            </IonCol>
            <IonCol size="12" size-md="6">
              <IonButton expand="block" onClick={() => setShowSignUp(true)}>Sign Up</IonButton>
              <IonModal isOpen={showSignUp} onDidDismiss={() => setShowSignUp(false)} swipeToClose={true}>
                <SignUpModal onClose={() => setShowSignUp(false)} />
              </IonModal>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonImg src="/assets/images/welcome_image.svg" style={{ maxWidth: '100%', height: 'auto', marginTop: '40px' }} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
