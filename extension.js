// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "markdown-task-calculator" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'markdown-task-calculator.calculateTasks',
    function () {
      let totalTaskCount;
      let finishedTaskCount;

      let editor = vscode.window.activeTextEditor;

      if (editor) {
        // get the current document
        const document = editor.document;
        const selection = editor.selection;
        // get all the lines in the current document
        const lines = document.getText().split('\n');
        console.log(lines.length);
        // loop over the lines array and filter the lines that starts with - [ ] or - [x]
        totalTaskCount = lines.filter((line) => {
          return (
            line.trim().startsWith('- [ ]') || line.trim().startsWith('- [x]')
          );
        }).length;

        finishedTaskCount = lines.filter((line) => {
          return line.trim().startsWith('- [x]');
        }).length;

        // display the result at current position
        editor.edit((editBuilder) => {
          editBuilder.insert(
            selection.active,
            '\n**Total Task Count:** ' +
              totalTaskCount +
              '\n**Finished Task Count:** ' +
              finishedTaskCount +
              '\n**Completion Percentage:** ' +
              ((finishedTaskCount / totalTaskCount) * 100).toFixed(2) +
              '%'
          );
        });

        // Display a message box to the user
        vscode.window.showInformationMessage(
          `Total Task Count: ${totalTaskCount} Finished Task Count: ${finishedTaskCount}`
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
