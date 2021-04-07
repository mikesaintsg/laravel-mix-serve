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
        compiler.hooks[this.config.hook].tap('ServePlugin', (compilation) => {
            this.onWatch()
            this.inDev()
            this.inProduction()
        })
    }

    watchRunStatus(compiler){
        compiler.hooks.watchRun.tap('ServePlugin', (compilation) => { this.watchRun = true });
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
        return spawn(this.config.cmd, this.config.args, {shell: true})
    }

    runSpawnVerbose() {
        return new VerbosePlugin(this.runSpawn(), this.config.verbose)
    }
}

module.exports = ServePlugin;