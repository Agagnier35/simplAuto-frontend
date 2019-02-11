import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Translations from '../lib/MultiLang/locales/types';
import { multi } from '../lib/MultiLang';

export interface GenerateAdProps {
    translations: Translations;
    data: any;
  }

const GenerateMyAd = ({translations,data}: GenerateAdProps) => {
    const features = data.features
    const featuresHTML: any = []
    if (features.length > 0){
        features.map((feature : any, index: any)=>{
            console.log(feature)
            featuresHTML.push(<ListGroup.Item key={index}> {translations.Ads.features}: {feature.feature.name} | {translations.Ads.category}: {feature.feature.category.name} </ListGroup.Item>)
        })
    }
        return( 
            <ListGroup key={data.id}>
                {data.priceLowerBoundFeature&&  <ListGroup.Item>{translations.Ads.lowerPrice}: {data.priceLowerBoundFeature.price} </ListGroup.Item>}
                {data.priceHigherBoundFeature && <ListGroup.Item>{translations.Ads.higherPrice}:{data.priceHigherBoundFeature.price}</ListGroup.Item>}
                {data.manufacturerFeature && <ListGroup.Item>{translations.Ads.manufacturer}: {data.manufacturerFeature.manufacturer.name}</ListGroup.Item> }
                {data.modelFeature && <ListGroup.Item>{translations.Ads.model}: {data.modelFeature.model.name}</ListGroup.Item> }
                {data.categoryFeature &&  <ListGroup.Item>{translations.Ads.category}: {data.categoryFeature.category.name}</ListGroup.Item>}
                {data.mileageLowerBoundFeature &&  <ListGroup.Item>{translations.Ads.lowerMileage}: {data.mileageLowerBoundFeature.mileage}</ListGroup.Item> }
                {data.mileageHigherBoundFeature && <ListGroup.Item>{translations.Ads.higherMileage}: {data.mileageHigherBoundFeature.mileage}</ListGroup.Item>}
                {data.yearLowerBoundFeature && <ListGroup.Item>{translations.Ads.lowerYear}: {data.yearLowerBoundFeature.year}</ListGroup.Item>}
                {data.yearHigherBoundFeature &&  <ListGroup.Item>{translations.Ads.higherYear}: {data.yearHigherBoundFeature.year}</ListGroup.Item>}
                {featuresHTML.length > 0 && featuresHTML}
            </ListGroup>
        )}

export default multi(GenerateMyAd);