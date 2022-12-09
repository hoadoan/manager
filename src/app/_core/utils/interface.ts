import { DateLocale } from 'ng-zorro-antd/i18n';

export interface Customer {
  userId: number;
  fullName: string;
  phoneNumber: number;
  createdAt: string;
  isActive: boolean;
}

export interface InfoCustomer {
  items: [
    {
      id: number;
      fullName: string;
      totalPoint: number;
      phoneNumber: number;
      createdAt: string;
      createBy: string;
      isActive: boolean;
      updatedAt: string;
      updatedBy: string;
    }
  ];
  pageSize: number;
  totalRecords: number;
  pageCount: number;
}

export interface Profile {
  avatar: string;
  createdAt: string;
  dateOfBirth: String;
  fullname: string;
  isActive: boolean;
  isMale: boolean;
  phoneNumber: string;
  userId: number;
}

export interface ManagerInterface {
  email?: string;
  isAdmin?: boolean;
  user?: {
    id: number;
    fullname: string;
    createDate: string;
    updateDate: string;
    avatar: string;
    phoneNumber: string;
    genderId: number;
    dateOfBirth: string;
    isBan: boolean;
    banDate: string;
    gender: boolean;
  };
}

export interface StaffInterface {
  avatar: string;
  createdAt: string;
  dateOfBirth: String;
  fullname: string;
  isActive: boolean;
  isMale: boolean;
  phoneNumber: string;
  userId: number;
  userAccount: string;
  email: string;
}

export interface CreateStaffInterface {
  loginName: string;
  password: string;
  passwordConfirm: string;
  fullname: string;
  avatar: string;
  dob: Date;
  phoneNumber: string;
  isMale: boolean;
}

export interface Brand {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
  };
}

export interface Shelf {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
  };
  updatedAt: string;
  updatedBy: string;
}

export interface Unit {
  id: string;
  name: string;
}

export interface routeOfAdministration {
  id: string;
  name: string;
}

export interface ActiveSubstance {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface Medicine {
  id: number;
  drugRegistrationNumber: string;
  barcode: string;
  name: string;
  brand: {
    id: number;
    name: string;
  };
  shelf: {
    id: number;
    name: string;
  };
  routeOfAdministration: {
    id: number;
    name: string;
  };
  mininumInventory: number; //mức tồn kho tối thiểu
  isUseDose: boolean; // bán theo liều
  isManagedInBatches: boolean; // quản lý theo lô, hạn sử dụng
  isActive: boolean;
  createdAt: string;
  createdBy: {
    id: number;
    name: string;
  };
  updatedAt: string;
  updatedBy: string;
  activeSubstances: [
    {
      id: number;
      name: string;
    }
  ];
  productUnits: [
    {
      id: number;
      productId: number;
      unit: string;
      conversionValue: number;
      price: number;
      isPackingSpecification: boolean;
      isDoseBasedOnBodyWeightUnit: boolean;
      isBaseUnit: boolean;
      isActive: boolean;
      createdAt: string;
      createdBy: string;
      updatedAt: string;
      updatedBy: string;
    }
  ];
  batches: [
    {
      id: number;
      batchBarcode: string;
      product: {
        id: number;
        name: string;
      };
      currentQuantity: [
        {
          id: number;
          unit: string;
          currentQuantity: number;
        }
      ];
      manufacturingDate: string;
      expiryDate: string;
      isActive: boolean;
      createdAt: string;
      createdBy: { id: number; name: string };
      updatedAt: string;
      updatedBy: string;
    }
  ];
}

export interface CreateMedicine {
  drugRegistrationNumber: string; //số đăng kí
  name: string; // tên thuốc
  brandId: number; // mã nhà sản xuất
  shelfId: number; // mã kệ thuốc
  minimumQuantity: number; //mức tồn kho tối thiểu
  routeOfAdministrationId: number; // đường dùng
  isUseDose: boolean; // bán theo liều
  isManagedInBatches: boolean; // quản lý theo lô, hạn sử dụng
  activeSubstances: []; // hoạt chất
  unit: string; // đơn vị cơ sở
  price: number; // giá bán
  isPackingSpecification: boolean; // hiển thị quy cách đóng gói
  isDoseBasedOnBodyWeightUnit: boolean; // đơn vị liều dùng
  productUnits: {
    unit: string;
    conversionValue: number; // giá trị quy đổi
    price: number;
    isPackingSpecification: boolean;
    isDoseBasedOnBodyWeightUnit: boolean;
  };
}

export interface Supplier {
  id: string;
  name: string;
  phoneNumber: string;
  isActive: boolean;
  createdAt: string;
  createBy: {
    id: string;
    name: string;
  };
  updatedAt: string;
  updatedBy: string;
}

export interface GoodReceiptNote {
  id: number;
  goodsReceiptNoteType: {
    id: string;
    name: string;
  };
  batch: {
    id: number;
    barcode: string;
    manufacturingDate: string;
    expiryDate: string;
  };
  invoiceId: string;
  supplier: {
    id: number;
    name: string;
    isActive: boolean;
  };
  quantity: number;
  unit: string;
  totalPrice: number;
  convertedQuantity: number;
  baseUnitPrice: number;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
  };
  note: [];
}

