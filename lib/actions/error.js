class pdfError extends Error {
	constructor(message, displayMessage, show = false) {
		super(message);
		this.name = this.constructor.name;
		this.show = show;
		Error.captureStackTrace(this, pdfError);
	}
}

export default pdfError;
