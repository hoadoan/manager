import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-sample-prescription',
  templateUrl: './list-sample-prescription.component.html',
  styleUrls: ['./list-sample-prescription.component.css']
})
export class ListSamplePrescriptionComponent implements OnInit {

  listSample : any[] = []
  listMedicine: any[] = []

  listSick= [
  {
    id: 1,
    name: 'Bệnh 1',
    sample:[
    {
      id: 1,
      name: 'Đơn mẫu 1',
      medicine:[
      {
        id: 1,
        name: 'medicine 1',
        quantity: 2,
        unit: 'viên'
      },
      {
        id: 2,
        name: 'medicine 2',
        quantity: 2,
        unit: 'viên'
      },
    ],
    },
    {
      id: 2,
      name: 'Đơn mẫu 2',
      medicine:[
      {
        id: 3,
        name: 'medicine 3',
        quantity: 2,
        unit: 'viên'
      },
      {
        id: 4,
        name: 'medicine 4',
        quantity: 2,
        unit: 'viên'
      }],
    }
  ],
  },
  {
    id: 2,
    name: 'Bệnh 2',
    sample:[
    {
      id: 1,
      name: 'Đơn mẫu 3',
      medicine:[
      {
        id: 5,
        name: 'medicine 5',
        quantity: 2,
        unit: 'viên'
      },
      {
        id: 6,
        name: 'medicine 6',
        quantity: 2,
        unit: 'viên'
      },
    ],
    },
    {
      id: 2,
      name: 'Đơn mẫu 4',
      medicine:[
      {
        id: 7,
        name: 'medicine 7',
        quantity: 2,
        unit: 'viên'
      },
      {
        id: 8,
        name: 'medicine 8',
        quantity: 2,
        unit: 'viên'
      }],
    }
  ],
  },
  {
    id: 1,
    name: 'Bệnh 1',
    sample:[
    {
      id: 1,
      name: 'Đơn mẫu 1',
      medicine:[
      {
        id: 1,
        name: 'medicine 1',
        quantity: 2,
        unit: 'viên'
      },
      {
        id: 2,
        name: 'medicine 2',
        quantity: 2,
        unit: 'viên'
      },
    ],
    },
    {
      id: 2,
      name: 'Đơn mẫu 2',
      medicine:[
      {
        id: 3,
        name: 'medicine 3',
        quantity: 2,
        unit: 'viên'
      },
      {
        id: 4,
        name: 'medicine 4',
        quantity: 2,
        unit: 'viên'
      }],
    }
  ],
  },
  {
    id: 3,
    name: 'Bệnh 2',
    sample:[
    {
      id: 1,
      name: 'Đơn mẫu 3',
      medicine:[
      {
        id: 5,
        name: 'medicine 5',
        quantity: 2,
        unit: 'viên'
      },
      {
        id: 6,
        name: 'medicine 6',
        quantity: 2,
        unit: 'viên'
      },
    ],
    },
    {
      id: 4,
      name: 'Đơn mẫu 4',
      medicine:[
      {
        id: 7,
        name: 'medicine 7',
        quantity: 2,
        unit: 'viên'
      },
      {
        id: 8,
        name: 'medicine 8',
        quantity: 2,
        unit: 'viên'
      }],
    }
  ],
  }
  ]


  constructor() { }

  detailSick(id: number){
    this.listMedicine = []
    this.listSick.forEach(element => {
      if(element.id == id){
        this.listSample = element.sample
      }
    });
  }

  detailMedicine(id: number){
    this.listSample.forEach(element => {
      if(element.id == id){
        this.listMedicine = element.medicine
      }
    });
  }

  ngOnInit(): void {
  }

}
