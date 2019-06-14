// Comorbidities 
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

// 2. Launch select comorbidities modal on page load
$(function() {
    $('#editComo').modal('show');
});

// 3. Add checked comos to the 'Added Comorbidities' list
$(function() {
  
    // Enable/disable 'Show Treatment Algorithm' button
    // var comorbidities = $('#tmp.treatment-table').find("input[name='comorbidity']");
    // comorbidities.on('change', function () {
    //     $('#showalg').toggleClass("btn-secondary", comorbidities.is(":checked"));
    // });

    // SHOW "LOOK OUT FOR THIS ICON BOX" IF COMOS CHECKED AND SHOW TREATMENT ALGO BUTTON IS CLICKED
    $('.modal#editComo .btn.ticked').click(function(event) {
        $('#lookOutPopUp').addClass("checked");
        $('#lookOutPopUp').removeClass("unchecked");
        $('.non-como-content').addClass("hide");
        $('.non-como-content').removeClass("show");
        $('.como-content').addClass("show");
        $('.como-content').removeClass("hide");
        
    });
    // HIDE "LOOK OUT FOR THIS ICON BOX" IF COMOS UNCHECKED AND CLOSE BUTTON IS CLICKED    
    $('.modal#editComo .btn.btn-secondary.showalg.not-ticked').click(function(event) {
        $('#lookOutPopUp').addClass("unchecked");
        $('#lookOutPopUp').removeClass("checked");
        $('.non-como-content').addClass("show");
        $('.non-como-content').removeClass("hide");
        $('.como-content').addClass("hide");
        $('.como-content').removeClass("show");
    });
    $('.close-look-out').click(function(event) {
        $('#lookOutPopUp').addClass("unchecked");
        $('#lookOutPopUp').removeClass("checked");
    });
    
    // Add / remove selected values to / from the 'Add comorbidities' panel
    $("input[name='comorbidity']").change(function() {
    var value = $(this).val(),
        $list = $("#comoselected-1, #comoselected-2");
        var comochooser = $(this).attr('id');
        var comovalue = $(this).attr('value');

    if (this.checked) {
        
        // Add to the comorbidities list
        $list.append("<span data-value='" + value + "'>" + value + "</span>  ");
        
        // Show the relevant content on the page
        $('.' + comochooser + '-como-content').css('display', 'block');
        
        // If section has the .-como-content, find the txtwrap class and add the c+ icon and como title
        $('section.panel-group').has('.' + comochooser + '-como-content').find('.title-02').removeClass('no-icon');
        $('.' + comochooser + '-como-content').find('.poce_title').append('<span class="' + comochooser + '-title">' + comovalue + '</span>');
        console.log($('section.panel-group').has('.' + comochooser + '-como-content').find('.poce_title'));
        // Add comma in if there is more than one como listed in the como content title
        $(".poce_title span").not(":last-child").append(" ");
        
console.log(comochooser);

        // If comorbidities list has content, show the edit button
        $('#editComolist-1, #editComolist-2').show();        
    }
    else {
        // Remove from the comorbidities list
        $list.find('span[data-value="' + value + '"]').fadeOut("fast", function() {
            $(this).remove();
        });
        // remove titles from como box content if checkbox is unchecked
        // remove span element where title is comochooser + '-title'
        $('.' + comochooser + '-title').remove();
        
        // Hide the relevant content on the page
        $('.' + comochooser + '-como-content').css('display', 'none');
        
        // If section doesn't have the -como-content, find the txtwrap class and remove the c+ icon 
        $('section.panel-group').has('.' + comochooser + '-como-content').find('.title-02').addClass('no-icon');
        
        // If comorbidities list hasn't got any content, hide the edit button
        $('#editComolist-1, #editComolist-2').hide();

    }
  });

});

