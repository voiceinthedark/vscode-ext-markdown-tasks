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
	console.log('Congratulations, your extension "markdown-task-calculator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('markdown-task-calculator.calculateTasks', function () {
		// The code you place here will be executed every time your command is executed

		let totalTaskCount;
		let finishedTaskCount;

		// get the current document
		const document = vscode.window.activeTextEditor.document;
		// get all the lines in the current document
		const lines = document.getText().split('\n');
		console.log(lines.length);
		// loop over the lines array and filter the lines that starts with - [ ] or - [x]
		totalTaskCount = lines.filter((line) => {
			return line.trim().startsWith('- [ ]') || line.trim().startsWith('- [x]');
		}).length;

		finishedTaskCount = lines.filter((line) => {
			return line.trim().startsWith('- [x]');
		}).length;

		// Display a message box to the user
		vscode.window.showInformationMessage(`Total Task Count: ${totalTaskCount} Finished Task Count: ${finishedTaskCount}`);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
