import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import axios from 'axios';
import React, { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { Gig } from '../models/Gig';
import './CompletedGigs.css';

const CompletedGigs: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [allGigs, setAllGigs] = useState([] as Gig[]);
  const [completedGigs, setCompletedGigs] = useState([] as Gig[]);
  const [averagePay, setAveragePay] = useState(0);
  const [gigToView, setGigToView] = useState({} as Gig);
  const [shouldShow, setShouldShow] = useState(false);

  useIonViewDidEnter(() => {
    const getCompletedGigs = async () => {
      const response = await axios.get("http://localhost:3000/currentGigs");
      setAllGigs(response.data);
      // setCompletedGigs((response.data).slice(2));
      setIsLoaded(true);
    };
    getCompletedGigs();
  });

  let totalPay: number = 0;
  let totalMiles: number = 0;
  let totalTime: number = 0;
  var ltestBools: boolean[] = new Array(3);
  for (var i = 0; i < allGigs.slice(2).length; i++) {
    totalPay += allGigs.slice(2)[i].pay;
    totalMiles += allGigs.slice(2)[i].distance;
    totalTime += allGigs.slice(2)[i].time;
    ltestBools[i] = false;
  }

  const placeHolder = async (n: Gig) => {
    setGigToView(n);
    setShouldShow(true);
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle>Completed Gigs</IonTitle>
          </IonToolbar>
        </IonHeader>
        <p>Average Pay: ${totalPay / (allGigs.length - 2)}</p>
        <p>Average Distance: {totalMiles / (allGigs.length - 2)} miles</p>
        <p>Average Time: {totalTime / (allGigs.length - 2)} seconds</p>
        <IonList>
          {allGigs.slice(2).map((item, i) => (
            <div key={i}>
              <IonItem button onClick={() => placeHolder(item)}>
                <IonIcon name="american-football-outline"></IonIcon>
                <IonLabel>
                  <h3>{item.company}</h3>
                </IonLabel>
              </IonItem>
            </div>
          ))}
        </IonList>
        { (shouldShow) &&
        <IonList>
          <div className="currGigInfo">
            <h2>Company: {gigToView.company}</h2>
            <h4>Store: {gigToView.store}</h4>
            <p>Pay: ${gigToView.pay}</p>
            <p>Distance: {gigToView.distance} miles</p>
            <p>Total Time: {gigToView.time} minutes</p>
            <IonButton onClick={() => setShouldShow(false)}>Hide Details</IonButton>
          </div>
        </IonList>
        }
      </IonContent>
    </IonPage >
  );
};

export default CompletedGigs;
