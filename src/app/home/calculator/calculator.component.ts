import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import User from '../../models/user';

export const user = JSON.parse(localStorage.getItem(`User`));
export const newUser = JSON.parse(localStorage.getItem(`New User`));
export const users = JSON.parse(localStorage.getItem(`Users`)) || [];
export const lastUser = JSON.parse(localStorage.getItem(`Last User`));
export const userEmails = JSON.parse(localStorage.getItem(`User Emails`)) || [];

// Capitalize First Letter of Every Word in String
export const toUpperCase = (string?:string) => {
  let words:any = string.split(` `);
  let capWords = words.map(word => {
    let capitalizedWord = word?.charAt(0)?.toUpperCase() + word?.slice(1);
    return capitalizedWord || word;
  })
  return capWords.join(` `);
}

// Remove Duplicate Objects from Array
export const removeDuplicateObjFromArray = (array?:any) => {
  const uniqueArray = array?.filter((value?:any, index?:any) => {
      const _value = JSON.stringify(value);
      return index === array?.findIndex((obj?:any) => {
          return JSON.stringify(obj) === _value;
      });
  });
  return uniqueArray;
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
    // Code to be Executed when the Page Laods
  }

  capitalizeInput = e => e.target.value = toUpperCase(e.target.value);

  showAlert = async () => {
    await this.alertCtrl.create({
      header: `Invalid Input`,
      subHeader: `Please enter Valid Input`,
      message: `Please enter only numbers`,
      buttons: [
        {
          text: `Ok`, handler: (event) => {
            console.log(event)
          }
        },
        {
          text: `Cancel`
        }
      ]
    }).then(e => e.present());
  }

  addMonthlyBill = async event => {
    const buttonsCont =  event.target.parentElement;
    const financialForm = event.target.parentElement.parentElement;
    let addmonthlyBillInputsCont:any = document.createElement(`code`);
    let addMonthlyBillInputs:any = `<input
      type="text"
      name="monthlyBillTitleInput"
      id="monthlyBillTitleInput"
      class="monthlyBillTitleInput capitalizeFormat"
      placeholder="Monthly Bill Title"
    />
    <input
      type="text"
      name="monthlyBillInput"
      id="monthlyBillInput"
      class="monthlyBillInput currencyFormat"
      placeholder="Monthly Bill Amount"
    />
  `;
   addmonthlyBillInputsCont.innerHTML = addMonthlyBillInputs;
    financialForm.insertBefore(addmonthlyBillInputsCont.firstChild,buttonsCont);
    financialForm.insertBefore(addmonthlyBillInputsCont.childNodes[1],buttonsCont);
    financialForm.addEventListener(`input`, e => {
      if (e.target.classList.contains(`capitalizeFormat`)) {
        this.capitalizeInput(e);
      }
    })
  }

  registrationActions = async (event) => {
    const currentButton = event.target;
    const currentForm:any = event.target.parentElement.previousSibling;
    console.log(`currentForm`, currentForm);
    const jobInput:any = (<HTMLInputElement>document.querySelector(`#jobInput`));
    const companyInput:any = (<HTMLInputElement>document.querySelector(`#companyInput`));
    const emailInput:any = (<HTMLInputElement>document.querySelector(`#emailInput`));
    const passwordInput:any = (<HTMLInputElement>document.querySelector(`#passwordInput`));
    if (!emailInput.value || !emailInput.value.substring(0, emailInput.value.indexOf("@"))) {
      alert(`Please Enter a Valid Email Address!`);
      return;
    } else if (!passwordInput.value) {
      alert(`Please Enter a Password!`);
      return;
    } else { // Grab Inputs
      let email = emailInput.value;
      let username = email.includes(`@`) ? email.substring(0, email.indexOf("@")) : email;
      let password = passwordInput.value;
      let job = jobInput.value;
      let company = companyInput.value;
      switch(currentButton.id) {
        case `signUpButton`:
          if (userEmails.includes(email)) { // Switch to Sign In
            alert(`${username}, You Already Have An Account!`);
            return;
          } else { // Register New User
            let newUser = new User(email,username,password,job,company,[],[]);
            users.push(newUser);
            userEmails.push(newUser.email);
            localStorage.setItem(`User`, JSON.stringify(newUser));
            localStorage.setItem(`New User`, JSON.stringify(newUser));
            localStorage.setItem(`User Emails`, JSON.stringify([...new Set(userEmails)]));
            localStorage.setItem(`Users`, JSON.stringify(removeDuplicateObjFromArray(users)));
            console.log(`Users`, JSON.parse(localStorage.getItem(`Users`)));
            console.log(`New User`, newUser);
          }
          break;
      }
    }
  }

  calculateStats = async (event) => {

    const currentInput:any = event.target;
    const hourlyInput:any = (<HTMLInputElement>document.querySelector(`#hourlyInput`));
    const weeklyInput:any = (<HTMLInputElement>document.querySelector(`#weeklyInput`));
    const salaryInput:any = (<HTMLInputElement>document.querySelector(`#salaryInput`));

    let hourlyRate:any = hourlyInput.value.replace(/[^0-9.]/g, ``);
    let weeklyHours:any = weeklyInput.value.replace(/[^0-9.]/g, ``);
    let annualSalary:any = salaryInput.value.replace(/[^0-9.]/g, ``);

    let hourly:any = (<HTMLInputElement>document.querySelector(`#hourly`));
    let daily:any = (<HTMLInputElement>document.querySelector(`#daily`));
    let weekly:any = (<HTMLInputElement>document.querySelector(`#weekly`));
    let monthly:any = (<HTMLInputElement>document.querySelector(`#monthly`));
    let yearly:any = (<HTMLInputElement>document.querySelector(`#yearly`));
    let hourlyTax:any = (<HTMLInputElement>document.querySelector(`#hourlyTaxes`));
    let dailyTax:any = (<HTMLInputElement>document.querySelector(`#dailyTaxes`));
    let weeklyTax:any = (<HTMLInputElement>document.querySelector(`#weeklyTaxes`));
    let monthlyTax:any = (<HTMLInputElement>document.querySelector(`#monthlyTaxes`));
    let yearlyTax:any = (<HTMLInputElement>document.querySelector(`#yearlyTaxes`));
    let hourlyCash:any = (<HTMLInputElement>document.querySelector(`#hourlyCash`));
    let dailyCash:any = (<HTMLInputElement>document.querySelector(`#dailyCash`));
    let weeklyCash:any = (<HTMLInputElement>document.querySelector(`#weeklyCash`));
    let monthlyCash:any = (<HTMLInputElement>document.querySelector(`#monthlyCash`));
    let yearlyCash:any = (<HTMLInputElement>document.querySelector(`#yearlyCash`));

    // Input Validation
    if (!isNaN(event.data)) {
      if (!isNaN(parseInt(currentInput.value.replace(/[^0-9]/g, ``)))) {
        if (currentInput.classList.contains(`currencyFormat`)) {
          let localeValue = `$ ` + parseInt(currentInput.value.replace(/[^0-9]/g, ``)).toLocaleString(`en-US`);
          currentInput.value = localeValue;
        } else if (currentInput.classList.contains(`numberFormat`)) {
          let numberValue = parseInt(currentInput.value.replace(/[^0-9]/g, ``)).toLocaleString(`en-US`);
          currentInput.value = numberValue;
        }
      }
    } else {
      if (currentInput.classList.contains(`currencyFormat`) || currentInput.classList.contains(`numberFormat`)) {
        this.showAlert();
        currentInput.value = event.target.value.replace(/[^0-9]/g, ``);
      }
    }

    if (!hourlyRate && !weeklyHours && !annualSalary) {
      hourly.value = `Hourly Wage`;
      daily.value = `Daily Income`;
      weekly.value = `Weekly Income`;
      monthly.value = `Monthly Income`;
      yearly.value = `Annual Salary`;
      hourlyTax.value = `Hourly Taxes`;
      dailyTax.value = `Daily Taxes`;
      weeklyTax.value = `Weekly Taxes`;
      monthlyTax.value = `Monthly Taxes`;
      yearlyTax.value = `Annual Taxes`;
      hourlyCash.value = `Hourly Cash`;
      dailyCash.value = `Daily Cash`;
      weeklyCash.value = `Weekly Cash`;
      monthlyCash.value = `Monthly Cash`;
      yearlyCash.value = `Annual Cash`;
    } else if (hourlyRate && !weeklyHours && !annualSalary) {
      hourly.value = `$ ` + (hourlyRate*1).toLocaleString(`en-US`) + ` per Hour`;
      daily.value = `$ ` + (hourlyRate * 8).toLocaleString(`en-US`) + ` per Day`;
      weekly.value = `$ ` + (hourlyRate * 40).toLocaleString(`en-US`) + ` per Week`;
      monthly.value = `$ ` + Math.floor(((hourlyRate * 40) * 52) / 12).toLocaleString(`en-US`) + ` per Month`;
      yearly.value = `$ ` + Math.floor((hourlyRate * 40) * 52).toLocaleString(`en-US`) + ` per Year`;
      hourlyTax.value = `- $ ` + Math.floor(hourlyRate*0.24).toLocaleString(`en-US`) + ` Taxes per Hour`;
      dailyTax.value = `- $ ` + Math.floor((hourlyRate * (40/5))*0.24).toLocaleString(`en-US`) + ` Taxes per Day`;
      weeklyTax.value = `- $ ` + Math.floor((hourlyRate * 40)*0.24).toLocaleString(`en-US`) + ` Taxes per Week`;
      monthlyTax.value = `- $ ` + Math.floor((((hourlyRate * 40)*52) / 12)*0.24).toLocaleString(`en-US`) + ` Taxes per Month`;
      yearlyTax.value = `- $ ` + Math.floor(((hourlyRate * 40)*52)*0.24).toLocaleString(`en-US`) + ` Taxes per Year`;
      hourlyCash.value = `$ ` + Math.floor(hourlyRate-(hourlyRate*0.24)).toLocaleString(`en-US`) + ` Cash per Hour`;
      dailyCash.value = `$ ` + Math.floor((hourlyRate-(hourlyRate*0.24))*8).toLocaleString(`en-US`) + ` Cash per Day`;
      weeklyCash.value = `$ ` + Math.floor(((hourlyRate-(hourlyRate*0.24))*8)*5).toLocaleString(`en-US`) + ` Cash per Week`;
      monthlyCash.value = `$ ` + Math.floor(((((hourlyRate-(hourlyRate*0.24))*8)*5)*52)/12).toLocaleString(`en-US`) + ` Cash per Month`;
      yearlyCash.value = `$ ` + Math.floor((((hourlyRate-(hourlyRate*0.24))*8)*5)*52).toLocaleString(`en-US`) + ` Cash per Year`;
    } else if (hourlyRate && weeklyHours && !annualSalary) {
      hourly.value = `$ ` + (hourlyRate*1).toLocaleString(`en-US`) + ` per Hour`;
      daily.value = `$ ` + (hourlyRate * (weeklyHours/5)).toLocaleString(`en-US`) + ` per Day`;
      weekly.value = `$ ` + (hourlyRate * weeklyHours).toLocaleString(`en-US`) + ` per Week`;
      monthly.value = `$ ` + Math.floor(((hourlyRate * weeklyHours) * 52) / 12).toLocaleString(`en-US`) + ` per Month`;
      yearly.value = `$ ` + Math.floor((hourlyRate * weeklyHours) * 52).toLocaleString(`en-US`) + ` per Year`;
      hourlyTax.value = `- $ ` + Math.floor(hourlyRate*0.24).toLocaleString(`en-US`) + ` Taxes per Hour`;
      dailyTax.value = `- $ ` + Math.floor((hourlyRate * (weeklyHours/5))*0.24).toLocaleString(`en-US`) + ` Taxes per Day`;
      weeklyTax.value = `- $ ` + Math.floor((hourlyRate * weeklyHours)*0.24).toLocaleString(`en-US`) + ` Taxes per Week`;
      monthlyTax.value = `- $ ` + Math.floor((((hourlyRate * weeklyHours)*52) / 12)*0.24).toLocaleString(`en-US`) + ` Taxes per Month`;
      yearlyTax.value = `- $ ` + Math.floor(((hourlyRate * weeklyHours)*52)*0.24).toLocaleString(`en-US`) + ` Taxes per Year`;
      hourlyCash.value = `$ ` + Math.floor(hourlyRate-(hourlyRate*0.24)).toLocaleString(`en-US`) + ` Cash per Hour`;
      dailyCash.value = `$ ` + Math.floor((hourlyRate-(hourlyRate*0.24))*(weeklyHours/5)).toLocaleString(`en-US`) + ` Cash per Day`;
      weeklyCash.value = `$ ` + Math.floor(((hourlyRate-(hourlyRate*0.24))*(weeklyHours/5))*5).toLocaleString(`en-US`) + ` Cash per Week`;
      monthlyCash.value = `$ ` + Math.floor(((((hourlyRate-(hourlyRate*0.24))*(weeklyHours/5))*5)*52)/12).toLocaleString(`en-US`) + ` Cash per Month`;
      yearlyCash.value = `$ ` + Math.floor((((hourlyRate-(hourlyRate*0.24))*(weeklyHours/5))*5)*52).toLocaleString(`en-US`) + ` Cash per Year`;
    } else if (!hourlyRate && !weeklyHours && annualSalary) {
      hourly.value = `$ ` + Math.floor((annualSalary / 260) / 8).toLocaleString(`en-US`) + ` per Hour`;
      daily.value = `$ ` + Math.floor(annualSalary / 260).toLocaleString(`en-US`) + ` per Day`;
      weekly.value = `$ ` + Math.floor(annualSalary / 52).toLocaleString(`en-US`) + ` per Week`;
      monthly.value = `$ ` + Math.floor(annualSalary / 12).toLocaleString(`en-US`) + ` per Month`;
      yearly.value = `$ ` + Math.floor(annualSalary).toLocaleString(`en-US`) + ` per Year`;
      hourlyTax.value = `- $ ` + Math.floor(((annualSalary / 260) / 8)* 0.24).toLocaleString(`en-US`) + ` Taxes per Hour`;
      dailyTax.value = `- $ ` + Math.floor((annualSalary / 260) * 0.24).toLocaleString(`en-US`) + ` Taxes per Day`;
      weeklyTax.value = `- $ ` + Math.floor((annualSalary / 52) * 0.24).toLocaleString(`en-US`) + ` Taxes per Week`;
      monthlyTax.value = `- $ ` + Math.floor((annualSalary / 12) * 0.24).toLocaleString(`en-US`) + ` Taxes per Month`;
      yearlyTax.value = `- $ ` + Math.floor(annualSalary * 0.24).toLocaleString(`en-US`) + ` Taxes per Year`;
      hourlyCash.value = `$ ` + Math.floor(((annualSalary / 260) / 8)-(((annualSalary / 260) / 8)*0.24)).toLocaleString(`en-US`) + ` Cash per Hour`;
      dailyCash.value = `$ ` + Math.floor((annualSalary / 260)-((annualSalary / 260) * 0.24)).toLocaleString(`en-US`) + ` Cash per Day`;
      weeklyCash.value = `$ ` + Math.floor((annualSalary / 52)-((annualSalary / 52) * 0.24)).toLocaleString(`en-US`) + ` Cash per Week`;
      monthlyCash.value = `$ ` + Math.floor((annualSalary / 12)-((annualSalary / 12) * 0.24)).toLocaleString(`en-US`) + ` Cash per Month`;
      yearlyCash.value = `$ ` + Math.floor(annualSalary-(annualSalary * 0.24)).toLocaleString(`en-US`) + ` Cash per Year`;
    }

  }

}
