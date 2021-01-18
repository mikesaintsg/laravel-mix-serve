# Laravel Mix Serve

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Latest Version on NPM](https://img.shields.io/npm/v/laravel-mix-serve.svg?style=flat-square)](https://npmjs.com/package/laravel-mix-serve)
[![npm](https://img.shields.io/npm/dt/laravel-mix-serve.svg?style=flat-square)](https://www.npmjs.com/package/laravel-mix-serve)

This package extends Laravel Mix to run the `php artisan serve` command by default, or any custom command, within the same shell after the mix command has been executed.

## Usage
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

## Configuration
***

#### Commands
Custom commands come in handy for projects outside of Laravel.

```js
// String Command
mix.serve('npm run start');

// Object Command
mix.serve({ cmd: 'npm', args: ['run', 'start']});
```
>
> The use of an Object comes from the way that the `spawn` method of the `child_process` module is used.

#### Verbosity
You can choose whether you want the output from your server to show in the shell. By default, verbose is set to `true` so that you can see any responses or errors from your server. Otherwise, you can turn this feature off by setting verbose to `false`.
```js
/* Options ( true | false | 'once' ) */

// Object
mix.serve({ verbose: false });

// with String Command
mix.serve('npm run start', { verbose: false });

// with Object Command
mix.serve({
    cmd: 'npm', 
    args: ['run', 'start'],
    verbose: false
});
```
> 
>For Laravel users, if you want to still be sure that your server is up while not losing the place of your compiled mix output, you can also use the option `'once'`.
> 
> For example, if you only want the default Laravel output of:
> 
>`Starting Laravel development server: http://127.0.0.1:8000`

## Credits
- [Geoff Selby](https://geoffcodesthings.com) ( [laravel-mix-artisan-serve](https://github.com/GeoffSelby/laravel-mix-artisan-serve/blob/master/README.md) )


- [Jeffrey Way](https://twitter.com/jeffrey_way) ( [Laracasts](https://laracasts.com/), [Laravel Mix](https://github.com/JeffreyWay/laravel-mix))
 
Thank you Jeffrey, Laracasts built the foundation of my coding knowledge and techniques. There is such beauty to clean and readable code. 

Laravel Mix has been godsend, even outside of the Laravel ecosystem. I have used it to set up quick template projects and it has saved me so much time.

This Laravel Mix Plugin is a small dedication to both what I learned in Laracasts and the wonderful tool that is Laravel Mix.


## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.