import { Component, effect, OnInit, signal } from "@angular/core";
import { UserService } from "../../services/userservice";
import { Error } from "../../components/Error/Error";

@Component({
    selector:"auditLog",
    standalone:true,
    imports:[Error],
    template:`
      
 <div class="px-4   sm:px-6 lg:p-8">
  <div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
      <h1 class="text-base font-semibold text-gray-900 ">Audit Log</h1>
      
    </div>
    
  </div>
   @if(this.UserService.auditLogs().length==0){
   <Error-comp [error]="error"/>
}@else {
    <div class="mt-8 flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow outline outline-1 outline-black/5 sm:rounded-lg dark:shadow-none dark:-outline-offset-1 ">
          <table class="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
            <thead class="bg-[#0a0a0a]">
  <tr>
    <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-6">User</th>
    <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">Action</th>
    <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">Collection</th>
    <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">Document ID</th>
    <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">Created At</th>
  </tr>
</thead>

        <tbody class="divide-y divide-gray-800 bg-[#0a0a0a39]">
          @for (log of UserService.auditLogs(); track log._id) {
                <tr>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-black sm:pl-6">
                    {{ log.user?.fullName || 'Unknown' }}
                    </td>

                    <td class="whitespace-nowrap px-3 py-4 text-sm text-black">
                    {{ log?.action }}
                    </td>

                    <td class="whitespace-nowrap px-3 py-4 text-sm text-black">
                    {{ log?.collectionName }}
                    </td>

                    <td class="whitespace-nowrap px-3 py-4 text-sm text-black">
                    {{ log?.documentId }}
                    </td>

                    <td class="whitespace-nowrap px-3 py-4 text-sm text-black">
                    {{ log.createdAt.split("T")[0] || "unkown" }}
                    </td>
                </tr>
}

       </tbody>

          </table>
        </div>
      </div>
    </div>
  </div>
  <nav class="inline-flex items-center justify-center w-full mt-3  text-white space-x-2" aria-label="Pagination">

  
  <button
    (click)="prePage()"
    class="inline-flex items-center justify-center h-10 px-3 rounded-md border border-gray-400 bg-black text-white text-sm font-medium hover:bg-white hover:text-black transition disabled:opacity-40 disabled:cursor-not-allowed"
    aria-label="Previous page"
  >
    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none">
      <path d="M12 15L7 10l5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>

  


  
  <button
   (click)="nextPage()"
    class="inline-flex items-center justify-center h-10 px-3 rounded-md border border-gray-400 bg-black text-white text-sm font-medium hover:bg-white hover:text-black transition disabled:opacity-40 disabled:cursor-not-allowed"
    aria-label="Next page"
  >
    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none">
      <path d="M8 5l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>

</nav>

   }


</div>




    `
})
export class auditlog implements OnInit {
 protected UserService:UserService;
 private token=localStorage.getItem("token") || "";

 error:string="";

 page=signal(1);
 limit=signal(5);

constructor(UserService: UserService) {
    this.UserService = UserService;

    effect(() => {
      this.page();
      this.limit();
      this.getAuditLog();
    });
  }

   ngOnInit(): void{
      this.UserService.auditLogs.set([]);
    }
   

  nextPage() {
    this.page.set(this.page()+1);
    this.UserService.auditLogs.set([]);
  }

  prePage() {
    if (this.page() > 1) {
      this.page.set(this.page()-1);
      this.UserService.auditLogs.set([]);
    }
  }


getAuditLog() {
  this.UserService
    .getAuditLog(this.token, String(this.page()), String(this.limit()))
    .subscribe({
      next: (res) => {
        this.UserService.auditLogs.set(res.auditLog);
        
        
      },
      error: (err) => { 
        this.error=err.error.error;
      }
    });
}


 
}