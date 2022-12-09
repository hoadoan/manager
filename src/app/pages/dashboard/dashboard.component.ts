import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SaleInfo, TopSelling } from './../../_core/utils/interface';
import { DashboardService } from './../../_core/services/dashboard/dashboard.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  // recent-sales
  day: boolean = false;
  month: boolean = false;
  year: boolean = true;
  size: number = 20;
  recentSales: any[] = [];

  // Top selling
  Tsize: number = 20;
  topSellingDay: TopSelling[] = [];
  topSellingMonth: TopSelling[] = [];
  topSellingYear: TopSelling[] = [];
  topSelling: TopSelling[] = [];

  getTypeText: string = "Hôm nay"

  getTypeChart: string = ""

  // sale info
  saleInfo: SaleInfo[] = [];
  quantityOrder: number = 0;
  cost: number = 0;
  costStr: string = '';
  turnover: number = 0;
  turnoverStr: string = '';
  profit: number = 0;
  profitStr: string = '';

  chartData: any[] = []
  dataAxis: any[] = []

  chartWeek: any[] = []
  dataAxisWeek: any[] = []

  chartMonth: any[] = []
  dataAxisMonth: any[] = []

  chartYear: any[] = []
  dataAxisYear: any[] = []

  constructor(
    private elementRef: ElementRef,
    private dashboard: DashboardService,
    private router: Router,
    public datepipe: DatePipe
  ) {}

  option: echarts.EChartsOption = {
    animationEnabled: true,

    // title: {
    //   text: 'Biểu đồ tuần này',

    // },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Chi phí', 'Doanh thu', 'Lợi nhuận'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {},
    //   },
    // },

    yAxis: {
      type: 'value',
      name: "Tiền(đ)"
    },

  };
  option_Month: echarts.EChartsOption = {
    animationEnabled: true,
    // title: {
    //   text: 'Biểu đồ tháng này'
    // },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Chi phí', 'Doanh thu', 'Lợi nhuận'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {},
    //   },
    // },

    yAxis: {
      type: 'value',
      name: "Tiền(đ)"
    },

  };
  option_Year: echarts.EChartsOption = {
    animationEnabled: true,
    // title: {
    //   text: 'Biểu đồ năm nay'
    // },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Chi phí', 'Doanh thu', 'Lợi nhuận'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {},
    //   },
    // },

    yAxis: {
      type: 'value',
      name: "Tiền(đ)"
    },

  };


  ngOnInit(): void {

    // 4 first
     this.dashboard.getSaleInfo().subscribe((result) => {
      const configMoney = { style: 'currency', currency: 'VND' ,maximumFractionDigits: 3, maximumSignificantDigits: 6, }
      this.saleInfo = result.data;
      console.log(result.data);
      this.quantityOrder = result.data.quantityOrder;

      // this.cost = result.data.cost;
      this.costStr = new Intl.NumberFormat('vi-VN', configMoney).format(result.data.cost)

      // this.turnover = result.data.turnover;
      this.turnoverStr = new Intl.NumberFormat('vi-VN', configMoney).format(result.data.turnover)

      // this.profit = result.data.profit;
      this.profitStr = new Intl.NumberFormat('vi-VN', configMoney).format(result.data.profit)

    });


    // chart
    this.dashboard.getChartByWeek().subscribe((result)=>{
      // this.option.series = result.data.listLine
      result.data.listDate.forEach((element:any) => {
        this.dataAxis.push(this.datepipe.transform(element.date, 'dd-MM'))
      });
      // this.option.xAxis = {
      //   boundaryGap: false,
      //   data: this.dataAxis,
      //   name: 'Ngày'
      // }
      // this.option.animationDuration = 10000
      this.option = {
        xAxis: {
          boundaryGap: false,
          data: this.dataAxis,
          name: 'Ngày'
        },
        series: result.data.listLine,
        animationEnabled: true,

        // title: {
        //   text: 'Biểu đồ tuần này',

        // },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['Chi phí', 'Doanh thu', 'Lợi nhuận'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {},
        //   },
        // },

        yAxis: {
          type: 'value',
          name: "Tiền(đ)"
        },

      }
    })

    this.dashboard.getChartByMonth().subscribe((result)=>{
      this.option_Month.series = result.data.listLine
      this.dataAxisMonth = []
      result.data.listDate.forEach((element:any) => {
        this.dataAxisMonth.push(this.datepipe.transform(element.date, 'dd-MM'))
      });
      this.option_Month.xAxis = {
        boundaryGap: false,
        data: this.dataAxisMonth,
        name: 'Ngày'
      }
      this.option_Month.animationDuration = 10000
    })

    this.dashboard.getChartByYear().subscribe((result)=>{
      this.option_Year.series = result.data.listLine
      this.dataAxisYear = []
      result.data.listDate.forEach((element:any) => {
        this.dataAxisYear.push(this.datepipe.transform(element.date, 'MM'))
      });
      this.option_Year.xAxis = {
        boundaryGap: false,
        data: this.dataAxisYear,
        name: 'Tháng'
      }
      this.option_Year.animationDuration = 10000

    })
    this.getTypeChart = "Tuần này"

    // recent sell
    this.dashboard
      .getRecentSales(this.day, this.month, this.year, this.size)
      .subscribe((result) => {
        this.recentSales = result.data;
        console.log(result.data);
      });

    // top sell
    this.dashboard
      .getTopSellingDay(this.Tsize)
      .subscribe((result) => {
        this.topSellingDay = result.data;
        this.topSelling = this.topSellingDay
        console.log(result.data);
      });
      this.dashboard
      .getTopSellingMonth(this.Tsize)
      .subscribe((result) => {
        this.topSellingMonth = result.data;
        console.log(result.data);
      });
      this.dashboard
      .getTopSellingYear(this.Tsize)
      .subscribe((result) => {
        this.topSellingYear = result.data;
        console.log(result.data);
      });

    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../assets/js/main.js';
    this.elementRef.nativeElement.appendChild(s);


  }

  detailRecentSale(id: number) {
    this.router.navigate(['dashboard/detail-invoice/' + id])
  }

  detailProduct(id: number){
    this.router.navigate(['dashboard/detail-medicine/' + id])
  }

  // filter top selling
  changeListTopSelling(getType: string){
    if(getType == "day"){
      this.getTypeText = "Hôm nay"
      this.topSelling = this.topSellingDay
    }else if(getType == "month"){
      this.getTypeText = "Tháng này"
      this.topSelling = this.topSellingMonth
    }else if(getType == "year"){
      this.getTypeText = "Năm nay"
      this.topSelling = this.topSellingYear
    }
  }

  // filter chart
  changeListChart(getType: string){
    if(getType == "Week"){
      this.getTypeChart = "Tuần này"

    }else if(getType == "Month"){
      this.getTypeChart = "Tháng này"

    }else if(getType == "Year"){
      this.getTypeChart = "Năm nay"
    }
  }

}
