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
        arrayOfValidationErrors.push(new ValidationError('Name','Name field is empty !'));
        showAsterisc('asterisc_name');
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
        showAsterisc('asterisc_lastname');
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
        arrayOfValidationErrors.push(new ValidationError('Date of birth','Date of birth field is empty !'));
        showAsterisc('asterisc_dateofbirth');
    }
}
/*
    - Should not be empty
    - Should be validated by regex
*/
function emailFieldValidator(param)
{
    var emailIsValidated = validateEmail(param.value);
    var fieldIsEmpty = checkIfFieldIsEmpty(param.value);
    if(fieldIsEmpty)
    {
        arrayOfValidationErrors.push(new ValidationError('Email','Email field is empty !'));
    }
    if(emailIsValidated==false)
    {
        arrayOfValidationErrors.push(new ValidationError('Email','Email is not valid !'));
        showAsterisc('asterisc_email');
    }
	if(emailIsValidated==true)
	{
		removeErrorsFromArrayOfValidationErrors("Email");	
	}
}
function removeErrorsFromArrayOfValidationErrors(fieldType)
{
		for(i=0; i<arrayOfValidationErrors.length; i++)
		{
				var currentValidationError = arrayOfValidationErrors[i];
				if(currentValidationError.fieldType===fieldType)
				{
						arrayOfValidationErrors.splice(i);
				}
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
    var fieldHasproperLength = checkIfLengthOfGivenPasswordIsProper(param, 8);
    var fieldContainsNumber = checkIfHasNumber(param);
    if(fieldIsEmpty)
    {
        arrayOfValidationErrors.push(new ValidationError('Password','Password field is empty !'));
    }
    if(fieldHasproperLength!=true)
    {
        
        arrayOfValidationErrors.push(new ValidationError('Password','Password field has not enough characters !'));
        showAsterisc('asterisc_password');
    }
    if(fieldContainsNumber!=true)
    {
        arrayOfValidationErrors.push(new ValidationError('Password','Password field has not even one number !'));
        showAsterisc('asterisc_password');
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
        arrayOfValidationErrors.push(new ValidationError('Retype password', 'Retype password field could not be empty !'));
    }
    else
    {
        var passwordValue = document.getElementById('password').value;
        var passwordRetyped = document.getElementById('password_again').value;
        if(checkIfStringsAreEqual(passwordValue, passwordRetyped)!=true)
        {
            arrayOfValidationErrors.push(new ValidationError('Retype password', 'Retype password must have the same value as password field !'));
            showAsterisc('asterisc_password_again');
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
        showAsterisc('asterisc_description')
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
	var fieldValue;
	if(field==null)
	{
		fieldValue='';
	}
	else
	{
     fieldValue = field.value;
    }
    if(fieldValue==='')    
    {
         if(field==='description')
        {
            document.getElementById('description').style="background-color : red;";
        }
        else
        {
			if(field!==null)
			{
				field.style.backgroundColor="red";
			}
		}
        emptyField=true;
    }
    else
    {  
        //Right now we check which
        field.style.backgroundColor="white";
    }
    
    return emptyField;
}

function checkIfLengthOfGivenPasswordIsProper(string, amount)
{
    if(string.value.length>=amount)
    {
        return true;    
    }
    else
    {
        return false;    
    }
}

function checkIfHasNumber(string) {
  return (/\d/.test(string.value));
}

//----------------------------------------------------------------------

function showAsterisc(asterisc_id)
{
    document.getElementById(asterisc_id).hidden=false;
}

function hideAsterisc()
{
    document.getElementById('asterisc').hidden=true;
}

function submitForm()
{	
	arrayOfValidationErrors = [];
	document.getElementById('error_list').hidden=false;
	document.getElementById('error_list').innerHTML="";
	//Validators
		var nameField = document.getElementById('name');
		nameFieldValidator(nameField);
		var lastnameField = document.getElementById('lastname');
        lastNameFieldValidator(lastnameField);
		var emailField = document.getElementById('email');
        emailFieldValidator(emailField);
		var dateofbirthField = document.getElementById('dateofbirth');
        dateOfBirthValidator(dateofbirthField);
        var passwordField = document.getElementById('password');
        passwordValidator(passwordField);
        var password_againField = document.getElementById('password_again');
        retypePasswordValidator(password_againField);
        var descriptionField = document.getElementById('description');
        descriptionValidator(descriptionField);

	//-------------------------------------------------
    fillGivenDivWithErrorsText('error_list');   
}

function fillGivenDivWithErrorsText(divid)
{
    var errorsString='';
    if(document.getElementById(divid).innerHTML!='')
    {
        for(var i=0; i<arrayOfValidationErrors.length; i++)
        {
            var currentErrorMessage = arrayOfValidationErrors[i].validationErrorMessage;
            errorsString+=currentErrorMessage+" "; 
        }
    }
	if(errorsString!=='')
	{
		document.getElementById(divid).innerHTML=errorsString;
	}
	if(errorsString=='')
	{
		document.getElementById(divid).style.display = 'none';
		//alert("Form is validated properly");
	}
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
