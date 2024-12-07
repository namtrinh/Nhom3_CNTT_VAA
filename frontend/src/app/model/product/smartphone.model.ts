
export class SmartPhone {
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

  brand: string;  // Thương hiệu (ví dụ: "Apple", "Samsung", "Xiaomi")
  modelNumber: string;  // Số model (ví dụ: "A2651")
  processor: string;  // Bộ vi xử lý (ví dụ: "Apple A17 Pro", "Snapdragon 8 Gen 3")
  cores: number;  // Số nhân CPU (ví dụ: 8)
  clockSpeed: number;  // Tốc độ xung nhịp CPU (GHz)
  ram: number;  // Dung lượng RAM (GB)
  storage: number;  // Bộ nhớ trong (GB)
  storageType: string;  // Loại lưu trữ (ví dụ: "UFS 4.0")
  screenSize: number;  // Kích thước màn hình (inch)
  resolution: string;  // Độ phân giải (ví dụ: "2778x1284")
  screenType: string;  // Loại màn hình (ví dụ: "OLED", "AMOLED", "LCD")
  refreshRate: number;  // Tần số quét màn hình (Hz)
  frontCamera: string;  // Camera trước (ví dụ: "12MP f/2.2")
  rearCameras: string;  // Camera sau (ví dụ: "48MP + 12MP + 12MP")
  cameraFeatures: string;  // Các tính năng camera (ví dụ: "Night Mode, HDR, Optical Zoom")
  batteryCapacity: number;  // Dung lượng pin (mAh)
  fastCharging: boolean;  // Hỗ trợ sạc nhanh (true/false)
  wirelessCharging: boolean;  // Hỗ trợ sạc không dây (true/false)
  operatingSystem: string;  // Hệ điều hành (ví dụ: "iOS 17", "Android 14")
  connectivity: string;  // Các kết nối (ví dụ: "5G, Wi-Fi 6, Bluetooth 5.3")
  ports: string;  // Loại cổng kết nối (ví dụ: "USB-C", "Lightning")
  buildMaterial: string;  // Chất liệu thiết kế (ví dụ: "Ceramic Shield, Titanium")
  color: string;  // Màu sắc (ví dụ: "Space Black", "Silver", "Deep Purple")
  waterproof: boolean;  // Khả năng chống nước (true/false)
  sensors: string;  // Các cảm biến (ví dụ: "Face ID, vân tay, cảm biến gia tốc")
  weight: number;  // Trọng lượng (gram)
  dimensions: string;  // Kích thước (ví dụ: "160.8 x 78.1 x 7.7 mm")
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
    modelNumber: string,
    processor: string,
    cores: number,
    clockSpeed: number,
    ram: number,
    storage: number,
    storageType: string,
    screenSize: number,
    resolution: string,
    screenType: string,
    refreshRate: number,
    frontCamera: string,
    rearCameras: string,
    cameraFeatures: string,
    batteryCapacity: number,
    fastCharging: boolean,
    wirelessCharging: boolean,
    operatingSystem: string,
    connectivity: string,
    ports: string,
    buildMaterial: string,
    color: string,
    waterproof: boolean,
    sensors: string,
    weight: number,
    dimensions: string,
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
    this.modelNumber = modelNumber;
    this.processor = processor;
    this.cores = cores;
    this.clockSpeed = clockSpeed;
    this.ram = ram;
    this.storage = storage;
    this.storageType = storageType;
    this.screenSize = screenSize;
    this.resolution = resolution;
    this.screenType = screenType;
    this.refreshRate = refreshRate;
    this.frontCamera = frontCamera;
    this.rearCameras = rearCameras;
    this.cameraFeatures = cameraFeatures;
    this.batteryCapacity = batteryCapacity;
    this.fastCharging = fastCharging;
    this.wirelessCharging = wirelessCharging;
    this.operatingSystem = operatingSystem;
    this.connectivity = connectivity;
    this.ports = ports;
    this.buildMaterial = buildMaterial;
    this.color = color;
    this.waterproof = waterproof;
    this.sensors = sensors;
    this.weight = weight;
    this.dimensions = dimensions;
    this.warranty = warranty;
  }
}
