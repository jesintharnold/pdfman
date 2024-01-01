import { formatArray,formatFiles } from "./utils.js";
class cmdfunc{
	constructor(){};
	async splitfun(options){
		console.log(options);
		const actionInstance=await formatFiles(options);
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
	async mergefun(options){
		console.log(options);
		const actionInstance=await formatFiles(options);
		await actionInstance.mergePDF();
	};
	async deletefun(options){
		console.log(options);
		const actionInstance=await formatFiles(options);
		if(options.range){
			let _arr_=[options.range[0],options.range[1]];
			_arr_=formatArray(_arr_,true,options.range[0]);
			await actionInstance.deletePDF(_arr_);
		}else if(options.number){
			const _arr_=formatArray(options.number);
			await actionInstance.deletePDF(_arr_);
		};
	};
};

export default cmdfunc;