var arrayOfValidationErrors = new Array();
            
function nameFocusOutHandler(param)
{
    var field = document.getElementById(param.name);
    var fieldValue = field.value;
    
    switch(param.name) 
    {
    case 'name':
        nameFieldValidator(param);
        break;
    case 'lastname':
        lastNameFieldValidator(param);
        break;
    case 'email':
        emailFieldValidator(param);
        break;
    case 'dateofbirth':
        dateOfBirthValidator(param);
        break;
    case 'password':
        passwordValidator(param);
        break;
    case 'password_again':
        retypePasswordValidator(param);
        break;
    case 'description':
        descriptionValidator(param);
        break;
    }
    
}
/*
    -Should not be empty
*/
function nameFieldValidator(param)
{
    var fieldIsEmpty = checkIfFieldIsEmpty(param);
    if(fieldIsEmpty)
    {
        arrayOfValidationErrors.push(new ValidationError('Name','Name field is empty !'))
    }
}
/*
    -Should not be empty
*/
function lastNameFieldValidator(param)
{
    var fieldIsEmpty = checkIfFieldIsEmpty(param);
    if(fieldIsEmpty)
    {
        arrayOfValidationErrors.push(new ValidationError('Last Name','Last Name field is empty !'))
    }
}
/*
    -Should not be empty
*/
function dateOfBirthValidator(param)
{
    var fieldIsEmpty = checkIfFieldIsEmpty(param);
    if(fieldIsEmpty)
    {
        arrayOfValidationErrors.push(new ValidationError('Date of birth','Date of birth field is empty !'))
    }
}
/*
    - Should not be empty
    - Should be validated by regex
*/
function emailFieldValidator(param)
{
    var emailIsValidated = validateEmail(param);
    var fieldIsEmpty = checkIfFieldIsEmpty(param);
    if(fieldIsEmpty)
    {
        arrayOfValidationErrors.push(new ValidationError('Email','Email field is empty !'))
    }
    if(emailIsValidated==false)
    {
        arrayOfValidationErrors.push(new ValidationError('Email','Email is not valid !'))
    }
}
/*
    - Should not be empty
    - Should have at least 8 characters
    - Should have at least 1 number
*/
function passwordValidator(param)
{
    var fieldIsEmpty = checkIfFieldIsEmpty(param);
    var fieldHasproperLength = checkIfLengthOfGivenString(param, 8);
    var fieldContainsNumber = checkIfHasNumber(param);
    if(fieldIsEmpty)
    {
        arrayOfValidationErrors.push(new ValidationError('Password','Password field is empty !'))
    }
    if(fieldHasproperLength!=true)
    {
        
        arrayOfValidationErrors.push(new ValidationError('Password','Password field has not enough characters !'))
    }
    if(fieldContainsNumber!=true)
    {
        arrayOfValidationErrors.push(new ValidationError('Password','Password field has not even one number !'))
    }
}
/*
    - Must be the same as password
*/
function retypePasswordValidator(param)
{
    var fieldIsEmpty = checkIfFieldIsEmpty(param);
    if(fieldIsEmpty)
    {
        arrayOfValidationErrors.push(new ValidationError('Retype password', 'Retype password field could not be empty !'))
    }
    else
    {
        var passwordValue = document.getElementById('password').value;
        var passwordRetyped = document.getElementById('password_again').value;
        if(checkIfStringsAreEqual(passwordValue, passwordRetyped)!=true)
        {
            arrayOfValidationErrors.push(new ValidationError('Retype password', 'Retype password must have the same value as password field !'))        
        }
    }
}
/*
    - Should maximum 100 digits
*/
function descriptionValidator(param)
{
    var fieldIsEmpty = checkIfFieldIsEmpty(param);
    if(fieldIsEmpty)
    {
        arrayOfValidationErrors.push(new ValidationError('Description','Description field is empty !'))
    }
    
}

//---------------------------------------------------------------------
function checkIfStringsAreEqual(string1, string2)
{
    if(string1===string2)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function checkIfFieldIsEmpty(field)
{
    var emptyField = false;
    var field = document.getElementById(field.name);
    var fieldValue = field.value;
    
    if(fieldValue==='')    
    {
        field.style.backgroundColor="red";
        emptyField=true;
    }
    else
    {   
        //Right now we check which
        field.style.backgroundColor="white";
    }
    
    return emptyField;
}

function checkIfLengthOfGivenString(string, amount)
{
    if(string.length==amount)
    {
        return true;    
    }
    else
    {
        return false;    
    }
}

function checkIfHasNumber(string) {
  return (/\d/.test(string));
}

//----------------------------------------------------------------------

function showAsterisc()
{
    document.getElementById('asterisc').hidden=false;
}

function hideAsterisc()
{
    document.getElementById('asterisc').hidden=true;
}

function submitForm()
{    
    fillGivenDivWithErrorsText('error_list');   
}

function fillGivenDivWithErrorsText(divid)
{
    var errorsString='';
    for(var i=0; i<arrayOfValidationErrors.length; i++)
    {
        var currentErrorMessage = arrayOfValidationErrors[i].validationErrorMessage;
        errorsString+=currentErrorMessage+" "; 
    }
    document.getElementById(divid).innerHTML=errorsString;
}

function addNewValidationError(validationError)
{
    for(var i=0; i<arrayOfValidationErrors.length; i++)
    {
        var currentValidationError = arrayOfValidationErrors[i];
        if(validationError.fieldType===currentValidationError.fieldType && validationError.validationErrorMessage===currentValidationError.validationErrorMessage)
        {
            currentValidationError.fieldType=validationError.fieldType;
        }
        else
        {
            arrayOfValidationErrors.push(validationError);
        }
    }
}

function ValidationError(fieldType,validationErrorMessage)
{
    this.fieldType = fieldType;
    this.validationErrorMessage = validationErrorMessage;
}
