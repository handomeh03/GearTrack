import { Component, effect, signal } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserService } from '../../services/userservice';
import { Error } from '../../components/Error/Error';

@Component({
  selector: 'checkouts-comp',
  standalone: true,
  imports: [Error],
  template: `
    <div>
      <div class="px-4 sm:px-6 lg:p-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-base font-semibold text-gray-900">Check outs</h1>
          </div>
        </div>
      </div>

      @if(UserService.itemsReservation().length==0 && error){
      <Error-comp [error]="error" />
      }@else{
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div
              class="overflow-hidden shadow outline outline-1 outline-black/5 sm:rounded-lg dark:shadow-none dark:-outline-offset-1"
            >
              <table class="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
                <thead class="bg-black">
                  <tr>
                    <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                      User
                    </th>
                    <th class="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Equipment
                    </th>
                    <th class="px-3 py-3.5 text-left text-sm font-semibold text-white">Code</th>
                    <th class="px-3 py-3.5 text-left text-sm font-semibold text-white">Category</th>
                    <th class="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Condition
                    </th>
                    <th class="px-3 py-3.5 text-left text-sm font-semibold text-white">Location</th>
                    <th class="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Start Date
                    </th>
                    <th class="px-3 py-3.5 text-left text-sm font-semibold text-white">End Date</th>
                    <th class="px-3 py-3.5 text-left text-sm font-semibold text-white">check in</th>
                    <th class="px-3 py-3.5 text-left text-sm font-semibold text-white">charge</th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-gray-800 bg-[#0a0a0a39]">
                  @for (itemReservation of UserService.itemsReservation(); track
                  itemReservation._id) {
                  <tr>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-black sm:pl-6">
                      {{ itemReservation.user.fullName || itemReservation.user || 'Unknown' }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-black">
                      {{ itemReservation.equipment?.name || 'Unknown' }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-black">
                      {{ itemReservation.equipment?.code || '-' }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-black">
                      {{ itemReservation.equipment?.category || '-' }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-black">
                      {{ itemReservation.equipment?.condition || '-' }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-black">
                      {{ itemReservation.equipment?.location || '-' }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-black">
                      {{ itemReservation.startDate.split('T')[0] || '-' }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-black">
                      {{ itemReservation.endDate.split('T')[0] || '-' }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-black">
                      <button
                        [disabled]="
                          itemReservation.equipment?.condition === 'needscharging' ||
                          itemReservation.equipment?.condition === 'available'
                        "
                        (click)="checkin(itemReservation.equipment._id)"
                        class="bg-black text-white p-3.5 rounded-2xl hover:bg-gray-500 hover:cursor-pointer"
                      >
                        check in
                      </button>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-black">
                      <button
                        [disabled]="itemReservation.equipment?.condition === 'available'"
                        (click)="putIncharge(itemReservation.equipment._id, itemReservation._id)"
                        class="bg-black text-white p-3.5 rounded-2xl hover:bg-gray-500 hover:cursor-pointer"
                      >
                        put in charge
                      </button>
                    </td>
                  </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <nav
        class="inline-flex items-center justify-center w-full mt-3  text-white space-x-2"
        aria-label="Pagination"
      >
        <button
          (click)="prePage()"
          class="inline-flex items-center justify-center h-10 px-3 rounded-md border border-gray-400 bg-black text-white text-sm font-medium hover:bg-white hover:text-black transition disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none">
            <path
              d="M12 15L7 10l5-5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <button
          (click)="nextPage()"
          class="inline-flex items-center justify-center h-10 px-3 rounded-md border border-gray-400 bg-black text-white text-sm font-medium hover:bg-white hover:text-black transition disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none">
            <path
              d="M8 5l5 5-5 5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </nav>

      }
    </div>
  `,
})
export class Checkouts implements OnInit {
  protected UserService: UserService;
  private token = localStorage.getItem('token') || '';
  private page = signal(1);
  private limit = signal(5);
  protected error: string = '';
  constructor(UserService: UserService) {
    this.UserService = UserService;
    effect(() => {
      this.page();
      this.limit();

      this.getItemReversationForOneStaff();
    });
  }

  ngOnInit(): void {
    this.UserService.itemsReservation.set([]);
  }

  nextPage() {
    this.page.set(this.page() + 1);
    this.UserService.itemsReservation.set([]);
  }

  prePage() {
    if (this.page() > 1) {
      this.page.set(this.page() - 1);
      this.UserService.itemsReservation.set([]);
    }
  }

  checkin(itemid: string) {
    this.UserService.checkin(this.token, itemid).subscribe({
      next: (res) => {
        this.getItemReversationForOneStaff();
      },
      error: (err) => {
        this.error = err.error.error;
      },
    });
  }

  putIncharge(itemId: string, itemReservationId: string) {
    this.UserService.putIncharge(this.token, itemId).subscribe({
      next: (res) => {
        const current = this.UserService.itemsReservation();
        this.UserService.itemsReservation.set(
          current.filter((e) => {
            return e._id != itemReservationId;
          })
        );
      },
      error: (err) => {
        this.error = err.error.error;
      },
    });
  }

  getItemReversationForOneStaff(): void {
    this.UserService.getItemReversation(
      this.token,
      String(this.page()),
      String(this.limit())
    ).subscribe({
      next: (res) => {
        console.log(res.itemsReservation);
        this.UserService.itemsReservation.set(res.itemsReservation);
      },
      error: (err) => {
        this.UserService.itemsReservation.set([]);
        this.error = err.error.error;
      },
    });
  }
}
