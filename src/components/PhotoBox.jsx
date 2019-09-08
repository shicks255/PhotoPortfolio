import React from 'react';

export default class PhotoBox extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            pictureName: '/image/' + props.photo.fileName
        }
    }

    render()
    {
        return(
            <div>

                <img src={this.state.pictureName}/>

                <div>
                    <p>Added {this.props.photo.addedOn}</p>
                    <p>Description {this.props.photo.description}</p>
                    <p>Exposure Time{this.props.photo.exposureTime}</p>
                    <p>Fstop {this.props.photo.fnumber}</p>
                    <p>Focal Length {this.props.photo.focalLength}</p>
                    <p>ISO {this.props.photo.iso}</p>
                    <p>Lens {this.props.photo.lensModel}</p>
                    <p>Date taken {this.props.photo.taken}</p>
                </div>

            </div>
        )
    }

}