// Modal button behaviour
$(function() {
  var comorbidities = $("input[name='comorbidity']");
  comorbidities.on('change', function () {

    // Change como logo on the page if a como is checked
    $('.add-como-icon-and-text').toggleClass("checked", comorbidities.is(":checked"));

    // Change como copy from add to added when checkboxes un/checked
    $('.add-como-icon-and-text .add').toggleClass("unchecked", comorbidities.is(":checked"));
    $('.add-como-icon-and-text .added').toggleClass("checked", comorbidities.is(":checked"));

    

    
    $('li.list-group-item').removeClass("selected", comorbidities.is(":checked"));
    // IF NO COMOS SELECTED, HIDE EDIT BUTTON
    $('#comoselected-1 button').toggleClass("show", comorbidities.is(":checked"));
    $('#comoselected-1 button').removeClass("hide", comorbidities.is(":checked"));

    $('button.showalg.ticked').toggleClass("show", comorbidities.is(":checked"));
    $('button.showalg.not-ticked').toggleClass("hide", comorbidities.is(":checked"));
    $(this).closest('li.list-group-item ').toggleClass("selected", comorbidities.is(":checked"));


    // IF JUST ASTHMA DONT SHOW, IF ASTHMA + COPD OR JUST COPD SHOW    
    var copd = $("input[id='COPD']");
    var asthma = $("input[id='Asthma']");

    if ($(copd).prop("checked") === true) {
        $('.COPD-como-content.Asthma-como-content').show();
    } else {
        $('.COPD-como-content.Asthma-como-content').hide();
    }

    // IF BOTH ARE CHECKED DISABLE ASTHMA
    if (($(copd).prop("checked") === true) && ($(asthma).prop("checked") === true)) {

        $('.warning-asthma').show();
        // $('#editComo .modal-body .list-group-item.selected label[for="Asthma"] span.custom-control-indicator').addClass('disable-checkbox');
        // $('#editComo .modal-body .list-group-item.selected label[for="Asthma"] span.custom-control-description').css('text-decoration','line-through');
        $('#editComo input#Asthma').prop("disabled", true);
        $('#editComo input#Asthma').parent().css('cursor','not-allowed');
        console.log('both checked');
    } 
    // IF JUST ASTHMA IS CHECKED UNDISABLE COPD 
    if (($(copd).prop("checked") === false) && ($(asthma).prop("checked") === true)) {
        $('.warning-asthma').hide();
        $('#editComo input#Asthma').prop("disabled", false);
        $('#editComo  input#Asthma').parent().css('cursor','pointer');
        console.log('just asthma checked');
    }
    // IF JUST COPD IS CHECKED UNDISABLE ASTHMA
    if (($(copd).prop("checked") === true) && ($(asthma).prop("checked") === false)) {
        $('.warning-asthma').hide();
        $('#editComo input#Asthma').attr("disabled", false);
        $('#editComo input#Asthma').parent().css('cursor','pointer');
        console.log('just copd checked');
    }
    // IF BOTH ARE UNCHECKED UNDISABLE BOTH
    if (($(copd).prop("checked") === false) && ($(asthma).prop("checked") === false)) {
        $('.warning-asthma').hide();
        $('#editComo input#Asthma').attr("disabled", false);
        $('#editComo input#Asthma').parent().css('cursor','pointer');
        console.log('zilch checked');
    }

  });
  // Grab the topic title from the H1 tag and drop it into the modal para
  $('#editComo').find('p span').append($('#topicMenuTop h1').html());

});
// WARNING BOX FOR ASTHMA & COPD

$(function() {
 // DRUG BOX ACCORDION ON CLICK DRUG TITLE1 SHOW DRUG CONTENT 2 ONE CLICK DRUG TITLE2 SHOW DRUG CONTENT 1
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

// If the drop down contains a cor-mob content, show the icon in the title
$(function() {
    if ($('.poce_contents .panel-group').find('poce_drug_msg').lenghth !==0) {
        $(this).addClass('cor-mob-icon');
    };
});

// Drug hyperlink show/hide drug content 
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
// drop down arrows up and down on evidence accordion
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
    // TOGGLE ON/OFF SWITCH
    $('.como-toggle-on-off .toggle').on('click', function () {
        if ($('.toggle').hasClass('btn-primary')) {
            console.log('toggleSwitch checked');
            
            
        $("#comoselected-1 span").css('color', '#ccc');
        $("#comoselected-1 button").hide();
        $('[class*="-como-content"]').css('display', 'none');
        
        }
        if ($('.toggle').hasClass('off')) {
            console.log('toggleSwitch NOT checked');
            $("#comoselected-1 span").css('color', '#c50084');
            $("#comoselected-1 button").show();
            $('[class*="-como-content"]').css('display', 'block');
        }
        
    // TOGGLE ON/OFF SWITCH ENDS
    });
});

// POCE Evidence Accordion (nested)
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

// CLOSE BUTTON ON ASTHMA WARNING ON TREATMENT ALGORITHM MODAL FOR COMORBIDITES
$(".close-warning").click(function(){
    $(".warning-asthma").hide();
  });
