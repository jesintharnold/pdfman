/* eslint-disable */
const fs = require("fs").promises;
const Path = require("path");

async function checkDir(path){
    const files=await fs.readdir(path,{withFileTypes:true}).then((files)=>{
        let temp=files.filter((file)=>file.isFile()&&file.name.toLocaleLowerCase().endsWith(".pdf"));
        temp=temp.map(file=>Path.join(file.path,file.name));
        return temp;
    });

    return {
        "count":files.length,
        "files":files
    };
};

checkDir("E:/DOWN-BKP");







