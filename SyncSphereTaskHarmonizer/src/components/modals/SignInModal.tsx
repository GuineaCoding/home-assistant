// src/components/modals/SignInModal.tsx
import React from 'react';
import { IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonInput } from '@ionic/react';

interface SignInModalProps {
  show: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ show, onClose }) => {
  return (
    <IonModal isOpen={show} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" placeholder="Enter email" />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" placeholder="Password" />
        </IonItem>
        <IonButton expand="block" onClick={onClose}>Sign In</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default SignInModal;
