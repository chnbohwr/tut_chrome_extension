let extensionLineTags = 0;
let extensionLineKeyword = '';
let extensionLineIndexMap = {};
let extensionLineComments = [];

const filterComment = (comments) => {
  const filtedComment = comments.filter((item) => {
    const tags = item.querySelectorAll('a[classname="_tl_profile_nickname"]');
    console.log(extensionLineTags)
    if (tags.length < extensionLineTags) {
      return false;
    }
    const keywordIndex = item.querySelector('.comment').textContent.indexOf(extensionLineKeyword);
    if (keywordIndex === -1) {
      return false;
    }
    return true;
  });

  const filtedMap = filtedComment.reduce((acc, item) => {
    const userLink = item.querySelector('.nickname a').getAttribute('href');
    if (!acc[userLink]) {
      acc[userLink] = item;
    }
    return acc;
  }, {});

  return Object.keys(filtedMap).map(key => filtedMap[key]);
};

const clickEvent = () => {
  if (!extensionLineComments.length) {
    extensionLineComments = filterComment(Array.from(document.querySelector('.comment_list').children));
    extensionLineIndexMap = {};
  }

  if (Object.keys(extensionLineIndexMap).length === extensionLineComments.length) {
    alert('沒有可以抽選的對象');
  } else {
    let randomIndex = 0;
    do {
      randomIndex = Math.floor(Math.random() * extensionLineComments.length);
    } while (extensionLineIndexMap[randomIndex] === true)
    extensionLineIndexMap[randomIndex] = true;
    const comment = extensionLineComments[randomIndex];
    comment.style.background = 'yellow';
    comment.scrollIntoView();
    window.scrollTo(0, window.scrollY - 200);
  }
};

const setTags = (value) => {
  console.log('set tag', value);
  extensionLineTags = value;
};

const setKeyword = (value) => {
  extensionLineKeyword = value;
};

const reset = () => {
  extensionLineIndexMap = {};
  extensionLineComments = [];
  Array
    .from(document.querySelector('.comment_list').children)
    .forEach((item) => { item.style.background = 'none'; });
};

const onMessage = (message, sender, response) => {
  switch (message.action) {
    case 'CLICK':
      clickEvent();
      break;
    case 'RESET':
      reset();
      break;
    case 'SET_TAGS':
      setTags(message.value);
      break;
    case 'SET_KEYWORD':
      setKeyword(message.value);
      break;
    default:
      break;
  }
}

const clickMore = () => {
  const button = document.querySelector('.article_comment a[href="#more"]');
  if(button){
    button.click();
    setTimeout(clickMore, 200);
  }
};

clickMore();

chrome.runtime.onMessage.addListener(onMessage);

