import path, {join,parse} from "path";
import fs from "fs/promises";
import PDF from "./actions/pdf.js";
import PDFActions from "./actions/pdfactions.js";
import spin from "./spin.js";
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
				temp=temp.map(file=>{
					const _path_=join(file.path,file.name);
					const {name}=parse(_path_);
					return {
						"path":_path_,
						"name":name
					};
				});
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
				const {name}=parse(_path_);
				obj.push({"path":_path_,"name":name});
			}else{
				throw new Error("File with extension .pdf not exists");
			}
		});
		return {"count":obj.length,"files":[...obj]};
	}catch(err){
		throw err;
	};
};

export async function formatFiles(option){
	const {file,dir,out}=option;
	if(file==undefined&&dir==undefined){console.error("error: option '-f or -d' argument missing");process.exit(1);};
	let _filearr_=null;
	if(dir!=null){
		_filearr_=await getdirFiles(dir);
	}else if(file!=null){
		_filearr_=await getFile(file);
	};
	if(_filearr_.count>0){
		const pdfInstance=new PDF(_filearr_.files);
		const loaders=new spin();
		loaders.start();
		await pdfInstance.loadDocuments();
		if(pdfInstance.pdfDoc.length===_filearr_.files.length){
			loaders.getspinner().succeed();
		}else{
			loaders.getspinner().fail();
		};
		loaders.getspinner().stop();
		const outputPath=(out==null)?process.cwd():path.resolve(out);
		return new PDFActions(pdfInstance.pdfDoc,_filearr_.files,outputPath);
	};
	return null;
};
