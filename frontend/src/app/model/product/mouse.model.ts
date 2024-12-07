export class Mouse {
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

  brand: string;  // Thương hiệu (ví dụ: "Logitech", "Razer", "SteelSeries")
  type: string;  // Loại chuột (ví dụ: "Gaming", "Office", "Ergonomic")
  connectionType: string;  // Loại kết nối (ví dụ: "Wireless", "Wired", "Bluetooth")
  dpi: number;  // Độ nhạy DPI tối đa (ví dụ: 16000)
  numberOfButtons: number;  // Số lượng nút bấm (ví dụ: 6)
  rgbLighting: boolean;  // Đèn RGB (true/false)
  sensorType: string;  // Loại cảm biến (ví dụ: "Optical", "Laser")
  adjustableWeight: boolean;  // Hỗ trợ điều chỉnh trọng lượng (true/false)
  batteryLife: string;  // Thời lượng pin (ví dụ: "70 giờ", "Rechargeable")
  weight: number;  // Trọng lượng (gram)
  dimensions: string;  // Kích thước (ví dụ: "125 x 65 x 40 mm")
  color: string;  // Màu sắc (ví dụ: "Black", "White")
  warranty: string;  // Thời gian bảo hành (ví dụ: "12 tháng")

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
    brand: string,
    type: string,
    connectionType: string,
    dpi: number,
    numberOfButtons: number,
    rgbLighting: boolean,
    sensorType: string,
    adjustableWeight: boolean,
    batteryLife: string,
    weight: number,
    dimensions: string,
    color: string,
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
    this.brand = brand;
    this.type = type;
    this.connectionType = connectionType;
    this.dpi = dpi;
    this.numberOfButtons = numberOfButtons;
    this.rgbLighting = rgbLighting;
    this.sensorType = sensorType;
    this.adjustableWeight = adjustableWeight;
    this.batteryLife = batteryLife;
    this.weight = weight;
    this.dimensions = dimensions;
    this.color = color;
    this.warranty = warranty;
  }
}
