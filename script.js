//focus on first text
$("#name").focus();

//makes other entry field when you select other
var jobrole = $("#title");
var otherjobinput = $("#othertitle");
otherjobinput.hide();

//checks for when dropdown changes and checks whether you changed to "other"
$("#title").change(function(){
    if($(this).val() == "other"){
        $("#othertitle").show();
    }
    else{
        $("#othertitle").hide();
    }
})


//when js puns selected, other colors hidden and vice versa
//color dropdown hidden until select theme
var designselected = "";
$("#colors-js-puns").hide();
$("#design").change(function(){
    $("#colors-js-puns").show();
    if($(this).val() == "js puns"){
        designselected = "puns";
        $('#color option[value="tomato"]').hide();
        $('#color option[value="steelblue"]').hide();
        $('#color option[value="dimgrey"]').hide();
    }
    else if($(this).val() == "heart js"){
        designselected = "heart";
        $('#color option[value="cornflowerblue"]').hide();
        $('#color option[value="darkslategrey"]').hide();
        $('#color option[value="gold"]').hide();
    }
    else{
        designselected = "";
    }
    console.log(designselected);

})

//finds the total and displays it in a pgraph after fieldset
//disables and crosses out label of activities at the same time as one you checked
//keeps count to erase past total boxes
var total = 0;
var count = 0;

$('input[type="checkbox"]').click(function(){
    if($(this).prop("checked") == true){
        if($(this).prop("name") == "all"){
            total+=200;
        }
        if($(this).prop("name") == "js-frameworks"){
            total+=100;
            $("input[name='express']").attr("disabled", true);
            $("input[name='express']").parent().css("text-decoration", "line-through");
        }
        if($(this).prop("name") == "js-libs"){
            total+=100;
            $("input[name='node']").attr("disabled", true);
            $("input[name='node']").parent().css("text-decoration", "line-through");
        }
        if($(this).prop("name") == "express"){
            total+=100;
            $("input[name='js-frameworks']").attr("disabled", true);
            $("input[name='js-frameworks']").parent().css("text-decoration", "line-through");
        }
        if($(this).prop("name") == "node"){
            total+=100;
            $("input[name='js-libs']").attr("disabled", true);
            $("input[name='js-libs']").parent().css("text-decoration", "line-through");
        }
        if($(this).prop("name") == "build-tools"){
            total+=100;
        }
        if($(this).prop("name") == "npm"){
            total+=100;
        }

    }
    if($(this).prop("checked") == false){
        if($(this).prop("name") == "all"){
            total-=200;
        }
        if($(this).prop("name") == "js-frameworks"){
            total-=100;
            $("input[name='express']").attr("disabled", false);
            $("input[name='express']").parent().css("text-decoration", "");
        }
        if($(this).prop("name") == "js-libs"){
            total-=100;
            $("input[name='node']").attr("disabled", false);
            $("input[name='node']").parent().css("text-decoration", "");
        }
        if($(this).prop("name") == "express"){
            total-=100;
            $("input[name='js-frameworks']").attr("disabled", false);
            $("input[name='js-frameworks']").parent().css("text-decoration", "");
        }
        if($(this).prop("name") == "node"){
            total-=100;
            $("input[name='js-libs']").attr("disabled", false);
            $("input[name='js-libs']").parent().css("text-decoration", "");
        }
        if($(this).prop("name") == "build-tools"){
            total-=100;
        }
        if($(this).prop("name") == "npm"){
            total-=100;
        }

    }
    count++;

    $( ".activities" ).after( "<p class = runningtotal" +count+"> Total= $" + total + "</p>" );
    var h = "." + "runningtotal" + (count-1);
    $(h).hide()
    console.log(total);
});



//payment info section
//sets default to Credit Card and unable to select "select method"
//sets text area in respect to which payment option you select
$('#payment option[value="Credit Card"]').attr("selected", true);
$('#paypal').hide();
$('#bitcoin').hide();
$('#payment option[value="select method"]').attr("disabled", true);

