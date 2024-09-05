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
  IonButton
} from '@ionic/react';

const FamilyDashboard: React.FC = () => {
  const sections = [
    { title: 'Groceries', subtitle: 'Items to buy', detail: 'Milk, Eggs, Bread', link: '/groceries' },
    { title: 'Tasks', subtitle: 'Upcoming Tasks', detail: 'Repair the garage door', link: '/tasks' },
    { title: 'Events', subtitle: 'Family Events', detail: 'Anna’s Birthday Party', link: '/events' }
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Family Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {sections.map((section, index) => (
          <IonCard key={index}>
            <IonCardHeader>
              <IonCardSubtitle>{section.subtitle}</IonCardSubtitle>
              <IonCardTitle>{section.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {section.detail}
              <IonButton fill="clear" routerLink={section.link} expand="full">View More</IonButton>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default FamilyDashboard;
