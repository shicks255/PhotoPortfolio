import React from 'react';

export default class PhotoBox extends React.Component
{
    constructor(props)
    {
        console.log(props.onClick);
        super(props);
        this.state = {
            pictureName: '/image/' + props.photo.fileName + '/thumbnail/'
        }
    }

    render()
    {
        return(
            <div className={'col-sm-12 col-md-6 col-lg-4 bry-5 brx-lg-5 border'}>
                <div className={'card'}>
                    <img className={'card-img-top'} alt={this.props.name} src={this.state.pictureName}/>
                    <div onClick={(fileName) => this.props.clickFunction(this.props.photo.fileName)} style={{cursor: 'pointer'}} className={'card-img-overlay'}>
                        <div>
                            <h4><span className={'badge badge-secondary'}>{this.props.photo.description}</span></h4>
                        </div>
                    </div>
                    <div className={'card-body'}>
                    </div>
                </div>

            </div>
        )
    }

}
