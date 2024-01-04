import ora from "ora";
import fs from "fs/promises";


class spin{
    constructor(){
        this.spinner=ora({
            spinner:'dots10',
            text:"Processing documents...",
            color:"yellow"
        });
    };
    start(){
        this.spinner.start();
    };

    stop(){
        this.spinner.stop();
    };

    getspinner(){
        return this.spinner;
    };
    async spinWrite(_gpath_,pdf,options){
            this.spinner.text=`saving file - ${options.pageIndex+1}/${options.totalFiles}`;
            await fs.writeFile(_gpath_, pdf);
            this.spinner.text=`saved successfully -${options.pageIndex+1}/${options.totalFiles}`;
            if(options.pageIndex+1===options.totalFiles){
                this.spinner.succeed();
                this.spinner.succeed(`File path - ${options.output}`);
             
            };
    };
};

export default spin;