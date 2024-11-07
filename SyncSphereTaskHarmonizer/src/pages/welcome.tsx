import React, { useState } from 'react';
import {
  IonContent, IonButton, IonPage, IonText, IonGrid, IonRow, IonCol, IonImg, IonModal
} from '@ionic/react';
import SignInModal from '../components/modals/SignInModal';
import SignUpModal from '../components/modals/SignUpModal';

const WelcomePage: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

 
  const handleModalVisibility = (type: 'signIn' | 'signUp', state: boolean) => {
    if (type === 'signIn') {
      setShowSignIn(state);
    } else {
      setShowSignUp(state);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid fixed>
          <IonRow>
            <IonCol>
              <IonText color="primary" style={{ fontSize: '2em', fontWeight: 'bold' }}>
                Welcome to Our Amazing App!
              </IonText>
              <p style={{ fontSize: '1.4em', margin: '20px 0' }}>
                Discover all the features by signing in or creating an account.
              </p>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center" style={{ marginTop: '20px' }}>
            <IonCol size="12" size-md="5">
              <IonButton expand="block" onClick={() => handleModalVisibility('signIn', true)}>
                Sign In
              </IonButton>
              <IonModal isOpen={showSignIn} onDidDismiss={() => handleModalVisibility('signIn', false)} swipeToClose={true}>
                <SignInModal onClose={() => handleModalVisibility('signIn', false)} />
              </IonModal>
            </IonCol>
            <IonCol size="12" size-md="5">
              <IonButton expand="block" onClick={() => handleModalVisibility('signUp', true)}>
                Sign Up
              </IonButton>
              <IonModal isOpen={showSignUp} onDidDismiss={() => handleModalVisibility('signUp', false)} swipeToClose={true}>
                <SignUpModal onClose={() => handleModalVisibility('signUp', false)} />
              </IonModal>
            </IonCol>
          </IonRow>
          <IonRow style={{ marginTop: '50px' }}>
            <IonCol>
              <IonImg src="/assets/images/welcome_image.svg" style={{ maxWidth: '80%', height: 'auto', margin: '0 auto' }} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
