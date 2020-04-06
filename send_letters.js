  $(document).ready( function () {
    $('form').submit( function () {
      var formdata = $(this).serialize();
      $.ajax({
          type: "POST",
          url: "submit.php",
          data: formdata,
       });
      return false;
    });
  });
