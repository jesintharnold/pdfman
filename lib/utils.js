import path from "path";
import fs from "fs/promises";
import PDF from "./actions/pdf.js";
import PDFActions from "./actions/pdfactions.js";
export function formatArray(array,generate=false,start=1){
	if(generate){
		let temp=[...Array(array[1]-array[0]+1).keys()];
		temp=temp.map((temp)=>parseInt(temp+start-1));
		return temp;
	};
	return [...array].map((val)=>parseInt(val-1));
};

export async function getdirFiles(_dirpath_){
	try{
		const file=await pathExists(_dirpath_);
		if(file){
			const files=await fs.readdir(_dirpath_,{withFileTypes:true}).then((files)=>{
				let temp=files.filter((file)=>file.isFile()&&file.name.toLocaleLowerCase().endsWith(".pdf"));
				temp=temp.map(file=>path.join(file.path,file.name));
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

export async function pathExists(_path_){
	try{
		await fs.access(_path_);
		return true;
	}catch(err){
		throw err;  
	}
};

export function getFile(_filepath_){
	try{
		let obj=[];
		_filepath_.forEach(async (_path_,index) => {
			const file=pathExists(_path_);
			if(file&&(_filepath_[index].toLocaleLowerCase().endsWith(".pdf"))){
				obj.push(_path_);
			}else{
				throw new Error("File with extension .pdf not exists");
			}
		});
		return {"count":obj.length,"files":[...obj]};
	}catch(err){
		throw err;
	};
};

export async function formatFiles(option,entryPoint){
	const {file,dir}=entryPoint.opts();
	let _filearr_=null;
	if(dir!=null){
		_filearr_=await getdirFiles(dir);
	}else if(file!=null){
		_filearr_=await getFile(file);
	};
	if(_filearr_.count>0){
		const pdfInstance=new PDF(_filearr_.files);
		await pdfInstance.loadDocuments();

		return new PDFActions(pdfInstance.pdfDoc,"./");
	};
	return null;
};
