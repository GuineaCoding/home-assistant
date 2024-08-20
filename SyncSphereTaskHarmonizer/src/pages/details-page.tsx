
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

<ion-header>
  <ion-toolbar>
    <ion-title>Details</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-list>
    <ion-item *ngFor="let item of items" lines="full">
      <ion-avatar slot="start">
        <img [src]="item.imageUrl">
      </ion-avatar>
      <ion-label>
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </ion-label>
    </ion-item>
  </ion-list>
</ion-content>
