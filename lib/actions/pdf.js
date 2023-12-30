import { PDFDocument } from "pdf-lib";
import path from "path";
import fs from "fs/promises";

class PDF {
	constructor(path) {
		this.path = [...path];
		this.pdfBuffer = [null];
		this.pdfDoc = [null];
	}

	async loadFile(index) {
		try {
			this.pdfBuffer[index] = await fs.readFile(path.resolve(this.path[index]));
			return this.pdfBuffer[index];
		} catch (err) {
			throw err;
		}
	}

	async loadDocument(index = 0) {
		try {
			await this.loadFile(index).then(async () => {
				this.pdfDoc[index] = await PDFDocument.load(this.pdfBuffer[index]);
			});
		} catch (err) {
			throw err;
		}
	}

	async loadDocuments() {
		try {
			for (let index = 0; index < this.path.length; index++) {
				await this.loadDocument(index);
			}
		} catch (err) {
			throw err;
		}
	}

	getDocdetails() {
		return {
			Path: this.path,
			Buffer: this.pdfBuffer,
			Doc: this.pdfDoc,
		};
	}
}

export default PDF;