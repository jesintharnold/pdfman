import { Command, Option } from "commander";
import opt from "../../lib/options.js";

// class x {
// 	constructor() {
// 		this.program = new Command();
// 		// this._prog_=this.program.option("-f, --file <file...>","relative file path",null).option("-d, --dir <folder...>","root directory path",null);


// 		const val="pop";
// 		const _s_=new Command("split");
// 		opt.split.forEach(({ option, description, validator }) => {
// 			_s_.addOption(new Option(option, description).argParser(validator));
// 		});		
// 		this.program.addCommand(_s_);
// 		_s_.addOption(new Option("-f, --file <file...>","relative file path",null));
// 		_s_.addOption(new Option("-d, --dir <folder...>","root directory path",null));
// 		_s_.action(this.title.bind(this,val));
		


// 	}

// 	// Fix: Correct the method name to "title"
// 	title(dynamicValue,option) {
// 		console.warn(option);
// 		console.log(dynamicValue);
// 	}

// 	init(){
// 		this.program.parse(process.argv);
// 	}
// }

// const _x_ = new x().init();



// const program = new Command();

// program
// 	.option("-f, --file <file>", "relative file path")
// 	.option("-d, --dir <dir>", "root directory path").action((cmd) => {
// 		console.log("Splitting with range:", cmd);
// 	});

// program
// 	.command("split")
// 	.option("-r, --range <range...>", "specify range")
// 	.action((cmd) => {
// 		console.log("Splitting with range:", cmd);
// 	});

// program
// 	.command("merge")
// 	.option("-n, --number <number...>", "specify numbers")
// 	.action((cmd) => {
// 		console.log("Merging with numbers:", cmd.number);
// 	});


// program.parse(process.argv);


class CLI {
	constructor() {
		this.program = new Command();
		this.setupOptions();
		this.setupCommands();
	}

	setupOptions() {
		this.program
			.option("-f, --file <file>", "relative file path")
			.option("-d, --dir <dir...>", "root directory path").action((opt)=>console.log(opt));
	}

	setupCommands() {
		this.program
			.command("split")
			.option("-r, --range <range...>", "specify range")
			.option("-d, --dir <dange...>", "specify range")
			.action((cmd) => {
				this.handleCommand("split", cmd);
			});

		this.program.command("pay")
			.addOption(new Option("--cash").conflicts("creditCard"))
			.addOption(new Option("--credit-card"))
			.action((options) => {
		  if (options.cash) {
					console.log("Paying by cash");
		  } else if (options.creditCard) {
					console.log("Paying by credit card");
		  } else {
					console.log("Payment method unknown");
		  }
			});

		this.program
			.command("merge")
			.option("-n, --number <number...>", "specify numbers")
			.action((cmd) => {
				this.handleCommand("merge", cmd);
			});
	}

	handleCommand(command, cmd) {
		console.log("Global Options:", this.program.opts());
		console.log(`${command} Command Options:`, cmd);
	}

	run() {
		this.program.parse(process.argv);
	}
}

const cli = new CLI();
cli.run();

