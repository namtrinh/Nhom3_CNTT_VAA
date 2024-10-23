import { Component, OnInit } from '@angular/core';
import { routes } from '../../app.routes';
import { Router, RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { StatisticService } from '../../service/statistic-service.service';
import { OrderService } from '../../service/order-service.service';
import { Order } from '../../model/order.model';
import { OrderDetailService } from '../../service/orderDetail-service.service';
import { OrderDetail } from '../../model/order_detail.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private number: any;
  constructor(
    private statisticService: StatisticService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService
  ) {}

  ngOnInit(): void {
    this.getAllOrder();
  }

  orders: Order[] = [];
  orderDetail: OrderDetail = new OrderDetail();
 /* public barChartOptions = {
    responsive: true,
  };

  */

  arrayMonth = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  arrayYear = ['2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030'];
  public barChartLabels: string[] = ['1','2','3','4'];
  public barChartType: string = 'bar';
  public barChartLegend = true;


  getAllOrder() {
    this.orderService.findAll().subscribe((data: any) => {
      this.orders = data.result;
      this.orders.forEach((order: any) => {
        this.getOrderDetailById(order.orderDetail_id);
      });
    });
  }

  sum_totalPrice: number = 0;
  sum_totalQuantity: number = 0;

  public allOrderDetails: any[] = []; // Mảng lưu tất cả order_detail
  private string: any;

  getOrderDetailById(order_detail_id: string) {
    this.orderDetailService.getById(order_detail_id).subscribe((data: any) => {
      if (data && data.result) {
        this.orderDetail = data.result;
        this.allOrderDetails.push(this.orderDetail);
        this.updateTotals();
        console.log('Tổng giá hiện tại:', this.sum_totalPrice);
        console.log('Tổng số lượng hiện tại:', this.sum_totalQuantity);
      }
    });
  }

  updateTotals() {
    // Sử dụng reduce để tính tổng giá và số lượng
    this.sum_totalPrice = this.allOrderDetails.reduce((acc, detail) => acc + (detail.total_price || 0), 0);
    this.sum_totalQuantity = this.allOrderDetails.reduce((acc, detail) => acc + (detail.total_amount || 0), 0);

    // Cập nhật dữ liệu biểu đồ
    this.updateChartData();
  }

  updateChartData() {
    // Gán giá trị tính toán được vào dữ liệu của biểu đồ
  }
  public barChartOptions = {

    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Doanh thu'
        },
        ticks: {
          min: 0,
          max: 1000000000,
          stepSize: 100000000,
          callback: function(value: number) {
            return value.toLocaleString();
          }
        }
      },
      y1: {
        type: 'linear',
        position: 'right',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Số lượng'
        },
        ticks: {
          min: 0,
          max: 1000,
          stepSize: 100,
        }
      }
    }
  };

  public barChartData = [
    { data: [55454556, 75555558, 9555550, 567667676], label: 'Doanh thu',  yAxisID: 'y' },
    { data: [40, 50, 60, 900], label: 'Số lượng',  yAxisID: 'y1' },
  ];


}
