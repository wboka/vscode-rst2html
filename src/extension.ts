"use strict";

import { commands, ExtensionContext, ViewColumn, window } from "vscode";

const rst2html = require("rst2html");

export function activate(context: ExtensionContext) {
  let disposable = commands.registerCommand("extension.convertrST2html", () => {
    const editor = window.activeTextEditor;

    if (editor) {
      if (!/restructuredtext/i.test(editor.document.languageId)) {
        window.showWarningMessage(`No reStructuredText file active. This is a "${editor.document.languageId}" file.`);

        return;
      }
    } else {
      window.showWarningMessage("No reStructuredText file active");

      return;
    }

    const content = editor.document.getText();
    const panel = window.createWebviewPanel(
      "rst2htmlPreview",
      `[Preview] ${editor.document.fileName}`,
      ViewColumn.One,
      {}
    );

    panel.webview.html = rst2html(content);
  });

  context.subscriptions.push(disposable);
}
