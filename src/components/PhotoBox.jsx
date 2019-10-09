import React from 'react';

export default class PhotoBox extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            pictureName: '/image/' + props.photo.fileName + '/thumbnail/'
        }
    }

    render()
    {
        return(
            <div className={'col-sm-12 col-md-6 col-lg-4 bry-5 brx-lg-5'}>
                <div className={'card'}>
                    <img className={'card-img-top'} alt={this.props.name} src={this.state.pictureName}/>
                    <div onClick={() => this.props.clickFunction(this.props.photo)} style={{cursor: 'pointer'}} className={'card-img-overlay'}>
                        <div>
                            <h4><span className={'badge badge-secondary'}>{this.props.photo.title}</span></h4>
                        </div>
                    </div>
                    {/*<div className={'card-body'}>*/}
                    {/*</div>*/}
                </div>

            </div>
        )
    }

}
