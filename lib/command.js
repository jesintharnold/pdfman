import { Command, Option } from "commander";
import editactions from "./options.js";
import cmdfunc from "./functions.js";

//keep options here and initate in constructor so we can disable if it is not required 
class pdfcmd extends cmdfunc{
	constructor(){
		super();
		this.entryPoint=new Command();
		
		
		this.split();
		this.merge();
		this.delete();


		this.init();
	};

	init(){
		this.entryPoint.commands.forEach((cmd)=>{
			cmd.addOption(new Option("-f, --file <file...>","relative file path"));
			cmd.addOption(new Option("-d, --dir <folder>","root directory path").conflicts("file"));
			cmd.addOption(new Option("-o, --out <out>","output directory path"));
		});
	};

	split(){
		try{
			const _split_=new Command("split");
			editactions.split.forEach(({option,description,validator,conflicts})=>{
				_split_.addOption(new Option(option,description).conflicts([...conflicts]).argParser(validator));
			});
			this.entryPoint.addCommand(_split_);
			_split_.action(this.splitfun.bind(this));
		}catch(err){
			throw err;
		};
	};

	merge(){
		try{
			const _merge_=new Command("merge");
			this.entryPoint.addCommand(_merge_);
			editactions.merge.length>0?editactions.merge.length.forEach(({option,description,validator,conflicts})=>{
				_merge_.addOption(new Option(option,description).conflicts([...conflicts]).argParser(validator));
			}):null;
			this.entryPoint.addCommand(_merge_);
			_merge_.action(this.mergefun.bind(this));
		}catch(err){
			throw err;
		};
	};

	delete(){
		try{
			const _delete_=new Command("delete");
			this.entryPoint.addCommand(_delete_);
			editactions.delete.length>0?editactions.delete.forEach(({option,description,validator,conflicts})=>{
				_delete_.addOption(new Option(option,description).conflicts([...conflicts]).argParser(validator));
			}):null;
			this.entryPoint.addCommand(_delete_);
			_delete_.action(this.deletefun.bind(this));
		}catch(err){
			throw err;
		};
	};

	parse(){
		this.entryPoint.parse(process.argv);
	};
};

export default pdfcmd;