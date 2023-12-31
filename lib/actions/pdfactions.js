/* eslint-disable no-empty */
/* eslint-disable no-useless-catch */
import { PDFDocument } from "pdf-lib";
import path from "path";
import fs from "fs/promises";

class PDFActions {
	constructor(pdfDocs,metadata,output) {
		this.output = output;
		this.pdfDocs = [...pdfDocs]; //array of pdfDocs
		this.finalPDF = null;
		this.metadata=metadata;
	}

	async writeFile(output, fileIndex, pdf, pageIndex) {
		try{
			await fs.mkdir("Generate-pdf",{recursive:true});
			const _fname_=`${this.metadata[fileIndex].name}-${fileIndex}-${pageIndex}.pdf`
			const _gpath_=path.join('.',"Generate-pdf",_fname_);
			return await fs.writeFile(_gpath_, pdf);
		}catch(err){
			throw err;
		};
	}
	
	async splitPDF(pages,allPages=false) {
		try {
			// console.log("Count of Files fount -",this.pdfDocs.length);
			this.metadata.forEach(async (filePath,fileIndex)=>{
				if(allPages){
					const temp=this.pdfDocs[fileIndex].getPageIndices();
					temp.forEach(async (val,pageIndex)=>{
						const pdf = await PDFDocument.create();
						const pageCopy = await pdf.copyPages(this.pdfDocs[fileIndex],[val]);
						pdf.addPage(pageCopy[0]);
						this.finalPage = await pdf.save();
						this.writeFile(this.output,fileIndex, this.finalPage, pageIndex);
					});
				}else{
					const pdf = await PDFDocument.create();
					// console.log("Page count - Invidual",pages);
					const pageCopy = await pdf.copyPages(this.pdfDocs[fileIndex],[...pages]);
					pageCopy.forEach((page) => {
						pdf.addPage(page);
					});
					this.finalPage = await pdf.save();
					this.writeFile(this.output,0, this.finalPage, fileIndex);
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


