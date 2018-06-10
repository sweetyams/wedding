var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
  sURLVariables = sPageURL.split('&'),
  sParameterName,
  i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

var name = getUrlParameter('name');
var plusone = getUrlParameter('plusone');
var email = getUrlParameter('email');
var vous = getUrlParameter('vous');

console.log(name,plusone,email);

var link = $(".language a").attr('href');

if(name == 'undefined'){
  name = '';
} else {
  name = ' ' + name;
}

if(vous == 'undefined'){

} else if(vous == 1) {
  $('.tu').addClass('hide');
  $('.vous').removeClass('hide');
}

link = link + '?name=' + name;
link = link + '&plusone=' + plusone;
link = link + '&email=' + email;
link = link + '&vous=' + vous;
console.log(link);

$(".language a").attr("href", link)

$('.email_address').val(email);
$('.user_name').val(name);

$(document).ready(function() {

  autosize($('textarea'));

  

  $('input[type=radio][name=coming_to_wedding]').change(function() {

    $('.attention').removeClass('hide');

    if (this.value == 'yes') {
      $('.not_coming').addClass('hide');
      $('.invite_more').removeClass('hide');
      $('.coming').removeClass('hide');
      $('.address').focus();
      $('.address').prop('required',true);

      if(plusone == '1'){
        $('.plusone').removeClass('hide');
        $('.plus_one').prop('required',true);
      }

    }
    else if (this.value == 'no') {
      $('.not_coming').removeClass('hide');
      $('.invite_more').addClass('hide');
      $('.coming').addClass('hide');
      $('.address').prop('required',false);
      $('.plus_one').prop('required',false);

    }
  });

  $('.generate').on('click', function(){
    link = 'http://wahsounewedding.com/'
    lang = $('input[name=language]:checked').val();
    plus_one = $('input[name=plus_one]:checked').val();
    name = $('.name').val();
    email = $('.email').val();

    console.log(lang,plus_one,name,email);
    if(lang == 'EN'){
      link = link + 'invite.html'
    }
    link = link + '?email=' + email + '&name=' + name;
    if(plus_one == 1){
      link = link + '&plusone=' + plus_one
    }
    link = link.replace(/\s/g,"%20");
    $('.generated').html(link);

  });

  // $('.wedding_form').validate();

});

$('.invited_name').html(name);

$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  return results[1] || 0;
}

//DISPLAYING ALL SPOTS ON GETTING THERE
if($("#dates").length) {
  // THE AJAX GETS THE TABLE
  $.ajax({
    url: "https://api.airtable.com/v0/appar52EklTJwqzSl/Rides?view=Main&api_key=keywo8wXp1aauIyJD",
    dataType: 'json',
    success: function(data){
      // FOR EACH RECORD
      $.each(data.records,function(){
        // better date format
        var date = new Date(this.fields.Date);
        dateFormat = moment(date).format('MMMM Do YYYY, h:mm a');
        // For each item, append the link with the date and count
        $("#dates").append('<a href="/date.html?id=' + this.id + '" class="button request">' + dateFormat + '<span>' + this.fields.Left + '</span></a>')
      });
    }
  });
}


//FOR BOAT REQUEST NO TIME
if($('#groupSize').length) {
  count = 6;
  for(var i=0; i < count; i++){
    var num = i + 1
    if(i == 0){
      $('#groupSize').append('<option value="' + num + '">'+ num +' person</option>')
    } else {
      $('#groupSize').append('<option value="' + num + '">'+ num +' people</option>')
    }

  }

  $("form[name='arrival']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      arrivalTime: "required",
      groupSize: "required",
      names: "required",
      email: {
        required: true,
        email: true
      }
    },
    // Specify validation error messages
    messages: {
      arrivalTime: "Please let us know when",
      groupSize: "Please choose the party siz",
      names: "Please let us know who's coming",
      email: "Please enter a valid email address"
    },
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      var count = $('#groupSize').val();
      var email = $('#email').val();
      var people = $('#names').val();
      var time = $('#arrivalTime').val(); 

      $.ajax({
        url: "https://api.airtable.com/v0/appar52EklTJwqzSl/Requests?api_key=keywo8wXp1aauIyJD",
        type : 'POST',
        data : {
          "fields": {
            "Email" : email,
            "Date" : time,
            "Count" : count,
            "People" : people,
            "Type": 'Request'
          }},
          success: function(data){
            console.log(data);
            location.reload();
          }
        });
    }
  });

}


//FORM ON DATE SELECT BOAT
if($("#date").length) {
  var taken = 0;
  var setDate;
  var item = $.urlParam('id');
  $.ajax({
    url: "https://api.airtable.com/v0/appar52EklTJwqzSl/Rides/" + item + "?api_key=keywo8wXp1aauIyJD",
    dataType: 'json',
    success: function(data){
      var date = new Date(data.fields.Date);
      dateString = moment(date).format('MMMM Do YYYY');
      timeString = moment(date).format('h:mm a');
      if(data.fields.Taken){
        var taken = data.fields.Taken;
      }
      setDate = moment(date).format('MMMM Do YYYY h:mm a');;
      $('#date').html(dateString);
      $('#time').html(timeString);
      $('.spotsLeft').html(data.fields.Left);
      count = data.fields.Left;

      for(var i=0; i < count; i++){
        var num = i + 1
        if(i == 0){
          $('.selectCount').append('<option value="' + num + '">'+ num +' person</option>')
        } else {
          $('.selectCount').append('<option value="' + num + '">'+ num +' people</option>')
        }

      }

      // Wait for the DOM to be ready
      // Initialize form validation on the registration form.
      // It has the name attribute "registration"
      $("form[name='request']").validate({
        // Specify validation rules
        rules: {
          // The key name on the left side is the name attribute
          // of an input field. Validation rules are defined
          // on the right side
          selectCount: "required",
          party: "required",
          email: {
            required: true,
            email: true
          }
        },
        // Specify validation error messages
        messages: {
          selectCount: "Please choose the party size",
          party: "Please let us know who's coming",
          email: "Please enter a valid email address"
        },
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {
          var update = $('.selectCount').val();
          var email = $('#email').val();
          var people = $('#party').val();

          if(!update){
            return;
          }

          if(taken == 0 || !taken) {
            var newcount = parseInt(update);
          } else {
           var newcount = parseInt(taken) + parseInt(update);
         }

         $.ajax({
          url: "https://api.airtable.com/v0/appar52EklTJwqzSl/Rides/" + item + "?api_key=keywo8wXp1aauIyJD",
          type : 'PATCH',
          data : {
            "fields": {
              "Taken": parseInt(newcount)
            }},
            success: function(data){
            }
          });

         $.ajax({
          url: "https://api.airtable.com/v0/appar52EklTJwqzSl/Requests?api_key=keywo8wXp1aauIyJD",
          type : 'POST',
          data : {
            "fields": {
              "Email" : email,
              "Date" : setDate,
              "Count" : update,
              "People" : people,
              "Type": 'Boat'
            }},
            success: function(data){
              console.log('return',data);
              // location.reload();
              window.location.href = "/thanks.html?id="+ data.id;
            }
          });
       }
     });

    }
  });


}


if($("#thanks").length) {
  var item = $.urlParam('id');
  $.ajax({
    url: "https://api.airtable.com/v0/appar52EklTJwqzSl/Requests/" + item + "?api_key=keywo8wXp1aauIyJD",
    dataType: 'json',
    success: function(data){
      console.log(data);
      $('#count').html(data.fields.Count);
      $('#reserveDate').html(data.fields.Date);
    }
  })
}