$("#payment").change(function(){
    console.log(2);
    if($('#payment option[value="Credit Card"]').prop("selected") == true){
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
    }
    if($('#payment option[value="PayPal"]').prop("selected") == true){
        $('#credit-card').hide();
        $('#paypal').show();
        $('#bitcoin').hide();
    }
    if($('#payment option[value="Bitcoin"]').prop("selected") == true){
        $('#credit-card').hide();
        $('#paypal').hide();
        $('#bitcoin').show();
    }


})

//form validation
var formsubmit = false;

var submitname = false;
var submitemail = false;
var submitcheckbox = false;
var submitcc = false;
var submitzip = false;
var submitcvv = false;

//name validation
//makes sure name field isn't blank
$("#name").change(function(){
    if($(this).val()==""){
        submitname = false;
        console.log("invalid name");
    }
    else{
        submitname = true;
    }
})

//email validation
//makes sure email is valid
function isValidEmail(email){
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}
$("#mail").change(function(){
    if(isValidEmail($(this).val())){
        console.log("valid email");
        submitemail = true;
    }
    else{
        submitemail = false;
        console.log("invalid email");
    }
})

//register validation
//makes sure at least one checkbox is clicked bc then total would not equal 0
$('input[type=checkbox]').change(function(){
    if(total==0){
        console.log("invalid registration");
        submitcheckbox = false;
    }
    else{
        submitcheckbox=true;
        console.log("valid regis");
    }
})

//credit card validationm

//cc number validation
//makes sure cc number is between 13 and 16 digits
function isValidCC(cc){
    return /\b\d{13,16}\b/g.test(cc);
}
$("#cc-num").change(function(){
    if($('#payment option[value="Credit Card"]').prop("selected") == true){
        if(isValidCC($("#cc-num").val())==false){
            console.log("cc invalid");
            submitcc = false;
        }
        else{
            submitcc = true;
            console.log("cc valid");
        }
    }
})

//cc zip validation
//makes sure zip has a 5 digit number
function isValidZip(zip){
    return /\d{5}/g.test(zip);
}
$("#zip").change(function(){
    if($('#payment option[value="Credit Card"]').prop("selected") == true){
        if(isValidZip($("#zip").val())==false){
            console.log("zip invalid");
            submitzip = false;
        }
        else{
            submitzip = true;
            console.log("zip valid");
        }
    }
})

//cc cvv validation
//makes sure cvv is exactly 3 digits
function isValidCvv(cvv){
    return /\b\d{3}\b/g.test(cvv);
}
$("#cvv").change(function(){
    if($('#payment option[value="Credit Card"]').prop("selected") == true){
        if(isValidCvv($("#cvv").val())==false){
            console.log("cvv invalid");
            submitcvv = false;
        }
        else{
            submitcvv = true;
            console.log("cvv valid");
        }
    }
})


//on button click, check to see if false
//if they are false, then make border red and don't let submit
$("button").on("click", function(){
    if($('#payment option[value="Credit Card"]').prop("selected") == true){
        if(submitname && submitemail && submitcheckbox && submitcc && submitzip && submitcvv){
            formsubmit = true;
        }
        }
        else if(submitname && submitemail && submitcheckbox){
                formsubmit = true;
            }
    if(formsubmit == false){
        event.preventDefault();
    }
    if(submitname==false){
        $('#name').css('border-color', 'red');
    }
    else{
        $('#name').css('border-color', '');
    }
    if(submitemail==false){
        $('#mail').css('border-color', 'red');
    }
    else{
        $('#mail').css('border-color', '');
    }
    if(submitcheckbox==false){
        $('.activities').css('border-color', 'red');
    }
    else{
        $('.activities').css('border-color', '');
    }
    if($('#payment option[value="Credit Card"]').prop("selected") == true){
        if(submitcc==false){
            $('#cc-num').css('border-color', 'red');
        }
        else{
            $('#cc-num').css('border-color', '');
        }
        if(submitzip==false){
            $('#zip').css('border-color', 'red');
        }
        else{
            $('#zip').css('border-color', '');
        }
        if(submitcvv==false){
            $('#cvv').css('border-color', 'red');
        }
        else{
            $('#cvv').css('border-color', '');
        }
    }
})