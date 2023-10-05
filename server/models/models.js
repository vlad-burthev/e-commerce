import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: "USER" },
});

export const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

export const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

export const Cart = sequelize.define("cart", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  // user_id
});

export const Cart_Device = sequelize.define("cart_device", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  device_id: { type: DataTypes.INTEGER, allowNull: false },
  //cart_id
});

export const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Прийнято",
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  // user_id
});

export const Order_Device = sequelize.define("order_device", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  device_id: { type: DataTypes.INTEGER, allowNull: false },
  //cart_id
});

export const BrandType = sequelize.define("brand_type", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

export const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  mark: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  //user_id
  //device_id
});

export const Device = sequelize.define("device", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  price: { type: DataTypes.INTEGER, allowNull: false },
  discount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false, unique: true },
  //brand_id
  //type_id
});

export const Device_Info = sequelize.define("device_info", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

User.hasOne(Cart, { onDelete: "CASCADE" });
Cart.belongsTo(User);

Cart.hasMany(Cart_Device, { as: "cart_device", onDelete: "CASCADE" });
Cart_Device.belongsTo(Cart);

User.hasMany(Order, { onDelete: "CASCADE" });
Order.belongsTo(User);

Order.hasOne(Order_Device, { onDelete: "CASCADE" });
Order_Device.belongsTo(Order);

User.hasMany(Rating);
Rating.belongsTo(User);

Device.hasMany(Device_Info, { as: "info" });
Device_Info.belongsTo(Device);

Device.hasMany(Rating, { foreignKey: "deviceId" });
Rating.belongsTo(Device);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Brand.belongsToMany(Type, { through: BrandType });
Type.belongsToMany(Brand, { through: BrandType });

export const models = {
  Brand,
  Type,
  BrandType,
  Device,
  Device_Info,
  User,
  Rating,
  Order,
  Order_Device,
  Cart,
  Cart_Device,
};
