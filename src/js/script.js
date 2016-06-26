$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-product]').click(function() {
    // انتقل إلى صفحة المنتج
    window.location = 'product.html';
  });

  $('[data-add-to-cart]').click(function(e) {
    alert('أضيف المُنتج إلى عربة الشراء');
    e.stopPropagation();
  });

  $('.product-option input[type="radio"]').on('change', function() {
    $('.product-option').removeClass('active');
    $(this).parents('.product-option').addClass('active');
  });
})