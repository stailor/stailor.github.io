// COMORBIDITIES

// 1.stickie comorbidities card
$(function() {
    var cpluscard = $('#tmp').find('#como-1');
    var cplussticky = $('#tmp').find('#como-2');
    $(document).on('scroll', function() {
        if( $(this).scrollTop() >= $(cpluscard).position().top - 110 ){
            $(cplussticky).css('display', 'block');
        }
        else {
            $(cplussticky).css('display', 'none');
        }
    });
});

// 2. Launch comorbidities modal on page load
$(function() {
    $('#editComo').modal('show');
});

// 3. Add checked comos to the 'Added Comorbidities' list
$(function() {
    // SHOW "LOOK OUT FOR THIS ICON BOX" IF COMOS CHECKED AND SHOW TREATMENT ALGO BUTTON ON THE MODAL IS CLICKED
    $('.modal#editComo .btn.ticked').click(function(event) {
        // Look Out for Como icon
        $('#lookOutPopUp').addClass("checked");
        $('#lookOutPopUp').removeClass("unchecked");
        // Primary Options boxes
        $('.non-como-content').addClass("hide");
        $('.non-como-content').removeClass("show");
        $('.como-content').addClass("show");
        $('.como-content').removeClass("hide");
        // Toggle Switch
        $('.como-toggle-on-off').addClass("show");
        $('.como-toggle-on-off').removeClass("hide");        
    });
    // HIDE "LOOK OUT FOR THIS ICON BOX" IF COMOS UNCHECKED AND CLOSE BUTTON IS CLICKED    
    $('.modal#editComo .btn.btn-secondary.showalg.not-ticked').click(function(event) {
        // Look Out for Como icon
        $('#lookOutPopUp').addClass("unchecked");
        $('#lookOutPopUp').removeClass("checked");
        // Primary Options boxes
        $('.non-como-content').addClass("show");
        $('.non-como-content').removeClass("hide");
        $('.como-content').addClass("hide");
        $('.como-content').removeClass("show");
        // Toggle Switch
        $('.como-toggle-on-off').addClass("hide");
        $('.como-toggle-on-off').removeClass("show");
    });
    $('.close-look-out').click(function(event) {
        $('#lookOutPopUp').addClass("unchecked");
        $('#lookOutPopUp').removeClass("checked");
    });
});

// 4. Show / Hide como content if como checked
$(function() {     
    
    // Add / remove selected values to / from the 'Add comorbidities' panel
    $("input[name='comorbidity']").change(function() {
        
        var value = $(this).val();
        $list = $("#comoselected-1, #comoselected-2");
        var comochooser = $(this).attr('id');
        var comovalue = $(this).attr('value');
        
        if (this.checked) {        
            // Add selected comos to the comorbidities list
            $list.append("<span class='" + comochooser +"' data-value='" + value + "'>" + value + "</span>");                
            // If section has the .-como-content, find the txtwrap class and add the c+ icon and como title
            $('section.panel-group').has('.' + comochooser + '-como-content').find('.title-02').removeClass('no-icon');
            // If como ticked, find como div with same name and insert the como name into the poce_title element
            $('.' + comochooser + '-como-content').find('.poce_title').append('<span class="' + comochooser + '-title">' + comovalue + '</span>');
            // Add comma in if there is more than one como listed in the como content title
            $(".poce_title span").not(":last-child").append(" ");
            // If comorbidities list has content, show the edit button
            $('#editComolist-1, #editComolist-2').show();
        }
        else {
            // Remove from the comorbidities list
            $list.find('span[data-value="' + value + '"]').fadeOut("fast", function() {
                $(this).remove();
            });
            // If section doesn't have the -como-content, find the txtwrap class and remove the c+ icon 
            $('section.panel-group').has('.' + comochooser + '-como-content').find('.title-02').addClass('no-icon');
            // when you uncheck a checkbox find all titles in como content and remove them       
            $('.' + comochooser + '-como-content').find('.poce_title').find('span.' + comochooser + '-title').remove();
            // If comorbidities list hasn't got any content, hide the edit button
            $('#editComolist-1, #editComolist-2').hide();
        }
    });

    // On click of the modal close button
    $('.showalg').click(function () {

        // arr4 = holds the ids of all checkboxes
        // idvar = stores current checkboxes id plus . -como-content added, find this class and remove .show-como
        // loop through all the checkbox id's adding prefix around it the search for that class in the doc and remove show-como class

        arr4 = $(".list-group-item input[id]");
        
        for(i = 0 ; i < arr4.length; i++ ) {
            idvar =  '.' + arr4[i].id + '-como-content';
            $(idvar).removeClass('show-como');
        }

        for(i = 0 ; i < arr4.length; i++ ) {
            idvar = arr4[i].id
            // console.log("box no:" + (i +1 ) + $("input[id='" + idvar + "']").is(":checked"));
            var comoId = '.'+ idvar + '-como-content';

            if( $("input[id='" + idvar + "']").is(":checked") )
            {
                $(comoId).addClass('show-como');
            }
        }
        // console.log($(".list-group-item input[id]"));   
    });
});

