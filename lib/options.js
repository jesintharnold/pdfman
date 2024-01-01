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
			}
		},
		{
			"option":"-n, --number <pgnumbers...>",
			"description":"split as seperate file based on given page numbers",
			"validator":null
		},
		{
			"option":"-a, --all",
			"description":"split all pages as invidual pdf files",
			"validator":null
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
			}
		},
		{
			"option":"-n, --number <pgnumbers...>",
			"description":"split as seperate file based on given page numbers",
			"validator":null
		}
	],
	
};

export default options;