import { PDFDocument } from "pdf-lib";
import path from "path";
import fs from "fs/promises";
import spiner from '../spin.js';

class PDFActions {
	constructor(pdfDocs,metadata,output) {
		this.output = output;
		this.pdfDocs = [...pdfDocs]; //array of pdfDocs
		this.finalPDF = null;
		this.metadata=metadata;
		this.spinner=new spiner();
		this.spin=this.spinner.getspinner();
		this.spin.start(); //Initate the spinner
	}

	async writeFile(fileIndex, pdf, pageIndex,totalFiles) {
		try{
			const dirPath=path.join(this.output,"Generate-pdf");
			await fs.mkdir(dirPath,{recursive:true});
			const _fname_=`${this.metadata[fileIndex].name}-${fileIndex}-${pageIndex}.pdf`;
			const _gpath_=path.join(dirPath,_fname_);
			this.spinner.spinWrite(_gpath_,pdf,{pageIndex:pageIndex,totalFiles:totalFiles,output:this.output});
			}catch(err){
			throw err;
		};
	};

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
						await this.writeFile(fileIndex, this.finalPage, pageIndex,this.pdfDocs.length);
					};
				}else{
					const pdf = await PDFDocument.create();
					const pageCopy = await pdf.copyPages(this.pdfDocs[fileIndex],[...pages]);
					pageCopy.forEach((page) => {
						pdf.addPage(page);
					});
					this.finalPage = await pdf.save();
					await this.writeFile(0, this.finalPage, fileIndex,this.pdfDocs.length);
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
			await this.writeFile(0, this.finalPDF, 0,1);
		} catch (err) {
			throw err;
		}
	}

	async deletePDF(pages){
		try{
		 for(let fileIndex=0;fileIndex<this.pdfDocs.length;fileIndex++){
				for(let pg=0;pg<pages.length;pg++){
					this.pdfDocs[fileIndex].removePage(pages[pg]-pg);
				};
				this.finalPDF=await this.pdfDocs[fileIndex].save();
				await this.writeFile(fileIndex, this.finalPDF, fileIndex,this.pdfDocs.length);
			};   
		}catch(err){
		  throw err;
		};
	  };
}
export default PDFActions;


