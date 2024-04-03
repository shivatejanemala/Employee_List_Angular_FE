import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import {NgFor, NgForOf} from "@angular/common";
import { CommonModule} from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  //imports: [RouterOutlet],
  imports: [CommonModule, HttpClientModule,FormsModule],
  providers: [EmployeeService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'employeemanagerapp';
  public employees: Employee[] = [];

  constructor(private service:EmployeeService){} //Dependency Injection

  public editEmployee: Employee | null | undefined;

  ngOnInit(): void {
      this.printURL();
      this.getEmployees();
  }

  public printURL(){
    this.service.printURL();
  }
  public getEmployees():void{
    // we implemented observable in service to make sure we wait for the time delay for service response
    // Subscribe fn is used in component to make sure we wait for the response from the service
    console.log("Calling the getEmployees from components module")
    this.service.getEmployees().subscribe( 
        (response:Employee[])=> {
          this.employees = response;
        },
        (err:HttpErrorResponse)=>{
          console.log(err);
          alert(err.message);
        }
    )
  }

  public onOpenModal(employee:Employee|null,mode:string):void{

      const container = document.getElementById('main-container');
      console.log("Opening the openModal fn");
      const button=document.createElement('button');
      button.type = "button";
      button.style.display="none";
      button.setAttribute('data-toggle','modal');
      if(mode === 'add'){
        button.setAttribute('data-target','#addEmployeeModal');
      }
      if(mode === 'edit'){
        this.editEmployee = employee;
        button.setAttribute('data-target','#updateEmployeeModal');
      }
      if(mode === 'delete'){
        button.setAttribute('data-target','#deleteEmployeeModal');
      }
      container?.appendChild(button);
      button.click();
  }

  public onAddEmployee(empForm:NgForm):void{
    console.log("POST add  employee-> "+ empForm.value)
    document.getElementById("close-Employee-form")?.click();
    this.service.addEmployees(empForm.value).subscribe(
      (response:Employee)=>{
        console.log(response);
        this.getEmployees();
        
      },
      (err:HttpErrorResponse)=> {console.log(err.message); alert(err.message);}

    );
  }
  
  public onUpdateEmployee(employee:Employee):void{
    console.log("POST update employee-> "+ employee)
    this.service.updateEmployees(employee).subscribe(
      (response:Employee)=>{
        console.log(response);
        this.getEmployees();
        
      },
      (err:HttpErrorResponse)=> {console.log(err.message); alert(err.message);}

    );
  }

}
