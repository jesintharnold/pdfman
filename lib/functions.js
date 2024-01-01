import { formatArray,formatFiles } from "./utils.js";
class cmdfunc{
	constructor(){};
	async splitfun(globalOpts,options){
		const actionInstance=await formatFiles(options,globalOpts);
		if(options.range){
			let _arr_=[options.range[0],options.range[1]];
			_arr_=formatArray(_arr_,true,options.range[0]);
			await actionInstance.splitPDF(_arr_);
		}else if(options.number){
			const _arr_=formatArray(options.number);
			await actionInstance.splitPDF(_arr_);
		}else{
			await actionInstance.splitPDF([0],true);
		};
	};
	async mergefun(globalOpts,options){
		const actionInstance=await formatFiles(options,globalOpts);
		await actionInstance.mergePDF();
	};
	async deletefun(globalOpts,options){
		const actionInstance=await formatFiles(options,globalOpts);
		if(options.range){
			let _arr_=[options.range[0],options.range[1]];
			_arr_=formatArray(_arr_,true,options.range[0]);
			await actionInstance.deletePDF(_arr_);
		}else if(options.number){
			const _arr_=formatArray(options.number);
			await actionInstance.deletePDF(_arr_);
		}else{

		};
	};
};

export default cmdfunc;