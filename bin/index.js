#!/usr/bin/env node

console.info("Initating...");
import pdfcmd from "../lib/command.js";
const gateway=new pdfcmd();
gateway.parse();
gateway.entryPoint.action((option)=>{console.log(option);});