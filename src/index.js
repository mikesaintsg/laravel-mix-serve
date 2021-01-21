const mix = require('laravel-mix')
const ServePlugin = require('./plugin/ServePlugin');

class Serve {
    name() {
        return 'serve'
    }

    register(userConfig, userOption) {
        if(userOption){
            if(userOption.cmd) delete userOption.cmd
            if(userOption.args) delete userOption.args
        }

        this.userConfig =
            typeof userConfig == 'string'
                ? (userOption
                ? Object.assign(this.parseCmd(userConfig), userOption)
                : this.parseCmd(userConfig))
                : userConfig;
    }

    webpackPlugins() {
        return new ServePlugin(this.config())
    }

    config() {
        return Object.assign({
            cmd: 'php',
            args: ["artisan", "serve"],
            verbose: true,
            watch: true,
            dev: true,
            prod: false
        }, this.userConfig);
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