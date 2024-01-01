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
			console.log(_fname_);
			const _gpath_=path.join('.',"Generate-pdf",_fname_);
			return await fs.writeFile(_gpath_, pdf);
		}catch(err){
			throw err;
		};
	}
	
	async splitPDF(pages,allPages=false) {
		try {
			for (let fileIndex=0;fileIndex<this.pdfDocs.length;fileIndex++){
				if(allPages){
					const temp=this.pdfDocs[fileIndex].getPageIndices();
					for (const pageIndex of temp){
						const pdf = await PDFDocument.create();
						const pageCopy = await pdf.copyPages(this.pdfDocs[fileIndex],[pageIndex]);
						pdf.addPage(pageCopy[0]);
						this.finalPage = await pdf.save();
						this.writeFile(this.output,fileIndex, this.finalPage, pageIndex);
					};
				}else{
					const pdf = await PDFDocument.create();
					const pageCopy = await pdf.copyPages(this.pdfDocs[fileIndex],[...pages]);
					pageCopy.forEach((page) => {
						pdf.addPage(page);
					});
					this.finalPage = await pdf.save();
					this.writeFile(this.output,0, this.finalPage, fileIndex);
				};
			};
		} catch (err) {
			throw err;
		}
	}

	async mergePDF() {
		try {
			const docmerged = await PDFDocument.create();
			for (let fileIndex=0;fileIndex<this.pdfDocs.length;fileIndex++){
				let doc_pages = await docmerged.copyPages(this.pdfDocs[fileIndex], this.pdfDocs[fileIndex].getPageIndices());
				doc_pages.forEach((page) => docmerged.addPage(page));
			};
			this.finalPDF = await docmerged.save();
			this.writeFile(this.output,0, this.finalPDF, 0);
		} catch (err) {
			throw err;
		}
	}

	async deletePDF(pages){
		console.log(pages);
		try{
		 for(let fileIndex=0;fileIndex<this.pdfDocs.length;fileIndex++){
			console.log("Total length -",this.pdfDocs[fileIndex].getPageIndices().length);
			for(let pg=0;pg<pages.length;pg++){
				console.info("Page to be removed -",pages[pg]-pg);
				this.pdfDocs[fileIndex].removePage(pages[pg]-pg);
			};
			this.finalPDF=await this.pdfDocs[fileIndex].save();
			this.writeFile(this.output,fileIndex, this.finalPDF, 0);
			};   
		}catch(err){
		  throw err;
		};
	  };
}
export default PDFActions;


