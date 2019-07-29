(function() {
  const highlightColor = "#ffe99ad6";
  const selection = window.getSelection();

  let tag = selection.focusNode.parentNode;
  let text = tag.innerHTML;
  let msg = selection.toString();
  let newText;

  const re = new RegExp("(.+)(" + msg + ")(.+)");
  // console.log(re);
  newText = text.replace(re, `$1<span style="background-color:${highlightColor};border-bottom:1px solid ##ffe99aff;">$2</span>$3`);
  tag.innerHTML = newText;

  // console.log(selection);
  // console.log(tag);
  // console.log(text);
  // console.log(newText);

  const message = {
    msg: msg,
    tag: {
      name: tag.tagName,
      className: tag.className,
      content: tag.innerHTML,
    }
  }

  chrome.runtime.sendMessage("oakhfhjfahjedfbakjmoidejpfgamfgl", message, (response) => {
    console.log(response);
  });
})();
