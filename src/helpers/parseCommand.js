const parseCommand = function(userConfig) {
    let splitStringCommand = userConfig.split(" ");
    let command = splitStringCommand[0];
    let args = splitStringCommand.slice(1);

    return {
        command: command,
        args: args
    }
}

module.exports = parseCommand;