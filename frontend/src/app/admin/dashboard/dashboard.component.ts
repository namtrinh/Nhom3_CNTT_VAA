import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { OrderService } from '../../service/order-service.service';
import { Order } from '../../model/order.model';
import { OrderDetailService } from '../../service/orderDetail-service.service';
import { OrderDetail } from '../../model/order_detail.model';
import { FormsModule } from "@angular/forms";
import { format } from "date-fns";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, BaseChartDirective, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  startDate!: string;
  endDate!: string;
  ordersByTime: Order[] = [];
  currentMode: 'month' | 'day' = 'day';
  public barChartLabels: string[] = [];
  public barChartData: any[] = [];
  public barChartLegend = true;

  constructor(
    private orderService: OrderService,
    private orderDetailService: OrderDetailService) {}

  getByTime() {
    if (this.startDate && this.endDate) {
      this.startDate = format(new Date(this.startDate), "yyyy-MM-dd HH:mm:ss");
      this.endDate = format(new Date(this.endDate), "yyyy-MM-dd HH:mm:ss");

      console.log(`Formatted Start Date: ${this.startDate}`);
      console.log(`Formatted End Date: ${this.endDate}`);

      this.orderService.getByTime(this.startDate, this.endDate).subscribe((data: any) => {
        this.ordersByTime = data.result;
        this.updateChartData(); // Cập nhật dữ liệu biểu đồ sau khi có đơn hàng
      });
    } else {
      console.log('Vui lòng chọn ngày và giờ bắt đầu và kết thúc');
    }
  }

  updateChartData() {
    const groupedData: { [key: string]: { total_price: number, total_amount: number } } = {};
    const orderDetailCalls: Promise<any>[] = [];

    this.ordersByTime.forEach((order: any) => {
      const date = new Date(order.time_created);
      const key = this.currentMode === 'month' ? `${date.getFullYear()}-${date.getMonth() + 1}` : date.toISOString().split('T')[0];

      const orderDetailPromise = this.getOrderDetailById(order.orderDetail_id).then((detail: any) => {
        if (!groupedData[key]) {
          groupedData[key] = { total_price: 0, total_amount: 0 };
        }
        groupedData[key].total_price += detail.total_price || 0;
        groupedData[key].total_amount += detail.total_amount || 0;
      });

      orderDetailCalls.push(orderDetailPromise);
    });

    Promise.all(orderDetailCalls).then(() => {
      // Chuyển đổi dữ liệu thành mảng và sắp xếp theo tháng hoặc ngày
      this.barChartLabels = Object.keys(groupedData);

      this.barChartLabels.sort((a, b) => {
        const dateA = this.currentMode === 'month' ? new Date(a + '-01') : new Date(a);
        const dateB = this.currentMode === 'month' ? new Date(b + '-01') : new Date(b);
        return dateA.getTime() - dateB.getTime();
      });

      const doanhThuData = this.barChartLabels.map(key => groupedData[key].total_price);
      const soLuongData = this.barChartLabels.map(key => groupedData[key].total_amount);

      this.barChartData = [
        { data: doanhThuData, label: 'Doanh thu', yAxisID: 'y' },
        { data: soLuongData, label: 'Số lượng', yAxisID: 'y1' }
      ];

      console.log('Dữ liệu biểu đồ:', this.barChartData);
    });
  }

  getOrderDetailById(order_detail_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.orderDetailService.getById(order_detail_id).subscribe((data: any) => {
          resolve(data.result);
      },);
    });
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
          stepSize: 1000000,
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
          stepSize: 10,
        }
      }
    }
  };

  onSubmit() {
    this.getByTime();
  }
}
