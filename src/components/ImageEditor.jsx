import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import Jimp from 'jimp';

import '../styles/css/image-editor.css';


export class ImageEditor extends Component {

    constructor(props){
        super(props);

        this.state = {
            visible: false,
            loading: false,
            initialImage: undefined,
            processedImage: undefined,
            editValues: {
                brightness: .3,
                contrast: .8,
                quality: 60
            }
        }

        this.editorControls = {
            brightness: null,
            contrast: null
        }
        this.handleClose = this.handleClose.bind(this);
        this.init = this.init.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    init(image){
        this.setState({initialImage: image})
        document.querySelector('body').setAttribute('style', 'overflow: hidden');
        //get buffer from file
		this.getImageBuffer(image)
		.then(imageBuffer => this.processImage(imageBuffer, this.state.editValues, true))
		.then(processedImageBuffer => {
			let newImage = new File([processedImageBuffer], image.name, {type: image.type});
            this.setState({
                visible: true,
                processedImage: newImage
            });
		})
		.catch(error => {
            console.log(error)
			this.props.alerter.alert('eroare', 'error');
		})
    }

    getImageBuffer(image){
		return new Promise((resolve, reject) => {
			let fileReader = new FileReader();
			fileReader.readAsArrayBuffer(image);
			fileReader.onload = () => {
				if(fileReader.readyState === 2){
					resolve(fileReader.result);					
				}
			}
			fileReader.onerror = () => {
				reject(fileReader.error);
			}
		})
	}

	processImage(imageBuffer, values, init){
		return new Promise((resolve, reject) => {
			Jimp.read(imageBuffer)
			.then(async (image) => {
				let imgWidth = image.bitmap.width;
                
                if(init){
                    image
                    .autocrop()
                    .quality(values.quality)
                    .greyscale();
                    
                    if(imgWidth > 512) image.resize(512, Jimp.AUTO)
                }

                image
                .brightness(values.brightness)
                .contrast(values.contrast)

				let buffer = await image.getBufferAsync(image._originalMime);
				resolve(buffer);
			})
			.catch(err => reject(err));
		})
	}

    handleEdit(e){
        console.log(this.editorControls)
        const values = {
            brightness: parseFloat(this.editorControls.brightness.value),
            contrast: parseFloat(this.editorControls.contrast.value),
            quality: parseFloat(this.state.editValues.quality)
        }
        
        this.setState({editValues: values});
        //get buffer from file
		this.getImageBuffer(this.state.initialImage)
		.then(imageBuffer => this.processImage(imageBuffer, values))
		.then(processedImageBuffer => {
			let newImage = new File(
                [processedImageBuffer], 
                this.state.initialImage.name, 
                {type: this.state.initialImage.type}
            );
            this.setState({
                visible: true,
                processedImage: newImage
            });
		})
		.catch(error => {
            console.log(error)
			this.props.alerter.alert('error', 'error');
		})

    }

    handleClose(e){
        document.querySelector('body').setAttribute('style', '');
        this.setState({visible: false, image: null});
    }



    render() {
        return (
            <div 
                style={{display: this.state.visible ? 'flex' : 'none'}}
                className="image-editor-container"
                >
                <div className="modal-cover"></div>
                <div className="modal-container">
                    <div className="modal-header">
                        <span className="modal-title">Editează imaginea</span>
                        <button 
                            onClick={this.handleClose}
                            className="modal-close">
                            <FontAwesome name="times" />
                        </button>
                    </div>
                    <div className="modal-content">
                        {
                            this.state.processedImage &&
                            <img
                                src={URL.createObjectURL(this.state.processedImage)}
                                alt="" />
                        }
                    </div>
                    <div className="modal-footer">
                        <div className="editor-controls-container">
                            <div className="editor-control">
                                <label htmlFor="brightness">Luminozitate</label>
                                <input
                                    ref={ref => this.editorControls.brightness = ref} 
                                    id="brightness" 
                                    defaultValue={this.state.editValues.brightness}
                                    type="range"
                                    min="-1"
                                    max="1"
                                    step="0.05"
                                    onChange={this.handleEdit}
                                    />
                            </div>
                            <div className="editor-control">
                                <label htmlFor="contrast">Contrast</label>
                                <input 
                                    ref={ref => this.editorControls.contrast = ref} 
                                    id="contrast" 
                                    defaultValue={this.state.editValues.contrast}
                                    type="range"
                                    min="-1"
                                    max="1"
                                    step="0.05"
                                    onChange={this.handleEdit}
                                    />
                            </div>
                        </div>
                        <div className="modal-controls-container">
                            <button 
                                onClick={this.handleClose}
                                className="small-button button-orange to-left">
                                <FontAwesome name="times" /> Anulare
                            </button>
                            <button 
                                onClick={() => {
                                    this.props.onSubmit(this.state.processedImage);
                                    this.handleClose();
                                    }}
                                className="small-button button-green to-right">
                                <FontAwesome name="check" /> Trimite 
                            </button>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

ImageEditor.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    alerter: PropTypes.object
}