import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../environments/environment';

const MyStatistics: React.FC = () => {
    const [statistics, setStatistics] = useState<Statistics>({ totalNotes: 0, averageContentLength: 0 });
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
                const averageContentLength = totalNotes > 0 ? Math.round(totalContentLength / totalNotes) : 0;

                setStatistics({ totalNotes, averageContentLength });
            }
        };

        fetchNotesAndCalculateStatistics();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>My Statistics</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Total Notes</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        {statistics.totalNotes}
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Average Note Length</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        {statistics.averageContentLength} characters
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default MyStatistics;
