import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Scale_Img extends Component {
    constructor() {
        super()
        this.state = {
            file: '',
            filename: '',
            filetype: ''
        }
        this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
        this.savePhoto = this.savePhoto.bind(this);
    }
    handlePhotoUpload(e) {
        const reader = new FileReader()
        const file = e.target.files[0]

        reader.onload = photo => {
            this.setState({
                file: photo.target.result,
                filename: file.name,
                filetype: file.type
            })
        }
        reader.readAsDataURL(file);
    }

    savePhoto(e) {
        e.preventDefault()
        // '/api/scale_img_upload/:id/:selectedChallengeId'
        const {name, selectedChallengeId } =this.props
        console.log(name, selectedChallengeId)
        axios.post(`/api/scale_img_upload/${name}/${selectedChallengeId}`, this.state).then(resp => {
            console.log('Your pic was uploaded!', resp.data.Location)
            this.setState({ [name]: resp.data.Location })
        }).catch(err => { console.log('ERROR:', err) });
    }

    render() {
        console.log(this.props)
        return (
            <div className="ScaleImg">
                <input type="file" onChange={this.handlePhotoUpload} />
                <br />
                {
                    this.state.file &&
                    <img src={this.state.file} alt="" className="file-preview" />
                }
                <button onClick={this.savePhoto}>Upload Image</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedChallengeId: state.selectedChallengeId
    }
}
export default connect(mapStateToProps)(Scale_Img)