 $(document).ready(function() {

   $('.mobile-wrap').on('click', function() {
     $('.line-burger').toggleClass('line-active');
     $('.main-header__list').slideToggle(200);
   });

    $('.main-header__link').on('click', function() {
      if ($(window).width() <= 768) {
       $('.line-burger').removeClass('line-active');
        $('.main-header__list').slideUp(200);
      }
    })

   $(window).resize(function() {
     if ($(document).width() > 780) {
       $('.main-header__list').attr('style', '');
       $('.line-burger').removeClass('line-active');
     }
   })

   $(document).on('click', '.main-header__link', function() {
     let target = $(this).attr('href');
     let pos = target.indexOf('#');
     if (pos !== -1) {
       target = target.substring(pos)
     }
     let coordsScroll = $(target).offset().top
     $('html, body').animate({
       scrollTop: coordsScroll
     }, 800);
     return false;
   })

   $(document).on('click', '.btn--header, .about .btn--inner', function() {
     $('html, body').animate({
       scrollTop: $('.contacts .title').offset().top
     }, 800);
   })

   function validate(input, length, regExp, error, phone) {

     $(input).on('blur keyup', function() {
       var value = $(this).val();
       var that = $(this);

       regExp = regExp == '' ? /./ : regExp;

       if (phone === true) {
         bool_reg = !regExp.test(value);
       } else {
         bool_reg = regExp.test(value);
       }

       if (value.length > length && value !== '' && bool_reg) {
         that.removeClass('form-fail').addClass('form-done');
         $(error).slideUp();
       } else {
         that.removeClass('form-done').addClass('form-fail');
         $(error).slideDown();
       }
     });

   }

   // деакцивация кнопки если есть поле с ошибкой

   function disBtn(input, btn, bool) {
     var input = $(input);
     input.on('blur keyup', function() {

       if (input.hasClass('form-fail') || bool == true) {
         $(btn).attr('disabled', 'disabled');
       } else {
         $(btn).removeAttr('disabled');
       }

     });

   }

   // для проверки при нажатии

   function valClick(input, length, regExp, error, phone) {
     var value = $(input).val();

     regExp = regExp == '' ? /./ : regExp;

     if (phone === true) {
       bool_reg = regExp.test(value);
     } else {
       bool_reg = !regExp.test(value);
     }

     if (value.length < length || value === '' || bool_reg) {
       $(input).addClass('form-fail');
       $(error).slideDown();
     }
   }

   //  деакцивация кнопки при нажатии

   function disBtnClick(input, btn) {
     var input = $(input);

     if (input.hasClass('form-fail')) {
       $(btn).attr('disabled', 'disabled');
       return false;
     } else {
       return true;
     }

   }

   $('input[type="tel"]').mask("+38 (999) 999-99-99");

   var regName = /^[a-zA-Zа-яА-ЯёЁIi]+/;
   var regEmail = /[-.\w]+@[-.\w]+\.[-.\w]+/i;
   var regPhone = /[_]/i;

   $('#c_btn').on('click', function() {
     sendForm();
   });

   function sendForm() {
     var name = $('#c_fio').val();
     var phone = $('#c_tel').val();
     var email = $('#c_email').val();
     var msg = $('#c_msg').val();

     validate('#c_fio', 1, regName, '.contacts__error--fio');
     validate('#c_email', 1, regEmail, '.contacts__error--email');
     validate('#c_tel', 1, regPhone, '.contacts__error--tel', true);
     disBtn('#c_fio, #c_tel, #c_email', '#c_btn');

     valClick('#c_fio', 1, regName, '.contacts__error--fio');
     valClick('#c_email', 1, regEmail, '.contacts__error--email');
     valClick('#c_tel', 1, regPhone, '.contacts__error--tel', true);
     var btn_bool = disBtnClick('#c_fio, #c_tel, #c_email', '#c_btn');

     if (btn_bool) {
       $.ajax({
         url: myajax.url,
         type: 'POST',
         data: {
           action: 'contact',
           name: name,
           phone: phone,
           email: email,
           msg: msg,
         },
       }).done(function(data) {
         $('#c_fio, #c_tel, #c_email, #c_msg').val('').removeClass('form-done');
         var text = 'Ваше повідомлення відправлене!';

         $('.msg-modal').html(text).addClass('msg-modal-active');
         setTimeout(function() {
           $('.msg-modal').removeClass('msg-modal-active');
         }, 2500);
       });

     }

     return false;
   }

   validate('#c_fio', 1, regName, '.contacts__error--name');
   validate('#c_email', 1, regEmail, '.contacts__error--email');
   validate('#c_tel', 1, regPhone, '.contacts__error--tel', true);
   disBtn('#c_fio, #c_tel, #c_email', '#c_btn');


 })
