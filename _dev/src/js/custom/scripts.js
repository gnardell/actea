//============================================================
//    IE Viewport
//============================================================
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style')
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )
  )
  document.querySelector('head').appendChild(msViewportStyle)
}



jQuery(document).ready(function ($) {

  var checkSize = function () {
    if ($('html').css('font-size') == "21px") {
      return true;
    }
  }

  //============================================================
  //    Main Navigation
  //============================================================

  function toggleNavigation() {
    if (checkSize()) {
      $('ul.main-nav').attr('aria-hidden', false).removeAttr('aria-labelledby');
      $('#menu-button').attr('aria-hidden', true).removeAttr('aria-expanded');
    }

    if (!checkSize()) {
      $('ul.main-nav').attr('aria-hidden', true).attr('aria-labelledby', 'menu-button');
      $('#menu-button').attr('aria-hidden', false).attr('aria-expanded', false);
    }
  }


  $('#menu-button').on('click', function () {
    if (!checkSize()) {
      $('.main-navigation').toggleClass('is-z-index');
      $('ul.main-nav').toggleClass('is-toggled-on');
      $('ul.main-nav li').toggleClass('is-visible');
      $(this).toggleClass('is-toggled');
      var state = $(this).attr('aria-expanded') === 'false' ? true : false;
      $(this).attr('aria-expanded', state);
      $('ul.main-nav').attr('aria-hidden', !state);
    }
  })

  // At end of navigation block, return focus to navigation menu button
  $('ul.main-nav li:last-child a').on('keydown', function (e) {
    if (!checkSize()) {
      if (e.keyCode === 9) {
        if (!e.shiftKey) {
          e.preventDefault();
          $('#menu-button').focus();
        }
      }
    }
  });

  // At start of navigation block, refocus close button on SHIFT+TAB
  $('ul.main-nav li:first-child a').on('keydown', function (e) {
    if (!checkSize()) {
      if (e.keyCode === 9) {
        if (e.shiftKey) {
          e.preventDefault();
          $('#menu-button').focus();
        }
      }
    }
  });

  // If the menu is visible, always TAB into it from the menu button
  $('button[aria-expanded]').on('keydown', function (e) {
    if (!checkSize()) {
      if (e.keyCode === 9) {
        if ($(this).attr('aria-expanded') == 'true') {
          if (!e.shiftKey) {
            e.preventDefault();
            $('ul.main-nav li:first-child a').focus();
          } else {
            if (e.shiftKey) {
              e.preventDefault();
              $('#main').focus();
            }
          }
        }
      }
    }
  });


  toggleNavigation();


  $(window).on('resize', toggleNavigation);





  //============================================================
  //    TABS, ACCORDION AND TOGGLES
  //============================================================

  // TABS

  $('.tab-link').css('display', 'inline-block');
  $('.tab-content').css('display', 'none');
  $('.tabs').each(function (index) {
    $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
  });
  $('.tabs').on('click', 'li > a.tab-link', function (event) {
    if (!$(this).hasClass('is-active')) {
      event.preventDefault();
      var accordionTabs = $(this).closest('.tabs');
      accordionTabs.find('.is-open').removeClass('is-open').hide();

      $(this).next().toggleClass('is-open').toggle();
      accordionTabs.find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
    } else {
      event.preventDefault();
    }
  });


  //ACCORDION

  $('.submenu').css('display', 'none');
  $('.js-accordion-trigger').on('click', function (e) {
    var liItem = $(this).parent();
    liItem.find('.submenu').slideToggle('slow');
    // apply the toggle to the ul
    liItem.toggleClass('is-expanded');
    if (!liItem.hasClass('is-expanded')) {
      $(this).blur();
    }
    e.preventDefault();
  });


  //TOGGLES

  $('.submenu').css('display', 'none');
  $('.js-toggle-trigger').on('click', function (e) {
    if (!$(this).parent().hasClass('is-expanded')) {
      $('.toggle-link.is-expanded').toggleClass('is-expanded').children('.submenu').slideToggle('slow');
    }
    var liItem = $(this).parent();
    liItem.find('.submenu').slideToggle('slow');
    // apply the toggle to the ul
    liItem.toggleClass('is-expanded');
    if (!liItem.hasClass('is-expanded')) {
      $(this).blur();
    }
    e.preventDefault();
  });


  //============================================================
  //    FORMS ELEMENT
  //============================================================

  //INPUT FILE

  $('.input-file').on('change', function () {
    var fileDir = $('.input-file').val().split('\\');
    var fileName = fileDir[fileDir.length - 1];
    $('#input-file-name').text(fileName);
  });
  $('button[type="reset"]').click(function () {
    $('#input-file-name').text('');
  });
});

//============================================================
//    Search inizialized
//============================================================

SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  searchResultTemplate: '<li><a href="{url}">{title}</a></li>',
  noResultsText: 'Nessun risultato trovato.',
  json: '/search.json'
})

$('#search-input').on('keyup', function () {
  if ($('#search-input').val()) {
    if ($('#results-container').has('li').length >= 0) {
      $('#results-container').css("display", "block");
      $('#results-container').removeAttr('hidden');
    }
  }
})
