import React from 'react';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel
} from '@ionic/react';
import { home, list, settings } from 'ionicons/icons';

const Menu: React.FC = () => {
  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList id="inbox-list">
          <IonMenuToggle autoHide={false}>
            <IonItem button routerLink="/dashboard" routerDirection="none" lines="none">
              <IonIcon slot="start" ios={home} md={home} />
              <IonLabel>Dashboard</IonLabel>
            </IonItem>
            <IonItem button routerLink="/tasks" routerDirection="none" lines="none">
              <IonIcon slot="start" ios={list} md={list} />
              <IonLabel>Tasks</IonLabel>
            </IonItem>
            <IonItem button routerLink="/settings" routerDirection="none" lines="none">
              <IonIcon slot="start" ios={settings} md={settings} />
              <IonLabel>Settings</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
