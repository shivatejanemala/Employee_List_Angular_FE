import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "./employee";
import { environment } from "../environments/environment.development";

@Injectable({ providedIn: 'root'})
export class EmployeeService{
    private apiServiceURL = environment.apiBaseURL;

    constructor(private http:HttpClient){}

    public printURL(): void{
       console.log("This is the URL-> "+ this.apiServiceURL);
    }

    public getEmployees(): Observable<Employee[]>{
        console.log("Calling the GET employees fn")
        return this.http.get<Employee[]>(`${this.apiServiceURL}/all`);
    }


    public addEmployees(emp:Employee): Observable<Employee>{
        return this.http.post<Employee>(`${this.apiServiceURL}/employee/add`,emp);
    }

    public updateEmployees(emp:Employee): Observable<Employee>{
        return this.http.put<Employee>(`${this.apiServiceURL}/employee/update`,emp);
    }

    public deleteEmployees(empId:number): Observable<void>{
        return this.http.delete<void>(`${this.apiServiceURL}/employee/delete/{$empId}`);
    }


}
