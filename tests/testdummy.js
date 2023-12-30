/* eslint-disable */
import { PDFDocument, StandardFonts } from "pdf-lib";
import { promises as fs } from "fs";
import { resolve, join } from "path";

class pdfError extends Error {
	constructor(message, displayMessage, show = false) {
		super(message);
		this.name = this.constructor.name;
		this.show = show;
		Error.captureStackTrace(this, pdfError);
	}
}


class PDF {
  constructor(path) {
    this.path = [...path];
    this.pdfBuffer = [null];
    this.pdfDoc = [null];
  }

  async loadFile(index) {
    try {
      this.pdfBuffer[index] = await fs.readFile(resolve(this.path[index]));
      return this.pdfBuffer[index];
    } catch (err) {
      throw err;
    }
  }

  async loadDocument(index = 0) {
    try {
      await this.loadFile(index).then(async (data) => {
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

class PDFAction {
  constructor(pdfDocs, output) {
    this.output = output;
    this.pdfDocs = [...pdfDocs]; //array of pdfDocs
    this.finalPDF = null;
  }

  async writeFile(output, fileName, pdfArray, index) {
    const file = join(resolve(output), `${fileName}-${index}.pdf`);
    return await fs.writeFile(file, pdfArray);
  }

  async splitPDF(pageArray) {
    try {
      const pages = [...pageArray].map((val) => val - 1);
      const pdf = await PDFDocument.create();
      const pageCopy = await pdf.copyPages(this.pdfDocs[0], [...pages]);
      pageCopy.forEach((page) => {
        pdf.addPage(page);
      });
      this.finalPDF = await pdf.save();
      return this.writeFile(this.output, "Generate", this.finalPDF, 0);
    } catch (err) {
      throw err;
    }
  }

  // Merge two or more documents
  // single and multiple documents
  // Input is usually a doc strings i.e Path
  async mergePDF() {
    try {
      const docmerged = await PDFDocument.create();
      console.log([...this.pdfDocs]);
      [...this.pdfDocs].forEach(async (val, index) => {
        let doc_pages = await docmerged.copyPages(val, val.getPageIndices());
        doc_pages.forEach((page) => docmerged.addPage(page));
      });
      this.finalPDF = await docmerged.save();
      return this.writeFile(this.output, "Generate", this.finalPDF, 0);
    } catch (err) {
      throw err;
    }
  }

  async deletePDF(pageArray){
    try{
      const pages = [...pageArray].map((val) => val - 1);
      [...pages].forEach((ele,index)=>{
        this.pdfDocs[0].removePage(ele);
      });
      this.finalPDF = await this.pdfDocs[0].save();
      return this.writeFile(this.output, "Generate", this.finalPDF, 0);      
    }catch(err){
      throw err;
    };
  };
}



function formatArray(array){
	const temp=[...array].map((val)=>val-1);
	return temp;
};

async function getdirFiles(_dirpath_){
	try{
		const file=await pathExists(_dirpath_);
		if(file){
			const files=await fs.readdir(_dirpath_,{withFileTypes:true}).then((files)=>{
				let temp=files.filter((file)=>file.isFile()&&file.name.toLocaleLowerCase().endsWith(".pdf"));
				temp=temp.map(file=>join(file.path,file.name));
				return temp;
			});
        
			return {
				"count":files.length,
				"files":[...files]
			};
		};
	}catch(err){
		throw err;
	};
};

async function pathExists(_path_){
	try{
		await fs.access(_path_);
		return true;
	}catch(err){
		throw err;    
	}
};

async function getFile(_filepath_){
	try{
		const file=await pathExists(_filepath_);
		if(file&&(_filepath_.toLocaleLowerCase().endsWith(".pdf"))){
			return {
				"count":1,
				"files":[_filepath_]
			};
		}else{
			throw new Error("File with extension .pdf not exists");
		}
	}catch(err){
		throw err;
	};
};


async function x() {
  const A = new PDF([
    "E:/DOWN-BKP/JesinthArnoldAGResume.pdf"
  ]);
  await A.loadDocuments();

  //"E:/DOWN-BKP/665223351-Building-Transformer-Models-With-Attention.pdf",
  // actions = new PDFAction(A.pdfDoc, "./");
  // actions.splitPDF([1,20,3,40,50]);
  // actions.deletePDF([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
  // console.log(formatArray([1,20,200,300]));
  
  // const arr=await getdirFiles("E:/DOWN-BKP");
  // console.log(arr);

  // const arr_file=await getFile("E:/DOWN-BKP/JesinthArnoldAGResume.pdf")
  // console.log(arr_file);
}

x();


