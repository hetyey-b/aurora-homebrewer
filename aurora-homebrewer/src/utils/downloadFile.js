const downloadFile = (content, filename,extension) => {
	const url = window.URL.createObjectURL(new Blob([content]));
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', `${filename}.${extension}`);

	document.body.appendChild(link);

	link.click();

	link.parentNode.removeChild(link);
}

export default downloadFile;