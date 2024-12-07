export class Tablet {
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

  brand: string;  // Thương hiệu (ví dụ: "Apple", "Samsung", "Lenovo")
  operatingSystem: string;  // Hệ điều hành (ví dụ: "iOS", "Android", "Windows")
  screenSize: number;  // Kích thước màn hình (inch)
  resolution: string;  // Độ phân giải màn hình (ví dụ: "2732x2048", "1920x1200")
  processor: string;  // Bộ vi xử lý (ví dụ: "Apple M2", "Snapdragon 8 Gen 2")
  ram: number;  // RAM (GB)
  storage: number;  // Dung lượng lưu trữ (GB)
  expandableStorage: boolean;  // Có hỗ trợ thẻ nhớ không (true/false)
  batteryCapacity: number;  // Dung lượng pin (mAh)
  stylusSupport: boolean;  // Có hỗ trợ bút cảm ứng không (true/false)
  connectivity: string;  // Kết nối (ví dụ: "Wi-Fi, 4G LTE, 5G")
  camera: string;  // Camera (ví dụ: "12MP Front, 10MP Rear")
  weight: number;  // Trọng lượng (kg)
  color: string;  // Màu sắc (ví dụ: "Space Gray", "Silver")
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
    brand: string,
    operatingSystem: string,
    screenSize: number,
    resolution: string,
    processor: string,
    ram: number,
    storage: number,
    expandableStorage: boolean,
    batteryCapacity: number,
    stylusSupport: boolean,
    connectivity: string,
    camera: string,
    weight: number,
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
    this.operatingSystem = operatingSystem;
    this.screenSize = screenSize;
    this.resolution = resolution;
    this.processor = processor;
    this.ram = ram;
    this.storage = storage;
    this.expandableStorage = expandableStorage;
    this.batteryCapacity = batteryCapacity;
    this.stylusSupport = stylusSupport;
    this.connectivity = connectivity;
    this.camera = camera;
    this.weight = weight;
    this.color = color;
    this.warranty = warranty;
  }
}
