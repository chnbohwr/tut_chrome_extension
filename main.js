$('#checkPage').on('click', ()=>{
  chrome.tabs.executeScript({
    file: './execute.js',
  });
});