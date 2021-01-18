class VerbosePlugin {
	constructor(server, options) {
		this.options = options;
		this.server = server;
		this.count = true
		this.output()
	}

	output() {
		this.server.stdout.on("data", data => {
			if(this.count === true) {
				console.log(`\n${data}`);
			}
			if(this.options === 'once') {
				this.count = false
			}
		});
	}
}

module.exports = VerbosePlugin;
