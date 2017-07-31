if (!extensionLineComments) {
  var extensionLineComments = Array.from(document.querySelector('.comment_list').children);
  extensionLineComments = extensionLineComments.filter((item, index) => {
    var userLink = item.querySelector('.nickname a').getAttribute('href');
    return extensionLineComments.findIndex((item2) => {
      return userLink === item2.querySelector('.nickname a').getAttribute('href');
    }) === index;
  });
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