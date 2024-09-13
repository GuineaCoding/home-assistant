import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonPage
  } from '@ionic/react';
  
  const NavBar: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>My App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
     
          <p>This is the page content!</p>
        </IonContent>
      </IonPage>
    );
  };
  
  export default NavBar;
