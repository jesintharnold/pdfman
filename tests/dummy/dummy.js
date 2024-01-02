/* eslint-disable */
import { promises as fs } from "fs";
import { join, basename,parse} from "path";

async function checkDir(path){
    const files=await fs.readdir(path,{withFileTypes:true}).then((files)=>{
        let temp=files.filter((file)=>file.isFile()&&file.name.toLocaleLowerCase().endsWith(".pdf"));
        temp=temp.map(file=>{
            const _path_=join(file.path,file.name);
            const {name}=parse(_path_);
            return {
                "path":_path_,
                "name":name
            }
        });
        return temp;
    });

    return {
        "count":files.length,
        "files":files
    };
};

// const _A_=await checkDir("E:/DOWN-BKP");
// console.log(_A_);

const dir=await fs.mkdir("dummy-check",);
console.log(dir);


