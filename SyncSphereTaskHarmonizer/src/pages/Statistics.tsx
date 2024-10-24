import React, { useState, useEffect } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, 
  IonGrid, IonRow, IonCol, IonBadge
} from '@ionic/react';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../environments/environment';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

interface Note {
  id: string;
  title: string;
  content: string;
}

interface Statistics {
  totalNotes: number;
  averageContentLength: number;
}

const MyStatistics: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistics>({ totalNotes: 0, averageContentLength: 0 });
  const [noteLengths, setNoteLengths] = useState<number[]>([]);
  const auth = getAuth();

  useEffect(() => {
    const fetchNotesAndCalculateStatistics = async () => {
      const user = auth.currentUser;
      if (user) {
        const userNotesCollection = collection(db, `notes/${user.uid}/userNotes`);
        const notesSnapshot = await getDocs(userNotesCollection);
        const notes: Note[] = notesSnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content
        }));

        const totalNotes = notes.length;
        const totalContentLength = notes.reduce((acc, note) => acc + note.content.length, 0);
        const noteLengthArray = notes.map(note => note.content.length);
        
        setNoteLengths(noteLengthArray);
        setStatistics({
          totalNotes,
          averageContentLength: totalNotes > 0 ? Math.round(totalContentLength / totalNotes) : 0
        });
      }
    };

    fetchNotesAndCalculateStatistics();
  }, []);

  const data = {
    labels: Array.from({ length: statistics.totalNotes }, (_, i) => `Note ${i + 1}`),
    datasets: [
      {
        label: 'Note Content Length',
        data: noteLengths,
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Statistics</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Total Notes</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonBadge color="primary" style={{ fontSize: '1.2em' }}>
                    {statistics.totalNotes}
                  </IonBadge>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" size-md="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Average Note Length</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonBadge color="secondary" style={{ fontSize: '1.2em' }}>
                    {statistics.averageContentLength} characters
                  </IonBadge>
                  <Bar data={data} />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MyStatistics;
