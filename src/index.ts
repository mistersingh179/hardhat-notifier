import { execSync } from "child_process";
import { extendConfig, extendEnvironment, task } from "hardhat/config";
import { lazyObject } from "hardhat/plugins";
import { HardhatConfig, HardhatUserConfig, NotifierConfig } from "hardhat/types";
import path from "path";

import { ExampleHardhatRuntimeEnvironmentField } from "./ExampleHardhatRuntimeEnvironmentField";
// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
import "./type-extensions";

const sendNotification = (
  title = "",
  subtitle = "",
  message = "",
  sound = ""
) => {
  const command =
    `osascript -e` +
    `'` +
    `display notification ` +
    `"${message}"` +
    ` with title "${title}"` +
    ` subtitle "${subtitle}"` +
    (sound ? ` sound name "${sound}"` : ``) +
    `'`;
  execSync(command);
};

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    const { notifier } = userConfig;
    const n: NotifierConfig = {
      playSuccessSound: true,
      playFailureSound: true,
      notifyOnSuccess: true,
      notifyOnFailure: true,
    };
    if (notifier?.playSuccessSound === false) {
      n.playSuccessSound = false;
    }
    if (notifier?.playFailureSound === false) {
      n.playFailureSound = false;
    }
    if (notifier?.notifyOnSuccess === false) {
      n.notifyOnSuccess = false;
    }
    if (notifier?.notifyOnFailure === false) {
      n.notifyOnFailure = false;
    }
    config.notifier = n;
  }
);

extendEnvironment((hre) => {});

task("compile", "Compiles project, builds artifacts & then notifies").setAction(
  async (taskArgs, hre, runSuper) => {
    const { config } = hre;
    const { notifier } = config;
    try {
      await runSuper(taskArgs);
      if (notifier.notifyOnSuccess) {
        sendNotification(
          "Sidekik Notifier",
          "Compile Successful",
          "🎉🥳🎉🥳",
          notifier.playSuccessSound ? "Tink" : ""
        );
      }
    } catch (e) {
      console.log(e);
      if (notifier.notifyOnFailure) {
        sendNotification(
          "Sidekik Notifier",
          "Compile Error",
          "🚥✋🔥😬",
          notifier.playFailureSound ? "Submarine" : ""
        );
      }
    }
  }
);
