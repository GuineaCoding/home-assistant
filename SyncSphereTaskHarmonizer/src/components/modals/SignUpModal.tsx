import React, { useState } from 'react';
import { IonModal, IonButton, IonContent, IonHeader, IonToast, IonToolbar, IonTitle, IonItem, IonLabel, IonInput } from '@ionic/react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from '../../environments/environment'; 
import {goToHome} from '../general-functionality/redirect/RedirectToPages'

interface SignUpModalProps {
  show: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ show, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const homeRedirect = goToHome();
    const auth = getAuth(app); 
  
    const handleSignup = async () => {
      if (!email || !password) {
        setToastMessage('Please enter both email and password.');
        setShowToast(true);
        return;
      }
  
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User created successfully with email: ", userCredential.user.email);
        setToastMessage('Signup successful!');
        setShowToast(true);
        homeRedirect();
        onClose(); 
      } catch (error) {
        const firebaseError = error as { message: string };
        console.error("Signup failed:", firebaseError.message);
        setToastMessage(firebaseError.message);
        setShowToast(true);
      }
    };

  return (
    <IonModal isOpen={show} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} />
        </IonItem>
        <IonButton expand="block" onClick={handleSignup}>Sign Up</IonButton>
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

export default SignUpModal;
