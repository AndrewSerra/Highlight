(function() {
  const highlightSelection = window.getSelection().toString();
  console.log(highlightSelection);

  const message = {
    "msg": highlightSelection
  }

  chrome.runtime.sendMessage("oakhfhjfahjedfbakjmoidejpfgamfgl", message, (response) => {
    console.log(response);
  });
  return highlightSelection;
})();
