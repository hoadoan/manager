import { Router } from '@angular/router';
import { ProductService } from '../../../../../_core/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/_core/utils/interface';

@Component({
  selector: 'app-list-medicine-inactive',
  templateUrl: './list-medicine-inactive.component.html',
  styleUrls: ['./list-medicine-inactive.component.css']
})
export class ListMedicineInactiveComponent implements OnInit {
  searchDataAS: string = '';
  searchDataBrand: string = '';
  searchDataSupplier: string = '';
  listProductWithASInactive: Medicine[] = [];
  listProductWithBrandInactive: Medicine[] = [];
  listProductWithSupplierInactive: Medicine[] = [];
  listSearchAS : Medicine[] =[]
  searchValueAS: string = '';
  selectedProvinceAS: string = 'searchID';
  loadingAS: boolean = true
  listSearchBrand : Medicine[] =[]
  searchValueBrand: string = '';
  loadingBrand: boolean = true
  selectedProvinceBrand: string = 'searchID';
  listSearchSupplier : Medicine[] =[]
  searchValueSupplier: string = '';
  selectedProvinceSupplier: string = 'searchID';
  loadingSupplier: boolean = true
  width: number = 1;
  height: number = 50;
  constructor(
    private product: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // get inactive product because brand
    this.product.getAllProductIsBrandInactive().subscribe((result) => {
      console.log(result.data);
      this.listProductWithBrandInactive = result.data;
      this.listSearchBrand = this.listProductWithBrandInactive;
      this.loadingBrand = false;
    });

    // get inactive product because supplier
    this.product.getAllProductIsSupplierInactive().subscribe((result) => {
      console.log(result);
      this.listProductWithSupplierInactive = result.data;
      this.listSearchSupplier = this.listProductWithSupplierInactive;
      this.loadingSupplier = false;
    });

    // get inactive product because activeSubstance
    this.product.getAllProductIsActiveSubstanceInactive().subscribe((result) => {
      console.log(result);
      this.listProductWithASInactive = result.data;
      this.listSearchAS = this.listProductWithASInactive;
      this.loadingAS = false;
    });
  }

  SearchOptionAS(value: string) {
    this.selectedProvinceAS = value;
    console.log(this.selectedProvinceAS);
  }
  SearchOptionBrand(value: string) {
    this.selectedProvinceBrand = value;
    console.log(this.selectedProvinceSupplier);
  }
  SearchOptionSupplier(value: string) {
    this.selectedProvinceSupplier = value;
    console.log(this.selectedProvinceSupplier);
  }

  getListSearchAS() {
    console.log(this.searchDataAS);

    if (this.selectedProvinceAS == 'searchBarcode') {
      this.listSearchAS = this.listProductWithASInactive.filter((data) =>
        data.barcode.toString().includes(this.searchDataAS.toLocaleLowerCase())
      );
    } else if (this.selectedProvinceAS == 'SearchName') {
      this.listSearchAS = this.listProductWithASInactive.filter((data) =>
        data.name
          .toLocaleLowerCase()
          .includes(this.searchDataAS.toLocaleLowerCase())
      );
    } else if (this.selectedProvinceAS == 'searchID') {
      this.listSearchAS = this.listProductWithASInactive.filter((data) =>
        data.drugRegistrationNumber
          .toLocaleLowerCase()
          .includes(this.searchDataAS.toLocaleLowerCase())
      );
    }
  }

  // search for list product have inactive brand
  getListSearchBrand() {
    console.log(this.searchDataBrand);

    if (this.selectedProvinceBrand == 'searchBarcode') {
      this.listSearchBrand = this.listProductWithBrandInactive.filter((data) =>
        data.barcode.toString().includes(this.searchDataBrand.toLocaleLowerCase())
      );
    } else if (this.selectedProvinceBrand == 'SearchName') {
      this.listSearchBrand = this.listProductWithBrandInactive.filter((data) =>
        data.name
          .toLocaleLowerCase()
          .includes(this.searchDataBrand.toLocaleLowerCase())
      );
    } else if (this.selectedProvinceBrand == 'searchID') {
      this.listSearchBrand = this.listProductWithBrandInactive.filter((data) =>
        data.drugRegistrationNumber
          .toLocaleLowerCase()
          .includes(this.searchDataBrand.toLocaleLowerCase())
      );
    }
  }

  // search for list product have inactive supplier
  getListSearchSupplier() {
    console.log(this.searchDataSupplier);

    if (this.selectedProvinceSupplier == 'searchBarcode') {
      this.listSearchSupplier = this.listProductWithSupplierInactive.filter((data) =>
        data.barcode.toString().includes(this.searchDataSupplier.toLocaleLowerCase())
      );
    } else if (this.selectedProvinceSupplier == 'SearchName') {
      this.listSearchSupplier = this.listProductWithSupplierInactive.filter((data) =>
        data.name
          .toLocaleLowerCase()
          .includes(this.searchDataSupplier.toLocaleLowerCase())
      );
    } else if (this.selectedProvinceSupplier == 'searchID') {
      this.listSearchSupplier = this.listProductWithSupplierInactive.filter((data) =>
        data.drugRegistrationNumber
          .toLocaleLowerCase()
          .includes(this.searchDataSupplier.toLocaleLowerCase())
      );
    }
  }
  detail(id: number) {
    this.router.navigate(['dashboard/detail-medicine/' + id]);
    console.log('dashboard/detail-medicine/' + id);
  }
}
