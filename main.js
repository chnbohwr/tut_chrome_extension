
var getSelectedTab = (tab) => {

  var tabId = tab.id;
  var sendMessage = (messageObj) => {
    chrome.tabs.sendMessage(tabId, messageObj);
  };

  $('#lottery').on('click', () => {
    $('#tags').attr('disabled', true);
    $('#keyword').attr('disabled', true);
    sendMessage({
      action: 'CLICK'
    });
  });

  $('#reset').on('click', () => {
    $('#tags').attr('disabled', false);
    $('#keyword').attr('disabled', false);
    sendMessage({
      action: 'RESET'
    });
  });

  $('#tags').on('change', (e) => {
    sendMessage({
      action: 'SET_TAGS',
      value: e.target.value
    });
  });

  $('#keyword').on('change', (e) => {
    sendMessage({
      action: 'SET_KEYWORD',
      value: e.target.value
    });
  });

  sendMessage({
    action: 'RESET'
  });

}

chrome.tabs.getSelected(null, getSelectedTab);




