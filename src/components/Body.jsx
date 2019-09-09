import React from 'react';
import PhotoBox from './PhotoBox'

export default class Body extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            photos: []
        }
        this.getAllPhotos()
    }

    getAllPhotos()
    {
        let request = fetch("/image");
        request
            .then(
                res => res.json()
            ).then(
            fulfill => this.setState({photos: fulfill}),
            error =>
            {
            }
        );
    }

    componentDidMount()
    {

    }

    render()
    {

        console.log(this.state);

        let pics = this.state.photos.map(x => {
            return <PhotoBox photo={x}></PhotoBox>
        })

        return (
            <div className={'row'}>
                {pics}
            </div>
        )
    }

}


