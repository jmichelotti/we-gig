import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import axios from 'axios';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { Gig } from '../models/Gig';
import './CompletedGigs.css';

const CompletedGigs: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [completedGigs, setCompletedGigs] = useState([] as Gig[]);
  const [averagePay, setAveragePay] = useState(0);

  useIonViewDidEnter(() => {
    const getCompletedGigs = async () => {
      const response = await axios.get("http://localhost:3000/completedGigs");
      setCompletedGigs(response.data);
      console.log(response.data);
      setIsLoaded(true);
    };
    getCompletedGigs();
  });

  let totalPay: number = 0;
  completedGigs.forEach(a => totalPay += a.pay);
  let totalMiles: number = 0;
  completedGigs.forEach(a => totalMiles += a.distance);
  let totalTime: number = 0;
  completedGigs.forEach(a => totalTime + a.time);

  // setAveragePay(totalPay / completedGigs.length);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle>Completed Gigs</IonTitle>
          </IonToolbar>
        </IonHeader>
          <p>Average Pay: ${totalPay / completedGigs.length}</p>
          <p>Average Distance: {totalMiles / completedGigs.length} miles</p>
          <p>Average Time: {totalTime / completedGigs.length} seconds</p>
          <IonList>
            {completedGigs.map((item, i) => (
              <div key={i}>
                <div className="currGigInfo">
                  <h2>Company: {item.company}</h2>
                  <h4>Store: {item.store}</h4>
                  <p>Pay: ${item.pay}</p>
                  <p>Distance: {item.distance} miles</p>
                  <p>Time: {item.time} minutes</p>
                </div>
              </div>
            ))}
          </IonList>
      </IonContent>
    </IonPage >
  );
};

export default CompletedGigs;
