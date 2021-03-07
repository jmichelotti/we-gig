import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import './Tab2.css';
import React, { useState } from 'react';
import { CurrentGig } from '../models/CurrentGig';
import axios from 'axios';
// @ts-ignore
import ReactStopwatchTimer from 'react-stopwatch-timer';

const Tab2: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currGig, setCurrGig] = useState({} as CurrentGig);

  useIonViewDidEnter(() => {
    const getCurrGig = async () => {
      const response = await axios.get("http://localhost:3000/currentGigs/1");
      setCurrGig(response.data);
      console.log(response.data);
      setIsLoaded(true);
    };
    getCurrGig();
  });

  const fromTime = new Date(0, 0, 0, 0, 0, 0, 0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Current Gig</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" style={{ 'textAlign': 'center' }}>Current Gig</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="currGigInfo">
          <h2>This gig is for {currGig.company}</h2>
          <h4>You will head to {currGig.store} for this gig</h4>
          <p>You will make a total of ${currGig.pay} travelling {currGig.distance} miles</p>
          <p>This gig will take no longer than {currGig.time} minutes</p>
          <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
            <ReactStopwatchTimer isOn={true} className="react-stopwatch-timer__table" watchType="stopwatch"
              displayCircle={true} color="gray" hintColor="red" fromTime={fromTime} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
