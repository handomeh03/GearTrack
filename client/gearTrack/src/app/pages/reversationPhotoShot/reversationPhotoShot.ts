import { Component, OnInit } from '@angular/core';
import { GuestService } from '../../services/GuestSevice';
import { Error } from '../../components/Error/Error';
import { assignStaffdialog } from '../Guest/AssignStaffDialog';

@Component({
  selector: 'reversationPhotoShot-comp',
  standalone: true,
  template: `
    @if(GuestService.photoshotReversation().length==0){
    <Error-comp [error]="error" />
    }@else {

    <div class="p-6 bg-[#0a0a0a] rounded-2xl max-w-full mx-auto shadow-lg">
      <h2 class="text-3xl font-extrabold mb-6 text-[#4eda2c] tracking-wide">Guest Reservations</h2>
      <div class="overflow-x-auto rounded-lg shadow-inner">
        <table class="min-w-full text-white">
          <thead
            class="bg-gradient-to-r from-[#0a0a0a]  via-[#0a0a0aa5] to-black border-b-2 border-white"
          >
            <tr>
              <th
                class="px-6 py-3 text-left text-sm font-semibold tracking-wide border-l border-white"
              >
                Full Name
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold tracking-wide border-l border-white"
              >
                Company Name
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold tracking-wide border-l border-white"
              >
                Location
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold tracking-wide border-l border-white"
              >
                Phone
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold tracking-wide border-l border-white"
              >
                Note
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold tracking-wide border-l border-white"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold tracking-wide border-l border-white"
              >
                Staff
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold tracking-wide border-l border-white"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold tracking-wide border-l border-white"
              >
                Assign Staff
              </th>
            </tr>
          </thead>
          <tbody>
            @for(PR of GuestService.photoshotReversation();track PR._id){
            <tr
              class="bg-[#0a0a0a]  text-white transition-colors duration-300 cursor-pointer shadow-sm hover:shadow-lg"
            >
              <td class="px-6 py-4 border-l border-white">{{ PR.fullName }}</td>
              <td class="px-6 py-4 border-l border-white">{{ PR.companyName }}</td>
              <td class="px-6 py-4 border-l border-white">{{ PR.shotLocation }}</td>
              <td class="px-6 py-4 border-l border-white">{{ PR.phoneNumber }}</td>
              <td class="px-6 py-4 border-l border-white">{{ PR.note }}</td>
              <td class="px-6 py-4 border-l border-white">{{ PR.date.split('T')[0] }}</td>
              <td class="px-6 py-4 border-l border-white">{{ PR.staff?.fullName }}</td>

              <td class="px-6 py-4 border-l border-white capitalize">{{ PR.status }}</td>
              <td class="px-6 py-4 border-l border-white">
                <button
                  (click)="changeFlag();selectStaff(PR._id)"
                  class="bg-[#4eda2c] cursor-pointer text-black font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transition-transform duration-200"
                >
                  Assign
                </button>
              </td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
    }

    <assignStaffdialog [assingFlag]="assingFlag" [changeFlag]="changeFlag" [selectedReversation]="selectedReversation"/>
  `,
  imports: [Error, assignStaffdialog],
})
export class reversationPhotoShot implements OnInit {
  assingFlag: boolean = false;
  selectedReversation:string="";
  private token = localStorage.getItem('token') || '';
  error: string = '';


  constructor(protected GuestService: GuestService) {}

  ngOnInit(): void {
    this.getAllreversationForAdmin();

  }

  changeFlag = () => {
    this.assingFlag = !this.assingFlag;
  };
  selectStaff(id:string){
    this.selectedReversation=id;
  }

  getAllreversationForAdmin() {
    this.GuestService.getAllreversationPhotoShot(this.token).subscribe({
      next: (res) => {
        this.GuestService.photoshotReversation.set(res.reservephotoshoots);
        console.log(res.reservephotoshoots);
      },
      error: (err) => {
        this.error = err.error.error;
        console.log(this.error);
      },
    });
  }
}
