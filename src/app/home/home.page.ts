import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor() {}

  ngOnInit() {
    // Code to be Executed when the Page Laods 
  }

  switchForm = async (event) => {
    console.log(`Event`, event);
  }

  updateStats = async (event) => {

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

    if (!isNaN(event.data)) {
      if (!isNaN(parseInt(currentInput.value.replace(/[^0-9]/g, ``))) && currentInput.classList.contains(`currencyFormat`)) {
        let localeValue = `$ ` + parseInt(currentInput.value.replace(/[^0-9]/g, ``)).toLocaleString(`en-US`);
        currentInput.value = localeValue;
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
