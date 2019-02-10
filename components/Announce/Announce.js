import React from 'react';


function GenerateAnnounce({data}){
    var field = []
    for(var key in data){
        switch (key) {
            
        }
    }

    if (data.category){
        return( 
            <div key={data.id}>
               { data.category &&  <p>{`${data.category.name}`} </p>}
            </div>
        )} else {
            return(
                <div key={data.id}>
                    <p>{`null by null`}</p>
                </div>
            );
            }
}

const Announce = ({ad}) => (
    <GenerateAnnounce data={ad}/>
);
export default Announce;