<div align="center">
    <a href=""><img src="./static/oie_IwIM3RjbG3nu.png" style="height:170px"/></a>
    <br>
</div>
<p align="center">A command line PDF manipulation tool built using node.js</p><br>


<!--tags center logo-->
<p align="center">
 <a href=""><b>Website</b></a> •
<a href=""><b>Documentation</b></a>
</p>

<div align="center">

[![npm version](https://img.shields.io/npm/v/pdfman.svg?style=flat-square)](https://www.npmjs.org/package/pdfman)
[![Build status](https://img.shields.io/github/actions/workflow/status/pdfman/pdfman/ci.yml?branch=v1.x&label=CI&logo=github&style=flat-square)](https://github.com/axios/pdfman/actions/workflows/ci.yml)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=pdfman&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=pdfman)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/pdfman?style=flat-square)](https://bundlephobia.com/package/pdfman@latest)
[![npm downloads](https://img.shields.io/npm/dm/axios.svg?style=flat-square)](https://npm-stat.com/charts.html?package=pdfman)
</div>

### Table of Contents
- [Features](#features)
- [Install](#install)


## Features

| Index  |        Feature      |
| :----: |        :------:     |
| 1      |[Split PDF](#split)  |
| 2      |[Merge PDF](#merge)  |
| 3      |[Delete PDF](#delete)|


## Install

### Package manager
Using npm:
```bash
$ npm install pdfman -g 
```

### Split

1. #### split pdf based on range
    ##### Example :
    ```bash
    # split page 1,2 of example.pdf as invidual pdf
    $ pdfman split -r 1 2 -f "G:/example.pdf" 

    # split pages 2,3 of all pdfs in directory and save seperately
    $ pdfman split -r 1 2 -d "G:/files"
    ```
2. #### split pdf based on page numbers
    ##### Example :
    ```bash
    # split pages 2,3 of example.pdf
    $ pdfman split -n 2 3 -f "G:/example.pdf"

    # split pages 2,3 of all pdfs in directory
    $ pdfman split -n 2 3 -d "G:/files"
    ```

3. #### split all pages into invidual pdf
    ##### Example :
    ```bash
    # split all the pages in example.pdf into invidual pdfs
    $ pdfman split -a -f "G:/example.pdf"

    # split all the pages in directory into invidual pdfs
    $ pdfman split -a -d "G:/files"
    ```

### Split tree view - options
```
pdfman
    └── split 
        ├── -r <start> <end> or --range <start> <end>
        ├── -n <pages...> or --number <pages...> 
        ├── -a or --all
        ├── -f <file paths...> or --file <file paths...>
        ├── -d <directory path> or --dir <directory path>
        └── -o <output path> or --out <output path>
```

### Merge

1. #### creating a single pdf given multiple pdf files from different locations
    ##### Example :
    ```bash
    # Generate single pdf from given pdf files
    $ pdfman merge -f "G:/example-1.pdf" "C:/example-2.pdf" "F:/example-3.pdf" 
    ```
2. #### creating a single pdf using the files present in the directory 
    ##### Example :
    ```bash
    # Generate single pdf from the files in given directory
    $ pdfman merge -d "G:/expdir"
    ```
### Merge tree view - options
```
pdfman
    └── merge 
        ├── -f <file paths...> or --file <file paths...>
        ├── -d <directory path> or --dir <directory path>
        └── -o <output path> or --out <output path>
```


### Delete

1. #### Delete pages based on range
    ##### Example :
    ```bash
    # delete page range 1-3 of example.pdf
    $ pdfman delete -r 1 3 -f "G:/example.pdf" 

    # delete pages range 1-3 of all pdfs in directory
    $ pdfman delete -r 1 3 -d "G:/files"
    ```
2. #### Delete pages based on page numbers
    ##### Example :
    ```bash
    # delete pages 2,3 of example.pdf
    $ pdfman delete -n 2 3 -f "G:/example.pdf"

    # split pages 2,3 of all pdfs in directory
    $ pdfman delete -n 2 3 -d "G:/files"
    ```
### Delete tree view - options
```
pdfman
    └── delete
        ├── -r <start> <end> or --range <start> <end>
        ├── -n <pages...> or --number <pages...> 
        ├── -f <file paths...> or --file <file paths...>
        ├── -d <directory path> or --dir <directory path>
        └── -o <output path> or --out <output path>
```