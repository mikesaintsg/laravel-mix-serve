const mix = require('laravel-mix')
const ServePlugin = require('./plugin/ServePlugin');

class Serve {
    name() {
        return 'serve'
    }

    register(userConfig, userOption) {
        this.userConfig = typeof userConfig === 'string'
            ? this.parseCmd(userConfig)
            : userConfig;

        if (userOption) {
            if (userOption.cmd) delete userOption.cmd;
            if (userOption.args) delete userOption.args;
            Object.assign(this.userConfig, userOption)
        }
    }

    webpackPlugins() {
        return new ServePlugin(this.config())
    }

    config() {
        return {
            cmd: 'php',
            args: ["artisan", "serve"],
            verbose: true,
            watch: true,
            dev: true,
            prod: false,
            hook: 'afterCompile',
            ...this.userConfig
        };
    }

    parseCmd(string) {
        let [cmd, ...args] = string.split(" ")
        return {
            cmd: cmd,
            args: args
        }
    }
}

mix.extend('serve', new Serve());