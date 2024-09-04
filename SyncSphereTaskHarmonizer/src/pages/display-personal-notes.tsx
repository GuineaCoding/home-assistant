import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';

const DisplayNotes: React.FC = () => {
 
  const notes = [
    { id: 1, title: 'Shopping List', content: 'Eggs, Bread, Milk, Cheese' },
    { id: 2, title: 'Todo Today', content: 'Finish the report, Call John' },
    { id: 3, title: 'Birthday Reminder', content: 'Buy a gift for Maria' }
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Personal Notes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {notes.map((note) => (
            <IonItem key={note.id}>
              <IonLabel>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DisplayNotes;
