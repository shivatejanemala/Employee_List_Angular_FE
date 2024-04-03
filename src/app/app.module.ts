import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EmployeeService } from './employee.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,BrowserModule,HttpClientModule
  ],
  providers: [EmployeeService],
  bootstrap: []

})
export class ModulesModule { }
