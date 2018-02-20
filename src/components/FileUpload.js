import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../ducks/reducer';
import axios from 'axios';

class FileUpload extends Component {
    constructor() {
        super()
        this.state = {
            pic: null
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
        reader.readAsDataURL(file);
        reader.onload = () => {
            const pic = {
                file: reader.result,
                filename: file.name,
                filetype: file.type
            }
            this.setState({ pic })
        }
    }

    savePhoto(event) {
        event.preventDefault();
        

        axios.post(`/api/fileUpload/${this.props.userData.id}`, this.state.pic).then(resp=>{
            console.log('Your pic was uploaded!', resp.data.location)
        }).catch(err => {console.log('ERROR:', err)});
        
    }

    render() {
        console.log(this.state)
        console.log(this.props)
        return (
            <div className="FileUpload">
                <input type="file" onChange={this.handlePhotoUpload} />
                <br />
                {
                    this.state.file &&
                    <img src={this.state.pic} alt="" className="file_preview" />
                }
                <button onClick={this.savePhoto}> Save Image</button>
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