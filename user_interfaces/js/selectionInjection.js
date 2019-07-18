(function() {
  const selection = window.getSelection();
  console.log(selection);
  console.log(selection.focusNode.parentNode)

  const message = {
    "msg": selection.toString(),
  }

  chrome.runtime.sendMessage("oakhfhjfahjedfbakjmoidejpfgamfgl", message, (response) => {
    console.log(response);
  });
  return highlightSelection;
})();
