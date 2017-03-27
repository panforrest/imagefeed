import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'
import superagent from 'superagent'

class Images extends Component{

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
        })
	}
	render(){
		return(
			<div>
			    Images component.
			    <Dropzone onDrop={this.uploadFile.bind(this)} />
			</div>
	    )
	}
}

export default Images