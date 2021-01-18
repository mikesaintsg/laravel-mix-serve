class VerbosePlugin {
	constructor(server, options) {
		this.server = server;
		this.options = options;
		this.count = true
		this.output()
	}

	output() {
		this.server.stdout.on("data", data => {
			if(this.count) console.log(`\n${data}`);
			if(this.options === 'once') this.count = false;
		});
	}
}

module.exports = VerbosePlugin;
