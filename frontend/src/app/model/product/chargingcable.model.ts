export class ChargingCable {
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

  connectorType: string;  // Loại đầu kết nối (ví dụ: "USB-A to USB-C", "Lightning", "Micro-USB")
  length: number;  // Chiều dài dây (đơn vị: mét)
  maxPower: number;  // Công suất tối đa hỗ trợ (đơn vị: watt)
  dataTransferRate: number;  // Tốc độ truyền dữ liệu (Mbps hoặc Gbps)
  material: string;  // Chất liệu dây (ví dụ: "Nylon braided", "PVC")
  fastCharging: boolean;  // Hỗ trợ sạc nhanh không (true/false)
  compatibleDevices: string;  // Thiết bị tương thích (ví dụ: "iPhone, Samsung, Huawei")
  brand: string;  // Thương hiệu sản xuất (ví dụ: "Anker", "Baseus")
  warranty: string;  // Thời gian bảo hành (ví dụ: "12 tháng", "18 tháng")

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
    connectorType: string,
    length: number,
    maxPower: number,
    dataTransferRate: number,
    material: string,
    fastCharging: boolean,
    compatibleDevices: string,
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
    this.connectorType = connectorType;
    this.length = length;
    this.maxPower = maxPower;
    this.dataTransferRate = dataTransferRate;
    this.material = material;
    this.fastCharging = fastCharging;
    this.compatibleDevices = compatibleDevices;
    this.brand = brand;
    this.warranty = warranty;
  }
}
