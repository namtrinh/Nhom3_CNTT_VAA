import {Component, OnInit} from '@angular/core';
import {routes} from '../../app.routes';
import {Router, RouterLink} from '@angular/router';
import {BaseChartDirective} from 'ng2-charts';
import {StatisticService} from '../../service/statistic-service.service';
import {OrderService} from '../../service/order-service.service';
import {Order} from '../../model/order.model';
import {OrderDetailService} from '../../service/orderDetail-service.service';
import {OrderDetail} from '../../model/order_detail.model';
import {FormsModule} from "@angular/forms";
import {format} from "date-fns";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, BaseChartDirective, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private number: any;

  constructor(
    private orderService: OrderService,
    private orderDetailService: OrderDetailService
  ) {
  }

  startDate!: string;
  endDate!: string;
  orders: Order[] = [];
  ordersByTime: Order[] = []
  orderDetail: OrderDetail = new OrderDetail();
  currentMode: 'month' | 'day' = 'day';

  public barChartLabels: string[] = ['1', '2', '3', '4'];
  public barChartLegend = true;
  sum_totalPrice: number = 0;
  sum_totalQuantity: number = 0;
  public allOrderDetails: any[] = [];

  getOrderDetailById(order_detail_id: string) {
    this.orderDetailService.getById(order_detail_id).subscribe((data: any) => {
      if (data && data.result) {
        this.orderDetail = data.result;
        this.allOrderDetails.push(this.orderDetail);
        this.updateTotals();

      }
      console.log('Tổng giá hiện tại:', this.sum_totalPrice);
      console.log('Tổng số lượng hiện tại:', this.sum_totalQuantity);
    });
  }

  getByTime() {
    if (this.startDate && this.endDate) {
      this.startDate = format(this.startDate, "yyyy-MM-dd HH:mm:ss");
      this.endDate = format(this.endDate, "yyyy-MM-dd HH:mm:ss");

      console.log(`Formatted Start Date: ${this.startDate}`);
      console.log(`Formatted End Date: ${this.endDate}`);
      this.orderService.getByTime(this.startDate, this.endDate).subscribe((data: any) => {
        this.ordersByTime = data.result;
        this.ordersByTime.forEach((order: any) => {
          this.getOrderDetailById(order.orderDetail_id);
        });
        console.log(this.ordersByTime);
      });
    } else {
      console.log('Vui lòng chọn ngày và giờ bắt đầu và kết thúc');
    }
  }

  updateTotals() {
    // Sử dụng reduce để tính tổng giá và số lượng
    this.sum_totalPrice = this.allOrderDetails.reduce((acc, detail) => acc + (detail.total_price || 0), 0);
    this.sum_totalQuantity = this.allOrderDetails.reduce((acc, detail) => acc + (detail.total_amount || 0), 0);

    // Cập nhật dữ liệu biểu đồ
    this.updateChartData();
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
    {data: [55454556, 75555558, 9555550, 567667676], label: 'Doanh thu', yAxisID: 'y'},
    {data: [40, 50, 60, 900], label: 'Số lượng', yAxisID: 'y1'},
  ];


  onSubmit() {
    this.getByTime();
  }

  // Hàm để nhóm dữ liệu theo tháng
  groupByMonth() {
    const groupedData: { [key: string]: { total_price: number, total_amount: number } } = {};

    this.allOrderDetails.forEach(detail => {
      const date = new Date(detail.created_at); // Giả sử bạn có trường 'created_at' để lấy ngày tạo
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // Tạo khóa theo 'YYYY-MM'

      if (!groupedData[monthKey]) {
        groupedData[monthKey] = { total_price: 0, total_amount: 0 };
      }

      groupedData[monthKey].total_price += detail.total_price || 0;
      groupedData[monthKey].total_amount += detail.total_amount || 0;
    });

    return groupedData;
  }

// Hàm để nhóm dữ liệu theo ngày
  groupByDay() {
    const groupedData: { [key: string]: { total_price: number, total_amount: number } } = {};

    this.allOrderDetails.forEach(detail => {
      const date = new Date(detail.time_created); // Giả sử bạn có trường 'created_at' để lấy ngày tạo
      const dayKey = date.toISOString().split('T')[0]; // Tạo khóa theo 'YYYY-MM-DD'

      if (!groupedData[dayKey]) {
        groupedData[dayKey] = { total_price: 0, total_amount: 0 };
      }

      groupedData[dayKey].total_price += detail.total_price || 0;
      groupedData[dayKey].total_amount += detail.total_amount || 0;
    });

    return groupedData;
  }

  updateChartData() {
    let groupedData;
    if (this.currentMode === 'month') {
      groupedData = this.groupByMonth();
    } else {
      groupedData = this.groupByDay();
    }

    // Chuyển đổi dữ liệu thành mảng để hiển thị trên biểu đồ
    const labels = Object.keys(groupedData);
    const doanhThuData = labels.map(key => groupedData[key].total_price);
    const soLuongData = labels.map(key => groupedData[key].total_amount);

    // Cập nhật dữ liệu biểu đồ
    this.barChartLabels = labels;
    this.barChartData = [
      { data: doanhThuData, label: 'Doanh thu', yAxisID: 'y' },
      { data: soLuongData, label: 'Số lượng', yAxisID: 'y1' }
    ];
  }




}
