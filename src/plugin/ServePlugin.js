const mix = require('laravel-mix')
const {spawn} = require("child_process");

const VerbosePlugin = require('./VerbosePlugin');

class ServePlugin {
    spawned = false

    modes = {
        prod: mix.inProduction(),
        dev: !mix.inProduction(),
        watch: false
    }

    constructor(config) {
        this.config = config
    }

    apply(compiler) {
        this.watchStatus(compiler);

        compiler.hooks[this.config.hook]
            .tap('ServePlugin', () =>
                this.spawnConditions(() =>
                    this.determineSpawn()));
    }

    watchStatus(compiler) {
        compiler.hooks.watchRun
            .tap('ServePlugin', () =>
                this.modes.watch = true);
    }

    spawnConditions(callback){
        if (this.spawned) return;

        for (const mode in this.modes) {
            if(this.modes[mode] === true && this.config[mode] === false) {
                if(mode === 'dev' && this.modes.watch === true) continue;

                return;
            }
        }

        callback()
    }

    determineSpawn() {
        this.config.verbose
            ? this.runSpawnVerbose()
            : this.runSpawn()
    }

    runSpawn() {
        return this.spawned = spawn(this.config.cmd, this.config.args, {shell: true})
    }

    runSpawnVerbose() {
        return new VerbosePlugin(this.runSpawn(), this.config)
    }
}

module.exports = ServePlugin;
