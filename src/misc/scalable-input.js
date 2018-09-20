function calculateInputWidth(text){
	let mirrorInput = document.getElementById('product-input-mirror');
	if(!mirrorInput){
		mirrorInput = document.createElement('div');
		mirrorInput.setAttribute('id', 'product-input-mirror');
		document.body.insertAdjacentElement('beforeend', mirrorInput);
	}
	mirrorInput.innerText = text.toString().replace(' ', '_');
	const width = mirrorInput.getBoundingClientRect().width;
	return width > 10 ? width : 10;
}

export default calculateInputWidth;