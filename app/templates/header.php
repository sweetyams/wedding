<!doctype html>
<html class="no-js" lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>&#128112;&#10084;&#129333;</title>
  
  <link rel="icon" type="image/x-icon" href="favicon.ico" />

  <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
  <script>
   WebFontConfig = {
    // typekit: { id: 'mgn0xoq' },
    google: {
      families: ['Inconsolata:400,700']
    }
  };

  (function(d) {
    var wf = d.createElement('script'), s = d.scripts[0];
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.async = true;
    s.parentNode.insertBefore(wf, s);
  })(document);
</script>

<script
src="https://code.jquery.com/jquery-3.2.1.min.js"
integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
crossorigin="anonymous"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.js"></script>


<link rel="stylesheet" href="css/styles.css">

</head>
<body>
  <div class="content-all">
    <div class="column top">
      <a href="/">< Back</a>
      <p class="language"><a href="en.html">French</a></p>

      <div class="header">
        <h1><span>Thank you!</span></h1>
        
      </div>
      
      <h2>Your spot for <span id="count"></span> is reserved</h2>
      <div id="thanks"></div>
      <p><b>Date</b> <span id="reserveDate"></span></p>
      <p>We'll send you an email closer to the date to confirm the time will still work for you.</p>

    </div>
  </div>


  <!--build:js js/main.min.js -->
  <script src="js/lib/autosize.min.js"></script>
  <script src="js/lib/moment.js"></script>
  <script src="js/main.js"></script>
  <!-- endbuild -->

</body>
</html>
