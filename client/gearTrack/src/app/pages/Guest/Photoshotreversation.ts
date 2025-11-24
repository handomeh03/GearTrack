import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Error } from "../../components/Error/Error";
import { GuestService } from "../../services/GuestSevice";

@Component({
    selector:"PhotoShot-comp",
    standalone:true,
    imports: [FormsModule, Error],
    template:`
      
<form method="POST" class="space-y-6 bg-gradient-to-br  bg-black  w-1/2 mx-auto p-8 rounded-3xl shadow-2xl border border-gray-700">
  
  
  <div class="flex flex-col sm:flex-row gap-4">
    <div class="flex-1">
      <label for="fUllName" class="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
      <input 
       [(ngModel)]="fullName"
        id="fUllName" 
        type="text" 
        name="fUllName" 
        required 
        autocomplete="fUllName"
        placeholder="Enter your full name"
        class="block w-full rounded-xl px-4 py-3 text-base text-white border border-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#4fda2c] focus:border-transparent shadow-inner transition-all duration-300"
      />
    </div>

    <div class="flex-1">
      <label for="companyName" class="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
      <input 
      [(ngModel)]="companyName"
        id="companyName" 
        type="text" 
        name="companyName" 
        required 
        placeholder="Enter company name"
        class="block w-full rounded-xl px-4 py-3 text-base text-white  border border-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#4fda2c] focus:border-transparent shadow-inner transition-all duration-300"
      />
    </div>
  </div>

  
  <div class="flex flex-col sm:flex-row gap-4">
    <div class="flex-1">
      <label for="shotLocation" class="block text-sm font-medium text-gray-300 mb-1">Shot Location</label>
      <input 
       [(ngModel)]="shotLocation"
        id="shotLocation" 
        type="text" 
        name="shotLocation" 
        required 
        placeholder="Enter the location"
        class="block w-full rounded-xl px-4 py-3 text-base text-white  border border-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#4fda2c] focus:border-transparent shadow-inner transition-all duration-300"
      />
    </div>

    <div class="flex-1">
      <label for="phoneNumber" class="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
      <input 
      [(ngModel)]="phoneNumber"
        id="phoneNumber" 
        type="tel" 
        name="phoneNumber" 
        required 
        placeholder="Enter your phone number"
        class="block w-full rounded-xl px-4 py-3 text-base text-white  border border-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#4fda2c] focus:border-transparent shadow-inner transition-all duration-300"
      />
    </div>
  </div>

  
  <div>
    <label for="note" class="block text-sm font-medium text-gray-300 mb-1">Note</label>
    <textarea 
    [(ngModel)]="note"
      id="note" 
      name="note" 
      rows="3" 
      required 
      placeholder="Write your note here"
      class="block w-full rounded-xl px-4 py-3 text-base text-white  border border-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#4fda2c] focus:border-transparent shadow-inner transition-all duration-300"
    ></textarea>
  </div>

  
  <div>
    <label for="date" class="block text-sm font-medium text-gray-300 mb-1">Date</label>
    <input 
    [(ngModel)]="date"
      id="date" 
      type="date" 
      name="date" 
      required
      class="block w-full rounded-xl px-4 py-3 text-base text-white  border border-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#4fda2c] focus:border-transparent shadow-inner transition-all duration-300"
    />
  </div>

  
  <div class="mt-6">
    <button
    (click)="onsubmit()" 
      type="submit" 
      class="w-1/2 mx-auto flex justify-center py-3 px-6 rounded-xl bg-[#4eda2c] text-white font-bold text-lg shadow-lg hover:bg-[#3fc12a] hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-[#4eda2c]/50"
    >
      Submit
    </button>
  </div>
  @if(error){
    <Error-comp [error]="error"/>
  }
</form>



    `
})
export class PhotoShot{
fullName:string="";
companyName:string="";
shotLocation:string="";
phoneNumber:string="";
note:string="";
date:string="5/5/2025";

error:string="";

constructor(private GuestService:GuestService){}


onsubmit(){
    const body={fullName:this.fullName,companyName:this.companyName,shotLocation:this.shotLocation,phoneNumber:this.phoneNumber,note:this.note,date:new Date(this.date).toISOString()};
  this.GuestService.guestReversation(body).subscribe({
    next:(res)=>{
      alert("success");
      this.error="";
    },
    error:(err)=>{
      this.error=err.error.error;
    }
  })
}
}