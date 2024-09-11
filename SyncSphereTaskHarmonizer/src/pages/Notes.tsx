import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItemGroup, IonItemDivider, IonLabel, IonItem, IonFab, IonFabButton, IonIcon, IonButton } from '@ionic/react';
import { add } from 'ionicons/icons';
import { goToAddNotes } from '../components/general-functionality/redirect/RedirectToPages';
import { getAuth } from 'firebase/auth';

const Notes: React.FC = () => {
    const notePageRedirect = goToAddNotes();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Notes</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItemGroup>
                        <IonItemDivider>
                            <IonLabel>Section A</IonLabel>
                        </IonItemDivider>
                        <IonItem>
                            <IonLabel>A1</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>A2</IonLabel>
                        </IonItem>
                        <IonItem lines="none">
                            <IonLabel>A3</IonLabel>
                        </IonItem>
                    </IonItemGroup>
        
                    <IonItemGroup>
                        <IonItemDivider>
                            <IonLabel>Section B</IonLabel>
                        </IonItemDivider>
                        <IonItem>
                            <IonLabel>B1</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>B2</IonLabel>
                        </IonItem>
                        <IonItem lines="none">
                            <IonLabel>B3</IonLabel>
                        </IonItem>
                    </IonItemGroup>
                </IonList>
              <IonButton onClick={notePageRedirect}>Datas</IonButton>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={notePageRedirect}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default Notes;
