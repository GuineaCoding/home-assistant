import React, { useState } from 'react';
import { IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonInput, IonToast } from '@ionic/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../environments/environment';

interface SignInModalProps {
  show: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ show, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      setToastMessage('Please enter both email and password.');
      setShowToast(true);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in successfully:", userCredential.user);
      setToastMessage('Signed in successfully!');
      setShowToast(true);
      onClose(); 
    } catch (error) {
      console.error("Sign-in failed:", error);
      setToastMessage('Failed to sign in. Please check your credentials.');
      setShowToast(true);
    }
  };

  return (
    <IonModal isOpen={show} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            placeholder="Enter email"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            placeholder="Password"
          />
        </IonItem>
        <IonButton expand="block" onClick={handleSignIn}>Sign In</IonButton>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
      </IonContent>
    </IonModal>
  );
};

export default SignInModal;
