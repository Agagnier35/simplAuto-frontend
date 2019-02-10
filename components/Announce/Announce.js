import React from 'react';
import { ListGroup } from 'react-bootstrap';


function GenerateAnnounce({data}){
    if (data.id){
        console.log(data)
        return( 
            <ListGroup key={data.id}>
                {data.priceLowerBoundFeature&&  <ListGroup.Item>LowerPrice: {`${data.priceLowerBoundFeature.price}`} </ListGroup.Item>}
                {data.priceHigherBoundFeature && <ListGroup.Item>HigherPrice: {`${data.priceHigherBoundFeature.price}`}</ListGroup.Item>}
                {data.manufacturerFeature && <ListGroup.Item>Manufacturer: {`${data.manufacturerFeature.manufacturer.name}`}</ListGroup.Item> }
                {data.modelFeature && <ListGroup.Item>Feature: {`${data.modelFeature.model.name}`}</ListGroup.Item> }
                {data.categoryFeature &&  <ListGroup.Item>Category: {`${data.categoryFeature.category.name}`}</ListGroup.Item>}
                {data.mileageLowerBoundFeature &&  <ListGroup.Item>LowerMileage: {`${data.mileageLowerBoundFeature.mileage}`}</ListGroup.Item> }
                {data.mileageHigherBoundFeature && <ListGroup.Item>HigherMileage: {`${data.mileageHigherBoundFeature.mileage}`}</ListGroup.Item>}
                {data.yearLowerBoundFeature && <ListGroup.Item>LowerYear: {`${data.yearLowerBoundFeature.year}`}</ListGroup.Item>}
                {data.yearHigherBoundFeature &&  <ListGroup.Item>HigherYear: {`${data.yearHigherBoundFeature.year}`}</ListGroup.Item>}
            </ListGroup>

        )} 
}

const Announce = ({ad}) => (
    <GenerateAnnounce data={ad}/>
);
export default Announce;