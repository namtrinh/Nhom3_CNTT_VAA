export class HeadPhone {
  product_id: string;
  name: string;
  seotitle: string;
  image: string;
  quantity: number;
  price: number;
  description: string;
  stockStatus: 'In_Stock' | 'Out_of_Stock';  // Enum tương tự như trong Java
  time_created: string;
  category: string;
  promotion: string;

  type: string;  // Loại tai nghe (ví dụ: "Over-ear", "In-ear", "On-ear")
  wireless: boolean;  // Có hỗ trợ không dây không (true/false)
  noiseCancelling: boolean;  // Hỗ trợ chống ồn không (true/false)
  connectionType: string;  // Loại kết nối (ví dụ: "Bluetooth", "3.5mm Jack", "USB-C")
  batteryLife: number;  // Thời lượng pin (đơn vị: giờ)
  driverSize: string;  // Kích thước driver (đơn vị: mm)
  microphone: boolean;  // Có hỗ trợ mic không (true/false)
  weight: number;  // Trọng lượng (đơn vị: gram)
  brand: string;  // Thương hiệu (ví dụ: "Sony", "Bose", "JBL")
  warranty: string;  // Thời gian bảo hành (ví dụ: "12 tháng", "24 tháng")

  constructor(
    product_id: string,
    name: string,
    seotitle: string,
    image: string,
    quantity: number,
    price: number,
    description: string,
    stockStatus: 'In_Stock' | 'Out_of_Stock',
    time_created: string,
    category: string,
    promotion: string,
    type: string,
    wireless: boolean,
    noiseCancelling: boolean,
    connectionType: string,
    batteryLife: number,
    driverSize: string,
    microphone: boolean,
    weight: number,
    brand: string,
    warranty: string
  ) {
    this.product_id = product_id;
    this.name = name;
    this.seotitle = seotitle;
    this.image = image;
    this.quantity = quantity;
    this.price = price;
    this.description = description;
    this.stockStatus = stockStatus;
    this.time_created = time_created;
    this.category = category;
    this.promotion = promotion;
    this.type = type;
    this.wireless = wireless;
    this.noiseCancelling = noiseCancelling;
    this.connectionType = connectionType;
    this.batteryLife = batteryLife;
    this.driverSize = driverSize;
    this.microphone = microphone;
    this.weight = weight;
    this.brand = brand;
    this.warranty = warranty;
  }
}
