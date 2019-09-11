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

    doModal(fileName)
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
        let pics = this.state.photos.map(x => {
            return <PhotoBox onClick={(event) => this.doModal(event)} photo={x}></PhotoBox>
        })

        return (
            <div>
                <div className={'modal fade bd-example-modal-xl'} tabIndex={'-1'} role={'dialog'}>
                    <div className={'modal-dialog modal-xl modal-dialog-centered'} role={'document'}>
                        <div className={'modal-content'}>
                            <div className={'modal-body'}>
                                <img width={'100%'} src={'/image//bottles.jpg'} />
                            </div>
                            <div className={'modal-footer'}>
                                sdf
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


