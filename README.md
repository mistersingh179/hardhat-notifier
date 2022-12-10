# hardhat-notifier

_Dispalys an OSX notification with contract compile failure/success result_

[Hardhat Notifier](https://github.com/mistersingh179/hardhat-notifier) plugin. 

## What

The plugin overrides the compile task. Internally it then calls the compile task, checks the result of the compile task and then sends an OSX notification with the result of the compilation.

This can be very useful when you have your Editor open in front of you and the terminal in the background somewhere watching your code & compiling for you. Now when you make a mistake, it will compile & tell if you via an OSX notification that there is an error.

## Installation

```bash
npm install hardhat-notifier
```

Import the plugin in your `hardhat.config.js`:

```js
require("hardhat-notifier");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "hardhat-notifier";
```

## Tasks

This plugin overrides the _compile_ task.

## Environment extensions

This plugin makes no extensions to the Hardhat Runtime Environment.

## Configuration

This plugin extends the `HardhatUserConfig`'s  object with an optional `notifier` field. Every property of the `notifier` is optional.

This the complete type:

```js
module.exports = {
  notifier: {
    playSuccessSound?: boolean,
    playFailureSound?: boolean,
    notifyOnSuccess?: boolean,
    notifyOnFailure?: boolean,
  }
};
```

## Usage

The **most basic** use case is to just call `npx hardhat compiler` and this plugin will cause an OSX notification to come up with compilation results. 

A **slightly more valuable** use case is to watch your code using `chokidar` and have it run compile task for you when code changes. This way you can put the terminal in the background and know that when there is an error you will be notified.

```
npm install -g chokidar-cli
chokidar "contracts/*.sol" -c "npx hardhat compile"
```

A **more professional** use case is to use tools like `hardhat-watcher` or `harhdat-deploy` to compile & deploy your contracts. No change required to usage. Just use them and if `hardhat-notifier` is installed you will get notified when compilation is failing or succeeding.
