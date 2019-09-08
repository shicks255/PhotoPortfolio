import React from 'react';

export default class PhotoBox extends React.Component
{
    constructor(props)
    {
        console.log(props);
        super(props);
        this.state = {
            name: '/image/' + props.photo.fileName
        }
    }

    render()
    {
        return(
            <div>

                <img src={this.state.name}/>

            </div>
        )

    }

}