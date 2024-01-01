const options={
	"split":[
		{
			"option":"-r, --range <start...>",
			"description":"split pdf by given range",
			"validator":function(value,previous){
				if(previous===undefined){
					return [parseInt(value)];
				};
				if(previous.length>=1){
					return [...previous,parseInt(value)];
				};
				return previous;
			},
			"conflicts":["number","all"]
		},
		{
			"option":"-n, --number <pgnumbers...>",
			"description":"split as seperate file based on given page numbers",
			"validator":null,
			"conflicts":["range","all"]
		},
		{
			"option":"-a, --all",
			"description":"split all pages as invidual pdf files",
			"validator":null,
			"conflicts":["number","split"]
		}
	],
	"merge":[],
	"delete":[
		{
			"option":"-r, --range <start...>",
			"description":"split pdf by given range",
			"validator":function(value,previous){
				if(previous===undefined){
					return [parseInt(value)];
				};
				if(previous.length>=1){
					return [...previous,parseInt(value)];
				};
				return previous;
			},
			"conflicts":["number"]
		},
		{
			"option":"-n, --number <pgnumbers...>",
			"description":"split as seperate file based on given page numbers",
			"validator":null,
			"conflicts":["range"]
		}
	],
	
};

export default options;