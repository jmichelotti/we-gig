import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import axios from 'axios';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { CurrentGig } from '../models/CurrentGig';
import './CompletedGigs.css';

const CompletedGigs: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [completedGigs, setCompletedGigs] = useState([] as CurrentGig[]);
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