// 5. Modal button behaviour on change
$(function() {
  var comorbidities = $("input[name='comorbidity']");
  comorbidities.on('change', function () {

    // Change como logo on the page if a como is checked
    $('.add-como-icon-and-text').toggleClass("checked", comorbidities.is(":checked"));
    // Change como copy from add to added when checkboxes un/checked
    $('.add-como-icon-and-text .add').toggleClass("unchecked", comorbidities.is(":checked"));
    $('.add-como-icon-and-text .added').toggleClass("checked", comorbidities.is(":checked"));    
    $('li.list-group-item').removeClass("selected", comorbidities.is(":checked"));
    // If no Comos checked, hide EDIT button
    $('#comoselected-1 button').toggleClass("show", comorbidities.is(":checked"));
    $('#comoselected-1 button').removeClass("hide", comorbidities.is(":checked"));
    // Checked button Copy on modal if comos un/checked
    $('button.showalg.ticked').toggleClass("show", comorbidities.is(":checked"));
    $('button.showalg.not-ticked').toggleClass("hide", comorbidities.is(":checked"));
    $(this).closest('li.list-group-item ').toggleClass("selected", comorbidities.is(":checked"));

    // WARNING BOX FOR ASTHMA & COPD
    $(function() {
        // IF JUST ASTHMA DONT SHOW, IF ASTHMA + COPD OR JUST COPD SHOW    
        var copd = $("input[id='COPD']");
        var asthma = $("input[id='Asthma']");
        if ($(copd).prop("checked") === true) {
            $('.COPD-como-content.Asthma-como-content').show();
        } 
        else {
            $('.COPD-como-content.Asthma-como-content').hide();
        }
        // IF BOTH ARE CHECKED DISABLE ASTHMA
        if (($(copd).prop("checked") === true) && ($(asthma).prop("checked") === true)) {
            $('.warning-asthma').show();
            // $('#editComo .modal-body .list-group-item.selected label[for="Asthma"] span.custom-control-indicator').addClass('disable-checkbox');
            // $('#editComo .modal-body .list-group-item.selected label[for="Asthma"] span.custom-control-description').css('text-decoration','line-through');
            $('#editComo input#Asthma').prop("disabled", true);
            $('#editComo input#Asthma').parent().css('cursor','not-allowed');
        } 
        // IF JUST ASTHMA IS CHECKED UNDISABLE COPD 
        if (($(copd).prop("checked") === false) && ($(asthma).prop("checked") === true)) {
            $('.warning-asthma').hide();
            $('#editComo input#Asthma').prop("disabled", false);
            $('#editComo  input#Asthma').parent().css('cursor','pointer');
        }
        // IF JUST COPD IS CHECKED UNDISABLE ASTHMA
        if (($(copd).prop("checked") === true) && ($(asthma).prop("checked") === false)) {
            $('.warning-asthma').hide();
            $('#editComo input#Asthma').attr("disabled", false);
            $('#editComo input#Asthma').parent().css('cursor','pointer');
        }
        // IF BOTH ARE UNCHECKED UNDISABLE BOTH
        if (($(copd).prop("checked") === false) && ($(asthma).prop("checked") === false)) {
            $('.warning-asthma').hide();
            $('#editComo input#Asthma').attr("disabled", false);
            $('#editComo input#Asthma').parent().css('cursor','pointer');
        }
    });
  });
  // Grab the topic title from the H1 tag and drop it into the modal para
  $('#editComo').find('p span').append($('#topicMenuTop h1').html());
});

// 7. Primary options box - on click drug title 1 > show content 2, on click drug title 2 > show drug content 1
$(function() {
    $('.drug-title2').click(function(event) {
        event.preventDefault();
        $('.drug-content1').fadeIn(500);
        $('.drug-content2').hide();
    });
    $('.drug-title1').click(function(event) {
        event.preventDefault();
        $('.drug-content2').fadeIn(500);
        $('.drug-content1').hide();
    });
});

