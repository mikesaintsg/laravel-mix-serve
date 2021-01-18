const mix = require('laravel-mix')
const { spawn } = require("child_process");

const VerbosePlugin = require('./VerbosePlugin');

class ServePlugin {
    constructor(config) {
        this.config = config;
    }

    apply() {
        mix.after(stats => {
            this.config.verbose
                ? this.runSpawnVerbose()
                : this.runSpawn()
        });
    }

    runSpawn() {
        return spawn(this.config.command, this.config.args);
    }

    runSpawnVerbose() {
        return new VerbosePlugin(this.runSpawn(), this.config.verbose)
    }
}

module.exports = ServePlugin;