export interface InvoiceById {

  id: number;
  barcode: string
  customer: {
    id: number;
    phoneNumber: string;
    fullName: string;
  };
  bodyWeight: string;
  dayUse: string;
  totalPrice: number;
  discount: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
  };
}

export interface InvoiceDetail {
  id: number;
  product: {
    id: number;
    name: string;
  };
  dose: string;
  unitDose: string;
  frequency: string;
  dayUse: string;
  use: string;
  goodsIssueNoteType: {
    id: number;
    name: string;
  };
  batch: {
    id: number;
    name: string;
  };
  quantity: number;
  unit: string;
  unitPrice: number;
  convertedQuantity: number;
  totalPrice: number;
}

export interface BatchInfo {
  id: number;
  batchBarcode: string;
  product: {
    id: number;
    name: string;
  };
  currentQuantity: {
    id: number;
    unit: string;
    currentQuantity: number;
  };
  manufacturingDate: string;
  expiryDate: string;
  isActive: boolean;
  createdAt: string;
  createdBy: {
    id: number;
    name: string;
  };
  updatedAt: string;
  updatedBy: string;
}

export interface GoodIssueNote {
  id: number;
  goodsIssueNoteType: {
    id: string;
    name: string;
  };
  batch: {
    id: number;
    name: string;
  };
  invoiceId: string;
  supplier: {
    id: number;
    name: string;
  };
  quantity: number;
  unit: string;
  totalPrice: number;
  convertedQuantity: number;
  unitPrice: number;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
  };
}

export interface SaleInfo {
  quantityOrder: number;
  percentQuantityOrder: number;
  cost: number;
  percentCost: number;
  turnover: number;
  percentTurnover: number;
  profit: number;
  percentProfit: number;
}

export interface TopSelling {
  productId: number;
  productName: string;
  price: number;
  sold: number;
  unit: string;
  revenue: number;
}

export interface ActiveSubstances{
  id: number,
  name: string,
  isActive: boolean
}

export interface listNoti{
  id: number,
  batchId: number,
  productId: number,
  title: string,
  content: string,
  isRead: boolean,
  createdAt: string
}

export interface Noti{
  notiDate: string,
  listNotiBatch:{
    title: string,
    listNotification: [listNoti]
  },
  listNotiQuantity:{
    title: string,
    listNotification: [listNoti]
  }
}

// export interface listLine{
//   name: string,
//   type: string,
//   data:[
//     string
//   ]
// }

// export interface listDate{
//   data: string
// }

// export interface dataChart{
//   listLine: listLine[],
//   listDate: listDate[]
// }
