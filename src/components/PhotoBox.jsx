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
            <div className={'col-sm-12 col-md-6 col-lg-4 bry-5 brx-lg-5 border'}>
                <div className={'card'}>
                    <img className={'card-img-top'} alt={this.props.name} src={this.state.pictureName}/>
                    <div className={'card-body'}>
                        {/*<table className={'table table-sm table-dark'}>*/}
                        {/*    <tbody>*/}
                        {/*    <tr>*/}
                        {/*        <td>Added</td>*/}
                        {/*        <td>{this.props.photo.addedOn}</td>*/}
                        {/*    </tr>*/}
                        {/*    <tr>*/}
                        {/*        <td>Exposure Time</td>*/}
                        {/*        <td>{this.props.photo.exposureTime}</td>*/}
                        {/*    </tr>*/}
                        {/*    <tr>*/}
                        {/*        <td>fstop</td>*/}
                        {/*        <td>{this.props.photo.fnumber}</td>*/}
                        {/*    </tr>*/}
                        {/*    <tr>*/}
                        {/*        <td>Focal Length</td>*/}
                        {/*        <td>{this.props.photo.focalLength}</td>*/}
                        {/*    </tr>*/}
                        {/*    <tr>*/}
                        {/*        <td>ISO</td>*/}
                        {/*        <td>{this.props.photo.iso}</td>*/}
                        {/*    </tr>*/}
                        {/*    <tr>*/}
                        {/*        <td>Lens</td>*/}
                        {/*        <td>{this.props.photo.lensModel}</td>*/}
                        {/*    </tr>*/}
                        {/*    <tr>*/}
                        {/*        <td>Date Taken</td>*/}
                        {/*        <td>{this.props.photo.taken}</td>*/}
                        {/*    </tr>*/}
                        {/*    </tbody>*/}
                        {/*</table>*/}
                        {this.props.photo.description}<br/>
                    </div>
                </div>
            </div>
        )
    }

}
