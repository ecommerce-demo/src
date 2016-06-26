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
    // أعد حساب السعر الإجمالي بعد حذف أحد المُنتجات
    calculateTotalPrice();
  });

  function calculateTotalPrice() {
    // أنشئ متغيّرًا جديدًا لحفظ السعر الإجمالي
    var totalPriceForAllProducts = 0;

    // لكل سطر يمثل معلومات المُنتج في الصّفحة
    $('[data-product-info]').each(function() {
      // اجلب سعر القطعة الواحدة من الخاصّة الموافقة
      var pricePerUnit = $(this).attr('data-product-price');

      // اجلب كمية المنتج من حقل اختيار الكمية
      var quantity = $(this).find('[data-product-quantity]').val();

      var totalPriceForProduct = pricePerUnit * quantity;

      // أضف السعر الإجمالي لهذا المنتج إلى السعر الإجمالي لكل المُنتجات، واحفظ القيمة في المتغير نفسه
      totalPriceForAllProducts = totalPriceForAllProducts + (totalPriceForProduct);
    });

    // حدث السعر الإجمالي لكل المُنتجات في الصفحة
    $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');

    // إذا كان السّعر الإجمالي مساويًا للصفر
    if (totalPriceForAllProducts === 0) {
      // امنع إرسال النّموذج بتعطيل زرّ إرساله
      $('#form-checkout button[type="submit"]').prop('disabled', true);
    }
  }

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

    // حدث السعر الإجمالي لكل المُنتجات
    calculateTotalPrice();
  });
})