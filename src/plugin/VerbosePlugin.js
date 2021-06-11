class VerbosePlugin {
	count = true

	constructor(spawned, config) {
		this.spawned = spawned;
		this.config = config;

		this.output()
	}

	output() {
		this.spawned.stdout.on("data", data => {
			if (this.count) process.stdout.write(data.toString());
			if (this.config.verbose === 'once') this.count = false;
		});
	}
}

module.exports = VerbosePlugin;

