import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import './CurrentGigScreen.css';
import React, { useState } from 'react';
import { CurrentGig } from '../models/CurrentGig';
import axios from 'axios';
// @ts-ignore
import ReactStopwatchTimer from 'react-stopwatch-timer';

const CurrentGigScreen: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currGig, setCurrGig] = useState({} as CurrentGig);
  const [hasArrivedAtResturant, setHasArrivedAtResturant] = useState(false);
  const [diffStartToRest, setDiffStartToRest] = useState(0);
  const [hasPickedUpFood, setHasPickedUpFood] = useState(false);
  const [timeToGetFoodFromRest, setTimeToGetFoodFromRest] = useState(0);
  const [hasArrivedAtCust, setHasArrivedAtCust] = useState(false);
  const [timeToArriveAtCust, setTimeToArriveAtCust] = useState(0);
  const [hasFinishedDelivery, setHasFinishedDelivery] = useState(false);
  const [timeToDeliverToCust, setTimeToDeliverToCust] = useState(0);

  useIonViewDidEnter(() => {
    const getCurrGig = async () => {
      const response = await axios.get("http://localhost:3000/currentGigs/1");
      setCurrGig(response.data);
      console.log(response.data);
      setIsLoaded(true);
    };
    getCurrGig();
  });

  const arrivedAtResturant = async () => {
    const day = new Date();
    currGig.timestamps.rArriveTime = day.getTime();
    const response = await axios.put("http://localhost:3000/currentGigs/1", currGig);
    setHasArrivedAtResturant(true);
    setDiffStartToRest((currGig.timestamps.rArriveTime - currGig.timestamps.startTime) / 1000);
  };

  const pickedUpFood = async () => {
    const day = new Date();
    currGig.timestamps.rPickupTime = day.getTime();
    const response = await axios.put("http://localhost:3000/currentGigs/1", currGig);
    setHasPickedUpFood(true);
    setTimeToGetFoodFromRest((currGig.timestamps.rPickupTime - currGig.timestamps.rArriveTime) / 1000);
  }

  const arrivedAtCust = async () => {
    const day = new Date();
    currGig.timestamps.cArriveTime = day.getTime();
    const response = await axios.put("http://localhost:3000/currentGigs/1", currGig);
    setHasArrivedAtCust(true);
    setTimeToArriveAtCust((currGig.timestamps.cArriveTime - currGig.timestamps.rPickupTime) / 1000);
  }

  const finishedDelivery = async () => {
    const day = new Date();
    currGig.timestamps.endTime = day.getTime();
    const response = await axios.put("http://localhost:3000/currentGigs/1", currGig);
    setHasFinishedDelivery(true);
    setTimeToDeliverToCust((currGig.timestamps.endTime - currGig.timestamps.cArriveTime) / 1000);
  }

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
          <div className="timestamp-buttons">
            { (hasArrivedAtResturant == false) && <IonButton size="large" onClick={arrivedAtResturant}>Arrived at {currGig.store}</IonButton> }
            { (hasPickedUpFood == false) && <IonButton size="large" onClick={pickedUpFood}>Picked up food</IonButton> }
            { (hasArrivedAtCust == false) && <IonButton size="large" onClick={arrivedAtCust}>Arrived at drop-off location</IonButton> }
            { (hasFinishedDelivery == false) && <IonButton size="large" onClick={finishedDelivery}>Completed Delivery</IonButton> }
          </div>
          { (hasArrivedAtResturant == true) && <p>Time to arrive at resturant: {diffStartToRest}</p> }
          { (hasPickedUpFood == true) && <p>It took {timeToGetFoodFromRest} seconds to get the food from the resturant</p> }
          { (hasArrivedAtCust == true) && <p>It took {timeToArriveAtCust} seconds to get to the customer's house</p> }
          { (hasFinishedDelivery == true) && <p>It took {timeToDeliverToCust} seconds to delivery the food to the customer</p>}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CurrentGigScreen;
