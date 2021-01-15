const mix = require('laravel-mix');

class Serve {

    register(userConfig) {
        this.userConfig =
            typeof userConfig == 'string' ? this.parseCommand(userConfig) : userConfig;
    }

    webpackPlugins() {
        let { spawn } = require("child_process");

        let serve = spawn(this.config().command, this.config().args);

        serve.stdout.on("data", data => {
            console.log(`\n${data}`);
        });

        serve.stderr.on("data", data => {
            console.error(`\n${data}`);
        });
    }

    config() {
        let userConfig = this.userConfig;

        let defaultConfig = {
            command: 'php',
            args: ["artisan", "serve"]
        };

        return Object.assign(defaultConfig, userConfig);
    }

    parseCommand(userConfig) {

        let splitStringCommand = userConfig.split(" ");

        let command = splitStringCommand[0];

        let args = splitStringCommand.slice(1);

        return {
            command: command,
            args: args
        }
    }
}

mix.extend('serve', new Serve());