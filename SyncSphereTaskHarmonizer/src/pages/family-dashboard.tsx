import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { peopleCircleOutline, calendarOutline, listOutline } from 'ionicons/icons';

const FamilyDashboard: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Family Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="4">
              <IonCard>
                <IonIcon icon={peopleCircleOutline} size="large" />
                <IonCardHeader>
                  <IonCardSubtitle>Family Members</IonCardSubtitle>
                  <IonCardTitle>Profiles</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  View and manage family member profiles.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" size-md="4">
              <IonCard>
                <IonIcon icon={calendarOutline} size="large" />
                <IonCardHeader>
                  <IonCardSubtitle>Upcoming Events</IonCardSubtitle>
                  <IonCardTitle>Calendar</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Check out the family events calendar.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" size-md="4">
              <IonCard>
                <IonIcon icon={listOutline} size="large" />
                <IonCardHeader>
                  <IonCardSubtitle>To-Do List</IonCardSubtitle>
                  <IonCardTitle>Tasks</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Track your family to-do tasks.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default FamilyDashboard;
