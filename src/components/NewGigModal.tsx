import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow } from '@ionic/react';
import React, { useState } from 'react';
import './NewGigModal.css';
import { CurrentGig } from '../models/CurrentGig';
import axios from 'axios';
import { Timestamps } from '../models/Timestamps';

const NewGigModal: React.FC = () => {
    const [companyText, setCompanyText] = useState("");
    const [payNum, setPayNum] = useState(0);
    const [distanceNum, setDistanceNum] = useState(0);
    const [timeNum, setTimeNum] = useState(0);
    const [storeText, setStoreText] = useState("");
    const [timestamps, setTimestamps] = useState({} as Timestamps);
    const [imageText, setImageText] = useState({});

    // interface data {
    //     analyzeResult: [
    //     readResults: [

    //     ]
    // ]
    // }

    const info: CurrentGig = {
        company: companyText,
        pay: payNum,
        distance: distanceNum,
        time: timeNum,
        store: storeText,
        timestamps: timestamps
    }

    const updateCurrGig = async () => {
        const day = new Date();
        timestamps.startTime = day.getTime();
        const response = await axios.put("http://localhost:3000/currentGigs/1", info);
    };

    const getImageText = async () => {
        const text2 = axios.get("https://eastus.api.cognitive.microsoft.com/vision/v3.0/read/analyzeResults/c8e7121b-f5b9-4739-bec0-e84578f16e11", {
            headers: {
                'Ocp-Apim-Subscription-Key': 'e8735e46ca744b2ca52a668109948856'
            }
        })
            .then(response => {
                // If request is good...
                console.log(response.data);
                setImageText(response.data);
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }


    return (
        <>
            <IonGrid style={{ 'marginInline': '1%' }}>
                <IonRow>
                    <h3 className="center-header">New Gig</h3>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Gig Company:</IonLabel>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonInput placeholder="Enter Input" onIonChange={e => setCompanyText(e.detail.value!)}></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Total Pay:</IonLabel>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonInput placeholder="Enter Input" onIonChange={e => setPayNum(parseInt(e.detail.value!, 10))}></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Total Distance:</IonLabel>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonInput placeholder="Enter Input" onIonChange={e => setDistanceNum(parseInt(e.detail.value!, 10))}></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Estimated Time:</IonLabel>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonInput placeholder="Enter Input" onIonChange={e => setTimeNum(parseInt(e.detail.value!, 10))}></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Store:</IonLabel>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonInput placeholder="Enter Input" onIonChange={e => setStoreText(e.detail.value!)}></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
            </IonGrid>
            <IonButton onClick={getImageText}>Get Text From Image</IonButton>
            <IonButton href="/CurrentGigScreen" onClick={updateCurrGig}>Start Gig</IonButton>
        </>
    );
};

export default NewGigModal;
