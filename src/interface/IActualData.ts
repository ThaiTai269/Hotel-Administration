export interface MultiChoiceHotel {
  key: string;
  value: string;
}
export interface IDataActual {
  id: string;
  HotelName: string;
  RoomTotal: number;
  RoomRevenue: number;
  FoodRevenue: number;
  OtherRevenue: number;
  TotalRevenue: number;
  occ: number;
  adr: number;
  HotelRoom: number;
  AvailableRoom: number;
  Rev: IRev;
  RN: IRN;
  OCC: IOCC;
  ADR: IADR;
}
interface IRN {
  OccupiedRoom: number;
  GroupRoom: number;
  TransientRoom: number;
}
interface IRev {
  OccupiedRoom: number;
  GroupRoom: number;
  TransientRoom: number;
}
interface IOCC {
  OccupiedRoom: number;
  GroupRoom: number;
  TransientRoom: number;
}
interface IADR {
  OccupiedRoom: number;
  GroupRoom: number;
  TransientRoom: number;
}
export interface IDataBar {
  HotelName: string;
  TotalRevenue: number;
}
