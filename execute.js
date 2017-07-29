if (!extensionLineComments) {
  var extensionLineComments = document.querySelector('.comment_list').children;
  var extensionLineIndexMap = {};
}
if (Object.keys(extensionLineIndexMap).length === extensionLineComments.length) {
  alert('沒有可以抽選的對象');
} else {
  do {
    var randomIndex = Math.floor(Math.random() * extensionLineComments.length);
  } while (extensionLineIndexMap[randomIndex] === true)
  extensionLineIndexMap[randomIndex] = true;
  var comment = extensionLineComments[randomIndex];
  comment.style.background = 'yellow';
  comment.scrollIntoView();
  window.scrollTo(0, window.scrollY - 200);
}