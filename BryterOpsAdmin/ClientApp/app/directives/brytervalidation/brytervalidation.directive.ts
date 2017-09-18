import { Directive, ElementRef, Input, OnInit, AfterViewChecked } from '@angular/core';

@Directive({ selector: '[brytervalidation]' })
export class BryterValidationDirective implements OnInit, AfterViewChecked {
    private isRequired: boolean;
    private maxLength: number;
    private minLength: number;
    private isPhone: boolean;
    private isEmail: boolean;
    private isCheckbox: boolean;
    private isRadioButton: boolean;
    private numericOnly: boolean;
    private alphaOnly: boolean;
    private alphaNumericOnly: boolean;
    private regex: string;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        if ($(this.el.nativeElement).prop("required"))
            this.isRequired = true;
        if ($(this.el.nativeElement).prop("maxLength"))
            this.maxLength = $(this.el.nativeElement).prop("maxLength");
        if ($(this.el.nativeElement).prop("minLength"))
            this.maxLength = $(this.el.nativeElement).prop("minLength");
        if ($(this.el.nativeElement).prop("phone"))
            this.isPhone = true;
        if ($(this.el.nativeElement).prop("email"))
            this.isEmail = true;
        if ($(this.el.nativeElement).prop("type") == "checkbox")
            this.isCheckbox = true;
        if ($(this.el.nativeElement).prop("type") == "radio")
            this.isRadioButton = true;
        if ($(this.el.nativeElement).prop("alpha"))
            this.alphaOnly = true;
        if ($(this.el.nativeElement).prop("numeric"))
            this.numericOnly = true;
        if ($(this.el.nativeElement).prop("alphaNumeric"))
            this.alphaNumericOnly = true;
        if ($(this.el.nativeElement).prop("regex"))
            this.regex = $(this.el.nativeElement).prop("regex");
    }

    ngAfterViewChecked() {
        var self = this;
        var isValid = true;
        var validationMessage = "";

        $(this.el.nativeElement).on('blur', function () {
            //Separate into different functions
            if (self.isRequired)
            {
                if ($(self.el.nativeElement).val() == "" && $(self.el.nativeElement).text() == "")
                {
                    isValid = false;
                    //get label for the input field
                    validationMessage = "Required\n";
                }
            }
                
            if (self.maxLength > 0)
            {
                if ($(self.el.nativeElement).val().length > self.maxLength || $(self.el.nativeElement).text().length > self.maxLength)
                {
                    isValid = false;
                    validationMessage = "Length must be less than " + self.maxLength + " characters\n";
                }
            }
                
            if (self.minLength > 0)
            {
                if ($(self.el.nativeElement).val().length < self.minLength || $(self.el.nativeElement).text().length < self.minLength)
                {
                    isValid = false;
                    validationMessage = "Length must be more than " + self.minLength + "characters\n";
                }
            }
                
            if (self.isPhone)
            {
                //TODO: Make sure input is valid phone
            }
                
            if (self.isEmail)
            {
                //TODO: Make sure input is valid email
            }

            if (self.isCheckbox)
            {
                //TODO: check if the checkbox should be checked, or group of checkboxes
            }

            if (self.isRadioButton)
            {
                //TODO: check if the radio button group needs an answer
            }

            if (self.numericOnly)
            {
                //TODO: make sure input is numbers only
            }

            if (self.alphaOnly)
            {
                //TODO: make sure input is letters only
            }

            if (self.alphaNumericOnly)
            {
                //TODO: make sure input only contains letters and numbers
            }

            if (self.regex)
            {
                //TODO: Check regex
            }

            return isValid;
        });
    }
}