import React from 'react';
import PhotoBox from './PhotoBox';
import $ from 'jquery/dist/jquery';
export default class Body extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            photos: []
        }
        this.getAllPhotos()

        this.doModal = this.doModal.bind(this);
    }

    doModal()
    {
        let m = $( '.modal' );
        m.modal('toggle');
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
            <div>
                <div className={'modal'} tabIndex={'-1'} role={'dialog'}>
                    <div className={'modal-dialog'} role={'document'}>
                        <div className={'modal-content'}>
                            <div className={'modal-header'}>
                                yes
                            </div>
                            <div className={'modal-body'}>
                                hiii
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={this.doModal}>Modal</button>
                <div className={'row'}>
                    {pics}
                </div>
            </div>
        )
    }

}


