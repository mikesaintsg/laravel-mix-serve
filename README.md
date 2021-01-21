<a id="top"></a>
# Laravel Mix Serve

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Latest Version on NPM](https://img.shields.io/npm/v/laravel-mix-serve.svg?style=flat-square)](https://npmjs.com/package/laravel-mix-serve)
[![npm](https://img.shields.io/npm/dt/laravel-mix-serve.svg?style=flat-square)](https://www.npmjs.com/package/laravel-mix-serve)

This package extends Laravel Mix to run the `php artisan serve` command by default, or any custom command, within the same shell after the mix command has been executed.
### <a id="table-contents">Table of Contents</a>
***
1. **<a href="#usage">Usage</a>**
2. **<a href="#configuration">Configuration</a>**
   - <a href="#configuration-defaults">Defaults</a>
   - <a href="#configuration-commands">Commands</a>
   - <a href="#configuration-verbosity">Verbosity</a>
   - <a href="#configuration-watch">Watch (ver 2.1.0)</a>
   - <a href="#configuration-development">Development (ver 2.1.0)</a>
   - <a href="#configuration-production">Production (ver 2.1.0)</a>
3. **<a href="#credits">Credits</a>**
4. **<a href="#license">License (MIT)</a>**
<br>

## <a id="usage">Usage</a> 
<a href="#usage">Back to Top</a>
***

1. Install the package with npm or yarn:

```bash
npm install laravel-mix-serve --save-dev

yarn add laravel-mix-serve --dev
```

 2. Require the extension in your Mix configuration:

```js
const mix = require('laravel-mix');

require('laravel-mix-serve');
```

3. Enable the extension by calling `.serve()`:

```js
mix.serve();
```
>
> By default, the Laravel serve command `php artisan serve` will be executed.

And you're done!

## <a id="configuration">Configuration</a>
<a href="#usage">Back to Top</a>
***
#### <a id="configuration-defaults">Defaults</a>

```js
mix.serve({
    cmd: 'php',
    args: ["artisan", "serve"],
    verbose: true,
    watch: true,
    dev: true,
    prod: false
})
```
>
> The use of an Object, for the command (`cmd`) and arguments (`args`), comes from the way that the `spawn` method of the `child_process` module is used.


#### <a id="configuration-commands">Commands</a>
###### - String Commands
Instead of making changes directly to the Object, you can provide a string command. Configuration options can still be changed through the second parameter.
```js
// String Command
mix.serve('php artisan serve');

//String Command with Any Config Options
mix.serve('php artisan serve', {
    verbose: true,
    watch: true,
    dev: true,
    prod: false
});
```
> Since the configuration options passed to the second parameter would take precedence when assigned, the `cmd` and `args` properties within the second parameter Object are deleted to ensure that the string command is not overwritten.
###### - Custom Commands
Custom commands are the major caveat of this plugin, whether it is a custom Laravel or even non-Laravel command, in conjunction with the convenience of passing commands as strings.
```js
// Custom Non-Laravel Command
mix.serve('npm run start');

// Custom Laravel Command
mix.serve('php artisan serve --port=8888');
```

#### <a id="configuration-verbosity">Verbosity</a>
You can choose whether you want the output from your server to show in the shell. By default, verbose is set to `true` so that you can see any responses or errors from your server. Otherwise, you can turn this feature off by setting verbose to `false`.
```js
/* Options ( true | false | 'once' ) */

// Object
mix.serve({ verbose: false });

// with String Command
mix.serve('npm run start', { verbose: false });
```
> 
>For Laravel users, if you want to still be sure that your server is up while not losing the place of your compiled mix output, you can also use the option `'once'`.
> 
>For example, if you only want the default Laravel output of:
> 
>`Starting Laravel development server: http://127.0.0.1:8000`


#### <a id="configuration-watch">Watch (ver 2.1.0)</a>
You can disable the command execution from running when `watch` has been called. By default it is enabled, since that is the intention of this plugin, especially when working in conjunction with BrowserSync.
```js
// Object
mix.serve({ watch: false });

// with String Command
mix.serve('npm run start', { watch: false });
```

#### <a id="configuration-development">Development (ver 2.1.0)</a>
You can disable the command execution from running in development mode when `watch` has not been called.
```js
// Object
mix.serve({ dev: false });

// with String Command
mix.serve('npm run start', { dev: false });
```

> To be specific, the logic by which development mode is determined, is when `mix.inProduction()` returns `false`.

#### <a id="configuration-production">Production (ver 2.1.0)</a>
You can enable the command execution to run in production mode. By default, it is disabled since I have yet to determine the use case for this feature. It exists since the barebones came from the development of the `dev` option.
```js
// Object
mix.serve({ prod: true });

// with String Command
mix.serve('npm run start', { prod: true });
```

## <a id="credits">Credits</a>
<a href="#usage">Back to Top</a>

- [Geoff Selby](https://geoffcodesthings.com) ( [laravel-mix-artisan-serve](https://github.com/GeoffSelby/laravel-mix-artisan-serve/blob/master/README.md) )


- [Jeffrey Way](https://twitter.com/jeffrey_way) ( [Laracasts](https://laracasts.com/), [Laravel Mix](https://github.com/JeffreyWay/laravel-mix))
 
Thank you Jeffrey, Laracasts built the foundation of my coding knowledge and techniques. There is such beauty to clean and readable code. 

Laravel Mix has been godsend, even outside of the Laravel ecosystem. I have used it to set up quick template projects and it has saved me so much time.

This Laravel Mix Plugin is a small dedication to both what I learned in Laracasts and the wonderful tool that is Laravel Mix.


## <a id="license">License</a>
<a href="#usage">Back to Top</a>

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.