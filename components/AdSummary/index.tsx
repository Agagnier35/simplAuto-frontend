import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import Translations from '../../lib/MultiLang/locales/types';
import { multi } from '../../lib/MultiLang';
import {Ad, AdCarFeature} from '../../generated/graphql';
export interface AdProps {
    translations: Translations;
    ad: Ad;
  }

const AdSummary = ({translations,ad}: AdProps) => {
    
        return( 
            <div>
            {ad?   (
                <Card>
                    {ad.priceHigherBoundFeature && <Card.Header>{translations.Ads.higherPrice}:{ad.priceHigherBoundFeature.price}</Card.Header>}
                    <ListGroup>
                        {ad.manufacturerFeature && <ListGroup.Item>{translations.Ads.manufacturer}: {ad.manufacturerFeature.manufacturer.name}</ListGroup.Item> }
                        {ad.modelFeature && <ListGroup.Item>{translations.Ads.model}: {ad.modelFeature.model.name}</ListGroup.Item> }
                        {ad.categoryFeature &&  <ListGroup.Item>{translations.Ads.category}: {ad.categoryFeature.category.name}</ListGroup.Item>}
                        {ad.features? (
                                 ad.features.map((feature : AdCarFeature)=>
                                 (<ListGroup.Item key={feature.id}> {translations.Ads.features}: {feature.feature.name} </ListGroup.Item>)
                             
                            )
                        ): null   
                        }
                    </ListGroup>
                </Card>
                )
            : (null)                
            }
            </div>
        )}
export default multi(AdSummary); 