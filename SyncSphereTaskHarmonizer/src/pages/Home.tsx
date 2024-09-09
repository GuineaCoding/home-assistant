import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonGrid, IonRow, IonCol, IonButton, IonIcon, IonText
} from '@ionic/react';
import { airplane, bluetooth, heart, wifi } from 'ionicons/icons';
import './Home.css';
import Notes from '../pages/Notes';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const history = useHistory();

  const goToNotes = () => {
      history.push('/notes');
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonIcon icon={airplane} size="large" />
              <IonText>Notes</IonText>
              <IonButton onClick={goToNotes}>Go</IonButton>
            </IonCol>
            <IonCol>
              <IonIcon icon={bluetooth} size="large" />
              <IonText>Connect</IonText>
              <IonButton>Connect</IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonIcon icon={heart} size="large" />
              <IonText>Tasks</IonText>
              <IonButton>Check</IonButton>
            </IonCol>
            <IonCol>
              <IonIcon icon={wifi} size="large" />
              <IonText>Internet</IonText>
              <IonButton>Access</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
