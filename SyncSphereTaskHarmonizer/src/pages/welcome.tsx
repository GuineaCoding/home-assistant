// src/pages/WelcomePage.tsx
import React, { useState } from 'react';
import { IonContent, IonButton, IonPage } from '@ionic/react';
import SignInModal from '../components/modals/SignInModal';
import SignUpModal from '../components/modals/SignUpModal';

const WelcomePage: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={() => setShowSignIn(true)}>Sign In</IonButton>
        <SignInModal show={showSignIn} onClose={() => setShowSignIn(false)} />

        <IonButton expand="block" onClick={() => setShowSignUp(true)}>Sign Up</IonButton>
        <SignUpModal show={showSignUp} onClose={() => setShowSignUp(false)} />
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
