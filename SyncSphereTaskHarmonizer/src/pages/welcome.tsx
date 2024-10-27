import React, { useState } from 'react';
import { IonContent, IonButton, IonPage, IonText, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import SignInModal from '../components/modals/SignInModal';
import SignUpModal from '../components/modals/SignUpModal';

const WelcomePage: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <IonPage>
      <IonContent className="ion-padding ion-text-center">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonText color="primary" style={{ fontSize: '1.5em' }}>
                Welcome to Our App!
              </IonText>
              <IonText>
                Get started by signing in or creating a new account.
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow style={{ marginTop: '20px' }}>
            <IonCol>
              <IonButton expand="block" onClick={() => setShowSignIn(true)}>Sign In</IonButton>
              <SignInModal show={showSignIn} onClose={() => setShowSignIn(false)} />
            </IonCol>
            <IonCol>
              <IonButton expand="block" onClick={() => setShowSignUp(true)}>Sign Up</IonButton>
              <SignUpModal show={showSignUp} onClose={() => setShowSignUp(false)} />
            </IonCol>
          </IonRow>
          <IonRow style={{ marginTop: '40px' }}>
            <IonCol>
              <IonImg src="/assets/images/welcome_image.png" style={{ maxWidth: '100%', height: 'auto' }} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
