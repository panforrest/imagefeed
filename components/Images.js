import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'
import superagent from 'superagent'

class Images extends Component{

        constructor(){
                super()
                this.state = {
                        images: []
                }
        }

	uploadFile(files){
        console.log('uploadFile: ')
        const image = files[0]

                const cloudName = 'dcxaoww0c'
                const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'

                const timestamp = Date.now()/1000
                const uploadPreset = 'rnxsz09i'

                const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'rVxIqxqsbdcxTo4X6bo9rUqkQms'

                const signature = sha1(paramsStr)
                const params = {
                        'api_key': '399938195648612',
                        'timestamp': timestamp,
                        'upload_preset': uploadPreset,
                        'signature': signature
                }

        let uploadRequest = superagent.post(url)
        uploadRequest.attach('file', image)

        Object.keys(params).forEach((key) => {
        	uploadRequest.field(key, params[key])
        })

        uploadRequest.end((err, resp) => {
        	if (err){
        		alert(err, null)
        		return
        	}

        	console.log('UPLOAD COMPLETE: '+JSON.stringify(resp.body))
                const uploaded = resp.body

                let updatedImages = Object.assign([], this.state.images)
                updatedImages.push(uploaded)

                this.setState({
                        images: updatedImages
                })
           })
	}

        removeImage(event){
            event.preventDefault()
            console.log('removeImage: '+event.target.id)

                let updatedImages = Object.assign([], this.state.images)
                updatedImages.splice(event.target.id, 1)

                this.setState({
                        images: updatedImages
                })
        }

	render(){

                const list = this.state.images.map((image, i) => {
                        return (
                                <li key={i}>
                                    <img style={{width:72}} src={image.secure_url}/>
                                    <br /><a id={i} onClick={this.removeImage.bind(this)} href="#">remove</a>
                                </li>
                        )
                })
		return(
			<div>
			    Images component.
			    <Dropzone onDrop={this.uploadFile.bind(this)} />
                            <ol>
                                { list }
                            </ol>
			</div>
	    )
	}
}

export default Images