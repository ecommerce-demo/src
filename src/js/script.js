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

  $('.product-option input[type="radio"]').change(function() {
    $(this).parents('.product-option').siblings().removeClass('active');
    $(this).parents('.product-option').addClass('active');
  });

  $('[data-remove-from-cart]').click(function() {
    $(this).parents('[data-product-info]').remove();
  });

  // عندما تتغير كمية المنتج
  $('[data-product-quantity]').change(function() {
    // اجلب الكمية الجديدة
    var newQuantity = $(this).val();

    // ابحث عن السّطر الّذي يحتوي معلومات هذا المُنتج
    var $parent = $(this).parents('[data-product-info]');
   
   // اجلب سعر القطعة الواحدة من معلومات المنتج
    var pricePerUnit = $parent.attr('data-product-price');

    // السعر الإجمالي للمنتج هو سعر القطعة مضروبًا بعددها
    var totalPriceForProduct = newQuantity * pricePerUnit;

    // عين السعر الجديد ضمن خليّة السّعر الإجمالي للمنتج في هذا السطر
    $parent.find('.total-price-for-product').text(totalPriceForProduct + '$');
  });
})