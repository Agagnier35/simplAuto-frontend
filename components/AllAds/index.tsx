import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import Translations from '../../lib/MultiLang/locales/types';
import { multi } from '../../lib/MultiLang';

export interface GenerateAdProps {
    translations: Translations;
    data: any;
  }

const GenerateAllAd = ({translations,data}: GenerateAdProps) => {
    const features = data.features
    const featuresHTML: any = []
    if (features.length > 0){
        features.map((feature : any, index: any)=>{
            featuresHTML.push(<ListGroup.Item key={index}> {translations.Ads.features}: {feature.feature.name} | {translations.Ads.category}: {feature.feature.category.name} </ListGroup.Item>)
        })
    }
        return( 
            <Card key={data.id}>
                {data.priceHigherBoundFeature && <Card.Header>{translations.Ads.higherPrice}:{data.priceHigherBoundFeature.price}</Card.Header>}
                <ListGroup>
                    {data.manufacturerFeature && <ListGroup.Item>{translations.Ads.manufacturer}: {data.manufacturerFeature.manufacturer.name}</ListGroup.Item> }
                    {data.modelFeature && <ListGroup.Item>{translations.Ads.model}: {data.modelFeature.model.name}</ListGroup.Item> }
                    {data.categoryFeature &&  <ListGroup.Item>{translations.Ads.category}: {data.categoryFeature.category.name}</ListGroup.Item>}
                </ListGroup>
            </Card>
        )}

export default multi(GenerateAllAd);