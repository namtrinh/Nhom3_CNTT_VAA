export class Powerbank {
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

  brand: string;  // Thương hiệu (ví dụ: "Anker", "Xiaomi", "Samsung")
  capacity: number;  // Dung lượng pin (mAh)
  batteryType: string;  // Loại pin (ví dụ: "Lithium Polymer", "Lithium-ion")
  inputPorts: number;  // Số lượng cổng sạc đầu vào
  outputPorts: number;  // Số lượng cổng sạc đầu ra
  inputType: string;  // Loại cổng đầu vào (ví dụ: "Micro-USB, USB-C")
  outputType: string;  // Loại cổng đầu ra (ví dụ: "USB-A, USB-C")
  maxOutputPower: number;  // Công suất đầu ra tối đa (W)
  fastCharging: boolean;  // Hỗ trợ sạc nhanh (true/false)
  wirelessCharging: boolean;  // Hỗ trợ sạc không dây (true/false)
  passthroughCharging: boolean;  // Hỗ trợ vừa sạc vừa xả (true/false)
  safetyFeatures: string;  // Tính năng an toàn (ví dụ: "Overcharge Protection, Short Circuit Protection")
  buildMaterial: string;  // Chất liệu vỏ (ví dụ: "Plastic, Aluminum")
  weight: number;  // Trọng lượng (gram)
  dimensions: string;  // Kích thước (ví dụ: "150 x 75 x 15 mm")
  color: string;  // Màu sắc (ví dụ: "Black, White")
  warranty: string;  // Thời gian bảo hành (ví dụ: "12 tháng")
  waterproof: boolean;  // Chống nước (true/false)

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
    capacity: number,
    batteryType: string,
    inputPorts: number,
    outputPorts: number,
    inputType: string,
    outputType: string,
    maxOutputPower: number,
    fastCharging: boolean,
    wirelessCharging: boolean,
    passthroughCharging: boolean,
    safetyFeatures: string,
    buildMaterial: string,
    weight: number,
    dimensions: string,
    color: string,
    warranty: string,
    waterproof: boolean
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
    this.capacity = capacity;
    this.batteryType = batteryType;
    this.inputPorts = inputPorts;
    this.outputPorts = outputPorts;
    this.inputType = inputType;
    this.outputType = outputType;
    this.maxOutputPower = maxOutputPower;
    this.fastCharging = fastCharging;
    this.wirelessCharging = wirelessCharging;
    this.passthroughCharging = passthroughCharging;
    this.safetyFeatures = safetyFeatures;
    this.buildMaterial = buildMaterial;
    this.weight = weight;
    this.dimensions = dimensions;
    this.color = color;
    this.warranty = warranty;
    this.waterproof = waterproof;
  }
}
