$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-product]').click(function() {
    // انتقل إلى صفحة المنتج
    window.location = 'product.html';
  });
})