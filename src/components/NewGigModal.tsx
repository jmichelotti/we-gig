import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import './NewGigModal.css';

const NewGigModal: React.FC = () => {
    return (
        <>
            <IonGrid style={{ 'marginInline': '1%'}}>
                <IonRow>
                    <IonCol>
                        <div>1 of 2</div>
                    </IonCol>
                    <IonCol>
                        <div>2 of 2</div>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <div>1 of 3</div>
                    </IonCol>
                    <IonCol>
                        <div>2 of 3</div>
                    </IonCol>
                    <IonCol>
                        <div>3 of 3</div>
                    </IonCol>
                </IonRow>
            </IonGrid>
            <IonButton href='/tab2'>Save Gig</IonButton>
        </>
    );
};

export default NewGigModal;
