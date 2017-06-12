<?php

// configure
$from = 'cryptocoderz@gmail.com';
$sendTo = 'cryptocoderz@gmail.com';
$subject = 'Website inquery';
$fields = array('name' => 'Name', 'email' => 'Email', 'message' => 'Message'); // array variable name => Text to appear in email
$okMessage = '<html lang="en">
<head>

<!-- page title -->
<title>CryptoCoderz - Message Sent</title>
<!-- theme css --> 
<link href="http://cryptocoderz.com/assets/css/structure.css" rel="stylesheet" type="text/css" />
<link href="http://cryptocoderz.com/assets/css/style.css" rel="stylesheet" type="text/css" />
<link href="http://cryptocoderz.com/assets/css/responsive.css" rel="stylesheet" type="text/css" />
<link rel="shortcut icon" type="image" href="assets/img/cryptocoderz_logo_gearchain_only.ico">
<!-- author -->
<meta name="author" content="Cryptocoderz">
<!-- responsive meta tag -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta charset="UTF-8">

</head>

<body>

<!-- header -->
<header>

  <div class="header-main header-fixed">
    <div class="container clearfix">
    
      <div class="medium-header-container">
        <a href="http://cryptocoderz.com/index.html" id="site-logo"></a>
        <div id="mobile-nav-button" class="hidden-desk hidden-tab">
          <div id="mobile-nav-icon">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    
      <!-- header nav menu -->
      <nav id="header-nav">
      
        <ul id="nav-ul" class="menu font-reg clearfix">
          <li class="menu-item"><a href="http://cryptocoderz.com/index.html#home">home</a></li>
          
          <li class="menu-item menu-item-has-children">
            <a class="nav-link">Blockchains<span class="sub-drop-icon fa fa-angle-down"></span></a>
            <ul class="sub-menu sub-menu-first">

              <li><a href="http://cryptocoderz.com/020london.html">020London</a></li>

              <li><a href="http://cryptocoderz.com/binary.html">Binary</a></li>

              <li><a href="http://cryptocoderz.com/hiro.html">Hiro</a></li>

              <li><a href="http://cryptocoderz.com/gram.html">Gram</a></li>

              <li><a href="http://cryptocoderz.com/espers.html">Espers</a></li>
              
            </ul>
          </li>
          
          <li class="menu-item"><a href="http://cryptocoderz.com/index.html#about">about</a></li>
          <li class="menu-item"><a href="http://cryptocoderz.com/index.html#services">services</a></li>
          <li class="menu-item"><a href="http://cryptocoderz.com/index.html#portfolio">projects</a></li>
          <li class="menu-item"><a href="http://cryptocoderz.com/index.html#info">info</a></li>
          <li class="menu-item"><a href="http://cryptocoderz.com/index.html#testimonials">news</a></li>
          <li class="menu-item"><a href="http://cryptocoderz.com/index.html#contact">contact</a></li>
        </ul>
      
      </nav>
  
    </div>
  </div>
  
</header>


<div id="main-content">
  
  <!-- page head section -->
  <section class="page-header" style="background-image:url("http://cryptocoderz.com/assets/img/testimonial_bk.jpg");">
    <div class="page-head-inside">
      <div class="container">
        <h1 class="font-reg">Message Successfully Sent</h1>
        <p class="font-reg">Thank you for taking your time to send us a message!</p>
      </div>
    </div>
  </section>
  
  
  <!-- page top content -->
  <section class="top-main-content not-found-content">
    <div class="container">
    
      <div class="section-title">
        <h2 class="font-reg">Thank you</h2>
        <p class="font-reg">We generally respond to emails within 24 hours.</p>
      </div>
    
      <a href="http://cryptocoderz.com/index.html" class="primary-button font-reg hov-bk">Return to home</a>

    </div>
  </section>

</div>


<!-- footer -->
<footer>

<!-- footer -->
<footer>
  <!-- footer bottom secion -->
  <div id="footer-bottom">
    <div class="container">
    
      <!-- footer social icons -->
      <div id="footer-social-icons" class="clearfix">
        <a href="https://www.facebook.com/CryptoCoderz/" class="social-item hov-bk" target="_blank"><span class="fa fa-facebook"></span></a>
        <a href="https://twitter.com/CryptoCoderz" class="social-item hov-bk" target="_blank"><span class="fa fa-twitter"></span></a>
        <a href="https://plus.google.com/115738697538614748094" class="social-item hov-bk" target="_blank"><span class="fa fa-google-plus"></span></a>
        <a href="https://www.youtube.com/channel/UCKhrxPfUwXpssUE_lkGw85w" class="social-item hov-bk" target="_blank"><span class="fa fa-youtube"></span></a>
        
      </div>
      
      <!-- copyright text -->
      <p class="font-reg">© 2015-2016 Cryptocoderz in relation with Catlin Computer Solutions</p>
      
      <!-- scroll to top -->
      <div id="scroll-top">
        <span class="fa fa-angle-up"></span>
      </div>
      
    </div>
  </div>

</footer>


<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script type="text/javascript" src="http://cryptocoderz.com/assets/js/main.js"></script>
<script type="text/javascript" src="http://cryptocoderz.com/assets/js/konami.js"></script>

</body>
</html>';
$errorMessage = 'There was an error while submitting the form. Please try again later';

// let's do the sending
try
{
    $emailText = "You have new message from contact form\n=============================\n";
    foreach ($_POST as $key => $value) {

        if (isset($fields[$key])) {
            $emailText .= "$fields[$key]: $value\n";
        }
    }

    mail($sendTo, $subject, $emailText, "From: " . $from);

    $responseArray = array('type' => 'success', 'message' => $okMessage);
}
catch (\Exception $e)
{
    $responseArray = array('type' => 'danger', 'message' => $errorMessage);
}

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);
    
    header('Content-Type: application/json');
    
    echo $encoded;
}
else {
    echo $responseArray['message'];
}