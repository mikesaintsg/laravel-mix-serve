const mix = require('laravel-mix')
const ServePlugin = require('./plugin/ServePlugin');
const parseCommand = require('./helpers/parseCommand')

class Serve {
    name() {
        return 'serve'
    }

    register(userConfig, userOption) {
        this.userConfig =
            typeof userConfig == 'string'
                ? (userOption
                ? Object.assign(parseCommand(userConfig), userOption)
                : parseCommand(userConfig))
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
}

mix.extend('serve', new Serve());