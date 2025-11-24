import { Component, Input, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UserService } from "../../services/userservice";
import { EquipmentSevice } from "../../services/Equipment";
import { Error } from "../Error/Error";

@Component({
    selector:"checkout-dialog",
    standalone:true,
    imports: [FormsModule, Error],
    template:`
    @if(checkoutFlag){
                        <div 
  
     class="fixed inset-0 bg-[#0000004a] bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6"
>
  
  <div 
    class="bg-[#0a0a0a] text-white rounded-lg w-full max-w-md sm:max-w-lg md:max-w-xl p-6 shadow-lg relative overflow-y-auto max-h-[90vh]"
  >
    <h2 class="text-xl sm:text-2xl font-bold mb-4">check out</h2>

    
    <div class="mb-3">
      <label class="block text-sm font-medium">Start date</label>
      <input 
        [(ngModel)]="startDate" 
        type="date" 
        class="mt-1 w-full p-2 rounded border border-white/20 bg-[#0a0a0a] text-white focus:outline-none focus:border-[#4eda2c] focus:ring-[#4eda2c]"
      />
    </div>

    
    <div class="mb-3">
      <label class="block text-sm font-medium">End date</label>
      <input 
        [(ngModel)]="endDate" 
        type="date" 
        class="mt-1 w-full p-2 rounded border border-white/20 bg-[#0a0a0a] text-white focus:outline-none focus:border-[#4eda2c] focus:ring-[#4eda2c]"
      />
    </div>

     <div class="flex flex-col sm:flex-row justify-end gap-3">
      <button (click)="onclosecheckoutDialog()"   class="px-4 py-2 bg-white/10 rounded hover:bg-white/20 w-full sm:w-auto">Cancel</button>
      <button (click)="checkout()"  class="px-4 py-2 bg-[#4eda2c] rounded hover:bg-[#40c325] text-white w-full sm:w-auto">check out</button>
    </div>
     @if(error){
      <Error-comp [error]="error"/>
     }
  </div>
</div>
    }

    
    `
})
export class checkoutDialog{
  startDate=signal<string>("");
  endDate=signal<string>("");
  token=localStorage.getItem("token") || "";

  error:string="";

  @Input ({required:true}) onclosecheckoutDialog !: ()=>void;
  @Input({required:true}) onOpencheckoutdialog !:()=>void;
  @Input ({required:true}) itemId !:string;
  @Input ({required:true}) checkoutFlag !:boolean;


  constructor(private UserService:UserService,private EquipmentSevice:EquipmentSevice){}


  checkout(){
    
    this.UserService.checkout(this.token,this.itemId,this.startDate(),this.endDate()).subscribe({
         next:(res)=>{
           const current =this.EquipmentSevice.Equipment();
             this.EquipmentSevice.Equipment.set(current.filter((e)=>{
                return e._id != res.item.equipment._id;
             }));
             this.EquipmentSevice.orginalEquipment.set(current.filter((e)=>{
                return e._id != res.item.equipment._id;
             }))
         },
         error:(err)=>{
            this.error=err.error.error;
         }           
    })
  }



}