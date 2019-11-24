import { Injectable } from '@angular/core';

@Injectable()
export class ProjectBgDetailsService {

  constructor() { }

  private bankGuarnteeDataStore: Array<BankGuarnteeDataFormat> = [
    { image_url: 'https://blog.ipleaders.in/wp-content/uploads/2018/04/What-is-Stamp-duty-and-What.jpg',
      title: 'For - Mobilisation Advance',
      contents: {
        id: 123,
        amount: 1000,
        start_date: new Date(),
        end_date: new Date()
      }
    },
	{ image_url: 'https://blog.ipleaders.in/wp-content/uploads/2018/04/What-is-Stamp-duty-and-What.jpg',
	title: 'For - Mobilisation Advance',
	contents: {
	  id: 123,
	  amount: 1000,
	  start_date: new Date(),
	  end_date: new Date()
	}
  },
  ];

  public getBankGuarnteeDetails(): Array<BankGuarnteeDataFormat> {
  	return this.bankGuarnteeDataStore.slice();
  }

}

export interface BankGuarnteeDataFormat {
	image_url: string;
	title: string;
	contents: { id: number, amount: number, start_date: Date, end_date: Date };
}
