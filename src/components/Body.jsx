import React from 'react';

export default class Body extends React.Component {

    constructor(props)
    {
        super(props);
    }

    getAllPhotos()
    {

    }

    componentDidMount()
    {
        console.log("hi");

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

    render()
    {
        return (
            <div>

                this is the body

            </div>
        )
    }

}


