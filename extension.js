// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {  
  
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

        if(totalTaskCount > 0){
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
          // update the status bar
          vscode.window.setStatusBarMessage(
            `Total Task Count: ${totalTaskCount} Finished Task Count: ${finishedTaskCount}`
          );
        } else {
          vscode.window.showInformationMessage(
            'There are no tasks to calculate'
          );
        }
        
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
