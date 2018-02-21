import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../ducks/reducer';
import axios from 'axios';

class FileUpload extends Component {
    constructor() {
        super()
        this.state={
            file: '',
            filename: '',
            filetype: ''
        }
        this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
        this.savePhoto = this.savePhoto.bind(this);
    }
    componentDidMount() {
        this.props.getUser()
    }

    handlePhotoUpload(event) {
        const reader = new FileReader()
        const file = event.target.files[0]
        
        reader.onload = photo => {
            this.setState({ 
                file: photo.target.result,
                filename: file.name,
                filetype: file.type
            })
        }
        reader.readAsDataURL(file);
    }

    savePhoto(event) {
        event.preventDefault();
        
        axios.post(`/api/fileupload/${this.props.userData.id}`, this.state).then(resp=>{
            console.log('Your pic was uploaded!', resp.data.location)
        }).catch(err => {console.log('ERROR:', err)});
        
    }

    render() {
        return (
            <div className="FileUpload">
            <input type="file" onChange={this.handlePhotoUpload}/>
            <br/>
            {
            this.state.file &&
            <img src={this.state.file} alt="" className="file-preview"/>  
            }
            <button onClick={this.savePhoto}>Upload Image</button>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userData: state.user
    }
}
export default connect(mapStateToProps, {getUser})(FileUpload)