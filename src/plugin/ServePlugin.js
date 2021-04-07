const mix = require('laravel-mix')
const { spawn } = require("child_process");

const VerbosePlugin = require('./VerbosePlugin');

class ServePlugin {
    constructor(config) {
        this.config = config;
        this.watchRun = false
        this.spawnHasRun = false
        this.onProduction = mix.inProduction()
    }

    apply(compiler) {
        this.watchRunStatus(compiler);
        this.afterCompile(compiler);
    }

    watchRunStatus(compiler){
        compiler.hooks.watchRun.tap('ServePlugin', (compilation) => { this.watchRun = true });
    }

    afterCompile(compiler){
        mix.after(stats => {
            this.onWatch()
            this.inDev()
            this.inProduction()
        });
    }

    onWatch() {
        if(this.watchRun === true && this.config.watch === true && this.spawnHasRun === false) {
            return this.determineSpawn();
        }
    }

    inProduction() {
        if(this.onProduction === true && this.config.prod === true && this.spawnHasRun === false) {
            return this.determineSpawn();
        }
    }

    inDev() {
        if(this.onProduction === false && this.config.dev === true && this.spawnHasRun === false) {
            return this.determineSpawn();
        }
    }

    determineSpawn() {
        this.config.verbose ? this.runSpawnVerbose() : this.runSpawn()
        this.spawnHasRun = true;
    }

    runSpawn() {

        return spawn(this.config.cmd, this.config.args, {shell: process.platform === 'win32'})
    }

    runSpawnVerbose() {
        return new VerbosePlugin(this.runSpawn(), this.config.verbose)
    }
}

module.exports = ServePlugin;