// 8. If the drop down contains a cor-mob content, show the icon in the title
$(function() {
    if ($('.poce_contents .panel-group').find('poce_drug_msg').lenghth !==0) {
        $(this).addClass('cor-mob-icon');
    };
});

// 9. Drug hyperlink show/hide drug content 
$(function() {
    $('#como_link_1').click(function(event) {
        event.preventDefault();
        $(this).html('&#9664; Back to drug doses with added comorbidities');
        if ($('#no_cplus_drug_msg').is(':visible')){
            $(this).html('&#9654; Show drug doses for a patient with no comorbidities');
            $('#no_cplus_drug_msg').hide();
            $('#cplus_drug_msg').show();
            $('#drug_info_cplus').show();
            $('#drug_info_no_cplus').hide();
        } else {
            $(this).html('&#9664; Back to drug doses with added comorbidities');
            $('#no_cplus_drug_msg').show();
            $('#cplus_drug_msg').hide();
            $('#drug_info_cplus').hide();
            $('#drug_info_no_cplus').show();
        }
        return false;
    });

});

// 10. Drop down arrows up and down on evidence accordion
$(function () {
    // $('.evidence-accordion .title h3').prepend('<span class=\"material-icons\">&#xE5CF;</span>');
    $('.evidence-accordion .title').on('click', function () {
        var $icon = $(this).find('.material-icons');
        if ($icon.hasClass('open')) {
            $icon.html('&#xE5CF;');
        } else {
            $icon.html('&#xE5CE;');
        }
        $icon.toggleClass('open');
    });
});

// 11. Toggle on/off button - show/hide all como content
$(function () {    
    $('.como-toggle-on-off .toggle').on('click', function () {
        if ($('.toggle').hasClass('btn-primary')) {
 
            $('#comoselected-1 button').fadeOut(); 
            $('.treatment-table .panel-group[class*="-como-content"].show-como, .treatment-table .panel-group div[class*="-como-content"].show-como').addClass('temp-hide');            
            $('.temp-hide').fadeOut(); 
            $('section.panel-group .title-02 > span.material-icons').fadeOut();           
        }
        if ($('.toggle').hasClass('off')) {
 
            $('.temp-hide').fadeIn();
            $('.treatment-table .panel-group[class*="-como-content"].show-como, .treatment-table .panel-group div[class*="-como-content"].show-como').removeClass('temp-hide'); 
            $('section.panel-group .title-02 > span.material-icons').fadeIn();
            $('#comoselected-1 button').fadeIn();
        }
    });

    // SYNCHRONISING THE TWO TOGGLES TO BE ON / OFF TOGETHER
    $('#StaticToggle').on('click', function () {
        if ($('#StaticToggle .toggle').hasClass('btn-primary')) { // if static is
            $('#StickyToggle .toggle').removeClass('btn-primary');
            $('#StickyToggle .toggle').addClass('btn-default');
            $('#StickyToggle .toggle').addClass('off');           
        }
        if ($('#StaticToggle .toggle').hasClass('off')) { // if static is off
            $('#StickyToggle .toggle').removeClass('off');
            $('#StickyToggle .toggle').removeClass('btn-default');
            $('#StickyToggle .toggle').addClass('btn-primary');
        }
    });
    $('#StickyToggle').on('click', function () {
        if ($('#StickyToggle .toggle').hasClass('btn-primary')) { //if sticky is on
            $('#StaticToggle .toggle').addClass('btn-default');
            $('#StaticToggle .toggle').addClass('off');
            $('#StaticToggle .toggle').removeClass('btn-primary');             
        }
        if ($('#StickyToggle .toggle').hasClass('off')) { // if sticky is off
            $('#StaticToggle .toggle').removeClass('btn-default');
            $('#StaticToggle .toggle').removeClass('off');
            $('#StaticToggle .toggle').addClass('btn-primary');
        }
    });
});

// 12. POCE Evidence Accordion (nested)
$(function () {
    var acc = document.getElementsByClassName("evidence-accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.closest(".option .content");
        if (panel.style.display === "block") {
        panel.style.display = "none";
        } else {
        panel.style.display = "block";
        }
    });
    }
});

// 13. Close button on asthma warning
$(function () {
    $(".close-warning").click(function(){
        $(".warning-asthma").hide();
    });
});