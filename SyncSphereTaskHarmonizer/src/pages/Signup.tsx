import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAlert
} from '@ionic/react';

const Signup: React.FC = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match.");
      setShowAlert(true);
      return;
    }
  
    console.log('Email:', email, 'Password:', password);
 
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <form onSubmit={handleSignUp}>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput 
              type="email" 
              value={email}
              onIonChange={e => setEmail(e.detail.value!)} 
              required />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput 
              type="password" 
              value={password}
              onIonChange={e => setPassword(e.detail.value!)} 
              required />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Confirm Password</IonLabel>
            <IonInput 
              type="password" 
              value={confirmPassword}
              onIonChange={e => setConfirmPassword(e.detail.value!)} 
              required />
          </IonItem>
          <IonButton expand="block" type="submit" class="ion-margin-top">Sign Up</IonButton>
        </form>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Error"
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Signup;
