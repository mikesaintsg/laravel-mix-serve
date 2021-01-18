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
                ? Object.assign(this.parseCommand(userConfig), userOption)
                : this.parseCommand(userConfig))
                : userConfig;
    }

    webpackPlugins() {
        return new ServePlugin(this.config())
    }

    config() {
        return Object.assign({
            command: 'php',
            args: ["artisan", "serve"],
            verbose: true
        }, this.userConfig);
    }

    parseCommand(string) {
        return {
            command: string.split(" ")[0],
            args: string.split(" ").slice(1)
        }
    }
}

mix.extend('serve', new Serve());