import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import Translations from '../../lib/MultiLang/locales/types';
import { multi } from '../../lib/MultiLang';
import {Ad, AdCarFeature} from '../../generated/graphql'
export type Maybe<T> = T | null;

export interface AdProps {
    translations: Translations;
    ad: Ad;
  }

const AdSummary = ({translations,ad}: AdProps) => {
    const featuresHTML: any = []
    if(ad && ad.features){
        if (ad.features.length > 0){
            ad.features.map((feature : Maybe<AdCarFeature>)=>{
                if(feature) {
                    featuresHTML.push(<ListGroup.Item key={feature.id}> {translations.Ads.features}: {feature.feature.name} </ListGroup.Item>)
                }
            })
        }
    }
        return( 
            <div>
            {ad?   (
                <Card>
                    {ad.priceHigherBoundFeature && <Card.Header>{translations.Ads.higherPrice}:{ad.priceHigherBoundFeature.price}</Card.Header>}
                    <ListGroup>
                        {ad.manufacturerFeature && <ListGroup.Item>{translations.Ads.manufacturer}: {ad.manufacturerFeature.manufacturer.name}</ListGroup.Item> }
                        {ad.modelFeature && <ListGroup.Item>{translations.Ads.model}: {ad.modelFeature.model.name}</ListGroup.Item> }
                        {ad.categoryFeature &&  <ListGroup.Item>{translations.Ads.category}: {ad.categoryFeature.category.name}</ListGroup.Item>}
                        {featuresHTML.length > 0 && featuresHTML}
                    </ListGroup>
                </Card>
                )
            : (null)                
            }
            </div>
        )}
export default multi(AdSummary);