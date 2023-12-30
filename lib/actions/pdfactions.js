/* eslint-disable no-empty */
/* eslint-disable no-useless-catch */
import { PDFDocument } from "pdf-lib";
import path from "path";
import fs from "fs/promises";

class PDFActions {
	constructor(pdfDocs, output) {
		this.output = output;
		this.pdfDocs = [...pdfDocs]; //array of pdfDocs
		this.finalPDF = null;
	}

	async writeFile(output, fileName, pdfArray, index) {
		const file = path.join(path.resolve(output), `${fileName}-${index}.pdf`);
		return await fs.writeFile(file, pdfArray);
	}

	async splitPDF(pages,allPages=false) {
		try {
			// pages.forEach((a,index)=>console.log(index));
			this.pdfDocs.forEach(async (filePath,fileIndex)=>{
				if(allPages){
					const temp=this.pdfDocs[fileIndex].getPageIndices();
					temp.forEach(async (val)=>{
						const pdf = await PDFDocument.create();
						const pageCopy = await pdf.copyPages(this.pdfDocs[fileIndex],[val]);
						pdf.addPage(pageCopy[0]);
						this.finalPage = await pdf.save();
						this.writeFile(this.output, "Generate-page", this.finalPage, val);
					});
				}else{
					const pdf = await PDFDocument.create();
					console.log("Page count",pages);
					const pageCopy = await pdf.copyPages(this.pdfDocs[fileIndex],[...pages]);
					pageCopy.forEach((page) => {
						pdf.addPage(page);
					});
					this.finalPage = await pdf.save(pageCopy);
					this.writeFile(this.output, "Generate-file", this.finalPage, fileIndex);
				};
			});
		} catch (err) {
			throw err;
		}
	}

	async mergePDF() {
		try {
			const docmerged = await PDFDocument.create();
			[...this.pdfDocs].forEach(async (val) => {
				let doc_pages = await docmerged.copyPages(val, val.getPageIndices());
				doc_pages.forEach((page) => docmerged.addPage(page));
			});
			this.finalPDF = await docmerged.save();
			this.writeFile(this.output, "Generate", this.finalPDF, 0);
		} catch (err) {
			throw err;
		}
	}
	async deletePDF(pages){
		try{
		  [...pages].forEach((ele)=>{
				this.pdfDocs[0].removePage(ele);
		  });
		  this.finalPDF = await this.pdfDocs[0].save();
		  this.writeFile(this.output, "Generate", this.finalPDF, 0);      
		}catch(err){
		  throw err;
		};
	  };
}
export default PDFActions;


