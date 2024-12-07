export class KeyBoard {
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

  brand: string;  // Thương hiệu (ví dụ: "Logitech", "Razer", "Corsair")
  type: string;  // Loại bàn phím (ví dụ: "Mechanical", "Membrane")
  connectionType: string;  // Loại kết nối (ví dụ: "Wireless", "Wired", "Bluetooth")
  switchType: string;  // Loại switch (ví dụ: "Cherry MX Red", "Razer Green")
  layout: string;  // Bố cục phím (ví dụ: "ANSI", "ISO", "Tenkeyless")
  rgbLighting: boolean;  // Có đèn RGB hay không (true/false)
  keycapMaterial: string;  // Chất liệu keycap (ví dụ: "ABS", "PBT")
  hotSwappable: boolean;  // Hỗ trợ thay switch nóng không (true/false)
  pollingRate: number;  // Tần số quét (Hz)
  buildMaterial: string;  // Chất liệu vỏ (ví dụ: "Plastic", "Aluminum")
  weight: number;  // Trọng lượng (gram)
  dimensions: string;  // Kích thước (ví dụ: "435 x 135 x 35 mm")
  color: string;  // Màu sắc (ví dụ: "Black", "White")
  warranty: string;  // Thời gian bảo hành (ví dụ: "12 tháng")
  programmableKeys: boolean;  // Có hỗ trợ phím lập trình không (true/false)

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
    switchType: string,
    layout: string,
    rgbLighting: boolean,
    keycapMaterial: string,
    hotSwappable: boolean,
    pollingRate: number,
    buildMaterial: string,
    weight: number,
    dimensions: string,
    color: string,
    warranty: string,
    programmableKeys: boolean
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
    this.switchType = switchType;
    this.layout = layout;
    this.rgbLighting = rgbLighting;
    this.keycapMaterial = keycapMaterial;
    this.hotSwappable = hotSwappable;
    this.pollingRate = pollingRate;
    this.buildMaterial = buildMaterial;
    this.weight = weight;
    this.dimensions = dimensions;
    this.color = color;
    this.warranty = warranty;
    this.programmableKeys = programmableKeys;
  }
}
