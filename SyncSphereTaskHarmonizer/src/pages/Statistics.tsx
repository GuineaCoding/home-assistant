import React, { useState, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonGrid, IonRow, IonCol, IonBadge, IonList, IonItem
} from '@ionic/react';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../environments/environment';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt?: any;
}

interface Statistics {
  totalNotes: number;
  averageContentLength: number;
}

const MyStatistics: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistics>({ totalNotes: 0, averageContentLength: 0 });
  const [noteLengths, setNoteLengths] = useState<number[]>([]);
  const [wordCounts, setWordCounts] = useState<{ word: string, count: number }[]>([]);
  const [noteDates, setNoteDates] = useState<{ date: string, count: number }[]>([]);
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
          content: doc.data().content,
          createdAt: doc.data().createdAt?.toDate()
        }));

        const totalNotes = notes.length;
        const totalContentLength = notes.reduce((acc, note) => acc + note.content.length, 0);
        const noteLengthArray = notes.map(note => note.content.length);

        // Calculate word frequency
        const wordFrequency: Record<string, number> = {};
        const dateCounts: Record<string, number> = {};
        notes.forEach(note => {
          note.content.toLowerCase().match(/\b(\w+)\b/g)?.forEach(word => {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
          });
          const date = note.createdAt ? note.createdAt.toISOString().slice(0, 10) : 'Unknown';
          dateCounts[date] = (dateCounts[date] || 0) + 1;
        });
        const sortedWords = Object.entries(wordFrequency).map(([word, count]) => ({ word, count }))
          .sort((a, b) => b.count - a.count).slice(0, 10); // top 10 words
        const sortedDates = Object.entries(dateCounts).map(([date, count]) => ({ date, count }))
          .sort((a, b) => a.date.localeCompare(b.date)); // sorted by date

        setWordCounts(sortedWords);
        setNoteLengths(noteLengthArray);
        setNoteDates(sortedDates);
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

  const timelineData = {
    labels: noteDates.map(n => n.date),
    datasets: [
      {
        label: 'Notes per Day',
        data: noteDates.map(n => n.count),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        fill: true,
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
          <IonRow>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Top Words Used</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    {wordCounts.map(({ word, count }) => (
                      <IonItem key={word}>
                        {word}: {count} times
                      </IonItem>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Note Activity Timeline</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <Line data={timelineData} />
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
