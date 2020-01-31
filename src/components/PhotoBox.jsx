import React from 'react';

export default class PhotoBox extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            pictureName: '/image/' + props.photo.fileName + '/tiny/',
            afterLoad: 'image/' + props.photo.fileName + '/thumbnail/',
            // pictureName: 'https://api.photos.shicks255.com/image/' + props.photo.fileName + '/thumbnail/',
        }
        this.change = this.change.bind(this);
    }

    change(e) {
        e.target.src = this.state.afterLoad;
    }

    render()
    {
        return(
            <div className={'col-sm-12 col-md-6 col-lg-4 bry-5 brx-lg-5'}>
                <div className={'card'}>
                    <img onLoad={this.change} className={'card-img-top'} alt={this.props.name} src={this.state.pictureName}/>
                    <div onClick={() => this.props.clickFunction(this.props.photo)} style={{cursor: 'pointer'}} className={'card-img-overlay'}>
                        <div>
                            <h4><span className={'badge badge-secondary'}>{this.props.photo.title}</span></h4>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}
