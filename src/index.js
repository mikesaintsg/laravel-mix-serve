const mix = require('laravel-mix')
const ServePlugin = require('./plugin/ServePlugin');

class Serve {
    name() {
        return 'serve'
    }

    register(userConfig, userOption) {
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
            verbose: true
        }, this.userConfig);
    }

    parseCmd(string) {
        return {
            cmd: string.split(" ")[0],
            args: string.split(" ").slice(1)
        }
    }
}

mix.extend('serve', new Serve());