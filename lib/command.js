import { Command, Option } from "commander";
import editactions from "./options.js";
import cmdfunc from "./functions.js";

//keep options here and initate in constructor so we can disable if it is not required 
class pdfcmd extends cmdfunc{
	constructor(){
		super();
		this.entryPoint=new Command();
		this.init();
		this.split();
	};

	init(){
		this.entryPoint.option("-f, --file <file...>","relative file path",null)
			.option("-d, --dir <folder>","root directory path",null);
	};

	split(){
		try{
			const _split_=new Command("split");
			editactions.split.forEach(({option,description,validator})=>{
				_split_.addOption(new Option(option,description).argParser(validator));
			});
			this.entryPoint.addCommand(_split_);
			_split_.action(this.splitfun.bind(this,this.entryPoint));
		}catch(err){
			throw err;
		};
	};

	merge(){
		try{
			const _merge_=new Command("merge");
			this.entryPoint.addCommand(_merge_);
			editactions.merge.forEach(({option,description,validator})=>{
				_merge_.addOption(new Option(option,description).argParser(validator));
			});
			this.entryPoint.addCommand(_merge_);
			_merge_.action(this.mergefun.bind(this,this.entryPoint));
		}catch(err){
			throw err;
		};
	};

	delete(){
		try{
			const _delete_=new Command("delete");
			this.entryPoint.addCommand(_delete_);
			editactions.delete.forEach(({option,description,validator})=>{
				_delete_.addOption(new Option(option,description).argParser(validator));
			});
			this.entryPoint.addCommand(_delete_);
			_delete_.action(this.deletefun.bind(this,this.entryPoint));
			return _delete_;
		}catch(err){
			throw err;
		};
	};

	parse(){
		this.entryPoint.parse(process.argv);
	};
};

export default pdfcmd;