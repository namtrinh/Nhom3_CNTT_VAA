export class LapTop {
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

  brand: string;  // Thương hiệu (ví dụ: "Dell", "Apple", "HP")
  modelNumber: string;  // Mã số model (ví dụ: "XPS139310")
  processor: string;  // Bộ vi xử lý (CPU) (ví dụ: "Intel Core i7-1260P", "AMD Ryzen 7 5800H")
  cores: number;  // Số nhân CPU (ví dụ: 8)
  threads: number;  // Số luồng CPU (ví dụ: 16)
  baseClockSpeed: number;  // Tốc độ xung nhịp cơ bản (GHz)
  maxClockSpeed: number;  // Tốc độ xung nhịp tối đa (GHz)
  ram: number;  // Dung lượng RAM (GB)
  ramType: string;  // Loại RAM (ví dụ: "DDR4", "LPDDR5")
  storage: number;  // Dung lượng lưu trữ (GB)
  storageType: string;  // Loại lưu trữ (ví dụ: "SSD NVMe", "HDD", "Hybrid")
  screenSize: number;  // Kích thước màn hình (inch)
  resolution: string;  // Độ phân giải (ví dụ: "1920x1080", "4K UHD")
  screenType: string;  // Loại màn hình (ví dụ: "IPS", "OLED", "Touchscreen")
  gpu: string;  // Card đồ họa (ví dụ: "NVIDIA RTX 3060", "Intel Iris Xe")
  batteryCapacity: number;  // Dung lượng pin (Wh hoặc mAh)
  operatingSystem: string;  // Hệ điều hành (ví dụ: "Windows 11", "Ubuntu 22.04", "macOS Ventura")
  connectivity: string;  // Các kết nối (ví dụ: "Wi-Fi 6, Bluetooth 5.2")
  ports: string;  // Các cổng (ví dụ: "2x USB-C, 1x HDMI, 1x Audio Jack")
  keyboard: string;  // Loại bàn phím (ví dụ: "Backlit", "Mechanical", "Chiclet")
  fingerprintReader: boolean;  // Có hỗ trợ cảm biến vân tay không (true/false)
  webcam: boolean;  // Có webcam không (true/false)
  weight: number;  // Trọng lượng (kg)
  material: string;  // Chất liệu khung máy (ví dụ: "Nhôm", "Nhựa", "Hợp kim")
  color: string;  // Màu sắc (ví dụ: "Silver", "Space Gray", "Black")
  warranty: string;  // Bảo hành (ví dụ: "12 tháng", "24 tháng")

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
    threads: number,
    baseClockSpeed: number,
    maxClockSpeed: number,
    ram: number,
    ramType: string,
    storage: number,
    storageType: string,
    screenSize: number,
    resolution: string,
    screenType: string,
    gpu: string,
    batteryCapacity: number,
    operatingSystem: string,
    connectivity: string,
    ports: string,
    keyboard: string,
    fingerprintReader: boolean,
    webcam: boolean,
    weight: number,
    material: string,
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
    this.modelNumber = modelNumber;
    this.processor = processor;
    this.cores = cores;
    this.threads = threads;
    this.baseClockSpeed = baseClockSpeed;
    this.maxClockSpeed = maxClockSpeed;
    this.ram = ram;
    this.ramType = ramType;
    this.storage = storage;
    this.storageType = storageType;
    this.screenSize = screenSize;
    this.resolution = resolution;
    this.screenType = screenType;
    this.gpu = gpu;
    this.batteryCapacity = batteryCapacity;
    this.operatingSystem = operatingSystem;
    this.connectivity = connectivity;
    this.ports = ports;
    this.keyboard = keyboard;
    this.fingerprintReader = fingerprintReader;
    this.webcam = webcam;
    this.weight = weight;
    this.material = material;
    this.color = color;
    this.warranty = warranty;
  }
}
