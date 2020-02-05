import React from 'react';

export default class PhotoBox extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            pictureName: '/image/' + props.photo.fileName + '/tiny/',
            afterLoad: 'image/' + props.photo.fileName + '/thumbnail/',
        }
    }

    render()
    {
        return(
            <div className={'col-sm-12 col-md-6 col-lg-4 bry-5 brx-lg-5'}>
                <div className={'card'}>
                    <img
                        className={'card-img-top'}
                        alt=''
                        src={this.state.afterLoad}/>
                    <div onClick={() => this.props.clickFunction(this.props.photo)} style={{cursor: 'pointer'}} className={'card-img-overlay'}>
                        <div>
                            <h4><span className={'badge badge-secondary cardTitle'}>{this.props.photo.title}</span></h4>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}
