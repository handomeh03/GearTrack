import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/userservice";
import { FormsModule } from "@angular/forms";
import { Error } from "../../components/Error/Error";

@Component({
    selector:"Photoshot-comp",
    standalone:true,
    imports: [FormsModule, Error],
    template:`
  <div class="p-6 max-w-md mx-auto bg-[#0a0a0a] rounded-xl shadow-md space-y-4  ">

  <h2 class="text-xl text-white font-bold mb-4">Reservation Form</h2>

  
  <label class="block">
    <span class="text-white">Select staff:</span>
    <select
      [(ngModel)]="selectedStaffId"
      class="mt-1 text-white block w-full border rounded-lg p-2"
    >
      <option class="text-white bg-black" value="">Choose a staff</option>

      @for (user of UserService.avaibaleStaff(); track user._id) {
        <option class="text-white bg-black" [value]="user._id">
           {{ user.fullName }}
       </option>
       }
     
    </select>
  </label>

  
  <label class="block">
    <span class="text-white">Select Date:</span>
    <input
      type="date"
      
      [(ngModel)]="selectedDate"
      class="mt-1 block text-white w-full border rounded-lg p-2"
    />
  </label>

 
  <button
    (click)="staffReversation()"
    class="w-full bg-[#4eda2c] text-white py-2 rounded-lg hover:bg-[#4fda2cb4] hover:cursor-pointer "
  >
    Submit
  </button>
  @if(error){
    <Error-comp [error]="error"/>
  }
</div>


    `
})
export class ReverstationStaff implements OnInit{
 token=localStorage.getItem("token") || "";
 selectedDate:string="5/5/2020";
 selectedStaffId:string="";
 error:string="";


 constructor(protected UserService:UserService){}
 ngOnInit(): void {
     this.getavaibalUser();
 }

 getavaibalUser(){   
    this.UserService.getAvaibleStaff(this.token).subscribe({
        next:(res)=>{
            this.UserService.avaibaleStaff.set(res.avaibleUser);
            
        },
        error:(err)=>{
              this.error=err.error.error;
        }
    })
 }

 staffReversation(){
    
    this.UserService.StaffReversation(this.token,new Date(this.selectedDate).toISOString(),this.selectedStaffId).subscribe({
        next:(res)=>{
               alert("the email is send");
               this.error="";
        },
        error:(err)=>{
            this.error=err.error.error;
        }
    })
 }
}