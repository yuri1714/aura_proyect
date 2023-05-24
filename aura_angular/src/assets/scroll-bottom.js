window.addEventListener('DOMContentLoaded', function () {
    var scrollContainer = document.getElementById('scrollContainer');
    if(scrollContainer){
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
      scrollContainer.addEventListener('DOMSubtreeModified', function () {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      });
    }
    
});